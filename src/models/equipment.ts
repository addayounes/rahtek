import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize";
import { EquipmentsStatus } from "../types/equipment";

export interface IEquipmentAttributes {
  id: number;
  name: string;
  description: string;
  photo: string;
  wilaya: string;
  town: string;
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
  { tableName: "Equipments", timestamps: true }
);
