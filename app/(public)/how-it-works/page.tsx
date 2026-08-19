"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  FileText,
  HelpCircle,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { VerificationBadge } from "@/components/verification-badge";

const steps = [
  {
    num: "01",
    title: "Register & Create Profile",
    subtitle: "Quick 3-Minute Setup",
    desc: "Sign up with your Rotaract ID, home club details, business services, and location information.",
    details: ["Rotaract Club Name & District ID", "Business Category & Tagline", "Direct Contact Methods"],
  },
  {
    num: "02",
    title: "District Moderator Review",
    subtitle: "Trusted Peer Vetting",
    desc: "Upload statutory documents (GST/Udyam or Club President Endorsement) for your assigned District Representative to review.",
    details: ["Club Active Standing Check", "Statutory Document Audit", "District Representative Review"],
  },
  {
    num: "03",
    title: "Get Badge & Go Live",
    subtitle: "Global B2B Visibility",
    desc: "Once verified, your trust badge goes live on the directory, opening direct B2B inquiries across 45+ global districts.",
    details: ["Verified Badge Activation", "Top Search Ranking", "Direct Buyer Inquiries"],
  },
];

const tiers = [
  {
    level: 1,
    name: "Bronze Tier",
    badgeLabel: "BRONZE TIER",
    req: "Active Rotaract Club Membership",
    features: [
      "Directory Search Listing",
      "Club Standing Verification Badge",
      "Public Contact Details",
      "Standard Search Placement",
    ],
  },
  {
    level: 2,
    name: "Silver Tier",
    badgeLabel: "SILVER TIER",
    req: "GST / Udyam / Business Registration",
    features: [
      "Everything in Bronze Tier",
      "Verified Business Entity Badge",
      "Priority Category Placement",
      "Direct Inquiry Form Routing",
      "Social Media Link Integration",
    ],
  },
  {
    level: 3,
    name: "Gold Tier",
    badgeLabel: "GOLD TIER",
    req: "Full Audit + DRR Endorsement",
    popular: true,
    features: [
      "Everything in Silver Tier",
      "Official Gold Shield Verification",
      "Featured Homepage Showcase",
      "District Spotlight Banner Placement",
      "DRR Certified Entity Standing",
    ],
  },
];

const faqs = [
  {
    q: "How long does the verification process take?",
    a: "Initial review by your District Moderator typically takes 24 to 48 hours. Once your documents or club standing are confirmed, your profile and verified badge go live immediately.",
  },
  {
    q: "What documents are required for Silver and Gold verification?",
    a: "Silver verification requires official business registration (such as GST, Udyam, or Certificate of Incorporation). Gold verification requires Silver documents plus an active DRR or Club President endorsement letter.",
  },
  {
    q: "Who conducts the verification?",
    a: "Verification is conducted by designated District Representatives and District Chairpersons assigned to your specific Rotaract District (e.g. District 3220).",
  },
  {
    q: "Is there any cost to get listed on the Rotaract Business Network?",
    a: "Basic directory registration and Bronze verification are 100% free for active Rotaractors and Rotary Alumni.",
  },
  {
    q: "Can Rotaract Alumni list their enterprises?",
    a: "Yes! Alumni members in good standing can list their businesses and receive verified alumni badges by indicating their former club and year of service.",
  },
];

export default function HowItWorksPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <div className="min-h-screen bg-white text-foreground pt-6 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Seamless Header */}
        <div className="space-y-4 pb-6 border-b border-border/60">
          <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground mb-2">
            <Link href="/" className="hover:text-[#D41367] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#D41367] font-bold">How Verification Works</span>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight flex items-center gap-2">
              How <span className="text-[#D41367]">Verification</span> Works
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground font-medium mt-1">
              Our multi-tier verification process ensures high-integrity professional networking
            </p>
          </div>
        </div>

        {/* Seamless 3-Step Journey (No Outer Box) */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <span className="text-xs font-extrabold text-[#D41367] uppercase tracking-wider">
              THREE SIMPLE STEPS
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-foreground tracking-tight">
              Path to Verified Standing
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 items-stretch">
            {steps.map((step) => (
              <div
                key={step.num}
                className="bg-white rounded-3xl p-7 border border-pink-100/90 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-black text-[#D41367] font-mono tracking-tight group-hover:scale-110 transition-transform">
                      {step.num}
                    </span>
                    <span className="text-[10px] font-extrabold text-[#D41367] bg-[#FFEBEF] px-3 py-1 rounded-full">
                      {step.subtitle}
                    </span>
                  </div>

                  <h3 className="text-lg font-extrabold text-foreground mb-2 leading-tight">
                    {step.title}
                  </h3>

                  <p className="text-xs text-muted-foreground leading-relaxed mb-6 font-medium">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-border/60 space-y-2 text-xs font-semibold text-foreground">
                  {step.details.map((detail) => (
                    <div key={detail} className="flex items-center gap-2 text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D41367] shrink-0" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Verification Tiers Comparative Grid */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <span className="text-xs font-extrabold text-[#D41367] uppercase tracking-wider">
              VERIFICATION STANDING
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-foreground tracking-tight">
              Directory Verification Tiers
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground font-medium">
              Choose the standing tier that fits your business stage and statutory credentials.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 items-stretch">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-3xl border p-7 flex flex-col justify-between relative bg-white ${tier.popular ? "border-[#F7A81B] shadow-lg ring-2 ring-[#F7A81B]/30" : "border-border/80 shadow-xs"
                  }`}
              >
                {tier.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#F7A81B] text-slate-950 font-black text-[10px] uppercase tracking-wider px-3.5 py-1 rounded-full shadow-xs">
                    MOST POPULAR
                  </span>
                )}

                <div className="space-y-6">
                  {/* Tier Header */}
                  <div className="space-y-2 pb-4 border-b border-border/60">
                    <VerificationBadge level={tier.level} size="lg" />
                    <h3 className="text-xl font-black text-foreground pt-1">{tier.name}</h3>
                    <p className="text-xs text-muted-foreground font-semibold flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-[#D41367]" />
                      <span>{tier.req}</span>
                    </p>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-3">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground">
                      Included Directory Benefits:
                    </span>
                    <ul className="space-y-2.5 text-xs font-medium text-foreground">
                      {tier.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Seamless FAQ List (No Outer Box) */}
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-1">
            <span className="text-xs font-extrabold text-[#D41367] uppercase tracking-wider flex items-center justify-center gap-1">
              <HelpCircle className="w-4 h-4" /> FAQ
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={faq.q} className="bg-white rounded-2xl border border-pink-100/90 p-5 shadow-xs transition-all">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="flex items-center justify-between w-full text-left font-extrabold text-sm text-foreground hover:text-[#D41367] transition-colors gap-4"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#D41367] shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                        }`}
                    />
                  </button>
                  {isOpen && (
                    <p className="text-xs text-muted-foreground leading-relaxed pt-3 font-medium border-t border-border/40 mt-3">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA Actions */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <Button
            className="bg-[#D41367] hover:bg-[#B80E56] text-white rounded-2xl px-8 py-3.5 text-xs sm:text-sm font-extrabold shadow-md h-auto gap-2"
            asChild
          >
            <Link href="/register">
              <span>Start Free Registration</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
          <Button
            variant="outline"
            className="rounded-2xl px-7 py-3.5 text-xs sm:text-sm font-extrabold border-border bg-white text-foreground hover:bg-pink-50 hover:text-[#D41367] h-auto"
            asChild
          >
            <Link href="/directory">Browse Directory</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
