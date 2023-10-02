import jwt from "jsonwebtoken";
import config from "../config/config";
import { getUserById } from "../service/user.service";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const { sign } = jwt;

/**
 * This functions generates a valid access token
 *
 * @param { string } userId - The user id of the user that owns this jwt
 * @returns Returns a valid access token
 */
export const createAccessToken = async (userId: string): Promise<string> => {
  const user = await getUserById(userId);
  return sign({ ...user }, config.jwt.access_token.secret, {
    expiresIn: config.jwt.access_token.expire,
  });
};

/**
 * This functions generates a valid refresh token
 *
 * @param { string } userId - The user id of the user that owns this jwt
 * @returns Returns a valid refresh token
 */
export const createRefreshToken = (userId: string): string => {
  return sign({ userId }, config.jwt.refresh_token.secret, {
    expiresIn: config.jwt.refresh_token.expire,
  });
};

/**
 * This functions generates a valid register token
 *
 * @param {string} phone - The phone of the user that owns this jwt
 * @returns Returns a valid refresh token
 */
export const createRegisterToken = (phone: string): string => {
  return sign({ phone }, config.jwt.register_token.secret, { expiresIn: "1h" });
};
