
import * as authService from "../services/authService.js";

// ------------------------------------------
// REGISTER OWNER
// ------------------------------------------

export const registerOwnerController = async (req, res) => {
  try {
    const owner = await authService.registerOwnerService(req.body);

    return res.status(201).json({
      success: true,
      message: "Owner registered successfully",
      data: owner,
    });
  } catch (error) {
    console.error("Register owner error:", error);

    return res.status(400).json({
      success: false,
      message: error.message || "Owner registration failed",
    });
  }
};

// ------------------------------------------
// LOGIN
// ------------------------------------------

export const loginController = async (req, res) => {
  try {
    const result = await authService.loginService(req.body);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(401).json({
      success: false,
      message: error.message || "Login failed",
    });
  }
};

// ------------------------------------------
// FORGOT PASSWORD - SEND OTP
// ------------------------------------------

export const forgotPasswordController = async (req, res) => {
  try {
    const result = await authService.forgotPasswordService(req.body);

    return res.status(200).json({
      success: true,
      message: result.message,
      ...(result.email && { email: result.email }),
    });
  } catch (error) {
    console.error("Forgot password error:", error);

    return res.status(400).json({
      success: false,
      message: error.message || "Failed to send OTP",
    });
  }
};

// ------------------------------------------
// VERIFY OTP
// ------------------------------------------

export const verifyOtpController = async (req, res) => {
  try {
    const result = await authService.verifyOtpService(req.body);

    return res.status(200).json({
      success: true,
      message: result.message,
      data: {
        email: result.email,
        resetToken: result.resetToken,
      },
    });
  } catch (error) {
    console.error("OTP verification error:", error);

    return res.status(400).json({
      success: false,
      message: error.message || "OTP verification failed",
    });
  }
};

// ------------------------------------------
// RESET PASSWORD
// ------------------------------------------

export const resetPasswordController = async (req, res) => {
  try {
    const result = await authService.resetPasswordService(req.body);

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    console.error("Reset password error:", error);

    return res.status(400).json({
      success: false,
      message: error.message || "Password reset failed",
    });
  }
};

// ------------------------------------------
// GET USER PROFILE
// ------------------------------------------

export const getUserProfileController = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await authService.getUserProfileService(userId);

    return res.status(200).json({
      success: true,
      message: "Profile retrieved successfully",
      data: user,
    });
  } catch (error) {
    console.error("Get profile error:", error);

    return res.status(400).json({
      success: false,
      message: error.message || "Failed to retrieve profile",
    });
  }
};
