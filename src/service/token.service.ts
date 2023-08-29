import prismaClient from "../config/prisma";

export const saveRefreshToken = async (token: string, userId: string) => {
  await prismaClient.refreshToken.create({ data: { token, userId } });
};

export const deleteUserRefreshTokens = async (userId: string) => {
  await prismaClient.refreshToken.deleteMany({ where: { userId } });
};

export const deleteRefreshToken = async (token: string) => {
  await prismaClient.refreshToken.delete({ where: { token } });
};

export const getRefreshToken = async (token: string) => {
  return await prismaClient.refreshToken.findUnique({ where: { token } });
};
