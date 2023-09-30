import { Router } from "express";
import authRouter from "./auth.route";
import patientRouter from "./patient.route";
import equipmentRouter from "./equipment.route";

const mainRouter = Router();

mainRouter.use("/auth", authRouter);

mainRouter.use("/patient", patientRouter);

mainRouter.use("/equipment", equipmentRouter);

export { mainRouter };
