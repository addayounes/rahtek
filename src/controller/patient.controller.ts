import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import type { Response } from "express";
import * as patientService from "../service/patient.service";

export const handleCreatePatient = catchAsync(
  async (req: any, res: Response) => {
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

export const handleUploadPatientMedicalRecord = catchAsync(
  async (req: any, res: Response) => {
    const patient: any = await patientService.getPatientById(req.params.id);

    if (!patient)
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: "Patient doesn't exist." });

    if (patient.represented_by !== req.user.id)
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: "Patient isn't associated with the current user." });

    if (!req.file)
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: "No file uploaded." });

    const result = await patientService.uploadPatientMedicalRecord(
      req.params.id,
      req.file
    );

    return res.json(result);
  }
);
