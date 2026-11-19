"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Loader2, ShieldCheck, KeyRound, Mail } from "lucide-react";
import {
  getMyProfile,
  sendPasswordOtp,
  verifyPasswordOtp,
  setNewPassword,
} from "@/services/settingsService";
import { clearSession } from "@/services/authService";
import { getErrorMessage } from "@/utils/apiError";

const inputCls =
  "h-11 w-full rounded-md border border-line bg-surface px-3 text-xs outline-none focus:border-gold";

const Card = ({ icon: Icon, title, subtitle, children }) => (
  <section className="rounded-lg border border-line bg-white">
    <div className="flex items-center gap-3 border-b border-line px-5 py-4">
      <span className="flex h-9 w-9 items-center justify-center rounded-sm bg-[#e6ecf7] text-navy">
        <Icon size={16} />
      </span>
      <div>
        <h3 className="font-serif text-base font-semibold text-[#1a1a1a]">{title}</h3>
        <p className="text-[11px] text-[#00000099]">{subtitle}</p>
      </div>
    </div>
    <div className="p-5">{children}</div>
  </section>
);

const Row = ({ label, children }) => (
  <div className="grid grid-cols-[120px_1fr] gap-2 border-b border-line py-3 text-xs last:border-b-0 sm:grid-cols-[160px_1fr]">
    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#00000099]">{label}</span>
    <span className="min-w-0 break-words font-medium text-[#1a1a1a]">{children}</span>
  </div>
);

const PrimaryBtn = ({ busy, children, ...props }) => (
  <button
    {...props}
    disabled={busy || props.disabled}
    className="flex h-11 items-center justify-center gap-2 rounded-sm bg-navy px-6 text-[11px] font-semibold uppercase tracking-wider text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
  >
    {busy && <Loader2 size={14} className="animate-spin" />}
    {children}
  </button>
);

const fmtDateTime = (d) =>
  d
    ? new Date(d).toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "—";

export default function SettingsPage() {
  const router = useRouter();

  const [profile, setProfile] = useState(null);
  const [profileError, setProfileError] = useState(false);

  // password flow: "idle" -> "otp" -> "password"
  const [step, setStep] = useState("idle");
  const [otp, setOtp] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let cancelled = false;

    getMyProfile()
      .then((p) => {
        if (!cancelled) setProfile(p);
      })
      .catch(() => {
        if (!cancelled) setProfileError(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const run = async (task) => {
    setBusy(true);
    setError("");
    try {
      await task();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setBusy(false);
    }
  };

  const handleSendOtp = () =>
    run(async () => {
      await sendPasswordOtp(profile.email);
      setOtp("");
      setStep("otp");
      toast.success("OTP sent to your registered email");
    });

  const handleVerify = () =>
    run(async () => {
      if (!/^\d{6}$/.test(otp)) throw new Error("Please enter the 6-digit OTP");
      const token = await verifyPasswordOtp(profile.email, otp);
      setResetToken(token);
      setStep("password");
    });

  const handleReset = () =>
    run(async () => {
      if (password.length < 8) throw new Error("Password must contain at least 8 characters");
      if (password !== confirmPassword) throw new Error("Password and confirm password do not match");

      await setNewPassword({ resetToken, password, confirmPassword });
      toast.success("Password changed. Please sign in again.");
      clearSession();
      router.replace("/login");
    });

  const cancelFlow = () => {
    setStep("idle");
    setOtp("");
    setResetToken("");
    setPassword("");
    setConfirmPassword("");
    setError("");
  };

  const role = profile?.role === "owner" ? "Super Admin" : profile?.role || "—";

  return (
    <div className="mx-auto max-w-[760px] space-y-5">
      <div>
        <h2 className="font-serif text-2xl font-semibold text-[#1a1a1a] sm:text-3xl">Settings</h2>
        <p className="mt-1.5 text-[11px] leading-relaxed text-[#00000099] sm:text-xs">
          Review your account details and manage your sign-in security.
        </p>
      </div>

      <Card icon={ShieldCheck} title="Account Details" subtitle="Your administrator profile">
        {profileError && <p className="text-xs text-red-600">Unable to load your profile. Please refresh the page.</p>}

        {!profile && !profileError && (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-5 animate-pulse rounded bg-surface" />
            ))}
          </div>
        )}

        {profile && (
          <div>
            <Row label="Username">{profile.username}</Row>
            <Row label="Email">{profile.email}</Row>
            <Row label="Role">{role}</Row>
            <Row label="Status">
              <span className="inline-flex items-center gap-1.5">
                <span className={`h-1.5 w-1.5 rounded-full ${profile.isActive ? "bg-emerald-500" : "bg-gray-400"}`} />
                {profile.isActive ? "Active" : "Inactive"}
              </span>
            </Row>
            <Row label="Last sign-in">{fmtDateTime(profile.lastLogin)}</Row>
          </div>
        )}
      </Card>

      <Card icon={KeyRound} title="Change Password" subtitle="Verify with a one-time code sent to your email">
        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600">{error}</div>
        )}

        {step === "idle" && (
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-start gap-2 text-xs leading-relaxed text-[#00000099]">
              <Mail size={14} className="mt-0.5 shrink-0" />
              <span>
                We will send a 6-digit OTP to <strong className="text-[#1a1a1a]">{profile?.email || "your email"}</strong>.
              </span>
            </p>
            <PrimaryBtn type="button" onClick={handleSendOtp} busy={busy} disabled={!profile}>
              Send OTP
            </PrimaryBtn>
          </div>
        )}

        {step === "otp" && (
          <div className="space-y-4">
            <p className="text-xs text-[#00000099]">
              Enter the 6-digit code sent to <strong className="text-[#1a1a1a]">{profile?.email}</strong>. It is valid
              for 5 minutes.
            </p>
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
              inputMode="numeric"
              autoComplete="one-time-code"
              placeholder="000000"
              className={`${inputCls} text-center text-base tracking-[0.5em]`}
            />
            <div className="flex flex-wrap items-center gap-3">
              <PrimaryBtn type="button" onClick={handleVerify} busy={busy} disabled={otp.length !== 6}>
                Verify OTP
              </PrimaryBtn>
              <button
                type="button"
                onClick={handleSendOtp}
                disabled={busy}
                className="text-[11px] font-semibold uppercase tracking-wider text-navy hover:underline disabled:opacity-50"
              >
                Resend OTP
              </button>
              <button
                type="button"
                onClick={cancelFlow}
                className="text-[11px] font-semibold uppercase tracking-wider text-[#444] hover:underline"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {step === "password" && (
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-[#444]">
                New password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                placeholder="At least 8 characters"
                className={inputCls}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-[#444]">
                Confirm new password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
                placeholder="Re-enter the new password"
                className={inputCls}
              />
            </div>
            <div className="flex items-center gap-3">
              <PrimaryBtn type="button" onClick={handleReset} busy={busy} disabled={!password || !confirmPassword}>
                Update Password
              </PrimaryBtn>
              <button
                type="button"
                onClick={cancelFlow}
                className="text-[11px] font-semibold uppercase tracking-wider text-[#444] hover:underline"
              >
                Cancel
              </button>
            </div>
            <p className="text-[10px] text-[#00000080]">
              After the password is changed you will be signed out and need to sign in again.
            </p>
          </div>
        )}
      </Card>
    </div>
  );
}