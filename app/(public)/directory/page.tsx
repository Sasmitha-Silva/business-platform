"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  MapPin,
  X,
  ChevronRight,
  ChevronDown,
  Check,
  ArrowUpDown,
  RotateCcw,
  Grid,
  List,
  ExternalLink,
  ShieldCheck,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import { VerificationBadge } from "@/components/verification-badge";
import { mockBusinesses, mockCategories } from "@/lib/mock-data";
import type { Business } from "@/lib/types";

const sectorFilters = [
  { label: "All Sectors", slug: "all" },
  { label: "Technology", slug: "technology" },
  { label: "Professional Services", slug: "professional-services" },
  { label: "Creative Services", slug: "creative-services" },
  { label: "Healthcare", slug: "healthcare" },
  { label: "Manufacturing", slug: "manufacturing" },
  { label: "Real Estate", slug: "real-estate-construction" },
  { label: "Retail", slug: "retail" },
];

const verificationLevels = [
  { label: "All Levels", value: "all" },
  { label: "Level 3 – Premium", value: "3" },
  { label: "Level 2 – Verified", value: "2" },
  { label: "Level 1 – Basic", value: "1" },
];

const sortOptions = [
  { label: "Verification Tier", value: "tier" },
  { label: "Newest First", value: "newest" },
  { label: "Name (A-Z)", value: "name" },
];

