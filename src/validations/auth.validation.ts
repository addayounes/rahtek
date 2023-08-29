import Joi from "joi";
import type { EmailRequestBody } from "../types/types";
import { IUserAttributes } from "../models/user";

export const signupSchema = {
  body: Joi.object<Omit<IUserAttributes, "id">>().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
    firstName: Joi.string().required().min(2),
    lastName: Joi.string().required().min(2),
  }),
};

export const loginSchema = {
  body: Joi.object<Pick<IUserAttributes, "email" | "password">>().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
};

export const refershSchema = {
  body: Joi.object().keys({
    token: Joi.string().required().min(6),
  }),
};

export const forgotPasswordSchema = {
  body: Joi.object<EmailRequestBody>().keys({
    email: Joi.string().required().email(),
  }),
};

export const resetPasswordSchema = {
  body: Joi.object().keys({
    newPassword: Joi.string().required().min(6),
  }),
  params: Joi.object().keys({
    token: Joi.string().required().min(1),
  }),
};
