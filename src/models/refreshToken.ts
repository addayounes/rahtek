import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize";

export interface IRefreshTokenAttributes {
  id: number;
  token: string;
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
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "Users", key: "id" },
    },
  },
  { tableName: "RefreshTokens" }
);
