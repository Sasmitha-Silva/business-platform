"use client";

import Link from "next/link";
import {
  BarChart3,
  TrendingUp,
  Users,
  ShieldCheck,
  MapPin,
  ArrowUpRight,
  Download,
  Calendar,
  Building2,
  CheckCircle2,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminAnalyticsPage() {
  const districtData = [
    { district: "District 3220 (Sri Lanka)", value: 85, businesses: 2420, color: "bg-[#D41367]" },
    { district: "District 3141 (Mumbai)", value: 95, businesses: 3100, color: "bg-slate-900" },
    { district: "District 9110 (Lagos)", value: 65, businesses: 1840, color: "bg-amber-600" },
    { district: "District 9212 (East Africa)", value: 50, businesses: 1200, color: "bg-emerald-600" },
    { district: "District 3291 (Kolkata)", value: 70, businesses: 1980, color: "bg-purple-600" },
  ];

  return (
    <div className="space-y-6 animate-fade-in max-w-[1600px] mx-auto pb-12">
      {/* ================= HEADER BANNER ================= */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Global Network Analytics &amp; Growth
            </h1>
            <span className="px-2.5 py-0.5 rounded-md bg-pink-50 text-[#D41367] font-semibold text-xs border border-pink-100/60">
              Live Telemetry
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-normal mt-0.5">
            Deep insights on verified listings, regional district adoption, and directory lead generation.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <Button
            variant="outline"
            className="rounded-xl text-xs sm:text-sm font-semibold text-slate-700 border-slate-200 hover:bg-slate-50 gap-2 h-9.5 px-3.5"
          >
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span>2026 YTD</span>
          </Button>

          <Button
            onClick={() => {
              const data = {
                title: "Rotaract Business Network Analytics",
                exported_at: new Date().toISOString(),
                districtData,
              };
              const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = "global-network-analytics.json";
              a.click();
            }}
            className="bg-[#D41367] hover:bg-[#B80E56] text-white rounded-xl text-xs sm:text-sm font-semibold gap-2 h-9.5 px-4 shadow-xs cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Analytics</span>
          </Button>
        </div>
      </div>

      {/* ================= 4 METRIC STAT CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-4.5 sm:p-5 space-y-1.5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-medium text-slate-500">Monthly New Listings</span>
            <div className="w-8 h-8 rounded-xl bg-pink-50 text-[#D41367] flex items-center justify-center border border-pink-100/60">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">+142</div>
          <div className="flex items-center gap-1 text-xs font-medium text-emerald-600 mt-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+18.4% vs last month</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4.5 sm:p-5 space-y-1.5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-medium text-slate-500">Verification Conversion</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-emerald-700 tracking-tight">84.2%</div>
          <div className="text-xs text-slate-500 font-normal mt-1">Gold &amp; Silver Tiers</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4.5 sm:p-5 space-y-1.5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-medium text-slate-500">Total B2B Inquiries</span>
            <div className="w-8 h-8 rounded-xl bg-pink-50 text-[#D41367] flex items-center justify-center border border-pink-100/60">
              <BarChart3 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">3,890</div>
          <div className="text-xs text-slate-500 font-normal mt-1">Active leads converted</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4.5 sm:p-5 space-y-1.5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-medium text-slate-500">Active Rotary Districts</span>
            <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center border border-slate-200">
              <MapPin className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">45</div>
          <div className="text-xs text-slate-500 font-normal mt-1">Across 18 Countries</div>
        </div>
      </div>

      {/* ================= REGIONAL DISTRICT CHART & BREAKDOWN ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Regional Bar Chart (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                Regional District Adoption
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-normal mt-0.5">
                Listing density and verified enterprise distribution by district.
              </p>
            </div>
            <span className="text-xs text-slate-400 font-medium">Top 5 Districts</span>
          </div>

          <div className="h-60 flex items-end justify-between gap-4 pt-6 pb-2 border-b border-slate-100">
            {districtData.map((bar) => (
              <div key={bar.district} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <div
                  style={{ height: `${bar.value}%` }}
                  className={`w-full max-w-[56px] ${bar.color} rounded-t-xl transition-all group-hover:opacity-90`}
                  title={`${bar.district}: ${bar.businesses} Listings`}
                />
                <span className="text-xs text-slate-500 font-medium truncate max-w-[90px]">
                  {bar.district.split(" ")[1]}
                </span>
              </div>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 gap-3 pt-1 text-xs">
            {districtData.map((d) => (
              <div key={d.district} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-semibold text-slate-700">{d.district}</span>
                <span className="font-bold text-slate-900">{d.businesses.toLocaleString()} Listings</span>
              </div>
            ))}
          </div>
        </div>

        {/* Lead Conversion Health (1 col) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs space-y-4">
          <div className="pb-3 border-b border-slate-100">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Platform Integrity
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-normal mt-0.5">
              Accreditation compliance audit.
            </p>
          </div>

          <div className="space-y-3 pt-1">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-700">GST Certificate Verified</span>
                <span className="text-[#D41367]">94%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#D41367] rounded-full w-[94%]" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-700">DRR Endorsement Current</span>
                <span className="text-slate-900">82%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-slate-900 rounded-full w-[82%]" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-700">MSME / Udyam Registry</span>
                <span className="text-amber-600">68%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-600 rounded-full w-[68%]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
