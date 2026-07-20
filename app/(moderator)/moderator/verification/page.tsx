"use client";

import { ShieldCheck, Search, Eye, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const districtVerifications = [
  { id: "1", name: "Lumina Digital Solutions", owner: "Rtr. Anand Vardhan Sharma", docType: "DRR Endorsement Letter", status: "Pending Moderator Review", date: "2 hours ago" },
  { id: "2", name: "Nexus Analytics", owner: "Rtr. Sarah Perera", docType: "GST Certificate + DRR Recommendation", status: "Pending Moderator Review", date: "4 hours ago" },
];

export default function ModeratorVerificationPage() {
  return (
    <div className="space-y-6 animate-fade-in max-w-7xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">District 3220 — Verification Review Queue</h1>
          <p className="text-xs text-muted-foreground mt-1">Audit submitted member documents and DRR recommendation letters.</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-border p-6 shadow-sm space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                <th className="py-3 px-4">BUSINESS / APPLICANT</th>
                <th className="py-3 px-4">DOCUMENT TYPE</th>
                <th className="py-3 px-4">STATUS</th>
                <th className="py-3 px-4">SUBMITTED</th>
                <th className="py-3 px-4 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-xs">
              {districtVerifications.map((item) => (
                <tr key={item.id} className="hover:bg-warm-bg/50">
                  <td className="py-4 px-4">
                    <p className="font-bold text-foreground">{item.name}</p>
                    <p className="text-[10px] text-muted-foreground">{item.owner}</p>
                  </td>
                  <td className="py-4 px-4 font-semibold text-foreground">{item.docType}</td>
                  <td className="py-4 px-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                      {item.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-muted-foreground">{item.date}</td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button size="sm" variant="outline" className="h-8 text-[11px] rounded-xl gap-1 border-border">
                        <Eye className="w-3.5 h-3.5" /> Inspect Document
                      </Button>
                      <Button size="sm" className="h-8 text-[11px] bg-emerald-600 text-white rounded-xl gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
