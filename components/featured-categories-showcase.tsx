"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Sparkles, Building2, Briefcase, Laptop, Stethoscope, Palette, Compass, ShieldCheck } from "lucide-react";

const categoryPhotos = {
  finance: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=85",
  arch: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
  legal: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85",
  healthcare: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=85",
  creative: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=85",
  tech: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=85",
};

export function FeaturedCategoriesShowcase() {
  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs sm:text-sm font-extrabold text-[#D41367] uppercase tracking-[0.2em]">
              Explore By Industry
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight mt-1.5">
              Featured Categories & Sectors
            </h2>
          </div>

          <Link
            href="/categories"
            className="inline-flex items-center gap-2 text-sm font-extrabold text-[#D41367] hover:underline shrink-0"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Asymmetric Bento Showcase Grid (Same Layout Preserved) */}
        <div className="grid lg:grid-cols-12 gap-6 items-stretch mb-6">
          {/* Column 1 (Left - 2 Stacked Category Cards) */}
          <div className="lg:col-span-4 flex flex-col gap-6 justify-between">
            {/* Category 1: Finance & Audit */}
            <Link
              href="/categories/finance-audit"
              className="relative rounded-3xl overflow-hidden block flex-1 min-h-[200px] shadow-md group border border-border/80"
            >
              <Image
                src={categoryPhotos.finance}
                alt="Finance & Audit Services"
                fill
                unoptimized
                sizes="(max-width: 1024px) 100vw, 400px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/20 p-6 flex flex-col justify-between text-white">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-extrabold border border-white/30">
                    185 Verified Businesses
                  </span>
                </div>
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-black tracking-tight text-white mb-0.5">
                      Finance & Audit
                    </h3>
                    <p className="text-xs text-white/80 font-medium">
                      Accounting · Tax Advisory · Wealth
                    </p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform">
                    <ArrowUpRight className="w-4 h-4 text-black" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Category 2: Legal & Corporate */}
            <Link
              href="/categories/professional-services"
              className="relative rounded-3xl overflow-hidden block flex-1 min-h-[200px] shadow-md group border border-border/80"
            >
              <Image
                src={categoryPhotos.legal}
                alt="Legal & Corporate"
                fill
                unoptimized
                sizes="(max-width: 1024px) 100vw, 400px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/20 p-6 flex flex-col justify-between text-white">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-extrabold border border-white/30">
                    142 Verified Businesses
                  </span>
                </div>
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-black tracking-tight text-white mb-0.5">
                      Legal & Corporate
                    </h3>
                    <p className="text-xs text-amber-300 font-bold">
                      Corporate Law · Compliance · IP
                    </p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform">
                    <ArrowUpRight className="w-4 h-4 text-black" />
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Column 2 (Center - Tall Featured Card: Technology & Software) */}
          <div className="lg:col-span-4">
            <Link
              href="/categories/technology"
              className="relative rounded-3xl overflow-hidden block h-full min-h-[420px] shadow-lg group border border-border/80"
            >
              <Image
                src={categoryPhotos.tech}
                alt="Technology & Software"
                fill
                unoptimized
                sizes="(max-width: 1024px) 100vw, 400px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 p-6 flex flex-col justify-between text-white">
                {/* Top Badge */}
                <div className="self-start">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-pink-600/90 backdrop-blur-md text-white text-[11px] font-extrabold border border-pink-400/40">
                    MOST ACTIVE SECTOR
                  </span>
                </div>

                {/* Bottom Title & Action */}
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <span className="text-xs font-black text-pink-300 uppercase tracking-wider block mb-1">210 Verified Member Firms</span>
                    <h3 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight text-white mb-1.5">
                      Technology & Software.
                    </h3>
                    <p className="text-xs text-white/90 font-medium leading-relaxed">
                      Cloud Infrastructure · AI Systems · Web & Mobile Development · SaaS Solutions
                    </p>
                  </div>
                  <div className="w-11 h-11 rounded-full bg-white text-black flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                    <ArrowUpRight className="w-5 h-5 text-black" />
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Column 3 (Right - 2 Stacked Category Cards) */}
          <div className="lg:col-span-4 flex flex-col gap-6 justify-between">
            {/* Category 4: Healthcare & Medicine */}
            <Link
              href="/categories/healthcare"
              className="relative rounded-3xl overflow-hidden block flex-1 min-h-[200px] shadow-md group border border-border/80"
            >
              <Image
                src={categoryPhotos.healthcare}
                alt="Healthcare & Medicine"
                fill
                unoptimized
                sizes="(max-width: 1024px) 100vw, 400px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/20 p-6 flex flex-col justify-between text-white">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-extrabold border border-white/30">
                    128 Verified Clinics & Providers
                  </span>
                </div>
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-black tracking-tight text-white mb-0.5">
                      Healthcare & Medicine
                    </h3>
                    <p className="text-xs text-emerald-300 font-bold">
                      Clinical Care · MedTech · Wellness
                    </p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform">
                    <ArrowUpRight className="w-4 h-4 text-black" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Category 5: Creative & Digital */}
            <Link
              href="/categories/creative-services"
              className="relative rounded-3xl overflow-hidden block flex-1 min-h-[200px] shadow-md group border border-border/80"
            >
              <Image
                src={categoryPhotos.creative}
                alt="Creative & Digital Services"
                fill
                unoptimized
                sizes="(max-width: 1024px) 100vw, 400px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/20 p-6 flex flex-col justify-between text-white">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-extrabold border border-white/30">
                    196 Verified Agencies
                  </span>
                </div>
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-black tracking-tight text-white mb-0.5">
                      Creative & Digital
                    </h3>
                    <p className="text-xs text-white/80 font-medium">
                      Branding · UI/UX · Video Production
                    </p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform">
                    <ArrowUpRight className="w-4 h-4 text-black" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
