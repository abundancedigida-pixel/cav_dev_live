
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // Owner details
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    // Login password
    password: {
      type: String,
      required: true,
      select: false,
    },

    // User role
    role: {
      type: String,
      enum: ["owner"],
      default: "owner",
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    lastLogin: {
      type: Date,
      default: null,
    },

    // Forgot password OTP
    otpHash: {
      type: String,
      default: null,
      select: false,
    },

    otpExpiresAt: {
      type: Date,
      default: null,
      select: false,
    },

    otpAttempts: {
      type: Number,
      default: 0,
      select: false,
    },

    // OTP verification
    otpVerifiedAt: {
      type: Date,
      default: null,
      select: false,
    },

    // Temporary authorization for password reset
    passwordResetTokenHash: {
      type: String,
      default: null,
      select: false,
    },

    passwordResetExpires: {
      type: Date,
      default: null,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
