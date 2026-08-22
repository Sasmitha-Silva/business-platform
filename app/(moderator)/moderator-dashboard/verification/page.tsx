"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Search,
  Eye,
  CheckCircle2,
  XCircle,
  FileText,
  Clock,
  Filter,
  AlertCircle,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DistrictVerificationItem {
  id: string;
  name: string;
  slug: string;
  owner: string;
  docType: string;
  status: "pending" | "approved" | "rejected";
  date: string;
}

const initialDistrictVerifications: DistrictVerificationItem[] = [
  {
    id: "1",
    name: "Lumina Digital Solutions",
    slug: "lumina-digital-solutions",
    owner: "Rtr. Anand Vardhan Sharma",
    docType: "DRR Endorsement Letter (2026-27)",
    status: "pending",
    date: "2 hours ago",
  },
  {
    id: "2",
    name: "Nexus Analytics & Insights",
    slug: "nexus-analytics",
    owner: "Rtr. Sarah Perera",
    docType: "GST Certificate + DRR Recommendation",
    status: "pending",
    date: "4 hours ago",
  },
  {
    id: "3",
    name: "Ceylon Green Spices Ltd",
    slug: "ceylon-green-spices",
    owner: "Rtr. Kasun Jayawardena",
    docType: "Business Registration & Export Permit",
    status: "approved",
    date: "Yesterday",
  },
];

