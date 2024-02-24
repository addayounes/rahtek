import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import type { Response, Request } from "express";
import * as orderService from "../service/order.service";
import * as equipmentService from "../service/equipment.service";
import { OrderStatus } from "../types/order";
import { EquipmentsStatus } from "../types/equipment";
import { UserRoles } from "../types/user";

export const handleCreateOrder = catchAsync(
  async (req: Request, res: Response) => {
    const order = await orderService.createOrder(req.body);
    if (!order) return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    return res.status(httpStatus.CREATED).json(order);
  }
);

export const handleUpdateOrder = catchAsync(async (req: any, res: Response) => {
  const result = await orderService.updateOrder(req.params.id, req.body);
  if (!result) return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  return res.json(result);
});

export const handleApproveOrder = catchAsync(
  async (req: any, res: Response) => {
    const result = await orderService.updateOrder(req.params.id, {
      status: OrderStatus.ONGOING,
    });

    if (!result) return res.sendStatus(httpStatus.BAD_REQUEST);

    await equipmentService.updateEquipment(result.equipment_id, {
      status: EquipmentsStatus.TAKEN,
    });

    if (!result) return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);

    return res.json(result);
  }
);

export const handleRefuseOrder = catchAsync(async (req: any, res: Response) => {
  const result = await orderService.updateOrder(req.params.id, {
    status: OrderStatus.REFUSED,
    refusal_reason: req.body?.refusal_reason ?? null,
  });
  if (!result) return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  return res.json(result);
});

export const handleFinishOrder = catchAsync(async (req: any, res: Response) => {
  const result = await orderService.updateOrder(req.params.id, {
    status: OrderStatus.FINISHED,
  });

  if (!result) return res.sendStatus(httpStatus.BAD_REQUEST);

  await equipmentService.updateEquipment(result.equipment_id, {
    status: EquipmentsStatus.AVAILABLE,
  });

  if (!result) return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);

  return res.json(result);
});

export const handleDeleteOrder = catchAsync(async (req: any, res: Response) => {
  const result = await orderService.deleteOrder(req.params.id);
  if (result?.error) return res.status(httpStatus.NOT_FOUND).json(result.error);
  return res.json(result);
});

export const handleGetUserOrders = catchAsync(
  async (req: any, res: Response) => {
    if (req.user?.role !== UserRoles.RECIPIENT)
      return res.sendStatus(httpStatus.BAD_REQUEST);

    const result = await orderService.getUserOrders(req.user.id);
    return res.json(result);
  }
);

export const handleGetSupplierOrders = catchAsync(
  async (req: any, res: Response) => {
    if (req.user?.role !== UserRoles.SUPPLIER)
      return res.sendStatus(httpStatus.BAD_REQUEST);

    const result = await orderService.getSupplierOrders(req.user.id, {
      page: req.query?.page,
      pageSize: req.query?.pageSize,
    });
    return res.json(result);
  }
);

export const handleGetOrderLogs = catchAsync(
  async (req: any, res: Response) => {
    const result = await orderService.getOrderLogs(req.params.id);
    return res.json(result);
  }
);
