"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, Briefcase, ShieldCheck, Rocket, Lightbulb, Save, ArrowLeft, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const steps = [
  { id: 1, label: "Rotaractor ID & Account", icon: UserCheck },
  { id: 2, label: "Business Details", icon: Briefcase },
  { id: 3, label: "Location & Verification", icon: ShieldCheck },
  { id: 4, label: "Review & Launch", icon: Rocket },
];

export default function PublicRegistrationPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [toastVisible, setToastVisible] = useState(false);
  const router = useRouter();

  // Form State
  const [formData, setFormData] = useState({
    rotaryId: "",
    clubName: "",
    fullName: "",
    email: "",
    password: "",
    businessName: "",
    category: "Technology & Software",
    businessType: "B2B (Business to Business)",
    tagline: "",
    description: "",
    city: "Colombo",
    country: "Sri Lanka",
    phone: "",
    whatsapp: "",
    gstNumber: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push("/dashboard");
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF6F4] pb-20">
      {/* Registration Header Bar with Clear "Back to Home" Link */}
      <header className="bg-white/90 backdrop-blur-md border-b border-border sticky top-0 z-40 py-4 px-6 sm:px-12 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
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

          <Link href="/" className="flex items-center gap-2 text-lg font-extrabold text-[#D41367]">
            <span>Rotaract Network</span>
          </Link>
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold">
          <span className="text-muted-foreground hidden sm:inline">Already registered?</span>
          <Button variant="outline" className="rounded-full border-border hover:border-[#D41367] hover:text-[#D41367] text-xs h-9 px-4 bg-white" asChild>
            <Link href="/auth/login">Login with Rotaract Email</Link>
          </Button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Stepper Header Bar */}
        <div className="mb-10">
          <div className="flex items-center justify-between relative max-w-3xl mx-auto">
            <div className="absolute top-5 left-12 right-12 h-0.5 bg-border -z-0" />
            <div
              className="absolute top-5 left-12 h-0.5 bg-[#D41367] transition-all duration-300 -z-0"
              style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            />

            {steps.map((step) => {
              const isCompleted = currentStep > step.id;
              const isActive = currentStep === step.id;

              return (
                <div key={step.id} className="flex flex-col items-center z-10">
                  <div
                    className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                      isCompleted
                        ? "bg-[#D41367] text-white shadow-sm"
                        : isActive
                        ? "bg-[#D41367] text-white ring-4 ring-[#D41367]/20 shadow-md scale-110"
                        : "bg-white border-2 border-border text-muted-foreground"
                    }`}
                  >
                    {isCompleted ? <Check className="w-5 h-5" /> : <step.icon className="w-5 h-5" />}
                  </div>
                  <span
                    className={`text-xs font-bold mt-2 text-center max-w-[100px] ${
                      isActive ? "text-[#D41367]" : isCompleted ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Form Split Card Container */}
        <div className="bg-white rounded-[2.5rem] border border-border overflow-hidden shadow-xl grid md:grid-cols-12">
          {/* Left Context Panel */}
          <div className="md:col-span-5 bg-gradient-to-b from-pink-50 to-pink-100/50 p-6 sm:p-8 border-r border-border flex flex-col justify-between space-y-6">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#D41367] bg-white px-3 py-1 rounded-full border border-pink-200">
                Step {currentStep} of 4
              </span>
              <h2 className="text-2xl font-extrabold text-[#D41367] mt-3">
                {currentStep === 1 && "Rotaract Identity"}
                {currentStep === 2 && "Business Profile"}
                {currentStep === 3 && "Location & Tax Verification"}
                {currentStep === 4 && "Review & Launch"}
              </h2>
              <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                {currentStep === 1 && "Provide your official Rotaract ID number. This links your verified business profile directly with your Rotary membership."}
                {currentStep === 2 && "Tell the network about your venture. This information will appear on your public directory card."}
                {currentStep === 3 && "Provide office locations and optional GST/Udyam certificates for instant badge verification."}
                {currentStep === 4 && "Review your registration details before publishing your listing to 28,000+ global Rotaract leaders."}
              </p>

              {/* Tip Box */}
              <div className="bg-white rounded-2xl p-4 border border-pink-200 mt-6 flex items-start gap-3 shadow-sm">
                <Lightbulb className="w-5 h-5 text-[#D41367] shrink-0 mt-0.5" />
                <p className="text-xs text-foreground/80 leading-relaxed">
                  {currentStep === 1 && "Tip: Using your official Rotaract email allows instant password recovery."}
                  {currentStep === 2 && "Tip: Profiles with clear taglines receive up to 40% more enquiry messages."}
                  {currentStep === 3 && "Tip: Uploading your GST number instantly unlocks the Bronze Verification Badge."}
                  {currentStep === 4 && "Ready to launch! You can update documents anytime in your owner portal."}
                </p>
              </div>
            </div>

            {/* Live Profile Preview Card */}
            <div className="bg-white rounded-2xl p-4 border border-pink-200 space-y-2 shadow-sm">
              <p className="text-[10px] font-extrabold text-[#D41367] uppercase tracking-wider">LIVE PROFILE PREVIEW</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center text-[#D41367] font-bold text-sm shrink-0">
                  {formData.businessName ? formData.businessName.charAt(0) : "R"}
                </div>
                <div className="space-y-1 flex-1 min-w-0">
                  <p className="text-xs font-bold text-foreground truncate">
                    {formData.businessName || "Your Business Name"}
                  </p>
                  <p className="text-[10px] text-muted-foreground truncate">
                    {formData.category} · {formData.city || "Location"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Panel */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              {/* STEP 1: Rotaractor Identity & Credentials */}
              {currentStep === 1 && (
                <div className="space-y-4 animate-fade-in">
                  <div className="bg-[#FFEBEF] border border-[#F9C0CE] rounded-2xl p-4 space-y-3">
                    <div className="flex items-center gap-2 text-[#D41367] font-bold text-xs">
                      <UserCheck className="w-4 h-4" /> Rotaract / Rotary Identity Link
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label className="text-xs font-semibold">Rotary Member ID*</Label>
                        <Input
                          value={formData.rotaryId}
                          onChange={(e) => handleInputChange("rotaryId", e.target.value)}
                          placeholder="e.g. ROT-3220-8841"
                          className="h-10 text-xs bg-white border-border rounded-xl"
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs font-semibold">Home Club Name*</Label>
                        <Input
                          value={formData.clubName}
                          onChange={(e) => handleInputChange("clubName", e.target.value)}
                          placeholder="e.g. Rotaract Club of Downtown"
                          className="h-10 text-xs bg-white border-border rounded-xl"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold text-foreground">Full Name*</Label>
                    <Input
                      value={formData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      placeholder="Anand Vardhan"
                      className="h-11 text-sm bg-warm-bg/40 border-border rounded-xl"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold text-foreground">Work Email Address*</Label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="anand@company.com"
                      className="h-11 text-sm bg-warm-bg/40 border-border rounded-xl"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold text-foreground">Create Password*</Label>
                    <Input
                      type="password"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      placeholder="Min. 8 characters"
                      className="h-11 text-sm bg-warm-bg/40 border-border rounded-xl"
                      required
                    />
                  </div>
                </div>
              )}

              {/* STEP 2: Business Profile */}
              {currentStep === 2 && (
                <div className="space-y-4 animate-fade-in">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold text-foreground">Business / Entity Name*</Label>
                    <Input
                      value={formData.businessName}
                      onChange={(e) => handleInputChange("businessName", e.target.value)}
                      placeholder="e.g. Lumina Digital Solutions"
                      className="h-11 text-sm bg-warm-bg/40 border-border rounded-xl"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold text-foreground">Industry Category*</Label>
                      <select
                        value={formData.category}
                        onChange={(e) => handleInputChange("category", e.target.value)}
                        className="w-full h-11 px-3 text-xs bg-warm-bg/40 border border-border rounded-xl outline-none"
                      >
                        <option>Technology & Software</option>
                        <option>Professional Services</option>
                        <option>Manufacturing</option>
                        <option>Healthcare</option>
                        <option>Retail & E-commerce</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold text-foreground">Business Model*</Label>
                      <select
                        value={formData.businessType}
                        onChange={(e) => handleInputChange("businessType", e.target.value)}
                        className="w-full h-11 px-3 text-xs bg-warm-bg/40 border border-border rounded-xl outline-none"
                      >
                        <option>B2B (Business to Business)</option>
                        <option>B2C (Business to Consumer)</option>
                        <option>Manufacturer</option>
                        <option>Service Provider</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold text-foreground">One-Line Tagline</Label>
                    <Input
                      value={formData.tagline}
                      onChange={(e) => handleInputChange("tagline", e.target.value)}
                      placeholder="Innovating cloud software for global enterprises..."
                      className="h-11 text-sm bg-warm-bg/40 border-border rounded-xl"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold text-foreground">Full Description</Label>
                    <Textarea
                      rows={4}
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      placeholder="Describe your business operations, services, and commitment to Rotary ethics..."
                      className="text-xs bg-warm-bg/40 border-border rounded-xl resize-none"
                    />
                  </div>
                </div>
              )}

              {/* STEP 3: Location & Verification */}
              {currentStep === 3 && (
                <div className="space-y-4 animate-fade-in">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold text-foreground">Office City*</Label>
                      <Input
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        placeholder="Colombo"
                        className="h-11 text-sm bg-warm-bg/40 border-border rounded-xl"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold text-foreground">Country*</Label>
                      <Input
                        value={formData.country}
                        onChange={(e) => handleInputChange("country", e.target.value)}
                        placeholder="Sri Lanka"
                        className="h-11 text-sm bg-warm-bg/40 border-border rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold text-foreground">Phone Number</Label>
                      <Input
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="+94 77 123 4567"
                        className="h-11 text-sm bg-warm-bg/40 border-border rounded-xl"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold text-foreground">WhatsApp Number</Label>
                      <Input
                        value={formData.whatsapp}
                        onChange={(e) => handleInputChange("whatsapp", e.target.value)}
                        placeholder="+94 77 123 4567"
                        className="h-11 text-sm bg-warm-bg/40 border-border rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-2">
                    <Label className="text-xs font-bold text-foreground">GST / Tax Registration Number (Optional)</Label>
                    <Input
                      value={formData.gstNumber}
                      onChange={(e) => handleInputChange("gstNumber", e.target.value)}
                      placeholder="22AAAAA0000A1Z5"
                      className="h-11 text-sm bg-warm-bg/40 border-border rounded-xl font-mono"
                    />
                    <p className="text-[10px] text-muted-foreground">Adding GST automatically qualifies your business for Silver Verification.</p>
                  </div>
                </div>
              )}

              {/* STEP 4: Review & Launch */}
              {currentStep === 4 && (
                <div className="space-y-4 animate-fade-in">
                  <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-xs space-y-2">
                    <p className="font-extrabold text-emerald-800 flex items-center gap-1.5">
                      <Check className="w-4 h-4" /> Ready for Global Publication
                    </p>
                    <p className="text-emerald-700 leading-relaxed">
                      By clicking Launch Business Listing below, your Rotaract ID will be linked to this business and your portal account created instantly.
                    </p>
                  </div>

                  <div className="bg-warm-bg/60 rounded-2xl p-4 border border-border space-y-2 text-xs">
                    <p><strong>Owner:</strong> {formData.fullName || "Anand Vardhan"} ({formData.email || "anand@company.com"})</p>
                    <p><strong>Rotary ID:</strong> <span className="font-mono text-[#D41367]">{formData.rotaryId || "ROT-3220-8841"}</span></p>
                    <p><strong>Business:</strong> {formData.businessName || "Lumina Digital Solutions"}</p>
                    <p><strong>Location:</strong> {formData.city}, {formData.country}</p>
                  </div>
                </div>
              )}
            </div>

            {/* In-Card Control Buttons Bar */}
            <div className="pt-6 border-t border-border flex items-center justify-between gap-3">
              <button
                onClick={() => setToastVisible(true)}
                className="flex items-center gap-2 text-xs font-bold text-foreground/80 hover:text-[#D41367] transition-colors"
              >
                <Save className="w-4 h-4 text-[#D41367]" /> Save Draft
              </button>

              <div className="flex items-center gap-3">
                {currentStep > 1 && (
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    className="rounded-xl px-6 h-10 text-xs font-bold border-border bg-white"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back
                  </Button>
                )}
                <Button
                  onClick={handleNext}
                  className="bg-[#D41367] hover:bg-[#B80E56] text-white rounded-xl px-8 h-10 text-xs font-bold shadow-md gap-1"
                >
                  {currentStep === 4 ? "Launch Business Listing →" : "Next Step →"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