export default function ModeratorVerificationPage() {
  const [items, setItems] = useState<DistrictVerificationItem[]>(initialDistrictVerifications);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals state
  const [approveModalItem, setApproveModalItem] = useState<DistrictVerificationItem | null>(null);
  const [returnModalItem, setReturnModalItem] = useState<DistrictVerificationItem | null>(null);
  const [returnFeedback, setReturnFeedback] = useState("");

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.docType.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" ? true : item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const confirmApprove = () => {
    if (!approveModalItem) return;
    setItems((prev) =>
      prev.map((i) => (i.id === approveModalItem.id ? { ...i, status: "approved" } : i))
    );
    showToast(`Approved verification claim for ${approveModalItem.name}.`);
    setApproveModalItem(null);
  };

  const confirmReturn = () => {
    if (!returnModalItem) return;
    setItems((prev) =>
      prev.map((i) => (i.id === returnModalItem.id ? { ...i, status: "rejected" } : i))
    );
    showToast(`Returned claim for ${returnModalItem.name} with revision notes.`);
    setReturnModalItem(null);
    setReturnFeedback("");
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
      {approveModalItem && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl p-5 sm:p-6 max-w-md w-full space-y-4 shadow-xl border border-slate-200 animate-in zoom-in-95 duration-200 relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">Endorse Document Claim</h3>
                  <p className="text-xs text-slate-500 font-normal">District 3220 Moderator sign-off.</p>
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

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs sm:text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Business:</span>
                <span className="font-bold text-slate-900">{approveModalItem.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Applicant:</span>
                <span className="font-semibold text-slate-700">{approveModalItem.owner}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Document:</span>
                <span className="text-[#D41367] font-semibold">{approveModalItem.docType}</span>
              </div>
            </div>

            <p className="text-xs text-slate-500 font-normal leading-relaxed">
              Confirming this endorsement indicates you have audited the legal proof or DRR letter against District 3220 directory guidelines.
            </p>

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
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
                onClick={confirmApprove}
                className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-semibold h-9.5 px-5 shadow-xs"
              >
                Confirm Endorsement
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ================= RETURN / REVISE CONFIRMATION MODAL ================= */}
      {returnModalItem && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl p-5 sm:p-6 max-w-md w-full space-y-4 shadow-xl border border-slate-200 animate-in zoom-in-95 duration-200 relative">
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
                onClick={() => setReturnModalItem(null)}
                className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm">
                <p className="font-bold text-slate-900">{returnModalItem.name}</p>
                <p className="text-xs text-slate-500 font-normal mt-0.5">{returnModalItem.owner} • {returnModalItem.docType}</p>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs sm:text-sm font-semibold text-slate-700">Moderator Correction Note *</Label>
                <textarea
                  rows={3}
                  required
                  value={returnFeedback}
                  onChange={(e) => setReturnFeedback(e.target.value)}
                  placeholder="Explain why this document needs correction (e.g. invalid signature, wrong tenure)..."
                  className="w-full text-xs sm:text-sm p-3 bg-slate-50 rounded-xl border border-slate-200 outline-none focus:bg-white focus:border-[#D41367] focus:ring-2 focus:ring-pink-100 transition-all placeholder:text-slate-400 resize-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
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
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              District 3220 Verification Queue
            </h1>
            <span className="px-2.5 py-0.5 rounded-md bg-pink-50 text-[#D41367] font-semibold text-xs border border-pink-100/60">
              {items.filter((i) => i.status === "pending").length} Pending Audits
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-normal mt-0.5">
            Audit submitted business registration documents and DRR recommendation letters for District 3220.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="outline"
            className="rounded-xl text-xs sm:text-sm font-semibold text-slate-700 border-slate-200 hover:bg-slate-50 gap-2 h-9.5 px-3.5"
            asChild
          >
            <Link href="/moderator-dashboard">
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
            placeholder="Search applicant, business, document..."
            className="pl-9.5 h-9.5 text-xs sm:text-sm bg-slate-50 border-slate-200 rounded-xl focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {[
            { id: "all", label: "All Claims" },
            { id: "pending", label: "Pending" },
            { id: "approved", label: "Approved" },
            { id: "rejected", label: "Returned" },
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

      {/* ================= TABLE LISTING ================= */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70 text-xs font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3.5 px-5">Applicant &amp; Business</th>
                <th className="py-3.5 px-5">Document Claim</th>
                <th className="py-3.5 px-5">Status</th>
                <th className="py-3.5 px-5">Submitted</th>
                <th className="py-3.5 px-5 text-right">Moderator Decision</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400">
                    No district verification claims match your search filter.
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-4 px-5">
                      <p className="font-bold text-slate-900">{item.name}</p>
                      <p className="text-xs text-slate-500 font-normal">{item.owner}</p>
                    </td>
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                        <FileText className="w-3.5 h-3.5 text-[#D41367]" />
                        <span>{item.docType}</span>
                      </div>
                    </td>
                    <td className="py-4 px-5">
                      <span
                        className={`px-2.5 py-0.5 rounded-md text-xs font-semibold ${
                          item.status === "approved"
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                            : item.status === "rejected"
                            ? "bg-rose-100 text-rose-800 border border-rose-200"
                            : "bg-amber-100 text-amber-800 border border-amber-200"
                        }`}
                      >
                        {item.status === "approved"
                          ? "Approved"
                          : item.status === "rejected"
                          ? "Revision Required"
                          : "Pending Review"}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-slate-400 font-normal">{item.date}</td>
                    <td className="py-4 px-5 text-right">
                      {item.status === "approved" ? (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Endorsed</span>
                        </span>
                      ) : item.status === "rejected" ? (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-700">
                          <XCircle className="w-4 h-4 text-red-600" />
                          <span>Revision Sent</span>
                        </span>
                      ) : (
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8.5 text-xs font-semibold rounded-xl gap-1 border-slate-200 text-slate-700 hover:bg-slate-50"
                            asChild
                          >
                            <Link href={`/business/${item.slug}`} target="_blank" rel="noopener noreferrer">
                              <Eye className="w-3.5 h-3.5" />
                              <span>Inspect</span>
                            </Link>
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => setApproveModalItem(item)}
                            className="h-8.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl gap-1 cursor-pointer shadow-2xs"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Approve</span>
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              setReturnModalItem(item);
                              setReturnFeedback("");
                            }}
                            className="h-8.5 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-xl cursor-pointer"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Return</span>
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
    </div>
  );
}
