import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowRight, ShieldCheck, Building2, Users, Award, FileText, Rocket, MapPin, Search, Star, Briefcase, Map, Sparkles, CheckCircle2, PhoneCall, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Rotaract Business Network — Discover Verified Rotaract Professionals",
  description:
    "A premium directory connecting trusted Rotaract entrepreneurs and service leaders committed to excellence and professional integrity.",
};

const stats = [
  { icon: Briefcase, value: "1,200+", label: "VERIFIED ENTITIES", iconBg: "bg-pink-100 text-[#D41367]" },
  { icon: Map, value: "45", label: "ACTIVE DISTRICTS", iconBg: "bg-amber-100 text-amber-700" },
  { icon: Users, value: "28k+", label: "GLOBAL LEADERS", iconBg: "bg-blue-100 text-[#0050A2]" },
  { icon: ShieldCheck, value: "100%", label: "VERIFICATION RATE", iconBg: "bg-pink-100 text-[#D41367]" },
];

export default function LandingPage() {
  return (
    <div className="relative pb-16">
      {/* 100vh Exact Viewport Fitted Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[calc(100vh-6rem)] flex flex-col justify-center overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Left - Hero Text & Search */}
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight leading-none mb-6">
              Discover <span className="text-[#F7A81B]">Verified</span>{" "}
              <span className="text-[#D41367]">Rotaract</span> Professionals
            </h1>

            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-lg mb-8">
              A premium directory connecting trusted entrepreneurs and service leaders committed to excellence and professional integrity.
            </p>

            {/* Hero Search Bar */}
            <div className="bg-white rounded-3xl p-2.5 shadow-lg border border-border flex flex-col sm:flex-row items-stretch sm:items-center gap-2 max-w-xl">
              <div className="flex items-center gap-2.5 px-3 py-2 flex-1">
                <Search className="w-4 h-4 text-[#D41367] shrink-0" />
                <input
                  type="text"
                  placeholder="Keyword (e.g. Marketing, Law)"
                  className="w-full text-sm bg-transparent outline-none placeholder:text-muted-foreground"
                />
              </div>
              <div className="hidden sm:block w-px h-6 bg-border" />
              <div className="flex items-center gap-2.5 px-3 py-2 flex-1">
                <MapPin className="w-4 h-4 text-[#D41367] shrink-0" />
                <input
                  type="text"
                  placeholder="Global Location"
                  className="w-full text-sm bg-transparent outline-none placeholder:text-muted-foreground"
                />
              </div>
              <Button className="bg-[#D41367] hover:bg-[#B80E56] text-white rounded-2xl px-6 py-2.5 text-sm font-semibold shrink-0 shadow-md">
                Explore
              </Button>
            </div>
          </div>

          {/* Right - 3D Offset Cranberry Framed Photograph */}
          <div className="relative pr-1.5 pb-1.5">
            {/* Cranberry Backdrop Shape */}
            <div className="absolute inset-0 translate-x-1 translate-y-1 rounded-[2.5rem] bg-gradient-to-br from-[#D41367] to-[#B80E56] shadow-md pointer-events-none opacity-90" />

            {/* Main Hero Photograph Frame */}
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[4/3]">
              <Image
                src="/images/hero-meeting.png"
                alt="Rotaract Professionals Networking"
                fill
                sizes="(max-width: 1024px) 100vw, 550px"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-border grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-4 text-center sm:text-left justify-center sm:justify-start">
              <div className={`w-12 h-12 rounded-2xl ${stat.iconBg} flex items-center justify-center shrink-0`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-foreground">{stat.value}</p>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mt-0.5">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Elite Professionals Spotlight — Cohesive Harmonized Bento Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
              Featured Rotaract Businesses
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Top-tier verified enterprises backed by District Representatives.
            </p>
          </div>
          <Button variant="outline" className="rounded-full border-border hover:border-[#D41367] hover:text-[#D41367] text-xs font-bold gap-2 self-start sm:self-auto bg-white px-6 h-10 shadow-sm" asChild>
            <Link href="/directory">
              Explore All Directory <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        {/* Bento Grid Layout - Harmonized Colors */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Bento Card 1: Featured 2-Column Hero Card (Cohesive Light Theme) */}
          <div className="lg:col-span-7 bg-gradient-to-br from-white via-white to-pink-50/70 rounded-[3rem] p-8 sm:p-10 text-foreground border border-pink-200 shadow-lg relative overflow-hidden flex flex-col justify-between group">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#D41367]/5 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <span className="bg-amber-100 text-amber-800 border border-amber-200 font-extrabold text-[10px] uppercase tracking-widest px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                  ★ GOLD TIER CERTIFIED
                </span>
                <span className="text-xs text-muted-foreground font-semibold flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5 text-[#D41367]" /> Global Exporter
                </span>
              </div>

              <div className="flex items-start gap-5 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-white border-2 border-pink-100 shadow-md shrink-0 overflow-hidden relative">
                  <Image src="/images/logo-legal.png" alt="Skyline Legal" fill sizes="64px" className="object-cover" />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                    Skyline Legal Associates
                  </h3>
                  <p className="text-xs text-[#D41367] font-bold mt-1">Corporate Law & International Scaling</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#D41367]" /> Dubai, UAE · District 3220 Partner
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6 max-w-xl">
                Specializing in corporate restructuring, cross-border M&A transactions, and startup scaling across Middle East & Asia Pacific regions.
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {["International M&A", "Startup Scaling", "Regulatory Compliance", "IP Rights"].map((t) => (
                  <span key={t} className="px-3 py-1 bg-pink-50 text-[#D41367] border border-pink-200/60 rounded-xl text-xs font-semibold">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4 border-t border-border">
              <Button className="bg-[#D41367] hover:bg-[#B80E56] text-white font-extrabold rounded-2xl h-11 px-8 text-xs shadow-md gap-2" asChild>
                <Link href="/business/skyline-legal-associates">
                  <PhoneCall className="w-4 h-4" /> Quick Connect
                </Link>
              </Button>
              <Button variant="outline" className="border-border text-foreground hover:bg-pink-50 hover:text-[#D41367] rounded-2xl h-11 px-6 text-xs font-bold bg-white" asChild>
                <Link href="/business/skyline-legal-associates">View Profile →</Link>
              </Button>
            </div>
          </div>

          {/* Bento Column Right (2 Stacked Cards) */}
          <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
            {/* Card 2: Apex Dental */}
            <div className="bg-white rounded-[2.5rem] p-7 border border-border shadow-sm flex flex-col justify-between flex-1">
              <div>
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span className="bg-blue-100 text-[#0050A2] font-extrabold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full">
                    SILVER TIER
                  </span>
                  <span className="text-xs font-bold text-amber-600 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> 5.0 Rating
                  </span>
                </div>

                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0050A2] font-extrabold text-xl flex items-center justify-center shrink-0 overflow-hidden relative border border-blue-100">
                    <Image src="/images/logo-dental.png" alt="Apex Dental" fill sizes="48px" className="object-cover" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-lg text-foreground">Apex Dental Studio</h3>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#D41367]" /> Mumbai, India
                    </p>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-4">
                  Premium cosmetic dentistry, implants, and oral health consultations using state-of-the-art diagnostic technology.
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border/60">
                <span className="text-[11px] font-bold text-[#0050A2]">Healthcare & Dentistry</span>
                <Button size="sm" variant="ghost" className="text-[#D41367] font-extrabold text-xs hover:bg-pink-50 rounded-xl" asChild>
                  <Link href="/business/apex-dental-studio">Profile →</Link>
                </Button>
              </div>
            </div>

            {/* Card 3: Vivid Design */}
            <div className="bg-white rounded-[2.5rem] p-7 border border-border shadow-sm flex flex-col justify-between flex-1">
              <div>
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span className="bg-pink-100 text-[#D41367] font-extrabold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full">
                    GOLD TIER
                  </span>
                  <span className="text-xs font-bold text-amber-600 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> 4.8 Rating
                  </span>
                </div>

                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 font-extrabold text-xl flex items-center justify-center shrink-0 overflow-hidden relative border border-purple-100">
                    <Image src="/images/logo-design.png" alt="Vivid Design" fill sizes="48px" className="object-cover" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-lg text-foreground">Vivid Design Hub</h3>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#D41367]" /> Nairobi, Kenya
                    </p>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-4">
                  Full-stack digital agency specializing in branding, UI/UX design, mobile apps, and social media campaigns.
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border/60">
                <span className="text-[11px] font-bold text-[#D41367]">Creative & Digital</span>
                <Button size="sm" variant="ghost" className="text-[#D41367] font-extrabold text-xs hover:bg-pink-50 rounded-xl" asChild>
                  <Link href="/business/vivid-design-hub">Profile →</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Journey to Verification Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16">
        <div className="bg-gradient-to-b from-[#FFF0F4] via-[#FFEBF0] to-[#FAF4F2] border border-[#F7D6E0] rounded-[3rem] p-8 sm:p-14 lg:p-16 relative overflow-hidden shadow-sm">
          {/* Decorative Orbs */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#D41367]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#F7A81B]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Section Header */}
          <div className="text-center mb-16 relative z-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
              Journey to Verification
            </h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
              Join a global community built on trust, Fellowship, and professional excellence.
            </p>
          </div>

          {/* Staggered Grid Container with SVG Dotted Line behind */}
          <div className="relative max-w-5xl mx-auto mb-16">
            <div className="absolute inset-0 pointer-events-none hidden md:block z-0">
              <svg className="w-full h-full" viewBox="0 0 1000 320" fill="none" preserveAspectRatio="none">
                <path
                  d="M 160 120 C 330 120, 330 220, 500 220 C 670 220, 670 120, 840 120"
                  stroke="#D41367"
                  strokeWidth="2.5"
                  strokeDasharray="7 7"
                  opacity="0.35"
                />
              </svg>
            </div>

            <div className="grid md:grid-cols-3 gap-10 lg:gap-14 items-start relative z-10">
              {/* Card 1 */}
              <div className="bg-white rounded-[2.5rem] p-8 sm:p-10 border border-[#F7D6E0] shadow-lg flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-pink-100 text-[#D41367] flex items-center justify-center mb-6 shadow-inner">
                  <FileText className="w-7 h-7" />
                </div>
                <h3 className="font-extrabold text-foreground text-lg mb-3">1. List Profile</h3>
                <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">
                  Build a compelling business profile highlighting your Rotaract background and expertise.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-white rounded-[2.5rem] p-8 sm:p-10 border border-[#F7D6E0] shadow-xl flex flex-col items-center text-center md:translate-y-14">
                <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mb-6 shadow-inner">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <h3 className="font-extrabold text-foreground text-lg mb-3">2. Undergo Review</h3>
                <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">
                  Our committee verifies your active membership and evaluates professional standing.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-white rounded-[2.5rem] p-8 sm:p-10 border border-[#F7D6E0] shadow-lg flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-pink-100 text-[#D41367] flex items-center justify-center mb-6 shadow-inner">
                  <Rocket className="w-7 h-7" />
                </div>
                <h3 className="font-extrabold text-foreground text-lg mb-3">3. Expand Reach</h3>
                <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">
                  Gain immediate credibility with a global network of clients who share your core values.
                </p>
              </div>
            </div>
          </div>

          {/* Full-Width Featured Banner CTA Card linking directly to /register */}
          <div className="max-w-4xl mx-auto mt-24 relative z-10">
            <div className="bg-gradient-to-r from-[#D41367] via-[#C20E5B] to-[#9E002B] rounded-[2.5rem] p-8 sm:p-12 text-white shadow-2xl border border-white/10 flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

              <div className="space-y-3 text-center lg:text-left z-10 max-w-lg">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                  Ready to Register Your Business?
                </h3>
                <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
                  Join 1,200+ verified Rotaract leaders. Provide your Rotaract ID, create your business listing, and launch instantly.
                </p>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs font-semibold text-white/90 pt-1">
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-amber-300" /> 5-Minute Setup</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-amber-300" /> Free Member Profile</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-amber-300" /> Instant Request</span>
                </div>
              </div>

              {/* Direct Action Pill Button linking to /register */}
              <div className="z-10 flex flex-col items-center shrink-0 space-y-2">
                <Link
                  href="/register"
                  className="flex items-center justify-center px-8 py-4 bg-white text-[#D41367] hover:bg-white/90 font-extrabold rounded-full text-base shadow-2xl hover:scale-[1.04] transition-all"
                >
                  <span>Register Your Business</span>
                </Link>
                <Link href="/how-it-works" className="text-xs text-white/80 hover:text-white underline font-semibold transition-colors">
                  Learn how verification works →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
