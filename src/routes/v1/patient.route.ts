import { Router } from "express";
import validate from "../../middleware/validate";
import { createSchema } from "../../validations/patient.validation";
import { handleCreatePatient } from "../../controller/patient.controller";

const patientRouter = Router();

patientRouter.route("/").post(validate(createSchema), handleCreatePatient);

export default patientRouter;
