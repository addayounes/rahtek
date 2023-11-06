import Joi from "joi";

export const updateSchema = {
  body: Joi.object().keys({
    first_name: Joi.string(),
    last_name: Joi.string(),
    phone: Joi.string(),
    wilaya: Joi.any(),
    town: Joi.any(),
  }),
};

export const updatePasswordSchema = {
  body: Joi.object().keys({
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().required(),
  }),
};

export const getBySlugSchema = {
  params: Joi.object().keys({
    slug: Joi.string().required(),
  }),
};
