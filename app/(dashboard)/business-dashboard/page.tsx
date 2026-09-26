"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Eye,
  Mail,
  ShieldCheck,
  ArrowRight,
  ExternalLink,
  Edit3,
  TrendingUp,
  ChevronRight,
  MousePointerClick,
  Share2,
  Package,
  MapPin,
  Check,
  Copy,
  MapPinCheck,
  Wrench,
  Globe,
  ShoppingBag,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { VerificationBadge } from "@/components/verification-badge";
import { Skeleton } from "@/components/ui/skeleton";
import { INQUIRY_STATUSES } from "@/lib/constants";
import { getOwnerBusinessAction, getOwnerDashboardStatsAction, getOwnerEnquiriesAction } from "@/app/actions/owner";
import type { Business, OwnerDashboardStats, Enquiry } from "@/lib/types";
import { formatCurrencyPrice } from "@/lib/utils";

import {
  getCachedDashboardData,
  setCachedDashboardData,
} from "@/lib/cache/admin-cache";

const DEFAULT_OWNER_STATS: OwnerDashboardStats = {
  profile_completeness: 0,
  profile_impressions: 0,
  impressions_change: 0,
  total_enquiries: 0,
  unread_enquiries: 0,
};

export default function OwnerDashboardPage() {
  const cachedBiz = getCachedDashboardData<Business>("owner_biz");
  const cachedStats = getCachedDashboardData<OwnerDashboardStats>("owner_stats");
  const cachedInquiries = getCachedDashboardData<Enquiry[]>("owner_inquiries");

  const [business, setBusiness] = useState<Business | null>(cachedBiz || null);
  const [stats, setStats] = useState<OwnerDashboardStats>(cachedStats || DEFAULT_OWNER_STATS);
  const [recentInquiries, setRecentInquiries] = useState<Enquiry[]>(cachedInquiries || []);
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(!cachedBiz);

  useEffect(() => {
    async function loadData() {
      try {
        if (!cachedBiz) {
          setIsLoading(true);
        }
        const biz = await getOwnerBusinessAction();
        if (biz) {
          setBusiness(biz);
          const [bizStats, enquiries] = await Promise.all([
            getOwnerDashboardStatsAction(biz.id),
            getOwnerEnquiriesAction(biz.id),
          ]);
          setStats(bizStats);
          setRecentInquiries(enquiries.slice(0, 3));

          setCachedDashboardData("owner_biz", biz);
          setCachedDashboardData("owner_stats", bizStats);
          setCachedDashboardData("owner_inquiries", enquiries.slice(0, 3));
        }
      } catch (err) {
        console.error("Failed to load owner dashboard:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const handleCopyLink = () => {
    if (!business?.slug) return;
    navigator.clipboard.writeText(`https://rotaractnetwork.org/business/${business.slug}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="space-y-5 animate-fade-in max-w-[1600px] mx-auto pb-6">
        {/* Header Skeleton */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Skeleton className="w-12 h-12 rounded-2xl shrink-0" />
            <div className="space-y-2">
              <div className="flex items-center gap-2.5">
                <Skeleton className="h-6 w-52 rounded-md" />
                <Skeleton className="h-5 w-24 rounded-full" />
              </div>
              <Skeleton className="h-4 w-72 rounded-md" />
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <Skeleton className="h-9 w-24 rounded-xl" />
            <Skeleton className="h-9 w-28 rounded-xl" />
          </div>
        </div>

        {/* 4 Stat Cards Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-200 p-4.5 space-y-3 shadow-2xs">
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-28 rounded-md" />
                <Skeleton className="w-7 h-7 rounded-lg" />
              </div>
              <Skeleton className="h-7 w-16 rounded-md" />
              <Skeleton className="h-3 w-32 rounded-md" />
            </div>
          ))}
        </div>

        {/* 2 Column Operational Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <Skeleton className="h-5 w-40 rounded-md" />
              <Skeleton className="h-4 w-20 rounded-md" />
            </div>
            <div className="divide-y divide-slate-100 space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="py-3 flex items-center justify-between gap-3 first:pt-0 last:pb-0">
                  <div className="space-y-1.5 flex-1">
                    <Skeleton className="h-4 w-36 rounded-md" />
                    <Skeleton className="h-3.5 w-64 rounded-md" />
                  </div>
                  <Skeleton className="h-7 w-20 rounded-xl" />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4">
            <Skeleton className="h-5 w-36 rounded-md pb-1 border-b border-slate-100" />
            <div className="space-y-3">
              <Skeleton className="h-10 w-full rounded-xl" />
              <Skeleton className="h-10 w-full rounded-xl" />
              <Skeleton className="h-10 w-full rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!business) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-4 max-w-xl mx-auto my-12">
        <div className="w-12 h-12 rounded-2xl bg-pink-50 text-[#D41367] flex items-center justify-center mx-auto">
          <Package className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">No Registered Business Found</h2>
        <p className="text-sm text-slate-500">
          You have not registered a business enterprise yet or your registration is in progress.
        </p>
        <Button className="bg-[#D41367] hover:bg-[#B80E56] text-white rounded-xl" asChild>
          <Link href="/register">Register Your Business</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-5 animate-fade-in max-w-[1600px] mx-auto pb-6">
      {/* ================= HEADER BANNER ================= */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white font-bold text-xl flex items-center justify-center shadow-xs shrink-0">
            {business.name.charAt(0)}
          </div>
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                {business.name}
              </h1>
              <VerificationBadge level={business.verification_level} size="sm" />
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-500 font-normal">
              <span className="px-2 py-0.5 rounded-md bg-pink-50 text-[#D41367] font-semibold text-xs border border-pink-100/60">
                {business.category?.name || "General"}
              </span>
              <span className="flex items-center gap-1 font-medium ml-1">
                <MapPin className="w-3.5 h-3.5 text-[#D41367]" />
                {business.location?.city || "Nationwide"}, Dist {business.rotaract_profile?.district_number || "3220"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <Button
            variant="outline"
            className="rounded-xl text-xs sm:text-sm font-semibold text-slate-700 border-slate-200 hover:bg-slate-50 hover:text-slate-900 gap-2 h-9.5 px-3.5"
            asChild
          >
            <Link href={`/business/${business.slug}`} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              <span>Public View</span>
            </Link>
          </Button>

          <Button
            className="bg-[#D41367] hover:bg-[#B80E56] text-white rounded-xl text-xs sm:text-sm font-semibold gap-2 h-9.5 px-4 shadow-xs"
            asChild
          >
            <Link href="/business-dashboard/edit-profile">
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Profile</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* ================= 4 METRIC STAT CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Directory Impressions */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4.5 sm:p-5 space-y-2 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-medium text-slate-500">Directory Impressions</span>
            <div className="w-8 h-8 rounded-xl bg-pink-50 text-[#D41367] flex items-center justify-center border border-pink-100/60">
              <Eye className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {stats.profile_impressions.toLocaleString()}
            </div>
            <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 mt-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+{stats.impressions_change}% vs last month</span>
            </div>
          </div>
        </div>

        {/* Card 2: Direct Inquiries */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4.5 sm:p-5 space-y-2 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-medium text-slate-500">Direct Inquiries</span>
            <div className="w-8 h-8 rounded-xl bg-pink-50 text-[#D41367] flex items-center justify-center border border-pink-100/60">
              <Mail className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {stats.total_enquiries}
            </div>
            <div className="text-xs font-medium text-slate-500 mt-1">
              <span className="text-[#D41367] font-semibold">{stats.unread_enquiries} new unread</span> inquiries
            </div>
          </div>
        </div>

        {/* Card 3: Profile Engagements */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4.5 sm:p-5 space-y-2 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-medium text-slate-500">Contact Clicks</span>
            <div className="w-8 h-8 rounded-xl bg-pink-50 text-[#D41367] flex items-center justify-center border border-pink-100/60">
              <MousePointerClick className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              348
            </div>
            <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 mt-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>12.2% conversion rate</span>
            </div>
          </div>
        </div>

        {/* Card 4: Verification Status */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4.5 sm:p-5 space-y-2 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-medium text-slate-500">Accreditation</span>
            <div className="w-8 h-8 rounded-xl bg-pink-50 text-[#D41367] flex items-center justify-center border border-pink-100/60">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <VerificationBadge level={business.verification_level} size="sm" />
              <span className="text-sm font-bold text-slate-900">
                {business.verification_level === 2 || business.verification_level === 3
                  ? "DRR Endorsed"
                  : business.verification_level === 1
                  ? "GST Verified"
                  : "Standard Listing"}
              </span>
            </div>
            <Link
              href="/business-dashboard/verification"
              className="text-xs font-semibold text-[#D41367] hover:text-[#B80E56] transition-colors inline-flex items-center gap-1 mt-1"
            >
              <span>{business.verification_level < 2 ? "Apply for DRR Verification" : "Manage Documents"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* ================= 2-COLUMN OPERATIONAL SECTION ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
        {/* Left Column: Recent Inquiries & Lead Pipeline (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs space-y-3.5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                Recent Inquiries
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-normal mt-0.5">
                Client project requests and business inquiries
              </p>
            </div>
            <Link
              href="/business-dashboard/enquiries"
              className="text-xs sm:text-sm font-semibold text-[#D41367] hover:text-[#B80E56] transition-colors inline-flex items-center gap-1"
            >
              <span>View all ({stats.total_enquiries})</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {recentInquiries.length === 0 ? (
              <div className="py-8 text-center text-slate-500 text-xs">
                No inquiries received yet. Once potential customers submit enquiries from your profile, they will appear here.
              </div>
            ) : (
              recentInquiries.map((inq) => {
                const statusConfig = INQUIRY_STATUSES[inq.status] || {
                  label: inq.status,
                  bgClass: "bg-slate-100 text-slate-700",
                };

                return (
                  <div
                    key={inq.id}
                    className="py-3 first:pt-1 last:pb-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                  >
                    <div className="min-w-0 flex-1 space-y-0.5">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-slate-900 truncate">
                          {inq.from_name}
                        </h4>
                        <span className="text-xs text-slate-400 font-normal">
                          {new Date(inq.created_at).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 font-normal truncate">
                        {inq.service_requested || "General Business Inquiry"}
                      </p>
                      {inq.from_organization && (
                        <p className="text-xs text-slate-400 font-normal truncate">
                          {inq.from_organization}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-2.5 shrink-0">
                      <span
                        className={`text-xs font-semibold px-2.5 py-0.5 rounded-md ${statusConfig.bgClass}`}
                      >
                        {statusConfig.label}
                      </span>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs font-semibold text-slate-600 hover:text-[#D41367] hover:bg-pink-50 rounded-xl px-2.5 h-8"
                        asChild
                      >
                        <Link href="/business-dashboard/enquiries">
                          <span>Details</span>
                          <ArrowRight className="w-3.5 h-3.5 ml-1" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Quick Actions Hub (1 col) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs space-y-3.5">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Quick Actions
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 font-normal mt-0.5">
              Manage your business profile and listings
            </p>
          </div>

          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full justify-between text-xs sm:text-sm font-semibold text-slate-700 border-slate-200 hover:bg-pink-50 hover:text-[#D41367] hover:border-pink-200 rounded-xl h-10 px-3.5"
              asChild
            >
              <Link href="/business-dashboard/edit-profile#services">
                <span className="flex items-center gap-2.5">
                  <Package className="w-4 h-4 text-[#D41367]" />
                  <span>Manage Services &amp; Products</span>
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>
            </Button>

            <Button
              variant="outline"
              className="w-full justify-between text-xs sm:text-sm font-semibold text-slate-700 border-slate-200 hover:bg-pink-50 hover:text-[#D41367] hover:border-pink-200 rounded-xl h-10 px-3.5"
              asChild
            >
              <Link href="/business-dashboard/edit-profile">
                <span className="flex items-center gap-2.5">
                  <MapPinCheck className="w-4 h-4 text-[#D41367]" />
                  <span>Edit Contact &amp; Location</span>
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>
            </Button>

            <Button
              variant="outline"
              className="w-full justify-between text-xs sm:text-sm font-semibold text-slate-700 border-slate-200 hover:bg-pink-50 hover:text-[#D41367] hover:border-pink-200 rounded-xl h-10 px-3.5"
              asChild
            >
              <Link href="/business-dashboard/verification">
                <span className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#D41367]" />
                  <span>Verification &amp; Tier Upgrades</span>
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>
            </Button>

            <Button
              variant="outline"
              onClick={handleCopyLink}
              className="w-full justify-between text-xs sm:text-sm font-semibold text-slate-700 border-slate-200 hover:bg-slate-50 rounded-xl h-10 px-3.5 cursor-pointer"
            >
              <span className="flex items-center gap-2.5">
                <Share2 className="w-4 h-4 text-slate-500" />
                <span>{copied ? "Link Copied!" : "Copy Directory Link"}</span>
              </span>
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-600" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-slate-400" />
              )}
            </Button>

            <Button
              className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs sm:text-sm font-semibold h-10 shadow-xs mt-1 px-3.5"
              asChild
            >
              <Link href={`/business/${business.slug}`} target="_blank" rel="noopener noreferrer">
                <span className="flex items-center gap-2">
                  <ExternalLink className="w-3.5 h-3.5 text-pink-300" />
                  <span>View Public Listing</span>
                </span>
                <ArrowRight className="w-3.5 h-3.5 ml-auto text-slate-400" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* ================= OFFERINGS & CAPABILITIES PREVIEW ================= */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-[#D41367]" />
              <span>Published Solutions &amp; Offerings</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 font-normal mt-0.5">
              Active commercial capabilities listed on your public directory profile
            </p>
          </div>
          <Button
            className="bg-[#D41367] hover:bg-[#B80E56] text-white rounded-xl text-xs sm:text-sm font-semibold gap-2 shrink-0 h-9 px-4 shadow-xs"
            asChild
          >
            <Link href="/business-dashboard/edit-profile">
              <Plus className="w-3.5 h-3.5" />
              <span>Add / Manage Offerings</span>
            </Link>
          </Button>
        </div>

        {business.products_services && business.products_services.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {business.products_services.map((item) => {
              const isService = item.type === "service";
              const scopeLabel = item.service_area
                ? item.service_area.charAt(0).toUpperCase() + item.service_area.slice(1)
                : null;
              const formattedPrice = formatCurrencyPrice(item.price_from, business.location?.country);

              return (
                <div
                  key={item.id}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs hover:border-[#D41367]/40 hover:shadow-md transition-all group flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    {/* Top Bar: Type + Price */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 text-white text-[10px] font-extrabold uppercase tracking-wider shadow-2xs">
                        {isService ? (
                          <Wrench className="w-3.5 h-3.5 text-pink-400" />
                        ) : (
                          <Package className="w-3.5 h-3.5 text-pink-400" />
                        )}
                        <span>{isService ? "Service" : "Product"}</span>
                      </div>
                      <span className="bg-pink-50 text-[#D41367] font-black text-xs px-2.5 py-1 rounded-lg shadow-2xs border border-pink-200/60">
                        {formattedPrice || "On Quote"}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <div className="space-y-1 pt-0.5">
                      <h4 className="text-sm font-bold text-slate-900 leading-snug line-clamp-1 group-hover:text-[#D41367] transition-colors">
                        {item.name}
                      </h4>
                      {item.description && (
                        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-normal">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Bottom Footer Split */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="inline-flex items-center gap-1 text-[11px] text-slate-600 bg-slate-50 px-2.5 py-0.5 rounded-md border border-slate-200/80 font-medium">
                      <Globe className="w-3 h-3 text-[#D41367]" />
                      <span>{scopeLabel || "Nationwide"}</span>
                    </span>
                    <Link
                      href="/business-dashboard/edit-profile"
                      className="text-xs font-semibold text-[#D41367] hover:text-[#B80E56] transition-colors inline-flex items-center gap-1"
                    >
                      <span>Edit</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-8 rounded-2xl bg-slate-50 border border-dashed border-slate-200 text-center space-y-2">
            <ShoppingBag className="w-8 h-8 text-[#D41367] mx-auto opacity-60" />
            <h4 className="text-sm font-bold text-slate-800">No Offerings Added Yet</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Add your enterprise's core services, consulting packages, or physical products to attract direct client inquiries.
            </p>
            <div className="pt-2">
              <Button
                className="bg-[#D41367] hover:bg-[#B80E56] text-white rounded-xl text-xs font-semibold h-8.5 px-4 shadow-xs"
                asChild
              >
                <Link href="/business-dashboard/edit-profile">
                  <Plus className="w-3.5 h-3.5 mr-1" />
                  <span>Add First Offering</span>
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
