"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Building2,
  Search,
  MapPin,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { VerificationBadge } from "@/components/verification-badge";
import { mockBusinesses } from "@/lib/mock-data";

export default function ModeratorDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const districtBusinesses = mockBusinesses.filter(
    (b) => b.location?.country === "Sri Lanka" || b.status === "approved"
  );

  const filtered = districtBusinesses.filter(
    (b) =>
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (b.category?.name && b.category.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (b.location?.city && b.location.city.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6 animate-fade-in max-w-[1600px] mx-auto pb-12">
      {/* ================= HEADER BANNER ================= */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              District 3220 Business Directory
            </h1>
            <span className="px-2.5 py-0.5 rounded-md bg-pink-50 text-[#D41367] font-semibold text-xs border border-pink-100/60">
              {districtBusinesses.length} Registered Enterprises
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-normal mt-0.5">
            Active verified member listings, contact channels, and products under District 3220 jurisdiction.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="outline"
            className="rounded-xl text-xs sm:text-sm font-semibold text-slate-700 border-slate-200 hover:bg-slate-50 gap-2 h-9.5 px-3.5"
            asChild
          >
            <Link href="/moderator">
              <span>Back to Desk</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* ================= SEARCH TOOLBAR ================= */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs flex items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search business, sector, city..."
            className="pl-9.5 h-9.5 text-xs sm:text-sm bg-slate-50 border-slate-200 rounded-xl focus:bg-white"
          />
        </div>
        <span className="text-xs text-slate-500 font-medium">
          Showing {filtered.length} listings
        </span>
      </div>

      {/* ================= BUSINESS CARDS GRID ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((b) => (
          <div
            key={b.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3.5 flex flex-col justify-between hover:border-pink-200 transition-colors"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 text-white font-bold text-lg flex items-center justify-center shadow-xs">
                  {b.name.charAt(0)}
                </div>
                <VerificationBadge level={b.verification_level} size="sm" />
              </div>

              <div>
                <h3 className="font-bold text-base text-slate-900 leading-snug">{b.name}</h3>
                <span className="inline-block text-xs font-semibold text-[#D41367] bg-pink-50 border border-pink-100/60 px-2 py-0.5 rounded-md mt-1">
                  {b.category?.name || "Technology"}
                </span>
              </div>

              <p className="text-xs text-slate-500 font-normal line-clamp-2 leading-relaxed">
                {b.description || "Active Rotaract business providing enterprise services across the region."}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <span className="text-xs text-slate-500 font-medium flex items-center gap-1 truncate">
                <MapPin className="w-3.5 h-3.5 text-[#D41367] shrink-0" />
                <span>{b.location?.city || "Colombo"}, Sri Lanka</span>
              </span>

              <Button
                variant="outline"
                size="sm"
                className="h-8.5 rounded-xl text-xs font-semibold text-slate-700 border-slate-200 hover:bg-slate-50 shrink-0"
                asChild
              >
                <Link href={`/business/${b.slug}`} target="_blank" rel="noopener noreferrer">
                  <span>Inspect</span>
                  <ExternalLink className="w-3 h-3 ml-1" />
                </Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
