import type { NextFunction, Request, Response } from "express";
import type { IFilterXSSOptions } from "xss";

export type RequireAtLeastOne<T> = {
  [K in keyof T]-?: Required<Pick<T, K>> &
    Partial<Pick<T, Exclude<keyof T, K>>>;
}[keyof T];

export type LatLng = [number, number];

// More strictly typed express middleware type
export type ExpressMiddleware<
  ReqBody = Record<string, unknown>,
  Res = Record<string, unknown>,
  QueryString = Record<string, unknown>
> = (
  req: Request<ReqBody, QueryString>,
  res: Response<Res>,
  next: NextFunction
) => Promise<void> | void;

export interface UserSignUpCredentials {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone: string;
}

export interface EmailRequestBody {
  email: string;
}

export interface ResetPasswordRequestBodyType {
  newPassword: string;
}

export type Sanitized<T> = T extends (...args: unknown[]) => unknown
  ? T // if T is a function, return it as is
  : T extends object
  ? {
      readonly [K in keyof T]: Sanitized<T[K]>;
    }
  : T;

export type SanitizeOptions = IFilterXSSOptions & {
  whiteList?: IFilterXSSOptions["whiteList"];
};
