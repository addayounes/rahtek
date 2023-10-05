import { Router } from "express";
import validate from "../../middleware/validate";
import {
  createSchema,
  deleteSchema,
  getSchema,
  updateSchema,
} from "../../validations/equipment.validation";
import {
  handleCreateEquipment,
  handleDeleteEquipment,
  handleGetUserEquipments,
  handleGetEquipments,
  handleUpdateEquipment,
  handleGetEquipmentById,
} from "../../controller/equipment.controller";
import isAuth from "../../middleware/isAuth";
import multer from "../../lib/multer";

const equipmentRouter = Router();

equipmentRouter
  .route("/")
  .post(
    isAuth,
    multer.single("photo"),
    validate(createSchema),
    handleCreateEquipment
  )
  .get(validate(getSchema), handleGetEquipments);

equipmentRouter
  .route("/:id")
  .get(validate(deleteSchema), handleGetEquipmentById)
  .patch(isAuth, validate(updateSchema), handleUpdateEquipment)
  .delete(isAuth, validate(deleteSchema), handleDeleteEquipment);

equipmentRouter
  .route("/user/:id")
  .get(validate(deleteSchema), handleGetUserEquipments);

export default equipmentRouter;
