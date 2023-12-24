import { randomUUID } from "crypto";
import logger from "../middleware/logger";
import { Equipment } from "../models/equipment";
import { Order, IOrderAttributes } from "../models/order";
import { getPaginationOptions } from "../utils/pagination";

export const createOrder = async (data: Omit<IOrderAttributes, "status">) => {
  try {
    const result = await Order.create({ ...data, id: randomUUID() });

    if (!result.dataValues) throw new Error();

    return result.dataValues;
  } catch (error) {
    logger.error(error);
    return null;
  }
};

export const updateOrder = async (
  id: string,
  data: Partial<Pick<IOrderAttributes, "return_date" | "status">>
) => {
  try {
    const result = await Order.update(data, { where: { id } });

    if (!result[0]) throw new Error();

    const order = await Order.findOne({ where: { id } });

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
