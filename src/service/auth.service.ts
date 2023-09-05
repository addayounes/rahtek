import { Op } from "sequelize";
import jwt from "jsonwebtoken";
import * as argon2 from "argon2";
import config from "../config/config";
import logger from "../middleware/logger";
import * as tokenService from "./token.service";
import * as smsService from "./sms.service";
import { UserSignUpCredentials } from "../types/types";
import {
  createAccessToken,
  createRefreshToken,
  createRegisterToken,
} from "../utils/generateTokens.util";
import { User } from "../models/user";
import { randomUUID } from "crypto";
import { TokenType } from "../types/token";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const { verify } = jwt;

export const signUp = async (userData: UserSignUpCredentials) => {
  const { email, password } = userData;

  try {
    const userEmailExists = await User.findOne({ where: { email }, raw: true });

    if (userEmailExists?.dataValues) return null;

    const hashed = await argon2.hash(password);

    const newUser: any = await User.create({
      ...userData,
      id: randomUUID(),
      password: hashed,
    });

    const tokens = await generateTokens(newUser.dataValues.id);

    delete newUser.dataValues.password;

    return { user: newUser.dataValues, ...tokens };
  } catch (error) {
    logger.error(error);
    return null;
  }
};

export const login = async (email: string, password: string) => {
  try {
    const user: any = await User.findOne({ where: { email } });

    if (!user?.dataValues) return { message: "User not found" };

    const validPassword = await argon2.verify(
      user.dataValues.password,
      password
    );

    if (!validPassword) return { message: "Wrong password" };

    // delete user's old sessions
    await tokenService.deleteUserRefreshTokens(user.dataValues.id);

    const newTokens = await generateTokens(user.dataValues.id);

    delete user.dataValues.password;

    // send access token per json to user so it can be stored in the localStorage
    return { user: user.dataValues, ...newTokens };
  } catch (error) {
    logger.error(error);
    return null;
  }
};

export const logout = async (token: string) => {
  try {
    const tokenExists = await tokenService.getToken(token);
    if (!tokenExists) return null;
    await tokenService.deleteToken(token);
    return true;
  } catch (error) {
    logger.error(error);
    return null;
  }
};

export const refresh = async (refreshToken: string) => {
  try {
    const tokenExists = await tokenService.getToken(refreshToken);

    if (!tokenExists) return { message: "Invalid token" };

    // delete from db
    await tokenService.deleteToken(refreshToken);

    // evaluate jwt
    const tokenPayload = verify(refreshToken, config.jwt.refresh_token.secret);

    // session expired
    if (!tokenPayload.userId) return { message: "Token expired" };

    const newTokens = await generateTokens(tokenPayload.userId);

    return { ...newTokens };
  } catch (error: any) {
    logger.error(error);
    return { message: error?.message };
  }
};

export const sendOTP = async (phone: string): Promise<any> => {
  try {
    const sms = await smsService.sendOTP(phone);
    return sms;
  } catch (error: any) {
    logger.error(error);
    if (error.code === 20003) return { error: "Twilio auth error" };
    if (error.code === 60200) return { error: "Incorrect phone number" };
    return { error: error?.message };
  }
};

export const verifyOTP = async (phone: string, code: string): Promise<any> => {
  try {
    const sms = await smsService.verifyOTP(phone, code);

    if (sms.status !== "approved")
      return { success: false, error: "Incorrect OTP" };

    // check if the user exists
    const user: any = await User.findOne({ where: { phone } });

    if (user?.dataValues) {
      // check if the user already has a session elsewhere, if so delete that session
      await tokenService.deleteUserRefreshTokens(user.dataValues.id);

      // create a new session
      const tokens = await generateTokens(user.dataValues.id);

      delete user.dataValues.password;

      return { user: user.dataValues, ...tokens, success: true };
    } else {
      // create a register token to be used in the complete-registration route
      const token = createRegisterToken(phone);

      const expiresAt = new Date();
      const ONE_HOUR_IN_MS = 60 * 60 * 1000;
      expiresAt.setTime(expiresAt.getTime() + ONE_HOUR_IN_MS);

      await tokenService.saveToken(token, phone, TokenType.REGISTER, expiresAt);
      return { phone, token, success: true };
    }
  } catch (error) {
    return { error: "Incorrect phone number", success: false };
  }
};

export const generateTokens = async (userId: string) => {
  try {
    const accessToken = createAccessToken(userId);
    const refreshToken = createRefreshToken(userId);

    // add refresh token to db
    await tokenService.saveToken(refreshToken, userId, TokenType.REFRESH);

    return { accessToken, refreshToken };
  } catch (error) {
    logger.error(error);
  }
};

export const forgotPassword = async (email: string) => {
  try {
    const user = await User.findOne({ where: { email } });

    if (!user?.dataValues) return { message: "User doesn't exist" };

    const resetToken = createAccessToken(user.dataValues.id);

    const expiresAt = new Date();
    const ONE_HOUR_IN_MS = 60 * 60 * 1000;
    expiresAt.setTime(expiresAt.getTime() + ONE_HOUR_IN_MS);

    await tokenService.saveToken(
      resetToken,
      user.dataValues.id,
      TokenType.RESET,
      expiresAt
    );

    // TODO: send an email with the link of the reset page

    return { token: resetToken, message: "Password reset email sent" };
  } catch (error) {
    logger.error(error);
    return { message: "Something went wrong" };
  }
};

export const resetPassword = async (password: string, token: string) => {
  try {
    const resetToken = await tokenService.getToken(token, {
      expiresAt: { [Op.gt]: new Date() },
    });

    if (!resetToken) return { message: "Invalid or expired token" };

    const user = await User.findOne({ where: { id: resetToken.userId } });

    if (!user) return { message: "Couldn't find the user" };

    const hashed = await argon2.hash(password);

    await user.update({ password: hashed });

    await tokenService.deleteToken(resetToken.token);

    return { message: "Password reset successful", success: true };
  } catch (error) {
    logger.error(error);
    return { message: "Something went wrong" };
  }
};
