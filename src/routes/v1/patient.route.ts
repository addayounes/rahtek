import { Router } from "express";
import validate from "../../middleware/validate";
import {
  createSchema,
  deleteSchema,
  updateSchema,
} from "../../validations/patient.validation";
import {
  handleCreatePatient,
  handleDeletePatient,
  handleUpdatePatient,
} from "../../controller/patient.controller";

const patientRouter = Router();

patientRouter.route("/").post(validate(createSchema), handleCreatePatient);

patientRouter
  .route("/:id")
  .patch(validate(updateSchema), handleUpdatePatient)
  .delete(validate(deleteSchema), handleDeletePatient);

export default patientRouter;
