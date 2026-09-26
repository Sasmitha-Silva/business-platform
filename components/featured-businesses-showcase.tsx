"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, MapPin, Building2 } from "lucide-react";
import { VerificationBadge } from "@/components/verification-badge";
import type { Business } from "@/lib/types";

interface FeaturedBusinessesShowcaseProps {
  businesses?: Business[];
}

export function FeaturedBusinessesShowcase({ businesses = [] }: FeaturedBusinessesShowcaseProps) {
  if (!businesses.length) return null;

  return (
    <section className="py-16 sm:py-24 bg-white">
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

        {/* Dynamic Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {businesses.slice(0, 6).map((biz) => {
            const displayImage = biz.cover_image_url || biz.logo_url;
            const city = biz.location?.city || "National";
            const district = biz.rotaract_profile?.district_number;

            return (
              <Link
                key={biz.id}
                href={`/business/${biz.slug}`}
                className="group relative rounded-3xl overflow-hidden block min-h-[260px] shadow-md border border-border bg-gradient-to-br from-slate-950 via-slate-900 to-[#1e1b4b] p-6 flex flex-col justify-between text-white transition-all hover:shadow-xl"
              >
                {displayImage && (
                  <Image
                    src={displayImage}
                    alt={biz.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover opacity-40 group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent pointer-events-none" />

                <div className="relative z-10 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-white text-[11px] font-extrabold border border-white/20">
                    {biz.category?.name || "Enterprise"}
                  </span>
                  <VerificationBadge level={biz.verification_level} size="sm" />
                </div>

                <div className="relative z-10 flex items-end justify-between gap-4 pt-8">
                  <div>
                    <h3 className="text-xl font-black tracking-tight text-white mb-1 group-hover:text-pink-200 transition-colors">
                      {biz.name}
                    </h3>
                    <p className="text-xs text-white/80 font-medium flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#D41367]" />
                      <span>{city}{district ? ` · Dist ${district}` : ""}</span>
                    </p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-white text-slate-900 flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 group-hover:bg-[#D41367] group-hover:text-white transition-all">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
