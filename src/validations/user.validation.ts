import Joi from "joi";

export const updateSchema = {
  body: Joi.object().keys({
    first_name: Joi.string(),
    last_name: Joi.string(),
    phone: Joi.string(),
    address: Joi.string(),
  }),
};

export const updatePasswordSchema = {
  body: Joi.object().keys({
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().required(),
  }),
};
