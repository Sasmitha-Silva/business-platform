"use client";

import { useState } from "react";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AdminVerificationItem {
  id: string;
  name: string;
  slug: string;
  district: string;
  requestedTier: string;
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
    requestedTier: "Gold Tier",
    docs: "GST, DRR Letter, Udyam",
    submitted: "2h ago",
    status: "pending",
  },
  {
    id: "2",
    name: "Apex Dental Studio",
    slug: "apex-dental-studio",
    district: "District 3141",
    requestedTier: "Gold Tier",
    docs: "GST Cert, DRR Letter, Udyam",
    submitted: "5h ago",
    status: "pending",
  },
  {
    id: "3",
    name: "Vivid Design Hub",
    slug: "vivid-design-hub",
    district: "District 9212",
    requestedTier: "Silver Tier",
    docs: "GST Cert, DRR Letter",
    submitted: "1d ago",
    status: "pending",
  },
  {
    id: "4",
    name: "Colombo Tea Exports Ltd",
    slug: "colombo-tea-exports",
    district: "District 3220",
    requestedTier: "Gold Tier",
    docs: "Export License, GST, DRR",
    submitted: "2d ago",
    status: "approved",
  },
];

export default function AdminVerificationsPage() {
  const [items, setItems] = useState<AdminVerificationItem[]>(initialVerifications);
  const [searchQuery, setSearchQuery] = useState("");
  const [tierFilter, setTierFilter] = useState("all");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals state
  const [approveModalItem, setApproveModalItem] = useState<AdminVerificationItem | null>(null);
  const [returnModalItem, setReturnModalItem] = useState<AdminVerificationItem | null>(null);
  const [returnFeedback, setReturnFeedback] = useState("");

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.district.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTier = tierFilter === "all" ? true : item.requestedTier.toLowerCase().includes(tierFilter);
    return matchesSearch && matchesTier;
  });

  const confirmApprove = () => {
    if (!approveModalItem) return;
    setItems((prev) =>
      prev.map((item) => (item.id === approveModalItem.id ? { ...item, status: "approved" } : item))
    );
    showToast(`Approved ${approveModalItem.name} for ${approveModalItem.requestedTier}.`);
    setApproveModalItem(null);
  };

  const confirmReturn = () => {
    if (!returnModalItem) return;
    setItems((prev) =>
      prev.map((item) => (item.id === returnModalItem.id ? { ...item, status: "rejected" } : item))
    );
    showToast(`Returned ${returnModalItem.name} for revision.`);
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
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">Approve Accreditation</h3>
                  <p className="text-xs text-slate-500 font-normal">Confirm verified tier grant.</p>
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
                <span className="text-slate-500">District:</span>
                <span className="font-semibold text-slate-700">{approveModalItem.district}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Tier Grant:</span>
                <span className="font-bold text-amber-700">{approveModalItem.requestedTier}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Documents:</span>
                <span className="text-slate-700">{approveModalItem.docs}</span>
              </div>
            </div>

            <p className="text-xs text-slate-500 font-normal leading-relaxed">
              Granting this verification will immediately award the official badge, unlock directory ranking boosts, and notify the business owner.
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
                Confirm &amp; Award Badge
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

            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm">
                <p className="font-bold text-slate-900">{returnModalItem.name}</p>
                <p className="text-xs text-slate-500 font-normal mt-0.5">{returnModalItem.district} • {returnModalItem.requestedTier}</p>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs sm:text-sm font-semibold text-slate-700">Revision Reason &amp; Feedback *</Label>
                <textarea
                  rows={3}
                  required
                  value={returnFeedback}
                  onChange={(e) => setReturnFeedback(e.target.value)}
                  placeholder="e.g. Scanned GST certificate is blurry, or DRR endorsement is for previous rotary tenure..."
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
                Submit Feedback &amp; Return
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
              Global Verifications Queue
            </h1>
            <span className="px-2.5 py-0.5 rounded-md bg-pink-50 text-[#D41367] font-semibold text-xs border border-pink-100/60">
              {items.filter((i) => i.status === "pending").length} Pending Audits
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-normal mt-0.5">
            Audit pending GST, DRR, and Udyam MSME document submissions across all Rotary International districts.
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

      {/* ================= SEARCH & FILTER TOOLBAR ================= */}
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
            { id: "all", label: "All Tiers" },
            { id: "gold", label: "Gold Tier" },
            { id: "silver", label: "Silver Tier" },
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

      {/* ================= TABLE LISTING (FIXED WIDTH, ZERO HORIZONTAL SCROLL) ================= */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <table className="w-full table-fixed text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/70 text-xs font-bold uppercase tracking-wider text-slate-500">
              <th className="py-3.5 px-4 w-[24%] whitespace-nowrap">Business Name</th>
              <th className="py-3.5 px-3 w-[14%] whitespace-nowrap">District</th>
              <th className="py-3.5 px-3 w-[13%] whitespace-nowrap">Tier</th>
              <th className="py-3.5 px-3 w-[23%] whitespace-nowrap">Documents</th>
              <th className="py-3.5 px-3 w-[10%] whitespace-nowrap">Submitted</th>
              <th className="py-3.5 px-4 w-[16%] text-right whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
            {filteredItems.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-slate-400">
                  No verification claims matched your search filter.
                </td>
              </tr>
            ) : (
              filteredItems.map((item) => (
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
                      className={`inline-block px-2 py-0.5 rounded-md text-xs font-semibold whitespace-nowrap ${
                        item.requestedTier.includes("Gold")
                          ? "bg-amber-100 text-amber-800 border border-amber-200"
                          : "bg-slate-100 text-slate-700 border border-slate-200"
                      }`}
                    >
                      {item.requestedTier}
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
  );
}
