import jwt from "jsonwebtoken";
import * as argon2 from "argon2";
import config from "../config/config";
import logger from "../middleware/logger";
import * as tokenService from "./token.service";
import { UserSignUpCredentials } from "../types/types";
import {
  createAccessToken,
  createRefreshToken,
} from "../utils/generateTokens.util";
import { User } from "../models/user";
import { randomUUID } from "crypto";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const { verify } = jwt;

export const signUp = async (userData: UserSignUpCredentials) => {
  const { firstName, lastName, email, password } = userData;

  const userEmailExists = await User.findOne({ where: { email }, raw: true });

  if (userEmailExists?.dataValues) return null;

  const newUser = await User.create({
    id: randomUUID(),
    email,
    firstName,
    lastName,
    password,
  });

  const tokens = await generateTokens(newUser.dataValues.id);

  return { user: newUser, ...tokens };
};

export const login = async (email: string, password: string) => {
  const user = await User.findOne({ where: { email } });

  if (!user?.dataValues) return { message: "User not found" };

  const validPassword = await argon2.verify(user.dataValues.password, password);

  if (!validPassword) return { message: "Wrong password" };

  // delete user's old sessions
  await tokenService.deleteUserRefreshTokens(user.dataValues.id);

  const newTokens = await generateTokens(user.dataValues.id);

  // send access token per json to user so it can be stored in the localStorage
  return { user: user.dataValues, ...newTokens };
};

export const logout = async (token: string) => {
  const tokenExists = await tokenService.getRefreshToken(token);
  if (!tokenExists) return null;
  await tokenService.deleteRefreshToken(token);
  return true;
};

export const refresh = async (refreshToken: string) => {
  // delete from db
  await tokenService.deleteRefreshToken(refreshToken);

  // evaluate jwt
  const tokenPayload = verify(refreshToken, config.jwt.refresh_token.secret);

  // session expired
  if (!tokenPayload.userId) return null;

  const newTokens = await generateTokens(tokenPayload.userId);

  return { ...newTokens };
};

export const generateTokens = async (userId: string) => {
  try {
    const accessToken = createAccessToken(userId);
    const refreshToken = createRefreshToken(userId);

    // add refresh token to db
    await tokenService.saveRefreshToken(refreshToken, userId);

    return { accessToken, refreshToken };
  } catch (error) {
    logger.error(error);
  }
};
