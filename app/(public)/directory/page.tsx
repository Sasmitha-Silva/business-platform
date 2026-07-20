"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Compass, MapPin, X, ChevronLeft, ChevronRight, Search, ShieldCheck, Briefcase, Globe, Star, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";

const directoryItems = [
  {
    id: "nexus-analytics",
    name: "Nexus Analytics",
    category: "Tech & Data Solutions",
    location: "New York, USA",
    tier: "gold",
    tierLabel: "GOLD TIER",
    image: "/images/card-nexus.png",
    slug: "nexus-analytics",
  },
  {
    id: "studio-bloom",
    name: "Studio Bloom",
    category: "Creative Marketing",
    location: "Amsterdam, NL",
    tier: "silver",
    tierLabel: "SILVER TIER",
    image: "/images/card-bloom.png",
    slug: "studio-bloom",
  },
  {
    id: "vanguard-legal",
    name: "Vanguard Legal",
    category: "Corporate Law",
    location: "Toronto, CA",
    tier: "bronze",
    tierLabel: "BRONZE TIER",
    image: "/images/card-vanguard.png",
    slug: "vanguard-legal",
  },
  {
    id: "lumina-digital",
    name: "Lumina Digital Solutions",
    category: "Software & Cloud Architecture",
    location: "Colombo, Sri Lanka",
    tier: "gold",
    tierLabel: "GOLD TIER",
    image: "/images/product-tech.png",
    slug: "lumina-digital-solutions",
  },
  {
    id: "apex-dental",
    name: "Apex Dental Studio",
    category: "Cosmetic Dentistry & Health",
    location: "Mumbai, India",
    tier: "silver",
    tierLabel: "SILVER TIER",
    image: "/images/logo-dental.png",
    slug: "apex-dental-studio",
  },
  {
    id: "vivid-design",
    name: "Vivid Design Hub",
    category: "Branding & Mobile UX",
    location: "Nairobi, Kenya",
    tier: "gold",
    tierLabel: "GOLD TIER",
    image: "/images/logo-design.png",
    slug: "vivid-design-hub",
  },
];

