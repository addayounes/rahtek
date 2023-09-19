import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize";
import { UserRoles } from "../types/user";

export interface IUserAttributes {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  identity_card: string;
  role: UserRoles;
  password: string | null;
  googleId: string | null;
  facebookId: string | null;
}

export const User = sequelize.define<Model<IUserAttributes, {}>>(
  "Users",
  {
    id: { type: DataTypes.UUID, allowNull: false, primaryKey: true },
    first_name: { type: DataTypes.STRING, allowNull: false },
    last_name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: true, unique: true },
    phone: { type: DataTypes.STRING, allowNull: true, unique: true },
    address: { type: DataTypes.STRING, allowNull: true },
    identity_card: { type: DataTypes.STRING, allowNull: true },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      values: [UserRoles.RECIPIENT, UserRoles.SUPPLIER],
    },
    password: { type: DataTypes.STRING, allowNull: true },
    googleId: { type: DataTypes.STRING, allowNull: true },
    facebookId: { type: DataTypes.STRING, allowNull: true },
  },
  {
    tableName: "Users",
    timestamps: true,
  }
);
