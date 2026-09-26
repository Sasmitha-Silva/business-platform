"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  MapPin,
  X,
  ChevronRight,
  ChevronDown,
  RotateCcw,
  Grid,
  List,
  ArrowRight,
  Check,
  ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { VerificationBadge } from "@/components/verification-badge";
import { getBusinessesAction, getCategoriesAction } from "@/app/actions/directory";
import type { Business, Category } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Building2 } from "lucide-react";

const districtOptions = [
  { label: "All Districts", value: "all" },
  { label: "District 3220 (Sri Lanka)", value: "3220" },
  { label: "District 3141 (Mumbai)", value: "3141" },
  { label: "District 3011 (Delhi NCR)", value: "3011" },
  { label: "District 3292 (Nepal)", value: "3292" },
];

const verificationBadges = [
  { label: "All Listings", value: "all" },
  { label: "DRR Verified", value: "2" },
  { label: "GST Verified", value: "1" },
  { label: "Standard Listings", value: "0" },
];

const sortOptions = [
  { label: "Verification Tier", value: "tier" },
  { label: "Alphabetical (A-Z)", value: "name" },
  { label: "Newest First", value: "newest" },
];

const ITEMS_PER_PAGE = 10;

interface CustomDropdownProps {
  label: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (val: string) => void;
}

