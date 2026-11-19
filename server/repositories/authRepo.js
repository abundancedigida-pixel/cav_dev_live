
import User from "../models/User.js";

// Check whether an owner already exists
export const getOwnerRepo = async () => {
  return await User.findOne({ role: "owner" });
};

// Find user by email or username for login
export const getUserByEmailOrUsernameRepo = async (value) => {
  const normalizedValue = String(value).trim().toLowerCase();

  return await User.findOne({
    $or: [
      { email: normalizedValue },
      { username: normalizedValue },
    ],
  }).select("+password");
};

// Find user by email
export const getUserByEmailRepo = async (email) => {
  return await User.findOne({
    email: email.trim().toLowerCase(),
  });
};

// Create owner
export const createOwnerRepo = async (data) => {
  return await User.create(data);
};

// Update last login
export const updateLastLoginRepo = async (id) => {
  return await User.findByIdAndUpdate(
    id,
    {
      $set: {
        lastLogin: new Date(),
      },
    },
    {
      returnDocument: "after",
    }
  );
};

// Save OTP and expiry
export const saveOtpRepo = async (
  id,
  otpHash,
  otpExpiresAt
) => {
  return await User.findByIdAndUpdate(
    id,
    {
      $set: {
        otpHash,
        otpExpiresAt,
        otpAttempts: 0,
        otpVerifiedAt: null,
        passwordResetTokenHash: null,
        passwordResetExpires: null,
      },
    },
    {
      returnDocument: "after",
      runValidators: true,
    }
  );
};

// Find user with OTP fields
export const getUserByOtpRepo = async (email) => {
  return await User.findOne({
    email: email.trim().toLowerCase(),
    isActive: true,
    otpHash: { $ne: null },
    otpExpiresAt: { $gt: new Date() },
  }).select(
    "+otpHash +otpExpiresAt +otpAttempts +otpVerifiedAt"
  );
};

// Increase incorrect OTP attempts
export const incrementOtpAttemptsRepo = async (id) => {
  return await User.findByIdAndUpdate(
    id,
    {
      $inc: {
        otpAttempts: 1,
      },
    },
    {
      returnDocument: "after",
    }
  ).select("+otpAttempts");
};

// Clear OTP after maximum attempts
export const clearOtpRepo = async (id) => {
  return await User.findByIdAndUpdate(
    id,
    {
      $set: {
        otpHash: null,
        otpExpiresAt: null,
        otpAttempts: 0,
        otpVerifiedAt: null,
        passwordResetTokenHash: null,
        passwordResetExpires: null,
      },
    },
    {
      returnDocument: "after",
    }
  );
};

// Verify OTP and save temporary reset authorization
export const verifyOtpRepo = async (
  id,
  resetTokenHash,
  resetExpiresAt
) => {
  return await User.findOneAndUpdate(
    {
      _id: id,
      otpHash: { $ne: null },
      otpExpiresAt: { $gt: new Date() },
      otpVerifiedAt: null,
      otpAttempts: { $lt: 5 },
    },
    {
      $set: {
        otpVerifiedAt: new Date(),
        passwordResetTokenHash: resetTokenHash,
        passwordResetExpires: resetExpiresAt,
        otpHash: null,
        otpExpiresAt: null,
        otpAttempts: 0,
      },
    },
    {
      returnDocument: "after",
      runValidators: true,
    }
  );
};

// Find user with verified OTP reset authorization
export const getUserByResetTokenRepo = async (resetTokenHash) => {
  return await User.findOne({
    passwordResetTokenHash: resetTokenHash,
    passwordResetExpires: { $gt: new Date() },
    otpVerifiedAt: { $ne: null },
    isActive: true,
  }).select("+passwordResetTokenHash +passwordResetExpires +otpVerifiedAt");
};

// Reset password and clear all OTP data
export const resetPasswordRepo = async (
  id,
  hashedPassword,
  resetTokenHash
) => {
  return await User.findOneAndUpdate(
    {
      _id: id,
      passwordResetTokenHash: resetTokenHash,
      passwordResetExpires: { $gt: new Date() },
      otpVerifiedAt: { $ne: null },
    },
    {
      $set: {
        password: hashedPassword,
        otpHash: null,
        otpExpiresAt: null,
        otpAttempts: 0,
        otpVerifiedAt: null,
        passwordResetTokenHash: null,
        passwordResetExpires: null,
      },
    },
    {
      returnDocument: "after",
      runValidators: true,
    }
  );
};

// Get owner profile
export const getUserProfileRepo = async (id) => {
  return await User.findById(id);
};
