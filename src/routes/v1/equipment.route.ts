import { Router } from "express";
import validate from "../../middleware/validate";
import {
  createSchema,
  deleteSchema,
  getBySlugSchema,
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
  handleGetEquipmentBySlug,
  handleGetCurrentUserEquipments,
  handleGetEquipmentWaitingList,
  handleGetRahtekEquipments,
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
  .route("/details/:slug")
  .get(validate(getBySlugSchema), handleGetEquipmentBySlug);

equipmentRouter
  .route("/:id/waiting-list")
  .get(validate(deleteSchema), handleGetEquipmentWaitingList);

equipmentRouter
  .route("/user/:id")
  .get(validate(getSchema), handleGetUserEquipments);

equipmentRouter
  .route("/current/user")
  .get(isAuth, validate(getSchema), handleGetCurrentUserEquipments);

equipmentRouter
  .route("/rahtek/section")
  .get(validate(getSchema), handleGetRahtekEquipments);

export default equipmentRouter;
