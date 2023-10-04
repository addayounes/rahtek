import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import type { Response } from "express";
import * as userService from "../service/user.service";

export const handleUpdateUserPassword = catchAsync(
  async (req: any, res: Response) => {
    const result = await userService.updateUserPassword(req.user?.id, req.body);
    if (result.error)
      return res.status(httpStatus.BAD_REQUEST).json(result.error);
    return res.json(result);
  }
);

export const handleUpdateUser = catchAsync(async (req: any, res: Response) => {
  const result = await userService.updateUser(req.user?.id, req.body);
  if (!result) return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  return res.json(result);
});
