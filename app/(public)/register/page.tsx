"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Check,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Building2,
  CheckCircle2,
  Lock,
  User,
  Mail,
  Phone,
  KeyRound,
  IdCard,
  Globe,
  MapPin,
  FileText,
  Briefcase,
  Stethoscope,
  Palette,
  Laptop,
  Landmark,
  Compass,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  { id: 1, label: "1. Your Profile" },
  { id: 2, label: "2. Business Info" },
  { id: 3, label: "3. Verification" },
];

const sectorOptions = [
  { id: "Legal & Corporate", label: "Legal & Corporate", icon: Briefcase },
  { id: "Healthcare & Medicine", label: "Healthcare & Medicine", icon: Stethoscope },
  { id: "Creative & Digital", label: "Creative & Digital", icon: Palette },
  { id: "Technology & Software", label: "Technology & Software", icon: Laptop },
  { id: "Finance & Audit", label: "Finance & Audit", icon: Landmark },
  { id: "Architecture & Construction", label: "Architecture", icon: Compass },
];

export default function BusinessRegistrationPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();

  // Form State
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    rotaryId: "",
    clubName: "",
    district: "District 3220",
    businessName: "",
    category: "Legal & Corporate",
    tagline: "",
    description: "",
    website: "",
    address: "",
    city: "Colombo",
    country: "Sri Lanka",
    gstNumber: "",
    statutoryNo: "",
    agreeTerms: true,
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
    } else {
      router.push("/dashboard");
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#FAF6F4] flex flex-col justify-between font-sans">
      {/* Header Bar */}
      <header className="relative z-10 bg-white/80 backdrop-blur-md border-b border-pink-100/80 py-3 px-6 sm:px-10 flex items-center justify-between shrink-0 shadow-xs">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            className="rounded-full text-xs font-bold text-muted-foreground hover:text-[#D41367] hover:bg-pink-50 gap-1 px-3"
            asChild
          >
            <Link href="/">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
          </Button>

          <div className="hidden sm:block w-px h-5 bg-border" />

          <Link href="/" className="flex items-center gap-2 text-base sm:text-lg font-black text-[#D41367]">
            <div className="w-7 h-7 rounded-lg bg-[#D41367] text-white flex items-center justify-center font-bold text-xs shadow-sm">
              R
            </div>
            <span>Rotaract Business Network</span>
          </Link>
        </div>

        <div className="flex items-center gap-3 text-xs font-semibold">
          <span className="text-muted-foreground hidden sm:inline">Already registered?</span>
          <Button variant="outline" className="rounded-full border-pink-200 hover:border-[#D41367] hover:text-[#D41367] text-xs h-8 px-4 bg-white/90 font-bold" asChild>
            <Link href="/auth/login">Login</Link>
          </Button>
        </div>
      </header>

      {/* Main 100vh Full-Screen Content Area */}
      <main className="relative z-10 flex-1 flex flex-col justify-center max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-5 overflow-hidden">
        {/* Step Tab Navigation Bar */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl p-1.5 shadow-sm border border-pink-100 max-w-2xl mx-auto mb-4 w-full shrink-0">
          <div className="grid grid-cols-3 gap-1.5">
            {steps.map((step) => {
              const isActive = currentStep === step.id;
              const isDone = currentStep > step.id;

              return (
                <button
                  key={step.id}
                  onClick={() => isDone && setCurrentStep(step.id)}
                  disabled={!isDone && !isActive}
                  className={`py-2 px-3 rounded-xl transition-all duration-200 text-center flex items-center justify-center gap-2 ${
                    isActive
                      ? "bg-[#D41367] text-white shadow-md font-bold"
                      : isDone
                      ? "bg-pink-50 text-[#D41367] hover:bg-pink-100/80 font-bold"
                      : "bg-transparent text-muted-foreground font-medium opacity-60"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-extrabold shrink-0 ${
                      isActive
                        ? "bg-white text-[#D41367]"
                        : isDone
                        ? "bg-[#D41367] text-white"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {isDone ? <Check className="w-3 h-3" /> : step.id}
                  </div>
                  <span className="text-xs truncate">{step.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Form Layout Grid */}
        <div className="grid lg:grid-cols-12 gap-6 items-stretch flex-1 max-h-[calc(100vh-130px)]">
          {/* Left Column: Photo-Backed Premium Theme Hero Panel */}
          <div className="lg:col-span-4 rounded-3xl overflow-hidden relative shadow-lg flex flex-col justify-between p-6 sm:p-7 text-white">
            <Image
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=85"
              alt="Rotaract Business Leaders"
              fill
              className="object-cover object-center opacity-100 pointer-events-none"
              priority
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#18181B] via-[#D41367]/80 to-[#D41367]/50" />

            <div className="relative z-10 space-y-6 my-auto">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white leading-tight drop-shadow-sm">
                  Join 1,200+ Rotaract Business Leaders.
                </h2>
                <p className="text-xs text-white/90 mt-1.5 leading-relaxed font-medium">
                  Establish verified B2B standing across worldwide Rotaract districts.
                </p>
              </div>

              {/* Relevant & Concise Benefit Items */}
              <div className="space-y-2.5">
                <div className="bg-black/30 border border-white/20 rounded-2xl p-3 flex items-center gap-3 backdrop-blur-md">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-xs font-bold text-white">Verified Member Badge</span>
                </div>

                <div className="bg-black/30 border border-white/20 rounded-2xl p-3 flex items-center gap-3 backdrop-blur-md">
                  <Globe className="w-4 h-4 text-amber-300 shrink-0" />
                  <span className="text-xs font-bold text-white">Global Network Reach</span>
                </div>

                <div className="bg-black/30 border border-white/20 rounded-2xl p-3 flex items-center gap-3 backdrop-blur-md">
                  <Lock className="w-4 h-4 text-white shrink-0" />
                  <span className="text-xs font-bold text-white">Direct B2B Enquiries</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Form Panel Standardized Typography */}
          <div className="lg:col-span-8 bg-white border border-pink-100 rounded-3xl p-6 sm:p-8 flex flex-col justify-between overflow-y-auto shadow-sm">
            {/* Step 1: Your Profile Form */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-foreground tracking-tight">Step 1: Your Member Profile</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 font-medium">
                    Enter your credentials and home club details.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-6 pt-2">
                  {/* First Name */}
                  <div className="relative border-b-2 border-border/80 focus-within:border-[#D41367] pb-1 transition-colors">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        FIRST NAME
                      </label>
                      <User className="w-4 h-4 text-[#D41367]" />
                    </div>
                    <input
                      type="text"
                      placeholder="Input Your First Name"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      className="w-full bg-transparent text-sm font-medium outline-none text-foreground mt-2.5 pb-1 placeholder:text-muted-foreground/50"
                    />
                  </div>

                  {/* Last Name */}
                  <div className="relative border-b-2 border-border/80 focus-within:border-[#D41367] pb-1 transition-colors">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        LAST NAME
                      </label>
                      <User className="w-4 h-4 text-[#D41367]" />
                    </div>
                    <input
                      type="text"
                      placeholder="Input Your Last Name"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      className="w-full bg-transparent text-sm font-medium outline-none text-foreground mt-2.5 pb-1 placeholder:text-muted-foreground/50"
                    />
                  </div>

                  {/* Email */}
                  <div className="relative border-b-2 border-border/80 focus-within:border-[#D41367] pb-1 transition-colors">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        EMAIL ADDRESS
                      </label>
                      <Mail className="w-4 h-4 text-[#D41367]" />
                    </div>
                    <input
                      type="email"
                      placeholder="Input Your Email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="w-full bg-transparent text-sm font-medium outline-none text-foreground mt-2.5 pb-1 placeholder:text-muted-foreground/50"
                    />
                  </div>

                  {/* Phone */}
                  <div className="relative border-b-2 border-border/80 focus-within:border-[#D41367] pb-1 transition-colors">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center">
                        PHONE NUMBER <span className="ml-2 px-2 py-0.5 rounded-md bg-pink-100/80 border border-pink-200 text-[#D41367] text-[10px] font-bold normal-case tracking-normal">Optional</span>
                      </label>
                      <Phone className="w-4 h-4 text-[#D41367]" />
                    </div>
                    <input
                      type="text"
                      placeholder="Input Your Phone Number"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="w-full bg-transparent text-sm font-medium outline-none text-foreground mt-2.5 pb-1 placeholder:text-muted-foreground/50"
                    />
                  </div>

                  {/* Rotary Member ID */}
                  <div className="relative border-b-2 border-border/80 focus-within:border-[#D41367] pb-1 transition-colors">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        ROTARY / ROTARACT MEMBER ID
                      </label>
                      <IdCard className="w-4 h-4 text-[#D41367]" />
                    </div>
                    <input
                      type="text"
                      placeholder="e.g. ROT-10492"
                      value={formData.rotaryId}
                      onChange={(e) => handleInputChange("rotaryId", e.target.value)}
                      className="w-full bg-transparent text-sm font-medium outline-none text-foreground mt-2.5 pb-1 placeholder:text-muted-foreground/50"
                    />
                  </div>

                  {/* Rotaract Home Club */}
                  <div className="relative border-b-2 border-border/80 focus-within:border-[#D41367] pb-1 transition-colors">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        ROTARACT HOME CLUB
                      </label>
                      <Building2 className="w-4 h-4 text-[#D41367]" />
                    </div>
                    <input
                      type="text"
                      placeholder="e.g. Rotaract Club of Colombo"
                      value={formData.clubName}
                      onChange={(e) => handleInputChange("clubName", e.target.value)}
                      className="w-full bg-transparent text-sm font-medium outline-none text-foreground mt-2.5 pb-1 placeholder:text-muted-foreground/50"
                    />
                  </div>

                  {/* Password */}
                  <div className="relative border-b-2 border-border/80 focus-within:border-[#D41367] pb-1 transition-colors sm:col-span-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        ACCOUNT PASSWORD
                      </label>
                      <KeyRound className="w-4 h-4 text-[#D41367]" />
                    </div>
                    <input
                      type="password"
                      placeholder="Create Password"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      className="w-full bg-transparent text-sm font-medium outline-none text-foreground mt-2.5 pb-1 placeholder:text-muted-foreground/50"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Business Information Form */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-foreground tracking-tight">Step 2: Business Details</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 font-medium">
                    Provide details about your venture for your directory card.
                  </p>
                </div>

                <div className="space-y-6 pt-2">
                  {/* Business Name */}
                  <div className="relative border-b-2 border-border/80 focus-within:border-[#D41367] pb-1 transition-colors">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        BUSINESS / COMPANY NAME
                      </label>
                      <Building2 className="w-4 h-4 text-[#D41367]" />
                    </div>
                    <input
                      type="text"
                      placeholder="Skyline Legal Associates"
                      value={formData.businessName}
                      onChange={(e) => handleInputChange("businessName", e.target.value)}
                      className="w-full bg-transparent text-sm font-medium outline-none text-foreground mt-2.5 pb-1 placeholder:text-muted-foreground/50"
                    />
                  </div>

                  {/* Industry Sector Chips */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      SELECT INDUSTRY SECTOR
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {sectorOptions.map((sec) => {
                        const isSelected = formData.category === sec.id;
                        const Icon = sec.icon;

                        return (
                          <button
                            type="button"
                            key={sec.id}
                            onClick={() => handleInputChange("category", sec.id)}
                            className={`p-2.5 rounded-2xl border text-left flex items-center gap-2 transition-all ${
                              isSelected
                                ? "bg-[#D41367] text-white border-[#D41367] shadow-sm font-bold scale-[1.02]"
                                : "bg-pink-50/40 text-foreground border-pink-200/80 hover:border-[#D41367]/40 hover:bg-white"
                            }`}
                          >
                            <div
                              className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 text-xs ${
                                isSelected ? "bg-white/20 text-white" : "bg-white text-[#D41367] border border-pink-100"
                              }`}
                            >
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-xs leading-tight font-bold truncate">{sec.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* City & Country Grid */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="relative border-b-2 border-border/80 focus-within:border-[#D41367] pb-1 transition-colors">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                          CITY
                        </label>
                        <MapPin className="w-4 h-4 text-[#D41367]" />
                      </div>
                      <input
                        type="text"
                        placeholder="Colombo / Dubai / Mumbai"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        className="w-full bg-transparent text-sm font-medium outline-none text-foreground mt-2.5 pb-1 placeholder:text-muted-foreground/50"
                      />
                    </div>

                    <div className="relative border-b-2 border-border/80 focus-within:border-[#D41367] pb-1 transition-colors">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center">
                          WEBSITE URL <span className="ml-2 px-2 py-0.5 rounded-md bg-pink-100/80 border border-pink-200 text-[#D41367] text-[10px] font-bold normal-case tracking-normal">Optional</span>
                        </label>
                        <Globe className="w-4 h-4 text-[#D41367]" />
                      </div>
                      <input
                        type="text"
                        placeholder="https://yourcompany.com"
                        value={formData.website}
                        onChange={(e) => handleInputChange("website", e.target.value)}
                        className="w-full bg-transparent text-sm font-medium outline-none text-foreground mt-2.5 pb-1 placeholder:text-muted-foreground/50"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Verification Credentials */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-foreground tracking-tight">Step 3: Verification Credentials</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 font-medium">
                    Submit optional statutory registration numbers for verified badge standing.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-6 pt-2">
                  <div className="relative border-b-2 border-border/80 focus-within:border-[#D41367] pb-1 transition-colors">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center">
                        GST / TAX REG NO <span className="ml-2 px-2 py-0.5 rounded-md bg-pink-100/80 border border-pink-200 text-[#D41367] text-[10px] font-bold normal-case tracking-normal">Optional</span>
                      </label>
                      <FileText className="w-4 h-4 text-[#D41367]" />
                    </div>
                    <input
                      type="text"
                      placeholder="22AAAAA0000A1Z5"
                      value={formData.gstNumber}
                      onChange={(e) => handleInputChange("gstNumber", e.target.value)}
                      className="w-full bg-transparent text-sm font-medium outline-none text-foreground mt-2.5 pb-1 placeholder:text-muted-foreground/50"
                    />
                  </div>

                  <div className="relative border-b-2 border-border/80 focus-within:border-[#D41367] pb-1 transition-colors">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center">
                        STATUTORY BUSINESS NO <span className="ml-2 px-2 py-0.5 rounded-md bg-pink-100/80 border border-pink-200 text-[#D41367] text-[10px] font-bold normal-case tracking-normal">Optional</span>
                      </label>
                      <ShieldCheck className="w-4 h-4 text-[#D41367]" />
                    </div>
                    <input
                      type="text"
                      placeholder="PV-109482"
                      value={formData.statutoryNo}
                      onChange={(e) => handleInputChange("statutoryNo", e.target.value)}
                      className="w-full bg-transparent text-sm font-medium outline-none text-foreground mt-2.5 pb-1 placeholder:text-muted-foreground/50"
                    />
                  </div>
                </div>

                <div className="bg-pink-50/80 border border-pink-200 rounded-2xl p-4 flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#D41367] shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <h4 className="font-extrabold text-foreground">District Verification Review</h4>
                    <p className="text-muted-foreground mt-0.5 leading-relaxed font-normal">
                      Your business profile will be reviewed within 24-48 hours by your assigned Rotaract District Representative to issue your official verified badge.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Footer Action Controls */}
            <div className="pt-4 border-t border-pink-100 flex items-center justify-between mt-4 shrink-0">
              {currentStep > 1 ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  className="rounded-full border-pink-200 text-foreground hover:bg-pink-50 text-xs font-bold px-5 h-10"
                >
                  <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Previous Step
                </Button>
              ) : (
                <div />
              )}

              <Button
                type="button"
                onClick={handleNext}
                className="rounded-full bg-[#D41367] hover:bg-[#B80E56] text-white text-xs font-extrabold px-7 h-10 shadow-md gap-1"
              >
                <span>{currentStep === 3 ? "Complete Business Registration" : "Next Step"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
