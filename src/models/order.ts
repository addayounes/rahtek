import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize";
import { OrderStatus } from "../types/order";

export interface IOrderAttributes {
  id: string;
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
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    patient_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "Patients", key: "id" },
      onDelete: "CASCADE",
    },
    gaurantee_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "Users", key: "id" },
      onDelete: "CASCADE",
    },
    equipment_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "Equipments", key: "id" },
      onDelete: "CASCADE",
    },
    date: { type: DataTypes.DATEONLY, allowNull: false },
    return_date: { type: DataTypes.DATE, allowNull: true },
    status: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: [
        OrderStatus.PENDING,
        OrderStatus.ONGOING,
        OrderStatus.FINISHED,
        OrderStatus.REFUSED,
      ],
      defaultValue: OrderStatus.PENDING,
    },
  },
  {
    tableName: "Orders",
    timestamps: true,
  }
);
