"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import AuthShell from "@/components/auth/AuthShell";
import AuthField from "@/components/auth/AuthField";
import { login, saveSession, isLoggedIn } from "@/services/authService";
import { getErrorMessage } from "@/utils/apiError";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoggedIn()) router.replace("/admin/dashboard");
  }, [router]);

  const handleChange = (e) => {
    setError("");
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email.trim() || !form.password) {
      setError("Please enter email and password");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const data = await login({ email: form.email.trim(), password: form.password });
      saveSession(data);
      router.replace("/admin/dashboard");
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell>
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-line bg-white p-6 shadow-sm sm:p-9"
      >
        <h1 className="text-2xl font-semibold text-[#1a1a1a]">
          Estate Registry <span className="text-gold">Sign In</span>
        </h1>
        <p className="mt-1.5 text-[13px] text-[#00000099]">
          Access the operational directorate
        </p>

        {error && (
          <div className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-xs text-red-600">
            {error}
          </div>
        )}

        <AuthField
          className="mt-6"
          id="email"
          label="Email"
          icon={Mail}
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="admin@cannonavenue.com"
          autoComplete="email"
        />

        <AuthField
          className="mt-4"
          id="password"
          label="Password"
          icon={Lock}
          type={show ? "text" : "password"}
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Enter your password"
          autoComplete="current-password"
          right={
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              aria-label={show ? "Hide password" : "Show password"}
              className="shrink-0 text-[#00000066] hover:text-[#1a1a1a]"
            >
              {show ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          }
        />

        <div className="mt-3 text-right">
          <Link href="/forgot-password" className="text-xs font-medium text-gold-dark hover:underline">
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-navy text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {loading && <Loader2 size={16} className="animate-spin" />}
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </AuthShell>
  );
}