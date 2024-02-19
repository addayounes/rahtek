import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize";
import { SocketEvent } from "../utils/socketEvents";
import { User } from "./user";

export interface INotificationAttributes {
  id: string;
  from: string;
  to: string;
  event: SocketEvent;
  payload: any;
  read: boolean;
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
    read: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  },
  { tableName: "Notifications", timestamps: true }
);

User.hasMany(Notification, { foreignKey: "to", onDelete: "CASCADE" });
Notification.belongsTo(User, { foreignKey: "to", as: "to_user" });

User.hasMany(Notification, { foreignKey: "from", onDelete: "CASCADE" });
Notification.belongsTo(User, { foreignKey: "from", as: "from_user" });
