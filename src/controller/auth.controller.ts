import jwt from "jsonwebtoken";
import httpStatus from "http-status";
import logger from "../middleware/logger";
import catchAsync from "../utils/catchAsync";
import type { Request, Response } from "express";
import * as authService from "../service/auth.service";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const { verify } = jwt;

export const handleSignUp = catchAsync(async (req: Request, res: Response) => {
  logger.info("Sign up");
  const user = await authService.signUp(req.body as any);
  if (!user)
    return res
      .status(httpStatus.CONFLICT)
      .json({ message: "Email already exists!" });
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

export const completeRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const result = await authService.completeRegistration(
      req.body,
      req.params["token"] as string
    );
    res.json(result);
  }
);

export const googleAuth = catchAsync(async (req: any, res: Response) => {
  if (!req.user?.id)
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: "Something went wrong" });

  const tokens = await authService.generateTokens(req.user.id);

  delete req.user.password;

  res.json({ user: req.user, ...tokens });
});

export const facebookAuth = catchAsync(async (req: any, res: Response) => {
  if (!req.user?.id)
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: "Something went wrong" });

  const tokens = await authService.generateTokens(req.user.id);

  delete req.user.password;

  res.json({ user: req.user, ...tokens });
});
