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
  Factory,
  ShoppingBag,
  Briefcase,
  Cpu,
  Heart,
  GraduationCap,
  UtensilsCrossed,
  Building,
  Palette,
  MoreHorizontal,
  Layers,
  ShieldCheck,
  PhoneCall,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { VerificationBadge } from "@/components/verification-badge";
import { cn } from "@/lib/utils";
import type { Business, Category } from "@/lib/types";

const iconMap: Record<string, React.ElementType> = {
  manufacturing: Factory,
  retail: ShoppingBag,
  "professional-services": Briefcase,
  technology: Cpu,
  healthcare: Heart,
  education: GraduationCap,
  hospitality: UtensilsCrossed,
  "real-estate-construction": Building,
  "creative-services": Palette,
  others: MoreHorizontal,
};

const categoryImages: Record<string, string> = {
  "professional-services": "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
  technology: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
  healthcare: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80",
  "creative-services": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
  "real-estate-construction": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
  manufacturing: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
  retail: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
  education: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
  hospitality: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
  others: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80",
};

const categoryDescriptions: Record<string, string> = {
  technology: "Discover certified software development agencies, SaaS innovators, AI & ML specialists, and cloud engineering leaders.",
  "professional-services": "Connect with verified legal counsel, chartered accountants, management consultants, and corporate strategists.",
  "creative-services": "Explore top-tier visual branding agencies, UI/UX designers, videographers, and digital media production studios.",
  healthcare: "Access trusted healthcare clinics, dental studios, diagnostic centers, and wellness facilities led by Rotaractors.",
  "real-estate-construction": "Partner with accredited architects, civil builders, interior decorators, and real estate developers.",
  manufacturing: "Source high-precision engineering, industrial machinery, textile garments, and food production enterprises.",
  retail: "Shop from verified fashion boutiques, consumer goods brands, electronics retailers, and specialized suppliers.",
  education: "Engage with progressive coaching academies, professional training institutes, and EdTech platforms.",
  hospitality: "Book boutique hotels, gourmet catering services, restaurants, and premier event management specialists.",
  others: "Explore emerging industry leaders across logistics, agro-business, trade finance, and non-profit initiatives.",
};

