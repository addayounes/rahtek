import { Router } from "express";
import isAuth from "../../middleware/isAuth";
import validate from "../../middleware/validate";
import { updatePasswordSchema } from "../../validations/user.validation";
import { handleUpdateUserPassword } from "../../controller/user.controller";

const userRouter = Router();

userRouter
  .route("/password/update")
  .post(isAuth, validate(updatePasswordSchema), handleUpdateUserPassword);

export default userRouter;
