import { io } from "../lib/socket";
import { randomUUID } from "crypto";
import { getClientById } from "./socket.service";
import { SocketEvent } from "../utils/socketEvents";
import { INotificationAttributes, Notification } from "../models/notification";

export const createNotification = async (
  data: Omit<INotificationAttributes, "id" | "read">
) => {
  const result = await Notification.create({ ...data, id: randomUUID() });

  if (!result.dataValues) return null;

  sendNotification(
    result.dataValues.to,
    result.dataValues.event,
    result.dataValues.payload
  );

  return result.dataValues;
};

export const sendNotification = (
  userId: string,
  event: SocketEvent,
  payload: any
) => {
  const reciever = getClientById(userId);

  if (!reciever) return;

  io.to(reciever.socketId).emit(event, payload);
};
