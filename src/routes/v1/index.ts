import { Router } from "express";
import authRouter from "./auth.route";
import patientRouter from "./patient.route";
import equipmentRouter from "./equipment.route";
import orderRouter from "./order.route";
import userRouter from "./user.route";
import statsRouter from "./stats.route";
import { handleGetCategories } from "../../controller/equipment.controller";

const mainRouter = Router();

mainRouter.use("/auth", authRouter);

mainRouter.use("/patient", patientRouter);

mainRouter.use("/equipment", equipmentRouter);

mainRouter.use("/order", orderRouter);

mainRouter.use("/user", userRouter);

mainRouter.use("/stats", statsRouter);

// TODO: extract it into a seperate router
mainRouter.get("/categories", handleGetCategories);

export { mainRouter };
