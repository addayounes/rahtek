import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize";
import { UserRoles } from "../types/user";

export interface IUserAttributes {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  wilaya: string | null;
  town: string | null;
  wilaya_ar: string;
  town_ar: string;
  slug: string;
  photo: string | null;
  identity_card: string | null;
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
    wilaya: { type: DataTypes.STRING, allowNull: true },
    town: { type: DataTypes.STRING, allowNull: true },
    wilaya_ar: { type: DataTypes.STRING, allowNull: true },
    town_ar: { type: DataTypes.STRING, allowNull: true },
    slug: { type: DataTypes.STRING, allowNull: true },
    photo: { type: DataTypes.STRING, allowNull: true },
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
    hooks: {
      beforeCreate: (instance) => {
        const first_name = instance.get("first_name") as string;
        const last_name = instance.get("last_name") as string;
        const randomNumber = Math.floor(Math.random() * 1000);
        const slugText = `${first_name}${last_name}${randomNumber}`;
        instance.set("slug", slugText.toLowerCase());
      },
    },
  }
);
