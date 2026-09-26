"use client";

import { useState, useEffect } from "react";
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
import { Skeleton } from "@/components/ui/skeleton";
import { getAdminAnalyticsAction } from "@/app/actions/admin";
import type { DashboardAnalytics } from "@/lib/types";
import {
  getCachedDashboardData,
  setCachedDashboardData,
} from "@/lib/cache/admin-cache";

const DEFAULT_ANALYTICS: DashboardAnalytics = {
  total_businesses: 0,
  total_users: 0,
  total_moderators: 0,
  gold_tier_count: 0,
  silver_tier_count: 0,
  pending_verifications: 0,
  pending_deactivations: 0,
  businesses_by_district: [],
  businesses_by_category: [],
  verification_status_distribution: [],
  monthly_growth: [],
  recent_activity: [],
};

export default function AdminAnalyticsPage() {
  const cachedAnalytics = getCachedDashboardData<DashboardAnalytics>("admin_analytics");

  const [analytics, setAnalytics] = useState<DashboardAnalytics>(cachedAnalytics || DEFAULT_ANALYTICS);
  const [isLoading, setIsLoading] = useState(!cachedAnalytics);

  useEffect(() => {
    async function loadData() {
      try {
        if (!cachedAnalytics) {
          setIsLoading(true);
        }
        const data = await getAdminAnalyticsAction();
        setAnalytics(data);
        setCachedDashboardData("admin_analytics", data);
      } catch (err) {
        console.error("Failed to load admin analytics:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const districtData = (analytics.businesses_by_district && analytics.businesses_by_district.length > 0)
    ? analytics.businesses_by_district.map((d, i) => ({
        district: d.district,
        businesses: d.count,
        value: analytics.total_businesses > 0 ? Math.round((d.count / analytics.total_businesses) * 100) : 50,
        color: i % 2 === 0 ? "bg-[#D41367]" : "bg-slate-900",
      }))
    : [
        {
          district: "District 3220 (Sri Lanka)",
          businesses: analytics.total_businesses || 0,
          value: 100,
          color: "bg-[#D41367]",
        },
      ];

  const goldRate =
    analytics.total_businesses > 0
      ? Math.round(((analytics.gold_tier_count + analytics.silver_tier_count) / analytics.total_businesses) * 100)
      : 0;

  if (isLoading) {
    return (
      <div className="space-y-6 animate-fade-in max-w-[1600px] mx-auto pb-12">
        {/* Header Skeleton */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <Skeleton className="h-7 w-72 rounded-lg" />
              <Skeleton className="h-5 w-32 rounded-md" />
            </div>
            <Skeleton className="h-4 w-96 rounded-md" />
          </div>
          <div className="flex items-center gap-2.5">
            <Skeleton className="h-9.5 w-28 rounded-xl" />
            <Skeleton className="h-9.5 w-36 rounded-xl" />
          </div>
        </div>

        {/* 4 Stat Cards Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 shadow-2xs">
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-32 rounded-md" />
                <Skeleton className="w-8 h-8 rounded-xl" />
              </div>
              <Skeleton className="h-8 w-20 rounded-lg" />
              <Skeleton className="h-3.5 w-36 rounded-md" />
            </div>
          ))}
        </div>

        {/* Charts Grid Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs space-y-4">
            <div className="space-y-1.5 pb-3 border-b border-slate-100">
              <Skeleton className="h-5 w-48 rounded-md" />
              <Skeleton className="h-3.5 w-64 rounded-md" />
            </div>
            <div className="space-y-4 py-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-40 rounded-md" />
                    <Skeleton className="h-4 w-12 rounded-md" />
                  </div>
                  <Skeleton className="h-3 w-full rounded-full" />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs space-y-4">
            <div className="space-y-1.5 pb-3 border-b border-slate-100">
              <Skeleton className="h-5 w-40 rounded-md" />
              <Skeleton className="h-3.5 w-48 rounded-md" />
            </div>
            <div className="flex justify-center py-6">
              <Skeleton className="w-36 h-36 rounded-full" />
            </div>
            <div className="space-y-2 pt-2 border-t border-slate-100">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex justify-between">
                  <Skeleton className="h-4 w-28 rounded-md" />
                  <Skeleton className="h-4 w-12 rounded-md" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

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
              Live Database Telemetry
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
                stats: analytics,
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
            <span className="text-xs sm:text-sm font-medium text-slate-500">Total Businesses</span>
            <div className="w-8 h-8 rounded-xl bg-pink-50 text-[#D41367] flex items-center justify-center border border-pink-100/60">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {analytics.total_businesses}
          </div>
          <div className="text-xs text-slate-500 font-normal mt-1">Active enterprise profiles</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4.5 sm:p-5 space-y-1.5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-medium text-slate-500">Verification Rate</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-emerald-700 tracking-tight">
            {goldRate}%
          </div>
          <div className="text-xs text-slate-500 font-normal mt-1">Gold &amp; Silver Tiers</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4.5 sm:p-5 space-y-1.5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-medium text-slate-500">Pending Reviews</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
              <BarChart3 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {analytics.pending_verifications}
          </div>
          <div className="text-xs text-slate-500 font-normal mt-1">Documents awaiting audit</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4.5 sm:p-5 space-y-1.5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-medium text-slate-500">Registered Members</span>
            <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center border border-slate-200">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {analytics.total_users}
          </div>
          <div className="text-xs text-slate-500 font-normal mt-1">Platform user accounts</div>
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
            <span className="text-xs text-slate-400 font-medium">Live Distribution</span>
          </div>

          <div className="h-60 flex items-end justify-between gap-4 pt-6 pb-2 border-b border-slate-100">
            {districtData.map((bar) => (
              <div key={bar.district} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <div
                  style={{ height: `${Math.max(bar.value, 15)}%` }}
                  className={`w-full max-w-[56px] ${bar.color} rounded-t-xl transition-all group-hover:opacity-90`}
                  title={`${bar.district}: ${bar.businesses} Listings`}
                />
                <span className="text-xs text-slate-500 font-medium truncate max-w-[90px]">
                  {bar.district}
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

        {/* Platform Verification Distribution */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs space-y-4">
          <div className="pb-3 border-b border-slate-100">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Platform Integrity
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-normal mt-0.5">
              Accreditation compliance audit overview.
            </p>
          </div>

          <div className="space-y-3 pt-1">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-700">Gold Tier (DRR Certified)</span>
                <span className="text-[#D41367] font-bold">{analytics.gold_tier_count} Enterprises</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#D41367] rounded-full"
                  style={{
                    width: `${analytics.total_businesses > 0 ? (analytics.gold_tier_count / analytics.total_businesses) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-700">Silver Tier (GST Verified)</span>
                <span className="text-slate-900 font-bold">{analytics.silver_tier_count} Enterprises</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-slate-900 rounded-full"
                  style={{
                    width: `${analytics.total_businesses > 0 ? (analytics.silver_tier_count / analytics.total_businesses) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-700">Standard Tier</span>
                <span className="text-amber-600 font-bold">
                  {Math.max(0, analytics.total_businesses - analytics.gold_tier_count - analytics.silver_tier_count)} Enterprises
                </span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-600 rounded-full"
                  style={{
                    width: `${
                      analytics.total_businesses > 0
                        ? ((analytics.total_businesses - analytics.gold_tier_count - analytics.silver_tier_count) /
                            analytics.total_businesses) *
                          100
                        : 0
                    }%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
