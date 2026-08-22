"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  XCircle,
  Search,
  Download,
  Calendar,
  History,
  ShieldAlert,
  Clock,
  Ban,
  FileWarning,
  AlertTriangle,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockDeactivationRequests } from "@/lib/mock-data";
import {
  DEACTIVATION_REASON_CATEGORIES,
  DEACTIVATION_STATUS_BADGES,
} from "@/lib/constants";
import type { BusinessDeactivationRequest } from "@/lib/types";

interface HistoryClaim {
  id: string;
  business: string;
  owner: string;
  date: string;
  decision: "Approved" | "Revision Required";
  tierOrReason: string;
}

const initialHistoryClaims: HistoryClaim[] = [
  {
    id: "1",
    business: "Lumina Digital Solutions",
    owner: "Rtr. Anand Vardhan Sharma",
    date: "July 18, 2026",
    decision: "Approved",
    tierOrReason: "Gold Tier Endorsed",
  },
  {
    id: "2",
    business: "Nexus Analytics",
    owner: "Rtr. Sarah Chen",
    date: "July 17, 2026",
    decision: "Approved",
    tierOrReason: "Silver Tier Endorsed",
  },
  {
    id: "3",
    business: "Studio Bloom Creative",
    owner: "Rtr. Marcus Vance",
    date: "July 15, 2026",
    decision: "Revision Required",
    tierOrReason: "Expired GST REG-06 Scan",
  },
];

