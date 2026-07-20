import Link from "next/link";
import type { Metadata } from "next";
import { Users, Award, ShieldCheck, Heart, ArrowRight, Target, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About Us — Rotaract Business Network",
  description:
    "Empowering Rotaract entrepreneurs globally through trusted verification, fellowship, and ethical business standards.",
};

export default function AboutPage() {
  return (
    <div className="bg-[#FAF6F4] min-h-screen pb-16 pt-6">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gradient-to-r from-[#D41367] via-[#C20E5B] to-[#9E002B] rounded-[2.5rem] p-8 sm:p-14 text-white shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl space-y-4 relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-white/15 backdrop-blur-md text-amber-300 text-xs font-extrabold rounded-full border border-white/20">
              <Heart className="w-3.5 h-3.5" /> Service Above Self
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              About Rotaract Business Network
            </h1>
            <p className="text-white/85 text-sm sm:text-base leading-relaxed">
              We connect verified Rotaract entrepreneurs, corporate leaders, and service-driven professionals across 45 global districts to foster ethical business growth and meaningful fellowship.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-8 border border-border shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-pink-100 text-[#D41367] flex items-center justify-center font-bold">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-extrabold text-foreground">Our Mission</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              To build the premier global directory for verified Rotaract business owners, ensuring transparent standards, mutual trust, and high-value B2B trade opportunities within our community.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-border shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <Globe className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-extrabold text-foreground">Our Vision</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              To empower every Rotaract entrepreneur with a global platform that validates professional credibility and turns shared Rotary values into sustainable economic opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* Core Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-[#D41367] uppercase tracking-wider">OUR GUIDING PRINCIPLES</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight mt-0.5">
            Built on Rotary Four-Way Test
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { num: "1", title: "Is it the TRUTH?", desc: "All member credentials, GST numbers, and club affiliations are rigorously verified." },
            { num: "2", title: "Is it FAIR to all?", desc: "Equal opportunity for small businesses, startups, and established enterprises alike." },
            { num: "3", title: "Will it build GOODWILL?", desc: "Fostering long-term professional partnerships built on fellowship and integrity." },
            { num: "4", title: "BENEFICIAL to all?", desc: "Driving sustainable economic value back into our local Rotaract communities." },
          ].map((p) => (
            <div key={p.num} className="bg-white rounded-3xl p-6 border border-border shadow-sm space-y-3">
              <span className="w-8 h-8 rounded-full bg-pink-100 text-[#D41367] flex items-center justify-center font-extrabold text-sm">
                {p.num}
              </span>
              <h3 className="font-extrabold text-base text-foreground">{p.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
