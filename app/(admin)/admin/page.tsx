"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  Download,
  Calendar,
  ShieldCheck,
  Building2,
  TrendingUp,
  ChevronRight,
  Award,
  ExternalLink,
  Clock,
  CheckCircle2,
  ChevronDown,
  Check,
  ShieldAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { VerificationBadge } from "@/components/verification-badge";
import {
  mockAdminAnalytics,
  mockBusinesses,
  mockDeactivationRequests,
} from "@/lib/mock-data";

const DATE_RANGE_OPTIONS = [
  "Last 7 Days",
  "Last 30 Days",
  "Last 90 Days",
  "Year to Date (2026)",
  "All Time",
];

export default function SuperAdminDashboardPage() {
  const analytics = mockAdminAnalytics;
  const recentVerifications = mockBusinesses.slice(0, 5);

  const [dateRange, setDateRange] = useState("Last 30 Days");
  const [isDateRangeOpen, setIsDateRangeOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSelectDateRange = (range: string) => {
    setDateRange(range);
    setIsDateRangeOpen(false);
    showToast(`Updated analytics view for: ${range}`);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-[1600px] mx-auto pb-12">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ================= HEADER BANNER ================= */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-0.5">
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Platform Administration &amp; Governance
            </h1>
            <span className="px-2.5 py-0.5 rounded-md bg-pink-50 text-[#D41367] font-semibold text-xs border border-pink-100/60">
              District Secretariat
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-normal mt-0.5">
            Directory analytics, verification queue tracking, and platform compliance governance.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          {/* Interactive Date Range Dropdown */}
          <div className="relative">
            <Button
              variant="outline"
              onClick={() => setIsDateRangeOpen(!isDateRangeOpen)}
              className="rounded-xl text-xs sm:text-sm font-semibold text-slate-700 border-slate-200 hover:bg-slate-50 gap-2 h-9.5 px-3.5 cursor-pointer shadow-2xs"
            >
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <span>{dateRange}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isDateRangeOpen ? "rotate-180" : ""}`} />
            </Button>

            {isDateRangeOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsDateRangeOpen(false)}
                />
                <div className="absolute right-0 mt-1.5 z-50 bg-white border border-slate-200 rounded-xl shadow-lg p-1.5 min-w-[180px] space-y-0.5 animate-in fade-in zoom-in-95 duration-150">
                  {DATE_RANGE_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleSelectDateRange(opt)}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer text-left ${dateRange === opt
                          ? "bg-pink-50 text-[#D41367]"
                          : "text-slate-700 hover:bg-slate-100"
                        }`}
                    >
                      <span>{opt}</span>
                      {dateRange === opt && <Check className="w-3.5 h-3.5 text-[#D41367]" />}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <Button
            onClick={() => {
              const data = {
                platform: "Rotaract Business Network",
                filter_period: dateRange,
                exported_at: new Date().toISOString(),
                stats: analytics,
              };
              const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = `admin-analytics-${dateRange.toLowerCase().replace(/\s+/g, "-")}.json`;
              a.click();
              showToast("Analytics export downloaded successfully.");
            }}
            className="bg-[#D41367] hover:bg-[#B80E56] text-white rounded-xl text-xs sm:text-sm font-semibold gap-2 h-9.5 px-4 shadow-xs cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Analytics</span>
          </Button>
        </div>
      </div>

      {/* ================= CRITICAL DISTRICT ALERT BANNER ================= */}
      {analytics.districts_without_moderators.length > 0 && (
        <div className="bg-red-50/70 border border-red-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-start sm:items-center gap-3.5 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-red-100 text-red-700 flex items-center justify-center font-bold shrink-0 border border-red-200">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="space-y-0.5">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold text-red-950">
                  Moderator Coverage Notice
                </h3>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-red-200/80 text-red-900">
                  {analytics.districts_without_moderators.length} Districts Unassigned
                </span>
              </div>
              <p className="text-xs sm:text-sm text-red-900/80 font-normal">
                District {analytics.districts_without_moderators.join(", ")} currently have no active moderators assigned.
              </p>
            </div>
          </div>

          <Button
            className="bg-red-700 hover:bg-red-800 text-white rounded-xl text-xs sm:text-sm font-semibold shrink-0 h-9.5 px-4.5 shadow-xs"
            asChild
          >
            <Link href="/admin/moderators">Assign Moderators</Link>
          </Button>
        </div>
      )}

      {/* ================= PENDING DEACTIVATION ESCALATIONS BANNER ================= */}
      {mockDeactivationRequests.filter((r) => r.status === "pending").length > 0 && (
        <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-start sm:items-center gap-3.5 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold shrink-0 border border-amber-200">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div className="space-y-0.5">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold text-amber-950">
                  Moderator Deactivation Escalations
                </h3>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-amber-200 text-amber-900">
                  {mockDeactivationRequests.filter((r) => r.status === "pending").length} Requests Pending Admin Action
                </span>
              </div>
              <p className="text-xs sm:text-sm text-amber-900/80 font-normal">
                District moderators have flagged listings for prolonged inactivity, fraudulent details, or policy violations.
              </p>
            </div>
          </div>

          <Button
            className="bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-xs sm:text-sm font-semibold shrink-0 h-9.5 px-4.5 shadow-xs"
            asChild
          >
            <Link href="/admin/verifications">Review Escalations</Link>
          </Button>
        </div>
      )}

      {/* ================= 4 METRIC STAT CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Businesses */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4.5 sm:p-5 space-y-2 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-medium text-slate-500">Total Directory Listings</span>
            <div className="w-8 h-8 rounded-xl bg-pink-50 text-[#D41367] flex items-center justify-center border border-pink-100/60">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {analytics.total_businesses.toLocaleString()}
            </div>
            <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 mt-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+{analytics.total_businesses_change}% vs previous period</span>
            </div>
          </div>
        </div>

        {/* Gold Tier */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4.5 sm:p-5 space-y-2 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-medium text-slate-500">Gold Enterprise Tier</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-100/80">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {analytics.gold_tier_count.toLocaleString()}
            </div>
            <div className="text-xs font-medium text-slate-500 mt-1">
              <span className="font-semibold text-amber-700">{analytics.gold_tier_percentage}%</span> of verified network
            </div>
          </div>
        </div>

        {/* Silver Tier */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4.5 sm:p-5 space-y-2 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-medium text-slate-500">Silver Certified Tier</span>
            <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center border border-slate-200">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {analytics.silver_tier_count.toLocaleString()}
            </div>
            <div className="text-xs font-medium text-slate-500 mt-1">
              <span className="font-semibold text-slate-800">{analytics.silver_tier_percentage}%</span> of verified network
            </div>
          </div>
        </div>

        {/* Unverified / Pending */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4.5 sm:p-5 space-y-2 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-medium text-slate-500">Pending Review Queue</span>
            <div className="w-8 h-8 rounded-xl bg-red-50 text-red-600 flex items-center justify-center border border-red-100/80">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {analytics.unverified_count.toLocaleString()}
            </div>
            <div className="text-xs font-medium text-slate-500 mt-1">
              <Link
                href="/admin/verifications"
                className="text-[#D41367] hover:text-[#B80E56] font-semibold inline-flex items-center gap-1"
              >
                <span>Audit Queue</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ================= 2-COLUMN OPERATIONAL SECTION ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column: Recent Business Verifications & Audits (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                Recent Verifications &amp; District Audits
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-normal mt-0.5">
                Live business directory claims and moderator review activity.
              </p>
            </div>
            <Link
              href="/admin/verifications"
              className="text-xs sm:text-sm font-semibold text-[#D41367] hover:text-[#B80E56] transition-colors inline-flex items-center gap-1"
            >
              <span>View All Queue</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {recentVerifications.map((biz) => (
              <div
                key={biz.id}
                className="py-3.5 first:pt-1 last:pb-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 group"
              >
                <div className="min-w-0 flex-1 space-y-0.5">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-slate-900 truncate">
                      {biz.name}
                    </h4>
                    <VerificationBadge level={biz.verification_level} size="sm" />
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 font-normal truncate">
                    {biz.category?.name || "General Business"} • Registered in District {biz.rotaract_profile?.district_number || "3220"}
                  </p>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                  <span className="text-xs text-slate-400 font-normal">
                    Reviewed recently
                  </span>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs font-semibold text-slate-600 hover:text-[#D41367] hover:bg-pink-50 rounded-xl px-3 h-8"
                    asChild
                  >
                    <Link href={`/business/${biz.slug}`} target="_blank" rel="noopener noreferrer">
                      <span>Inspect</span>
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Sector Distribution (1 col) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs space-y-4">
          <div className="pb-3 border-b border-slate-100">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Sector Distribution
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-normal mt-0.5">
              Active directory classification
            </p>
          </div>

          {/* Donut Chart */}
          <div className="relative w-36 h-36 mx-auto my-1 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="38"
                fill="none"
                stroke="#D41367"
                strokeWidth="14"
                strokeDasharray="81.18 238.76"
                strokeDashoffset="0"
              />
              <circle
                cx="50"
                cy="50"
                r="38"
                fill="none"
                stroke="#0F172A"
                strokeWidth="14"
                strokeDasharray="52.53 238.76"
                strokeDashoffset="-81.18"
              />
              <circle
                cx="50"
                cy="50"
                r="38"
                fill="none"
                stroke="#D97706"
                strokeWidth="14"
                strokeDasharray="42.98 238.76"
                strokeDashoffset="-133.71"
              />
              <circle
                cx="50"
                cy="50"
                r="38"
                fill="none"
                stroke="#64748B"
                strokeWidth="14"
                strokeDasharray="62.08 238.76"
                strokeDashoffset="-176.69"
              />
            </svg>
            <div className="absolute text-center">
              <span className="text-xs font-bold text-slate-900 block">4 Core</span>
              <span className="text-[10px] text-slate-400 font-medium">Sectors</span>
            </div>
          </div>

          <div className="space-y-2 pt-2 text-xs sm:text-sm border-t border-slate-100">
            {analytics.category_breakdown.map((cat) => (
              <div key={cat.name} className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: cat.color }} />
                  <span className="text-slate-600 font-medium">{cat.name}</span>
                </span>
                <span className="font-bold text-slate-900">{cat.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
