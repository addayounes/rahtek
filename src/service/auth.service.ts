import jwt from "jsonwebtoken";
import * as argon2 from "argon2";
import config from "src/config/config";
import logger from "src/middleware/logger";
import prismaClient from "src/config/prisma";
import * as tokenService from "./token.service";
import { UserSignUpCredentials } from "src/types/types";
import {
  createAccessToken,
  createRefreshToken,
} from "src/utils/generateTokens.util";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const { verify } = jwt;

export const signUp = async (userData: UserSignUpCredentials) => {
  const { username, email, password } = userData;

  const userEmailExists = await prismaClient.user.findUnique({
    where: {
      email,
    },
  });

  if (userEmailExists) return null;

  const hashedPassword = await argon2.hash(password);

  const newUser = await prismaClient.user.create({
    data: {
      email,
      name: username,
      password: hashedPassword,
    },
  });

  return newUser;
};

export const login = async (email: string, password: string) => {
  const user = await prismaClient.user.findUnique({
    where: { email },
  });

  if (!user) return { message: "User not found" };

  const validPassword = await argon2.verify(user.password, password);

  if (!validPassword) return { message: "Wrong password" };

  // delete user's old sessions
  await tokenService.deleteUserRefreshTokens(user.id);

  const newTokens = await generateTokens(user.userId);

  // send access token per json to user so it can be stored in the localStorage
  return { user, ...newTokens };
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
