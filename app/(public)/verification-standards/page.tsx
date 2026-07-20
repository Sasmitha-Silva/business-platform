import Link from "next/link";
import type { Metadata } from "next";
import { ShieldCheck, Award, FileCheck, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Verification Standards — Rotaract Business Network",
  description: "Learn about Gold, Silver, and Bronze verification tiers, required documents, and audit criteria.",
};

export default function VerificationStandardsPage() {
  return (
    <div className="bg-[#FAF6F4] min-h-screen pb-16 pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold text-[#D41367] uppercase tracking-wider">TRUST & COMPLIANCE</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mt-1">
            Verification Tiers & Standards
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            Every business badge on our platform is backed by official document verification conducted by District Moderators.
          </p>
        </div>

        {/* Tier Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Gold Tier */}
          <div className="bg-white rounded-3xl p-8 border-2 border-[#F7A81B] shadow-lg space-y-4 relative overflow-hidden">
            <span className="bg-[#F7A81B] text-white font-extrabold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full inline-block">
              GOLD CERTIFIED (TIER 3)
            </span>
            <h2 className="text-xl font-extrabold text-foreground">Highest Level Verification</h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              For established enterprises with full statutory compliance, GST verification, and official District Representative (DRR) endorsement.
            </p>

            <div className="space-y-2 pt-2 border-t border-border text-xs">
              <p className="font-bold text-foreground">Required Documents:</p>
              <div className="space-y-1.5 text-muted-foreground">
                <p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> GST / Government Tax Cert</p>
                <p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Official DRR Endorsement Letter</p>
                <p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> MSME / Udyam Certificate</p>
                <p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Rotary ID & Club Membership</p>
              </div>
            </div>
          </div>

          {/* Silver Tier */}
          <div className="bg-white rounded-3xl p-8 border border-slate-300 shadow-md space-y-4">
            <span className="bg-slate-700 text-white font-extrabold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full inline-block">
              SILVER CERTIFIED (TIER 2)
            </span>
            <h2 className="text-xl font-extrabold text-foreground">Business Standing</h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              For registered businesses and professionals verified via official business registration or GST documentation.
            </p>

            <div className="space-y-2 pt-2 border-t border-border text-xs">
              <p className="font-bold text-foreground">Required Documents:</p>
              <div className="space-y-1.5 text-muted-foreground">
                <p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> GST or MSME Certificate</p>
                <p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Rotary ID Number</p>
                <p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Active Club Standing</p>
              </div>
            </div>
          </div>

          {/* Bronze Tier */}
          <div className="bg-white rounded-3xl p-8 border border-amber-300 shadow-sm space-y-4">
            <span className="bg-amber-700 text-white font-extrabold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full inline-block">
              BRONZE CERTIFIED (TIER 1)
            </span>
            <h2 className="text-xl font-extrabold text-foreground">Member Entry Tier</h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              For early-stage Rotaract entrepreneurs verified through active Rotary ID and home club confirmation.
            </p>

            <div className="space-y-2 pt-2 border-t border-border text-xs">
              <p className="font-bold text-foreground">Required Documents:</p>
              <div className="space-y-1.5 text-muted-foreground">
                <p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Valid Rotary Member ID</p>
                <p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Home Club Confirmation</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#D41367] rounded-3xl p-8 sm:p-12 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2">
            <h3 className="text-2xl font-extrabold">Apply for Verification Today</h3>
            <p className="text-xs text-white/85 max-w-lg">
              Boost your profile credibility and get featured on our global directory spotlight.
            </p>
          </div>
          <Button className="bg-white text-[#D41367] hover:bg-white/90 font-extrabold rounded-full px-8 h-12 text-xs shadow-lg shrink-0" asChild>
            <Link href="/verification">Upload Verification Docs <ArrowRight className="w-4 h-4" /></Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
