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
  handleGetUserPatients,
  handleUpdatePatient,
} from "../../controller/patient.controller";
import isAuth from "../../middleware/isAuth";

const patientRouter = Router();

patientRouter
  .route("/")
  .post(isAuth, validate(createSchema), handleCreatePatient);

patientRouter
  .route("/:id")
  .patch(isAuth, validate(updateSchema), handleUpdatePatient)
  .delete(isAuth, validate(deleteSchema), handleDeletePatient);

patientRouter.route("/user").get(isAuth, handleGetUserPatients);

export default patientRouter;
