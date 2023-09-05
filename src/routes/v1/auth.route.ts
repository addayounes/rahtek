import { Router } from "express";
import validate from "../../middleware/validate";
import * as authController from "../../controller/auth.controller";
import * as passwordController from "../../controller/forgotPassword.controller";
import {
  loginSchema,
  signupSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  refershSchema,
  sendOTPSchema,
} from "../../validations/auth.validation";

const authRouter = Router();

authRouter.post("/signup", validate(signupSchema), authController.handleSignUp);

authRouter.post("/login", validate(loginSchema), authController.handleLogin);

authRouter.post(
  "/logout",
  validate(refershSchema),
  authController.handleLogout
);

authRouter.post("/send-otp", validate(sendOTPSchema), authController.sendOtp);

authRouter.post(
  "/refresh",
  validate(refershSchema),
  authController.handleRefresh
);

authRouter.post(
  "/forgot-password",
  validate(forgotPasswordSchema),
  passwordController.handleForgotPassword
);

authRouter.post(
  "/reset-password",
  validate(resetPasswordSchema),
  passwordController.handleResetPassword
);

export default authRouter;
