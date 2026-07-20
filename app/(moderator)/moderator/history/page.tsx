"use client";

import { CheckCircle2, XCircle, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

const historyClaims = [
  { id: "1", business: "Lumina Digital Solutions", owner: "Anand Vardhan", date: "July 18, 2026", decision: "Approved", tier: "Gold Tier" },
  { id: "2", business: "Nexus Analytics", owner: "Sarah Chen", date: "July 17, 2026", decision: "Approved", tier: "Silver Tier" },
  { id: "3", business: "Studio Bloom", owner: "Marcus Vance", date: "July 15, 2026", decision: "Rejected", reason: "Expired GST document" },
];

export default function ModeratorHistoryPage() {
  return (
    <div className="space-y-6 animate-fade-in max-w-7xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">District 3220 — Review Audit History</h1>
          <p className="text-xs text-muted-foreground mt-1">Archived log of past document verification reviews and decisions.</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-border p-6 shadow-sm space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                <th className="py-3 px-4">BUSINESS NAME</th>
                <th className="py-3 px-4">OWNER</th>
                <th className="py-3 px-4">DECISION</th>
                <th className="py-3 px-4">REVIEW DATE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-xs">
              {historyClaims.map((item) => (
                <tr key={item.id} className="hover:bg-warm-bg/50">
                  <td className="py-4 px-4 font-bold text-foreground">{item.business}</td>
                  <td className="py-4 px-4 text-muted-foreground">{item.owner}</td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold ${item.decision === 'Approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                      {item.decision === 'Approved' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                      {item.decision} ({item.tier || item.reason})
                    </span>
                  </td>
                  <td className="py-4 px-4 text-muted-foreground">{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
