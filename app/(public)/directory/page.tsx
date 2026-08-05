"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  MapPin,
  Filter,
  Grid,
  List,
  ArrowUpDown,
  ShieldCheck,
  Star,
  X,
  ChevronLeft,
  ChevronRight,
  PhoneCall,
  ExternalLink,
  Briefcase,
  Globe,
  Sparkles,
  Building2,
  CheckCircle2,
  Award,
  SlidersHorizontal,
  RotateCcw,
  Tag,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { VerificationBadge } from "@/components/verification-badge";
import { mockBusinesses, mockCategories } from "@/lib/mock-data";
import type { Business } from "@/lib/types";

// Featured sector chips for top header ribbon
const sectorChips = [
  { label: "All Sectors", slug: "all" },
  { label: "Technology & SaaS", slug: "technology" },
  { label: "Professional Services", slug: "professional-services" },
  { label: "Creative Services", slug: "creative-services" },
  { label: "Healthcare & Medicine", slug: "healthcare" },
  { label: "Manufacturing", slug: "manufacturing" },
  { label: "Real Estate & Construction", slug: "real-estate-construction" },
];

export default function DirectoryPage() {
  // State management
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTier, setSelectedTier] = useState("all");
  const [badgeFilters, setBadgeFilters] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("Verification Tier");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Toggle attribute checkbox
  const toggleBadgeFilter = (badge: string) => {
    setBadgeFilters((prev) =>
      prev.includes(badge) ? prev.filter((b) => b !== badge) : [...prev, badge]
    );
  };

  // Filter logic
  const filteredBusinesses = useMemo(() => {
    return mockBusinesses.filter((biz) => {
      // Keyword search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = biz.name.toLowerCase().includes(q);
        const matchesTagline = biz.tagline?.toLowerCase().includes(q);
        const matchesDesc = biz.description?.toLowerCase().includes(q);
        const matchesCategory = biz.category?.name.toLowerCase().includes(q);
        const matchesSubcategory = biz.subcategory?.name.toLowerCase().includes(q);
        if (!matchesName && !matchesTagline && !matchesDesc && !matchesCategory && !matchesSubcategory) {
          return false;
        }
      }

      // Location search
      if (locationQuery.trim()) {
        const loc = locationQuery.toLowerCase();
        const city = biz.location?.city?.toLowerCase() || "";
        const country = biz.location?.country?.toLowerCase() || "";
        const state = biz.location?.state?.toLowerCase() || "";
        const district = biz.rotaract_profile?.district_number?.toString() || "";
        if (!city.includes(loc) && !country.includes(loc) && !state.includes(loc) && !district.includes(loc)) {
          return false;
        }
      }

      // Category filter
      if (selectedCategory !== "all") {
        if (biz.category?.slug !== selectedCategory && biz.subcategory?.slug !== selectedCategory) {
          return false;
        }
      }

      // Verification tier filter
      if (selectedTier !== "all") {
        const level = parseInt(selectedTier, 10);
        if (biz.verification_level !== level) {
          return false;
        }
      }

      // Attributes filter
      if (badgeFilters.includes("featured") && !biz.is_featured) return false;
      if (badgeFilters.includes("women_owned") && !biz.is_women_owned) return false;
      if (badgeFilters.includes("startup") && !biz.is_startup) return false;

      return true;
    });
  }, [searchQuery, locationQuery, selectedCategory, selectedTier, badgeFilters]);

  // Sort logic
  const sortedBusinesses = useMemo(() => {
    return [...filteredBusinesses].sort((a, b) => {
      if (sortBy === "Verification Tier" || sortBy === "tier") {
        if (b.verification_level !== a.verification_level) {
          return b.verification_level - a.verification_level;
        }
        return (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0);
      }
      if (sortBy === "Newest Members" || sortBy === "newest") {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
      if (sortBy === "Name (A-Z)" || sortBy === "name") {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === "Featured First" || sortBy === "featured") {
        return (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0);
      }
      return 0;
    });
  }, [filteredBusinesses, sortBy]);

  // Active filter tags for quick removal
  const activeFilterTags = useMemo(() => {
    const tags: { id: string; label: string; type: string }[] = [];
    if (searchQuery) tags.push({ id: "q", label: `"${searchQuery}"`, type: "search" });
    if (locationQuery) tags.push({ id: "loc", label: `Location: ${locationQuery}`, type: "location" });
    if (selectedCategory !== "all") {
      const catObj = mockCategories.find((c) => c.slug === selectedCategory);
      tags.push({ id: "cat", label: catObj?.name || selectedCategory, type: "category" });
    }
    if (selectedTier !== "all") {
      const tierName = selectedTier === "3" ? "Gold Tier" : selectedTier === "2" ? "Silver Tier" : "Bronze Tier";
      tags.push({ id: "tier", label: tierName, type: "tier" });
    }
    if (badgeFilters.includes("featured")) tags.push({ id: "b_feat", label: "Featured", type: "badge_featured" });
    if (badgeFilters.includes("women_owned")) tags.push({ id: "b_women", label: "Women Owned", type: "badge_women" });
    if (badgeFilters.includes("startup")) tags.push({ id: "b_start", label: "Startup", type: "badge_startup" });
    return tags;
  }, [searchQuery, locationQuery, selectedCategory, selectedTier, badgeFilters]);

  const removeFilterTag = (type: string) => {
    if (type === "search") setSearchQuery("");
    if (type === "location") setLocationQuery("");
    if (type === "category") setSelectedCategory("all");
    if (type === "tier") setSelectedTier("all");
    if (type === "badge_featured") toggleBadgeFilter("featured");
    if (type === "badge_women") toggleBadgeFilter("women_owned");
    if (type === "badge_startup") toggleBadgeFilter("startup");
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setLocationQuery("");
    setSelectedCategory("all");
    setSelectedTier("all");
    setBadgeFilters([]);
  };

  // Helper for logo / icon
  const getLogoImage = (biz: Business) => {
    if (biz.slug.includes("nexus") || biz.slug.includes("lumina")) return "/images/logo-tech.png";
    if (biz.slug.includes("dental") || biz.slug.includes("studio")) return "/images/logo-dental.png";
    if (biz.slug.includes("vivid") || biz.slug.includes("design")) return "/images/logo-design.png";
    return null;
  };

  return (
    <div className="min-h-screen bg-[#FAF6F4] text-foreground pt-6 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Top Header & Search Card */}
        <div className="bg-white rounded-3xl p-6 border border-pink-100/90 shadow-sm space-y-4">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
            <Link href="/" className="hover:text-[#D41367] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#D41367] font-bold">Directory</span>
          </div>

          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Page Title */}
            <div className="shrink-0">
              <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight flex items-center gap-2">
                Business <span className="text-[#D41367]">Directory</span>
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground font-medium">
                Verified Rotaract entrepreneurs & service leaders worldwide
              </p>
            </div>

            {/* Integrated Search Input Box */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-warm-bg rounded-2xl p-1.5 border border-border flex-1 max-w-2xl">
              <div className="flex items-center gap-2 px-3 py-1.5 flex-1">
                <Search className="w-4 h-4 text-[#D41367] shrink-0" />
                <input
                  type="text"
                  placeholder="Business, service, keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-xs bg-transparent outline-none placeholder:text-muted-foreground font-medium"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="text-muted-foreground hover:text-[#D41367]">
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="hidden sm:block w-px h-5 bg-border/70" />

              <div className="flex items-center gap-2 px-3 py-1.5 flex-1">
                <MapPin className="w-4 h-4 text-[#D41367] shrink-0" />
                <input
                  type="text"
                  placeholder="City, country, district..."
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                  className="w-full text-xs bg-transparent outline-none placeholder:text-muted-foreground font-medium"
                />
                {locationQuery && (
                  <button onClick={() => setLocationQuery("")} className="text-muted-foreground hover:text-[#D41367]">
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Quick Sector Navigation Chips */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs pt-3 border-t border-border/40">
            <span className="font-extrabold text-muted-foreground uppercase tracking-wider text-[10px] mr-1">
              Sectors:
            </span>
            {sectorChips.map((chip) => {
              const isActive = selectedCategory === chip.slug;
              return (
                <button
                  key={chip.slug}
                  onClick={() => setSelectedCategory(chip.slug)}
                  className={`px-3 py-1 rounded-full font-bold transition-all text-[11px] ${
                    isActive
                      ? "bg-[#D41367] text-white shadow-xs"
                      : "bg-warm-bg text-muted-foreground hover:text-[#D41367] hover:bg-[#FEE8F0]"
                  }`}
                >
                  {chip.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Controls Ribbon Card */}
        <div className="bg-white rounded-2xl p-4 border border-pink-100/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Left: Active Filters Ribbon & Counter */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-foreground mr-2 shrink-0">
              {sortedBusinesses.length} {sortedBusinesses.length === 1 ? "Result" : "Results"}
            </span>

            {activeFilterTags.map((tag) => (
              <span
                key={tag.id}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEE8F0] text-[#D41367] text-xs font-bold border border-pink-200/70"
              >
                <span>{tag.label}</span>
                <button
                  onClick={() => removeFilterTag(tag.type)}
                  className="hover:bg-[#D41367]/10 rounded-full p-0.5 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}

            {activeFilterTags.length > 0 && (
              <button
                onClick={clearAllFilters}
                className="text-xs font-extrabold text-[#D41367] hover:underline ml-1 flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            )}
          </div>

          {/* Right: Controls (Mobile Filter Button, Sort Dropdown & Grid/List View Mode) */}
          <div className="flex items-center justify-between md:justify-end gap-3 shrink-0">
            {/* Mobile Filter Drawer Button */}
            <Button
              variant="outline"
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className="lg:hidden rounded-2xl border-pink-100 text-xs font-bold gap-1.5 h-10 px-3.5 bg-warm-bg"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#D41367]" />
              <span>Filters ({activeFilterTags.length})</span>
            </Button>

            {/* Sort Dropdown */}
            <div className="shrink-0">
              <Select value={sortBy} onValueChange={(val) => setSortBy(val || "Verification Tier")}>
                <SelectTrigger className="w-[170px] sm:w-[190px] h-10 bg-warm-bg rounded-2xl px-3.5 border border-pink-100/90 text-xs font-semibold text-muted-foreground shadow-xs gap-1.5 focus:ring-0">
                  <ArrowUpDown className="w-3.5 h-3.5 text-[#D41367] shrink-0" />
                  <span className="uppercase text-[10px] tracking-wider font-extrabold shrink-0">SORT:</span>
                  <SelectValue placeholder="Sort" className="text-[#D41367] font-bold truncate" />
                </SelectTrigger>
                <SelectContent className="bg-white rounded-2xl border border-border shadow-lg min-w-[170px]">
                  <SelectItem value="Verification Tier">Verification Tier</SelectItem>
                  <SelectItem value="Featured First">Featured First</SelectItem>
                  <SelectItem value="Newest Members">Newest Members</SelectItem>
                  <SelectItem value="Name (A-Z)">Name (A-Z)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Dual View Toggle Buttons */}
            <div className="bg-warm-bg p-1 rounded-2xl border border-pink-100 flex items-center gap-1 shadow-xs">
              <button
                onClick={() => setViewMode("grid")}
                title="Grid View"
                className={`p-2 rounded-xl text-xs transition-all ${
                  viewMode === "grid"
                    ? "bg-[#D41367] text-white shadow-xs font-bold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                title="List View"
                className={`p-2 rounded-xl text-xs transition-all ${
                  viewMode === "list"
                    ? "bg-[#D41367] text-white shadow-xs font-bold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Directory Main Layout (Sidebar Filters + Business Cards Grid/List) */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* DESKTOP SIDEBAR FILTER PANEL CARD */}
          <aside
            className={`lg:col-span-3 bg-white rounded-3xl border border-pink-100/90 p-6 shadow-xs space-y-6 ${
              isMobileFilterOpen ? "block" : "hidden lg:block"
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-border/60">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-[#D41367]" />
                <h3 className="font-extrabold text-sm text-foreground uppercase tracking-wider">
                  Filter Network
                </h3>
              </div>
              {activeFilterTags.length > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="text-[11px] font-extrabold text-[#D41367] hover:underline uppercase tracking-wider"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Section 1: Verification Level */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#D41367]" />
                <span>Verification Standing</span>
              </h4>
              <div className="space-y-2 text-xs font-semibold text-muted-foreground pl-1">
                {[
                  { value: "all", label: "All Standing Tiers" },
                  { value: "3", label: "Gold Tier Certified" },
                  { value: "2", label: "Silver Tier Certified" },
                  { value: "1", label: "Bronze Tier Certified" },
                ].map((tierOption) => (
                  <label key={tierOption.value} className="flex items-center gap-2.5 cursor-pointer group">
                    <input
                      type="radio"
                      name="tier_filter"
                      checked={selectedTier === tierOption.value}
                      onChange={() => setSelectedTier(tierOption.value)}
                      className="accent-[#D41367] w-4 h-4 cursor-pointer"
                    />
                    <span
                      className={`group-hover:text-foreground transition-colors ${
                        selectedTier === tierOption.value ? "text-[#D41367] font-bold" : ""
                      }`}
                    >
                      {tierOption.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Section 2: Industry Categories */}
            <div className="space-y-3 pt-4 border-t border-border/60">
              <h4 className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-[#D41367]" />
                <span>Industry Sector</span>
              </h4>
              <div className="space-y-2 text-xs font-semibold text-muted-foreground pl-1 max-h-52 overflow-y-auto pr-1">
                <label className="flex items-center gap-2.5 cursor-pointer group">
                  <input
                    type="radio"
                    name="cat_filter"
                    checked={selectedCategory === "all"}
                    onChange={() => setSelectedCategory("all")}
                    className="accent-[#D41367] w-4 h-4 cursor-pointer"
                  />
                  <span className={selectedCategory === "all" ? "text-[#D41367] font-bold" : ""}>
                    All Categories ({mockBusinesses.length})
                  </span>
                </label>
                {mockCategories.map((cat) => (
                  <label key={cat.id} className="flex items-center gap-2.5 cursor-pointer group">
                    <input
                      type="radio"
                      name="cat_filter"
                      checked={selectedCategory === cat.slug}
                      onChange={() => setSelectedCategory(cat.slug)}
                      className="accent-[#D41367] w-4 h-4 cursor-pointer"
                    />
                    <span
                      className={`group-hover:text-foreground transition-colors truncate ${
                        selectedCategory === cat.slug ? "text-[#D41367] font-bold" : ""
                      }`}
                    >
                      {cat.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Section 3: Entity Attributes */}
            <div className="space-y-3 pt-4 border-t border-border/60">
              <h4 className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#D41367]" />
                <span>Entity Badges</span>
              </h4>
              <div className="space-y-2.5 text-xs font-semibold text-muted-foreground pl-1">
                {[
                  { id: "featured", label: "Featured Showcase" },
                  { id: "women_owned", label: "Women-Owned Business" },
                  { id: "startup", label: "Rotaract Startup" },
                ].map((attr) => (
                  <label key={attr.id} className="flex items-center gap-2.5 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={badgeFilters.includes(attr.id)}
                      onChange={() => toggleBadgeFilter(attr.id)}
                      className="accent-[#D41367] w-4 h-4 rounded cursor-pointer"
                    />
                    <span className="group-hover:text-foreground transition-colors">{attr.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* RIGHT COLUMN: BUSINESS CARDS SHOWCASE */}
          <main className="lg:col-span-9 space-y-6">
            {/* Empty State */}
            {sortedBusinesses.length === 0 ? (
              <div className="bg-white rounded-3xl border border-pink-100 p-12 text-center space-y-4 shadow-xs">
                <div className="w-16 h-16 rounded-full bg-pink-50 text-[#D41367] flex items-center justify-center mx-auto">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black text-foreground">No Matching Businesses Found</h3>
                <p className="text-xs text-muted-foreground max-w-md mx-auto leading-relaxed">
                  We couldn&apos;t find any verified businesses matching your exact search filters. Try resetting filters or using a broader search keyword.
                </p>
                <Button
                  onClick={clearAllFilters}
                  className="bg-[#D41367] hover:bg-[#B80E56] text-white rounded-full px-6 py-2.5 text-xs font-extrabold shadow-sm gap-2"
                >
                  <RotateCcw className="w-4 h-4" /> Reset All Filters
                </Button>
              </div>
            ) : viewMode === "grid" ? (
              /* GRID VIEW MODE (3 COLUMNS) */
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {sortedBusinesses.map((biz) => {
                  const logoImg = getLogoImage(biz);
                  const locationText = biz.location
                    ? `${biz.location.city || biz.location.state}, ${biz.location.country}`
                    : biz.category?.name || "Global";

                  return (
                    <div
                      key={biz.id}
                      className="bg-white rounded-3xl border border-border/80 p-6 shadow-xs hover:shadow-xl transition-all duration-300 group flex flex-col justify-between relative overflow-hidden"
                    >
                      <div>
                        {/* Top Header Row */}
                        <div className="flex items-center justify-between gap-3 pb-3.5 border-b border-border/60">
                          {/* Logo / Initial Icon */}
                          <div className="relative shrink-0">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#D41367] to-[#B80E56] text-white font-extrabold text-lg flex items-center justify-center shadow-md shadow-[#D41367]/20 overflow-hidden relative">
                              {logoImg ? (
                                <Image src={logoImg} alt={biz.name} fill sizes="48px" className="object-cover" />
                              ) : (
                                biz.name.charAt(0)
                              )}
                            </div>
                            <div
                              className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white z-10"
                              title="Verified Member"
                            >
                              <ShieldCheck className="w-2.5 h-2.5 stroke-[3]" />
                            </div>
                          </div>

                          {/* Right Badges */}
                          <div className="flex flex-col items-end gap-1 shrink-0">
                            <VerificationBadge level={biz.verification_level} size="sm" />
                            <span className="text-[10px] font-bold text-muted-foreground bg-warm-bg px-2.5 py-0.5 rounded-full border border-border">
                              Dist. {biz.rotaract_profile?.district_number || 3220}
                            </span>
                          </div>
                        </div>

                        {/* Title & Category */}
                        <div className="space-y-1 mt-4 mb-2">
                          <h3 className="font-extrabold text-base text-foreground group-hover:text-[#D41367] transition-colors truncate">
                            {biz.name}
                          </h3>
                          <p className="text-xs font-bold text-[#D41367] truncate">
                            {biz.subcategory?.name || biz.category?.name || "Professional Services"}
                          </p>
                        </div>

                        {/* Tagline / Description */}
                        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-4 font-medium">
                          {biz.tagline || biz.description}
                        </p>

                        {/* Attribute Badges */}
                        <div className="flex flex-wrap items-center gap-1.5 mb-4">
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-muted-foreground bg-warm-bg px-2.5 py-1 rounded-xl border border-border">
                            <MapPin className="w-3 h-3 text-[#D41367] shrink-0" />
                            <span className="truncate max-w-[170px]">{locationText}</span>
                          </span>

                          {biz.is_women_owned && (
                            <span className="text-[10px] font-extrabold text-pink-700 bg-pink-50 border border-pink-200 px-2 py-0.5 rounded-lg">
                              Women-Owned
                            </span>
                          )}
                          {biz.is_startup && (
                            <span className="text-[10px] font-extrabold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-lg">
                              Startup
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Footer Actions */}
                      <div className="flex items-center gap-2 pt-3.5 border-t border-border/60 mt-auto">
                        <Button
                          size="sm"
                          className="bg-[#D41367] hover:bg-[#B80E56] text-white text-xs font-extrabold rounded-xl flex-1 h-9 shadow-xs gap-1.5"
                          asChild
                        >
                          <Link href={`/business/${biz.slug}`}>
                            <PhoneCall className="w-3.5 h-3.5" /> Connect Now
                          </Link>
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-xs font-bold rounded-xl border-border hover:bg-pink-50 hover:text-[#D41367] h-9 px-3.5 bg-white"
                          asChild
                        >
                          <Link href={`/business/${biz.slug}`}>Profile →</Link>
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* LIST VIEW MODE (FULL WIDTH ROWS) */
              <div className="space-y-4">
                {sortedBusinesses.map((biz) => {
                  const logoImg = getLogoImage(biz);
                  const locationText = biz.location
                    ? `${biz.location.city || biz.location.state}, ${biz.location.country}`
                    : biz.category?.name || "Global";

                  return (
                    <div
                      key={biz.id}
                      className="bg-white rounded-3xl border border-border/80 p-5 shadow-xs hover:shadow-xl transition-all duration-300 group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 relative overflow-hidden"
                    >
                      <div className="flex items-start gap-4 flex-1">
                        {/* Logo / Initial */}
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#D41367] to-[#B80E56] text-white font-extrabold text-xl flex items-center justify-center shadow-md shadow-[#D41367]/20 shrink-0 overflow-hidden relative">
                          {logoImg ? (
                            <Image src={logoImg} alt={biz.name} fill sizes="56px" className="object-cover" />
                          ) : (
                            biz.name.charAt(0)
                          )}
                        </div>

                        {/* Content */}
                        <div className="space-y-1.5 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-black text-lg text-foreground group-hover:text-[#D41367] transition-colors">
                              {biz.name}
                            </h3>
                            <VerificationBadge level={biz.verification_level} size="sm" />
                          </div>

                          <p className="text-xs font-bold text-[#D41367]">
                            {biz.subcategory?.name || biz.category?.name} · Dist. {biz.rotaract_profile?.district_number || 3220}
                          </p>

                          <p className="text-xs text-muted-foreground line-clamp-2 max-w-2xl font-medium">
                            {biz.tagline || biz.description}
                          </p>

                          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-muted-foreground">
                              <MapPin className="w-3 h-3 text-[#D41367]" /> {locationText}
                            </span>
                            {biz.is_women_owned && (
                              <span className="text-[10px] font-extrabold text-pink-700 bg-pink-50 border border-pink-200 px-2 py-0.5 rounded-lg">
                                Women-Owned
                              </span>
                            )}
                            {biz.is_startup && (
                              <span className="text-[10px] font-extrabold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-lg">
                                Startup
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Right Action Buttons */}
                      <div className="flex sm:flex-col items-center gap-2 w-full sm:w-auto shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-border/60">
                        <Button
                          size="sm"
                          className="bg-[#D41367] hover:bg-[#B80E56] text-white text-xs font-extrabold rounded-xl w-full sm:w-36 h-10 shadow-xs gap-1.5"
                          asChild
                        >
                          <Link href={`/business/${biz.slug}`}>
                            <PhoneCall className="w-3.5 h-3.5" /> Connect Now
                          </Link>
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-xs font-bold rounded-xl border-border hover:bg-pink-50 hover:text-[#D41367] w-full sm:w-36 h-10 bg-white"
                          asChild
                        >
                          <Link href={`/business/${biz.slug}`}>View Profile →</Link>
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Pagination Controls */}
            {sortedBusinesses.length > 0 && (
              <div className="pt-8 flex items-center justify-center gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="w-9 h-9 rounded-2xl border border-pink-100 bg-white flex items-center justify-center text-muted-foreground hover:text-[#D41367] transition-all shadow-xs"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCurrentPage(1)}
                  className="w-9 h-9 rounded-2xl bg-[#D41367] text-white font-extrabold text-xs flex items-center justify-center shadow-xs"
                >
                  1
                </button>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(1, p + 1))}
                  className="w-9 h-9 rounded-2xl border border-pink-100 bg-white flex items-center justify-center text-muted-foreground hover:text-[#D41367] transition-all shadow-xs"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
