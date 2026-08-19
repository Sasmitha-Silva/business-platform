"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, ShieldCheck, Play, MapPin, CheckCircle2 } from "lucide-react";

const photos = {
  finance: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=85",
  arch: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
  legal: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85",
  dental: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=85",
  design: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=85",
  tech: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=85",
};

export function FeaturedBusinessesShowcase() {
  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs sm:text-sm font-extrabold text-[#D41367] uppercase tracking-[0.2em]">
              Directory Spotlight
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight mt-1.5">
              Featured Rotaract Businesses
            </h2>
          </div>

          <Link
            href="/directory"
            className="inline-flex items-center gap-2 text-sm font-extrabold text-[#D41367] hover:underline shrink-0"
          >
            <span>Browse Full Directory</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Asymmetric Bento Showcase Grid */}
        <div className="grid lg:grid-cols-12 gap-6 items-stretch mb-6">
          {/* Column 1 (Left - 2 Stacked Photo Business Cards) */}
          <div className="lg:col-span-4 flex flex-col gap-6 justify-between">
            {/* Card 1: Horizon Financial Advisory */}
            <Link
              href="/business/horizon-financial-advisory"
              className="relative rounded-3xl overflow-hidden block flex-1 min-h-[180px] shadow-md group border border-border"
            >
              <Image
                src={photos.finance}
                alt="Horizon Financial Advisory"
                fill
                unoptimized
                sizes="(max-width: 1024px) 100vw, 400px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10 p-6 flex flex-col justify-between text-white">
                <div className="self-start">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-extrabold border border-white/30">
                    Finance & Audit Services
                  </span>
                </div>
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-black tracking-tight text-white mb-0.5">
                      Horizon Financial Advisory.
                    </h3>
                    <p className="text-xs text-white/90 font-medium flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-pink-300" /> Colombo, Sri Lanka · District 3220
                    </p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform">
                    <ArrowUpRight className="w-4 h-4 text-black" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Card 2: Nexus Architecture Studio */}
            <Link
              href="/business/nexus-architecture-studio"
              className="relative rounded-3xl overflow-hidden block flex-1 min-h-[180px] shadow-md group border border-border"
            >
              <Image
                src={photos.arch}
                alt="Nexus Architecture Studio"
                fill
                unoptimized
                sizes="(max-width: 1024px) 100vw, 400px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10 p-6 flex flex-col justify-between text-white">
                <div className="self-start">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-extrabold border border-white/30">
                    Architecture & Urban Planning
                  </span>
                </div>
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-black tracking-tight text-white mb-0.5">
                      Nexus Architecture Studio.
                    </h3>
                    <p className="text-xs text-white/90 font-medium flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-pink-300" /> Colombo, Sri Lanka · Architecture
                    </p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform">
                    <ArrowUpRight className="w-4 h-4 text-black" />
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Column 2 (Center - Tall Photo Card: Skyline Legal) */}
          <div className="lg:col-span-4">
            <Link
              href="/business/skyline-legal-associates"
              className="relative rounded-3xl overflow-hidden block h-full min-h-[380px] shadow-lg group border border-border"
            >
              <Image
                src={photos.legal}
                alt="Skyline Legal Associates"
                fill
                unoptimized
                sizes="(max-width: 1024px) 100vw, 400px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10 p-6 flex flex-col justify-between text-white">
                {/* Top Badge */}
                <div className="self-start">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-extrabold border border-white/30">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                    GOLD TIER
                  </span>
                </div>

                {/* Bottom Title & Action */}
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-black tracking-tight leading-tight text-white mb-1">
                      Skyline Legal Associates.
                    </h3>
                    <p className="text-xs text-white/90 font-medium flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-pink-300" /> Dubai, UAE · Corporate Law
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                    <ArrowUpRight className="w-5 h-5 text-black" />
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Column 3 (Right - 2 Stacked Photo Cards) */}
          <div className="lg:col-span-4 flex flex-col gap-6 justify-between">
            {/* Card 1: Apex Dental Studio */}
            <Link
              href="/business/apex-dental-studio"
              className="relative rounded-3xl overflow-hidden block flex-1 min-h-[180px] shadow-md group border border-border"
            >
              <Image
                src={photos.dental}
                alt="Apex Dental Studio"
                fill
                unoptimized
                sizes="(max-width: 1024px) 100vw, 400px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10 p-6 flex flex-col justify-between text-white">
                <div className="self-start">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-extrabold border border-white/30">
                    Healthcare & Dentistry
                  </span>
                </div>
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-black tracking-tight text-white mb-0.5">
                      Apex Dental Studio.
                    </h3>
                    <p className="text-xs text-white/90 font-medium flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-pink-300" /> Mumbai, India · Healthcare
                    </p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform">
                    <ArrowUpRight className="w-4 h-4 text-black" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Card 2: Vivid Design Hub */}
            <Link
              href="/business/vivid-design-hub"
              className="relative rounded-3xl overflow-hidden block flex-1 min-h-[180px] shadow-md group border border-border"
            >
              <Image
                src={photos.design}
                alt="Vivid Design Hub"
                fill
                unoptimized
                sizes="(max-width: 1024px) 100vw, 400px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10 p-6 flex flex-col justify-between text-white">
                <div className="self-start">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-extrabold border border-white/30">
                    Creative & Digital Agency
                  </span>
                </div>
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-black tracking-tight text-white mb-0.5">
                      Vivid Design Hub.
                    </h3>
                    <p className="text-xs text-white/90 font-medium flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-pink-300" /> Nairobi, Kenya
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

        {/* Bottom Banner Card */}
        <div className="bg-white border border-border shadow-md rounded-3xl p-6 sm:p-8 lg:p-10 flex flex-col lg:flex-row items-center gap-8 transition-shadow hover:shadow-lg">
          {/* Left Media Thumbnail */}
          <div className="relative w-full lg:w-[380px] aspect-[16/10] rounded-2xl overflow-hidden shrink-0 shadow-md group">
            <Image
              src={photos.tech}
              alt="Lumina Tech Labs"
              fill
              unoptimized
              sizes="380px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
            <div className="absolute top-3 left-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-extrabold border border-white/30">
                Software & Cloud Infrastructure
              </span>
            </div>
            {/* Hash Tags */}
            <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5">
              {["#CloudSaaS", "#AITools", "#Enterprise"].map((h) => (
                <span key={h} className="text-[10px] font-bold bg-white/20 backdrop-blur-md text-white px-2 py-0.5 rounded-full border border-white/30">
                  {h}
                </span>
              ))}
            </div>
          </div>

          {/* Right Banner Content */}
          <div className="flex-1 text-center lg:text-left">
            <span className="text-[11px] font-extrabold text-[#D41367] uppercase tracking-[0.2em] mb-2 block">
              ENTERPRISE SPOTLIGHT
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight mb-3 leading-snug">
              Lumina Tech Labs: Cloud & AI Enterprise Software for Global Scale.
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-2xl mb-6">
              Ready to scale your tech infrastructure? Explore custom AI automation, cloud backend development, and high-security SaaS platforms engineered by Rotaract Tech Leaders.
            </p>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <Link
                href="/business/lumina-tech-labs"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#D41367] hover:bg-[#B80E56] text-white text-xs font-extrabold rounded-full transition-all shadow-md hover:shadow-lg"
              >
                <span>Browse Enterprise Profile</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <span className="text-xs text-muted-foreground font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> DRR Certified Entity
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
