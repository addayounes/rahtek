import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize";

export interface ICategoryAttributes {
  id: number;
  name: string;
}

export const Category = sequelize.define<Model<ICategoryAttributes, {}>>(
  "Categories",
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
  },
  { tableName: "Categories" }
);
