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
  Camera,
  ImageIcon,
  MessageSquare,
  Plus,
  Trash2,
  Share2,
  AtSign,
  Send,
  ChevronDown,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageUploader } from "@/components/image-uploader";

const steps = [
  { id: 1, label: "Account" },
  { id: 2, label: "Business Info" },
  { id: 3, label: "Locations & Contact" },
  { id: 4, label: "Social Media Links" },
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
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
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
    category: "Select Industry Sector...",
    tagline: "",
    description: "",
    website: "",
    address: "",
    city: "",
    country: "",
    businessEmail: "",
    businessPhone: "",
    pincode: "",
    primaryLocation: "",
    additionalLocations: [] as string[],
    socialLinks: {
      linkedin: "",
      instagram: "",
      facebook: "",
      twitter: "",
      whatsapp: "",
    },
    logoUrl: "",
    coverUrl: "",
    gstNumber: "",
    statutoryNo: "",
    agreeTerms: false,
  });

  const [newLocationInput, setNewLocationInput] = useState("");

  const handleAddLocation = () => {
    if (newLocationInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        additionalLocations: [...prev.additionalLocations, newLocationInput.trim()],
      }));
      setNewLocationInput("");
    }
  };

  const handleRemoveLocation = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      additionalLocations: prev.additionalLocations.filter((_, i) => i !== index),
    }));
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
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
    <div className="h-screen w-screen overflow-hidden bg-[#FAF6F4] flex flex-col justify-between font-sans relative">
      {/* Header Bar */}
      <header className="relative z-10 bg-white/90 backdrop-blur-xl border-b border-pink-100 py-3.5 px-6 sm:px-12 flex items-center justify-between shrink-0 shadow-xs">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-9 h-9 rounded-xl bg-[#D41367] text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-lg sm:text-xl font-black tracking-tight text-foreground flex items-center gap-1 whitespace-nowrap">
              Rotaract <span className="text-[#D41367]">Network</span>
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-3 text-xs font-bold">
          <Button
            variant="ghost"
            size="sm"
            className="rounded-full text-xs font-bold text-muted-foreground hover:text-[#D41367] hover:bg-pink-50 gap-1.5 px-4"
            asChild
          >
            <Link href="/">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
          </Button>

          <div className="w-px h-5 bg-pink-200/80" />

          <span className="text-muted-foreground hidden sm:inline font-semibold">Already registered?</span>
          <Button variant="outline" className="rounded-full border-pink-200 hover:border-[#D41367] hover:bg-pink-50 text-[#D41367] text-xs h-9 px-5 bg-white font-black shadow-2xs" asChild>
            <Link href="/auth/login">Login</Link>
          </Button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 flex flex-col justify-start pt-2 pb-6 max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 min-h-0">
        {/* Step Tab Navigation Bar */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl p-1.5 shadow-sm border border-pink-100 max-w-4xl mx-auto mb-3 w-full shrink-0">
          <div className="grid grid-cols-4 gap-1.5">
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
                        : "bg-pink-100/70 text-[#D41367]"
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
        <div className="grid lg:grid-cols-12 gap-6 items-stretch flex-1 min-h-0 pb-1">
          {/* Left Column: Dynamic High-End Feature & Progress Hero Panel */}
          <div className="lg:col-span-4 rounded-3xl overflow-hidden relative shadow-xl flex flex-col justify-between p-6 sm:p-7 text-white bg-gradient-to-br from-[#1E0510] via-[#420A25] to-[#910A47] border border-pink-500/20">
            {/* Low Opacity Background Photo Overlay */}
            <Image
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=85"
              alt="Rotaract Business Leaders"
              fill
              className="object-cover object-center opacity-20 pointer-events-none mix-blend-overlay"
              priority
              unoptimized
            />

            {/* Ambient Lighting Orbs */}
            <div className="absolute -top-12 -left-12 w-48 h-48 bg-[#D41367]/30 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />

            {/* Top Brand Badge */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md">
                <span className="text-[11px] font-extrabold text-white tracking-wide uppercase">Rotaract Network</span>
              </div>
              <div className="text-[11px] font-bold text-pink-200/90 bg-pink-950/60 px-2.5 py-1 rounded-full border border-pink-500/30">
                Step {currentStep} of 4
              </div>
            </div>

            {/* Middle Step-Specific Dynamic Content Showcase */}
            <div className="relative z-10 my-auto py-4 space-y-6">
              {currentStep === 1 && (
                <div className="space-y-3 animate-fade-in">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center text-pink-300 shadow-inner">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
                      Member & Club Credentials
                    </h2>
                    <p className="text-xs text-pink-100/80 mt-1.5 leading-relaxed font-medium">
                      Authenticate your active Rotaract club membership and establish your network identity.
                    </p>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-3 animate-fade-in">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center text-pink-300 shadow-inner">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
                      Business & Brand Showcase
                    </h2>
                    <p className="text-xs text-pink-100/80 mt-1.5 leading-relaxed font-medium">
                      Display your official logo, brand banner, and industry sector to Rotaract buyers worldwide.
                    </p>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-3 animate-fade-in">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center text-pink-300 shadow-inner">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
                      Operating Network & Contact
                    </h2>
                    <p className="text-xs text-pink-100/80 mt-1.5 leading-relaxed font-medium">
                      Define primary and branch operations to connect with buyers across all districts.
                    </p>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-3 animate-fade-in">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center text-pink-300 shadow-inner">
                    <Share2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
                      Social Profiles & Publishing
                    </h2>
                    <p className="text-xs text-pink-100/80 mt-1.5 leading-relaxed font-medium">
                      Link LinkedIn, Instagram, and WhatsApp Business to receive direct B2B buyer leads.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Progress Stats Widget */}
            <div className="relative z-10 bg-white/10 border border-white/20 rounded-2xl p-3.5 backdrop-blur-md space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-extrabold text-white">Profile Readiness</span>
                <span className="font-black text-pink-300">{currentStep * 25}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-black/30 overflow-hidden p-0.5 border border-white/10">
                <div
                  className="h-full bg-gradient-to-r from-pink-400 to-emerald-400 rounded-full transition-all duration-500"
                  style={{ width: `${currentStep * 25}%` }}
                />
              </div>
            </div>
          </div>

          {/* Right Column: Clean Form Panel Standardized Typography */}
          <div className="lg:col-span-8 bg-white border border-pink-100 rounded-3xl p-5 sm:p-6 flex flex-col justify-between overflow-hidden shadow-sm h-full">
            {/* Step 1: Your Profile Form */}
            {currentStep === 1 && (
              <div className="flex-1 min-h-0 flex flex-col justify-start gap-4 sm:gap-5 animate-fade-in">
                <div className="shrink-0 pb-1">
                  <h3 className="text-lg sm:text-xl font-black text-foreground tracking-tight">Step 1: Your Member Profile</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 font-medium">
                    Enter your credentials and home club details.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 sm:gap-5 pt-1 overflow-y-auto pr-1">
                  {/* First Name */}
                  <div className="relative border-b-2 border-border/80 focus-within:border-[#D41367] pb-1 transition-colors">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-foreground">
                        First Name
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
                      <label className="text-xs font-bold text-foreground">
                        Last Name
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
                      <label className="text-xs font-bold text-foreground">
                        Email Address
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
                      <label className="text-xs font-bold text-foreground flex items-center">
                        Phone Number <span className="ml-2 px-2 py-0.5 rounded-md bg-pink-100/80 border border-pink-200 text-[#D41367] text-[10px] font-bold">Optional</span>
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
                      <label className="text-xs font-bold text-foreground">
                        Rotary / Rotaract Member ID
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
                      <label className="text-xs font-bold text-foreground">
                        Rotaract Home Club
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
                      <label className="text-xs font-bold text-foreground">
                        Account Password
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

            {/* Step 2: Business & Branding */}
            {currentStep === 2 && (
              <div className="flex-1 min-h-0 flex flex-col justify-start gap-4 sm:gap-5 animate-fade-in">
                <div className="shrink-0 pb-1">
                  <h3 className="text-lg sm:text-xl font-black text-foreground tracking-tight">Step 2: Business & Branding</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 font-medium">
                    Provide basic business identity details and brand images.
                  </p>
                </div>

                <div className="flex-1 min-h-0 overflow-y-auto pr-1 space-y-4 pt-1">
                  <div className="grid sm:grid-cols-2 gap-6">
                    {/* Business Name */}
                    <div className="relative border-b-2 border-border/80 focus-within:border-[#D41367] pb-1 transition-colors">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-foreground">
                          Business / Company Name
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

                    {/* Website URL */}
                    <div className="relative border-b-2 border-border/80 focus-within:border-[#D41367] pb-1 transition-colors">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-foreground flex items-center">
                          Website URL <span className="ml-2 px-2 py-0.5 rounded-md bg-pink-100/80 border border-pink-200 text-[#D41367] text-[10px] font-bold">Optional</span>
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

                  {/* Custom Industry Sector Dropdown */}
                  <div className="relative border-b-2 border-border/80 focus-within:border-[#D41367] pb-1 transition-colors">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-foreground">
                        Industry Sector / Category
                      </label>
                      <Briefcase className="w-4 h-4 text-[#D41367]" />
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                      className="w-full flex items-center justify-between text-left text-sm font-medium text-foreground mt-2.5 pb-1 cursor-pointer outline-none"
                    >
                      <span className="truncate">{formData.category}</span>
                      <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${isCategoryOpen ? "rotate-180 text-[#D41367]" : ""}`} />
                    </button>

                    {/* Custom Popover Menu */}
                    {isCategoryOpen && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-pink-100 p-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150 max-h-60 overflow-y-auto space-y-1">
                        {sectorOptions.map((sec) => {
                          const isSelected = formData.category === sec.id;
                          const Icon = sec.icon;

                          return (
                            <button
                              type="button"
                              key={sec.id}
                              onClick={() => {
                                handleInputChange("category", sec.id);
                                setIsCategoryOpen(false);
                              }}
                              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between transition-colors ${
                                isSelected
                                  ? "bg-pink-50 text-[#D41367] font-bold"
                                  : "text-foreground hover:bg-pink-50/60 hover:text-[#D41367]"
                              }`}
                            >
                              <span className="flex items-center gap-2 truncate">
                                <Icon className="w-3.5 h-3.5 text-[#D41367] shrink-0" />
                                <span>{sec.label}</span>
                              </span>
                              {isSelected && <Check className="w-3.5 h-3.5 text-[#D41367] shrink-0" />}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Business Logo & Cover Photo Upload */}
                  <div className="bg-pink-50/50 border border-pink-100 rounded-2xl p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-extrabold text-foreground flex items-center gap-1.5">
                        <Camera className="w-4 h-4 text-[#D41367]" /> Business Logo & Cover Banner
                        <span className="ml-2 px-2 py-0.5 rounded-md bg-pink-100 border border-pink-200 text-[#D41367] text-[10px] font-bold">Optional</span>
                      </label>
                      <span className="text-[11px] text-muted-foreground">Select local image files</span>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <ImageUploader
                        label="Upload Business Logo"
                        value={formData.logoUrl}
                        onChange={(url) => handleInputChange("logoUrl", url)}
                        heightClass="h-24"
                      />

                      <ImageUploader
                        label="Upload Cover Banner Photo"
                        value={formData.coverUrl}
                        onChange={(url) => handleInputChange("coverUrl", url)}
                        heightClass="h-24"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Location & Contact */}
            {currentStep === 3 && (
              <div className="flex-1 min-h-0 flex flex-col justify-start gap-4 sm:gap-5 animate-fade-in">
                <div className="shrink-0 pb-1">
                  <h3 className="text-lg sm:text-xl font-black text-foreground tracking-tight">Step 3: Locations & Contact</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 font-medium">
                    Specify operating places, registered address, and official business contact.
                  </p>
                </div>

                <div className="flex-1 min-h-0 overflow-y-auto pr-1 space-y-5 pt-1">
                  {/* Business Phone & Business Email */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="relative border-b-2 border-border/80 focus-within:border-[#D41367] pb-1 transition-colors">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-foreground">
                          Business Phone Number
                        </label>
                        <Phone className="w-4 h-4 text-[#D41367]" />
                      </div>
                      <input
                        type="text"
                        placeholder="+94 11 234 5678"
                        value={formData.businessPhone}
                        onChange={(e) => handleInputChange("businessPhone", e.target.value)}
                        className="w-full bg-transparent text-sm font-medium outline-none text-foreground mt-2.5 pb-1 placeholder:text-muted-foreground/50"
                      />
                    </div>

                    <div className="relative border-b-2 border-border/80 focus-within:border-[#D41367] pb-1 transition-colors">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-foreground">
                          Official Business Email
                        </label>
                        <Mail className="w-4 h-4 text-[#D41367]" />
                      </div>
                      <input
                        type="email"
                        placeholder="contact@company.com"
                        value={formData.businessEmail}
                        onChange={(e) => handleInputChange("businessEmail", e.target.value)}
                        className="w-full bg-transparent text-sm font-medium outline-none text-foreground mt-2.5 pb-1 placeholder:text-muted-foreground/50"
                      />
                    </div>
                  </div>

                  {/* Physical Address & Pincode */}
                  <div className="grid sm:grid-cols-3 gap-6">
                    <div className="sm:col-span-2 relative border-b-2 border-border/80 focus-within:border-[#D41367] pb-1 transition-colors">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-foreground">
                          Full Registered Business Address
                        </label>
                        <MapPin className="w-4 h-4 text-[#D41367]" />
                      </div>
                      <input
                        type="text"
                        placeholder="123 Galle Road, Colombo 03"
                        value={formData.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        className="w-full bg-transparent text-sm font-medium outline-none text-foreground mt-2.5 pb-1 placeholder:text-muted-foreground/50"
                      />
                    </div>

                    <div className="relative border-b-2 border-border/80 focus-within:border-[#D41367] pb-1 transition-colors">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-foreground">
                          Pincode / Postal Zip
                        </label>
                      </div>
                      <input
                        type="text"
                        placeholder="00300"
                        value={formData.pincode}
                        onChange={(e) => handleInputChange("pincode", e.target.value)}
                        className="w-full bg-transparent text-sm font-medium outline-none text-foreground mt-2.5 pb-1 placeholder:text-muted-foreground/50"
                      />
                    </div>
                  </div>

                  {/* Primary & Additional Places of Operation */}
                  <div className="bg-white border border-pink-100 rounded-2xl p-4 space-y-4 shadow-xs">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-extrabold text-foreground flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 text-[#D41367]" /> Primary Place of Operations
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Colombo (District 3220)"
                          value={formData.primaryLocation}
                          onChange={(e) => handleInputChange("primaryLocation", e.target.value)}
                          className="w-full text-xs p-2.5 bg-pink-50/40 rounded-xl border border-pink-100 outline-none focus:border-[#D41367]"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-extrabold text-foreground flex items-center justify-between">
                          <span className="flex items-center gap-1.5">
                            <Building2 className="w-4 h-4 text-[#D41367]" /> Additional Places of Operation
                          </span>
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="e.g. Kandy Branch"
                            value={newLocationInput}
                            onChange={(e) => setNewLocationInput(e.target.value)}
                            className="flex-1 text-xs p-2.5 bg-pink-50/40 rounded-xl border border-pink-100 outline-none focus:border-[#D41367]"
                          />
                          <Button
                            type="button"
                            onClick={handleAddLocation}
                            className="bg-[#D41367] hover:bg-[#B80E56] text-white rounded-xl text-xs font-bold gap-1 px-4 h-9"
                          >
                            <Plus className="w-3.5 h-3.5" /> Add
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {formData.additionalLocations.map((loc, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-pink-100/70 border border-pink-200 text-[#D41367] text-xs font-bold shadow-xs"
                        >
                          <MapPin className="w-3.5 h-3.5" />
                          {loc}
                          <button
                            type="button"
                            onClick={() => handleRemoveLocation(idx)}
                            className="hover:text-red-700 ml-1 text-pink-400"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Social Media Links */}
            {currentStep === 4 && (
              <div className="flex-1 min-h-0 flex flex-col justify-start gap-4 sm:gap-5 animate-fade-in">
                <div className="shrink-0 pb-1">
                  <h3 className="text-lg sm:text-xl font-black text-foreground tracking-tight">Step 4: Social Media Links</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 font-medium">
                    Connect your official social channels and messaging handles for buyers.
                  </p>
                </div>

                <div className="flex-1 min-h-0 overflow-y-auto pr-1 space-y-5 pt-1">
                  <div className="grid sm:grid-cols-2 gap-6">
                    {/* LinkedIn */}
                    <div className="relative border-b-2 border-border/80 focus-within:border-[#D41367] pb-1 transition-colors">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-foreground">
                          LinkedIn Profile URL
                        </label>
                        <Globe className="w-4 h-4 text-[#D41367]" />
                      </div>
                      <input
                        type="text"
                        placeholder="https://linkedin.com/in/yourcompany"
                        value={formData.socialLinks.linkedin}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            socialLinks: { ...formData.socialLinks, linkedin: e.target.value },
                          })
                        }
                        className="w-full bg-transparent text-sm font-medium outline-none text-foreground mt-2.5 pb-1 placeholder:text-muted-foreground/50"
                      />
                    </div>

                    {/* Instagram */}
                    <div className="relative border-b-2 border-border/80 focus-within:border-[#D41367] pb-1 transition-colors">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-foreground">
                          Instagram Handle / URL
                        </label>
                        <AtSign className="w-4 h-4 text-[#D41367]" />
                      </div>
                      <input
                        type="text"
                        placeholder="https://instagram.com/yourhandle"
                        value={formData.socialLinks.instagram}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            socialLinks: { ...formData.socialLinks, instagram: e.target.value },
                          })
                        }
                        className="w-full bg-transparent text-sm font-medium outline-none text-foreground mt-2.5 pb-1 placeholder:text-muted-foreground/50"
                      />
                    </div>

                    {/* Facebook */}
                    <div className="relative border-b-2 border-border/80 focus-within:border-[#D41367] pb-1 transition-colors">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-foreground">
                          Facebook Page URL
                        </label>
                        <Send className="w-4 h-4 text-[#D41367]" />
                      </div>
                      <input
                        type="text"
                        placeholder="https://facebook.com/yourpage"
                        value={formData.socialLinks.facebook}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            socialLinks: { ...formData.socialLinks, facebook: e.target.value },
                          })
                        }
                        className="w-full bg-transparent text-sm font-medium outline-none text-foreground mt-2.5 pb-1 placeholder:text-muted-foreground/50"
                      />
                    </div>

                    {/* WhatsApp */}
                    <div className="relative border-b-2 border-border/80 focus-within:border-[#D41367] pb-1 transition-colors">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-foreground">
                          WhatsApp Business Number
                        </label>
                        <MessageSquare className="w-4 h-4 text-[#D41367]" />
                      </div>
                      <input
                        type="text"
                        placeholder="+94771234567"
                        value={formData.socialLinks.whatsapp}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            socialLinks: { ...formData.socialLinks, whatsapp: e.target.value },
                          })
                        }
                        className="w-full bg-transparent text-sm font-medium outline-none text-foreground mt-2.5 pb-1 placeholder:text-muted-foreground/50"
                      />
                    </div>
                  </div>

                  <div className="bg-pink-50/80 border border-pink-200 rounded-2xl p-4 flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-[#D41367] shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <h4 className="font-extrabold text-foreground">District Business Directory Standing</h4>
                      <p className="text-muted-foreground mt-0.5 leading-relaxed font-normal">
                        Your business profile will be instantly published and assigned to your Rotaract District Representative for directory badge verification.
                      </p>
                    </div>
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
                <span>{currentStep === 4 ? "Complete Business Registration" : "Next Step"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
