import jwt from "jsonwebtoken";
import httpStatus from "http-status";
import logger from "../middleware/logger";
import catchAsync from "../utils/catchAsync";
import type { Request, Response } from "express";
import { IUserAttributes } from "../models/user";
import * as authService from "../service/auth.service";
import * as smsService from "../service/sms.service";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const { verify } = jwt;

export const handleSignUp = catchAsync(async (req: Request, res: Response) => {
  logger.info("Sign up");
  const user = await authService.signUp(
    req.body as Omit<IUserAttributes, "id">
  );
  if (!user)
    res.status(httpStatus.CONFLICT).json({ message: "Email already exists!" });
  res.status(httpStatus.CREATED).json({ ...user });
});

export const handleLogin = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const result: any = await authService.login(email, password);
  if (!result.user) throw new Error(result.message);
  return res.json(result);
});

export const handleLogout = catchAsync(async (req: Request, res: Response) => {
  const token = req.body.token;
  const result = await authService.logout(token);
  if (!result) return res.sendStatus(httpStatus.BAD_REQUEST);
  return res.sendStatus(httpStatus.NO_CONTENT);
});

export const handleRefresh = catchAsync(async (req: Request, res: Response) => {
  const token = req.body.token;
  const result = await authService.refresh(token);
  if (!result) return res.status(httpStatus.UNAUTHORIZED);
  return res.json(result);
});

export const sendOTP = catchAsync(async (req: Request, res: Response) => {
  const phone = req.body.phone;
  const result = await authService.sendOTP(phone);
  return res.json(result);
});

export const verifyOTP = catchAsync(async (req: Request, res: Response) => {
  const { phone, code } = req.body;
  const result = await authService.verifyOTP(phone, code);
  if (!result.success) return res.status(httpStatus.UNAUTHORIZED).json(result);
  res.json(result);
});
