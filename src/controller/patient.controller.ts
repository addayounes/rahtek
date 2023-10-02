import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import type { Response, Request } from "express";
import * as patientService from "../service/patient.service";

export const handleCreatePatient = catchAsync(
  async (req: Request, res: Response) => {
    const patient = await patientService.createPatient({
      ...req.body,
      represented_by: req.user.id,
    });
    if (!patient) res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    return res.status(httpStatus.CREATED).json(patient);
  }
);

export const handleUpdatePatient = catchAsync(
  async (req: any, res: Response) => {
    const result = await patientService.updatePatient(req.params.id, req.body);
    if (!result) res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    return res.json(result);
  }
);

export const handleDeletePatient = catchAsync(
  async (req: any, res: Response) => {
    const result = await patientService.deletePatient(req.params.id);
    if (result?.error) res.status(httpStatus.NOT_FOUND).json(result.error);
    return res.json(result);
  }
);

export const handleGetUserPatients = catchAsync(
  async (req: any, res: Response) => {
    const result = await patientService.getUserPatients(req.user.id);
    return res.json(result);
  }
);
