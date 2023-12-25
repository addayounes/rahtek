import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize";
import { SocketEvent } from "../utils/socketEvents";

export interface INotificationAttributes {
  id: string;
  from: string;
  to: string;
  event: SocketEvent;
  payload: any;
}

export const Notification = sequelize.define<
  Model<INotificationAttributes, {}>
>(
  "Notifications",
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    from: {
      type: DataTypes.UUID,
      references: { model: "Users", key: "id" },
      onDelete: "CASCADE",
      allowNull: true,
    },
    to: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "Users", key: "id" },
      onDelete: "CASCADE",
    },
    event: { type: DataTypes.STRING, allowNull: false },
    payload: { type: DataTypes.JSONB, allowNull: true },
  },
  { tableName: "Notifications", timestamps: true }
);
