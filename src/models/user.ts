import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize";
import * as argon2 from "argon2";

export interface IUserAttributes {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const User = sequelize.define<Model<IUserAttributes, {}>>(
  "Users",
  {
    id: { type: DataTypes.UUID, allowNull: false, primaryKey: true },
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value: string) {
        argon2.hash(value).then((hashed) => {
          this.setDataValue("password", hashed);
        });
      },
    },
  },
  {
    tableName: "Users",
    timestamps: true,
  }
);
