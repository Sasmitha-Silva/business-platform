"use client";

import { ShieldCheck, Search, Filter, CheckCircle2, XCircle, Clock, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

const pendingVerifications = [
  { id: "1", name: "Lumina Digital Solutions", owner: "Rtr. Anand Vardhan Sharma", district: "District 3220", requestedTier: "Gold Tier", docs: "GST + DRR + Udyam", submitted: "2 hours ago" },
  { id: "2", name: "Apex Dental Studio", owner: "Dr. Rtr. Rohan Shah", district: "District 3141", requestedTier: "Gold Tier", docs: "GST + DRR + Udyam", submitted: "5 hours ago" },
  { id: "3", name: "Vivid Design Hub", owner: "Rtr. Amina Kimani", district: "District 9212", requestedTier: "Silver Tier", docs: "GST + DRR", submitted: "1 day ago" },
];

export default function AdminVerificationsPage() {
  return (
    <div className="space-y-6 animate-fade-in max-w-7xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Global Verifications Queue</h1>
          <p className="text-xs text-muted-foreground mt-1">Review pending GST, DRR, and Udyam document claims across all R.I. districts.</p>
        </div>
        <Button className="bg-[#D41367] hover:bg-[#B80E56] text-white rounded-xl text-xs font-bold gap-2">
          <Filter className="w-4 h-4" /> Filter by District
        </Button>
      </div>

      <div className="bg-white rounded-3xl border border-border p-6 shadow-sm space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                <th className="py-3 px-4">BUSINESS / OWNER</th>
                <th className="py-3 px-4">DISTRICT</th>
                <th className="py-3 px-4">REQUESTED TIER</th>
                <th className="py-3 px-4">DOCUMENTS ATTACHED</th>
                <th className="py-3 px-4">SUBMITTED</th>
                <th className="py-3 px-4 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-xs">
              {pendingVerifications.map((item) => (
                <tr key={item.id} className="hover:bg-warm-bg/50">
                  <td className="py-4 px-4">
                    <p className="font-bold text-foreground">{item.name}</p>
                    <p className="text-[10px] text-muted-foreground">{item.owner}</p>
                  </td>
                  <td className="py-4 px-4 font-semibold text-foreground">{item.district}</td>
                  <td className="py-4 px-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                      {item.requestedTier}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-muted-foreground">{item.docs}</td>
                  <td className="py-4 px-4 text-muted-foreground">{item.submitted}</td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button size="sm" variant="outline" className="h-8 text-[11px] rounded-xl gap-1 border-border">
                        <Eye className="w-3.5 h-3.5" /> Inspect
                      </Button>
                      <Button size="sm" className="h-8 text-[11px] bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl gap-1">
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
