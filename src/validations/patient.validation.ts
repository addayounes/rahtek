import Joi from "joi";

export const createSchema = {
  body: Joi.object().keys({
    first_name: Joi.string().required().min(2),
    last_name: Joi.string().required().min(2),
    phone: Joi.string().required().min(6),
    address: Joi.string().min(2),
    medical_record: Joi.string(),
    represented_by: Joi.string().required(),
  }),
};

export const updateSchema = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
  body: Joi.object().keys({
    first_name: Joi.string().min(2),
    last_name: Joi.string().min(2),
    phone: Joi.string().min(6),
    address: Joi.string().min(2),
    medical_record: Joi.string(),
  }),
};

export const deleteSchema = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};
