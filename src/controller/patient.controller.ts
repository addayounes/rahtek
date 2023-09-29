import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import type { Response, Request } from "express";
import * as patientService from "../service/patient.service";

export const handleCreatePatient = catchAsync(
  async (req: Request, res: Response) => {
    const patient = await patientService.createPatient(req.body);
    if (!patient) res.status(httpStatus.INTERNAL_SERVER_ERROR);
    return res.status(httpStatus.CREATED).json(patient);
  }
);
