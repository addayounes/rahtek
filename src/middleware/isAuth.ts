/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

import jwt, { type JwtPayload } from "jsonwebtoken";
import config from "../config/config";
import { getUserById } from "../service/user.service";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const { verify } = jwt;

const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers?.authorization;

  if (!authHeader || !authHeader?.startsWith("Bearer ")) {
    return res.sendStatus(httpStatus.UNAUTHORIZED);
  }

  const token: string | undefined = authHeader.split(" ")[1];

  if (!token) return res.sendStatus(httpStatus.UNAUTHORIZED);

  verify(
    token,
    config.jwt.access_token.secret,
    async (err: unknown, payload: JwtPayload) => {
      if (err) return res.sendStatus(httpStatus.FORBIDDEN); // invalid token
      req.user = await getUserById(payload.userId);
      next();
    }
  );
};

export default isAuth;
