"use client";

import { Building2, Search, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockBusinesses } from "@/lib/mock-data";

export default function ModeratorDirectoryPage() {
  const districtBusinesses = mockBusinesses.filter((b) => b.location?.country === "Sri Lanka" || b.status === "approved");

  return (
    <div className="space-y-6 animate-fade-in max-w-7xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">District 3220 — Local Business Registry</h1>
          <p className="text-xs text-muted-foreground mt-1">All verified and active business profiles registered under District 3220.</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {districtBusinesses.map((b) => (
          <div key={b.id} className="bg-white rounded-3xl border border-border p-6 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-pink-100 text-[#D41367] font-bold flex items-center justify-center text-sm">
                {b.name.charAt(0)}
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                Gold Tier
              </span>
            </div>
            <div>
              <h3 className="font-bold text-base text-foreground">{b.name}</h3>
              <p className="text-xs text-muted-foreground">{b.category?.name}</p>
            </div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#D41367]" /> {b.location?.city || "Colombo"}, {b.location?.country || "Sri Lanka"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
