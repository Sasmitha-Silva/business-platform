"use client";

import { useState, useEffect, useRef } from "react";
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
  Loader2,
  RefreshCw,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  getOwnerBusinessAction,
  submitVerificationDocumentAction,
  deleteVerificationDocumentAction,
} from "@/app/actions/owner";
import { getUploadUrlAction, getPrivateDocumentUrlAction } from "@/app/actions/storage";
import type { VerificationDocType } from "@/lib/types";

interface VerificationDoc {
  id: string;
  docType: VerificationDocType;
  title: string;
  category: string;
  description: string;
  status: "approved" | "rejected" | "pending" | "not_uploaded";
  feedback?: string;
  dbId?: string;
  fileKey?: string;
  fileName?: string;
  uploadedAt?: string;
  fileSize?: string;
  icon: typeof FileText;
}

const initialDocs: VerificationDoc[] = [
  {
    id: "doc-gst",
    docType: "gst",
    title: "GST / Business Tax Registration Certificate",
    category: "Legal Proof",
    description: "Official government-issued Goods & Services Tax or state business registration certificate.",
    status: "not_uploaded",
    icon: FileText,
  },
  {
    id: "doc-drr",
    docType: "drr",
    title: "DRR / Rotary Club Authorization Letter",
    category: "Rotaract Accreditation",
    description: "Official endorsement letter issued by your District Rotaract Representative (DRR) or Sponsoring Club President.",
    status: "not_uploaded",
    icon: Landmark,
  },
  {
    id: "doc-msme",
    docType: "udyam",
    title: "Udyam / MSME Enterprise Registration",
    category: "Enterprise Verification",
    description: "National Udyam / MSME registration certificate for Gold Tier eligibility.",
    status: "not_uploaded",
    icon: Building2,
  },
];

