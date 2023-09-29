import { Router } from "express";
import authRouter from "./auth.route";
import patientRouter from "./patient.route";

const mainRouter = Router();

mainRouter.use("/auth", authRouter);

mainRouter.use("/patient", patientRouter);

export { mainRouter };