export default function DirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [sortBy, setSortBy] = useState("tier");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredBusinesses = useMemo(() => {
    return mockBusinesses.filter((biz) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        if (
          !biz.name.toLowerCase().includes(q) &&
          !biz.tagline?.toLowerCase().includes(q) &&
          !biz.description?.toLowerCase().includes(q) &&
          !biz.category?.name.toLowerCase().includes(q) &&
          !biz.subcategory?.name.toLowerCase().includes(q)
        ) return false;
      }
      if (selectedCategory !== "all") {
        if (biz.category?.slug !== selectedCategory && biz.subcategory?.slug !== selectedCategory) return false;
      }
      if (selectedLevel !== "all") {
        if (biz.verification_level !== Number(selectedLevel)) return false;
      }
      return true;
    });
  }, [searchQuery, selectedCategory, selectedLevel]);

  const sortedBusinesses = useMemo(() => {
    return [...filteredBusinesses].sort((a, b) => {
      if (sortBy === "tier") {
        if (b.verification_level !== a.verification_level) return b.verification_level - a.verification_level;
        return (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0);
      }
      if (sortBy === "newest") return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0;
    });
  }, [filteredBusinesses, sortBy]);

  const clearAll = () => { setSearchQuery(""); setSelectedCategory("all"); setSelectedLevel("all"); };
  const hasFilters = searchQuery || selectedCategory !== "all" || selectedLevel !== "all";

  // Count businesses per sector for sidebar counts
  const sectorCounts = useMemo(() => {
    const counts: Record<string, number> = { all: mockBusinesses.length };
    mockBusinesses.forEach((biz) => {
      const slug = biz.category?.slug || "";
      counts[slug] = (counts[slug] || 0) + 1;
    });
    return counts;
  }, []);

  const getLogoImage = (biz: Business) => {
    if (biz.slug.includes("nexus") || biz.slug.includes("lumina")) return "/images/logo-tech.png";
    if (biz.slug.includes("dental") || biz.slug.includes("studio")) return "/images/logo-dental.png";
    if (biz.slug.includes("vivid") || biz.slug.includes("design")) return "/images/logo-design.png";
    return null;
  };

  return (
    <div className="min-h-screen bg-[#FAF6F4] text-foreground pt-6 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

        {/* Header */}
        <div className="space-y-1 pb-6 border-b border-border/60">
          <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground mb-2">
            <Link href="/" className="hover:text-[#D41367] transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#D41367] font-bold">Directory</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
            Business <span className="text-[#D41367]">Directory</span>
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground font-medium">
            Verified Rotaract entrepreneurs & service leaders worldwide
          </p>
        </div>

        {/* Sidebar + Content Layout */}
        <div className="flex gap-6">

          {/* ===== LEFT SIDEBAR ===== */}
          <aside className="hidden lg:block w-[240px] shrink-0 space-y-5 sticky top-24 self-start">

            {/* Search */}
            <div>
              <label className="text-[11px] font-extrabold text-foreground uppercase tracking-wider mb-2 block">Search</label>
              <div className="flex items-center gap-2 bg-white rounded-xl px-3 py-2 border border-border shadow-xs">
                <Search className="w-3.5 h-3.5 text-[#D41367] shrink-0" />
                <input
                  type="text"
                  placeholder="Name, category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-xs bg-transparent outline-none placeholder:text-muted-foreground font-medium"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="text-muted-foreground hover:text-[#D41367]">
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>

            {/* Sector Filter */}
            <div>
              <label className="text-[11px] font-extrabold text-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Layers className="w-3 h-3 text-[#D41367]" /> Sector
              </label>
              <div className="space-y-0.5">
                {sectorFilters.map((s) => {
                  const isActive = selectedCategory === s.slug;
                  const count = sectorCounts[s.slug] || 0;
                  return (
                    <button
                      key={s.slug}
                      onClick={() => setSelectedCategory(s.slug)}
                      className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        isActive
                          ? "bg-[#D41367] text-white"
                          : "text-muted-foreground hover:bg-white hover:text-foreground"
                      }`}
                    >
                      <span>{s.label}</span>
                      <span className={`text-[10px] font-bold ${isActive ? "text-white/70" : "text-muted-foreground/50"}`}>
                        {s.slug === "all" ? mockBusinesses.length : count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Verification Level */}
            <div>
              <label className="text-[11px] font-extrabold text-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-3 h-3 text-[#D41367]" /> Verification
              </label>
              <div className="space-y-0.5">
                {verificationLevels.map((lvl) => {
                  const isActive = selectedLevel === lvl.value;
                  return (
                    <button
                      key={lvl.value}
                      onClick={() => setSelectedLevel(lvl.value)}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        isActive
                          ? "bg-[#D41367] text-white"
                          : "text-muted-foreground hover:bg-white hover:text-foreground"
                      }`}
                    >
                      {lvl.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Clear Filters */}
            {hasFilters && (
              <button
                onClick={clearAll}
                className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-pink-50 text-[#D41367] text-xs font-extrabold hover:bg-pink-100 transition-colors"
              >
                <RotateCcw className="w-3 h-3" /> Clear All Filters
              </button>
            )}
          </aside>

          {/* ===== MAIN CONTENT ===== */}
          <div className="flex-1 min-w-0 space-y-4">

            {/* Top Controls: Results + Sort + View */}
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-bold text-muted-foreground">
                {sortedBusinesses.length} {sortedBusinesses.length === 1 ? "business" : "businesses"}
              </p>
              <div className="flex items-center gap-2">
                {/* Custom Sort Dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsSortOpen(!isSortOpen)}
                    className="h-8 bg-white rounded-xl px-3 border border-border text-[11px] font-semibold text-muted-foreground shadow-xs flex items-center gap-2 hover:border-[#D41367]/50 hover:text-foreground transition-all cursor-pointer"
                  >
                    <ArrowUpDown className="w-3 h-3 text-[#D41367] shrink-0" />
                    <span>{sortOptions.find((o) => o.value === sortBy)?.label}</span>
                    <ChevronDown className={`w-3 h-3 text-muted-foreground transition-transform duration-200 ${isSortOpen ? "rotate-180 text-[#D41367]" : ""}`} />
                  </button>

                  {isSortOpen && (
                    <>
                      <div className="fixed inset-0 z-20" onClick={() => setIsSortOpen(false)} />
                      <div className="absolute right-0 mt-1.5 w-44 bg-white rounded-xl border border-pink-100 shadow-lg py-1.5 z-30 animate-in fade-in-50 zoom-in-95">
                        <div className="px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground/70">
                          Sort By
                        </div>
                        {sortOptions.map((opt) => {
                          const isSelected = sortBy === opt.value;
                          return (
                            <button
                              key={opt.value}
                              onClick={() => {
                                setSortBy(opt.value);
                                setIsSortOpen(false);
                              }}
                              className={`w-full flex items-center justify-between px-3 py-1.5 text-xs font-semibold transition-colors ${
                                isSelected
                                  ? "bg-pink-50 text-[#D41367]"
                                  : "text-foreground hover:bg-slate-50 hover:text-[#D41367]"
                              }`}
                            >
                              <span>{opt.label}</span>
                              {isSelected && <Check className="w-3.5 h-3.5 text-[#D41367]" />}
                            </button>
                          );
                        })}
                      </div>
                    </>
                  )}
                </div>

                <div className="bg-white p-0.5 rounded-xl border border-border flex items-center gap-0.5 shadow-xs">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-1.5 rounded-lg text-xs transition-all ${
                      viewMode === "grid" ? "bg-[#D41367] text-white" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Grid className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-1.5 rounded-lg text-xs transition-all ${
                      viewMode === "list" ? "bg-[#D41367] text-white" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <List className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Filters (below lg) */}
            <div className="lg:hidden flex flex-wrap items-center gap-1.5">
              {sectorFilters.slice(0, 6).map((chip) => {
                const isActive = selectedCategory === chip.slug;
                return (
                  <button
                    key={chip.slug}
                    onClick={() => setSelectedCategory(chip.slug)}
                    className={`px-3 py-1 rounded-full font-bold transition-all text-[11px] ${
                      isActive
                        ? "bg-[#D41367] text-white shadow-xs"
                        : "bg-white text-muted-foreground hover:text-[#D41367] border border-border/70"
                    }`}
                  >
                    {chip.label}
                  </button>
                );
              })}
            </div>

            {/* Empty State */}
            {sortedBusinesses.length === 0 ? (
              <div className="bg-white rounded-2xl border border-pink-100 p-12 text-center space-y-4 shadow-xs">
                <div className="w-16 h-16 rounded-full bg-pink-50 text-[#D41367] flex items-center justify-center mx-auto">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black text-foreground">No Matching Businesses</h3>
                <p className="text-xs text-muted-foreground max-w-md mx-auto leading-relaxed">
                  Try a different search term or reset the filters.
                </p>
                <Button onClick={clearAll} className="bg-[#D41367] hover:bg-[#B80E56] text-white rounded-full px-6 py-2.5 text-xs font-extrabold shadow-sm gap-2">
                  <RotateCcw className="w-4 h-4" /> Reset
                </Button>
              </div>
            ) : viewMode === "grid" ? (
              /* ===== GRID VIEW ===== */
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {sortedBusinesses.map((biz) => {
                  const logoImg = getLogoImage(biz);
                  const locationText = biz.location
                    ? `${biz.location.city || biz.location.state}, ${biz.location.country}`
                    : "Global";

                  return (
                    <Link
                      key={biz.id}
                      href={`/business/${biz.slug}`}
                      className="bg-white rounded-2xl border border-border/80 shadow-xs hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group overflow-hidden flex flex-col"
                    >
                      <div className="p-4 flex flex-col flex-1">
                        {/* Logo + Name stacked */}
                        <div className="flex items-start gap-3 mb-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D41367] to-[#B80E56] text-white font-extrabold text-sm flex items-center justify-center shadow-sm overflow-hidden relative shrink-0">
                            {logoImg ? (
                              <Image src={logoImg} alt={biz.name} fill sizes="40px" className="object-cover" />
                            ) : (
                              biz.name.charAt(0)
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="font-extrabold text-[13px] text-foreground group-hover:text-[#D41367] transition-colors leading-tight line-clamp-2">
                              {biz.name}
                            </h3>
                            <p className="text-[10px] font-bold text-[#D41367] truncate mt-0.5">
                              {biz.subcategory?.name || biz.category?.name}
                            </p>
                          </div>
                          <VerificationBadge level={biz.verification_level} size="sm" />
                        </div>

                        {/* Tagline */}
                        <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed mb-3 font-medium flex-1">
                          {biz.tagline || biz.description}
                        </p>

                        {/* Bottom Meta */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-medium">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-[#D41367]" />
                              <span className="truncate max-w-[100px]">{locationText}</span>
                            </span>
                            <span className="text-border">·</span>
                            <span>Dist. {biz.rotaract_profile?.district_number || 3220}</span>
                          </div>
                          <div className="w-6 h-6 rounded-full bg-pink-50 text-[#D41367] flex items-center justify-center group-hover:bg-[#D41367] group-hover:text-white transition-colors shrink-0">
                            <ExternalLink className="w-3 h-3" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              /* ===== LIST VIEW ===== */
              <div className="space-y-3">
                {sortedBusinesses.map((biz) => {
                  const logoImg = getLogoImage(biz);
                  const locationText = biz.location
                    ? `${biz.location.city || biz.location.state}, ${biz.location.country}`
                    : "Global";

                  return (
                    <Link
                      key={biz.id}
                      href={`/business/${biz.slug}`}
                      className="bg-white rounded-2xl border border-border/80 shadow-xs hover:shadow-lg transition-all duration-200 group p-4 flex items-center gap-4"
                    >
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#D41367] to-[#B80E56] text-white font-extrabold text-base flex items-center justify-center shadow-sm overflow-hidden relative shrink-0">
                        {logoImg ? (
                          <Image src={logoImg} alt={biz.name} fill sizes="44px" className="object-cover" />
                        ) : (
                          biz.name.charAt(0)
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <h3 className="font-extrabold text-sm text-foreground group-hover:text-[#D41367] transition-colors truncate">
                            {biz.name}
                          </h3>
                          <VerificationBadge level={biz.verification_level} size="sm" />
                        </div>
                        <p className="text-[11px] font-bold text-[#D41367] mb-0.5">
                          {biz.subcategory?.name || biz.category?.name} · Dist. {biz.rotaract_profile?.district_number || 3220}
                        </p>
                        <p className="text-[11px] text-muted-foreground truncate font-medium">{biz.tagline || biz.description}</p>
                      </div>
                      <div className="hidden sm:flex items-center gap-3 shrink-0">
                        <span className="text-[11px] text-muted-foreground font-medium flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#D41367]" /> {locationText}
                        </span>
                        <div className="w-8 h-8 rounded-full bg-pink-50 text-[#D41367] flex items-center justify-center group-hover:bg-[#D41367] group-hover:text-white transition-colors">
                          <ExternalLink className="w-4 h-4" />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
