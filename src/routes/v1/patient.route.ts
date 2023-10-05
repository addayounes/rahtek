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
  handleUploadPatientMedicalRecord,
} from "../../controller/patient.controller";
import isAuth from "../../middleware/isAuth";
import multer from "../../lib/multer";

const patientRouter = Router();

patientRouter
  .route("/")
  .post(isAuth, validate(createSchema), handleCreatePatient);

patientRouter
  .route("/:id")
  .patch(isAuth, validate(updateSchema), handleUpdatePatient)
  .delete(isAuth, validate(deleteSchema), handleDeletePatient);

patientRouter.route("/user").get(isAuth, handleGetUserPatients);

patientRouter
  .route("/:id/medical-record/upload")
  .post(
    isAuth,
    multer.single("medical_record"),
    handleUploadPatientMedicalRecord
  );

export default patientRouter;
