import type { Response, Request } from "express";
import httpStatus from "http-status";
import * as authService from "../service/auth.service";

export const handleForgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  const result = await authService.forgotPassword(email);
  return res.status(httpStatus.OK).json(result);
};

export const handleResetPassword = async (req: Request, res: Response) => {
  const { password, token } = req.body;
  const result = await authService.resetPassword(password, token);
  return res.status(httpStatus.OK).json(result);
};
