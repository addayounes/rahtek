import { User } from "../models/user";
import logger from "../middleware/logger";

export const getUserById = async (id: string) => {
  try {
    const result = await User.findOne({ where: { id } });

    if (!result?.dataValues) throw new Error();

    return result.dataValues;
  } catch (error) {
    logger.error(error);
    return null;
  }
};
