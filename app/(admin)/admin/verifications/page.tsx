"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Search,
  CheckCircle2,
  XCircle,
  Eye,
  FileText,
  AlertCircle,
  X,
  ShieldAlert,
  Clock,
  Ban,
  User,
  AlertTriangle,
  Send,
  FileWarning,
  ChevronDown,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { mockDeactivationRequests } from "@/lib/mock-data";
import {
  DEACTIVATION_REASON_CATEGORIES,
  DEACTIVATION_STATUS_BADGES,
  DEACTIVATION_URGENCY_BADGES,
} from "@/lib/constants";
import type { BusinessDeactivationRequest } from "@/lib/types";

interface AdminVerificationItem {
  id: string;
  name: string;
  slug: string;
  district: string;
  requestedBadge: "DRR Verified" | "GST Verified";
  docs: string;
  submitted: string;
  status: "pending" | "approved" | "rejected";
}

const initialVerifications: AdminVerificationItem[] = [
  {
    id: "1",
    name: "Lumina Digital Solutions",
    slug: "lumina-digital-solutions",
    district: "District 3220",
    requestedBadge: "DRR Verified",
    docs: "DRR Letter, GST Cert",
    submitted: "2h ago",
    status: "pending",
  },
  {
    id: "2",
    name: "Apex Dental Studio",
    slug: "apex-dental-studio",
    district: "District 3141",
    requestedBadge: "DRR Verified",
    docs: "DRR Letter, Tax Proof",
    submitted: "5h ago",
    status: "pending",
  },
  {
    id: "3",
    name: "Vivid Design Hub",
    slug: "vivid-design-hub",
    district: "District 9212",
    requestedBadge: "GST Verified",
    docs: "GST Certificate",
    submitted: "1d ago",
    status: "pending",
  },
  {
    id: "4",
    name: "Colombo Tea Exports Ltd",
    slug: "colombo-tea-exports",
    district: "District 3220",
    requestedBadge: "DRR Verified",
    docs: "Export License, DRR Letter",
    submitted: "2d ago",
    status: "approved",
  },
];

