import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowRight, Search, MapPin, ShieldCheck, CheckCircle2, Star, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FeaturedBusinessesShowcase } from "@/components/featured-businesses-showcase";

export const metadata: Metadata = {
  title: "Rotaract Business Network — Discover Verified Rotaract Professionals",
  description:
    "A premium directory connecting trusted Rotaract entrepreneurs and service leaders committed to excellence and professional integrity.",
};

const popularCategories = [
  { label: "Legal & Corporate", slug: "professional-services" },
  { label: "Healthcare & Medicine", slug: "healthcare" },
  { label: "Creative & Digital", slug: "creative-services" },
  { label: "Technology & Software", slug: "technology" },
];

export default function LandingPage() {
  return (
    <div className="relative">
      {/* Redesigned Centered Hero Section with Crisp, Clear Background Photo */}
      <section className="relative py-20 sm:py-28 overflow-hidden bg-background text-foreground">
        {/* Crisp Clear Background Photo with Soft Warm Frosted Overlay */}
        <Image
          src="/images/hero-meeting.png"
          alt="Rotaract Professionals Networking"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-100 pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/70 to-[#FFF5F8] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center justify-center relative z-10">
          {/* Centered Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground tracking-tight leading-[1.08] mb-6 max-w-4xl">
            Connect with <span className="text-[#F7A81B]">Verified</span>{" "}
            <span className="text-[#D41367]">Rotaract</span> Business Leaders
          </h1>

          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl mb-10 font-medium">
            The official directory uniting Rotary & Rotaract entrepreneurs, service firms, and verified professionals across 45+ global districts.
          </p>

          {/* Centered Search Bar Widget */}
          <div className="bg-white rounded-3xl p-2.5 shadow-xl shadow-pink-500/10 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mb-8 w-full max-w-2xl border border-pink-100">
            <div className="flex items-center gap-3 px-3 py-2 flex-1">
              <Search className="w-4 h-4 text-[#D41367] shrink-0" />
              <input
                type="text"
                placeholder="Keyword or Industry"
                className="w-full text-xs sm:text-sm bg-transparent outline-none placeholder:text-muted-foreground font-medium"
              />
            </div>
            <div className="hidden sm:block w-px h-6 bg-border" />
            <div className="flex items-center gap-3 px-3 py-2 flex-1">
              <MapPin className="w-4 h-4 text-[#D41367] shrink-0" />
              <input
                type="text"
                placeholder="Location or District"
                className="w-full text-xs sm:text-sm bg-transparent outline-none placeholder:text-muted-foreground font-medium"
              />
            </div>
            <Button className="bg-[#D41367] hover:bg-[#B80E56] text-white rounded-2xl px-8 py-3.5 text-sm font-extrabold shrink-0 shadow-md h-auto" asChild>
              <Link href="/directory">
                Search <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </div>

          {/* Centered Popular Sectors Quick Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="font-extrabold text-muted-foreground uppercase tracking-wider text-[11px] mr-1">
              Popular:
            </span>
            {popularCategories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className="px-3.5 py-1.5 rounded-full bg-white hover:bg-[#FEE8F0] hover:text-[#D41367] text-foreground font-bold transition-all border border-pink-100 shadow-sm"
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Featured Businesses Showcase */}
      <section className="bg-[#FFF5F8]">
        <FeaturedBusinessesShowcase />
      </section>

      {/* Spendesk-Style Curved Arrow Process Section */}
      <section className="bg-gradient-to-b from-[#FEE8F0]/40 via-[#FFF5F8] to-background py-20 text-foreground relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight whitespace-nowrap">
              Three Steps to Verified Standing
            </h2>
          </div>

          {/* 3 Steps with Crimson Curved SVG Arrows */}
          <div className="grid md:grid-cols-3 gap-10 lg:gap-12 relative z-10 items-start max-w-5xl mx-auto">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center relative group">
              <div className="text-6xl sm:text-7xl font-black text-[#D41367] drop-shadow-sm mb-3 font-mono tracking-tighter group-hover:scale-110 transition-transform duration-300">
                1
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-foreground mb-2 tracking-tight">
                Sign up & list profile
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-xs">
                Submit your active Rotaract ID, home club info, business services, location, and statutory credentials.
              </p>

              {/* Curved SVG Arrow 1 -> 2 */}
              <div className="hidden md:block absolute -right-16 top-6 w-24 h-12 pointer-events-none z-20">
                <svg className="w-full h-full" viewBox="0 0 100 50" fill="none">
                  <path
                    d="M 10 35 Q 50 5 90 35"
                    stroke="#D41367"
                    strokeWidth="2.5"
                    strokeDasharray="4 4"
                    fill="none"
                    opacity="0.7"
                  />
                  <polygon points="86,37 96,35 90,26" fill="#D41367" opacity="0.85" />
                </svg>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center relative group">
              <div className="text-6xl sm:text-7xl font-black text-[#F7A81B] drop-shadow-sm mb-3 font-mono tracking-tighter group-hover:scale-110 transition-transform duration-300">
                2
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-foreground mb-2 tracking-tight">
                District review
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-xs">
                Your assigned District Representative validates active membership, GST/tax records, and club standing.
              </p>

              {/* Curved SVG Arrow 2 -> 3 */}
              <div className="hidden md:block absolute -right-16 top-6 w-24 h-12 pointer-events-none z-20">
                <svg className="w-full h-full" viewBox="0 0 100 50" fill="none">
                  <path
                    d="M 10 35 Q 50 5 90 35"
                    stroke="#D41367"
                    strokeWidth="2.5"
                    strokeDasharray="4 4"
                    fill="none"
                    opacity="0.7"
                  />
                  <polygon points="86,37 96,35 90,26" fill="#D41367" opacity="0.85" />
                </svg>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center relative group">
              <div className="text-6xl sm:text-7xl font-black text-[#D41367] drop-shadow-sm mb-3 font-mono tracking-tighter group-hover:scale-110 transition-transform duration-300">
                3
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-foreground mb-2 tracking-tight">
                Go live & connect
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-xs">
                Your verified trust badge goes live on the directory. Start receiving direct B2B enquiries globally.
              </p>
            </div>
          </div>

          <div className="mt-14 text-center relative z-10">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#D41367] hover:bg-[#B80E56] text-white text-sm font-extrabold rounded-full transition-all shadow-md hover:shadow-lg hover:scale-105"
            >
              <span>Register Your Business</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
