"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  XCircle,
  Search,
  Filter,
  Download,
  Calendar,
  History,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDecision, setFilterDecision] = useState("all");

  const filtered = initialHistoryClaims.filter((item) => {
    const matchesSearch =
      item.business.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tierOrReason.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDecision =
      filterDecision === "all" ? true : item.decision.toLowerCase().includes(filterDecision);
    return matchesSearch && matchesDecision;
  });

  return (
    <div className="space-y-6 animate-fade-in max-w-[1600px] mx-auto pb-12">
      {/* ================= HEADER BANNER ================= */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              District Audit History &amp; Decisions
            </h1>
            <span className="px-2.5 py-0.5 rounded-md bg-pink-50 text-[#D41367] font-semibold text-xs border border-pink-100/60">
              Archived Logs
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-normal mt-0.5">
            Archived record of all past verification audits, approvals, and returned submissions for District 3220.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <Button
            onClick={() => {
              const data = initialHistoryClaims;
              const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = "district-3220-audit-history.json";
              a.click();
            }}
            className="bg-[#D41367] hover:bg-[#B80E56] text-white rounded-xl text-xs sm:text-sm font-semibold gap-2 h-9.5 px-4 shadow-xs cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Archive</span>
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
            placeholder="Search business, owner, reason..."
            className="pl-9.5 h-9.5 text-xs sm:text-sm bg-slate-50 border-slate-200 rounded-xl focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {[
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
          ))}
        </div>
      </div>

      {/* ================= AUDIT HISTORY TABLE ================= */}
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
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-slate-400">
                    No historical review entries matched your search filter.
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
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
                        <span>{item.decision} • {item.tierOrReason}</span>
                      </span>
                    </td>
                    <td className="py-4 px-5 text-slate-400 font-normal text-right">{item.date}</td>
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
