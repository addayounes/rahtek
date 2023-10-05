import { Router } from "express";
import isAuth from "../../middleware/isAuth";
import { handleGetDashboardStats } from "../../controller/stats.controller";

const statsRouter = Router();

statsRouter.route("/").get(isAuth, handleGetDashboardStats);

export default statsRouter;
