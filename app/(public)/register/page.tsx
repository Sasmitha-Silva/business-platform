"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Check,
  Building2,
  Users,
  User,
  Mail,
  Phone,
  Lock,
  MapPin,
  Globe,
  MessageSquare,
  BadgeCheck,
  Share2,
  Link2,
  Image as ImageIcon,
  Camera,
  CornerDownLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { registerBusinessAction } from "@/app/actions/register";
import { getUploadUrlAction } from "@/app/actions/storage";
import { useAuth } from "@/components/auth-provider";
import { AlertCircle } from "lucide-react";

const SECTOR_NAMES = [
  "Technology & Software",
  "Professional & Legal Services",
  "Healthcare & Life Sciences",
  "Creative & Design Agency",
  "Industrial & Manufacturing",
  "Real Estate & Construction",
  "Finance & Advisory",
  "Retail & Consumer Goods",
  "Education & Training",
  "Hospitality & Tourism",
];

const POPULAR_CLUBS = [
  { name: "Rotaract Club of Colombo Central", district: "District 3220" },
  { name: "Rotaract Club of Achievers Lanka", district: "District 3220" },
  { name: "Rotaract Club of Faculty of Science, UOC", district: "District 3220" },
  { name: "Rotaract Club of Colombo Mid Town", district: "District 3220" },
  { name: "Rotaract Club of Kandy", district: "District 3220" },
  { name: "Rotaract Club of SLIIT", district: "District 3220" },
  { name: "Rotaract Club of Mumbai Downtown", district: "District 3141" },
  { name: "Rotaract Club of Delhi Elite", district: "District 3011" },
  { name: "Rotaract Club of Kathmandu North", district: "District 3292" },
  { name: "Rotaract Club of Bangalore West", district: "District 3190" },
  { name: "Other Rotaract Club (International)", district: "International District" },
];

const TOTAL_STEPS = 4;

interface CustomDropdownProps {
  label: string;
  value: string;
  options: string[];
  onChange: (val: string) => void;
}

