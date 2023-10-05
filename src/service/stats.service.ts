import logger from "../middleware/logger";
import { Order } from "../models/order";
import { Equipment } from "../models/equipment";
import { OrderStatus } from "../types/order";

export const getDashboardStats = async (id: string) => {
  try {
    const finishedOrderCount = await Order.count({
      where: { status: OrderStatus.FINISHED },
      include: { model: Equipment, where: { published_by: id } },
    });

    const ongoingOrderCount = await Order.count({
      where: { status: OrderStatus.ONGOING },
      include: { model: Equipment, where: { published_by: id } },
    });

    const pendingOrderCount = await Order.count({
      where: { status: OrderStatus.PENDING },
      include: { model: Equipment, where: { published_by: id } },
    });

    const refusedOrderCount = await Order.count({
      where: { status: OrderStatus.REFUSED },
      include: { model: Equipment, where: { published_by: id } },
    });

    const equipmentCount = await Equipment.count({
      where: { published_by: id },
    });

    return {
      orders: {
        finished: finishedOrderCount,
        ongoing: ongoingOrderCount,
        pending: pendingOrderCount,
        refused: refusedOrderCount,
      },
      equipments: equipmentCount,
    };
  } catch (error) {
    logger.error(error);
  }
};
