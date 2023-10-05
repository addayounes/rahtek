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

export const handleUploadUserPhoto = catchAsync(
  async (req: any, res: Response) => {
    if (!req.file)
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: "No file uploaded." });
    const result = await userService.updateUserPhoto(req.user?.id, req.file);
    return res.json(result);
  }
);

export const handleUploadUserIdentityCard = catchAsync(
  async (req: any, res: Response) => {
    if (!req.file)
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: "No file uploaded." });
    const result = await userService.updateUserIdentityCard(
      req.user?.id,
      req.file
    );
    return res.json(result);
  }
);
