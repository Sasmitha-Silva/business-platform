"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, ArrowRight, CheckCircle2, AlertCircle, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { resetPasswordAction } from "@/app/actions/auth";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || isLoading) return;

    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match. Please verify.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const res = await resetPasswordAction(password);
      if (!res.success) {
        setErrorMessage(res.error || "Failed to update password. Please try again or request a new link.");
        setIsLoading(false);
        return;
      }
      setIsSuccess(true);
      setTimeout(() => {
        router.push("/auth/login");
      }, 2000);
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-white text-slate-900 flex flex-col justify-between font-sans select-none">
      {/* Background Grid */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
        <div
          className="absolute top-0 left-0 w-[440px] sm:w-[560px] h-[440px] sm:h-[560px]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(212, 19, 103, 0.13) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(212, 19, 103, 0.13) 1px, transparent 1px)
            `,
            backgroundSize: "32px 32px",
            maskImage: "radial-gradient(circle at top left, black 25%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(circle at top left, black 25%, transparent 75%)",
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[340px] bg-pink-50/50 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 z-10 my-auto">
        <div className="w-full max-w-md bg-white border border-slate-200/80 rounded-3xl shadow-xl shadow-pink-500/5 p-7 sm:p-9 relative">
          {/* Header */}
          <div className="space-y-2 mb-7 text-left">
            <div className="w-11 h-11 rounded-2xl bg-pink-50 text-[#D41367] flex items-center justify-center border border-pink-100 shadow-xs mb-3">
              <Lock className="w-5 h-5" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Create New Password
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Choose a strong, unique password to secure your Rotaract Business Network account.
            </p>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200/80 flex items-start gap-2.5 text-xs text-red-700 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Success State */}
          {isSuccess ? (
            <div className="space-y-5 text-center py-4 animate-in fade-in zoom-in-95">
              <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-black text-slate-900">Password Updated!</h3>
                <p className="text-xs text-slate-600">
                  Your password has been changed successfully. Redirecting you to sign in
                </p>
              </div>
              <div className="pt-2">
                <Button
                  className="w-full rounded-2xl py-3 bg-[#D41367] hover:bg-[#b80e56] text-white text-xs font-bold"
                  asChild
                >
                  <Link href="/auth/login">Proceed to Sign In</Link>
                </Button>
              </div>
            </div>
          ) : (
            /* Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">New Password *</label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 8 characters"
                    className="w-full pl-3.5 pr-9 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-[#D41367]/20 focus:border-[#D41367] outline-none transition-all"
                  />
                  <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Confirm New Password *</label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat password"
                    className="w-full pl-3.5 pr-9 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-[#D41367]/20 focus:border-[#D41367] outline-none transition-all"
                  />
                  <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                </div>
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={isLoading || !password || !confirmPassword}
                  className="w-full py-3 bg-[#D41367] hover:bg-[#b80e56] text-white text-xs sm:text-sm font-bold rounded-2xl shadow-md shadow-pink-500/10 transition-all flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Save New Password</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
