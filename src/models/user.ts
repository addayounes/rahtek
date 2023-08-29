import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize";

interface IUserAttributes {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const User = sequelize.define<Model<IUserAttributes>>(
  "User",
  {
    id: { type: DataTypes.UUID, allowNull: false, primaryKey: true },
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
  },
  {
    tableName: "Users",
    timestamps: true,
  }
);
