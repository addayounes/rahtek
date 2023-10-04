import { Router } from "express";
import multer from "../../lib/multer";
import isAuth from "../../middleware/isAuth";
import validate from "../../middleware/validate";
import {
  updatePasswordSchema,
  updateSchema,
} from "../../validations/user.validation";
import {
  handleUpdateUser,
  handleUpdateUserPassword,
  handleUploadUserPhoto,
} from "../../controller/user.controller";

const userRouter = Router();

userRouter
  .route("/current/update")
  .post(isAuth, validate(updateSchema), handleUpdateUser);

userRouter
  .route("/current/password/update")
  .post(isAuth, validate(updatePasswordSchema), handleUpdateUserPassword);

userRouter
  .route("/current/photo/upload")
  .post(isAuth, multer.single("photo"), handleUploadUserPhoto);

export default userRouter;
