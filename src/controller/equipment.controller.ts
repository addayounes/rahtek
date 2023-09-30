import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import type { Response, Request } from "express";
import * as equipmentService from "../service/equipment.service";

export const handleCreateEquipment = catchAsync(
  async (req: Request, res: Response) => {
    const equipment = await equipmentService.createEquipment({
      ...req.body,
      published_by: req.user?.id,
    });
    if (!equipment) res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    return res.status(httpStatus.CREATED).json(equipment);
  }
);

export const handleUpdateEquipment = catchAsync(
  async (req: any, res: Response) => {
    const result = await equipmentService.updateEquipment(
      req.params.id,
      req.body
    );
    if (!result) res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    return res.json(result);
  }
);

export const handleDeleteEquipment = catchAsync(
  async (req: any, res: Response) => {
    const result = await equipmentService.deleteEquipment(req.params.id);
    if (result?.error) res.status(httpStatus.NOT_FOUND).json(result.error);
    return res.json(result);
  }
);

export const handleGetUserEquipments = catchAsync(
  async (req: any, res: Response) => {
    const result = await equipmentService.getUserEquipments(req.params.id);
    return res.json(result);
  }
);

export const handleGetEquipments = catchAsync(
  async (req: Request, res: Response) => {
    const result = await equipmentService.getEquipments(req.query);
    return res.json(result);
  }
);
