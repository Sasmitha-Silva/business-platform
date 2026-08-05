"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight, Users, Mail, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface AuthSplitScreenProps {
  isSignUp?: boolean;
}

export default function AuthSplitScreen({ isSignUp = false }: AuthSplitScreenProps) {
  const router = useRouter();

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col lg:flex-row bg-[#FFF5F7]">
      {/* Left Column — Photo-Backed Rotaract Branding Panel */}
      <div className="lg:w-1/2 h-full text-white p-6 sm:p-10 lg:p-12 xl:p-16 flex flex-col justify-between relative overflow-hidden shrink-0">
        <Image
          src="/images/hero-meeting.png"
          alt="Rotaract Business Leaders"
          fill
          className="object-cover object-center pointer-events-none"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#18181B] via-[#D41367]/85 to-[#D41367]/60" />

        <Link href="/" className="flex items-center gap-3 z-10 w-fit">
          <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/20 shadow-sm">
            <Users className="w-5 h-5" />
          </div>
          <span className="text-xl font-black tracking-tight text-white">
            Rotaract Network
          </span>
        </Link>

        <div className="my-auto max-w-xl z-10 space-y-5">
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl lg:text-4xl xl:text-5xl font-black text-white tracking-tight leading-[1.15]">
              Elevate Your Professional Journey through Service.
            </h1>
            <p className="text-white/90 text-xs sm:text-sm leading-relaxed max-w-lg font-medium">
              Connect with a global community of verified entrepreneurs and corporate leaders driven by the Rotary ethos of &quot;Service Above Self.&quot;
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-xs font-bold text-white/80 z-10 pt-4 border-t border-white/20">
          <span>10k+ Verified Members</span>
          <span>10+ Countries</span>
          <span>B2B Opportunities</span>
        </div>
      </div>

      {/* Right Column — Redesigned High-End Auth Form */}
      <div className="lg:w-1/2 h-full p-6 sm:p-10 lg:p-12 xl:p-16 flex flex-col justify-between items-center overflow-y-auto bg-white font-sans">
        <div className="w-full max-w-md my-auto space-y-6">
          {/* Header */}
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
              {isSignUp ? (
                <>
                  Join the <span className="text-[#D41367]">Network</span>
                </>
              ) : (
                <>
                  Welcome <span className="text-[#D41367]">Back</span>
                </>
              )}
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground font-medium">
              {isSignUp
                ? "Enter your credentials to create your member account."
                : "Enter your credentials to access your member dashboard."}
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-6 pt-2">
            {/* Work Email */}
            <div className="relative border-b-2 border-border/80 focus-within:border-[#D41367] pb-1 transition-colors">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-foreground">
                  Work Email Address
                </label>
                <Mail className="w-4 h-4 text-[#D41367]" />
              </div>
              <input
                id="work-email"
                type="email"
                placeholder="Input Your Email Address"
                className="w-full bg-transparent text-sm font-medium outline-none text-foreground mt-2.5 pb-1 placeholder:text-muted-foreground/50"
                required
              />
            </div>

            {/* Password */}
            <div className="relative border-b-2 border-border/80 focus-within:border-[#D41367] pb-1 transition-colors">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-foreground">
                  Password
                </label>
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

            {/* Remember Me */}
            {!isSignUp && (
              <div className="flex items-center gap-2 pt-1">
                <Checkbox id="remember" className="accent-[#D41367]" />
                <label htmlFor="remember" className="text-xs text-muted-foreground cursor-pointer font-medium">
                  Keep me signed in for 30 days
                </label>
              </div>
            )}

            {/* Submit Button */}
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
              className="h-11 text-xs bg-[#FAF6F4] border-pink-100/80 rounded-2xl font-extrabold hover:bg-pink-50 hover:text-[#D41367] flex items-center justify-center gap-2 transition-all"
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
              className="h-11 text-xs bg-[#FAF6F4] border-pink-100/80 rounded-2xl font-extrabold hover:bg-pink-50 hover:text-[#D41367] flex items-center justify-center gap-2 transition-all"
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
          © 2026 Rotaract Network
        </div>
      </div>
    </div>
  );
}
