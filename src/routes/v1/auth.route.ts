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
  verifyOTPSchema,
  completeRegistrationSchema,
} from "../../validations/auth.validation";

const authRouter = Router();

authRouter.post("/signup", validate(signupSchema), authController.handleSignUp);

authRouter.post("/login", validate(loginSchema), authController.handleLogin);

authRouter.post(
  "/logout",
  validate(refershSchema),
  authController.handleLogout
);

authRouter.post("/send-otp", validate(sendOTPSchema), authController.sendOTP);

authRouter.post(
  "/verify-otp",
  validate(verifyOTPSchema),
  authController.verifyOTP
);

authRouter.post(
  "/complete-registration/:token",
  validate(completeRegistrationSchema),
  authController.completeRegistration
);

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
