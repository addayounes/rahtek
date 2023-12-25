import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize";
import { EquipmentsStatus, ITown, IWilaya } from "../types/equipment";
import { User } from "./user";
import { createSlug } from "../utils/createSlug";
import { Category } from "./category";

export interface IEquipmentAttributes {
  id: string;
  name: string;
  description: string;
  photo: string;
  wilaya: IWilaya | null;
  town: ITown | null;
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
    },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    photo: { type: DataTypes.STRING, allowNull: false },
    wilaya: { type: DataTypes.JSONB, allowNull: true },
    town: { type: DataTypes.JSONB, allowNull: true },
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
        const wilaya = instance.get("wilaya") as IWilaya;
        const town = instance.get("town") as ITown;
        const randomNumber = Math.floor(Math.random() * 10000);
        const slugText = `${name} ${wilaya?.name} ${randomNumber} ${town?.name} `;
        instance.set("slug", createSlug(slugText));
      },
    },
  }
);

User.hasMany(Equipment, { foreignKey: "id", onDelete: "CASCADE" });
Equipment.belongsTo(User, { foreignKey: "published_by", as: "user" });

Category.hasMany(Equipment, { foreignKey: "id", onDelete: "CASCADE" });
Equipment.belongsTo(Category, { foreignKey: "category_id", as: "category" });
