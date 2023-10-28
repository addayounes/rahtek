import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import type { Response, Request } from "express";
import * as equipmentService from "../service/equipment.service";

export const handleCreateEquipment = catchAsync(
  async (req: any, res: Response) => {
    if (!req.file)
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: "No file uploaded." });

    const equipmentPhoto = await equipmentService.updateEquipmentPhoto(
      req.file
    );

    if (!equipmentPhoto?.url)
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: "Error while uploading the photo." });

    const equipment = await equipmentService.createEquipment({
      ...req.body,
      photo: equipmentPhoto.url,
      published_by: req.user?.id,
    });

    if (!equipment) return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);

    return res.status(httpStatus.CREATED).json(equipment);
  }
);

export const handleUpdateEquipment = catchAsync(
  async (req: any, res: Response) => {
    const result = await equipmentService.updateEquipment(
      req.params.id,
      req.body
    );
    if (!result) return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    return res.json(result);
  }
);

export const handleDeleteEquipment = catchAsync(
  async (req: any, res: Response) => {
    const result = await equipmentService.deleteEquipment(req.params.id);
    if (result?.error)
      return res.status(httpStatus.NOT_FOUND).json(result.error);
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

export const handleGetEquipmentById = catchAsync(
  async (req: any, res: Response) => {
    const result = await equipmentService.getEquipmentById(req.params?.id);
    return res.json(result);
  }
);

export const handleGetEquipmentBySlug = catchAsync(
  async (req: any, res: Response) => {
    const result = await equipmentService.getEquipmentBySlug(req.params?.slug);
    return res.json(result);
  }
);
