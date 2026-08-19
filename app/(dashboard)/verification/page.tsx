"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  FileText,
  Landmark,
  Building2,
  AlertTriangle,
  Clock,
  Lock,
  Upload,
  Eye,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  Shield,
  FileCheck,
  Download,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface VerificationDoc {
  id: string;
  title: string;
  category: string;
  description: string;
  status: "approved" | "rejected" | "pending" | "not_uploaded";
  feedback?: string;
  fileName?: string;
  uploadedAt?: string;
  fileSize?: string;
  icon: typeof FileText;
}

const initialDocs: VerificationDoc[] = [
  {
    id: "doc-gst",
    title: "GST / Business Tax Registration Certificate",
    category: "Legal Proof",
    description: "Official government-issued Goods & Services Tax (GST REG-06) or state business registration.",
    status: "rejected",
    feedback: "The uploaded scan was blurry with clipped corners. Please provide a clear 300 DPI PDF or high-resolution photo showing the complete document with official seal.",
    fileName: "gst_certificate_old_scan.pdf",
    uploadedAt: "July 22, 2026",
    fileSize: "1.2 MB",
    icon: FileText,
  },
  {
    id: "doc-drr",
    title: "DRR / Rotary Club Authorization Letter",
    category: "Rotaract Accreditation",
    description: "Official endorsement letter issued by your District Rotaract Representative (DRR) or Rotary Sponsoring Club President for active tenure.",
    status: "rejected",
    feedback: "The submitted letter specifies the 2023-24 tenure. Please obtain and re-upload the valid letter endorsed for the current active Rotary year.",
    fileName: "drr_letter_signed_2023.pdf",
    uploadedAt: "July 20, 2026",
    fileSize: "840 KB",
    icon: Landmark,
  },
  {
    id: "doc-msme",
    title: "Udyam MSME Enterprise Registration",
    category: "Enterprise Verification",
    description: "National Udyam certificate issued by the Ministry of Micro, Small & Medium Enterprises for Gold Tier eligibility.",
    status: "pending",
    fileName: "udyam_registration_lumina_final.pdf",
    uploadedAt: "2 days ago",
    fileSize: "2.4 MB",
    icon: Building2,
  },
];

