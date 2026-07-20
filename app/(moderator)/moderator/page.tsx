"use client";

import { useState } from "react";
import Link from "next/link";
import { ShieldCheck, CheckCircle2, XCircle, Filter, Search, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/stat-card";
import { VerificationBadge } from "@/components/verification-badge";
import { Textarea } from "@/components/ui/textarea";
import { mockModeratorStats, mockPendingBusinesses, mockBusinesses } from "@/lib/mock-data";

export default function ModeratorDashboardPage() {
  const stats = mockModeratorStats;
  const pendingQueue = mockPendingBusinesses;
  const [claimedDoc, setClaimedDoc] = useState<string | null>("stellar");
  const [notes, setNotes] = useState("");

  return (
    <div className="space-y-6 animate-fade-in max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Moderator Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Overseeing business operations for District 3220.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-crimson bg-pink-50 border border-pink-200 px-3.5 py-1.5 rounded-full">
            Moderator Access: District 3220
          </span>
          <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">Support</Button>
          <Button variant="ghost" size="sm" className="text-xs text-crimson font-bold">Log Out</Button>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          label="PENDING VERIFICATIONS"
          value={stats.pending_verifications}
          subtext={`+${stats.pending_change} today`}
          accentColor="#9B1B30"
        />
        <StatCard
          label="ACTIVE BUSINESSES"
          value={stats.active_businesses}
          subtext={`${stats.active_verified_percentage}% verified`}
          accentColor="#2D8B5F"
        />
        <StatCard
          label="MY MONTHLY CLAIMS"
          value={stats.monthly_claims}
          subtext={`Avg ${stats.avg_turnaround} turnaround`}
          accentColor="#C7A94F"
        />
        <div className="bg-crimson rounded-3xl p-5 text-white shadow-md flex flex-col justify-between">
          <p className="text-[10px] font-bold uppercase tracking-wider text-white/80">DISTRICT HEALTH SCORE</p>
          <div>
            <span className="text-3xl font-extrabold">{stats.district_health_score}</span>
            <span className="text-xs text-white/80 ml-2">{stats.district_health_percentile} Globally</span>
          </div>
        </div>
      </div>

      {/* Verification Queue Table */}
      <div className="bg-white rounded-3xl border border-border p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-foreground text-lg">Verification Queue</h2>
          <Button variant="outline" size="sm" className="rounded-xl text-xs gap-1.5 border-border bg-white">
            <Filter className="w-3.5 h-3.5" /> Filter
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                <th className="py-3 px-4">BUSINESS NAME</th>
                <th className="py-3 px-4">TIER</th>
                <th className="py-3 px-4">SUBMITTED DATE</th>
                <th className="py-3 px-4 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-xs">
              {pendingQueue.map((biz) => (
                <tr key={biz.id} className="hover:bg-warm-bg/50 transition-colors">
                  <td className="py-4 px-4 font-bold text-foreground flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-pink-100 text-crimson font-bold flex items-center justify-center text-xs">
                      {biz.name.charAt(0)}
                    </div>
                    {biz.name}
                  </td>
                  <td className="py-4 px-4">
                    <VerificationBadge level={2} size="sm" />
                  </td>
                  <td className="py-4 px-4 text-muted-foreground">{biz.created_at}</td>
                  <td className="py-4 px-4 text-right">
                    <Button
                      onClick={() => setClaimedDoc(biz.id)}
                      className="bg-crimson hover:bg-crimson-dark text-white rounded-full text-xs font-bold px-5 py-1.5"
                    >
                      Claim
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* My Claims Section (Expanded Card) */}
      <div className="bg-white rounded-3xl border-2 border-dashed border-crimson/30 p-6 sm:p-8 shadow-sm space-y-6">
        <h2 className="font-bold text-foreground text-lg">My Claims</h2>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Claim Review Area (2 cols) */}
          <div className="lg:col-span-2 space-y-4 bg-warm-bg rounded-2xl p-6 border border-border">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-foreground text-base">Stellar Arch Partners</h3>
                <p className="text-xs text-muted-foreground">Gold Tier Application · ID: #44921</p>
              </div>
              <span className="text-xs font-bold text-amber-700 bg-amber-100 border border-amber-300 px-3 py-1 rounded-full">
                IN REVIEW
              </span>
            </div>

            <div className="space-y-1.5 pt-2">
              <label className="text-xs font-bold text-foreground">Internal Reason/Notes</label>
              <Textarea
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Provide detailed reasoning for approval or rejection..."
                className="bg-white text-xs rounded-xl border-border"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Button variant="outline" className="flex-1 rounded-xl border-red-500 text-red-600 hover:bg-red-50 text-xs font-bold h-10">
                Reject Application
              </Button>
              <Button className="flex-1 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-bold h-10">
                Approve Business
              </Button>
            </div>
          </div>

          {/* Moderation Guidelines Box */}
          <div className="bg-pink-50/70 rounded-2xl p-6 border border-pink-200 space-y-3">
            <h3 className="font-bold text-crimson text-sm flex items-center gap-2">
              <Info className="w-4 h-4" /> Moderation Guidelines
            </h3>
            <ul className="space-y-2 text-xs text-foreground/80">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                Verify tax identification number (TIN) matches submitted documents.
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                Cross-reference address with official district municipal records.
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                Ensure business owner is an active Rotaract alumni member.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* District 3220 Business Directory Grid */}
      <div className="bg-white rounded-3xl border border-border p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-foreground text-lg">District 3220 Business Directory</h2>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search directory..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-warm-bg border border-border rounded-xl outline-none"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {mockBusinesses.slice(0, 4).map((biz) => (
            <div key={biz.id} className="p-4 rounded-2xl bg-warm-bg border border-border flex items-center justify-between">
              <div>
                <p className="font-bold text-sm text-foreground truncate">{biz.name}</p>
                <p className="text-[10px] text-muted-foreground">{biz.category?.name}</p>
              </div>
              <VerificationBadge level={biz.verification_level} size="sm" showLabel={false} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
