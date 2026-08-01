import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, ChevronRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "How It Works — Rotaract Business Network",
  description: "Learn how the Rotaract Business Network verification process works and how to get your business listed.",
};

const features = [
  { title: "Verified Credibility", desc: "Multi-tier verification builds instant trust with fellow Rotaractors." },
  { title: "Global Reach", desc: "Access 28,000+ Rotaract entrepreneurs and leaders worldwide." },
  { title: "District Moderation", desc: "Vetted directly by assigned District Rotaract Representatives." },
  { title: "B2B Directory", desc: "Searchable listings with direct enquiry routing." },
];

export default function HowItWorksPage() {
  return (
    <div className="bg-background min-h-screen pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="pt-4 pb-6 border-b border-border mb-8">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            <Link href="/" className="hover:text-[#D41367] transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-medium">How It Works</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                How Verification Works
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Our step-by-step verification ensures high-integrity professional networking.
              </p>
            </div>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#D41367] hover:bg-[#B80E56] text-white text-xs font-bold rounded-full transition-colors shadow-sm shrink-0 self-start sm:self-auto"
            >
              Start Registration
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Spendesk-Style Curved Arrow Process Section */}
        <div className="bg-gradient-to-br from-[#5C0A2E] via-[#8C0E43] to-[#D41367] rounded-[2.5rem] p-8 sm:p-14 lg:p-16 text-white relative overflow-hidden shadow-2xl mb-12">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-[11px] font-extrabold uppercase tracking-[0.2em] mb-3 shadow-sm backdrop-blur-md">
              THREE SIMPLE STEPS
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Fast & Transparent Path
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10 lg:gap-12 relative z-10 items-start max-w-5xl mx-auto">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center relative group">
              <div className="text-6xl font-black text-white/90 drop-shadow-md mb-3 font-mono tracking-tighter group-hover:scale-110 transition-transform">
                1
              </div>
              <h3 className="text-base sm:text-lg font-extrabold text-white mb-1.5">
                Register & List Profile
              </h3>
              <p className="text-xs text-white/75 leading-relaxed max-w-xs">
                Submit your active Rotaract ID, home club details, location, and service offerings.
              </p>

              <div className="hidden md:block absolute -right-16 top-6 w-24 h-12 pointer-events-none z-20">
                <svg className="w-full h-full" viewBox="0 0 100 50" fill="none">
                  <path
                    d="M 10 35 Q 50 5 90 35"
                    stroke="rgba(255, 255, 255, 0.6)"
                    strokeWidth="2.5"
                    strokeDasharray="4 4"
                    fill="none"
                  />
                  <polygon points="86,37 96,35 90,26" fill="rgba(255, 255, 255, 0.9)" />
                </svg>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center relative group">
              <div className="text-6xl font-black text-[#F7A81B] drop-shadow-md mb-3 font-mono tracking-tighter group-hover:scale-110 transition-transform">
                2
              </div>
              <h3 className="text-base sm:text-lg font-extrabold text-white mb-1.5">
                District Review
              </h3>
              <p className="text-xs text-white/75 leading-relaxed max-w-xs">
                Upload verification documents (GST, DRR endorsement letter, Udyam) for District Moderator review.
              </p>

              <div className="hidden md:block absolute -right-16 top-6 w-24 h-12 pointer-events-none z-20">
                <svg className="w-full h-full" viewBox="0 0 100 50" fill="none">
                  <path
                    d="M 10 35 Q 50 5 90 35"
                    stroke="rgba(255, 255, 255, 0.6)"
                    strokeWidth="2.5"
                    strokeDasharray="4 4"
                    fill="none"
                  />
                  <polygon points="86,37 96,35 90,26" fill="rgba(255, 255, 255, 0.9)" />
                </svg>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center relative group">
              <div className="text-6xl font-black text-white/90 drop-shadow-md mb-3 font-mono tracking-tighter group-hover:scale-110 transition-transform">
                3
              </div>
              <h3 className="text-base sm:text-lg font-extrabold text-white mb-1.5">
                Get Badge & Connect
              </h3>
              <p className="text-xs text-white/75 leading-relaxed max-w-xs">
                Your trust badge goes live on the directory, opening direct B2B opportunities globally.
              </p>
            </div>
          </div>
        </div>

        {/* Features List */}
        <div className="bg-card rounded-2xl border border-border p-6 sm:p-8">
          <h2 className="text-base font-bold text-foreground mb-6">Why Get Verified?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f) => (
              <div key={f.title} className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                  <CheckCircle2 className="w-4 h-4 text-[#D41367] shrink-0" />
                  <span>{f.title}</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed pl-6">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
