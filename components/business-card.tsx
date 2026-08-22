import Link from "next/link";
import Image from "next/image";
import { MapPin, PhoneCall, ExternalLink, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VerificationBadge } from "@/components/verification-badge";
import { cn } from "@/lib/utils";
import type { Business } from "@/lib/types";

interface BusinessCardProps {
  business: Business;
  className?: string;
}

export function BusinessCard({ business, className }: BusinessCardProps) {
  const location = business.location;
  const locationText = location
    ? `${location.city}, ${location.country}`
    : business.category?.name || "";

  // Assign logo images based on ID/slug
  const logoImage =
    business.slug.includes("nexus") || business.slug.includes("lumina")
      ? "/images/logo-tech.png"
      : business.slug.includes("dental") || business.slug.includes("studio")
      ? "/images/logo-dental.png"
      : null;

  return (
    <div
      className={cn(
        "bg-white rounded-3xl border-2 border-[#D41367]/40 hover:border-[#D41367] p-6 shadow-sm hover:shadow-md transition-all duration-200 group flex flex-col justify-between relative overflow-hidden",
        className
      )}
    >
      <div>
        {/* Top Header Row: Avatar Image on Left, Badges Stacked on Right */}
        <div className="flex items-center justify-between gap-3 pb-3 border-b border-border/60">
          {/* Avatar / Logo Icon */}
          <div className="relative shrink-0">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#D41367] to-[#B80E56] text-white font-extrabold text-lg flex items-center justify-center shadow-md shadow-[#D41367]/20 overflow-hidden relative">
              {logoImage ? (
                <Image src={logoImage} alt={business.name} fill sizes="48px" className="object-cover" />
              ) : (
                business.name.charAt(0)
              )}
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white z-10" title="Verified Rotaract Member">
              <ShieldCheck className="w-2.5 h-2.5 stroke-[3]" />
            </div>
          </div>

          {/* Badges Stack (Right Aligned) */}
          <div className="flex flex-col items-end gap-1 shrink-0">
            {business.verification_level > 0 && (
              <VerificationBadge level={business.verification_level} size="sm" />
            )}
            <span className="text-[10px] font-bold text-muted-foreground bg-warm-bg px-2.5 py-0.5 rounded-full border border-border">
              District 3220
            </span>
          </div>
        </div>

        {/* Full-Width Title & Category Row */}
        <div className="space-y-1 mt-4 mb-3">
          <h3 className="font-bold text-base text-foreground group-hover:text-[#D41367] transition-colors truncate">
            {business.name}
          </h3>
          <p className="text-xs font-semibold text-[#D41367] truncate">
            {business.subcategory?.name || business.category?.name || "Professional Services"}
          </p>
        </div>

        {/* Tagline / Description */}
        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-4">
          {business.tagline || business.description || "Leading provider of professional services and corporate solutions."}
        </p>

        {/* Location & Tags Row */}
        <div className="flex flex-wrap items-center gap-2 mb-4 text-xs">
          {locationText && (
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-muted-foreground bg-warm-bg px-2.5 py-1 rounded-xl border border-border">
              <MapPin className="w-3 h-3 text-[#D41367] shrink-0" />
              <span className="truncate max-w-[180px]">{locationText}</span>
            </span>
          )}
        </div>
      </div>

      {/* Footer Action Buttons Bar */}
      <div className="flex items-center gap-2 pt-3 border-t border-border/60 mt-auto">
        <Button
          size="sm"
          className="bg-[#D41367] hover:bg-[#B80E56] text-white text-xs font-bold rounded-xl flex-1 h-10 shadow-sm gap-1.5"
          asChild
        >
          <Link href={`/business/${business.slug}`}>
            <PhoneCall className="w-3.5 h-3.5" /> Connect Now
          </Link>
        </Button>

        <Button
          size="sm"
          variant="outline"
          className="text-xs font-bold rounded-xl border-border hover:bg-pink-50 hover:text-[#D41367] h-10 px-4 bg-white"
          asChild
        >
          <Link href={`/business/${business.slug}`}>
            Profile →
          </Link>
        </Button>
      </div>
    </div>
  );
}
