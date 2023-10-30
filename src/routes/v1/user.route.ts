import { Router } from "express";
import multer from "../../lib/multer";
import isAuth from "../../middleware/isAuth";
import validate from "../../middleware/validate";
import {
  updatePasswordSchema,
  updateSchema,
} from "../../validations/user.validation";
import {
  handleGetUserBySlug,
  handleUpdateUser,
  handleUpdateUserPassword,
  handleUploadUserIdentityCard,
  handleUploadUserPhoto,
} from "../../controller/user.controller";
import { getBySlugSchema } from "../../validations/equipment.validation";

const userRouter = Router();

userRouter.route("/:slug").get(validate(getBySlugSchema), handleGetUserBySlug);

userRouter
  .route("/current/update")
  .post(isAuth, validate(updateSchema), handleUpdateUser);

userRouter
  .route("/current/password/update")
  .post(isAuth, validate(updatePasswordSchema), handleUpdateUserPassword);

userRouter
  .route("/current/photo/upload")
  .post(isAuth, multer.single("photo"), handleUploadUserPhoto);

userRouter
  .route("/current/identity/upload")
  .post(isAuth, multer.single("identity"), handleUploadUserIdentityCard);

export default userRouter;
