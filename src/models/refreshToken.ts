import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize";
import { TokenType } from "../types/token";

export interface IRefreshTokenAttributes {
  id: string;
  token: string;
  type: string;
  expiresAt: string;
  userId: string;
}

export const RefreshToken = sequelize.define<
  Model<IRefreshTokenAttributes, {}>
>(
  "RefreshTokens",
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    token: { type: DataTypes.STRING, allowNull: false },
    type: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: [TokenType.REFRESH, TokenType.RESET, TokenType.REGISTER],
    },
    expiresAt: { type: DataTypes.DATE, allowNull: true },
    userId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: { model: "Users", key: "id" },
      onDelete: "CASCADE",
    },
  },
  { tableName: "RefreshTokens" }
);
