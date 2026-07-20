import type { Metadata } from "next";
import Link from "next/link";
import { FileCheck, ShieldCheck, Rocket, Users, Award, CheckCircle, ArrowRight, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "How It Works",
  description: "Learn how the Rotaract Business Network verification process works and how to get your business listed.",
};

const verificationTiers = [
  {
    tier: "Level 1 — Bronze",
    title: "GST Verified",
    description: "Upload your GST certificate for basic verification by our Super Admin team.",
    docs: ["GST Certificate (Form REG-06)"],
    reviewer: "Super Admin",
    color: "bg-amber-50 border-amber-200",
    badge: "text-amber-700",
  },
  {
    tier: "Level 2 — Silver",
    title: "GST + DRR Verified",
    description: "Submit your DRR recommendation letter alongside your GST cert for district-level verification.",
    docs: ["GST Certificate", "DRR Recommendation Letter"],
    reviewer: "District Moderator",
    color: "bg-slate-50 border-slate-200",
    badge: "text-slate-600",
  },
  {
    tier: "Level 3 — Gold",
    title: "GST + DRR + Udyam Verified",
    description: "The highest tier — submit all three documents for comprehensive verification.",
    docs: ["GST Certificate", "DRR Letter", "Udyam Registration"],
    reviewer: "Super Admin",
    color: "bg-yellow-50 border-yellow-200",
    badge: "text-yellow-700",
  },
];

const benefits = [
  { icon: ShieldCheck, title: "Verified Trust", description: "Multi-tier verification builds instant credibility with clients." },
  { icon: Users, title: "Global Network", description: "Connect with 28,000+ Rotaract professionals worldwide." },
  { icon: Building2, title: "Business Visibility", description: "SEO-optimized profiles rank on search engines." },
  { icon: Award, title: "Community Recognition", description: "Showcase your Rotary values alongside your business." },
];

export default function HowItWorksPage() {
  return (
    <div>
      {/* Hero */}
      <section className="text-center py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground">
            How <span className="text-gradient">Verification</span> Works
          </h1>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            Our multi-tier verification system ensures every business in the
            Rotaract network meets the highest standards of trust and
            professional integrity.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-12 bg-card border-y border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 stagger-children">
            {[
              { icon: FileCheck, step: "Step 1", title: "Register & List", desc: "Create your business profile with Rotaract details, business info, location, and contact." },
              { icon: ShieldCheck, step: "Step 2", title: "Submit Documents", desc: "Upload verification documents — GST, DRR letter, and/or Udyam certificate." },
              { icon: Rocket, step: "Step 3", title: "Get Verified", desc: "Our moderators review your submission. Once approved, your badge appears instantly." },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-crimson/10 flex items-center justify-center mb-4">
                  <item.icon className="w-8 h-8 text-crimson" />
                </div>
                <span className="text-xs font-semibold text-crimson uppercase">{item.step}</span>
                <h3 className="text-xl font-bold text-foreground mt-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Verification Tiers */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-foreground mb-10">
            Verification Tiers
          </h2>
          <div className="space-y-6 stagger-children">
            {verificationTiers.map((tier) => (
              <div
                key={tier.tier}
                className={`rounded-2xl border p-6 lg:p-8 ${tier.color}`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex-1">
                    <span className={`text-sm font-bold uppercase tracking-wider ${tier.badge}`}>
                      {tier.tier}
                    </span>
                    <h3 className="text-xl font-bold text-foreground mt-1">{tier.title}</h3>
                    <p className="text-sm text-muted-foreground mt-2">{tier.description}</p>
                    <div className="mt-3 space-y-1">
                      {tier.docs.map((doc) => (
                        <div key={doc} className="flex items-center gap-2 text-sm text-foreground">
                          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                          {doc}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Reviewed by: <span className="font-semibold text-foreground">{tier.reviewer}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-card border-y border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-foreground mb-10">
            Why Get Verified?
          </h2>
          <div className="grid sm:grid-cols-2 gap-6 stagger-children">
            {benefits.map((b) => (
              <div key={b.title} className="flex items-start gap-4 p-5 rounded-2xl bg-warm-bg hover:bg-accent/60 transition-colors">
                <div className="w-11 h-11 rounded-xl bg-crimson/10 flex items-center justify-center shrink-0">
                  <b.icon className="w-5 h-5 text-crimson" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{b.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{b.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground">Ready to Get Started?</h2>
          <p className="text-muted-foreground mt-3">
            Join 1,200+ verified businesses in the Rotaract network.
          </p>
          <Button className="bg-crimson hover:bg-crimson-dark text-white rounded-full px-8 py-3 mt-6 gap-2 text-base" asChild>
            <Link href="/auth/signup">
              Register Your Business <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
