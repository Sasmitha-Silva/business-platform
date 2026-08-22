"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Filter,
  Search,
  Info,
  Clock,
  Building2,
  TrendingUp,
  Award,
  ArrowRight,
  Eye,
  FileText,
  AlertCircle,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { VerificationBadge } from "@/components/verification-badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { mockModeratorStats, mockPendingBusinesses } from "@/lib/mock-data";

export default function ModeratorDashboardPage() {
  const stats = mockModeratorStats;
  const [pendingQueue, setPendingQueue] = useState(mockPendingBusinesses);
  const [activeClaimId, setActiveClaimId] = useState<string | null>("stellar");
  const [notes, setNotes] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals state
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showReturnModal, setShowReturnModal] = useState(false);

  // Lock background scrolling and prevent Lenis capture when any modal is open
  useEffect(() => {
    if (showApproveModal || showReturnModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showApproveModal, showReturnModal]);

  const activeClaim = pendingQueue.find((b) => b.id === activeClaimId) || pendingQueue[0];

  const confirmApprove = () => {
    if (!activeClaim) return;
    setPendingQueue((prev) => prev.filter((b) => b.id !== activeClaim.id));
    setActiveClaimId(null);
    setShowApproveModal(false);
    setNotes("");
    showToast(`Approved ${activeClaim.name} for district accreditation.`);
  };

  const confirmReturn = () => {
    if (!activeClaim) return;
    setPendingQueue((prev) => prev.filter((b) => b.id !== activeClaim.id));
    setActiveClaimId(null);
    setShowReturnModal(false);
    setNotes("");
    showToast(`Returned ${activeClaim.name} with revision notes.`);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
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

      {/* ================= APPROVE CONFIRMATION MODAL ================= */}
      {showApproveModal && activeClaim && (
        <div
          data-lenis-prevent="true"
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto overscroll-contain animate-in fade-in duration-200"
        >
          <div
            data-lenis-prevent="true"
            className="bg-white rounded-2xl p-5 sm:p-6 max-w-md w-full space-y-4 shadow-xl border border-slate-200 animate-in zoom-in-95 duration-200 relative overscroll-contain"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">Approve Accreditation</h3>
                  <p className="text-xs text-slate-500 font-normal">Confirm verified tier grant.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowApproveModal(false)}
                className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs sm:text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Business:</span>
                <span className="font-bold text-slate-900">{activeClaim.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">District:</span>
                <span className="font-semibold text-slate-700">District 3220</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Tier Grant:</span>
                <span className="font-bold text-amber-700">Gold Tier Certified</span>
              </div>
            </div>

            <p className="text-xs text-slate-500 font-normal leading-relaxed">
              Confirming will grant the verified badge and notify the business owner that their credentials have been endorsed.
            </p>

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowApproveModal(false)}
                className="rounded-xl text-xs sm:text-sm font-semibold text-slate-700 border-slate-200 hover:bg-slate-50 h-9.5 px-4"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={confirmApprove}
                className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-semibold h-9.5 px-5 shadow-xs"
              >
                Confirm &amp; Award Badge
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ================= RETURN / REVISE CONFIRMATION MODAL ================= */}
      {showReturnModal && activeClaim && (
        <div
          data-lenis-prevent="true"
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto overscroll-contain animate-in fade-in duration-200"
        >
          <div
            data-lenis-prevent="true"
            className="bg-white rounded-2xl p-5 sm:p-6 max-w-md w-full space-y-4 shadow-xl border border-slate-200 animate-in zoom-in-95 duration-200 relative overscroll-contain"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center border border-red-100 shrink-0">
                  <AlertCircle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">Return for Correction</h3>
                  <p className="text-xs text-slate-500 font-normal">Send moderator feedback.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowReturnModal(false)}
                className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm">
                <p className="font-bold text-slate-900">{activeClaim.name}</p>
                <p className="text-xs text-slate-500 font-normal mt-0.5">District 3220 Review Queue</p>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs sm:text-sm font-semibold text-slate-700">Moderator Correction Note *</Label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Explain why this document needs correction (e.g. invalid signature, wrong tenure)..."
                  className="w-full text-xs sm:text-sm p-3 bg-slate-50 rounded-xl border border-slate-200 outline-none focus:bg-white focus:border-[#D41367] focus:ring-2 focus:ring-pink-100 transition-all placeholder:text-slate-400 resize-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowReturnModal(false)}
                className="rounded-xl text-xs sm:text-sm font-semibold text-slate-700 border-slate-200 hover:bg-slate-50 h-9.5 px-4"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={confirmReturn}
                className="bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs sm:text-sm font-semibold h-9.5 px-5 shadow-xs"
              >
                Send Correction Note
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ================= HEADER BANNER ================= */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-0.5">
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              District 3220 Moderator Desk
            </h1>
            <span className="px-2.5 py-0.5 rounded-md bg-pink-50 text-[#D41367] font-semibold text-xs border border-pink-100/60">
              Sri Lanka &amp; Maldives Secretariat
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-normal mt-0.5">
            Review district verification submissions, endorse Rotaract business credentials, and maintain listing trust.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>District Officer Active</span>
          </div>
        </div>
      </div>

      {/* ================= 4 METRIC STAT CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Pending Verifications */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4.5 sm:p-5 space-y-2 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-medium text-slate-500">Pending Review Queue</span>
            <div className="w-8 h-8 rounded-xl bg-pink-50 text-[#D41367] flex items-center justify-center border border-pink-100/60">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {pendingQueue.length}
            </div>
            <div className="flex items-center gap-1 text-xs font-medium text-emerald-600 mt-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+{stats.pending_change} new submissions today</span>
            </div>
          </div>
        </div>

        {/* Card 2: Active District Businesses */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4.5 sm:p-5 space-y-2 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-medium text-slate-500">Active District Businesses</span>
            <div className="w-8 h-8 rounded-xl bg-pink-50 text-[#D41367] flex items-center justify-center border border-pink-100/60">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {stats.active_businesses}
            </div>
            <div className="text-xs font-medium text-slate-500 mt-1">
              <span className="text-emerald-700 font-semibold">{stats.active_verified_percentage}%</span> fully verified
            </div>
          </div>
        </div>

        {/* Card 3: Monthly Claims */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4.5 sm:p-5 space-y-2 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-medium text-slate-500">Audits Completed (Month)</span>
            <div className="w-8 h-8 rounded-xl bg-pink-50 text-[#D41367] flex items-center justify-center border border-pink-100/60">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {stats.monthly_claims}
            </div>
            <div className="text-xs text-slate-500 font-normal mt-1">
              Avg <span className="font-semibold text-slate-800">{stats.avg_turnaround}</span> turnaround time
            </div>
          </div>
        </div>

        {/* Card 4: District Quality Score */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4.5 sm:p-5 space-y-2 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-medium text-slate-500">District Quality Score</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-100">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {stats.district_health_score}
            </div>
            <div className="text-xs text-slate-500 font-normal mt-1">
              Ranked in <span className="font-semibold text-[#D41367]">{stats.district_health_percentile}</span> globally
            </div>
          </div>
        </div>
      </div>

      {/* ================= 2-COLUMN VERIFICATION WORKBENCH ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column: Queue List (1 col) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                District Review Queue
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-normal mt-0.5">
                Submissions awaiting moderator audit
              </p>
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-pink-50 text-[#D41367]">
              {pendingQueue.length} Ready
            </span>
          </div>

          <div className="space-y-2.5 pt-1">
            {pendingQueue.length === 0 ? (
              <div className="py-8 text-center text-slate-400 text-xs sm:text-sm">
                No pending verification claims in District 3220.
              </div>
            ) : (
              pendingQueue.map((biz) => {
                const isSelected = activeClaim?.id === biz.id;
                return (
                  <div
                    key={biz.id}
                    onClick={() => setActiveClaimId(biz.id)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer space-y-2 ${
                      isSelected
                        ? "bg-pink-50/60 border-[#D41367] shadow-2xs"
                        : "bg-slate-50/60 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                        {biz.name}
                      </h4>
                      <VerificationBadge level={2} size="sm" />
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>Submitted {biz.created_at}</span>
                      <span className="font-semibold text-[#D41367]">Click to Audit</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Active Claim Reviewer (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                Active Audit Workspace
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-normal mt-0.5">
                Verify attached compliance documents against Rotaract standards.
              </p>
            </div>
            {activeClaim && (
              <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
                In Review
              </span>
            )}
          </div>

          {activeClaim ? (
            <div className="space-y-4">
              {/* Business Overview Header */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">{activeClaim.name}</h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-normal mt-0.5">
                    Gold Tier Application • District 3220 Headquarters Queue
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-xl border-slate-200 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-100 h-9 px-3 shrink-0"
                  asChild
                >
                  <Link href={`/business/${activeClaim.slug || "lumina-digital-solutions"}`} target="_blank" rel="noopener noreferrer">
                    <Eye className="w-3.5 h-3.5 mr-1" /> Inspect Listing
                  </Link>
                </Button>
              </div>

              {/* Document Attachments */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Submitted Documents</span>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl border border-slate-200 bg-white flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <FileText className="w-4 h-4 text-[#D41367] shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm font-semibold text-slate-800 truncate">gst_certificate_2026.pdf</p>
                        <p className="text-xs text-slate-400">1.8 MB • Tax Proof</p>
                      </div>
                    </div>
                    <button className="text-xs font-semibold text-[#D41367] hover:underline shrink-0">View</button>
                  </div>

                  <div className="p-3 rounded-xl border border-slate-200 bg-white flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <FileText className="w-4 h-4 text-[#D41367] shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm font-semibold text-slate-800 truncate">drr_letter_signed_2026.pdf</p>
                        <p className="text-xs text-slate-400">840 KB • DRR Letter</p>
                      </div>
                    </div>
                    <button className="text-xs font-semibold text-[#D41367] hover:underline shrink-0">View</button>
                  </div>
                </div>
              </div>

              {/* Moderator Decision Notes */}
              <div className="space-y-1.5 pt-1">
                <label className="text-xs sm:text-sm font-semibold text-slate-700">
                  Moderator Evaluation Notes
                </label>
                <Textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="State review findings or specific correction instructions for the business owner..."
                  className="w-full text-xs sm:text-sm p-3 bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:border-[#D41367]"
                />
              </div>

              {/* Action Buttons Triggering Modals */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <Button
                  variant="outline"
                  onClick={() => setShowReturnModal(true)}
                  className="w-full sm:w-1/2 rounded-xl border-red-200 text-red-700 bg-red-50/60 hover:bg-red-100 text-xs sm:text-sm font-semibold h-10 gap-1.5 cursor-pointer"
                >
                  <XCircle className="w-4 h-4 text-red-600" />
                  <span>Return for Revision</span>
                </Button>

                <Button
                  onClick={() => setShowApproveModal(true)}
                  className="w-full sm:w-1/2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-semibold h-10 gap-1.5 shadow-xs cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Approve &amp; Grant Badge</span>
                </Button>
              </div>
            </div>
          ) : (
            <div className="py-16 text-center text-slate-400">
              Select a verification submission from the queue to start review.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
