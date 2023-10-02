import { randomUUID } from "crypto";
import { User } from "../models/user";
import logger from "../middleware/logger";
import { Order, IOrderAttributes } from "../models/order";

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

export const getSupplierOrders = async (userId: string) => {
  try {
    // TODO: add filters, sort, and search
    const result = await Order.findAll({
      include: [{ model: User, where: { id: userId } }, { all: true }],
    });
    return result;
  } catch (error: any) {
    logger.error(error);
    return { error: error?.message };
  }
};
