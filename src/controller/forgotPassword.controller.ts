import type { Response, Request } from "express";
import httpStatus from "http-status";
import * as authService from "../service/auth.service";
import catchAsync from "../utils/catchAsync";

export const handleForgotPassword = catchAsync(
  async (req: Request, res: Response) => {
    const { email } = req.body;
    const result = await authService.forgotPassword(email);
    return res.status(httpStatus.OK).json(result);
  }
);

export const handleResetPassword = catchAsync(
  async (req: Request, res: Response) => {
    const { password, token } = req.body;
    const result = await authService.resetPassword(password, token);
    return res.status(httpStatus.OK).json(result);
  }
);
