import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize";
import { OrderStatus } from "../types/order";

export interface IOrderAttributes {
  patient_id: string;
  gaurantee_id: string;
  equipment_id: string;
  date: string;
  return_date: string | null;
  status: OrderStatus;
}

export const Order = sequelize.define<Model<IOrderAttributes, {}>>(
  "Orders",
  {
    patient_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "Patients", key: "id" },
      onDelete: "CASCADE",
      primaryKey: true,
    },
    gaurantee_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "Users", key: "id" },
      onDelete: "CASCADE",
      primaryKey: true,
    },
    equipment_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "Equipments", key: "id" },
      onDelete: "CASCADE",
      primaryKey: true,
    },
    date: { type: DataTypes.DATEONLY, allowNull: false, primaryKey: true },
    return_date: { type: DataTypes.DATE, allowNull: true },
    status: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: [OrderStatus.PENDING, OrderStatus.ONGOING, OrderStatus.FINISHED],
      defaultValue: OrderStatus.PENDING,
    },
  },
  {
    tableName: "Orders",
    timestamps: true,
  }
);