export default function VerificationUploadsPage() {
  const [docs, setDocs] = useState<VerificationDoc[]>(initialDocs);
  const [businessId, setBusinessId] = useState<string>("");
  const [verificationLevel, setVerificationLevel] = useState<number>(0);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "warning" | "error";
  } | null>(null);
  const [uploadingDocId, setUploadingDocId] = useState<string | null>(null);
  const [viewingDocId, setViewingDocId] = useState<string | null>(null);
  const [deletingDocId, setDeletingDocId] = useState<string | null>(null);
  const [confirmDeleteDocId, setConfirmDeleteDocId] = useState<string | null>(null);
  const [dragOverDocId, setDragOverDocId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentUploadTarget, setCurrentUploadTarget] = useState<VerificationDoc | null>(null);

  const approvedDocs = docs.filter((d) => d.status === "approved").length;
  const pendingDocs = docs.filter((d) => d.status === "pending").length;
  const rejectedDocs = docs.filter((d) => d.status === "rejected").length;
  const criteriaPercent = Math.round((approvedDocs / 3) * 100);

  const gstDoc = docs.find((d) => d.docType === "gst");
  const drrDoc = docs.find((d) => d.docType === "drr");
  const udyamDoc = docs.find((d) => d.docType === "udyam");

  useEffect(() => {
    async function loadBiz() {
      const biz = await getOwnerBusinessAction();
      if (biz) {
        setBusinessId(biz.id);
        setVerificationLevel(biz.verification_level || 0);
        if (biz.verification_documents && biz.verification_documents.length > 0) {
          setDocs((prev) =>
            prev.map((d) => {
              const matched = biz.verification_documents?.find((vd: any) => vd.doc_type === d.docType);
              if (matched) {
                return {
                  ...d,
                  dbId: matched.id,
                  status: matched.status as any,
                  fileName: matched.file_name || d.fileName,
                  fileKey: matched.file_key,
                  fileSize: matched.file_size ? `${(matched.file_size / (1024 * 1024)).toFixed(1)} MB` : d.fileSize,
                  feedback: matched.rejection_reason || undefined,
                  uploadedAt: matched.created_at ? new Date(matched.created_at).toLocaleDateString() : d.uploadedAt,
                };
              }
              return d;
            })
          );
        }
      }
    }
    loadBiz();
  }, []);

  const handleUploadClick = (doc: VerificationDoc) => {
    setCurrentUploadTarget(doc);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

  const processFileUpload = async (file: File, targetDoc: VerificationDoc) => {
    // 1. Validation - Strictly PDF only
    const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
    if (!isPdf) {
      showToast("Invalid file format: Only PDF documents (.pdf) are allowed.", "warning");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      showToast("File size limit exceeded: Document must be under 10MB.", "warning");
      return;
    }

    setUploadingDocId(targetDoc.id);

    try {
      let finalKey = "";

      // 1. Get presigned R2 upload URL
      try {
        const res = await getUploadUrlAction({
          filename: file.name,
          contentType: "application/pdf",
          folder: "documents",
        });

        if (res.success && res.uploadUrl && res.key) {
          const putRes = await fetch(res.uploadUrl, {
            method: "PUT",
            headers: { "Content-Type": "application/pdf" },
            body: file,
          });
          if (putRes.ok) {
            finalKey = res.key;
          }
        }
      } catch (presignedErr) {
        console.warn("Direct R2 presigned upload failed, falling back to server route:", presignedErr);
      }

      // Fallback to server route if direct presigned failed
      if (!finalKey) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", "documents");
        const apiRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const data = await apiRes.json();
        if (data.success && data.key) {
          finalKey = data.key;
        } else {
          throw new Error(data.error || "Failed to upload document.");
        }
      }

      // 3. Save record in Supabase
      let savedDbId: string | undefined = undefined;
      if (businessId && finalKey) {
        const docRes = await submitVerificationDocumentAction({
          businessId,
          docType: targetDoc.docType,
          fileKey: finalKey,
          fileName: file.name,
          fileSize: file.size,
          mimeType: "application/pdf",
        });
        if (docRes.success && docRes.document) {
          savedDbId = docRes.document.id;
        }
      }

      setDocs((prev) =>
        prev.map((d) =>
          d.id === targetDoc.id
            ? {
                ...d,
                dbId: savedDbId,
                status: "pending",
                fileName: file.name,
                fileKey: finalKey,
                uploadedAt: "Just now",
                fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
                feedback: undefined,
              }
            : d
        )
      );
      showToast(`Document "${file.name}" uploaded successfully. Sent for verification review.`, "success");
    } catch (err: any) {
      console.error("Failed to upload verification document:", err);
      showToast(err?.message || "Upload failed. Please try again.", "error");
    } finally {
      setUploadingDocId(null);
      setCurrentUploadTarget(null);
      setDragOverDocId(null);
    }
  };

  const handleViewDocument = async (doc: VerificationDoc) => {
    if (!doc.fileKey) {
      showToast("Document preview link is not available.", "warning");
      return;
    }
    setViewingDocId(doc.id);
    try {
      const res = await getPrivateDocumentUrlAction(doc.fileKey);
      if (res.success && res.downloadUrl) {
        window.open(res.downloadUrl, "_blank", "noopener,noreferrer");
      } else {
        showToast(res.error || "Failed to generate document preview link.", "error");
      }
    } catch (err) {
      console.error("Failed to view document:", err);
      showToast("Failed to open document preview.", "error");
    } finally {
      setViewingDocId(null);
    }
  };

  const handleDeleteDocument = async (doc: VerificationDoc) => {
    if (!businessId) return;
    setDeletingDocId(doc.id);
    try {
      const res = await deleteVerificationDocumentAction({
        businessId,
        docType: doc.docType,
        fileKey: doc.fileKey,
        documentId: doc.dbId,
      });

      if (res.success) {
        setDocs((prev) =>
          prev.map((d) =>
            d.id === doc.id
              ? {
                  ...d,
                  dbId: undefined,
                  status: "not_uploaded",
                  fileName: undefined,
                  fileKey: undefined,
                  fileSize: undefined,
                  uploadedAt: undefined,
                  feedback: undefined,
                }
              : d
          )
        );
        showToast(`Document removed. You can now upload a new PDF.`, "success");
      } else {
        showToast(res.error || "Failed to delete document.", "error");
      }
    } catch (err) {
      console.error("Failed to delete document:", err);
      showToast("Failed to delete document.", "error");
    } finally {
      setDeletingDocId(null);
      setConfirmDeleteDocId(null);
    }
  };

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && currentUploadTarget) {
      processFileUpload(file, currentUploadTarget);
    }
  };

  const showToast = (
    msg: string,
    type: "success" | "warning" | "error" = "success"
  ) => {
    setToast({ message: msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-[1600px] mx-auto pb-12">
      {/* Toast Notification */}
      {toast && (
        <div
          className={cn(
            "fixed bottom-6 right-6 z-50 text-xs sm:text-sm font-semibold px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-3 duration-200 border",
            toast.type === "warning" &&
              "bg-amber-950 text-amber-200 border-amber-500/50 shadow-amber-950/40 ring-1 ring-amber-500/20",
            toast.type === "error" &&
              "bg-rose-950 text-rose-200 border-rose-500/50 shadow-rose-950/40 ring-1 ring-rose-500/20",
            toast.type === "success" &&
              "bg-slate-900 text-white border-slate-700 shadow-slate-900/30"
          )}
        >
          {toast.type === "warning" && (
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
          )}
          {toast.type === "error" && (
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          )}
          {toast.type === "success" && (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          )}
          <span>{toast.message}</span>
        </div>
      )}

      {/* ================= HEADER BANNER ================= */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Business Verification &amp; Accreditation
            </h1>
            {verificationLevel === 3 ? (
              <span className="px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 font-semibold text-xs border border-emerald-200">
                Gold Enterprise Active
              </span>
            ) : verificationLevel === 2 ? (
              <span className="px-2.5 py-0.5 rounded-md bg-amber-50 text-amber-800 font-semibold text-xs border border-amber-200">
                Silver Tier Active
              </span>
            ) : verificationLevel === 1 ? (
              <span className="px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-800 font-semibold text-xs border border-blue-200">
                Bronze Tier Active
              </span>
            ) : (
              <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 font-semibold text-xs border border-slate-200">
                Standard Listing (Tier 0)
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-normal mt-0.5">
            Upload official business credentials to earn verified Rotaract trust badges and rank higher across search results.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {rejectedDocs > 0 ? (
            <div className="bg-red-50 border border-red-200 text-red-700 px-3.5 py-2 rounded-xl flex items-center gap-2 text-xs sm:text-sm font-semibold">
              <AlertCircle className="w-4 h-4 text-red-600" />
              <span>{rejectedDocs} Document{rejectedDocs > 1 ? "s" : ""} Require Re-upload</span>
            </div>
          ) : pendingDocs > 0 ? (
            <div className="bg-blue-50 border border-blue-200 text-blue-700 px-3.5 py-2 rounded-xl flex items-center gap-2 text-xs sm:text-sm font-semibold">
              <Clock className="w-4 h-4 text-blue-600" />
              <span>{pendingDocs} Document{pendingDocs > 1 ? "s" : ""} Under Review</span>
            </div>
          ) : approvedDocs === 3 ? (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-3.5 py-2 rounded-xl flex items-center gap-2 text-xs sm:text-sm font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>All Documents Verified</span>
            </div>
          ) : (
            <div className="bg-slate-50 border border-slate-200 text-slate-600 px-3.5 py-2 rounded-xl flex items-center gap-2 text-xs sm:text-sm font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#D41367]" />
              <span>Tier Upgrade Available</span>
            </div>
          )}
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
              Submit verified credentials to earn badges and unlock higher directory visibility.
            </p>
          </div>
          <span className="text-xs sm:text-sm font-semibold text-[#D41367]">
            {approvedDocs} of 3 Criteria Met ({criteriaPercent}%)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Bronze Tier */}
          <div
            className={`p-4 rounded-xl border space-y-2 ${
              verificationLevel === 1
                ? "border-blue-400 bg-blue-50/40"
                : gstDoc?.status === "approved"
                ? "border-emerald-200 bg-emerald-50/30"
                : "border-slate-200 bg-slate-50/70"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tier 1</span>
              <span
                className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-md ${
                  gstDoc?.status === "approved"
                    ? "text-emerald-700 bg-emerald-50 border border-emerald-200"
                    : gstDoc?.status === "pending"
                    ? "text-blue-700 bg-blue-50 border border-blue-200"
                    : gstDoc?.status === "rejected"
                    ? "text-red-700 bg-red-50 border border-red-200"
                    : "text-slate-500 bg-slate-200/60"
                }`}
              >
                {gstDoc?.status === "approved" && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                {gstDoc?.status === "pending" && <Clock className="w-3.5 h-3.5 text-blue-600" />}
                {gstDoc?.status === "rejected" && <AlertTriangle className="w-3.5 h-3.5 text-red-600" />}
                <span>
                  {gstDoc?.status === "approved"
                    ? "Completed"
                    : gstDoc?.status === "pending"
                    ? "Under Review"
                    : gstDoc?.status === "rejected"
                    ? "Action Required"
                    : "Upload Required"}
                </span>
              </span>
            </div>
            <h4 className="text-sm sm:text-base font-bold text-slate-900">Bronze Listing</h4>
            <p className="text-xs text-slate-500 font-normal leading-relaxed">
              Business registration or tax certificate approved. Active badge on directory card.
            </p>
          </div>

          {/* Silver Tier */}
          <div
            className={`p-4 rounded-xl border space-y-2 ${
              verificationLevel === 2
                ? "border-amber-400 bg-amber-50/40"
                : drrDoc?.status === "approved"
                ? "border-emerald-200 bg-emerald-50/30"
                : "border-slate-200 bg-slate-50/70"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tier 2</span>
              <span
                className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-md ${
                  drrDoc?.status === "approved"
                    ? "text-emerald-700 bg-emerald-50 border border-emerald-200"
                    : drrDoc?.status === "pending"
                    ? "text-blue-700 bg-blue-50 border border-blue-200"
                    : drrDoc?.status === "rejected"
                    ? "text-red-700 bg-red-50 border border-red-200"
                    : "text-slate-500 bg-slate-200/60"
                }`}
              >
                {drrDoc?.status === "approved" && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                {drrDoc?.status === "pending" && <Clock className="w-3.5 h-3.5 text-blue-600" />}
                {drrDoc?.status === "rejected" && <AlertTriangle className="w-3.5 h-3.5 text-red-600" />}
                <span>
                  {drrDoc?.status === "approved"
                    ? "Completed"
                    : drrDoc?.status === "pending"
                    ? "Under Review"
                    : drrDoc?.status === "rejected"
                    ? "Action Required"
                    : "Upload Required"}
                </span>
              </span>
            </div>
            <h4 className="text-sm sm:text-base font-bold text-slate-900">Silver Certified</h4>
            <p className="text-xs text-slate-500 font-normal leading-relaxed">
              Official DRR or Rotary Club president endorsement approved.
            </p>
          </div>

          {/* Gold Tier */}
          <div
            className={`p-4 rounded-xl border space-y-2 ${
              verificationLevel === 3
                ? "border-emerald-400 bg-emerald-50/40"
                : udyamDoc?.status === "approved"
                ? "border-emerald-200 bg-emerald-50/30"
                : "border-slate-200 bg-slate-50/70"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tier 3</span>
              <span
                className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-md ${
                  udyamDoc?.status === "approved"
                    ? "text-emerald-700 bg-emerald-50 border border-emerald-200"
                    : udyamDoc?.status === "pending"
                    ? "text-blue-700 bg-blue-50 border border-blue-200"
                    : udyamDoc?.status === "rejected"
                    ? "text-red-700 bg-red-50 border border-red-200"
                    : "text-slate-500 bg-slate-200/60"
                }`}
              >
                {udyamDoc?.status === "approved" && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                {udyamDoc?.status === "pending" && <Clock className="w-3.5 h-3.5 text-blue-600" />}
                {udyamDoc?.status === "rejected" && <AlertTriangle className="w-3.5 h-3.5 text-red-600" />}
                <span>
                  {udyamDoc?.status === "approved"
                    ? "Completed"
                    : udyamDoc?.status === "pending"
                    ? "Under Review"
                    : udyamDoc?.status === "rejected"
                    ? "Action Required"
                    : "Upload Required"}
                </span>
              </span>
            </div>
            <h4 className="text-sm sm:text-base font-bold text-slate-900">Gold Enterprise</h4>
            <p className="text-xs text-slate-500 font-normal leading-relaxed">
              MSME / national enterprise certification approved. Homepage spotlight priority.
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
              className={`bg-white rounded-2xl border p-5 sm:p-6 shadow-2xs flex flex-col justify-between space-y-5 transition-all ${isRejected
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
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${isRejected
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
                      title="View PDF Document"
                      onClick={() => handleViewDocument(doc)}
                      disabled={viewingDocId === doc.id}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-[#D41367] hover:bg-pink-50 transition-colors shrink-0 cursor-pointer disabled:opacity-50"
                    >
                      {viewingDocId === doc.id ? (
                        <Loader2 className="w-4 h-4 animate-spin text-[#D41367]" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                )}
              </div>

              {/* Action / Upload Area */}
              <div>
                {confirmDeleteDocId === doc.id ? (
                  <div className="rounded-xl border border-red-200 bg-red-50/70 p-3.5 space-y-2.5 animate-in fade-in duration-150">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-red-800">
                      <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                      <span>Delete this document?</span>
                    </div>
                    <p className="text-[11px] text-red-700 font-normal leading-relaxed">
                      This will remove the current document so you can submit a new PDF file.
                    </p>
                    <div className="flex items-center gap-2 pt-0.5">
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => setConfirmDeleteDocId(null)}
                        disabled={deletingDocId === doc.id}
                        className="h-8 text-xs rounded-xl border-slate-300 text-slate-700 hover:bg-white cursor-pointer flex-1"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        onClick={() => handleDeleteDocument(doc)}
                        disabled={deletingDocId === doc.id}
                        className="h-8 text-xs rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold cursor-pointer flex-1 gap-1.5"
                      >
                        {deletingDocId === doc.id ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Trash2 className="w-3.5 h-3.5" />
                        )}
                        <span>{deletingDocId === doc.id ? "Deleting..." : "Confirm Delete"}</span>
                      </Button>
                    </div>
                  </div>
                ) : uploadingDocId === doc.id ? (
                  <div className="border border-dashed border-[#D41367] bg-pink-50/50 rounded-xl p-5 flex flex-col items-center justify-center gap-2 text-center animate-pulse">
                    <Loader2 className="w-6 h-6 animate-spin text-[#D41367]" />
                    <span className="text-xs font-semibold text-slate-800">Uploading document</span>
                    <span className="text-[10px] text-slate-400">Please wait a moment...</span>
                  </div>
                ) : doc.status === "not_uploaded" ? (
                  <div
                    onClick={() => handleUploadClick(doc)}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragOverDocId(doc.id);
                    }}
                    onDragLeave={() => setDragOverDocId(null)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setDragOverDocId(null);
                      const dropped = e.dataTransfer.files?.[0];
                      if (dropped) processFileUpload(dropped, doc);
                    }}
                    className={`border border-dashed rounded-xl p-4 text-center transition-all cursor-pointer space-y-1.5 group ${
                      dragOverDocId === doc.id
                        ? "border-[#D41367] bg-pink-100/60 scale-[1.01]"
                        : "border-slate-300 hover:border-[#D41367] bg-slate-50/70 hover:bg-pink-50/30"
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-white text-[#D41367] shadow-2xs flex items-center justify-center mx-auto border border-slate-200 group-hover:scale-105 transition-transform">
                      <Upload className="w-4 h-4" />
                    </div>
                    <p className="text-xs sm:text-sm font-semibold text-slate-800 group-hover:text-[#D41367] transition-colors leading-tight">
                      Click or drag PDF to upload
                    </p>
                    <p className="text-[10px] text-slate-400 font-normal leading-tight">
                      PDF only up to 10MB
                    </p>
                  </div>
                ) : isPending ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-blue-50/60 border border-blue-200 text-blue-800 text-xs font-medium">
                      <span className="flex items-center gap-1.5 font-semibold">
                        <Clock className="w-3.5 h-3.5 text-blue-600" /> Under Review
                      </span>
                      <span className="text-[10px] text-blue-600 font-medium">Audit in progress</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        type="button"
                        onClick={() => handleViewDocument(doc)}
                        disabled={viewingDocId === doc.id}
                        variant="outline"
                        className="rounded-xl text-xs font-semibold border-slate-200 hover:border-[#D41367] text-slate-700 hover:text-[#D41367] hover:bg-pink-50/40 gap-1.5 h-9 cursor-pointer"
                      >
                        {viewingDocId === doc.id ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Eye className="w-3.5 h-3.5" />
                        )}
                        <span>View</span>
                      </Button>
                      <Button
                        type="button"
                        onClick={() => setConfirmDeleteDocId(doc.id)}
                        variant="outline"
                        className="rounded-xl text-xs font-semibold border-red-200 text-red-600 hover:text-red-700 hover:bg-red-50/60 gap-1.5 h-9 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </Button>
                    </div>
                  </div>
                ) : isRejected ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-red-50/60 border border-red-200 text-red-800 text-xs font-medium">
                      <span className="flex items-center gap-1.5 font-semibold">
                        <AlertCircle className="w-3.5 h-3.5 text-red-600" /> Rejected
                      </span>
                      <span className="text-[10px] text-red-600 font-medium">Action required</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {doc.fileName && (
                        <Button
                          type="button"
                          onClick={() => handleViewDocument(doc)}
                          disabled={viewingDocId === doc.id}
                          variant="outline"
                          className="rounded-xl text-xs font-semibold border-slate-200 hover:border-[#D41367] text-slate-700 hover:text-[#D41367] hover:bg-pink-50/40 gap-1.5 h-9 cursor-pointer"
                        >
                          {viewingDocId === doc.id ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Eye className="w-3.5 h-3.5" />
                          )}
                          <span>View</span>
                        </Button>
                      )}
                      <Button
                        type="button"
                        onClick={() => setConfirmDeleteDocId(doc.id)}
                        variant="outline"
                        className={`${doc.fileName ? "" : "col-span-2 "}rounded-xl text-xs font-semibold border-red-200 text-red-600 hover:text-red-700 hover:bg-red-50/60 gap-1.5 h-9 cursor-pointer`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete &amp; Re-upload</span>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-emerald-50/70 border border-emerald-200 text-emerald-800 text-xs font-medium">
                      <span className="flex items-center gap-1.5 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Verified Credential
                      </span>
                      <span className="text-[10px] text-emerald-700 font-medium">Accreditation active</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        type="button"
                        onClick={() => handleViewDocument(doc)}
                        disabled={viewingDocId === doc.id}
                        variant="outline"
                        className="rounded-xl text-xs font-semibold border-slate-200 hover:border-[#D41367] text-slate-700 hover:text-[#D41367] hover:bg-pink-50/40 gap-1.5 h-9 cursor-pointer"
                      >
                        {viewingDocId === doc.id ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Eye className="w-3.5 h-3.5" />
                        )}
                        <span>View</span>
                      </Button>
                      <Button
                        type="button"
                        onClick={() => setConfirmDeleteDocId(doc.id)}
                        variant="outline"
                        className="rounded-xl text-xs font-semibold border-red-200 text-red-600 hover:text-red-700 hover:bg-red-50/60 gap-1.5 h-9 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Hidden file input for real R2 uploads */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelected}
        accept="application/pdf,.pdf"
        className="hidden"
      />

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
            <Link href="/how-it-works">How It Works</Link>
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
