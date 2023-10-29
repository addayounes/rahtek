import Joi from "joi";
import { IUserAttributes } from "../models/user";

export const signupSchema = {
  body: Joi.object<Omit<IUserAttributes, "id">>().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
    first_name: Joi.string().required().min(2),
    last_name: Joi.string().required().min(2),
    wilaya: Joi.string().required(),
    town: Joi.string().required(),
  }),
};

export const loginSchema = {
  body: Joi.object<Pick<IUserAttributes, "email" | "password">>().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
};

export const sendOTPSchema = {
  body: Joi.object().keys({
    phone: Joi.string().required().min(6),
  }),
};

export const verifyOTPSchema = {
  body: Joi.object().keys({
    phone: Joi.string().required().min(6),
    code: Joi.string().required(),
  }),
};

export const completeRegistrationSchema = {
  body: Joi.object<Omit<IUserAttributes, "id">>().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
    first_name: Joi.string().required().min(2),
    last_name: Joi.string().required().min(2),
    wilaya: Joi.string().required(),
    town: Joi.string().required(),
  }),
  params: Joi.object().keys({
    token: Joi.string().required().min(1),
  }),
};

export const refershSchema = {
  body: Joi.object().keys({
    token: Joi.string().required().min(6),
  }),
};

export const forgotPasswordSchema = {
  body: Joi.object<{ email: string }>().keys({
    email: Joi.string().required().email(),
  }),
};

export const resetPasswordSchema = {
  body: Joi.object().keys({
    password: Joi.string().required().min(6),
    token: Joi.string().required().min(1),
  }),
};
