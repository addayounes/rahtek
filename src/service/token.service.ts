import { TokenType } from "../types/token";
import { WhereOptions } from "sequelize";
import { IRefreshTokenAttributes, RefreshToken } from "../models/refreshToken";

export const saveToken = async (
  token: string,
  userId: string,
  type: TokenType,
  expiresAt: Date | null = null
) => {
  await RefreshToken.create({
    token,
    userId,
    type,
    expiresAt,
  });
};

export const deleteUserRefreshTokens = async (userId: string) => {
  await RefreshToken.destroy({ where: { userId, type: TokenType.REFRESH } });
};

export const deleteToken = async (token: string) => {
  const tokenDocument = await RefreshToken.findOne({ where: { token } });
  if (tokenDocument) await tokenDocument.destroy();
};

export const getToken = async (
  token: string,
  filter?: WhereOptions<IRefreshTokenAttributes>
) => {
  const instance = await RefreshToken.findOne({ where: { token, ...filter } });
  if (!instance) return null;
  return instance.dataValues;
};