function CustomDropdown({ label, value, options, onChange }: CustomDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          "w-full flex items-center justify-between gap-3 text-left py-2.5 px-3.5 rounded-xl border text-xs sm:text-sm font-bold transition-all cursor-pointer bg-slate-50",
          open
            ? "border-[#D41367] ring-2 ring-[#D41367]/20 text-[#D41367] bg-white"
            : "border-slate-200 text-slate-800 hover:border-slate-300 hover:bg-white"
        )}
      >
        <span className="truncate">{value || "Select an option..."}</span>
        <ChevronDown className={cn("w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200", open && "rotate-180 text-[#D41367]")} />
      </button>

      {open && (
        <div
          className="absolute left-0 right-0 mt-1.5 bg-white rounded-2xl border border-slate-200 shadow-2xl p-1.5 z-[100] space-y-0.5 max-h-56 overflow-y-auto overscroll-contain animate-in fade-in zoom-in-95 duration-150 select-auto"
          onWheel={(e) => e.stopPropagation()}
        >
          {options.map((opt) => {
            const isSelected = opt === value;
            return (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className={cn(
                  "w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-left transition-colors cursor-pointer",
                  isSelected
                    ? "bg-pink-50 text-[#D41367] font-extrabold"
                    : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <span className="truncate">{opt}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-[#D41367] shrink-0 ml-1.5" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function HybridRegistrationPage() {
  const router = useRouter();
  const { refreshAuth } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const [isUploadingBanner, setIsUploadingBanner] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Account & Member Credentials
    fullName: "",
    email: "",
    phone: "",
    clubName: "Rotaract Club of Colombo Central",
    district: "District 3220",
    memberId: "",
    password: "",

    // Step 2: Enterprise Details & Logos
    businessName: "",
    tagline: "",
    sector: "Technology & Software",
    description: "",
    logoUrl: "",
    bannerUrl: "",

    // Step 3: Locations & Contact
    city: "",
    country: "Sri Lanka",
    address: "",
    businessEmail: "",
    businessPhone: "",

    // Step 4: Complete Social Channels & Publication
    website: "",
    linkedin: "",
    instagram: "",
    facebook: "",
    twitter: "",
    whatsapp: "",
    agreeTerms: false,
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // Restore draft from sessionStorage if available
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem('rbn_register_draft');
      if (saved) {
        const parsed = JSON.parse(saved);
        setFormData((prev) => ({ ...prev, ...parsed }));
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  // Save draft to sessionStorage on changes
  useEffect(() => {
    try {
      sessionStorage.setItem('rbn_register_draft', JSON.stringify(formData));
    } catch {
      // Ignore storage errors
    }
  }, [formData]);

  const inputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputRef.current) inputRef.current.focus();
    }, 150);
    return () => clearTimeout(timer);
  }, [currentStep]);

  const validateStep = (step: number): boolean => {
    const errors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.fullName.trim()) errors.fullName = "Full legal name is required.";
      if (!formData.email.trim()) {
        errors.email = "Email address is required.";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
        errors.email = "Please enter a valid email address.";
      }
      if (!formData.phone.trim()) errors.phone = "Phone number is required.";
      if (!formData.memberId.trim()) errors.memberId = "Member ID / Rotary ID is required.";
      if (!formData.password) {
        errors.password = "Password is required.";
      } else if (formData.password.length < 6) {
        errors.password = "Password must be at least 6 characters long.";
      }
    } else if (step === 2) {
      if (!formData.businessName.trim()) errors.businessName = "Enterprise name is required.";
    } else if (step === 3) {
      if (!formData.city.trim()) errors.city = "Operating city is required.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Keyboard navigation (Enter key helper)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey && e.target instanceof HTMLInputElement) {
        if (currentStep < 4) {
          e.preventDefault();
          handleNext();
        } else if (currentStep === 4 && formData.agreeTerms) {
          e.preventDefault();
          handleSubmit();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentStep, formData]);

  const handleClubChange = (selectedClubName: string) => {
    const matched = POPULAR_CLUBS.find((c) => c.name === selectedClubName);
    setFormData((prev) => ({
      ...prev,
      clubName: selectedClubName,
      district: matched ? matched.district : "District 3220",
    }));
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Local preview immediately
    const localUrl = URL.createObjectURL(file);
    setFormData((prev) => ({ ...prev, logoUrl: localUrl }));
    setIsUploadingLogo(true);

    try {
      const res = await getUploadUrlAction({
        filename: file.name,
        contentType: file.type || "image/png",
        folder: "logos",
      });

      if (res.success && res.uploadUrl) {
        await fetch(res.uploadUrl, {
          method: "PUT",
          headers: { "Content-Type": file.type || "image/png" },
          body: file,
        });
        setFormData((prev) => ({ ...prev, logoUrl: res.publicUrl }));
      }
    } catch (err) {
      console.error("R2 logo upload fallback to local:", err);
    } finally {
      setIsUploadingLogo(false);
    }
  };

  const handleBannerUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const localUrl = URL.createObjectURL(file);
    setFormData((prev) => ({ ...prev, bannerUrl: localUrl }));
    setIsUploadingBanner(true);

    try {
      const res = await getUploadUrlAction({
        filename: file.name,
        contentType: file.type || "image/png",
        folder: "covers",
      });

      if (res.success && res.uploadUrl) {
        await fetch(res.uploadUrl, {
          method: "PUT",
          headers: { "Content-Type": file.type || "image/png" },
          body: file,
        });
        setFormData((prev) => ({ ...prev, bannerUrl: res.publicUrl }));
      }
    } catch (err) {
      console.error("R2 banner upload fallback to local:", err);
    } finally {
      setIsUploadingBanner(false);
    }
  };

  const handleNext = () => {
    if (!validateStep(currentStep)) return;
    setFieldErrors({});
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setFieldErrors({});
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setErrorMessage("");

    // Full 4-step validation before submission
    if (!validateStep(1)) {
      setCurrentStep(1);
      setErrorMessage("Please complete all required account details in Step 1.");
      return;
    }
    if (!validateStep(2)) {
      setCurrentStep(2);
      setErrorMessage("Please complete your enterprise name in Step 2.");
      return;
    }
    if (!validateStep(3)) {
      setCurrentStep(3);
      setErrorMessage("Please specify your operating city in Step 3.");
      return;
    }
    if (!formData.agreeTerms) {
      setErrorMessage("Please agree to the Rotaract membership terms before submitting.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await registerBusinessAction(formData);

      if (!res.success) {
        setErrorMessage(res.error || "Failed to submit registration. Please try again.");
        setIsSubmitting(false);
        return;
      }

      sessionStorage.removeItem('rbn_register_draft');
      await refreshAuth();
      setIsSuccess(true);
      setTimeout(() => {
        router.push(res.redirectTo || "/business-dashboard");
        router.refresh();
      }, 2000);
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred during registration.");
      setIsSubmitting(false);
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

        {/* Right: Exit / Login Matching Main Navbar */}
        <div className="flex items-center gap-2 sm:gap-6 shrink-0">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 sm:border-transparent text-xs sm:text-base font-bold sm:font-semibold text-slate-700 hover:text-[#D41367] hover:bg-slate-50 sm:hover:bg-transparent transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-500 group-hover:text-[#D41367] transition-colors" />
            <span>Back</span>
          </Link>

          <div className="w-px h-5 bg-slate-200 hidden sm:block" />

          <span className="text-slate-500 hidden sm:inline text-sm font-semibold">Already registered?</span>
          <Button
            variant="outline"
            className="hidden sm:inline-flex border-2 border-[#D41367] text-[#D41367] hover:bg-[#D41367] hover:text-white bg-transparent rounded-full px-5 py-2 text-xs sm:text-sm font-extrabold shadow-2xs hover:scale-105 active:scale-95 transition-all h-auto cursor-pointer"
            asChild
          >
            <Link href="/auth/login">Login</Link>
          </Button>
        </div>
      </header>

      {/* ================= 100VH HYBRID TYPEFORM WORKSPACE ================= */}
      <main className="flex-1 flex flex-col justify-center max-w-3xl lg:max-w-4xl w-full mx-auto px-6 sm:px-10 py-3 relative z-10">

        {!isSuccess ? (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300" key={currentStep}>

            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs font-semibold text-red-700 flex items-start gap-2.5 animate-in fade-in duration-200">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* CONVERSATION 1: LET'S BUILD YOUR ACCOUNT FIRST */}
            {currentStep === 1 && (
              <div className="space-y-3.5">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 text-xs font-black text-[#D41367] uppercase tracking-wider">
                    <span>01</span>
                    <ArrowRight className="w-3 h-3" />
                    <span>Member Identity</span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-slate-900 tracking-tight leading-[1.15]">
                    Let&apos;s build you an account first
                  </h1>
                </div>

                <div className="space-y-3 pt-3.5 sm:pt-4">
                  {/* Full Name */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Full Legal Name *</label>
                    <div className="relative">
                      <input
                        ref={inputRef}
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => {
                          setFormData({ ...formData, fullName: e.target.value });
                          if (fieldErrors.fullName) setFieldErrors({ ...fieldErrors, fullName: "" });
                        }}
                        placeholder="e.g. Sasmitha Silva"
                        className={cn(
                          "w-full pl-3.5 pr-9 py-2.5 rounded-xl bg-slate-50 border text-xs sm:text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 outline-none transition-all",
                          fieldErrors.fullName
                            ? "border-red-400 focus:ring-red-400/20 focus:border-red-500 bg-red-50/20"
                            : "border-slate-200 focus:ring-[#D41367]/20 focus:border-[#D41367]"
                        )}
                      />
                      <User className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    </div>
                    {fieldErrors.fullName && (
                      <p className="text-[11px] font-bold text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {fieldErrors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Email Address *</label>
                      <div className="relative">
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value });
                            if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: "" });
                          }}
                          placeholder="sasmitha@example.com"
                          className={cn(
                            "w-full pl-3.5 pr-9 py-2.5 rounded-xl bg-slate-50 border text-xs sm:text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 outline-none transition-all",
                            fieldErrors.email
                              ? "border-red-400 focus:ring-red-400/20 focus:border-red-500 bg-red-50/20"
                              : "border-slate-200 focus:ring-[#D41367]/20 focus:border-[#D41367]"
                          )}
                        />
                        <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      </div>
                      {fieldErrors.email && (
                        <p className="text-[11px] font-bold text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {fieldErrors.email}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Mobile Phone *</label>
                      <div className="relative">
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => {
                            setFormData({ ...formData, phone: e.target.value });
                            if (fieldErrors.phone) setFieldErrors({ ...fieldErrors, phone: "" });
                          }}
                          placeholder="+94 77 123 4567"
                          className={cn(
                            "w-full pl-3.5 pr-9 py-2.5 rounded-xl bg-slate-50 border text-xs sm:text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 outline-none transition-all",
                            fieldErrors.phone
                              ? "border-red-400 focus:ring-red-400/20 focus:border-red-500 bg-red-50/20"
                              : "border-slate-200 focus:ring-[#D41367]/20 focus:border-[#D41367]"
                          )}
                        />
                        <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      </div>
                      {fieldErrors.phone && (
                        <p className="text-[11px] font-bold text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {fieldErrors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Rotaract Club Selection (Auto-tracks District) */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-700">Rotaract Home Club *</label>
                      <span className="text-[10px] font-extrabold text-[#D41367] bg-pink-50 px-2 py-0.5 rounded-md border border-pink-100">
                        District: {formData.district}
                      </span>
                    </div>
                    <CustomDropdown
                      label="Select Your Rotaract Club"
                      value={formData.clubName}
                      options={POPULAR_CLUBS.map((c) => c.name)}
                      onChange={handleClubChange}
                    />
                  </div>

                  {/* Rotary Member ID & Password */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Member ID *</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={formData.memberId}
                          onChange={(e) => {
                            setFormData({ ...formData, memberId: e.target.value });
                            if (fieldErrors.memberId) setFieldErrors({ ...fieldErrors, memberId: "" });
                          }}
                          placeholder="e.g. RID-89210"
                          className={cn(
                            "w-full pl-3.5 pr-9 py-2.5 rounded-xl bg-slate-50 border text-xs sm:text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 outline-none transition-all",
                            fieldErrors.memberId
                              ? "border-red-400 focus:ring-red-400/20 focus:border-red-500 bg-red-50/20"
                              : "border-slate-200 focus:ring-[#D41367]/20 focus:border-[#D41367]"
                          )}
                        />
                        <BadgeCheck className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      </div>
                      {fieldErrors.memberId && (
                        <p className="text-[11px] font-bold text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {fieldErrors.memberId}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-slate-700">Account Password *</label>
                        <span className={cn(
                          "text-[10px] font-bold px-1.5 py-0.2 rounded transition-colors",
                          formData.password.length >= 6
                            ? "text-emerald-700 bg-emerald-50"
                            : formData.password.length > 0
                            ? "text-amber-700 bg-amber-50"
                            : "text-slate-400"
                        )}>
                          {formData.password.length >= 6
                            ? "✓ Min 6 characters met"
                            : `${6 - formData.password.length} more chars needed`}
                        </span>
                      </div>
                      <div className="relative">
                        <input
                          type="password"
                          value={formData.password}
                          onChange={(e) => {
                            setFormData({ ...formData, password: e.target.value });
                            if (fieldErrors.password && e.target.value.length >= 6) {
                              setFieldErrors((prev) => {
                                const copy = { ...prev };
                                delete copy.password;
                                return copy;
                              });
                            }
                          }}
                          onBlur={() => {
                            if (formData.password && formData.password.length < 6) {
                              setFieldErrors((prev) => ({
                                ...prev,
                                password: "Password must be at least 6 characters long.",
                              }));
                            }
                          }}
                          placeholder="At least 6 characters"
                          className={cn(
                            "w-full pl-3.5 pr-9 py-2.5 rounded-xl bg-slate-50 border text-xs sm:text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 outline-none transition-all",
                            fieldErrors.password
                              ? "border-red-400 focus:ring-red-400/20 focus:border-red-500 bg-red-50/20"
                              : "border-slate-200 focus:ring-[#D41367]/20 focus:border-[#D41367]"
                          )}
                        />
                        <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      </div>
                      {fieldErrors.password && (
                        <p className="text-[11px] font-bold text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {fieldErrors.password}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <Button
                    onClick={handleNext}
                    className="bg-[#D41367] hover:bg-[#B80E56] text-white rounded-full px-6 py-2.5 text-xs sm:text-sm font-extrabold shadow-md flex items-center gap-2 cursor-pointer h-auto"
                  >
                    <span>Continue to Business Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                  <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-slate-400 font-medium pl-1">
                    press <strong className="font-extrabold text-slate-700 inline-flex items-center gap-0.5">Enter <CornerDownLeft className="w-3 h-3" /></strong>
                  </span>
                </div>
              </div>
            )}

            {/* CONVERSATION 2: ENTERPRISE & BRAND LOGOS */}
            {currentStep === 2 && (
              <div className="space-y-3.5">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 text-xs font-black text-[#D41367] uppercase tracking-wider">
                    <span>02</span>
                    <ArrowRight className="w-3 h-3" />
                    <span>Brand &amp; Enterprise</span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-slate-900 tracking-tight leading-[1.15]">
                    Tell us about your enterprise
                  </h1>
                </div>

                <div className="space-y-3 pt-3.5 sm:pt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Enterprise Name *</label>
                      <input
                        ref={inputRef}
                        type="text"
                        value={formData.businessName}
                        onChange={(e) => {
                          setFormData({ ...formData, businessName: e.target.value });
                          if (fieldErrors.businessName) setFieldErrors({ ...fieldErrors, businessName: "" });
                        }}
                        placeholder="e.g. Apex Digital Solutions"
                        className={cn(
                          "w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border text-xs sm:text-sm font-black text-slate-900 focus:bg-white focus:ring-2 outline-none transition-all",
                          fieldErrors.businessName
                            ? "border-red-400 focus:ring-red-400/20 focus:border-red-500 bg-red-50/20"
                            : "border-slate-200 focus:ring-[#D41367]/20 focus:border-[#D41367]"
                        )}
                      />
                      {fieldErrors.businessName && (
                        <p className="text-[11px] font-bold text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {fieldErrors.businessName}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Industry Sector *</label>
                      <CustomDropdown
                        label="Select Industry Sector"
                        value={formData.sector}
                        options={SECTOR_NAMES}
                        onChange={(val) => setFormData({ ...formData, sector: val })}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Headline Tagline</label>
                    <input
                      type="text"
                      value={formData.tagline}
                      onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                      placeholder="e.g. Enterprise Cloud Architecture & AI Automation"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-[#D41367]/20 focus:border-[#D41367] outline-none transition-all"
                    />
                  </div>

                  {/* 2 LOGO UPLOADERS: BRAND LOGO + COVER EMBLEM */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-0.5">

                    {/* 1. Company Brand Logo */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                        <span>1. Company Brand Logo</span>
                        <span className="text-[10px] text-slate-400 font-normal">Square / 1:1</span>
                      </label>
                      <input
                        ref={logoInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="hidden"
                      />
                      <div
                        onClick={() => logoInputRef.current?.click()}
                        className="flex items-center gap-3 p-2.5 rounded-xl border border-dashed border-slate-300 hover:border-[#D41367] bg-slate-50 hover:bg-white transition-all cursor-pointer group shadow-2xs"
                      >
                        {formData.logoUrl ? (
                          <img
                            src={formData.logoUrl}
                            alt="Logo preview"
                            className="w-9 h-9 rounded-lg object-cover border border-slate-200"
                          />
                        ) : (
                          <div className="w-9 h-9 rounded-lg bg-pink-50 text-[#D41367] flex items-center justify-center font-black text-xs shrink-0 group-hover:scale-105 transition-transform">
                            {formData.businessName ? formData.businessName.charAt(0).toUpperCase() : <Camera className="w-4 h-4" />}
                          </div>
                        )}
                        <div className="truncate">
                          <p className="text-xs font-bold text-slate-900 truncate">
                            {formData.logoUrl ? "Logo Selected ✓" : "Upload Brand Logo"}
                          </p>
                          <p className="text-[10px] text-slate-400 truncate">PNG, JPG or monogram</p>
                        </div>
                      </div>
                    </div>

                    {/* 2. Cover / Charter Emblem */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                        <span>2. Header Cover / Banner</span>
                        <span className="text-[10px] text-slate-400 font-normal">Landscape / 16:9</span>
                      </label>
                      <input
                        ref={bannerInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleBannerUpload}
                        className="hidden"
                      />
                      <div
                        onClick={() => bannerInputRef.current?.click()}
                        className="flex items-center gap-3 p-2.5 rounded-xl border border-dashed border-slate-300 hover:border-[#D41367] bg-slate-50 hover:bg-white transition-all cursor-pointer group shadow-2xs"
                      >
                        {formData.bannerUrl ? (
                          <img
                            src={formData.bannerUrl}
                            alt="Banner preview"
                            className="w-12 h-9 rounded-lg object-cover border border-slate-200"
                          />
                        ) : (
                          <div className="w-12 h-9 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center shrink-0 group-hover:text-[#D41367] group-hover:bg-pink-50 transition-colors">
                            <ImageIcon className="w-4 h-4" />
                          </div>
                        )}
                        <div className="truncate">
                          <p className="text-xs font-bold text-slate-900 truncate">
                            {formData.bannerUrl ? "Cover Selected ✓" : "Upload Cover Banner"}
                          </p>
                          <p className="text-[10px] text-slate-400 truncate">PNG, JPG banner</p>
                        </div>
                      </div>
                    </div>

                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Company Overview (Optional)</label>
                    <textarea
                      rows={2}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Briefly describe your products, corporate solutions, or capabilities..."
                      className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:bg-white focus:ring-2 focus:ring-[#D41367]/20 focus:border-[#D41367] outline-none resize-none leading-relaxed"
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <Button
                    onClick={handlePrev}
                    variant="outline"
                    className="rounded-full border-slate-200 text-slate-700 hover:bg-slate-50 px-5 py-2 text-xs font-bold flex items-center gap-1.5 cursor-pointer h-auto"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </Button>

                  <Button
                    onClick={handleNext}
                    disabled={!formData.businessName.trim()}
                    className="bg-[#D41367] hover:bg-[#B80E56] text-white rounded-full px-6 py-2 text-xs sm:text-sm font-extrabold shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-40 h-auto"
                  >
                    <span>Continue to Location</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                  <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-slate-400 font-medium pl-1">
                    press <strong className="font-extrabold text-slate-700 inline-flex items-center gap-0.5">Enter <CornerDownLeft className="w-3 h-3" /></strong>
                  </span>
                </div>
              </div>
            )}

            {/* CONVERSATION 3: WHERE CAN CLIENTS FIND YOU? */}
            {currentStep === 3 && (
              <div className="space-y-3.5">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 text-xs font-black text-[#D41367] uppercase tracking-wider">
                    <span>03</span>
                    <ArrowRight className="w-3 h-3" />
                    <span>Operations &amp; Location</span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-slate-900 tracking-tight leading-[1.15]">
                    Where can clients find you?
                  </h1>
                </div>

                <div className="space-y-3 pt-3.5 sm:pt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Primary Operating City *</label>
                      <div className="relative">
                        <input
                          ref={inputRef}
                          type="text"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          placeholder="e.g. Colombo / Mumbai"
                          className="w-full pl-3.5 pr-9 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-[#D41367]/20 focus:border-[#D41367] outline-none transition-all"
                        />
                        <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Country Jurisdiction *</label>
                      <input
                        type="text"
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        placeholder="e.g. Sri Lanka"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-[#D41367]/20 focus:border-[#D41367] outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Street / Registered Office Address</label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="e.g. Level 14, World Trade Centre, Colombo 01"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-[#D41367]/20 focus:border-[#D41367] outline-none transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Official Business Email</label>
                      <div className="relative">
                        <input
                          type="email"
                          value={formData.businessEmail}
                          onChange={(e) => setFormData({ ...formData, businessEmail: e.target.value })}
                          placeholder="contact@enterprise.com"
                          className="w-full pl-3.5 pr-9 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-[#D41367]/20 focus:border-[#D41367] outline-none transition-all"
                        />
                        <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Direct Inquiries Phone</label>
                      <div className="relative">
                        <input
                          type="tel"
                          value={formData.businessPhone}
                          onChange={(e) => setFormData({ ...formData, businessPhone: e.target.value })}
                          placeholder="+94 11 234 5678"
                          className="w-full pl-3.5 pr-9 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-[#D41367]/20 focus:border-[#D41367] outline-none transition-all"
                        />
                        <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <Button
                    onClick={handlePrev}
                    variant="outline"
                    className="rounded-full border-slate-200 text-slate-700 hover:bg-slate-50 px-5 py-2 text-xs font-bold flex items-center gap-1.5 cursor-pointer h-auto"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </Button>

                  <Button
                    onClick={handleNext}
                    disabled={!formData.city.trim()}
                    className="bg-[#D41367] hover:bg-[#B80E56] text-white rounded-full px-6 py-2 text-xs sm:text-sm font-extrabold shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-40 h-auto"
                  >
                    <span>Continue to Socials</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                  <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-slate-400 font-medium pl-1">
                    press <strong className="font-extrabold text-slate-700 inline-flex items-center gap-0.5">Enter <CornerDownLeft className="w-3 h-3" /></strong>
                  </span>
                </div>
              </div>
            )}

            {/* CONVERSATION 4: COMPLETE SOCIAL MEDIA PROFILES & SUBMIT */}
            {currentStep === 4 && (
              <div className="space-y-3.5">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 text-xs font-black text-[#D41367] uppercase tracking-wider">
                    <span>04</span>
                    <ArrowRight className="w-3 h-3" />
                    <span>Social Channels &amp; Submit</span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-slate-900 tracking-tight leading-[1.15]">
                    Connect all your social channels
                  </h1>
                </div>

                <div className="space-y-3 pt-3.5 sm:pt-4">
                  {/* Row 1: Website & LinkedIn */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Official Website URL</label>
                      <div className="relative">
                        <input
                          ref={inputRef}
                          type="url"
                          value={formData.website}
                          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                          placeholder="https://apexdigital.com"
                          className="w-full pl-3.5 pr-9 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-[#D41367]/20 focus:border-[#D41367] outline-none transition-all"
                        />
                        <Globe className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">LinkedIn Company / Profile</label>
                      <div className="relative">
                        <input
                          type="url"
                          value={formData.linkedin}
                          onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                          placeholder="https://linkedin.com/in/..."
                          className="w-full pl-3.5 pr-9 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-[#D41367]/20 focus:border-[#D41367] outline-none transition-all"
                        />
                        <Share2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      </div>
                    </div>
                  </div>

                  {/* Row 2: Instagram & WhatsApp */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Instagram Profile / Handle</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={formData.instagram}
                          onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                          placeholder="@apex.digital"
                          className="w-full pl-3.5 pr-9 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-[#D41367]/20 focus:border-[#D41367] outline-none transition-all"
                        />
                        <Link2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">WhatsApp Business Number</label>
                      <div className="relative">
                        <input
                          type="tel"
                          value={formData.whatsapp}
                          onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                          placeholder="+94 77 123 4567"
                          className="w-full pl-3.5 pr-9 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-[#D41367]/20 focus:border-[#D41367] outline-none transition-all"
                        />
                        <MessageSquare className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      </div>
                    </div>
                  </div>

                  {/* Row 3: Facebook & X (Twitter) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Facebook Page URL</label>
                      <div className="relative">
                        <input
                          type="url"
                          value={formData.facebook}
                          onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                          placeholder="https://facebook.com/..."
                          className="w-full pl-3.5 pr-9 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-[#D41367]/20 focus:border-[#D41367] outline-none transition-all"
                        />
                        <Globe className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">X (Twitter) Profile</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={formData.twitter}
                          onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                          placeholder="@apex_digital"
                          className="w-full pl-3.5 pr-9 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-[#D41367]/20 focus:border-[#D41367] outline-none transition-all"
                        />
                        <Link2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      </div>
                    </div>
                  </div>

                  {/* Terms Declaration */}
                  <label
                    onClick={() => setFormData((prev) => ({ ...prev, agreeTerms: !prev.agreeTerms }))}
                    className="flex items-start gap-2.5 pt-1 cursor-pointer group select-none"
                  >
                    <div
                      className={cn(
                        "w-4 h-4 rounded-md border mt-[2px] flex items-center justify-center transition-all shrink-0",
                        formData.agreeTerms
                          ? "bg-[#D41367] border-[#D41367] text-white shadow-xs"
                          : "bg-slate-50 border-slate-300 group-hover:border-[#D41367] group-hover:bg-white"
                      )}
                    >
                      {formData.agreeTerms && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span className="text-xs text-slate-600 font-medium leading-snug group-hover:text-slate-900 transition-colors">
                      I declare that I am an active Rotary or Rotaract member, and authorize RSAMDIO District administrators to verify and list my business credentials in the directory.
                    </span>
                  </label>
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <Button
                    onClick={handlePrev}
                    variant="outline"
                    className="rounded-full border-slate-200 text-slate-700 hover:bg-slate-50 px-5 py-2 text-xs font-bold flex items-center gap-1.5 cursor-pointer h-auto"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </Button>

                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting || !formData.agreeTerms}
                    className="bg-[#D41367] hover:bg-[#B80E56] text-white rounded-full px-8 py-2.5 text-xs sm:text-sm font-extrabold shadow-lg shadow-pink-500/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer disabled:opacity-40 h-auto"
                  >
                    <span>{isSubmitting ? "Submitting..." : "Submit"}</span>
                  </Button>
                  <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-slate-400 font-medium pl-1">
                    press <strong className="font-extrabold text-slate-700 inline-flex items-center gap-0.5">Enter <CornerDownLeft className="w-3 h-3" /></strong>
                  </span>
                </div>
              </div>
            )}

          </div>
        ) : (
          /* ================= SUCCESS CELEBRATION SCREEN ================= */
          <div className="text-center space-y-4 max-w-lg mx-auto py-6 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-md">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>

            <div className="space-y-1.5">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Enterprise Published!
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                <strong className="text-slate-900">{formData.businessName || "Your business"}</strong> has been submitted to the RSAMDIO Directory and assigned for verification.
              </p>
            </div>

            <div className="pt-2">
              <Button
                asChild
                className="bg-[#D41367] hover:bg-[#B80E56] text-white rounded-full px-8 py-2.5 text-xs font-extrabold shadow-md hover:scale-105 transition-all"
              >
                <Link href="/directory">
                  <span>Explore in Directory</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Link>
              </Button>
            </div>
          </div>
        )}

      </main>

      {/* ================= BOTTOM NAVIGATION DOCK ================= */}
      <footer className="shrink-0 bg-white/90 backdrop-blur-md border-t border-slate-100 py-2.5 px-4 sm:px-6 lg:px-10 flex items-center justify-between z-40">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
          <span>Part {currentStep} of {TOTAL_STEPS}</span>
        </div>

        {/* Up / Down Chevrons */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={handlePrev}
            disabled={currentStep === 1}
            className="w-8 h-8 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors cursor-pointer"
            title="Previous step"
          >
            <ChevronUp className="w-4 h-4 text-slate-700" />
          </button>
          <button
            onClick={handleNext}
            disabled={currentStep === TOTAL_STEPS}
            className="w-8 h-8 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors cursor-pointer"
            title="Next step"
          >
            <ChevronDown className="w-4 h-4 text-slate-700" />
          </button>
        </div>
      </footer>

    </div>
  );
}
