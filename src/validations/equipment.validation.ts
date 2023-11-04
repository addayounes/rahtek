import Joi from "joi";
import { EquipmentsStatus } from "../types/equipment";

export const createSchema = {
  body: Joi.object().keys({
    name: Joi.string().required().min(1),
    description: Joi.string().required().min(1),
    wilaya: Joi.string().required(),
    town: Joi.string().required(),
    wilaya_ar: Joi.string().required(),
    town_ar: Joi.string().required(),
    category_id: Joi.string().required(),
  }),
};

export const updateSchema = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
  body: Joi.object().keys({
    name: Joi.string().min(1),
    description: Joi.string().min(1),
    wilaya: Joi.string(),
    town: Joi.string(),
    category_id: Joi.string(),
  }),
};

export const deleteSchema = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

export const getBySlugSchema = {
  params: Joi.object().keys({
    slug: Joi.string().required(),
  }),
};

export const getSchema = {
  query: Joi.object().keys({
    status: Joi.string().valid(
      EquipmentsStatus.AVAILABLE,
      EquipmentsStatus.TAKEN
    ),
    category: Joi.string().min(1),
    wilaya: Joi.string().min(1),
    town: Joi.string().min(1),
    search: Joi.string().min(1),
  }),
};
