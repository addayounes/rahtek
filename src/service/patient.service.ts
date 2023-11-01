import fs from "fs";
import { randomUUID } from "crypto";
import logger from "../middleware/logger";
import { uploadPhoto } from "../utils/uploadPhoto";
import { IPatientAttributes, Patient } from "../models/patient";

export const createPatient = async (data: Omit<IPatientAttributes, "id">) => {
  try {
    const result = await Patient.create({ ...data, id: randomUUID() });

    if (!result.dataValues) throw new Error();

    return result.dataValues;
  } catch (error) {
    logger.error(error);
    return null;
  }
};

export const updatePatient = async (
  id: string,
  data: Partial<Omit<IPatientAttributes, "id" | "represented_by">>
) => {
  try {
    const result = await Patient.update(data, { where: { id } });

    if (!result[0]) throw new Error();

    return { success: true };
  } catch (error) {
    logger.error(error);
    return null;
  }
};

export const deletePatient = async (id: string) => {
  try {
    const result = await Patient.findOne({ where: { id } });

    if (!result?.dataValues) throw new Error("Patient not found");

    await result.destroy();

    return { success: true };
  } catch (error: any) {
    logger.error(error);
    return { error: error?.message };
  }
};

export const getUserPatients = async (userId: string) => {
  try {
    const result = await Patient.findAll({
      where: { represented_by: userId },
      include: { all: true },
    });
    return result;
  } catch (error: any) {
    logger.error(error);
    return { error: error?.message };
  }
};

export const getPatientById = async (id: string) => {
  try {
    const result = await Patient.findOne({
      where: { id },
      include: { all: true },
    });
    return result?.dataValues;
  } catch (error: any) {
    logger.error(error);
    return { error: error?.message };
  }
};

export const uploadPatientMedicalRecord = async (id: string, file: any) => {
  try {
    // upload the file to google cloud
    const uploadResult: any = await uploadPhoto(
      file,
      `medical_records/${file.filename}`
    );

    if (uploadResult?.error) return uploadResult.error;

    // delete the file from the server
    fs.unlinkSync(file.path);

    // update the patient's medical record link
    await updatePatient(id, { medical_record: uploadResult });

    return { url: uploadResult };
  } catch (error) {
    logger.error(error);
    return null;
  }
};
