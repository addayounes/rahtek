import { io } from "../lib/socket";
import { randomUUID } from "crypto";
import { getClientById } from "./socket.service";
import { SocketEvent } from "../utils/socketEvents";
import { getPaginationOptions } from "../utils/pagination";
import { INotificationAttributes, Notification } from "../models/notification";

export const createNotification = async (
  data: Omit<INotificationAttributes, "id" | "read">
) => {
  const result = await Notification.create({ ...data, id: randomUUID() });

  if (!result.dataValues) return null;

  sendNotification(
    result.dataValues.to,
    result.dataValues.event,
    result.dataValues
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

export const getUserNotifications = async (
  userId: string,
  options: { page: number; pageSize: number }
) => {
  try {
    const pagination = getPaginationOptions({
      page: options.page,
      pageSize: options.pageSize,
    });

    const result = await Notification.findAndCountAll({
      where: { to: userId },
      include: { all: true },
      order: [["createdAt", "DESC"]],
      ...pagination,
    });

    const unread = await Notification.count({
      where: { to: userId, read: false },
      include: { all: true },
    });

    return { ...result, unread };
  } catch (error: any) {
    console.log(error);
  }
};

export const readAllNotifications = async (userId: string) => {
  try {
    const result = await Notification.update(
      { read: true },
      { where: { to: userId } }
    );

    if (!result[0]) throw new Error();

    return { read: !!result[0] };
  } catch (error: any) {
    console.log(error);
  }
};
