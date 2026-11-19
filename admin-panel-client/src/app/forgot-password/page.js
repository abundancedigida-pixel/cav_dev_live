"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, KeyRound, Loader2, ArrowLeft, CheckCircle2, Eye, EyeOff } from "lucide-react";
import AuthShell from "@/components/auth/AuthShell";
import AuthField from "@/components/auth/AuthField";
import { forgotPassword, verifyOtp, resetPassword } from "@/services/authService";
import { getErrorMessage } from "@/utils/apiError";

const TITLES = {
  email: ["Forgot", "Password?", "Enter your registered email to receive an OTP"],
  otp: ["Verify", "OTP", "Enter the 6-digit code sent to your email"],
  reset: ["Set New", "Password", "Choose a new password for your account"],
  done: ["Password", "Updated", ""],
};

function EyeToggle({ shown, onToggle }) {
  return (
    <button type="button" onClick={onToggle} className="shrink-0 text-[#00000066] hover:text-[#1a1a1a]">
      {shown ? <EyeOff size={15} /> : <Eye size={15} />}
    </button>
  );
}

function SubmitButton({ loading, label, loadingLabel }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="mt-6 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-navy text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60"
    >
      {loading && <Loader2 size={16} className="animate-spin" />}
      {loading ? loadingLabel : label}
    </button>
  );
}

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [info, setInfo] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const run = async (fn) => {
    setLoading(true);
    setError("");
    setInfo("");
    try {
      await fn();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const sendOtp = (e) => {
    e?.preventDefault();
    if (!email.trim()) return setError("Please enter your email");
    run(async () => {
      const res = await forgotPassword({ email: email.trim() });
      setInfo(res.message);
      setOtp("");
      setStep("otp");
    });
  };

  const submitOtp = (e) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(otp)) return setError("Please enter a valid 6-digit OTP");
    run(async () => {
      const data = await verifyOtp({ email: email.trim(), otp });
      setResetToken(data.resetToken);
      setStep("reset");
    });
  };

  const submitReset = (e) => {
    e.preventDefault();
    if (password.length < 8) return setError("Password must contain at least 8 characters");
    if (password !== confirm) return setError("Passwords do not match");
    run(async () => {
      await resetPassword({ resetToken, password, confirmPassword: confirm });
      setStep("done");
    });
  };

  const [a, b, sub] = TITLES[step];

  return (
    <AuthShell>
      <div className="rounded-2xl border border-line bg-white p-6 shadow-sm sm:p-9">
        {step === "done" ? (
          <div className="text-center">
            <CheckCircle2 size={44} className="mx-auto text-green-500" />
            <h1 className="mt-4 text-2xl font-semibold text-[#1a1a1a]">
              {a} <span className="text-gold-dark">{b}</span>
            </h1>
            <p className="mt-2 text-[13px] text-[#00000099]">
              Password reset successfully. Please sign in with your new password.
            </p>
            <button
              onClick={() => router.replace("/login")}
              className="mt-7 h-11 w-full rounded-lg bg-navy text-sm font-medium text-white hover:opacity-90"
            >
              Back to Sign In
            </button>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-semibold text-[#1a1a1a]">
              {a} <span className="text-gold-dark">{b}</span>
            </h1>
            <p className="mt-1.5 text-[13px] text-[#00000099]">{sub}</p>

            {info && !error && (
              <div className="mt-5 rounded-lg border border-green-200 bg-green-50 px-4 py-2.5 text-xs text-green-700">
                {info}
              </div>
            )}
            {error && (
              <div className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-xs text-red-600">
                {error}
              </div>
            )}

            {step === "email" && (
              <form onSubmit={sendOtp}>
                <AuthField
                  className="mt-6"
                  id="fp-email"
                  label="Email"
                  icon={Mail}
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setError("");
                    setEmail(e.target.value);
                  }}
                  placeholder="admin@cannonavenue.com"
                  autoComplete="email"
                />
                <SubmitButton loading={loading} label="Send OTP" loadingLabel="Sending..." />
              </form>
            )}

            {step === "otp" && (
              <form onSubmit={submitOtp}>
                <AuthField
                  className="mt-6"
                  id="fp-otp"
                  label="OTP"
                  icon={KeyRound}
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => {
                    setError("");
                    setOtp(e.target.value.replace(/\D/g, ""));
                  }}
                  placeholder="6-digit code"
                  autoComplete="one-time-code"
                />
                <SubmitButton loading={loading} label="Verify OTP" loadingLabel="Verifying..." />
                <p className="mt-4 text-center text-xs text-[#00000099]">
                  Didn&apos;t get the code?{" "}
                  <button
                    type="button"
                    onClick={sendOtp}
                    disabled={loading}
                    className="font-medium text-gold-dark hover:underline disabled:opacity-60"
                  >
                    Resend OTP
                  </button>
                </p>
              </form>
            )}

            {step === "reset" && (
              <form onSubmit={submitReset}>
                <AuthField
                  className="mt-6"
                  id="fp-pass"
                  label="New Password"
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setError("");
                    setPassword(e.target.value);
                  }}
                  placeholder="Minimum 8 characters"
                  autoComplete="new-password"
                  right={<EyeToggle shown={showPass} onToggle={() => setShowPass((s) => !s)} />}
                />
                <AuthField
                  className="mt-4"
                  id="fp-confirm"
                  label="Confirm Password"
                  type={showConfirm ? "text" : "password"}
                  value={confirm}
                  onChange={(e) => {
                    setError("");
                    setConfirm(e.target.value);
                  }}
                  placeholder="Re-enter password"
                  autoComplete="new-password"
                  right={<EyeToggle shown={showConfirm} onToggle={() => setShowConfirm((s) => !s)} />}
                />
                <SubmitButton loading={loading} label="Reset Password" loadingLabel="Updating..." />
              </form>
            )}

            <Link
              href="/login"
              className="mt-5 flex items-center justify-center gap-1.5 text-xs text-[#00000099] hover:text-[#1a1a1a]"
            >
              <ArrowLeft size={13} /> Back to Sign In
            </Link>
          </>
        )}
      </div>
    </AuthShell>
  );
}