export default function VerificationUploadsPage() {
  const [docs, setDocs] = useState<VerificationDoc[]>(initialDocs);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSimulatedUpload = (id: string, docTitle: string) => {
    setDocs((prev) =>
      prev.map((d) =>
        d.id === id
          ? {
              ...d,
              status: "pending",
              fileName: "updated_certificate_submission.pdf",
              uploadedAt: "Just now",
              fileSize: "1.8 MB",
              feedback: undefined,
            }
          : d
      )
    );
    showToast(`New document uploaded for ${docTitle}. Sent for moderator review.`);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-[1600px] mx-auto pb-12">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ================= HEADER BANNER ================= */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Business Verification &amp; Accreditation
            </h1>
            <span className="px-2.5 py-0.5 rounded-md bg-amber-50 text-amber-800 font-semibold text-xs border border-amber-200">
              Silver Tier Active
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-normal mt-0.5">
            Upload official business credentials to earn verified Rotaract trust badges and rank higher across search results.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="bg-red-50 border border-red-200 text-red-700 px-3.5 py-2 rounded-xl flex items-center gap-2 text-xs sm:text-sm font-semibold">
            <AlertCircle className="w-4 h-4 text-red-600" />
            <span>2 Documents Require Re-upload</span>
          </div>
        </div>
      </div>

      {/* ================= TIER PROGRESSION PIPELINE ================= */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              Accreditation Tier Roadmap
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-normal mt-0.5">
              Complete document submissions to advance from Silver to Gold Enterprise Tier.
            </p>
          </div>
          <span className="text-xs sm:text-sm font-semibold text-[#D41367]">
            2 of 3 Criteria Met (67%)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Bronze Tier */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tier 1</span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Completed</span>
              </span>
            </div>
            <h4 className="text-sm sm:text-base font-bold text-slate-900">Bronze Listing</h4>
            <p className="text-xs text-slate-500 font-normal leading-relaxed">
              Email &amp; rotary contact verified. Listed on district directory index.
            </p>
          </div>

          {/* Silver Tier */}
          <div className="p-4 rounded-xl border-2 border-amber-300 bg-amber-50/40 space-y-2 relative">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">Tier 2 (Current)</span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md border border-amber-300">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                <span>Active</span>
              </span>
            </div>
            <h4 className="text-sm sm:text-base font-bold text-slate-900">Silver Certified</h4>
            <p className="text-xs text-slate-600 font-normal leading-relaxed">
              DRR letter &amp; tax proof approved. Certified badge &amp; direct messaging enabled.
            </p>
          </div>

          {/* Gold Tier */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tier 3 (Next Goal)</span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 bg-slate-200/70 px-2 py-0.5 rounded-md">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>Pending Review</span>
              </span>
            </div>
            <h4 className="text-sm sm:text-base font-bold text-slate-900">Gold Enterprise</h4>
            <p className="text-xs text-slate-500 font-normal leading-relaxed">
              MSME Registry approved. Top homepage spotlights &amp; buyer RFQ priority.
            </p>
          </div>
        </div>
      </div>

      {/* ================= 3 DOCUMENT COMPLIANCE CARDS ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {docs.map((doc) => {
          const Icon = doc.icon;
          const isRejected = doc.status === "rejected";
          const isPending = doc.status === "pending";
          const isApproved = doc.status === "approved";

          return (
            <div
              key={doc.id}
              className={`bg-white rounded-2xl border p-5 sm:p-6 shadow-2xs flex flex-col justify-between space-y-5 transition-all ${
                isRejected
                  ? "border-red-200 hover:border-red-300"
                  : isPending
                  ? "border-blue-200 hover:border-blue-300"
                  : "border-emerald-200 hover:border-emerald-300"
              }`}
            >
              <div className="space-y-4">
                {/* Header Strip */}
                <div className="flex items-center justify-between">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
                      isRejected
                        ? "bg-red-50 text-red-600 border border-red-100"
                        : isPending
                        ? "bg-blue-50 text-blue-600 border border-blue-100"
                        : "bg-emerald-50 text-emerald-600 border border-emerald-100"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  {isRejected && (
                    <span className="text-xs font-semibold text-red-700 bg-red-50 border border-red-200 px-2.5 py-0.5 rounded-md flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                      <span>Action Required</span>
                    </span>
                  )}
                  {isPending && (
                    <span className="text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-md flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-blue-600" />
                      <span>Under Review</span>
                    </span>
                  )}
                  {isApproved && (
                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-md flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Verified</span>
                    </span>
                  )}
                </div>

                {/* Title & Category */}
                <div>
                  <span className="text-xs font-bold text-[#D41367] uppercase tracking-wider block mb-1">
                    {doc.category}
                  </span>
                  <h3 className="font-bold text-base sm:text-lg text-slate-900 leading-snug">
                    {doc.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-normal mt-1 leading-relaxed">
                    {doc.description}
                  </p>
                </div>

                {/* Moderator Feedback Alert Box */}
                {doc.feedback && (
                  <div className="bg-red-50/80 border-l-3 border-red-500 rounded-r-xl p-3.5 space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-red-800">
                      <AlertCircle className="w-3.5 h-3.5 text-red-600" />
                      <span>Moderator Review Note</span>
                    </div>
                    <p className="text-xs sm:text-sm text-red-950 font-normal leading-relaxed">
                      &quot;{doc.feedback}&quot;
                    </p>
                  </div>
                )}

                {/* Attached File Preview if present */}
                {doc.fileName && (
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <FileCheck className="w-4 h-4 text-[#D41367] shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm font-semibold text-slate-800 truncate">
                          {doc.fileName}
                        </p>
                        <p className="text-xs text-slate-400 font-normal">
                          {doc.fileSize} • Uploaded {doc.uploadedAt}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      title="View file details"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors shrink-0 cursor-pointer"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Action / Upload Area */}
              <div>
                {isRejected ? (
                  <div
                    onClick={() => handleSimulatedUpload(doc.id, doc.title)}
                    className="border border-dashed border-pink-300 hover:border-[#D41367] rounded-xl p-4 text-center bg-pink-50/30 hover:bg-pink-50/60 transition-all cursor-pointer space-y-1 group"
                  >
                    <Upload className="w-5 h-5 text-[#D41367] mx-auto group-hover:scale-110 transition-transform" />
                    <p className="text-xs sm:text-sm font-semibold text-[#D41367]">
                      Click or Drag to Re-upload
                    </p>
                    <p className="text-xs text-slate-400 font-normal">PDF, JPG, PNG up to 10MB</p>
                  </div>
                ) : isPending ? (
                  <Button
                    disabled
                    className="w-full bg-slate-100 text-slate-500 border border-slate-200 rounded-xl h-10 text-xs sm:text-sm font-semibold"
                  >
                    <Lock className="w-3.5 h-3.5 mr-1.5" /> Locked during Review
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    className="w-full rounded-xl border-emerald-200 text-emerald-700 bg-emerald-50/50 hover:bg-emerald-50 h-10 text-xs sm:text-sm font-semibold gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Document Approved</span>
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ================= COMPLIANCE GUIDANCE & SUPPORT BANNER ================= */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="font-bold text-slate-900 text-base sm:text-lg flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#D41367]" />
            <span>Need verification assistance or letter template?</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 font-normal max-w-3xl leading-relaxed">
            Our District Accreditation Officers review resubmissions within 24 to 48 hours. Download the official DRR authorization letter template or request verification escalation.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <Button
            variant="outline"
            className="rounded-xl border-slate-200 text-slate-700 hover:bg-slate-50 text-xs sm:text-sm font-semibold h-9.5 px-4"
            asChild
          >
            <Link href="/verification-standards">Standards Guide</Link>
          </Button>
          <Button
            className="bg-[#D41367] hover:bg-[#B80E56] text-white rounded-xl text-xs sm:text-sm font-semibold h-9.5 px-4.5 shadow-xs"
            asChild
          >
            <Link href="/contact">Contact District Officer</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
