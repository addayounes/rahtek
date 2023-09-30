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
} from "../../controller/equipment.controller";
import isAuth from "../../middleware/isAuth";

const equipmentRouter = Router();

equipmentRouter
  .route("/")
  .post(isAuth, validate(createSchema), handleCreateEquipment)
  .get(validate(getSchema), handleGetEquipments);

equipmentRouter
  .route("/:id")
  .patch(isAuth, validate(updateSchema), handleUpdateEquipment)
  .delete(isAuth, validate(deleteSchema), handleDeleteEquipment);

equipmentRouter
  .route("/user/:id")
  .post(validate(deleteSchema), handleGetUserEquipments);

export default equipmentRouter;
