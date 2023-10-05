import type { Response } from "express";
import catchAsync from "../utils/catchAsync";
import * as statsService from "../service/stats.service";

export const handleGetDashboardStats = catchAsync(
  async (req: any, res: Response) => {
    const result = await statsService.getDashboardStats(req.user?.id);
    return res.json(result);
  }
);