export default function ModeratorHistoryPage() {
  const [activeTab, setActiveTab] = useState<"verifications" | "deactivations">("verifications");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDecision, setFilterDecision] = useState("all");

  const [deactivationList] = useState<BusinessDeactivationRequest[]>(mockDeactivationRequests);

  // Verifications filtering
  const filteredVerifications = initialHistoryClaims.filter((item) => {
    const matchesSearch =
      item.business.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tierOrReason.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDecision =
      filterDecision === "all" ? true : item.decision.toLowerCase().includes(filterDecision);
    return matchesSearch && matchesDecision;
  });

  // Deactivations filtering
  const filteredDeactivations = deactivationList.filter((item) => {
    const matchesSearch =
      item.business_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.owner_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.reason_details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (DEACTIVATION_REASON_CATEGORIES[item.reason_category]?.label || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      filterDecision === "all" ? true : item.status === filterDecision;
    return matchesSearch && matchesStatus;
  });

  const handleExport = () => {
    const data = activeTab === "verifications" ? filteredVerifications : filteredDeactivations;
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `district-3220-${activeTab}-history.json`;
    a.click();
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-[1600px] mx-auto pb-12">
      {/* ================= HEADER BANNER ================= */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              District Audit History &amp; Decisions
            </h1>
            <span className="px-2.5 py-0.5 rounded-md bg-pink-50 text-[#D41367] font-semibold text-xs border border-pink-100/60">
              District 3220 Archives
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-normal mt-0.5">
            Complete audit trail of verified endorsements, returned submissions, and moderator deactivation escalations.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <Button
            onClick={handleExport}
            className="bg-[#D41367] hover:bg-[#B80E56] text-white rounded-xl text-xs sm:text-sm font-semibold gap-2 h-9.5 px-4 shadow-xs cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Archive</span>
          </Button>
        </div>
      </div>

      {/* ================= MAIN CATEGORY TABS ================= */}
      <div className="flex border-b border-slate-200 gap-6">
        <button
          onClick={() => {
            setActiveTab("verifications");
            setFilterDecision("all");
          }}
          className={`pb-3 text-xs sm:text-sm font-bold transition-all relative cursor-pointer ${
            activeTab === "verifications"
              ? "text-[#D41367]"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          <span>Credential Verifications ({initialHistoryClaims.length})</span>
          {activeTab === "verifications" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D41367] rounded-full" />
          )}
        </button>

        <button
          onClick={() => {
            setActiveTab("deactivations");
            setFilterDecision("all");
          }}
          className={`pb-3 text-xs sm:text-sm font-bold transition-all relative cursor-pointer flex items-center gap-1.5 ${
            activeTab === "deactivations"
              ? "text-[#D41367]"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          <span>Deactivation Escalations ({deactivationList.length})</span>
          {activeTab === "deactivations" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D41367] rounded-full" />
          )}
        </button>
      </div>

      {/* ================= SEARCH & FILTER TOOLBAR ================= */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              activeTab === "verifications"
                ? "Search business, owner, reason..."
                : "Search business, violation, findings..."
            }
            className="pl-9.5 h-9.5 text-xs sm:text-sm bg-slate-50 border-slate-200 rounded-xl focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {activeTab === "verifications" ? (
            [
              { id: "all", label: "All Decisions" },
              { id: "approved", label: "Approved" },
              { id: "revision", label: "Revision Required" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterDecision(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold shrink-0 cursor-pointer transition-all ${
                  filterDecision === tab.id
                    ? "bg-[#D41367] text-white shadow-2xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {tab.label}
              </button>
            ))
          ) : (
            [
              { id: "all", label: "All Statuses" },
              { id: "pending", label: "Pending Admin" },
              { id: "approved", label: "Deactivated" },
              { id: "rejected", label: "Dismissed" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterDecision(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold shrink-0 cursor-pointer transition-all ${
                  filterDecision === tab.id
                    ? "bg-[#D41367] text-white shadow-2xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {tab.label}
              </button>
            ))
          )}
        </div>
      </div>

      {/* ================= TAB 1: VERIFICATION AUDITS TABLE ================= */}
      {activeTab === "verifications" && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-xs font-bold uppercase tracking-wider text-slate-500">
                  <th className="py-3.5 px-5">Business Name</th>
                  <th className="py-3.5 px-5">Applicant Owner</th>
                  <th className="py-3.5 px-5">Audit Decision &amp; Notes</th>
                  <th className="py-3.5 px-5 text-right">Review Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                {filteredVerifications.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-12 text-center text-slate-400">
                      No historical review entries matched your search filter.
                    </td>
                  </tr>
                ) : (
                  filteredVerifications.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-4 px-5 font-bold text-slate-900">{item.business}</td>
                      <td className="py-4 px-5 text-slate-600 font-normal">{item.owner}</td>
                      <td className="py-4 px-5">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-semibold ${
                            item.decision === "Approved"
                              ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                              : "bg-rose-100 text-rose-800 border border-rose-200"
                          }`}
                        >
                          {item.decision === "Approved" ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <XCircle className="w-3.5 h-3.5 text-red-600" />
                          )}
                          <span>
                            {item.decision} • {item.tierOrReason}
                          </span>
                        </span>
                      </td>
                      <td className="py-4 px-5 text-slate-400 font-normal text-right">
                        {item.date}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= TAB 2: DEACTIVATION ESCALATIONS TABLE ================= */}
      {activeTab === "deactivations" && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-xs font-bold uppercase tracking-wider text-slate-500">
                  <th className="py-3.5 px-5">Target Business</th>
                  <th className="py-3.5 px-5">Reason Category</th>
                  <th className="py-3.5 px-5">Moderator Justification</th>
                  <th className="py-3.5 px-5">Admin Status &amp; Notes</th>
                  <th className="py-3.5 px-5 text-right">Submitted</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                {filteredDeactivations.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-slate-400">
                      No deactivation request records found for the selected criteria.
                    </td>
                  </tr>
                ) : (
                  filteredDeactivations.map((item) => {
                    const reasonMeta = DEACTIVATION_REASON_CATEGORIES[item.reason_category];
                    const statusMeta = DEACTIVATION_STATUS_BADGES[item.status];

                    return (
                      <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-4 px-5">
                          <div className="min-w-0">
                            <p className="font-bold text-slate-900">{item.business_name}</p>
                            <p className="text-xs text-slate-500 flex items-center gap-1">
                              <User className="w-3 h-3 text-slate-400" />
                              {item.owner_name}
                            </p>
                          </div>
                        </td>

                        <td className="py-4 px-5">
                          <span
                            className={`px-2.5 py-0.5 rounded-md text-xs font-semibold border ${
                              reasonMeta?.badgeClass || "bg-slate-100 text-slate-700"
                            }`}
                          >
                            {reasonMeta?.label || item.reason_category}
                          </span>
                          <span className="block text-[10px] text-slate-400 mt-1 uppercase font-semibold">
                            {item.urgency} urgency
                          </span>
                        </td>

                        <td className="py-4 px-5 max-w-xs">
                          <p className="text-xs text-slate-700 line-clamp-2 leading-relaxed">
                            {item.reason_details}
                          </p>
                          {item.evidence_notes && (
                            <p className="text-[11px] text-slate-500 italic mt-0.5 truncate">
                              Ref: {item.evidence_notes}
                            </p>
                          )}
                        </td>

                        <td className="py-4 px-5">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold border ${
                              statusMeta?.bgClass || "bg-slate-100 text-slate-700"
                            }`}
                          >
                            {item.status === "pending" && <Clock className="w-3 h-3 text-amber-600" />}
                            {item.status === "approved" && <Ban className="w-3 h-3 text-red-600" />}
                            {item.status === "rejected" && <XCircle className="w-3 h-3 text-slate-500" />}
                            <span>{statusMeta?.label || item.status}</span>
                          </span>

                          {item.admin_notes && (
                            <p className="text-[11px] text-slate-600 mt-1 italic">
                              Admin: {item.admin_notes}
                            </p>
                          )}
                        </td>

                        <td className="py-4 px-5 text-slate-400 font-normal text-right whitespace-nowrap">
                          {new Date(item.created_at).toLocaleDateString()}
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
