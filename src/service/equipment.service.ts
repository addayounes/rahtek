import { Op } from "sequelize";
import { randomUUID } from "crypto";
import logger from "../middleware/logger";
import { Equipment, IEquipmentAttributes } from "../models/equipment";

export const createEquipment = async (
  data: Omit<IEquipmentAttributes, "id" | "status">
) => {
  try {
    const result = await Equipment.create({ ...data, id: randomUUID() });

    if (!result.dataValues) throw new Error();

    return result.dataValues;
  } catch (error) {
    logger.error(error);
    return null;
  }
};

export const updateEquipment = async (
  id: string,
  data: Partial<Omit<IEquipmentAttributes, "id" | "published_by">>
) => {
  try {
    const result = await Equipment.update(data, { where: { id } });

    if (!result[0]) throw new Error();

    return { success: true };
  } catch (error) {
    logger.error(error);
    return null;
  }
};

export const deleteEquipment = async (id: string) => {
  try {
    const result = await Equipment.findOne({ where: { id } });

    if (!result?.dataValues) throw new Error("Equipment not found");

    await result.destroy();

    return { success: true };
  } catch (error: any) {
    logger.error(error);
    return { error: error?.message };
  }
};

export const getUserEquipments = async (userId: string) => {
  try {
    const result = await Equipment.findAll({ where: { published_by: userId } });
    return result;
  } catch (error: any) {
    logger.error(error);
    return { error: error?.message };
  }
};

export const getEquipments = async (options: any) => {
  try {
    let where: any = {};

    if (options.status) where.status = options.status;
    if (options.category) where.category_id = options.category;
    if (options.wilaya) where.wilaya = options.wilaya;
    if (options.town) where.town = options.town;

    if (options.search)
      where = {
        ...where,
        [Op.or]: [
          { name: { [Op.like]: `%${options.search}%` } },
          { description: { [Op.like]: `%${options.search}%` } },
          { wilaya: { [Op.like]: `%${options.search}%` } },
          { town: { [Op.like]: `%${options.search}%` } },
        ],
      };

    const result = await Equipment.findAll({
      where,
      include: { all: true },
      order: ["createdAt", "DESC"],
    });

    return result;
  } catch (error: any) {
    logger.error(error);
    return { error: error?.message };
  }
};
