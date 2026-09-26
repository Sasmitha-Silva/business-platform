"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Mail, KeyRound, User, CheckCircle2, AlertCircle, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { signupAction } from "@/app/actions/auth";
import { useAuth } from "@/components/auth-provider";

interface AuthSplitScreenProps {
  type?: "login" | "signup";
  isSignUp?: boolean;
}

export function AuthSplitScreen({ type = "login", isSignUp: isSignUpProp }: AuthSplitScreenProps) {
  const router = useRouter();
  const { refreshAuth } = useAuth();
  const isSignUp = isSignUpProp !== undefined ? isSignUpProp : type === "signup";

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim() || (isSignUp && !fullName.trim())) return;

    setIsLoading(true);
    setErrorMessage("");

    try {
      if (isSignUp) {
        const result = await signupAction({
          fullName: fullName.trim(),
          email: email.trim(),
          password,
        });

        if (!result.success) {
          setErrorMessage(result.error || "Failed to create account. Please try again.");
          setIsLoading(false);
          return;
        }

        await refreshAuth();
        router.push(result.redirectTo || "/business-dashboard");
      } else {
        router.push("/auth/login");
      }
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-white font-sans">
      {/* Left Photo Column with Rich Cranberry Overlay */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-[#D41367] via-[#B80E56] to-[#800A3C] flex-col justify-between p-12 overflow-hidden select-none min-h-screen text-white">
        {/* Ambient Grid Pattern */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "28px 28px",
          }}
        />

        {/* Ambient Corner Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-black/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center group">
            <span className="text-xl font-black tracking-tight text-white">
              Rotaract <span className="text-pink-200">Network</span>
            </span>
          </Link>
        </div>

        <div className="relative z-10 max-w-lg space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white text-xs font-extrabold">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#F7A81B]" />
            Accredited Rotary International Community
          </div>

          <blockquote className="text-2xl xl:text-3xl font-extrabold text-white leading-snug tracking-tight">
            &ldquo;The trusted business directory connecting verified Rotaract enterprises, founders, and global district leaders.&rdquo;
          </blockquote>

          <div className="pt-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs text-pink-100 font-semibold border border-white/15">
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              <span>Rotary &amp; DRR Official Verification Standards</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between text-xs text-slate-300 font-medium">
          <span>Official Rotary District Network</span>
          <span>Security &amp; Privacy First</span>
        </div>
      </div>

      {/* Right Form Column */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-6 sm:p-12 lg:p-14 overflow-y-auto bg-white">
        <div className="flex items-center justify-between lg:hidden">
          <Link href="/" className="inline-flex items-center">
            <span className="text-lg font-black tracking-tight text-foreground">
              Rotaract <span className="text-[#D41367]">Network</span>
            </span>
          </Link>
          <Link href="/" className="text-xs text-muted-foreground font-semibold hover:text-[#D41367]">
            Back to home
          </Link>
        </div>

        <div className="max-w-md w-full mx-auto my-auto space-y-6 py-6">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#D41367]">
              {isSignUp ? "Join the Directory" : "Welcome Back"}
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight mt-1">
              {isSignUp ? "Create your verified account" : "Log in to your account"}
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground font-medium mt-1.5">
              {isSignUp
                ? "Connect with verified Rotaract business leaders globally."
                : "Manage your directory profile, leads, and club verifications."}
            </p>
          </div>

          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs font-semibold text-red-700 flex items-start gap-2.5 animate-in fade-in duration-200">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div className="relative border-b-2 border-border/80 focus-within:border-[#D41367] pb-1 transition-colors">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-foreground">Full Name</label>
                  <User className="w-4 h-4 text-[#D41367]" />
                </div>
                <input
                  type="text"
                  placeholder="e.g. Anand Sharma"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-transparent text-sm font-medium outline-none text-foreground mt-2.5 pb-1 placeholder:text-muted-foreground/50"
                  required
                />
              </div>
            )}

            <div className="relative border-b-2 border-border/80 focus-within:border-[#D41367] pb-1 transition-colors">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-foreground">Email Address</label>
                <Mail className="w-4 h-4 text-[#D41367]" />
              </div>
              <input
                id="login-email"
                type="email"
                placeholder="name@business.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent text-sm font-medium outline-none text-foreground mt-2.5 pb-1 placeholder:text-muted-foreground/50"
                required
              />
            </div>

            <div className="relative border-b-2 border-border/80 focus-within:border-[#D41367] pb-1 transition-colors">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-foreground">Password</label>
                <div className="flex items-center gap-3">
                  {!isSignUp && (
                    <Link href="#" className="text-xs text-[#D41367] font-bold hover:underline">
                      Forgot?
                    </Link>
                  )}
                  <KeyRound className="w-4 h-4 text-[#D41367]" />
                </div>
              </div>
              <input
                id="login-pass"
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent text-sm font-medium outline-none text-foreground mt-2.5 pb-1 placeholder:text-muted-foreground/50"
                required
              />
            </div>

            {!isSignUp && (
              <div className="flex items-center gap-2 pt-1">
                <Checkbox id="remember" className="accent-[#D41367]" />
                <label htmlFor="remember" className="text-xs text-muted-foreground cursor-pointer font-medium">
                  Keep me signed in for 30 days
                </label>
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#D41367] hover:bg-[#B80E56] text-white rounded-full h-11 text-sm font-extrabold gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-50"
            >
              <span>
                {isLoading
                  ? "Creating Account"
                  : isSignUp
                    ? "Create Member Account"
                    : "Access Business Owner Portal"}
              </span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>

          <p className="text-xs text-center text-muted-foreground font-medium pt-1">
            {isSignUp ? (
              <>
                Already have an account?{" "}
                <Link href="/auth/login" className="text-[#D41367] font-bold hover:underline">
                  Log in
                </Link>
              </>
            ) : (
              <>
                Don&apos;t have an account?{" "}
                <Link href="/register" className="text-[#D41367] font-bold hover:underline">
                  Register your business
                </Link>
              </>
            )}
          </p>
        </div>

        {/* Footer Links */}
        <div className="text-center text-[11px] text-muted-foreground font-medium pt-4 shrink-0">
          © {new Date().getFullYear()} RSAMDIO. All rights reserved.
        </div>
      </div>
    </div>
  );
}

export default AuthSplitScreen;
