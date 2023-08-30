import jwt from "jsonwebtoken";
import httpStatus from "http-status";
import type { Request, Response } from "express";
import { IUserAttributes } from "../models/user";
import * as authService from "../service/auth.service";
import logger from "../middleware/logger";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const { verify } = jwt;

export const handleSignUp = async (req: Request, res: Response) => {
  try {
    logger.info("Sign up");
    const user = await authService.signUp(
      req.body as Omit<IUserAttributes, "id">
    );
    if (!user)
      res
        .status(httpStatus.CONFLICT)
        .json({ message: "Email already exists!" });
    res.status(httpStatus.CREATED).json({ ...user });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR);
  }
};

export const handleLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const result: any = await authService.login(email, password);
    if (!result.user) throw new Error(result.message);
    return res.json(result);
  } catch (err: any) {
    return res.status(httpStatus.UNAUTHORIZED).json({ message: err?.message });
  }
};

export const handleLogout = async (req: Request, res: Response) => {
  const token = req.body.token;
  try {
    const result = await authService.logout(token);
    console.log(result);

    if (!result) return res.sendStatus(httpStatus.BAD_REQUEST);
    return res.sendStatus(httpStatus.NO_CONTENT);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR);
  }
};

export const handleRefresh = async (req: Request, res: Response) => {
  const token = req.body.token;
  try {
    const result = await authService.refresh(token);
    if (!result) return res.status(httpStatus.UNAUTHORIZED);
    return res.json(result);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR);
  }
};
