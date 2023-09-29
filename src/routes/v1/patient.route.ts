import { Router } from "express";
import validate from "../../middleware/validate";
import {
  createSchema,
  updateSchema,
} from "../../validations/patient.validation";
import {
  handleCreatePatient,
  handleUpdatePatient,
} from "../../controller/patient.controller";

const patientRouter = Router();

patientRouter.route("/").post(validate(createSchema), handleCreatePatient);

patientRouter.route("/:id").patch(validate(updateSchema), handleUpdatePatient);

export default patientRouter;