function CustomDropdown({ label, value, options, onChange }: CustomDropdownProps) {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<"left" | "right" | "center">("left");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (open && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const menuWidth = 230;

      const overflowRight = rect.left + menuWidth > viewportWidth - 10;
      const overflowLeft = rect.right - menuWidth < 10;

      if (overflowRight && !overflowLeft) {
        setPlacement("right");
      } else if (overflowRight && overflowLeft) {
        setPlacement("center");
      } else {
        setPlacement("left");
      }
    }
  }, [open]);

  const selectedOption = options.find((o) => o.value === value) || options[0];

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          "flex items-center justify-between gap-2 px-3.5 py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer bg-white whitespace-nowrap",
          value !== "all" && value !== "tier"
            ? "border-[#D41367] text-[#D41367] bg-pink-50/40"
            : "border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50",
          open && "ring-2 ring-[#D41367]/20 border-[#D41367]"
        )}
      >
        <span>{selectedOption.label}</span>
        <ChevronDown className={cn("w-3.5 h-3.5 text-slate-400 transition-transform duration-200", open && "rotate-180 text-[#D41367]")} />
      </button>

      {open && (
        <div
          className={cn(
            "absolute mt-1.5 w-56 max-w-[calc(100vw-1.5rem)] bg-white rounded-2xl border border-slate-200 shadow-xl p-1.5 z-50 space-y-0.5 max-h-[70vh] overflow-y-auto overscroll-contain animate-in fade-in zoom-in-95 duration-150",
            placement === "right"
              ? "right-0 left-auto"
              : placement === "center"
              ? "left-1/2 -translate-x-1/2"
              : "left-0 right-auto"
          )}
        >
          <div className="px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-slate-400 border-b border-slate-100 mb-1 sticky top-0 bg-white z-10">
            {label}
          </div>
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className={cn(
                  "w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-left transition-colors cursor-pointer",
                  isSelected
                    ? "bg-pink-50 text-[#D41367] font-extrabold"
                    : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <span className="truncate">{opt.label}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-[#D41367] shrink-0 ml-1.5" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

import {
  getCachedDashboardData,
  setCachedDashboardData,
} from "@/lib/cache/admin-cache";

export default function DirectoryPage() {
  const cachedBiz = getCachedDashboardData<Business[]>("public_directory_businesses");
  const cachedCats = getCachedDashboardData<Category[]>("public_directory_categories");

  const [liveBusinesses, setLiveBusinesses] = useState<Business[]>(cachedBiz || []);
  const [categories, setCategories] = useState<Category[]>(cachedCats || []);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDistrict, setSelectedDistrict] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [sortBy, setSortBy] = useState<"tier" | "name" | "newest">("tier");
  const [viewMode, setViewMode] = useState<"cards" | "list">("cards");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(!cachedBiz || !cachedCats);

  useEffect(() => {
    async function loadData() {
      try {
        if (!cachedBiz || !cachedCats) {
          setIsLoading(true);
        }
        const [bizRes, catRes] = await Promise.all([
          getBusinessesAction({ page: 1, per_page: 100 }),
          getCategoriesAction(),
        ]);
        if (bizRes?.data) {
          setLiveBusinesses(bizRes.data);
          setCachedDashboardData("public_directory_businesses", bizRes.data);
        }
        if (catRes) {
          setCategories(catRes);
          setCachedDashboardData("public_directory_categories", catRes);
        }
      } catch (err) {
        console.error("Failed to load live businesses:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const sectorFilters = useMemo(() => {
    return [
      { label: "All Sectors", value: "all" },
      ...categories.map((c) => ({
        label: `${c.name} (${c.business_count || 0})`,
        value: c.slug,
      })),
    ];
  }, [categories]);

  // Filter businesses
  const filteredBusinesses = useMemo(() => {
    return liveBusinesses.filter((biz) => {
      // Keyword search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = biz.name.toLowerCase().includes(q);
        const matchesTagline = biz.tagline?.toLowerCase().includes(q) || false;
        const matchesDesc = biz.description?.toLowerCase().includes(q) || false;
        const matchesCat = biz.category?.name.toLowerCase().includes(q) || false;
        const matchesSubcat = biz.subcategory?.name.toLowerCase().includes(q) || false;
        const matchesCity = biz.location?.city?.toLowerCase().includes(q) || false;
        const matchesClub = biz.rotaract_profile?.club_name?.toLowerCase().includes(q) || false;
        if (!matchesName && !matchesTagline && !matchesDesc && !matchesCat && !matchesSubcat && !matchesCity && !matchesClub) {
          return false;
        }
      }

      // Sector filter
      if (selectedCategory !== "all") {
        if (biz.category?.slug !== selectedCategory && biz.subcategory?.slug !== selectedCategory) {
          return false;
        }
      }

      // District filter
      if (selectedDistrict !== "all") {
        const distNum = String(biz.rotaract_profile?.district_number || biz.district_number);
        if (distNum !== selectedDistrict) {
          return false;
        }
      }

      // Verification Level filter (0 = Standard, 1 = GST, 2 = DRR)
      if (selectedLevel !== "all") {
        const targetLevel = Number(selectedLevel);
        if (targetLevel === 2) {
          if (biz.verification_level < 2) return false;
        } else if (targetLevel === 1) {
          if (biz.verification_level !== 1) return false;
        } else if (targetLevel === 0) {
          if (biz.verification_level > 0) return false;
        }
      }

      return true;
    });
  }, [liveBusinesses, searchQuery, selectedCategory, selectedDistrict, selectedLevel]);

  // Sort businesses
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

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedDistrict, selectedLevel, sortBy]);

  // Paginated businesses (10 per page)
  const totalPages = Math.ceil(sortedBusinesses.length / ITEMS_PER_PAGE) || 1;
  const paginatedBusinesses = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedBusinesses.slice(start, start + ITEMS_PER_PAGE);
  }, [sortedBusinesses, currentPage]);

  const clearAll = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedDistrict("all");
    setSelectedLevel("all");
    setCurrentPage(1);
  };

  const hasFilters =
    searchQuery !== "" ||
    selectedCategory !== "all" ||
    selectedDistrict !== "all" ||
    selectedLevel !== "all";

  return (
    <div className="min-h-screen bg-white text-foreground pt-6 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

        {/* Compact Header (Matching Categories Page) */}
        <div className="space-y-4 pb-6 border-b border-border/60">
          <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground mb-2">
            <Link href="/" className="hover:text-[#D41367] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#D41367] font-bold">Directory</span>
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight flex items-center gap-2">
              Verified <span className="text-[#D41367]">Enterprises</span>
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground font-medium mt-1">
              Discover certified Rotaract entrepreneurs, service firms, and business leaders
            </p>
          </div>
        </div>

        {/* ================= STREAMLINED FILTER DOCK WITH CUSTOM DROPDOWNS ================= */}
        <div className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-3 sm:p-3.5 shadow-2xs">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2.5">
            {/* Search Input */}
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D41367]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Enterprise, Founder, Industry, or City"
                className="w-full pl-9.5 pr-8 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D41367]/20 focus:border-[#D41367]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Custom Dropdown Filters */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <CustomDropdown
                label="Industry Sector"
                value={selectedCategory}
                options={sectorFilters}
                onChange={setSelectedCategory}
              />

              <CustomDropdown
                label="District Region"
                value={selectedDistrict}
                options={districtOptions}
                onChange={setSelectedDistrict}
              />

              <CustomDropdown
                label="Trust & Accreditation"
                value={selectedLevel}
                options={verificationBadges}
                onChange={setSelectedLevel}
              />

              {hasFilters && (
                <button
                  onClick={clearAll}
                  className="inline-flex items-center justify-center gap-1 px-3 py-2 bg-pink-50 text-[#D41367] hover:bg-pink-100/80 rounded-xl text-xs font-extrabold transition-colors cursor-pointer shrink-0"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ================= RESULTS CONTROL ROW ================= */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs min-h-[36px]">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-center sm:text-left">
            {isLoading ? (
              <Skeleton className="h-7 w-44 rounded-full" />
            ) : sortedBusinesses.length > 0 ? (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium border border-slate-200/80 shadow-2xs">
                <span>Showing</span>
                {sortedBusinesses.length === 1 ? (
                  <span className="font-extrabold text-slate-900">1 enterprise</span>
                ) : sortedBusinesses.length <= ITEMS_PER_PAGE ? (
                  <span>
                    all <strong className="font-extrabold text-slate-900">{sortedBusinesses.length}</strong> enterprises
                  </span>
                ) : (
                  <span>
                    <strong className="font-extrabold text-slate-900">
                      {(currentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, sortedBusinesses.length)}
                    </strong>{" "}
                    of <strong className="font-extrabold text-slate-900">{sortedBusinesses.length}</strong> enterprises
                  </span>
                )}
              </div>
            ) : null}

            {!isLoading && hasFilters && (
              <>
                {searchQuery && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-pink-50 text-[#D41367] font-bold border border-pink-200 text-xs shadow-2xs">
                    &ldquo;{searchQuery}&rdquo;
                    <X className="w-3 h-3 cursor-pointer hover:opacity-80 ml-0.5" onClick={() => setSearchQuery("")} />
                  </span>
                )}
              </>
            )}
          </div>

          {/* Sort Custom Dropdown + View Switcher */}
          <div className="flex items-center justify-center gap-2.5 self-center sm:self-auto">
            <CustomDropdown
              label="Sort Listings"
              value={sortBy}
              options={sortOptions}
              onChange={(val) => setSortBy(val as "tier" | "name" | "newest")}
            />

            {/* View Switcher */}
            <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
              <button
                onClick={() => setViewMode("cards")}
                className={cn(
                  "px-2.5 py-1 rounded-md text-[11px] font-extrabold flex items-center gap-1 transition-all cursor-pointer",
                  viewMode === "cards"
                    ? "bg-white text-[#D41367] shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                )}
                title="Cards View"
              >
                <Grid className="w-3 h-3" />
                <span>Cards</span>
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={cn(
                  "px-2.5 py-1 rounded-md text-[11px] font-extrabold flex items-center gap-1 transition-all cursor-pointer",
                  viewMode === "list"
                    ? "bg-white text-[#D41367] shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                )}
                title="List View"
              >
                <List className="w-3 h-3" />
                <span>List</span>
              </button>
            </div>
          </div>
        </div>

        {/* ================= LISTINGS OR SKELETON LOADING ================= */}
        {isLoading ? (
          viewMode === "cards" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-slate-200/80 p-2.5 sm:p-3 flex flex-col justify-between space-y-3 shadow-2xs"
                >
                  <div className="space-y-2.5">
                    <Skeleton className="w-full h-28 sm:h-32 rounded-xl" />
                    <div className="space-y-1.5 pt-1">
                      <div className="flex items-center justify-between gap-2">
                        <Skeleton className="h-4 w-3/4 rounded-md" />
                        <Skeleton className="h-4 w-12 rounded-md" />
                      </div>
                      <Skeleton className="h-3 w-full rounded-md" />
                      <Skeleton className="h-3 w-2/3 rounded-md" />
                    </div>
                  </div>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <Skeleton className="h-3.5 w-20 rounded-md" />
                    <Skeleton className="h-7 w-20 rounded-xl" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-slate-200/80 p-3 sm:p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 shadow-2xs"
                >
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                    <Skeleton className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl shrink-0" />
                    <div className="space-y-2 flex-1 min-w-0">
                      <Skeleton className="h-4 w-48 rounded-md" />
                      <Skeleton className="h-3 w-72 max-w-full rounded-md" />
                      <Skeleton className="h-3 w-32 rounded-md" />
                    </div>
                  </div>
                  <Skeleton className="h-9 w-28 rounded-xl shrink-0 self-end sm:self-auto" />
                </div>
              ))}
            </div>
          )
        ) : paginatedBusinesses.length > 0 ? (
          <>
            {viewMode === "cards" ? (
              /* COMPACT CARDS WITH MINIMAP (3-4 COLUMNS) */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {paginatedBusinesses.map((biz) => {
                  const city = biz.location?.city || "National";
                  const displayImage = biz.cover_image_url || biz.logo_url;

                  return (
                    <div
                      key={biz.id}
                      className="group bg-white rounded-2xl border-2 border-[#D41367]/40 hover:border-[#D41367] p-2.5 sm:p-3 flex flex-col justify-between hover:shadow-lg hover:shadow-[#D41367]/10 transition-all duration-200"
                    >
                      <div className="space-y-2.5">
                        {/* Top Media Header */}
                        <div className="relative w-full h-32 rounded-xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-[#1e1b4b] flex items-center justify-center">
                          {displayImage ? (
                            <Image
                              src={displayImage}
                              alt={biz.name}
                              fill
                              sizes="(max-width: 768px) 100vw, 300px"
                              className="object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-95"
                              unoptimized
                            />
                          ) : (
                            <div className="flex flex-col items-center justify-center text-center p-3 text-white/80 group-hover:scale-105 transition-transform duration-300">
                              <Building2 className="w-8 h-8 text-pink-300 mb-1 opacity-80" />
                              <span className="text-[11px] font-black tracking-tight text-white line-clamp-1">
                                {biz.name}
                              </span>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/35 pointer-events-none" />

                          {/* Top Floating Right: GST / DRR Verification Badge */}
                          <div className="absolute top-2 right-2 z-10">
                            <VerificationBadge level={biz.verification_level} size="sm" />
                          </div>

                          {/* Bottom Image Overlay: Location */}
                          <div className="absolute bottom-2 left-2 z-10">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-white text-[10px] font-bold">
                              <MapPin className="w-3 h-3 text-[#D41367]" />
                              <span>{city}</span>
                            </span>
                          </div>
                        </div>

                        {/* Card Info */}
                        <div className="space-y-1 px-0.5">
                          <Link href={`/business/${biz.slug}`} className="group-hover:text-[#D41367] transition-colors block">
                            <h3 className="text-sm font-black text-slate-900 tracking-tight leading-snug line-clamp-1">
                              {biz.name}
                            </h3>
                          </Link>
                          {biz.tagline && (
                            <p className="text-[11px] font-medium text-slate-500 line-clamp-1">
                              {biz.tagline}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Card Footer Strip */}
                      <div className="pt-2.5 mt-2 border-t border-slate-100 flex items-center justify-between px-0.5">
                        <span className="text-[10px] font-semibold text-slate-400 truncate">
                          {biz.category?.name || "Enterprise"}
                        </span>
                        <Link
                          href={`/business/${biz.slug}`}
                          className="inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-xl bg-slate-900 group-hover:bg-[#D41367] text-white text-[11px] font-extrabold shadow-2xs hover:scale-105 active:scale-95 transition-all"
                        >
                          <span>View Profile</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* MODERN SLEEK LIST VIEW */
              <div className="space-y-3">
                {paginatedBusinesses.map((biz) => {
                  const city = biz.location?.city || "National";
                  const displayImage = biz.cover_image_url || biz.logo_url;

                  return (
                    <div
                      key={biz.id}
                      className="group bg-white rounded-2xl border-2 border-[#D41367]/40 hover:border-[#D41367] p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 hover:shadow-md hover:shadow-[#D41367]/10 transition-all duration-200"
                    >
                      {/* Left side: Thumbnail + Info */}
                      <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                        <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-pink-950 shrink-0 flex items-center justify-center">
                          {displayImage ? (
                            <Image
                              src={displayImage}
                              alt={biz.name}
                              fill
                              sizes="80px"
                              className="object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-95"
                              unoptimized
                            />
                          ) : (
                            <Building2 className="w-7 h-7 text-pink-300 opacity-80" />
                          )}
                          <div className="absolute inset-0 bg-black/10 pointer-events-none" />
                        </div>

                        <div className="min-w-0 flex-1 space-y-1">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <Link
                              href={`/business/${biz.slug}`}
                              className="font-black text-sm sm:text-base text-slate-900 group-hover:text-[#D41367] transition-colors truncate"
                            >
                              {biz.name}
                            </Link>
                            <VerificationBadge level={biz.verification_level} size="sm" />
                          </div>

                          {biz.tagline && (
                            <p className="text-xs text-slate-500 font-medium line-clamp-1">
                              {biz.tagline}
                            </p>
                          )}

                          <div className="flex flex-wrap items-center gap-2 pt-0.5 text-[11px]">
                            {biz.category && (
                              <span className="px-2 py-0.5 rounded-md bg-pink-50 text-[#D41367] font-extrabold text-[10px]">
                                {biz.category.name}
                              </span>
                            )}
                            <span className="inline-flex items-center gap-1 text-slate-500 font-semibold">
                              <MapPin className="w-3 h-3 text-[#D41367]" />
                              <span>{city}</span>
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right side: Action CTA Button */}
                      <div className="flex items-center justify-end sm:shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                        <Link
                          href={`/business/${biz.slug}`}
                          className="inline-flex items-center justify-center gap-1.5 w-full sm:w-auto px-4 py-2 rounded-xl bg-slate-900 group-hover:bg-[#D41367] text-white text-xs font-extrabold shadow-2xs hover:scale-105 active:scale-95 transition-all"
                        >
                          <span>View Profile</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* ================= PAGINATION BAR (10 PER PAGE) ================= */}
            {totalPages > 1 && (
              <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-slate-500 font-medium">
                  Page <span className="font-extrabold text-slate-900">{currentPage}</span> of <span className="font-extrabold text-slate-900">{totalPages}</span>
                </p>

                <div className="flex items-center gap-1.5">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="h-8 text-xs font-bold rounded-xl border-slate-200 disabled:opacity-40 cursor-pointer"
                  >
                    <ChevronLeft className="w-3.5 h-3.5 mr-1" />
                    Previous
                  </Button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={cn(
                          "w-8 h-8 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center justify-center",
                          currentPage === pageNum
                            ? "bg-[#D41367] text-white shadow-xs"
                            : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                        )}
                      >
                        {pageNum}
                      </button>
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="h-8 text-xs font-bold rounded-xl border-slate-200 disabled:opacity-40 cursor-pointer"
                  >
                    Next
                    <ChevronRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </div>
              </div>
            )}
          </>
        ) : (
          /* CLEAN MINIMAL EMPTY STATE */
          <div className="bg-slate-50/70 rounded-2xl border border-slate-200/80 py-16 px-6 text-center max-w-md mx-auto space-y-3 my-8">
            <Search className="w-7 h-7 text-[#D41367] mx-auto opacity-75" />
            <h3 className="text-sm font-bold text-slate-800 tracking-tight">No Enterprises Found</h3>
            <p className="text-xs text-slate-500">Try adjusting your filters or search terms.</p>
            {hasFilters && (
              <button
                onClick={clearAll}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-pink-50 text-[#D41367] hover:bg-pink-100 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset All Filters</span>
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