const districtOptions = [
  { label: "All Districts", value: "all" },
  { label: "District 3220 (Sri Lanka)", value: "3220" },
  { label: "District 3141 (Mumbai)", value: "3141" },
  { label: "District 3011 (Delhi NCR)", value: "3011" },
  { label: "District 3292 (Nepal)", value: "3292" },
  { label: "District 9110 (Lagos)", value: "9110" },
  { label: "District 9675 (Sydney)", value: "9675" },
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

const ITEMS_PER_PAGE = 8;

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

interface CategoryDetailViewProps {
  category: Category;
  businesses: Business[];
  allCategories: Category[];
}

export function CategoryDetailView({
  category,
  businesses,
  allCategories,
}: CategoryDetailViewProps) {
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("all");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"tier" | "name" | "newest">("tier");
  const [viewMode, setViewMode] = useState<"cards" | "list">("cards");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const IconComponent = iconMap[category.slug] || Layers;
  const bgImage = categoryImages[category.slug] || categoryImages["others"];
  const descriptionText =
    categoryDescriptions[category.slug] ||
    `Explore verified Rotaract businesses, founders, and enterprises in ${category.name}.`;

  const subcategories = category.children || [];

  // Filter businesses
  const filteredBusinesses = useMemo(() => {
    return businesses.filter((biz) => {
      // Subcategory filter
      if (selectedSubcategory !== "all") {
        if (
          biz.subcategory?.slug !== selectedSubcategory &&
          biz.subcategory_id !== selectedSubcategory &&
          biz.subcategory?.id !== selectedSubcategory
        ) {
          return false;
        }
      }

      // Keyword search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = biz.name.toLowerCase().includes(q);
        const matchesTagline = biz.tagline?.toLowerCase().includes(q) || false;
        const matchesDesc = biz.description?.toLowerCase().includes(q) || false;
        const matchesSubcat = biz.subcategory?.name.toLowerCase().includes(q) || false;
        const matchesCity = biz.location?.city?.toLowerCase().includes(q) || false;
        const matchesClub = biz.rotaract_profile?.club_name?.toLowerCase().includes(q) || false;
        if (!matchesName && !matchesTagline && !matchesDesc && !matchesSubcat && !matchesCity && !matchesClub) {
          return false;
        }
      }

      // District filter
      if (selectedDistrict !== "all") {
        if (String(biz.rotaract_profile?.district_number) !== selectedDistrict) {
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
  }, [businesses, selectedSubcategory, searchQuery, selectedDistrict, selectedLevel]);

  // Sort businesses
  const sortedBusinesses = useMemo(() => {
    return [...filteredBusinesses].sort((a, b) => {
      if (sortBy === "tier") {
        if (b.verification_level !== a.verification_level) {
          return b.verification_level - a.verification_level;
        }
        return (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0);
      }
      if (sortBy === "newest") {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });
  }, [filteredBusinesses, sortBy]);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedSubcategory, selectedDistrict, selectedLevel, sortBy]);

  // Paginated businesses
  const totalPages = Math.ceil(sortedBusinesses.length / ITEMS_PER_PAGE) || 1;
  const paginatedBusinesses = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedBusinesses.slice(start, start + ITEMS_PER_PAGE);
  }, [sortedBusinesses, currentPage]);

  const clearAll = () => {
    setSelectedSubcategory("all");
    setSearchQuery("");
    setSelectedDistrict("all");
    setSelectedLevel("all");
    setCurrentPage(1);
  };

  const hasFilters =
    selectedSubcategory !== "all" ||
    searchQuery !== "" ||
    selectedDistrict !== "all" ||
    selectedLevel !== "all";

  // Other categories for bottom cross-navigation
  const otherCategories = useMemo(() => {
    return allCategories.filter((c) => c.slug !== category.slug).slice(0, 4);
  }, [allCategories, category.slug]);

  // Calculate count per subcategory
  const subcategoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    subcategories.forEach((sub) => {
      counts[sub.slug] = businesses.filter(
        (b) => b.subcategory?.slug === sub.slug || b.subcategory_id === sub.id
      ).length;
    });
    return counts;
  }, [subcategories, businesses]);

  return (
    <div className="min-h-screen bg-white text-foreground pt-6 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

        {/* ================= BREADCRUMBS ================= */}
        <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground mb-2">
          <Link href="/" className="hover:text-[#D41367] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/categories" className="hover:text-[#D41367] transition-colors">
            Categories
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#D41367] font-bold">{category.name}</span>
        </div>

        {/* ================= SECTOR HERO BANNER CARD ================= */}
        <div className="relative rounded-3xl overflow-hidden shadow-lg border border-pink-100/60 min-h-[260px] sm:min-h-[290px] flex flex-col justify-between p-6 sm:p-9 bg-slate-950 text-white">
          <Image
            src={bgImage}
            alt={category.name}
            fill
            unoptimized
            sizes="100vw"
            className="object-cover object-center opacity-45 transition-transform duration-700 hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/30 pointer-events-none" />

          {/* Top Row: Icon Badge & Sector Label */}
          <div className="relative z-10 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center shadow-md">
                <IconComponent className="w-6 h-6 text-white" />
              </div>
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-xs font-semibold text-white">
                <ShieldCheck className="w-3.5 h-3.5 text-pink-200" />
                <span>Verified Sector Directory</span>
              </div>
            </div>
          </div>

          {/* Bottom Row: Heading, Description & Quick Metrics */}
          <div className="relative z-10 space-y-3 mt-8">
            <div className="max-w-3xl space-y-1.5">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
                {category.name}
              </h1>
              <p className="text-xs sm:text-sm text-white/85 font-medium leading-relaxed max-w-2xl">
                {descriptionText}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>{businesses.length} Verified {businesses.length === 1 ? "Enterprise" : "Enterprises"}</span>
              </div>
              {subcategories.length > 0 && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold">
                  <Layers className="w-3.5 h-3.5 text-pink-300" />
                  <span>{subcategories.length} Specializations</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ================= SPECIALIZATIONS FILTER PILLS ================= */}
        {subcategories.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                Specializations in {category.name}
              </span>
              {selectedSubcategory !== "all" && (
                <button
                  onClick={() => setSelectedSubcategory("all")}
                  className="text-xs font-bold text-[#D41367] hover:underline cursor-pointer"
                >
                  Show All ({businesses.length})
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => setSelectedSubcategory("all")}
                className={cn(
                  "px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 border",
                  selectedSubcategory === "all"
                    ? "bg-[#D41367] text-white border-[#D41367] shadow-sm"
                    : "bg-slate-100 hover:bg-pink-50 text-slate-700 hover:text-[#D41367] border-transparent"
                )}
              >
                <span>All Specializations</span>
                <span
                  className={cn(
                    "text-[10px] px-1.5 py-0.2 rounded-full font-black",
                    selectedSubcategory === "all" ? "bg-white/25 text-white" : "bg-slate-200 text-slate-600"
                  )}
                >
                  {businesses.length}
                </span>
              </button>

              {subcategories.map((sub) => {
                const isSelected = selectedSubcategory === sub.slug || selectedSubcategory === sub.id;
                const count = subcategoryCounts[sub.slug] ?? 0;

                return (
                  <button
                    key={sub.id}
                    type="button"
                    onClick={() => setSelectedSubcategory(sub.slug)}
                    className={cn(
                      "px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 border",
                      isSelected
                        ? "bg-[#D41367] text-white border-[#D41367] shadow-sm"
                        : "bg-slate-100 hover:bg-pink-50 text-slate-700 hover:text-[#D41367] border-transparent"
                    )}
                  >
                    <span>{sub.name}</span>
                    {count > 0 && (
                      <span
                        className={cn(
                          "text-[10px] px-1.5 py-0.2 rounded-full font-black",
                          isSelected ? "bg-white/25 text-white" : "bg-slate-200 text-slate-600"
                        )}
                      >
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= STREAMLINED FILTER DOCK ================= */}
        <div className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-3 sm:p-3.5 shadow-2xs">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2.5">
            {/* Search Input */}
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D41367]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search enterprises, founders, or services in ${category.name}...`}
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
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-center sm:text-left">
            <span className="font-bold text-slate-500">
              Showing <span className="font-extrabold text-slate-900">{sortedBusinesses.length > 0 ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0}–{Math.min(currentPage * ITEMS_PER_PAGE, sortedBusinesses.length)}</span> of <span className="font-extrabold text-slate-900">{sortedBusinesses.length}</span> enterprises
            </span>

            {hasFilters && (
              <>
                <span className="text-slate-300">•</span>
                {selectedSubcategory !== "all" && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-pink-50 text-[#D41367] font-bold border border-pink-200 text-[10px]">
                    {subcategories.find((s) => s.slug === selectedSubcategory || s.id === selectedSubcategory)?.name || selectedSubcategory}
                    <X className="w-2.5 h-2.5 cursor-pointer hover:opacity-80" onClick={() => setSelectedSubcategory("all")} />
                  </span>
                )}
                {searchQuery && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-pink-50 text-[#D41367] font-bold border border-pink-200 text-[10px]">
                    &ldquo;{searchQuery}&rdquo;
                    <X className="w-2.5 h-2.5 cursor-pointer hover:opacity-80" onClick={() => setSearchQuery("")} />
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

        {/* ================= BUSINESSES LISTINGS ================= */}
        {paginatedBusinesses.length > 0 ? (
          <>
            {viewMode === "cards" ? (
              /* COMPACT CARDS (3-4 COLUMNS) */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {paginatedBusinesses.map((biz) => {
                  const city = biz.location?.city || "National";
                  const district = biz.rotaract_profile?.district_number;
                  const catSlug = biz.category?.slug || category.slug || "others";
                  const imageUrl = categoryImages[catSlug] || categoryImages["others"];

                  return (
                    <div
                      key={biz.id}
                      className="group bg-white rounded-2xl border-2 border-[#D41367]/40 hover:border-[#D41367] p-2.5 sm:p-3 flex flex-col justify-between hover:shadow-lg hover:shadow-[#D41367]/10 transition-all duration-200"
                    >
                      <div className="space-y-2.5">
                        {/* Top Media Header (Compact Height) */}
                        <div className="relative w-full h-28 sm:h-32 rounded-xl overflow-hidden bg-slate-900">
                          <Image
                            src={imageUrl}
                            alt={biz.name}
                            fill
                            sizes="(max-width: 768px) 100vw, 300px"
                            className="object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90"
                            unoptimized
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                          {/* Floating Top Badges */}
                          <div className="absolute top-2 left-2 right-2 flex items-center justify-between pointer-events-none">
                            {biz.subcategory ? (
                              <span className="px-2 py-0.5 rounded-md bg-white/95 backdrop-blur-md text-[10px] font-extrabold text-slate-900 shadow-xs">
                                {biz.subcategory.name}
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded-md bg-white/95 backdrop-blur-md text-[10px] font-extrabold text-slate-900 shadow-xs">
                                {category.name}
                              </span>
                            )}

                            <div className="flex items-center gap-1 pointer-events-auto">
                              <VerificationBadge level={biz.verification_level} size="sm" />
                              {biz.is_featured && (
                                <span className="inline-flex items-center text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-pink-50 text-[#D41367] border border-pink-200 shadow-xs">
                                  Featured
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Bottom Image Overlay Location */}
                          <div className="absolute bottom-2 left-2 z-10">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-white text-[10px] font-bold">
                              <MapPin className="w-3 h-3 text-[#D41367]" />
                              <span>{city}</span>
                            </span>
                          </div>
                        </div>

                        {/* Card Info */}
                        <div className="space-y-0.5 px-0.5">
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
                      <div className="pt-2.5 mt-2 border-t border-slate-100 flex items-center justify-end px-0.5">
                        <Link
                          href={`/business/${biz.slug}`}
                          className="inline-flex items-center justify-center gap-1 w-full sm:w-auto px-3.5 py-1.5 rounded-xl bg-slate-900 group-hover:bg-[#D41367] text-white text-[11px] font-extrabold shadow-2xs hover:scale-105 active:scale-95 transition-all"
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
                  const district = biz.rotaract_profile?.district_number;
                  const catSlug = biz.category?.slug || category.slug || "others";
                  const imageUrl = categoryImages[catSlug] || categoryImages["others"];

                  return (
                    <div
                      key={biz.id}
                      className="group bg-white rounded-2xl border-2 border-[#D41367]/40 hover:border-[#D41367] p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 hover:shadow-md hover:shadow-[#D41367]/10 transition-all duration-200"
                    >
                      {/* Left side: Thumbnail + Info */}
                      <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                        <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-slate-900 shrink-0">
                          <Image
                            src={imageUrl}
                            alt={biz.name}
                            fill
                            sizes="80px"
                            className="object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90"
                            unoptimized
                          />
                          <div className="absolute inset-0 bg-black/20 pointer-events-none" />
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
                            {biz.is_featured && (
                              <span className="inline-flex items-center text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-pink-50 text-[#D41367] border border-pink-200">
                                Featured
                              </span>
                            )}
                          </div>

                          {biz.tagline && (
                            <p className="text-xs text-slate-500 font-medium line-clamp-1">
                              {biz.tagline}
                            </p>
                          )}

                          <div className="flex flex-wrap items-center gap-2 pt-0.5 text-[11px]">
                            {biz.subcategory ? (
                              <span className="px-2 py-0.5 rounded-md bg-pink-50 text-[#D41367] font-extrabold text-[10px]">
                                {biz.subcategory.name}
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded-md bg-pink-50 text-[#D41367] font-extrabold text-[10px]">
                                {category.name}
                              </span>
                            )}
                            {district && (
                              <span className="font-bold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded text-[10px]">
                                Dist {district}
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

            {/* ================= PAGINATION BAR ================= */}
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
          /* ================= EMPTY STATE ================= */
          <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-10 sm:p-12 text-center max-w-lg mx-auto space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-pink-50 text-[#D41367] flex items-center justify-center mx-auto shadow-2xs">
              <Search className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-black text-slate-900">
                No Enterprises Found in this Selection
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
                {hasFilters
                  ? "No businesses currently match your search criteria or specialization filter. Try resetting filters to explore all listings."
                  : `Be the first certified Rotaract entrepreneur to list your enterprise under ${category.name}.`}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              {hasFilters && (
                <Button
                  onClick={clearAll}
                  variant="outline"
                  className="border-slate-200 text-slate-700 hover:text-slate-900 rounded-full px-5 text-xs font-extrabold h-9"
                >
                  Reset Filters
                </Button>
              )}
              <Button
                asChild
                className="bg-[#D41367] hover:bg-[#B80E56] text-white rounded-full px-5 text-xs font-extrabold h-9"
              >
                <Link href="/register">
                  <span>Register Enterprise</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Link>
              </Button>
            </div>
          </div>
        )}

        {/* ================= EXPLORE OTHER CATEGORIES ================= */}
        {otherCategories.length > 0 && (
          <div className="pt-12 border-t border-slate-100 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                  Explore Other Industry Sectors
                </h2>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Browse verified Rotaract enterprises across other industry categories
                </p>
              </div>

              <Link
                href="/categories"
                className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#D41367] hover:underline shrink-0"
              >
                <span>View All Categories</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {otherCategories.map((otherCat) => {
                const OtherIcon = iconMap[otherCat.slug] || Layers;
                const otherImg = categoryImages[otherCat.slug] || categoryImages["others"];

                return (
                  <Link
                    key={otherCat.id}
                    href={`/categories/${otherCat.slug}`}
                    className="group relative rounded-2xl overflow-hidden min-h-[140px] shadow-sm hover:shadow-md transition-all duration-300 border border-slate-200/80 block"
                  >
                    <Image
                      src={otherImg}
                      alt={otherCat.name}
                      fill
                      unoptimized
                      sizes="(max-width: 768px) 100vw, 300px"
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20 p-4 flex flex-col justify-between text-white">
                      <div className="flex items-center justify-between">
                        <div className="w-7 h-7 rounded-xl bg-white/20 backdrop-blur-md text-white flex items-center justify-center">
                          <OtherIcon className="w-3.5 h-3.5 text-white" />
                        </div>
                        <span className="text-[10px] font-extrabold bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/25">
                          {otherCat.business_count || "100+"}
                        </span>
                      </div>

                      <div className="flex items-end justify-between gap-2">
                        <div>
                          <h3 className="text-sm font-black text-white group-hover:text-pink-200 transition-colors line-clamp-1">
                            {otherCat.name}
                          </h3>
                          <p className="text-[10px] text-white/80 font-medium">
                            {otherCat.children?.length || 0} Specializations
                          </p>
                        </div>
                        <div className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center shrink-0 group-hover:bg-[#D41367] group-hover:text-white transition-all">
                          <ArrowRight className="w-3 h-3" />
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
