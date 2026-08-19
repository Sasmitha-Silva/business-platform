import type { Metadata } from "next";
import {
  Lock,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy — Rotaract Business Network",
  description: "Privacy policy and data protection standards of the Rotaract Business Network.",
};

export default function PrivacyPage() {
  return (
    <div className="relative bg-white min-h-screen pb-16 pt-6 overflow-hidden animate-fade-in">
      {/* Background Precision Mesh Grid */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
        <div
          className="absolute top-0 left-0 w-[500px] sm:w-[680px] h-[500px] sm:h-[680px]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(212, 19, 103, 0.12) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(212, 19, 103, 0.12) 1px, transparent 1px)
            `,
            backgroundSize: "36px 36px",
            maskImage: "radial-gradient(circle at top left, black 30%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(circle at top left, black 30%, transparent 75%)",
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-[500px] sm:w-[680px] h-[500px] sm:h-[680px]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(212, 19, 103, 0.12) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(212, 19, 103, 0.12) 1px, transparent 1px)
            `,
            backgroundSize: "36px 36px",
            maskImage: "radial-gradient(circle at bottom right, black 30%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(circle at bottom right, black 30%, transparent 75%)",
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-pink-50/60 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* ================= HERO HEADER BANNER ================= */}
        <div className="bg-white/90 backdrop-blur-xs rounded-2xl border border-slate-200 p-8 sm:p-10 shadow-2xs text-center space-y-3">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-normal max-w-xl mx-auto">
            Our strict standards on handling member credentials, business verification documents, and public directory visibility.
          </p>
          <div className="pt-1">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Effective: August 2026 • District 3220 Secretariat
            </span>
          </div>
        </div>

        {/* ================= POLICY SECTIONS CONTAINER ================= */}
        <div className="bg-white/95 backdrop-blur-xs rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-2xs space-y-8 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
          {/* Section 1 */}
          <section className="space-y-2.5 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-pink-50 text-[#D41367] flex items-center justify-center font-bold text-xs shrink-0">
                01
              </div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Information Collection &amp; Membership Verification
              </h2>
            </div>
            <p>
              The Rotaract Business Network collects information necessary to accredit business listings, authenticate active Rotary International affiliations, and facilitate trusted commerce. This includes your full name, official email address, home club name, District number, Rotary ID (RID), and submitted business profile details.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-2.5 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-pink-50 text-[#D41367] flex items-center justify-center font-bold text-xs shrink-0">
                02
              </div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Compliance Document Security &amp; Encryption
              </h2>
            </div>
            <p>
              Sensitive tax and legal documents uploaded for Gold/Silver accreditation (such as GST REG-06, Udyam MSME certificates, and DRR endorsement letters) are encrypted at rest using AES-256 in secure cloud object vaults. These documents are never accessible to the public and are only inspected by appointed District Moderators and Super Administrators during the verification review.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-2.5 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-pink-50 text-[#D41367] flex items-center justify-center font-bold text-xs shrink-0">
                03
              </div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Directory Visibility &amp; Owner Privacy Controls
              </h2>
            </div>
            <p>
              Business owners retain complete control over which contact channels (direct telephone, WhatsApp, official email, or physical showroom address) are displayed publicly on their listing. You may modify your public visibility settings at any time via your Owner Workspace.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-2.5 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-pink-50 text-[#D41367] flex items-center justify-center font-bold text-xs shrink-0">
                04
              </div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                No Third-Party Data Monetization
              </h2>
            </div>
            <p>
              We operate under the Rotary Four-Way Test. We strictly do not sell, rent, lease, or monetize member directory data to advertising brokers or external telemarketers. Information is exclusively utilized to power platform operations and B2B inquiries.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-2.5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-pink-50 text-[#D41367] flex items-center justify-center font-bold text-xs shrink-0">
                05
              </div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Data Retention &amp; Account Erasure Rights
              </h2>
            </div>
            <p>
              Members may request a complete export of their listing data or request account termination at any time by contacting <span className="font-semibold text-slate-900">privacy@rotaractnetwork.org</span>. Upon confirmed deletion, all stored files, inquiries, and profile listings are permanently purged from active production databases within 30 business days.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
