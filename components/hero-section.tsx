"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (location.trim()) params.set("location", location.trim());
    router.push(`/directory${params.toString() ? `?${params.toString()}` : ""}`);
  };

  return (
    <section className="relative h-[100vh] min-h-[100vh] flex flex-col items-center justify-center pt-24 sm:pt-28 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden bg-white">
      {/* Background Precision Grid */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
        {/* Top-Left Static Cranberry Grid */}
        <div
          className="absolute top-0 left-0 w-[500px] sm:w-[680px] h-[500px] sm:h-[680px]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(212, 19, 103, 0.12) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(212, 19, 103, 0.12) 1px, transparent 1px)
            `,
            backgroundSize: "36px 36px",
            maskImage: "radial-gradient(circle at top left, black 30%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(circle at top left, black 30%, transparent 75%)",
          }}
        />

        {/* Bottom-Right Static Cranberry Grid */}
        <div
          className="absolute bottom-0 right-0 w-[500px] sm:w-[680px] h-[500px] sm:h-[680px]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(212, 19, 103, 0.12) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(212, 19, 103, 0.12) 1px, transparent 1px)
            `,
            backgroundSize: "36px 36px",
            maskImage: "radial-gradient(circle at bottom right, black 30%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(circle at bottom right, black 30%, transparent 75%)",
          }}
        />

        {/* Center Subtle Ambient Radial Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-pink-50/60 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="w-full max-w-5xl mx-auto flex flex-col items-center text-center justify-center relative z-10 space-y-8">

        {/* Large Display Headline */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl lg:text-[5.2rem] font-black text-[#101828] tracking-tight leading-[1.05]">
            Explore Verified <span className="text-[#D41367]">Rotaract</span> Enterprises
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
            The accredited business network connecting trusted Rotaract entrepreneurs, service firms, and enterprise leaders worldwide.
          </p>
        </div>

        {/* Integrated Quick Search Command Bar */}
        <div className="w-full max-w-3xl mx-auto">
          <form
            onSubmit={handleSearch}
            className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-full border-2 border-slate-200 shadow-lg shadow-slate-900/5 p-2 sm:p-2.5 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 transition-all focus-within:border-[#D41367] focus-within:ring-4 focus-within:ring-[#D41367]/10"
          >
            {/* Keyword Input */}
            <div className="flex items-center gap-2.5 flex-1 px-3 py-1.5 sm:py-0">
              <Search className="w-4 h-4 text-[#D41367] shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enterprise, Service, or Founder"
                className="w-full text-xs sm:text-sm font-semibold bg-transparent text-slate-900 placeholder:text-slate-400 focus:outline-none"
              />
            </div>

            <div className="hidden sm:block w-px h-6 bg-slate-200 shrink-0" />

            {/* Location Input */}
            <div className="flex items-center gap-2.5 sm:w-48 px-3 py-1.5 sm:py-0">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City or District"
                className="w-full text-xs sm:text-sm font-semibold bg-transparent text-slate-900 placeholder:text-slate-400 focus:outline-none"
              />
            </div>

            {/* Search Action Button */}
            <Button
              type="submit"
              className="bg-[#D41367] hover:bg-[#B80E56] text-white font-extrabold text-xs sm:text-sm rounded-xl sm:rounded-full px-6 py-2.5 h-10 shadow-sm transition-all shrink-0 cursor-pointer"
            >
              <span>Search Directory</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </form>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
          <Button
            className="bg-[#D41367] hover:bg-[#B80E56] text-white font-extrabold text-xs sm:text-sm rounded-full px-7 py-3 shadow-sm hover:scale-105 active:scale-95 transition-all h-auto cursor-pointer"
            asChild
          >
            <Link href="/directory">
              <span>Browse Full Directory</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>

          <Button
            className="bg-white hover:bg-slate-50 text-slate-800 hover:text-[#D41367] font-extrabold text-xs sm:text-sm rounded-full px-7 py-3 border border-slate-300 shadow-2xs hover:scale-105 active:scale-95 transition-all h-auto cursor-pointer"
            asChild
          >
            <Link href="/register">
              <span>Register Your Business</span>
            </Link>
          </Button>
        </div>

      </div>
    </section>
  );
}
