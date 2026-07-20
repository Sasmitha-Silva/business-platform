"use client";

import { Filter, Download, Search, ShieldCheck, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockAdminActions } from "@/lib/mock-data";
import { ADMIN_ACTION_BADGES } from "@/lib/constants";

export default function AuditLogPage() {
  return (
    <div className="space-y-6 animate-fade-in max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Administrative Audit Log</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Real-time record of all administrative actions and verification updates across the network.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl gap-2 text-xs border-border bg-white">
            <Filter className="w-4 h-4" /> Filter
          </Button>
          <Button className="bg-crimson hover:bg-crimson-dark text-white rounded-xl text-xs gap-2 shadow-md">
            <Download className="w-4 h-4" /> Export CSV
          </Button>
        </div>
      </div>

      {/* Top Banner Row */}
      <div className="grid lg:grid-cols-3 gap-5">
        <div className="bg-white rounded-3xl border border-border p-6 shadow-sm">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">TOTAL ACTIONS</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-extrabold text-foreground">1,284</span>
            <span className="text-xs font-bold text-emerald-600">+12% vs LW</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-border p-6 shadow-sm">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">VERIFICATIONS</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-extrabold text-foreground">42</span>
            <span className="text-xs text-muted-foreground">This Week</span>
          </div>
        </div>

        <div className="bg-crimson rounded-3xl p-6 text-white shadow-md flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-white/80">Security Health</p>
            <p className="text-xs text-white/90 mt-1 max-w-[200px] leading-relaxed">
              All administrative activities are currently within normal baseline parameters.
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-white shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-3xl border border-border p-6 shadow-sm space-y-4">
        {/* Search */}
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by admin or business name..."
              className="w-full pl-10 pr-4 py-2 text-xs bg-warm-bg border border-border rounded-xl outline-none"
            />
          </div>
          <span className="text-xs text-muted-foreground">Showing 1-10 of 1,284 entries</span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                <th className="py-3 px-4">ADMIN NAME</th>
                <th className="py-3 px-4">ACTION</th>
                <th className="py-3 px-4">TARGET (BUSINESS)</th>
                <th className="py-3 px-4">TIMESTAMP</th>
                <th className="py-3 px-4">REASON / COMMENT</th>
                <th className="py-3 px-4 w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-xs">
              {mockAdminActions.map((act) => {
                const badge = ADMIN_ACTION_BADGES[act.action_type] || { label: act.action, bgClass: 'bg-blue-100 text-blue-700' };
                return (
                  <tr key={act.id} className="hover:bg-warm-bg/50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-amber-500 text-white font-bold flex items-center justify-center text-xs">
                          {act.admin_name.split(" ").map(n=>n[0]).join("")}
                        </div>
                        <div>
                          <p className="font-bold text-foreground">{act.admin_name}</p>
                          <p className="text-[10px] text-muted-foreground">{act.admin_role}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${badge.bgClass}`}>
                        {badge.label}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-semibold text-foreground">{act.target_name}</td>
                    <td className="py-4 px-4 text-muted-foreground">
                      {new Date(act.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      <br />
                      <span className="text-[10px]">{new Date(act.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </td>
                    <td className="py-4 px-4 text-muted-foreground max-w-xs truncate">{act.reason || "—"}</td>
                    <td className="py-4 px-4 text-right">
                      <Button variant="ghost" size="icon" className="w-7 h-7"><MoreVertical className="w-3.5 h-3.5" /></Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Load More */}
        <div className="text-center pt-4 border-t border-border">
          <button className="text-xs font-bold text-crimson hover:underline">Load More Activities ∨</button>
        </div>
      </div>
    </div>
  );
}
