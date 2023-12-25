import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize";

export interface ICategoryAttributes {
  id: string;
  name: string;
}

export const Category = sequelize.define<Model<ICategoryAttributes, {}>>(
  "Categories",
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
  },
  { tableName: "Categories", timestamps: true }
);
