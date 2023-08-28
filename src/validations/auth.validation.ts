import Joi from "joi";
import type {
  UserLoginCredentials,
  UserSignUpCredentials,
} from "../types/types";
import type { EmailRequestBody } from "../types/types";

export const signupSchema = {
  body: Joi.object<UserSignUpCredentials>().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
    username: Joi.string().required().min(2),
  }),
};

export const loginSchema = {
  body: Joi.object<UserLoginCredentials>().keys({
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
