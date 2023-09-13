import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize";

export interface IUserAttributes {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string | null;
  googleId: string | null;
  facebookId: string | null;
}

export const User = sequelize.define<Model<IUserAttributes, {}>>(
  "Users",
  {
    id: { type: DataTypes.UUID, allowNull: false, primaryKey: true },
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: true, unique: true },
    phone: { type: DataTypes.STRING, allowNull: true, unique: true },
    password: { type: DataTypes.STRING, allowNull: true },
    googleId: { type: DataTypes.STRING, allowNull: true },
    facebookId: { type: DataTypes.STRING, allowNull: true },
  },
  {
    tableName: "Users",
    timestamps: true,
  }
);
