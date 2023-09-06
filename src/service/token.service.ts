import { TokenType } from "../types/token";
import { WhereOptions } from "sequelize";
import { IRefreshTokenAttributes, RefreshToken } from "../models/refreshToken";
import logger from "../middleware/logger";

export const saveToken = async (
  token: string,
  userId: string | null,
  type: TokenType,
  expiresAt: Date | null = null
) => {
  try {
    await RefreshToken.create({
      token,
      userId,
      type,
      expiresAt,
    });
  } catch (error) {
    logger.error(error);
  }
};

export const deleteUserRefreshTokens = async (userId: string) => {
  try {
    await RefreshToken.destroy({ where: { userId, type: TokenType.REFRESH } });
  } catch (error) {
    logger.error(error);
  }
};

export const deleteToken = async (token: string) => {
  try {
    const tokenDocument = await RefreshToken.findOne({ where: { token } });
    if (tokenDocument) await tokenDocument.destroy();
  } catch (error) {
    logger.error(error);
  }
};

export const getToken = async (
  token: string,
  filter?: WhereOptions<IRefreshTokenAttributes>
) => {
  try {
    const instance = await RefreshToken.findOne({
      where: { token, ...filter },
    });
    if (!instance) return null;
    return instance.dataValues;
  } catch (error) {
    logger.error(error);
    return null;
  }
};
