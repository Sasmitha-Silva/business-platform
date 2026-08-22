import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroSection } from "@/components/hero-section";
import { FeaturedCategoriesShowcase } from "@/components/featured-categories-showcase";

export const metadata: Metadata = {
  title: "Rotaract Business Network",
  description:
    "A premium directory connecting trusted Rotaract entrepreneurs and service leaders committed to excellence and professional integrity.",
};

export default function LandingPage() {
  return (
    <div className="relative">
      {/* Elevated High-Impact Hero Section */}
      <HeroSection />

      {/* Interactive Featured Categories Showcase */}
      <section className="bg-white">
        <FeaturedCategoriesShowcase />
      </section>

      {/* Spendesk-Style Curved Arrow Process Section */}
      <section className="bg-white py-20 text-foreground relative overflow-hidden border-t border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
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
                Your verified trust badge goes live on the directory. Start receiving direct B2B inquiries globally.
              </p>
            </div>
          </div>

          <div className="mt-14 text-center relative z-10">
            <Button
              variant="outline"
              className="border-2 border-[#D41367] text-[#D41367] hover:bg-[#D41367] hover:text-white bg-transparent rounded-full px-8 py-3.5 text-sm sm:text-base font-extrabold shadow-sm hover:scale-105 active:scale-95 transition-all h-auto cursor-pointer"
              asChild
            >
              <Link href="/register">
                <span>Register Your Business</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
