import { RefreshToken } from "../models/refreshToken";

export const saveRefreshToken = async (token: string, userId: string) => {
  await RefreshToken.create({ token, userId });
  //
};

export const deleteUserRefreshTokens = async (userId: string) => {
  await RefreshToken.destroy({ where: { userId } });
};

export const deleteRefreshToken = async (token: string) => {
  const tokenDocument = await RefreshToken.findOne({ where: { token } });
  if (tokenDocument) await tokenDocument.destroy();
};

export const getRefreshToken = async (token: string) => {
  const instance = await RefreshToken.findOne({ where: { token } });
  if (!instance) return null;
  return instance.dataValues;
};
