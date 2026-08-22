"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Users,
  Mail,
  Lock,
  CornerDownLeft,
  KeyRound,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const emailInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (emailInputRef.current) emailInputRef.current.focus();
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!email.trim() || !password.trim()) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => {
        router.push("/business-dashboard");
      }, 1000);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      if (email.trim() && password.trim()) {
        e.preventDefault();
        handleLogin();
      }
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-white text-slate-900 flex flex-col justify-between font-sans select-none">

      {/* Static Cranberry Hairline Grid (Calibrated Subtle Opacity Matching Hero) */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
        {/* Top-Left Static Cranberry Grid */}
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

        {/* Bottom-Right Static Cranberry Grid */}
        <div
          className="absolute bottom-0 right-0 w-[440px] sm:w-[560px] h-[440px] sm:h-[560px]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(212, 19, 103, 0.13) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(212, 19, 103, 0.13) 1px, transparent 1px)
            `,
            backgroundSize: "32px 32px",
            maskImage: "radial-gradient(circle at bottom right, black 25%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(circle at bottom right, black 25%, transparent 75%)",
          }}
        />
      </div>

      {/* ================= TOP NAVBAR ================= */}
      <header className="shrink-0 bg-white/90 backdrop-blur-xl border-b border-slate-200/80 py-2.5 sm:py-3.5 px-4 sm:px-6 lg:px-10 flex items-center justify-between shadow-xs z-50">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center group shrink-0">
            <span className="text-base sm:text-[20px] font-black tracking-tight text-slate-900 flex items-center gap-1">
              Rotaract <span className="text-[#D41367]">Network</span>
            </span>
          </Link>
        </div>

        {/* Right: Back to Home + Register CTA */}
        <div className="flex items-center gap-2 sm:gap-6 shrink-0">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 sm:border-transparent text-xs sm:text-base font-bold sm:font-semibold text-slate-700 hover:text-[#D41367] hover:bg-slate-50 sm:hover:bg-transparent transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-500 group-hover:text-[#D41367] transition-colors" />
            <span>Back</span>
          </Link>

          <div className="w-px h-5 bg-slate-200 hidden sm:block" />

          <span className="text-slate-500 hidden sm:inline text-sm font-semibold">New to the platform?</span>
          <Button
            variant="outline"
            className="hidden sm:inline-flex border-2 border-[#D41367] text-[#D41367] hover:bg-[#D41367] hover:text-white bg-transparent rounded-full px-5 py-2 text-xs sm:text-sm font-extrabold shadow-2xs hover:scale-105 active:scale-95 transition-all h-auto cursor-pointer"
            asChild
          >
            <Link href="/register">
              <span>Register Business</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Link>
          </Button>
        </div>
      </header>

      {/* ================= 100VH CONVERSATIONAL LOGIN CANVAS ================= */}
      <main className="flex-1 flex flex-col justify-center max-w-xl lg:max-w-2xl w-full mx-auto px-6 sm:px-10 py-4 relative z-10">

        {!isSuccess ? (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">

            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-extrabold text-[#D41367] uppercase tracking-wider">
                <span>Business Owner Portal</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-slate-900 tracking-tight leading-[1.15]">
                Welcome Back
              </h1>
            </div>

            <form onSubmit={handleLogin} onKeyDown={handleKeyDown} className="space-y-3.5 pt-3.5 sm:pt-4">

              {/* Email / Member ID */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Account Email or Member ID *</label>
                <div className="relative">
                  <input
                    ref={emailInputRef}
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="sasmitha@example.com or RID-89210"
                    className="w-full pl-3.5 pr-9 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-[#D41367]/20 focus:border-[#D41367] outline-none transition-all"
                  />
                  <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700">Password *</label>
                  <Link
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="text-xs font-semibold text-[#D41367] hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-3.5 pr-9 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-[#D41367]/20 focus:border-[#D41367] outline-none transition-all"
                  />
                  <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                </div>
              </div>

              {/* Remember Me Checkbox */}
              <label
                onClick={() => setRememberMe(!rememberMe)}
                className="flex items-center gap-2.5 pt-1 cursor-pointer group select-none"
              >
                <div
                  className={cn(
                    "w-4 h-4 rounded-md border flex items-center justify-center transition-all shrink-0",
                    rememberMe
                      ? "bg-[#D41367] border-[#D41367] text-white shadow-xs"
                      : "bg-slate-50 border-slate-300 group-hover:border-[#D41367] group-hover:bg-white"
                  )}
                >
                  {rememberMe && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span className="text-xs text-slate-600 font-medium group-hover:text-slate-900 transition-colors">
                  Keep me signed in on this device
                </span>
              </label>

              {/* Submit Button & Enter Helper */}
              <div className="pt-3 flex items-center gap-3">
                <Button
                  type="submit"
                  disabled={isLoading || !email.trim() || !password.trim()}
                  className="bg-[#D41367] hover:bg-[#B80E56] text-white rounded-full px-8 py-2.5 text-xs sm:text-sm font-extrabold shadow-lg shadow-pink-500/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer disabled:opacity-40 h-auto"
                >
                  <span>{isLoading ? "Signing in..." : "Sign In"}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Button>
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-slate-400 font-medium pl-1">
                  press <strong className="font-extrabold text-slate-700 inline-flex items-center gap-0.5">Enter <CornerDownLeft className="w-3 h-3" /></strong>
                </span>
              </div>

            </form>

            {/* Quick Demo Credentials Fill Pill */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setEmail("sasmitha@example.com");
                  setPassword("password123");
                }}
                className="text-[11px] font-bold text-slate-500 hover:text-[#D41367] inline-flex items-center gap-1.5 bg-slate-50 hover:bg-pink-50 border border-slate-200 hover:border-pink-200 px-3 py-1.5 rounded-full transition-all cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#D41367]" />
                <span>Auto-fill Demo Founder Credentials</span>
              </button>
            </div>

          </div>
        ) : (
          /* ================= SUCCESS LOGGED IN STATE ================= */
          <div className="text-center space-y-4 max-w-lg mx-auto py-8 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-md">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Authentication Verified
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                Welcome back! Redirecting you to your enterprise dashboard...
              </p>
            </div>
          </div>
        )}

      </main>

      {/* ================= BOTTOM FOOTER ================= */}
      <footer className="shrink-0 bg-white/90 backdrop-blur-md border-t border-slate-100 py-2.5 px-4 sm:px-6 lg:px-10 flex items-center justify-between z-40">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
          <span>Rotaract South Asia MDIO Enterprise Portal</span>
        </div>
        <div className="flex items-center gap-4 text-xs font-medium text-slate-400">
          <Link href="/directory" className="hover:text-[#D41367] transition-colors">Directory</Link>
          <span>•</span>
          <Link href="/register" className="hover:text-[#D41367] transition-colors">Register</Link>
        </div>
      </footer>

    </div>
  );
}
