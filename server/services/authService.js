
import * as authRepo from "../repositories/authRepo.js";
import { sendOtpEmail } from "../utils/emailUtil.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const SALT_ROUNDS = 12;

const OTP_EXPIRY = 5 * 60 * 1000;
const MAX_OTP_ATTEMPTS = 5;
const PASSWORD_RESET_EXPIRY = 10 * 60 * 1000;

// Generate JWT token
const generateAuthToken = (user) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT secret is not configured");
  }

  return jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "1d",
    }
  );
};

// Hash OTP or reset token
const hashValue = (value) => {
  return crypto
    .createHash("sha256")
    .update(value)
    .digest("hex");
};

// Validate password
const validatePassword = (password) => {
  if (!password || password.length < 8) {
    throw new Error("Password must contain at least 8 characters");
  }
};

// ------------------------------------------
// REGISTER OWNER
// ------------------------------------------

export const registerOwnerService = async (data) => {
  const { username, email, password } = data;

  if (!username || !email || !password) {
    throw new Error("Username, email and password are required");
  }

  validatePassword(password);

  const existingOwner = await authRepo.getOwnerRepo();

  if (existingOwner) {
    throw new Error("Owner account already exists");
  }

  const normalizedUsername = username.trim().toLowerCase();
  const normalizedEmail = email.trim().toLowerCase();

  const existingUsername =
    await authRepo.getUserByEmailOrUsernameRepo(normalizedUsername);

  if (existingUsername) {
    throw new Error("Username already exists");
  }

  const existingEmail =
    await authRepo.getUserByEmailOrUsernameRepo(normalizedEmail);

  if (existingEmail) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const owner = await authRepo.createOwnerRepo({
    username: normalizedUsername,
    email: normalizedEmail,
    password: hashedPassword,
    role: "owner",
  });

  return {
    _id: owner._id,
    username: owner.username,
    email: owner.email,
    role: owner.role,
    isActive: owner.isActive,
  };
};

// ------------------------------------------
// LOGIN
// ------------------------------------------

export const loginService = async (data) => {
  const { email, password } = data;

  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const user = await authRepo.getUserByEmailOrUsernameRepo(
    email.trim().toLowerCase()
  );

  if (!user) {
    throw new Error("Invalid email or password");
  }

  if (!user.isActive) {
    throw new Error("Your account is inactive");
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  await authRepo.updateLastLoginRepo(user._id);

  const token = generateAuthToken(user);

  return {
    token,
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
    },
  };
};

// ------------------------------------------
// FORGOT PASSWORD - SEND OTP
// ------------------------------------------

export const forgotPasswordService = async ({ email }) => {
  if (!email) {
    throw new Error("Email is required");
  }

  const normalizedEmail = email.trim().toLowerCase();

  const user = await authRepo.getUserByEmailRepo(normalizedEmail);

  // Use the same response whether the account exists or not
  if (!user || !user.isActive) {
    return {
      message: "If the account exists, an OTP will be sent to the registered email.",
    };
  }

  // Generate six-digit OTP
  const otp = crypto.randomInt(100000, 1000000).toString();

  // Hash OTP before saving
  const otpHash = hashValue(otp);

  const otpExpiresAt = new Date(Date.now() + OTP_EXPIRY);

  await authRepo.saveOtpRepo(
    user._id,
    otpHash,
    otpExpiresAt
  );

  try {
    // Send OTP to registered email
    await sendOtpEmail(user.email, otp);
  } catch (error) {
    // Clear OTP if email delivery fails
    await authRepo.clearOtpRepo(user._id);
    throw new Error("Unable to send OTP. Please try again.");
  }

  return {
    message: "OTP sent successfully to your registered email.",
    email: user.email,
  };
};

// ------------------------------------------
// VERIFY OTP
// ------------------------------------------

export const verifyOtpService = async ({ email, otp }) => {
  if (!email || !otp) {
    throw new Error("Email and OTP are required");
  }

  if (!/^\d{6}$/.test(String(otp))) {
    throw new Error("Please enter a valid 6-digit OTP");
  }

  const normalizedEmail = email.trim().toLowerCase();

  const user = await authRepo.getUserByOtpRepo(normalizedEmail);

  if (!user) {
    throw new Error("OTP is invalid or expired. Please request a new OTP.");
  }

  if (user.otpAttempts >= MAX_OTP_ATTEMPTS) {
    await authRepo.clearOtpRepo(user._id);

    throw new Error("Maximum OTP attempts exceeded. Please request a new OTP.");
  }

  const enteredOtpHash = hashValue(String(otp));

  const isOtpValid = crypto.timingSafeEqual(
    Buffer.from(enteredOtpHash, "hex"),
    Buffer.from(user.otpHash, "hex")
  );

  if (!isOtpValid) {
    const updatedUser = await authRepo.incrementOtpAttemptsRepo(
      user._id
    );

    if (updatedUser && updatedUser.otpAttempts >= MAX_OTP_ATTEMPTS) {
      await authRepo.clearOtpRepo(user._id);

      throw new Error("Maximum OTP attempts exceeded. Please request a new OTP.");
    }

    throw new Error("Incorrect OTP. Please try again.");
  }

  // Generate temporary password-reset authorization
  const resetToken = crypto.randomBytes(32).toString("hex");

  const resetTokenHash = hashValue(resetToken);

  const resetExpiresAt = new Date(
    Date.now() + PASSWORD_RESET_EXPIRY
  );

  const verifiedUser = await authRepo.verifyOtpRepo(
    user._id,
    resetTokenHash,
    resetExpiresAt
  );

  if (!verifiedUser) {
    throw new Error("OTP verification failed. Please request a new OTP.");
  }

  return {
    message: "OTP verified successfully",
    email: user.email,
    resetToken,
  };
};

// ------------------------------------------
// RESET PASSWORD
// ------------------------------------------

export const resetPasswordService = async ({
  resetToken,
  password,
  confirmPassword,
}) => {
  if (!resetToken || !password || !confirmPassword) {
    throw new Error(
      "Reset token, new password and confirm password are required"
    );
  }

  if (password !== confirmPassword) {
    throw new Error("Password and confirm password do not match");
  }

  validatePassword(password);

  const resetTokenHash = hashValue(resetToken);

  const user = await authRepo.getUserByResetTokenRepo(
    resetTokenHash
  );

  if (!user) {
    throw new Error(
      "Password reset session is invalid or expired. Please verify your OTP again."
    );
  }

  const hashedPassword = await bcrypt.hash(
    password,
    SALT_ROUNDS
  );

  const updatedUser = await authRepo.resetPasswordRepo(
    user._id,
    hashedPassword,
    resetTokenHash
  );

  if (!updatedUser) {
    throw new Error(
      "Password reset session is invalid or expired. Please verify your OTP again."
    );
  }

  return {
    message: "Password reset successfully. Please login with your new password.",
  };
};

// ------------------------------------------
// GET USER PROFILE
// ------------------------------------------

export const getUserProfileService = async (userId) => {
  const user = await authRepo.getUserProfileRepo(userId);

  if (!user) {
    throw new Error("User not found");
  }

  return {
    _id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
    isActive: user.isActive,
    lastLogin: user.lastLogin,
  };
};
