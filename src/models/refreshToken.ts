import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize";

interface IRefreshTokenAttributes {
  id: number;
  token: string;
  userId: string;
}

export const RefreshToken = sequelize.define<Model<IRefreshTokenAttributes>>(
  "RefreshToken",
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
      references: { model: "User", key: "id" },
    },
  },
  { tableName: "RefreshTokens" }
);
