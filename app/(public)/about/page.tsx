import Link from "next/link";
import type { Metadata } from "next";
import {
  ShieldCheck,
  ArrowRight,
  Target,
  Globe,
  Compass,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About Us — Rotaract Business Network",
  description:
    "Empowering Rotaract entrepreneurs globally through trusted verification, fellowship, and ethical business standards.",
};

export default function AboutPage() {
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

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* ================= HERO HEADER BANNER ================= */}
        <div className="bg-white/90 backdrop-blur-xs rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-2xs text-center max-w-4xl mx-auto space-y-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
            Connecting Rotaract Entrepreneurs Worldwide
          </h1>
          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto">
            A verified global ecosystem uniting service-driven business founders, corporate professionals, and community innovators across 45+ Rotary International districts.
          </p>
        </div>

        {/* ================= IMPACT METRICS ROW ================= */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white/95 backdrop-blur-xs rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-1">
            <span className="text-xs font-medium text-slate-500">Directory Listings</span>
            <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">4,800+</div>
            <p className="text-xs text-emerald-600 font-medium">+12% growth monthly</p>
          </div>

          <div className="bg-white/95 backdrop-blur-xs rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-1">
            <span className="text-xs font-medium text-slate-500">Global Districts</span>
            <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">45+</div>
            <p className="text-xs text-slate-500 font-normal">Active Rotaract networks</p>
          </div>

          <div className="bg-white/95 backdrop-blur-xs rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-1">
            <span className="text-xs font-medium text-slate-500">Verified Badges</span>
            <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">98.4%</div>
            <p className="text-xs text-[#D41367] font-semibold">Moderator verified</p>
          </div>

          <div className="bg-white/95 backdrop-blur-xs rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-1">
            <span className="text-xs font-medium text-slate-500">B2B Trade Volume</span>
            <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">$12M+</div>
            <p className="text-xs text-slate-500 font-normal">Member transactions</p>
          </div>
        </div>

        {/* ================= MISSION & VISION ================= */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/95 backdrop-blur-xs rounded-2xl border border-slate-200 p-7 sm:p-8 shadow-2xs space-y-4">
            <div className="w-10 h-10 rounded-xl bg-pink-50 text-[#D41367] flex items-center justify-center border border-pink-100/60">
              <Target className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Our Mission</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              To build the premier verified directory for Rotaract business owners, establishing rigorous compliance standards, mutual trust, and high-impact B2B trade partnerships within the Rotary community worldwide.
            </p>
          </div>

          <div className="bg-white/95 backdrop-blur-xs rounded-2xl border border-slate-200 p-7 sm:p-8 shadow-2xs space-y-4">
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center border border-slate-200">
              <Globe className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Our Vision</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              To empower every Rotaractor with institutional backing, verifiable business badges, and a trusted international network that turns shared Rotary values into sustainable economic opportunities.
            </p>
          </div>
        </div>

        {/* ================= ROTARY FOUR-WAY TEST ================= */}
        <div className="bg-white/95 backdrop-blur-xs rounded-2xl border border-slate-200 p-7 sm:p-10 shadow-2xs space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-1.5">
            <span className="text-xs font-semibold text-[#D41367] uppercase tracking-wider">
              Institutional Foundation
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Guided by the Rotary Four-Way Test
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-normal">
              Every verified listing, trade inquiry, and business partnership is evaluated against our core principles.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                num: "01",
                title: "Is it the TRUTH?",
                desc: "All business tax identifiers, Rotary club memberships, and legal registries are verified by district moderators.",
              },
              {
                num: "02",
                title: "Is it FAIR to all?",
                desc: "Equal visibility and merit-based directory rank for micro-enterprises, consultants, and enterprise organizations alike.",
              },
              {
                num: "03",
                title: "Builds GOODWILL?",
                desc: "Fostering long-term commercial relationships rooted in fellowship, mutual respect, and ethical business conduct.",
              },
              {
                num: "04",
                title: "BENEFICIAL to all?",
                desc: "Driving sustainable economic value, youth employment, and community investment across our global districts.",
              },
            ].map((pillar) => (
              <div
                key={pillar.num}
                className="p-5 rounded-xl bg-slate-50/70 border border-slate-200/80 space-y-2 hover:bg-slate-50 transition-colors"
              >
                <span className="text-xs font-bold text-[#D41367] tracking-wider block">
                  TEST #{pillar.num}
                </span>
                <h3 className="font-bold text-sm sm:text-base text-slate-900">{pillar.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ================= CALL TO ACTION ================= */}
        <div className="bg-slate-900 rounded-2xl p-8 sm:p-12 text-white shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight">Ready to List Your Enterprise?</h3>
            <p className="text-xs sm:text-sm text-slate-300 font-normal">
              Join thousands of verified Rotaract entrepreneurs and expand your business reach today.
            </p>
          </div>
          <Button
            className="bg-[#D41367] hover:bg-[#B80E56] text-white rounded-xl h-10.5 px-6 text-xs sm:text-sm font-semibold gap-2 shadow-xs shrink-0 cursor-pointer"
            asChild
          >
            <Link href="/register">
              <span>Register Business</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
