import Joi from "joi";
import { OrderStatus } from "../types/order";

export const createSchema = {
  body: Joi.object().keys({
    patient_id: Joi.string().required(),
    gaurantee_id: Joi.string().required(),
    equipment_id: Joi.string().required(),
    date: Joi.date().required(),
    return_date: Joi.date().required(),
    comment: Joi.string().max(400).allow(""),
  }),
};

export const updateSchema = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
  body: Joi.object().keys({
    status: Joi.string().valid(
      OrderStatus.FINISHED,
      OrderStatus.ONGOING,
      OrderStatus.REFUSED,
      OrderStatus.PENDING
    ),
    return_date: Joi.date(),
  }),
};

export const deleteSchema = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

export const refuseSchema = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
  body: Joi.object().keys({
    refusal_reason: Joi.string(),
  }),
};

export const getSupplierEquipmentsSchema = {
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
  }),
};
