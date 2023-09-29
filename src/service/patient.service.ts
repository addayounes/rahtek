import { randomUUID } from "crypto";
import logger from "../middleware/logger";
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