export default function AdminVerificationsPage() {
  const [activeTab, setActiveTab] = useState<"verifications" | "deactivations">("verifications");
  const [verifications, setVerifications] = useState<AdminVerificationItem[]>(initialVerifications);
  const [deactivations, setDeactivations] = useState<BusinessDeactivationRequest[]>(mockDeactivationRequests);

  const [searchQuery, setSearchQuery] = useState("");
  const [tierFilter, setTierFilter] = useState("all");
  const [deactFilter, setDeactFilter] = useState("all");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Verification modal state
  const [approveModalItem, setApproveModalItem] = useState<AdminVerificationItem | null>(null);
  const [returnModalItem, setReturnModalItem] = useState<AdminVerificationItem | null>(null);
  const [returnFeedback, setReturnFeedback] = useState("");

  // Deactivation review modal state
  const [reviewDeactItem, setReviewDeactItem] = useState<BusinessDeactivationRequest | null>(null);
  const [adminResolutionNotes, setAdminResolutionNotes] = useState("");

  // Lock background scrolling and prevent Lenis capture when any modal is open
  useEffect(() => {
    if (approveModalItem || returnModalItem || reviewDeactItem) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [approveModalItem, returnModalItem, reviewDeactItem]);

  const pendingVerificationsCount = verifications.filter((i) => i.status === "pending").length;
  const pendingDeactivationsCount = deactivations.filter((i) => i.status === "pending").length;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Verification handlers
  const confirmApproveVerification = () => {
    if (!approveModalItem) return;
    setVerifications((prev) =>
      prev.map((item) => (item.id === approveModalItem.id ? { ...item, status: "approved" } : item))
    );
    showToast(`Approved ${approveModalItem.name} for ${approveModalItem.requestedBadge} badge.`);
    setApproveModalItem(null);
  };

  const confirmReturnVerification = () => {
    if (!returnModalItem) return;
    setVerifications((prev) =>
      prev.map((item) => (item.id === returnModalItem.id ? { ...item, status: "rejected" } : item))
    );
    showToast(`Returned ${returnModalItem.name} for revision.`);
    setReturnModalItem(null);
    setReturnFeedback("");
  };

  // Deactivation handlers
  const confirmApproveDeactivation = () => {
    if (!reviewDeactItem) return;
    setDeactivations((prev) =>
      prev.map((item) =>
        item.id === reviewDeactItem.id
          ? {
              ...item,
              status: "approved",
              admin_notes:
                adminResolutionNotes.trim() || "Confirmed violation. Listing deactivated and suspended.",
              reviewed_by: "Rtn. Kanishka De Silva (Super Admin)",
              reviewed_at: new Date().toISOString(),
            }
          : item
      )
    );
    showToast(
      `Business "${reviewDeactItem.business_name}" has been deactivated and suspended.`
    );
    setReviewDeactItem(null);
    setAdminResolutionNotes("");
  };

  const confirmDismissDeactivation = () => {
    if (!reviewDeactItem) return;
    setDeactivations((prev) =>
      prev.map((item) =>
        item.id === reviewDeactItem.id
          ? {
              ...item,
              status: "rejected",
              admin_notes:
                adminResolutionNotes.trim() || "Reviewed by Admin. Request dismissed; listing remains active.",
              reviewed_by: "Rtn. Kanishka De Silva (Super Admin)",
              reviewed_at: new Date().toISOString(),
            }
          : item
      )
    );
    showToast(
      `Deactivation request for "${reviewDeactItem.business_name}" was dismissed.`
    );
    setReviewDeactItem(null);
    setAdminResolutionNotes("");
  };

  // Filtered lists
  const filteredVerifications = verifications.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.district.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBadge =
      tierFilter === "all"
        ? true
        : tierFilter === "drr"
        ? item.requestedBadge === "DRR Verified"
        : item.requestedBadge === "GST Verified";
    return matchesSearch && matchesBadge;
  });

  const filteredDeactivations = deactivations.filter((item) => {
    const matchesSearch =
      item.business_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.moderator_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.owner_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.reason_details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `district ${item.district_number}`.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      deactFilter === "all" ? true : item.status === deactFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-fade-in max-w-[1600px] mx-auto pb-12">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs sm:text-sm font-semibold px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-2 duration-200 border border-slate-700">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ================= MODAL: APPROVE VERIFICATION (SCROLLABLE) ================= */}
      {approveModalItem && (
        <div
          data-lenis-prevent="true"
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto overscroll-contain animate-in fade-in duration-200"
        >
          <div
            data-lenis-prevent="true"
            className="bg-white rounded-2xl p-5 sm:p-6 max-w-md w-full shadow-xl border border-slate-200 relative my-auto max-h-[88vh] flex flex-col overscroll-contain animate-in zoom-in-95 duration-200"
          >
            {/* Header (Pinned) */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">Approve Accreditation</h3>
                  <p className="text-xs text-slate-500 font-normal">Confirm verified badge grant.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setApproveModalItem(null)}
                className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div
              data-lenis-prevent="true"
              className="flex-1 overflow-y-auto space-y-3.5 py-3.5 pr-1 overscroll-contain scroll-smooth"
            >
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs sm:text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Business:</span>
                  <span className="font-bold text-slate-900">{approveModalItem.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">District:</span>
                  <span className="font-semibold text-slate-700">{approveModalItem.district}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Badge Grant:</span>
                  <span className="font-bold text-[#D41367]">{approveModalItem.requestedBadge}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Documents:</span>
                  <span className="text-slate-700">{approveModalItem.docs}</span>
                </div>
              </div>

              <p className="text-xs text-slate-500 font-normal leading-relaxed">
                Granting this verification will immediately award the official badge, unlock directory ranking boosts, and notify the business owner.
              </p>
            </div>

            {/* Footer (Pinned) */}
            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100 shrink-0">
              <Button
                type="button"
                variant="outline"
                onClick={() => setApproveModalItem(null)}
                className="rounded-xl text-xs sm:text-sm font-semibold text-slate-700 border-slate-200 hover:bg-slate-50 h-9.5 px-4"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={confirmApproveVerification}
                className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-semibold h-9.5 px-5 shadow-xs cursor-pointer"
              >
                Confirm &amp; Award Badge
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: RETURN VERIFICATION (SCROLLABLE) ================= */}
      {returnModalItem && (
        <div
          data-lenis-prevent="true"
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto overscroll-contain animate-in fade-in duration-200"
        >
          <div
            data-lenis-prevent="true"
            className="bg-white rounded-2xl p-5 sm:p-6 max-w-md w-full shadow-xl border border-slate-200 relative my-auto max-h-[88vh] flex flex-col overscroll-contain animate-in zoom-in-95 duration-200"
          >
            {/* Header (Pinned) */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center border border-red-100 shrink-0">
                  <AlertCircle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">Return for Revision</h3>
                  <p className="text-xs text-slate-500 font-normal">Request document corrections.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setReturnModalItem(null)}
                className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div
              data-lenis-prevent="true"
              className="flex-1 overflow-y-auto space-y-3.5 py-3.5 pr-1 overscroll-contain scroll-smooth"
            >
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm">
                <p className="font-bold text-slate-900">{returnModalItem.name}</p>
                <p className="text-xs text-slate-500 font-normal mt-0.5">{returnModalItem.district} • {returnModalItem.requestedBadge}</p>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs sm:text-sm font-semibold text-slate-700">Revision Reason &amp; Feedback *</Label>
                <Textarea
                  rows={3}
                  required
                  value={returnFeedback}
                  onChange={(e) => setReturnFeedback(e.target.value)}
                  placeholder="e.g. Scanned GST certificate is blurry, or DRR endorsement is for previous rotary tenure..."
                  className="w-full text-xs sm:text-sm bg-slate-50 rounded-xl border border-slate-200 resize-none focus:bg-white focus:border-[#D41367]"
                />
              </div>
            </div>

            {/* Footer (Pinned) */}
            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100 shrink-0">
              <Button
                type="button"
                variant="outline"
                onClick={() => setReturnModalItem(null)}
                className="rounded-xl text-xs sm:text-sm font-semibold text-slate-700 border-slate-200 hover:bg-slate-50 h-9.5 px-4"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={confirmReturnVerification}
                className="bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs sm:text-sm font-semibold h-9.5 px-5 shadow-xs cursor-pointer"
              >
                Submit Feedback &amp; Return
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: SUPER ADMIN REVIEW DEACTIVATION ESCALATION (SCROLLABLE) ================= */}
      {reviewDeactItem && (
        <div
          data-lenis-prevent="true"
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto overscroll-contain animate-in fade-in duration-200"
        >
          <div
            data-lenis-prevent="true"
            className="bg-white rounded-2xl p-6 max-w-xl w-full shadow-2xl border border-slate-200 relative my-auto max-h-[88vh] flex flex-col overscroll-contain animate-in zoom-in-95 duration-200"
          >
            {/* Header (Pinned) */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center border border-red-100 shrink-0">
                  <FileWarning className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    Review Deactivation Request
                  </h3>
                  <p className="text-xs text-slate-500 font-normal mt-0.5">
                    Moderator escalation for District {reviewDeactItem.district_number}.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setReviewDeactItem(null)}
                className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Content Body */}
            <div
              data-lenis-prevent="true"
              className="flex-1 overflow-y-auto space-y-4 py-4 pr-1.5 scrollbar-thin overscroll-contain scroll-smooth"
            >
              {/* Target Business & Moderator Details Card */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5 text-xs sm:text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Target Business:</span>
                  <span className="font-bold text-slate-900 text-sm">{reviewDeactItem.business_name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Owner / Rep:</span>
                  <span className="text-slate-700 font-medium">{reviewDeactItem.owner_name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Reporting Moderator:</span>
                  <span className="text-slate-800 font-semibold">{reviewDeactItem.moderator_name} (District {reviewDeactItem.district_number})</span>
                </div>
                <div className="flex justify-between items-center pt-1 border-t border-slate-200/60">
                  <span className="text-slate-500">Reason Category:</span>
                  <span className="font-bold text-red-700">
                    {DEACTIVATION_REASON_CATEGORIES[reviewDeactItem.reason_category]?.label}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Urgency Level:</span>
                  <span className="uppercase font-bold text-xs text-slate-800">
                    {reviewDeactItem.urgency}
                  </span>
                </div>
              </div>

              {/* Moderator Findings */}
              <div className="space-y-1.5 text-xs">
                <Label className="font-bold text-slate-800">Moderator Justification &amp; Findings:</Label>
                <div className="p-3.5 bg-red-50/60 rounded-xl border border-red-100 text-slate-700 leading-relaxed text-xs">
                  {reviewDeactItem.reason_details}
                </div>
              </div>

              {reviewDeactItem.evidence_notes && (
                <div className="space-y-1.5 text-xs">
                  <Label className="font-bold text-slate-800">Evidence / Reference Notes:</Label>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-600 font-mono text-[11px]">
                    {reviewDeactItem.evidence_notes}
                  </div>
                </div>
              )}

              {/* Admin Resolution Input */}
              <div className="space-y-1.5 pb-2">
                <Label className="text-xs sm:text-sm font-semibold text-slate-800">
                  Super Admin Resolution Memo / Note (Optional)
                </Label>
                <Textarea
                  rows={3}
                  value={adminResolutionNotes}
                  onChange={(e) => setAdminResolutionNotes(e.target.value)}
                  placeholder="Enter administrative rationale (e.g. Audit confirmed non-operational status; suspending portal access and hiding directory listing)..."
                  className="text-xs sm:text-sm bg-slate-50 border-slate-200 rounded-xl focus:bg-white resize-none"
                />
              </div>
            </div>

            {/* Decision Actions (Pinned Footer) */}
            <div className="flex flex-col sm:flex-row items-center justify-end gap-2.5 pt-4 border-t border-slate-100 shrink-0">
              <Button
                type="button"
                variant="outline"
                onClick={() => setReviewDeactItem(null)}
                className="w-full sm:w-auto rounded-xl text-xs sm:text-sm font-semibold text-slate-700 border-slate-200 hover:bg-slate-50 h-10 px-4 cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={confirmDismissDeactivation}
                className="w-full sm:w-auto rounded-xl text-xs sm:text-sm font-semibold text-slate-700 border-slate-300 hover:bg-slate-100 h-10 px-4 cursor-pointer"
              >
                Dismiss Request
              </Button>
              <Button
                type="button"
                onClick={confirmApproveDeactivation}
                className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs sm:text-sm font-semibold h-10 px-5 shadow-xs gap-1.5 cursor-pointer"
              >
                <Ban className="w-4 h-4" />
                <span>Confirm &amp; Deactivate Business</span>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ================= HEADER BANNER ================= */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Global Verifications &amp; Compliance Queue
            </h1>
            <span className="px-2.5 py-0.5 rounded-md bg-pink-50 text-[#D41367] font-semibold text-xs border border-pink-100/60">
              Rotary International Governance
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-normal mt-0.5">
            Audit business credential submissions and review district moderator deactivation requests.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="outline"
            className="rounded-xl text-xs sm:text-sm font-semibold text-slate-700 border-slate-200 hover:bg-slate-50 gap-2 h-9.5 px-3.5"
            asChild
          >
            <Link href="/admin">
              <span>Back to Overview</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* ================= MAIN TABS ================= */}
      <div className="flex border-b border-slate-200 gap-6">
        <button
          onClick={() => {
            setActiveTab("verifications");
            setSearchQuery("");
          }}
          className={`pb-3 text-xs sm:text-sm font-bold transition-all relative cursor-pointer flex items-center gap-2 ${
            activeTab === "verifications"
              ? "text-[#D41367]"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Document Verifications</span>
          {pendingVerificationsCount > 0 && (
            <span className="px-2 py-0.5 rounded-full text-[11px] bg-pink-100 text-[#D41367] font-bold">
              {pendingVerificationsCount}
            </span>
          )}
          {activeTab === "verifications" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D41367] rounded-full" />
          )}
        </button>

        <button
          onClick={() => {
            setActiveTab("deactivations");
            setSearchQuery("");
          }}
          className={`pb-3 text-xs sm:text-sm font-bold transition-all relative cursor-pointer flex items-center gap-2 ${
            activeTab === "deactivations"
              ? "text-[#D41367]"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          <ShieldAlert className="w-4 h-4 text-red-600" />
          <span>Moderator Deactivation Requests</span>
          {pendingDeactivationsCount > 0 && (
            <span className="px-2 py-0.5 rounded-full text-[11px] bg-red-100 text-red-700 font-bold">
              {pendingDeactivationsCount}
            </span>
          )}
          {activeTab === "deactivations" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D41367] rounded-full" />
          )}
        </button>
      </div>

      {/* ================= TAB 1: DOCUMENT VERIFICATIONS QUEUE ================= */}
      {activeTab === "verifications" && (
        <div className="space-y-4">
          {/* SEARCH & FILTER TOOLBAR */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by business name or district..."
                className="pl-9.5 h-9.5 text-xs sm:text-sm bg-slate-50 border-slate-200 rounded-xl focus:bg-white"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
              {[
                { id: "all", label: "All Badges" },
                { id: "drr", label: "DRR Verified" },
                { id: "gst", label: "GST Verified" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setTierFilter(tab.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold shrink-0 cursor-pointer transition-all ${
                    tierFilter === tab.id
                      ? "bg-[#D41367] text-white shadow-2xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* TABLE LISTING */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
            <table className="w-full table-fixed text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-xs font-bold uppercase tracking-wider text-slate-500">
                  <th className="py-3.5 px-4 w-[24%] whitespace-nowrap">Business Name</th>
                  <th className="py-3.5 px-3 w-[14%] whitespace-nowrap">District</th>
                  <th className="py-3.5 px-3 w-[15%] whitespace-nowrap">Requested Badge</th>
                  <th className="py-3.5 px-3 w-[21%] whitespace-nowrap">Documents</th>
                  <th className="py-3.5 px-3 w-[10%] whitespace-nowrap">Submitted</th>
                  <th className="py-3.5 px-4 w-[16%] text-right whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                {filteredVerifications.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-400">
                      No verification claims matched your search filter.
                    </td>
                  </tr>
                ) : (
                  filteredVerifications.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-slate-900 truncate block" title={item.name}>
                          {item.name}
                        </span>
                      </td>
                      <td className="py-3.5 px-3">
                        <span className="font-semibold text-slate-700 truncate block">
                          {item.district}
                        </span>
                      </td>
                      <td className="py-3.5 px-3">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-md text-xs font-semibold whitespace-nowrap border ${
                            item.requestedBadge === "DRR Verified"
                              ? "bg-pink-50 text-[#D41367] border-pink-200 font-bold"
                              : "bg-blue-50 text-blue-700 border-blue-200"
                          }`}
                        >
                          {item.requestedBadge}
                        </span>
                      </td>
                      <td className="py-3.5 px-3">
                        <span className="text-slate-600 font-normal truncate block" title={item.docs}>
                          {item.docs}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 whitespace-nowrap text-slate-400 font-normal">
                        {item.submitted}
                      </td>
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        {item.status === "approved" ? (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Approved</span>
                          </span>
                        ) : item.status === "rejected" ? (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded-md">
                            <XCircle className="w-3.5 h-3.5 text-red-600" />
                            <span>Returned</span>
                          </span>
                        ) : (
                          <div className="flex items-center justify-end gap-1.5">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 px-2 text-xs font-semibold rounded-lg border-slate-200 text-slate-700 hover:bg-slate-50 shrink-0"
                              asChild
                            >
                              <Link href={`/business/${item.slug}`} target="_blank" rel="noopener noreferrer">
                                <Eye className="w-3 h-3 mr-1" />
                                <span>View</span>
                              </Link>
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => setApproveModalItem(item)}
                              className="h-8 px-2 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg gap-1 cursor-pointer shadow-2xs shrink-0"
                            >
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Approve</span>
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => {
                                setReturnModalItem(item);
                                setReturnFeedback("");
                              }}
                              className="h-8 px-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg cursor-pointer shrink-0"
                            >
                              <XCircle className="w-3 h-3" />
                            </Button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= TAB 2: MODERATOR DEACTIVATION REQUESTS QUEUE ================= */}
      {activeTab === "deactivations" && (
        <div className="space-y-4">
          {/* SEARCH & FILTER TOOLBAR */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search business, moderator, district..."
                className="pl-9.5 h-9.5 text-xs sm:text-sm bg-slate-50 border-slate-200 rounded-xl focus:bg-white"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
              {[
                { id: "all", label: "All Requests" },
                { id: "pending", label: `Pending Review (${pendingDeactivationsCount})` },
                { id: "approved", label: "Deactivated" },
                { id: "rejected", label: "Dismissed" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setDeactFilter(tab.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold shrink-0 cursor-pointer transition-all ${
                    deactFilter === tab.id
                      ? "bg-[#D41367] text-white shadow-2xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* TABLE LISTING */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
            <table className="w-full table-fixed text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-xs font-bold uppercase tracking-wider text-slate-500">
                  <th className="py-3.5 px-4 w-[26%] whitespace-nowrap">Business &amp; Owner</th>
                  <th className="py-3.5 px-3 w-[13%] whitespace-nowrap">District</th>
                  <th className="py-3.5 px-3 w-[18%] whitespace-nowrap">Reporting Moderator</th>
                  <th className="py-3.5 px-3 w-[17%] whitespace-nowrap">Reason</th>
                  <th className="py-3.5 px-3 w-[12%] whitespace-nowrap">Status</th>
                  <th className="py-3.5 px-4 w-[14%] text-right whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                {filteredDeactivations.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-400">
                      No moderator deactivation requests found for the selected filter.
                    </td>
                  </tr>
                ) : (
                  filteredDeactivations.map((item) => {
                    const reasonMeta = DEACTIVATION_REASON_CATEGORIES[item.reason_category];
                    const statusMeta = DEACTIVATION_STATUS_BADGES[item.status];

                    return (
                      <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3 px-4">
                          <div className="min-w-0">
                            <span className="font-bold text-slate-900 truncate block text-xs sm:text-sm" title={item.business_name}>
                              {item.business_name}
                            </span>
                            <span className="text-[11px] text-slate-400 truncate block">
                              {item.owner_name}
                            </span>
                          </div>
                        </td>

                        <td className="py-3 px-3 whitespace-nowrap">
                          <span className="font-semibold text-slate-700 text-xs">
                            District {item.district_number}
                          </span>
                        </td>

                        <td className="py-3 px-3">
                          <span className="text-slate-800 font-medium truncate block text-xs" title={item.moderator_name}>
                            {item.moderator_name}
                          </span>
                        </td>

                        <td className="py-3 px-3">
                          <span
                            className={`inline-block px-2 py-0.5 rounded-md text-xs font-semibold truncate max-w-full border ${
                              reasonMeta?.badgeClass || "bg-slate-100 text-slate-700 border-slate-200"
                            }`}
                            title={reasonMeta?.label || item.reason_category}
                          >
                            {reasonMeta?.label || item.reason_category}
                          </span>
                        </td>

                        <td className="py-3 px-3 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-semibold border ${
                              statusMeta?.bgClass || "bg-slate-100 text-slate-700"
                            }`}
                          >
                            {item.status === "pending" && <Clock className="w-3 h-3 text-amber-600 shrink-0" />}
                            {item.status === "approved" && <Ban className="w-3 h-3 text-red-600 shrink-0" />}
                            {item.status === "rejected" && <XCircle className="w-3 h-3 text-slate-500 shrink-0" />}
                            <span>{statusMeta?.label || item.status}</span>
                          </span>
                        </td>

                        <td className="py-3 px-4 text-right whitespace-nowrap">
                          {item.status === "pending" ? (
                            <Button
                              size="sm"
                              onClick={() => {
                                setReviewDeactItem(item);
                                setAdminResolutionNotes("");
                              }}
                              className="h-8 px-2.5 text-xs font-semibold bg-red-600 hover:bg-red-700 text-white rounded-lg gap-1 shadow-2xs cursor-pointer"
                            >
                              <ShieldAlert className="w-3 h-3" />
                              <span>Review</span>
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setReviewDeactItem(item);
                                setAdminResolutionNotes(item.admin_notes || "");
                              }}
                              className="h-8 px-2.5 text-xs font-semibold text-slate-700 border-slate-200 hover:bg-slate-50 rounded-lg cursor-pointer"
                            >
                              <Eye className="w-3 h-3 mr-1" />
                              <span>Log</span>
                            </Button>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
