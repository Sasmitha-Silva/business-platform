import Link from "next/link";
import type { Metadata } from "next";
import { ShieldCheck, CheckCircle2, ArrowRight, ChevronRight, Award, FileCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Verification Standards — Rotaract Business Network",
  description: "Learn about Gold, Silver, and Bronze verification tiers, required documents, and audit criteria.",
};

const tiers = [
  {
    tier: "DRR Verified",
    badge: "bg-[#D41367] text-white",
    border: "border-pink-300",
    title: "DRR Verified Badge",
    desc: "The highest official accreditation awarded to enterprises with valid statutory compliance and an active District Rotaract Representative endorsement.",
    docs: [
      "Official DRR Recommendation Letter",
      "GST / Business Registration Certificate",
      "Active Rotaract Club Standing",
    ],
  },
  {
    tier: "GST Verified",
    badge: "bg-blue-600 text-white",
    border: "border-blue-300",
    title: "GST Verified Badge",
    desc: "For commercially registered businesses and service providers verified through government Goods & Services Tax (GST) or Business Registration documentation.",
    docs: [
      "Government GST / BRN Certificate",
      "Active Rotaractor Membership Standing",
    ],
  },
  {
    tier: "Standard Listing",
    badge: "bg-slate-700 text-white",
    border: "border-slate-300",
    title: "Standard Rotaract Listing",
    desc: "Open to all verified Rotaractors to showcase their business, services, and contact details without statutory documents.",
    docs: [
      "Valid Rotaract Club & District Affiliation",
      "Member Identity Verification",
    ],
  },
];

export default function VerificationStandardsPage() {
  return (
    <div className="bg-background min-h-screen pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="pt-4 pb-6 border-b border-border mb-8">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            <Link href="/" className="hover:text-[#D41367] transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-medium">Verification Standards</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                Verification Tiers & Standards
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Every business badge on our platform is backed by official document verification.
              </p>
            </div>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#D41367] hover:bg-[#B80E56] text-white text-xs font-bold rounded-full transition-colors shadow-sm shrink-0 self-start sm:self-auto"
            >
              Get Verified Now
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Tier Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {tiers.map((t) => (
            <div
              key={t.tier}
              className={`bg-card rounded-2xl p-6 border ${t.border} shadow-sm flex flex-col justify-between space-y-4`}
            >
              <div className="space-y-3">
                <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full inline-block ${t.badge}`}>
                  {t.tier}
                </span>
                <h2 className="text-base font-bold text-foreground">{t.title}</h2>
                <p className="text-xs text-muted-foreground leading-relaxed">{t.desc}</p>
              </div>

              <div className="pt-3 border-t border-border space-y-2 text-xs">
                <p className="font-bold text-foreground">Required Documents:</p>
                <div className="space-y-1.5 text-muted-foreground">
                  {t.docs.map((doc) => (
                    <p key={doc} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D41367] shrink-0" />
                      <span>{doc}</span>
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
