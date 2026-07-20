"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export default function AuthSplitScreen({ isSignUp = false }: { isSignUp?: boolean }) {
  const [activeTab, setActiveTab] = useState<"login" | "signup">(isSignUp ? "signup" : "login");
  const [isRotaractor, setIsRotaractor] = useState(true);
  const router = useRouter();

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/register");
  };

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col lg:flex-row bg-[#FFF5F7]">
      {/* Left Column — Rotaract Primary Magenta (#D41367) Branding Panel */}
      <div className="lg:w-1/2 h-full bg-[#D41367] text-white p-6 sm:p-10 lg:p-12 xl:p-16 flex flex-col justify-between relative overflow-hidden shrink-0">
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-white/5 blur-3xl pointer-events-none" />

        <Link href="/" className="flex items-center gap-3 z-10 w-fit">
          <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/20 shadow-sm">
            <Users className="w-5 h-5" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-white">
            Rotaract Network
          </span>
        </Link>

        <div className="my-auto max-w-xl z-10 space-y-5">
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl lg:text-4xl xl:text-5xl font-extrabold tracking-tight leading-[1.15] text-white">
              Elevate Your Professional Journey through Service.
            </h1>
            <p className="text-white/90 text-xs sm:text-sm leading-relaxed max-w-lg">
              Connect with a global community of verified entrepreneurs and corporate leaders driven by the Rotary ethos of &quot;Service Above Self.&quot;
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-xs font-semibold text-white/80 z-10 pt-4 border-t border-white/20">
          <span>10k+ Verified Members</span>
          <span>10+ Countries</span>
          <span>B2B Opportunities</span>
        </div>
      </div>

      {/* Right Column — Auth Form */}
      <div className="lg:w-1/2 h-full p-6 sm:p-10 lg:p-12 xl:p-14 flex flex-col justify-between items-center overflow-y-auto">
        <div className="w-full max-w-md my-auto space-y-5">
          <div className="flex border-b border-[#F7D6E0] mb-5">
            <button
              onClick={() => setActiveTab("login")}
              className={`flex-1 py-3 text-sm font-bold text-center transition-colors relative ${activeTab === "login"
                  ? "text-[#D41367] border-b-2 border-[#D41367]"
                  : "text-muted-foreground hover:text-foreground"
                }`}
            >
              Login
            </button>
            <button
              onClick={() => setActiveTab("signup")}
              className={`flex-1 py-3 text-sm font-bold text-center transition-colors relative ${activeTab === "signup"
                  ? "text-[#D41367] border-b-2 border-[#D41367]"
                  : "text-muted-foreground hover:text-foreground"
                }`}
            >
              Sign Up
            </button>
          </div>

          {activeTab === "login" && (
            <div className="animate-fade-in space-y-5">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Welcome Back</h2>
                <p className="text-xs text-muted-foreground mt-1">
                  Enter your credentials to access your member portal.
                </p>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="work-email" className="text-xs font-semibold text-foreground">Work Email Address</Label>
                  <Input id="work-email" type="email" placeholder="name@company.com" className="h-11 text-sm bg-white border-[#F7D6E0] rounded-xl" required />
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="login-pass" className="text-xs font-semibold text-foreground">Password</Label>
                    <Link href="#" className="text-xs text-[#D41367] font-semibold hover:underline">Forgot password?</Link>
                  </div>
                  <Input id="login-pass" type="password" placeholder="••••••••" className="h-11 text-sm bg-white border-[#F7D6E0] rounded-xl" required />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <Checkbox id="remember" />
                  <Label htmlFor="remember" className="text-xs text-muted-foreground cursor-pointer">
                    Remember me for 30 days
                  </Label>
                </div>

                <Button type="submit" className="w-full bg-[#D41367] hover:bg-[#B80E56] text-white rounded-xl h-12 text-sm font-bold gap-2 shadow-lg shadow-[#D41367]/20">
                  Access Dashboard <ArrowRight className="w-4 h-4" />
                </Button>
              </form>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#F7D6E0]" /></div>
                <div className="relative flex justify-center"><span className="px-3 text-[10px] uppercase font-bold text-muted-foreground bg-[#FFF5F7]">OR CONTINUE WITH</span></div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" type="button" onClick={() => router.push("/dashboard")} className="h-11 text-xs bg-white border-[#F7D6E0] rounded-xl font-bold hover:bg-pink-50 flex items-center justify-center">
                  <svg className="w-4 h-4 mr-2 shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  Google
                </Button>
                <Button variant="outline" type="button" onClick={() => router.push("/dashboard")} className="h-11 text-xs bg-white border-[#F7D6E0] rounded-xl font-bold hover:bg-pink-50 flex items-center justify-center">
                  <svg className="w-4 h-4 mr-2 shrink-0 fill-[#0A66C2]" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                  </svg>
                  LinkedIn
                </Button>
              </div>
            </div>
          )}

          {activeTab === "signup" && (
            <div className="animate-fade-in space-y-4">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Create Member Profile</h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Join the network of professional service leaders.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-2">
                <Button variant="outline" type="button" onClick={() => router.push("/register")} className="h-10 text-xs bg-white border-[#F7D6E0] rounded-xl font-bold hover:bg-pink-50 flex items-center justify-center">
                  <svg className="w-4 h-4 mr-2 shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  Google
                </Button>
                <Button variant="outline" type="button" onClick={() => router.push("/register")} className="h-10 text-xs bg-white border-[#F7D6E0] rounded-xl font-bold hover:bg-pink-50 flex items-center justify-center">
                  <svg className="w-4 h-4 mr-2 shrink-0 fill-[#0A66C2]" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                  </svg>
                  LinkedIn
                </Button>
              </div>

              <div className="relative my-3">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#F7D6E0]" /></div>
                <div className="relative flex justify-center"><span className="px-3 text-[10px] uppercase font-bold text-muted-foreground bg-[#FFF5F7]">OR REGISTER WITH EMAIL</span></div>
              </div>

              <form onSubmit={handleSignupSubmit} className="space-y-3.5">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label htmlFor="fname" className="text-xs font-semibold text-foreground">First Name</Label>
                    <Input id="fname" placeholder="John" className="h-10 text-xs bg-white border-[#F7D6E0] rounded-xl" required />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="lname" className="text-xs font-semibold text-foreground">Last Name</Label>
                    <Input id="lname" placeholder="Doe" className="h-10 text-xs bg-white border-[#F7D6E0] rounded-xl" required />
                  </div>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="su-email" className="text-xs font-semibold text-foreground">Work Email</Label>
                  <Input id="su-email" type="email" placeholder="john@company.com" className="h-10 text-xs bg-white border-[#F7D6E0] rounded-xl" required />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="su-pass" className="text-xs font-semibold text-foreground">Create Password</Label>
                  <Input id="su-pass" type="password" placeholder="Min. 8 characters" className="h-10 text-xs bg-white border-[#F7D6E0] rounded-xl" required />
                </div>

                <div className="bg-[#FFEBEF] border border-[#F9C0CE] rounded-2xl p-3.5 space-y-2.5">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <Checkbox
                      checked={isRotaractor}
                      onCheckedChange={(c) => setIsRotaractor(!!c)}
                      className="mt-0.5"
                    />
                    <div>
                      <p className="text-xs font-bold text-[#D41367]">Are you a Rotaractor?</p>
                      <p className="text-[10px] text-muted-foreground leading-normal">
                        Check this to request instant verification using your Rotary ID.
                      </p>
                    </div>
                  </label>

                  {isRotaractor && (
                    <div className="space-y-2 pt-2 border-t border-[#F9C0CE] animate-fade-in">
                      <div className="space-y-0.5">
                        <Label htmlFor="rotary-id" className="text-[11px] text-foreground font-semibold">Rotary ID Number</Label>
                        <Input id="rotary-id" placeholder="e.g. 1234567" className="h-9 text-xs bg-white border-[#F7D6E0] rounded-xl" />
                      </div>
                      <div className="space-y-0.5">
                        <Label htmlFor="club-name" className="text-[11px] text-foreground font-semibold">Home Club Name</Label>
                        <Input id="club-name" placeholder="e.g. Rotaract Club of Tokyo" className="h-9 text-xs bg-white border-[#F7D6E0] rounded-xl" />
                      </div>
                    </div>
                  )}
                </div>

                <Button type="submit" className="w-full bg-[#D41367] hover:bg-[#B80E56] text-white rounded-xl h-12 text-sm font-bold shadow-lg shadow-[#D41367]/20">
                  Create Network Profile
                </Button>

                <p className="text-[11px] text-center text-muted-foreground">
                  By signing up, you agree to our{" "}
                  <Link href="#" className="text-[#D41367] font-semibold underline">Terms of Service</Link> and{" "}
                  <Link href="#" className="text-[#D41367] font-semibold underline">Privacy Policy</Link>.
                </p>
              </form>
            </div>
          )}
        </div>

        <div className="text-center text-[11px] text-muted-foreground mt-2 shrink-0">
          © 2024 Rotaract Network · <Link href="#" className="hover:underline">Help</Link> · <Link href="#" className="hover:underline">Privacy</Link>
        </div>
      </div>
    </div>
  );
}
