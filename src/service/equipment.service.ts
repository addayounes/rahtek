import fs from "fs";
import { Op } from "sequelize";
import { randomUUID } from "crypto";
import { User } from "../models/user";
import { Order } from "../models/order";
import logger from "../middleware/logger";
import { OrderStatus } from "../types/order";
import { Category } from "../models/category";
import { uploadPhoto } from "../utils/uploadPhoto";
import { getPaginationOptions } from "../utils/pagination";
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

export const getUserEquipments = async (
  userId: string,
  options: { page: number; pageSize: number }
) => {
  try {
    const pagination = getPaginationOptions({
      page: options.page,
      pageSize: options.pageSize,
    });

    const result = await Equipment.findAndCountAll({
      where: { published_by: userId },
      include: { all: true },
      ...pagination,
    });
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
    if (options.wilaya) where.wilaya = { id: options.wilaya };
    if (options.town) where.town = { id: options.town };
    if (options.user) where.published_by = options.user;
    if (options.search) {
      where = {
        ...where,
        [Op.or]: [
          { name: { [Op.iLike]: `%${options.search}%` } },
          { description: { [Op.iLike]: `%${options.search}%` } },
          { "wilaya.name": { [Op.iLike]: `%${options.search}%` } },
          { "town.name": { [Op.iLike]: `%${options.search}%` } },
        ],
      };
    }

    const pagination = getPaginationOptions({
      page: options?.page,
      pageSize: options?.pageSize,
    });

    let result = await Equipment.findAndCountAll({
      where,
      include: { all: true },
      order: ["createdAt"],
      ...pagination,
    });

    return result;
  } catch (error: any) {
    logger.error(error);
    return { error: error?.message };
  }
};

export const getEquipmentById = async (id: string) => {
  try {
    const result = await Equipment.findOne({
      where: { id },
      include: [
        { model: User, as: "user" },
        { model: Category, as: "category" },
      ],
    });
    return result;
  } catch (error: any) {
    logger.error(error);
    return { error: error?.message };
  }
};

export const getEquipmentBySlug = async (slug: string) => {
  try {
    const result = await Equipment.findOne({
      where: { slug },
      include: [
        { model: User, as: "user" },
        { model: Category, as: "category" },
      ],
    });
    return result;
  } catch (error: any) {
    logger.error(error);
    return { error: error?.message };
  }
};

export const getCategories = async () => {
  try {
    const result = await Category.findAll();
    return result;
  } catch (error: any) {
    logger.error(error);
    return { error: error?.message };
  }
};

export const updateEquipmentPhoto = async (file: any) => {
  try {
    // upload the file to google cloud
    const uploadResult: any = await uploadPhoto(
      file,
      `equipments/${file.filename}`
    );

    if (uploadResult?.error) return uploadResult.error;

    // delete the file from the server
    fs.unlinkSync(file.path);

    return { url: uploadResult };
  } catch (error) {
    logger.error(error);
    return null;
  }
};

export const getEquipmentWaitingList = async (id: string) => {
  try {
    const result = await Order.findAll({
      where: { equipment_id: id, status: OrderStatus.PENDING },
      include: { all: true },
      order: [["createdAt", "DESC"]],
    });

    return result;
  } catch (error) {
    logger.error(error);
    return null;
  }
};
