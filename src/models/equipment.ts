import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize";
import { EquipmentsType } from "src/types/equipment";

export interface IEquipmentAttributes {
  id: number;
  name: string;
  description: string;
  photo: string;
  status: EquipmentsType;
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
    status: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: [EquipmentsType.AVAILABLE, EquipmentsType.TAKEN],
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
  { tableName: "Equipments" }
);
