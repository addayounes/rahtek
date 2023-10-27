import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize";
import { EquipmentsStatus } from "../types/equipment";
import { User } from "./user";
import { createSlug } from "../utils/createSlug";

export interface IEquipmentAttributes {
  id: number;
  name: string;
  description: string;
  photo: string;
  wilaya: string;
  town: string;
  slug: string;
  status: EquipmentsStatus;
  category_id: string;
  published_by: string;
}

export const Equipment = sequelize.define<Model<IEquipmentAttributes, {}>>(
  "Equipments",
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    photo: { type: DataTypes.STRING, allowNull: false },
    wilaya: { type: DataTypes.STRING, allowNull: false },
    town: { type: DataTypes.STRING, allowNull: false },
    slug: { type: DataTypes.STRING, allowNull: true, unique: true },
    status: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: [EquipmentsStatus.AVAILABLE, EquipmentsStatus.TAKEN],
      defaultValue: EquipmentsStatus.AVAILABLE,
    },
    category_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "Categories", key: "id" },
      onDelete: "CASCADE",
    },
    published_by: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "Users", key: "id" },
      onDelete: "CASCADE",
    },
  },
  {
    tableName: "Equipments",
    timestamps: true,
    hooks: {
      beforeCreate: (instance) => {
        const name = instance.get("name") as string;
        const wilaya = instance.get("wilaya") as string;
        const town = instance.get("town") as string;
        const randomNumber = Math.floor(Math.random() * 10000);
        const slugText = `${name} ${wilaya} ${randomNumber} ${town} `;
        instance.set("slug", createSlug(slugText));
      },
    },
  }
);

User.hasMany(Equipment, { foreignKey: "id", onDelete: "CASCADE" });
Equipment.belongsTo(User, { foreignKey: "published_by", as: "user" });
