"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Building2,
  Search,
  MapPin,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  X,
  Send,
  Clock,
  Ban,
  ShieldAlert,
  User,
  HelpCircle,
  FileWarning,
  ChevronDown,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { VerificationBadge } from "@/components/verification-badge";
import { mockBusinesses, mockDeactivationRequests } from "@/lib/mock-data";
import {
  DEACTIVATION_REASON_CATEGORIES,
  DEACTIVATION_URGENCY_BADGES,
} from "@/lib/constants";
import type {
  Business,
  BusinessDeactivationRequest,
  DeactivationReasonCategory,
} from "@/lib/types";

export default function ModeratorDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Deactivation requests state
  const [deactivationRequests, setDeactivationRequests] = useState<
    BusinessDeactivationRequest[]
  >(mockDeactivationRequests);

  // Businesses list state
  const [businesses] = useState<Business[]>(
    mockBusinesses.filter(
      (b) => b.location?.country === "Sri Lanka" || b.status === "approved"
    )
  );

  // Request modal state
  const [selectedBizForDeactivation, setSelectedBizForDeactivation] =
    useState<Business | null>(null);
  const [reasonCategory, setReasonCategory] =
    useState<DeactivationReasonCategory>("inactivity");
  const [isReasonDropdownOpen, setIsReasonDropdownOpen] = useState(false);
  const [urgency, setUrgency] = useState<"low" | "medium" | "high" | "critical">("medium");
  const [reasonDetails, setReasonDetails] = useState("");
  const [evidenceNotes, setEvidenceNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Detail modal for already pending request
  const [viewingRequest, setViewingRequest] =
    useState<BusinessDeactivationRequest | null>(null);

  // Prevent background scrolling and Lenis event capture when modals are open
  useEffect(() => {
    if (selectedBizForDeactivation || viewingRequest) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedBizForDeactivation, viewingRequest]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const getBusinessDeactivationStatus = (bizId: string) => {
    const req = deactivationRequests.find(
      (r) => r.business_id === bizId && r.status === "pending"
    );
    return req;
  };

  const handleOpenDeactivationModal = (biz: Business) => {
    setSelectedBizForDeactivation(biz);
    setReasonCategory("inactivity");
    setIsReasonDropdownOpen(false);
    setUrgency("medium");
    setReasonDetails("");
    setEvidenceNotes("");
  };

  const handleSubmitDeactivationRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBizForDeactivation) return;
    if (!reasonDetails.trim()) {
      alert("Please provide the justification details for this deactivation request.");
      return;
    }

    setIsSubmitting(true);

    const newRequest: BusinessDeactivationRequest = {
      id: `deact-${Date.now()}`,
      business_id: selectedBizForDeactivation.id,
      business_name: selectedBizForDeactivation.name,
      business_slug: selectedBizForDeactivation.slug,
      business_category: selectedBizForDeactivation.category?.name || "Business",
      business_location: `${selectedBizForDeactivation.location?.city || "Colombo"}, Sri Lanka`,
      owner_name: selectedBizForDeactivation.owner?.name || "Registered Member",
      moderator_id: "user-2",
      moderator_name: "Ptr. Dilshan Wickremasinghe",
      district_number: 3220,
      reason_category: reasonCategory,
      reason_details: reasonDetails.trim(),
      evidence_notes: evidenceNotes.trim() || undefined,
      urgency: urgency,
      status: "pending",
      created_at: new Date().toISOString(),
    };

    setTimeout(() => {
      setDeactivationRequests((prev) => [newRequest, ...prev]);
      setIsSubmitting(false);
      setSelectedBizForDeactivation(null);
      showToast(
        `Deactivation request for "${selectedBizForDeactivation.name}" submitted to District Super Admin.`
      );
    }, 400);
  };

  const filtered = businesses.filter((b) => {
    const matchesSearch =
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (b.category?.name &&
        b.category.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (b.location?.city &&
        b.location.city.toLowerCase().includes(searchQuery.toLowerCase()));

    const pendingReq = getBusinessDeactivationStatus(b.id);

    if (statusFilter === "all") return matchesSearch;
    if (statusFilter === "active") return matchesSearch && !pendingReq && b.status === "approved";
    if (statusFilter === "flagged") return matchesSearch && !!pendingReq;
    if (statusFilter === "suspended") return matchesSearch && b.status === "suspended";

    return matchesSearch;
  });

  const pendingRequestsCount = deactivationRequests.filter(
    (r) => r.status === "pending"
  ).length;

  return (
    <div className="space-y-6 animate-fade-in max-w-[1600px] mx-auto pb-12">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs sm:text-sm font-semibold px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-2 duration-200 border border-slate-700">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ================= HEADER BANNER ================= */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              District 3220 Business Directory &amp; Moderation
            </h1>
            <span className="px-2.5 py-0.5 rounded-md bg-pink-50 text-[#D41367] font-semibold text-xs border border-pink-100/60">
              {businesses.length} Registered Enterprises
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-normal mt-0.5">
            Oversee active member listings in your district. You can inspect business credentials or escalate inactive/violating entities to the Super Admin for formal deactivation.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="outline"
            className="rounded-xl text-xs sm:text-sm font-semibold text-slate-700 border-slate-200 hover:bg-slate-50 gap-2 h-9.5 px-3.5"
            asChild
          >
            <Link href="/moderator">
              <span>Back to Desk</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* ================= SEARCH & STATUS FILTER TOOLBAR ================= */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search business, sector, city..."
            className="pl-9.5 h-9.5 text-xs sm:text-sm bg-slate-50 border-slate-200 rounded-xl focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {[
            { id: "all", label: "All Listings" },
            { id: "active", label: "Active & Verified" },
            { id: "flagged", label: `Deactivation Pending (${pendingRequestsCount})` },
            { id: "suspended", label: "Suspended" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold shrink-0 cursor-pointer transition-all ${
                statusFilter === tab.id
                  ? "bg-[#D41367] text-white shadow-2xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ================= BUSINESS CARDS GRID ================= */}
      {/* ================= BUSINESS CARDS GRID (COMPACT SLEEK CARDS) ================= */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3 shadow-2xs">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Building2 className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-800 text-base">No Businesses Found</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            No district business listings matched your search criteria or filter tab.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3.5">
          {filtered.map((b) => {
            const pendingDeactivation = getBusinessDeactivationStatus(b.id);
            const isSuspended = b.status === "suspended";

            return (
              <div
                key={b.id}
                className={`bg-white rounded-xl border p-3.5 shadow-2xs space-y-2.5 flex flex-col justify-between transition-all ${
                  pendingDeactivation
                    ? "border-amber-300 ring-2 ring-amber-100/70"
                    : isSuspended
                    ? "border-red-200 bg-red-50/20"
                    : "border-slate-200 hover:border-pink-200 hover:shadow-xs"
                }`}
              >
                <div className="space-y-2">
                  {/* Top Row: Avatar & Status Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8.5 h-8.5 rounded-lg bg-gradient-to-br from-slate-900 to-slate-800 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs">
                        {b.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-xs sm:text-sm text-slate-900 truncate leading-tight" title={b.name}>
                          {b.name}
                        </h3>
                        <p className="text-[11px] text-slate-500 truncate flex items-center gap-1 mt-0.5">
                          <User className="w-2.5 h-2.5 text-slate-400 shrink-0" />
                          <span>{b.owner?.name || "Registered Member"}</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Category & Verification Badge Row */}
                  <div className="flex items-center justify-between gap-1.5 pt-0.5">
                    <span className="inline-block text-[10px] font-semibold text-[#D41367] bg-pink-50 border border-pink-100/60 px-1.5 py-0.5 rounded truncate max-w-[140px]">
                      {b.category?.name || "Enterprise"}
                    </span>

                    {pendingDeactivation ? (
                      <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200 text-[10px] font-semibold flex items-center gap-0.5 shrink-0">
                        <Clock className="w-2.5 h-2.5 text-amber-600" />
                        Pending
                      </span>
                    ) : isSuspended ? (
                      <span className="px-1.5 py-0.5 rounded bg-red-100 text-red-800 border border-red-200 text-[10px] font-semibold flex items-center gap-0.5 shrink-0">
                        <Ban className="w-2.5 h-2.5 text-red-600" />
                        Suspended
                      </span>
                    ) : (
                      <VerificationBadge level={b.verification_level} size="sm" />
                    )}
                  </div>

                  {/* Flag Warning Banner if Deactivation Requested */}
                  {pendingDeactivation && (
                    <div className="p-2 rounded-lg bg-amber-50 border border-amber-200 text-[10px] text-amber-900 space-y-0.5">
                      <div className="flex items-center justify-between font-semibold">
                        <span className="flex items-center gap-1 text-amber-800">
                          <AlertTriangle className="w-3 h-3 text-amber-600 shrink-0" />
                          Escalated
                        </span>
                        <span className="text-[9px] text-amber-700 truncate max-w-[110px]">
                          {DEACTIVATION_REASON_CATEGORIES[pendingDeactivation.reason_category]?.label || "Inactivity"}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer Meta & Actions */}
                <div className="pt-2 border-t border-slate-100 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span className="font-medium flex items-center gap-1 truncate max-w-[130px]">
                      <MapPin className="w-3 h-3 text-[#D41367] shrink-0" />
                      <span className="truncate">{b.location?.city || "Colombo"}</span>
                    </span>
                    <span className="text-[10px] text-slate-400">
                      Est. {b.year_established || 2020}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-1.5 pt-0.5">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7.5 rounded-lg text-[11px] font-semibold text-slate-700 border-slate-200 hover:bg-slate-50 flex-1 px-2"
                      asChild
                    >
                      <Link
                        href={`/business/${b.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span>View</span>
                        <ExternalLink className="w-2.5 h-2.5 ml-1" />
                      </Link>
                    </Button>

                    {pendingDeactivation ? (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setViewingRequest(pendingDeactivation)}
                        className="h-7.5 rounded-lg text-[11px] font-semibold text-amber-700 hover:bg-amber-50 border border-amber-200/80 px-2 cursor-pointer"
                      >
                        <span>Log</span>
                      </Button>
                    ) : isSuspended ? (
                      <Button
                        size="sm"
                        disabled
                        variant="ghost"
                        className="h-7.5 rounded-lg text-[11px] font-semibold text-slate-400 border border-slate-200 px-2"
                      >
                        <span>Inactive</span>
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        onClick={() => handleOpenDeactivationModal(b)}
                        className="h-7.5 rounded-lg text-[11px] font-semibold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 px-2 shadow-2xs gap-1 cursor-pointer transition-colors"
                      >
                        <ShieldAlert className="w-3 h-3 text-red-600" />
                        <span>Deactivate</span>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ================= REQUEST DEACTIVATION MODAL (SCROLLABLE & PINNED FOOTER) ================= */}
      {selectedBizForDeactivation && (
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
                    Request Business Deactivation
                  </h3>
                  <p className="text-xs text-slate-500 font-normal mt-0.5">
                    Escalate to District Super Admin for compliance review.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedBizForDeactivation(null)}
                className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Content Body */}
            <form onSubmit={handleSubmitDeactivationRequest} className="flex-1 flex flex-col min-h-0">
              <div
                data-lenis-prevent="true"
                className="flex-1 overflow-y-auto space-y-4 py-4 pr-1.5 scrollbar-thin overscroll-contain scroll-smooth"
              >
                {/* Target Business Quick Card */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Target Business:</span>
                    <span className="font-bold text-slate-900">
                      {selectedBizForDeactivation.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Owner / Representative:</span>
                    <span className="text-slate-700 font-medium">
                      {selectedBizForDeactivation.owner?.name || "Rtr. Sarah Perera"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">District Jurisdiction:</span>
                    <span className="font-semibold text-[#D41367]">
                      District 3220 (Sri Lanka &amp; Maldives)
                    </span>
                  </div>
                </div>

                {/* Custom Dropdown: Reason Category */}
                <div className="space-y-1.5">
                  <Label className="text-xs sm:text-sm font-semibold text-slate-700">
                    Deactivation Reason Category *
                  </Label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsReasonDropdownOpen(!isReasonDropdownOpen)}
                      className="h-10 w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 flex items-center justify-between text-left outline-none focus:bg-white focus:border-[#D41367] transition-colors cursor-pointer"
                    >
                      <span className="font-medium text-slate-800">
                        {DEACTIVATION_REASON_CATEGORIES[reasonCategory].label}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 transition-transform ${
                          isReasonDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isReasonDropdownOpen && (
                      <>
                        <div
                          className="fixed inset-0 z-40"
                          onClick={() => setIsReasonDropdownOpen(false)}
                        />
                        <div className="absolute left-0 right-0 mt-1 z-50 bg-white border border-slate-200 rounded-xl shadow-xl p-1.5 space-y-1 max-h-56 overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
                          {Object.entries(DEACTIVATION_REASON_CATEGORIES).map(
                            ([key, item]) => {
                              const isSelected = reasonCategory === key;
                              return (
                                <button
                                  key={key}
                                  type="button"
                                  onClick={() => {
                                    setReasonCategory(key as DeactivationReasonCategory);
                                    setIsReasonDropdownOpen(false);
                                  }}
                                  className={`w-full flex items-start justify-between p-2.5 rounded-lg text-left transition-colors cursor-pointer ${
                                    isSelected
                                      ? "bg-pink-50 text-[#D41367]"
                                      : "text-slate-700 hover:bg-slate-100"
                                  }`}
                                >
                                  <div className="min-w-0 pr-2">
                                    <p className="text-xs font-bold">{item.label}</p>
                                    <p className="text-[11px] text-slate-500 font-normal mt-0.5 leading-tight">
                                      {item.description}
                                    </p>
                                  </div>
                                  {isSelected && (
                                    <Check className="w-4 h-4 text-[#D41367] shrink-0 mt-0.5" />
                                  )}
                                </button>
                              );
                            }
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Urgency Level */}
                <div className="space-y-1.5">
                  <Label className="text-xs sm:text-sm font-semibold text-slate-700">
                    Urgency / Severity Level
                  </Label>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { id: "low", label: "Low" },
                      { id: "medium", label: "Medium" },
                      { id: "high", label: "High" },
                      { id: "critical", label: "Critical" },
                    ].map((lvl) => (
                      <button
                        key={lvl.id}
                        type="button"
                        onClick={() =>
                          setUrgency(lvl.id as "low" | "medium" | "high" | "critical")
                        }
                        className={`py-2 px-2 text-center rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                          urgency === lvl.id
                            ? "bg-slate-900 text-white border-slate-900 shadow-2xs"
                            : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {lvl.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Detailed Justification */}
                <div className="space-y-1.5">
                  <Label className="text-xs sm:text-sm font-semibold text-slate-700">
                    Detailed Justification &amp; Findings *
                  </Label>
                  <Textarea
                    required
                    rows={3}
                    value={reasonDetails}
                    onChange={(e) => setReasonDetails(e.target.value)}
                    placeholder="Explain why this business should be deactivated (e.g. invalid phone number on audit calls, business has permanently shut down, ethical/policy violation with details)..."
                    className="text-xs sm:text-sm bg-slate-50 border-slate-200 rounded-xl focus:bg-white resize-none"
                  />
                </div>

                {/* Supporting Evidence / Reference Notes */}
                <div className="space-y-1.5">
                  <Label className="text-xs sm:text-sm font-semibold text-slate-700">
                    Evidence / Verification Reference (Optional)
                  </Label>
                  <Input
                    value={evidenceNotes}
                    onChange={(e) => setEvidenceNotes(e.target.value)}
                    placeholder="e.g. Audit call log dated 15-Aug, Club Secretary confirmation, return email bounce"
                    className="h-9.5 text-xs sm:text-sm bg-slate-50 border-slate-200 rounded-xl focus:bg-white"
                  />
                </div>

                <div className="p-3 rounded-xl bg-red-50/70 border border-red-200/80 text-[11px] text-red-900 leading-relaxed">
                  <strong>Moderator Notice:</strong> Submitting this request sends an official notification to the Super Admin. The business listing remains visible until the Super Admin formally reviews and confirms the deactivation.
                </div>
              </div>

              {/* Footer Actions (Pinned) */}
              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100 shrink-0">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setSelectedBizForDeactivation(null)}
                  className="rounded-xl text-xs sm:text-sm font-semibold text-slate-700 border-slate-200 hover:bg-slate-50 h-9.5 px-4"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs sm:text-sm font-semibold h-9.5 px-5 shadow-xs gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? "Submitting..." : "Submit to Admin"}</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= VIEW PENDING REQUEST MODAL (SCROLLABLE) ================= */}
      {viewingRequest && (
        <div
          data-lenis-prevent="true"
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto overscroll-contain animate-in fade-in duration-200"
        >
          <div
            data-lenis-prevent="true"
            className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl border border-slate-200 relative my-auto max-h-[88vh] flex flex-col overscroll-contain animate-in zoom-in-95 duration-200"
          >
            {/* Header (Pinned) */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-200 shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    Deactivation Request Status
                  </h3>
                  <p className="text-xs text-slate-500 font-normal">
                    Pending Super Admin review.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setViewingRequest(null)}
                className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div
              data-lenis-prevent="true"
              className="flex-1 overflow-y-auto space-y-3.5 py-3 pr-1 overscroll-contain scroll-smooth"
            >
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Business:</span>
                  <span className="font-bold text-slate-900">
                    {viewingRequest.business_name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Reason Category:</span>
                  <span className="font-semibold text-amber-800">
                    {DEACTIVATION_REASON_CATEGORIES[viewingRequest.reason_category]?.label}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Urgency:</span>
                  <span className="uppercase font-bold text-xs text-slate-800">
                    {viewingRequest.urgency}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Submitted By:</span>
                  <span className="text-slate-700">{viewingRequest.moderator_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Request Date:</span>
                  <span className="text-slate-500 font-normal">
                    {new Date(viewingRequest.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="space-y-1 text-xs">
                <span className="font-bold text-slate-700">Submitted Justification:</span>
                <p className="text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200 leading-relaxed">
                  {viewingRequest.reason_details}
                </p>
              </div>

              {viewingRequest.evidence_notes && (
                <div className="space-y-1 text-xs">
                  <span className="font-bold text-slate-700">Evidence Notes:</span>
                  <p className="text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-200 font-mono text-[11px]">
                    {viewingRequest.evidence_notes}
                  </p>
                </div>
              )}
            </div>

            {/* Footer (Pinned) */}
            <div className="flex items-center justify-end pt-3 border-t border-slate-100 shrink-0">
              <Button
                variant="outline"
                onClick={() => setViewingRequest(null)}
                className="rounded-xl text-xs sm:text-sm font-semibold text-slate-700 border-slate-200 hover:bg-slate-50 h-9 px-4"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
