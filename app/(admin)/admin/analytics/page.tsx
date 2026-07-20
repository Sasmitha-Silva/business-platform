"use client";

import { BarChart3, TrendingUp, Users, ShieldCheck, Map, ArrowUpRight } from "lucide-react";

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6 animate-fade-in max-w-7xl mx-auto pb-12">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Global Growth & Business Analytics</h1>
        <p className="text-xs text-muted-foreground mt-1">Metrics on verified listings, regional district growth, and B2B engagement rates.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-3xl border border-border p-6 shadow-sm">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">MONTHLY NEW LISTINGS</p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-extrabold text-foreground">+142</span>
            <span className="text-xs font-bold text-emerald-600 flex items-center"><ArrowUpRight className="w-3.5 h-3.5" /> 18%</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-border p-6 shadow-sm">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">VERIFICATION CONVERSION</p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-extrabold text-[#D41367]">84.2%</span>
            <span className="text-xs text-muted-foreground">Gold/Silver Tiers</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-border p-6 shadow-sm">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">TOTAL B2B LEADS</p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-extrabold text-foreground">3,890</span>
            <span className="text-xs font-bold text-emerald-600">This Month</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-border p-6 shadow-sm">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">ACTIVE DISTRICTS</p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-extrabold text-[#0050A2]">45</span>
            <span className="text-xs text-muted-foreground">Globally</span>
          </div>
        </div>
      </div>

      {/* Chart Representation */}
      <div className="bg-white rounded-3xl border border-border p-8 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-foreground">Regional District Breakdown</h2>
        <div className="h-48 bg-warm-bg rounded-2xl border border-border p-4 flex items-end justify-between gap-4">
          {[
            { district: "District 3220", value: 85, color: "bg-[#D41367]" },
            { district: "District 3141", value: 95, color: "bg-[#F7A81B]" },
            { district: "District 9110", value: 65, color: "bg-[#0050A2]" },
            { district: "District 9212", value: 50, color: "bg-emerald-600" },
            { district: "District 3291", value: 70, color: "bg-purple-600" },
          ].map((bar) => (
            <div key={bar.district} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
              <div style={{ height: `${bar.value}%` }} className={`w-full max-w-[48px] ${bar.color} rounded-t-xl transition-all`} />
              <span className="text-[10px] font-bold text-muted-foreground truncate">{bar.district}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
