import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize";
import { TokenType } from "../types/token";

export interface IRefreshTokenAttributes {
  id: number;
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
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    token: { type: DataTypes.STRING, allowNull: false },
    type: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: [TokenType.REFRESH, TokenType.RESET],
    },
    expiresAt: { type: DataTypes.DATE, allowNull: true },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "Users", key: "id" },
      onDelete: "CASCADE",
    },
  },
  { tableName: "RefreshTokens" }
);
