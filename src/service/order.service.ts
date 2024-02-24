import { randomUUID } from "crypto";
import logger from "../middleware/logger";
import { EVENTS } from "../utils/socketEvents";
import { Equipment } from "../models/equipment";
import { Notification } from "../models/notification";
import { getEquipmentById } from "./equipment.service";
import { Order, IOrderAttributes } from "../models/order";
import { getPaginationOptions } from "../utils/pagination";
import { createNotification } from "./notification.service";
import { Op } from "sequelize";

export const createOrder = async (data: Omit<IOrderAttributes, "status">) => {
  try {
    const result = await Order.create({ ...data, id: randomUUID() });

    if (!result.dataValues) throw new Error();

    if (result?.dataValues) {
      const equipment: any = await getEquipmentById(
        result.dataValues.equipment_id
      );

      await createNotification({
        from: result.dataValues.gaurantee_id,
        to: equipment?.published_by,
        event: EVENTS.REQUEST_CREATED,
        payload: result.dataValues,
      });
    }

    return result.dataValues;
  } catch (error) {
    logger.error(error);
    return null;
  }
};

export const updateOrder = async (
  id: string,
  data: Partial<
    Pick<IOrderAttributes, "return_date" | "status" | "refusal_reason">
  >
) => {
  try {
    const result = await Order.update(data, { where: { id } });

    if (!result[0]) throw new Error();

    const order = await Order.findOne({ where: { id }, include: [Equipment] });

    if (order?.dataValues) {
      await createNotification({
        from: (order.dataValues as any)?.Equipment?.dataValues?.published_by,
        to: order?.dataValues.gaurantee_id,
        event: EVENTS.REQUEST_UPDATE,
        payload: order?.dataValues,
      });
    }

    return order?.dataValues;
  } catch (error) {
    logger.error(error);
    return null;
  }
};

export const deleteOrder = async (id: string) => {
  try {
    const result = await Order.findOne({ where: { id } });

    if (!result?.dataValues) throw new Error("Order not found");

    await result.destroy();

    return { success: true };
  } catch (error: any) {
    logger.error(error);
    return { error: error?.message };
  }
};

export const getUserOrders = async (userId: string) => {
  try {
    const result = await Order.findAll({
      where: { gaurantee_id: userId },
      include: { all: true },
    });
    return result;
  } catch (error: any) {
    logger.error(error);
    return { error: error?.message };
  }
};

export const getSupplierOrders = async (
  userId: string,
  options: { page: number; pageSize: number }
) => {
  try {
    const pagination = getPaginationOptions({
      page: options.page,
      pageSize: options.pageSize,
    });

    const result = await Order.findAndCountAll({
      include: [
        { model: Equipment, where: { published_by: userId } },
        { all: true },
      ],
      ...pagination,
    });

    return result;
  } catch (error: any) {
    logger.error(error);
    return { error: error?.message };
  }
};

export const getOrderLogs = async (orderId: string) => {
  try {
    const result = await Notification.findAll({
      where: {
        payload: {
          [Op.contains]: {
            id: orderId,
          },
        },
      },
    });

    return result;
  } catch (error: any) {
    logger.error(error);
    return { error: error?.message };
  }
};
