"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  variant?: "hero" | "compact";
  className?: string;
}

export function SearchBar({ variant = "hero", className }: SearchBarProps) {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (keyword) params.set("q", keyword);
    if (location) params.set("location", location);
    router.push(`/directory?${params.toString()}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  if (variant === "compact") {
    return (
      <div className={cn("relative", className)}>
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search directory..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full pl-9 pr-4 py-2 text-sm bg-secondary/60 border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-crimson/20 focus:border-crimson/40 transition-all placeholder:text-muted-foreground"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-card rounded-2xl p-2 shadow-lg border border-border",
        className
      )}
    >
      <div className="flex items-center gap-2 flex-1 px-3 py-2">
        <Search className="w-5 h-5 text-muted-foreground shrink-0" />
        <input
          type="text"
          placeholder="Keyword (e.g. Marketing, Law)"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full text-sm bg-transparent focus:outline-none placeholder:text-muted-foreground"
        />
      </div>
      <div className="hidden sm:block w-px h-8 bg-border" />
      <div className="flex items-center gap-2 flex-1 px-3 py-2">
        <MapPin className="w-5 h-5 text-muted-foreground shrink-0" />
        <input
          type="text"
          placeholder="City or District"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full text-sm bg-transparent focus:outline-none placeholder:text-muted-foreground"
        />
      </div>
      <Button
        onClick={handleSearch}
        className="bg-crimson hover:bg-crimson-dark text-white rounded-xl px-8 py-2.5 font-medium shrink-0"
      >
        Explore
      </Button>
    </div>
  );
}