export default function DirectoryPage() {
  const [selectedVerification, setSelectedVerification] = useState<string>("gold");
  const [selectedCategory, setSelectedCategory] = useState<string>("tech");
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [citySearch, setCitySearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Active filter tags for top pill ribbon
  const activeTags = useMemo(() => {
    const tags = [];
    if (selectedVerification === "gold") tags.push({ id: "ver_gold", label: "Gold Certified" });
    if (selectedVerification === "silver") tags.push({ id: "ver_silver", label: "Silver Certified" });
    if (selectedCategory === "tech") tags.push({ id: "cat_tech", label: "Tech & SaaS" });
    if (selectedCategory === "legal") tags.push({ id: "cat_legal", label: "Legal & Finance" });
    return tags;
  }, [selectedVerification, selectedCategory]);

  const removeTag = (id: string) => {
    if (id.startsWith("ver_")) setSelectedVerification("");
    if (id.startsWith("cat_")) setSelectedCategory("");
  };

  const clearAllFilters = () => {
    setSelectedVerification("");
    setSelectedCategory("");
    setSelectedRegion("");
    setCitySearch("");
  };

  return (
    <div className="min-h-screen bg-[#FAF6F4] bg-[radial-[#D41367]/0.05_1px,transparent_1px] [background-size:24px_24px] pb-24 pt-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Header Card */}
        <div className="bg-white rounded-[2.5rem] border border-pink-100/80 p-8 sm:p-10 shadow-sm flex flex-col md:flex-row items-start md:items-end justify-between gap-6 relative overflow-hidden">
          <div className="space-y-3 max-w-2xl">
            {/* Top Capsule Tag */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FFEBEF] text-[#D41367] text-[10px] font-extrabold tracking-wider uppercase">
              <Compass className="w-3.5 h-3.5" />
              <span>EXPLORE NETWORK</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
              Business <span className="text-[#D41367]">Directory</span>
            </h1>

            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Connect with ethical leaders and verified professionals across the global Rotaract ecosystem.
            </p>
          </div>

          {/* Top Right Sort Badge */}
          <div className="bg-warm-bg rounded-full px-4 py-2 border border-pink-100 flex items-center gap-1.5 text-xs font-semibold text-muted-foreground shadow-sm">
            <span>SORT:</span>
            <span className="text-[#D41367] font-bold flex items-center gap-1 cursor-pointer">
              Verification Tier <span className="text-[10px]">▾</span>
            </span>
          </div>
        </div>

        {/* Main Content Layout (Sidebar Filter + Cards Grid) */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* LEFT SIDEBAR: FILTER BY PANEL */}
          <div className="lg:col-span-3 bg-white rounded-[2.5rem] border border-pink-100/80 p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-border/60">
              <span className="text-xs font-extrabold uppercase tracking-wider text-foreground">
                FILTER BY
              </span>
              <button
                onClick={clearAllFilters}
                className="text-[11px] font-extrabold text-[#D41367] hover:underline uppercase tracking-wider"
              >
                CLEAR
              </button>
            </div>

            {/* Section 1: Verification */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-extrabold text-foreground">
                <ShieldCheck className="w-4 h-4 text-[#D41367]" />
                <span>Verification</span>
              </div>
              <div className="space-y-2 text-xs font-semibold text-foreground/80 pl-6">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="radio"
                    name="verification"
                    checked={selectedVerification === "gold"}
                    onChange={() => setSelectedVerification("gold")}
                    className="accent-[#D41367] w-4 h-4 cursor-pointer"
                  />
                  <span>Gold Certified</span>
                </label>
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="radio"
                    name="verification"
                    checked={selectedVerification === "silver"}
                    onChange={() => setSelectedVerification("silver")}
                    className="accent-[#D41367] w-4 h-4 cursor-pointer"
                  />
                  <span>Silver Certified</span>
                </label>
              </div>
            </div>

            {/* Section 2: Categories */}
            <div className="space-y-3 pt-2 border-t border-border/40">
              <div className="flex items-center gap-2 text-xs font-extrabold text-foreground">
                <Briefcase className="w-4 h-4 text-[#D41367]" />
                <span>Categories</span>
              </div>
              <div className="space-y-2 text-xs font-semibold text-foreground/80 pl-6">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === "tech"}
                    onChange={() => setSelectedCategory("tech")}
                    className="accent-[#D41367] w-4 h-4 cursor-pointer"
                  />
                  <span>Tech & SaaS</span>
                </label>
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === "legal"}
                    onChange={() => setSelectedCategory("legal")}
                    className="accent-[#D41367] w-4 h-4 cursor-pointer"
                  />
                  <span>Legal & Finance</span>
                </label>
              </div>
            </div>

            {/* Section 3: Region */}
            <div className="space-y-3 pt-2 border-t border-border/40">
              <div className="flex items-center gap-2 text-xs font-extrabold text-foreground">
                <Globe className="w-4 h-4 text-[#D41367]" />
                <span>Region</span>
              </div>

              <div className="bg-warm-bg rounded-2xl p-2 border border-border flex items-center gap-2 text-xs">
                <Search className="w-3.5 h-3.5 text-muted-foreground ml-1" />
                <input
                  type="text"
                  placeholder="Search city..."
                  value={citySearch}
                  onChange={(e) => setCitySearch(e.target.value)}
                  className="bg-transparent border-none outline-none text-xs w-full placeholder:text-muted-foreground"
                />
              </div>

              <div className="space-y-2 text-xs font-semibold text-foreground/80 pl-6">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="radio"
                    name="region"
                    checked={selectedRegion === "na"}
                    onChange={() => setSelectedRegion("na")}
                    className="accent-[#D41367] w-4 h-4 cursor-pointer"
                  />
                  <span>North America</span>
                </label>
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="radio"
                    name="region"
                    checked={selectedRegion === "eu"}
                    onChange={() => setSelectedRegion("eu")}
                    className="accent-[#D41367] w-4 h-4 cursor-pointer"
                  />
                  <span>Europe</span>
                </label>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: ACTIVE FILTERS BAR + DIRECTORY CARDS GRID */}
          <div className="lg:col-span-9 space-y-6">
            {/* Active Filters Ribbon */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                {activeTags.map((tag) => (
                  <span
                    key={tag.id}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-xs font-bold text-foreground border border-pink-100 shadow-sm"
                  >
                    <span>{tag.label}</span>
                    <button
                      onClick={() => removeTag(tag.id)}
                      className="text-muted-foreground hover:text-[#D41367] ml-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>

              <span className="text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground/80 shrink-0">
                SHOWING 124 RESULTS
              </span>
            </div>

            {/* Directory Cards Grid (3 Columns) */}
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {directoryItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-[2.5rem] border border-pink-100/90 p-5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Card Top Media Box with Graphic Logo */}
                    <div className="relative rounded-3xl overflow-hidden aspect-[4/3] bg-gradient-to-br from-warm-bg to-pink-50/50 mb-5 border border-pink-100 flex items-center justify-center p-4">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                      />

                      {/* Tier Badge Pill (Top Right Floating) */}
                      <div className="absolute top-3 right-3 z-10">
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-extrabold tracking-wider uppercase shadow-md flex items-center gap-1 ${
                            item.tier === "gold"
                              ? "bg-[#F7A81B] text-slate-950"
                              : item.tier === "silver"
                              ? "bg-slate-200 text-slate-900"
                              : "bg-amber-700 text-white"
                          }`}
                        >
                          <Star className="w-3 h-3 fill-current" />
                          {item.tierLabel}
                        </span>
                      </div>
                    </div>

                    {/* Card Body Info */}
                    <div className="space-y-1 px-1">
                      <h3 className="text-xl font-extrabold text-foreground group-hover:text-[#D41367] transition-colors truncate">
                        {item.name}
                      </h3>
                      <p className="text-xs font-bold text-[#D41367] truncate">
                        {item.category}
                      </p>

                      <p className="text-xs text-muted-foreground flex items-center gap-1 pt-2">
                        <MapPin className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                        <span>{item.location}</span>
                      </p>
                    </div>
                  </div>

                  {/* Card Action Buttons Footer */}
                  <div className="flex items-center gap-2.5 pt-5 px-1">
                    <Button
                      className="flex-1 bg-[#D41367] hover:bg-[#B80E56] text-white rounded-full h-10 text-xs font-extrabold shadow-sm"
                      asChild
                    >
                      <Link href={`/business/${item.slug}`}>Connect</Link>
                    </Button>
                    <Button
                      className="flex-1 bg-[#FFEBEF] hover:bg-[#F9C0CE] text-[#D41367] rounded-full h-10 text-xs font-extrabold border-none shadow-none"
                      asChild
                    >
                      <Link href={`/business/${item.slug}`}>Profile</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls Footer */}
            <div className="pt-8 flex items-center justify-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="w-9 h-9 rounded-full border border-pink-100 bg-white flex items-center justify-center text-muted-foreground hover:text-[#D41367] hover:border-[#D41367] transition-all shadow-sm"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() => setCurrentPage(1)}
                className="w-9 h-9 rounded-full bg-[#D41367] text-white font-extrabold text-xs flex items-center justify-center shadow-md"
              >
                1
              </button>
              <button
                onClick={() => setCurrentPage(2)}
                className="w-9 h-9 rounded-full border border-pink-100 bg-white font-extrabold text-xs text-foreground/80 hover:text-[#D41367] flex items-center justify-center shadow-sm"
              >
                2
              </button>
              <span className="text-xs text-muted-foreground font-bold px-1">...</span>
              <button
                onClick={() => setCurrentPage(12)}
                className="w-9 h-9 rounded-full border border-pink-100 bg-white font-extrabold text-xs text-foreground/80 hover:text-[#D41367] flex items-center justify-center shadow-sm"
              >
                12
              </button>

              <button
                onClick={() => setCurrentPage((p) => Math.min(12, p + 1))}
                className="w-9 h-9 rounded-full border border-pink-100 bg-white flex items-center justify-center text-muted-foreground hover:text-[#D41367] hover:border-[#D41367] transition-all shadow-sm"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
