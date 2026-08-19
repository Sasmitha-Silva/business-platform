import type { Metadata } from "next";
import {
  Scale,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service — Rotaract Business Network",
  description: "Terms and conditions governing membership and listing on Rotaract Business Network.",
};

export default function TermsPage() {
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
            Terms of Service
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-normal max-w-xl mx-auto">
            Eligibility guidelines, compliance verification requirements, and ethical commercial conduct for platform members.
          </p>
          <div className="pt-1">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Effective: August 2026 • Global Rotaract Business Network
            </span>
          </div>
        </div>

        {/* ================= TERMS SECTIONS CONTAINER ================= */}
        <div className="bg-white/95 backdrop-blur-xs rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-2xs space-y-8 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
          {/* Section 1 */}
          <section className="space-y-2.5 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-pink-50 text-[#D41367] flex items-center justify-center font-bold text-xs shrink-0">
                01
              </div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Eligibility &amp; Rotary Good Standing
              </h2>
            </div>
            <p>
              To register a business profile and maintain active directory status, members must be registered in an active Rotaract or Rotary club recognized by Rotary International, or maintain verified alumni standing certified by their respective District Rotaract Representative (DRR).
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-2.5 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-pink-50 text-[#D41367] flex items-center justify-center font-bold text-xs shrink-0">
                02
              </div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Adherence to the Rotary Four-Way Test
              </h2>
            </div>
            <p>
              All members agree to conduct business transactions, trade inquiries, communications, and customer fulfillment in accordance with the Rotary Four-Way Test: Is it the truth? Is it fair to all concerned? Will it build goodwill and better friendships? Will it be beneficial to all concerned?
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-2.5 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-pink-50 text-[#D41367] flex items-center justify-center font-bold text-xs shrink-0">
                03
              </div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Verification &amp; Accreditation Standards
              </h2>
            </div>
            <p>
              Accreditation badges (Bronze Listing, Silver Certified, and Gold Enterprise) are granted based on rigorous moderator review of submitted legal registrations, tax certificates, and official DRR letters. Misleading documentation or fraudulent claims will result in immediate disqualification.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-2.5 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-pink-50 text-[#D41367] flex items-center justify-center font-bold text-xs shrink-0">
                04
              </div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Commercial Dealings &amp; Platform Role
              </h2>
            </div>
            <p>
              The Rotaract Business Network provides a trusted directory infrastructure to facilitate B2B discovery and verified introductions. The platform does not directly process payments between buyers and sellers, and each member enterprise is solely responsible for contract fulfillment, warranties, and regulatory compliance.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-2.5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-pink-50 text-[#D41367] flex items-center justify-center font-bold text-xs shrink-0">
                05
              </div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Revocation &amp; Account Suspension
              </h2>
            </div>
            <p>
              The District Secretariat reserves the authority to revoke verification badges or suspend portal access in cases of verified ethics violations, unaddressed customer complaints, or loss of Rotary club standing. Appointed District Moderators handle dispute reviews in consultation with the Super Admin team.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
