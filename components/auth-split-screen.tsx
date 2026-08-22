"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight, Mail, KeyRound, User, Users, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface AuthSplitScreenProps {
  type?: "login" | "signup";
  isSignUp?: boolean;
}

export function AuthSplitScreen({ type = "login", isSignUp: isSignUpProp }: AuthSplitScreenProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const isSignUp = isSignUpProp !== undefined ? isSignUpProp : type === "signup";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen w-full flex bg-white font-sans">
      {/* Left Photo Column with Rich Cranberry Overlay */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-[#D41367] via-[#B80E56] to-[#800A3C] flex-col justify-between p-12 overflow-hidden select-none min-h-screen">
        <Image
          src="/images/hero-meeting-hq.jpg"
          alt="Rotaract Business Networking"
          fill
          priority
          sizes="50vw"
          className="object-cover mix-blend-overlay opacity-30 filter contrast-125 saturate-110"
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
            &ldquo;The single most valuable business network connecting verified Rotaractors across 45+ global districts.&rdquo;
          </blockquote>

          <div className="flex items-center gap-4 pt-2">
            <div className="flex -space-x-2">
              {["1534528741775-53994a69daeb", "1507003211169-0a1dd7228f2d", "1494790108377-be9c29b29330"].map((id, i) => (
                <div key={i} className="w-9 h-9 rounded-full border-2 border-slate-900 overflow-hidden relative shadow-sm">
                  <Image
                    src={`https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=100&q=80`}
                    alt="Member"
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="text-xs text-slate-300 font-medium">
              Joined by <strong className="text-white font-bold">1,200+</strong> business founders
            </div>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between text-xs text-slate-400 font-medium">
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
                placeholder="Enter Password"
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
              className="w-full bg-[#D41367] hover:bg-[#B80E56] text-white rounded-full h-11 text-sm font-extrabold gap-2 shadow-md hover:shadow-lg transition-all"
            >
              <span>{isSignUp ? "Create Member Account" : "Access Business Owner Portal"}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/60" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 text-[11px] font-bold text-muted-foreground bg-white">
                Or Continue With
              </span>
            </div>
          </div>

          {/* Social SSO Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              type="button"
              onClick={() => router.push("/dashboard")}
              className="h-11 text-xs bg-white border-pink-100/80 rounded-2xl font-extrabold hover:bg-pink-50 hover:text-[#D41367] flex items-center justify-center gap-2 transition-all shadow-2xs"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Google</span>
            </Button>
            <Button
              variant="outline"
              type="button"
              onClick={() => router.push("/dashboard")}
              className="h-11 text-xs bg-white border-pink-100/80 rounded-2xl font-extrabold hover:bg-pink-50 hover:text-[#D41367] flex items-center justify-center gap-2 transition-all shadow-2xs"
            >
              <svg className="w-4 h-4 shrink-0 fill-[#0A66C2]" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
              <span>LinkedIn</span>
            </Button>
          </div>

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
