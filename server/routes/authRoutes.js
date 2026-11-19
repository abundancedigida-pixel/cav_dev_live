
import express from "express";

import * as authController from "../controllers/authController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Owner registration
router.post(
  "/register-owner",
  authController.registerOwnerController
);

// Login
router.post(
  "/login",
  authController.loginController
);

// Forgot password - send OTP
router.post(
  "/forgot-password",
  authController.forgotPasswordController
);

// Verify OTP
router.post(
  "/verify-otp",
  authController.verifyOtpController
);

// Reset password
router.post(
  "/reset-password",
  authController.resetPasswordController
);

// Get profile
router.get(
  "/profile",
  verifyToken,
  authController.getUserProfileController
);

export default router;
