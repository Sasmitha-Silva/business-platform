import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — Rotaract Business Network",
  description: "Terms and conditions governing membership and listing on Rotaract Business Network.",
};

export default function TermsPage() {
  return (
    <div className="bg-[#FAF6F4] min-h-screen pb-16 pt-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-[#D41367] uppercase tracking-wider">LEGAL & COMPLIANCE</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            Terms of Service
          </h1>
          <p className="text-xs text-muted-foreground">Last updated: July 2026</p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-border shadow-sm space-y-6 text-xs text-foreground/80 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-foreground">1. Eligibility & Verification Requirements</h2>
            <p>
              To qualify for a Gold, Silver, or Bronze verification badge, members must maintain good standing in an active Rotaract or Rotary club and submit accurate documentation.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-foreground">2. Code of Conduct</h2>
            <p>
              All members agree to uphold the Rotary Four-Way Test in all business transactions, communications, and customer service practices conducted through the platform.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-foreground">3. Revocation of Verification</h2>
            <p>
              Rotaract Business Network reserves the right to suspend or revoke verification badges in cases of fraudulent representation, invalid documentation, or ethics violations reported to District Moderators.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
