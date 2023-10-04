import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import type { Response, Request } from "express";
import * as userService from "../service/user.service";

export const handleUpdateUserPassword = catchAsync(
  async (req: any, res: Response) => {
    const result = await userService.updateUserPassword(req.user?.id, req.body);
    if (result.error)
      return res.status(httpStatus.BAD_REQUEST).json(result.error);
    return res.json(result);
  }
);
