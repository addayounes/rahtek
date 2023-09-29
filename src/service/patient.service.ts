import { Patient } from "../models/patient";
import logger from "../middleware/logger";

export const createPatient = async (data: any) => {
  try {
    const result = await Patient.create(data);

    if (!result.dataValues) throw new Error();

    return result.dataValues;
  } catch (error) {
    logger.error(error);
    return null;
  }
};
