import { Router } from "express";
import validate from "../../middleware/validate";
import {
  createSchema,
  deleteSchema,
  getSupplierEquipmentsSchema,
  updateSchema,
} from "../../validations/order.validation";
import {
  handleCreateOrder,
  handleDeleteOrder,
  handleGetUserOrders,
  handleUpdateOrder,
  handleRefuseOrder,
  handleApproveOrder,
  handleFinishOrder,
  handleGetSupplierOrders,
} from "../../controller/order.controller";
import isAuth from "../../middleware/isAuth";

const orderRouter = Router();

orderRouter.route("/").post(isAuth, validate(createSchema), handleCreateOrder);

orderRouter
  .route("/:id")
  .patch(isAuth, validate(updateSchema), handleUpdateOrder)
  .delete(isAuth, validate(deleteSchema), handleDeleteOrder);

orderRouter
  .route("/:id/refuse")
  .patch(isAuth, validate(deleteSchema), handleRefuseOrder);

orderRouter
  .route("/:id/approve")
  .patch(isAuth, validate(deleteSchema), handleApproveOrder);

orderRouter
  .route("/:id/finish")
  .patch(isAuth, validate(deleteSchema), handleFinishOrder);

orderRouter.route("/user").get(isAuth, handleGetUserOrders);

orderRouter
  .route("/supplier")
  .get(isAuth, validate(getSupplierEquipmentsSchema), handleGetSupplierOrders);

export default orderRouter;
