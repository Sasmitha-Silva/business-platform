import Link from "next/link";
import { Share2, Plus, Eye, TrendingUp, ShieldCheck, Clock, AlertCircle, MoreVertical, FileText, Calendar, Users, Megaphone, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VerificationBadge } from "@/components/verification-badge";
import { mockEnquiries, mockOwnerStats } from "@/lib/mock-data";
import { ENQUIRY_STATUSES } from "@/lib/constants";

export default function OwnerDashboardPage() {
  const stats = mockOwnerStats;
  const enquiries = mockEnquiries.slice(0, 3);

  // Progress ring values
  const radius = 55;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (stats.profile_completeness / 100) * circumference;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Welcome back, Rtr. Sarah Perera</h1>
          <p className="text-sm text-muted-foreground">Your business visibility is up {stats.impressions_change}% this week.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl gap-2 border-border">
            <Share2 className="w-4 h-4" /> Share Profile
          </Button>
          <Button className="bg-crimson hover:bg-crimson-dark text-white rounded-xl gap-2" asChild>
            <Link href="/dashboard/settings"><Plus className="w-4 h-4" /> Edit Profile</Link>
          </Button>
        </div>
      </div>

      {/* Top Cards */}
      <div className="grid lg:grid-cols-4 gap-5">
        {/* Profile Integrity */}
        <div className="bg-card rounded-2xl border border-border p-6 flex flex-col items-center justify-center">
          <svg width="140" height="140" viewBox="0 0 140 140">
            <circle cx="70" cy="70" r={radius} fill="none" stroke="#F0E6DF" strokeWidth="10" />
            <circle
              cx="70" cy="70" r={radius} fill="none"
              stroke="#9B1B30" strokeWidth="10" strokeLinecap="round"
              strokeDasharray={circumference} strokeDashoffset={offset}
              className="progress-ring-circle"
            />
            <text x="70" y="65" textAnchor="middle" className="text-2xl font-bold" fill="#1A1A1A">{stats.profile_completeness}%</text>
            <text x="70" y="82" textAnchor="middle" className="text-xs" fill="#6B7280">COMPLETE</text>
          </svg>
          <p className="font-semibold text-foreground mt-2">Profile Integrity</p>
          <p className="text-xs text-muted-foreground text-center mt-1">Complete your bio and add business hours to reach 100%.</p>
          <Link href="/business/lumina-digital-solutions" className="text-xs text-crimson font-medium mt-2 hover:underline flex items-center gap-1">
            Finalize Profile →
          </Link>
        </div>

        {/* Verification Tiers */}
        <div className="bg-card rounded-2xl border border-border p-5">
          <div className="flex items-center justify-between mb-2">
            <ShieldCheck className="w-5 h-5 text-amber-600" />
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">APPROVED</span>
          </div>
          <p className="font-semibold text-foreground">Bronze Tier</p>
          <p className="text-xs text-muted-foreground">Identity & Basic Information</p>
          <p className="text-xs text-muted-foreground mt-2">Verified on Jan 12, 2024</p>
        </div>

        <div className="bg-card rounded-2xl border border-border p-5">
          <div className="flex items-center justify-between mb-2">
            <Clock className="w-5 h-5 text-slate-400" />
            <span className="text-xs font-semibold text-yellow-700 bg-yellow-50 px-2 py-0.5 rounded-full">PENDING</span>
          </div>
          <p className="font-semibold text-foreground">Silver Tier</p>
          <p className="text-xs text-muted-foreground">Business Registration Docs</p>
          <Link href="/verification" className="text-xs text-crimson font-semibold mt-2 block hover:underline">VIEW APPLICATION</Link>
        </div>

        <div className="bg-card rounded-2xl border border-border p-5">
          <div className="flex items-center justify-between mb-2">
            <AlertCircle className="w-5 h-5 text-amber-500" />
            <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">MISSING</span>
          </div>
          <p className="font-semibold text-foreground">Gold Tier</p>
          <p className="text-xs text-muted-foreground">Financial Audits & Referrals</p>
          <Button variant="outline" size="sm" className="mt-2 text-xs rounded-lg border-amber-300 text-amber-700 hover:bg-amber-50" asChild>
            <Link href="/verification">UPLOAD NOW</Link>
          </Button>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Enquiries Table */}
        <div className="lg:col-span-2 bg-card rounded-2xl border border-border p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-foreground">Recent Enquiries</h2>
            <Link href="/dashboard/enquiries" className="text-sm text-crimson font-medium hover:underline">View All</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-xs font-semibold text-muted-foreground uppercase py-3 pr-4">Contact</th>
                  <th className="text-left text-xs font-semibold text-muted-foreground uppercase py-3 pr-4">Service</th>
                  <th className="text-left text-xs font-semibold text-muted-foreground uppercase py-3 pr-4">Date</th>
                  <th className="text-left text-xs font-semibold text-muted-foreground uppercase py-3 pr-4">Status</th>
                  <th className="py-3 w-8"></th>
                </tr>
              </thead>
              <tbody>
                {enquiries.map((enq) => {
                  const statusConfig = ENQUIRY_STATUSES[enq.status];
                  return (
                    <tr key={enq.id} className="border-b border-border last:border-0 hover:bg-accent/30 transition-colors">
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-crimson/20 to-warm-pink flex items-center justify-center text-xs font-bold text-crimson">
                            {enq.from_name.split(" ").map((n) => n[0]).join("")}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">{enq.from_name}</p>
                            <p className="text-xs text-muted-foreground">{enq.from_organization || enq.from_contact}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 pr-4 text-sm text-muted-foreground">{enq.service_requested}</td>
                      <td className="py-3 pr-4 text-sm text-muted-foreground">{new Date(enq.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</td>
                      <td className="py-3 pr-4">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusConfig.bgClass}`}>
                          {statusConfig.label.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-3">
                        <Button variant="ghost" size="icon" className="w-7 h-7"><MoreVertical className="w-3.5 h-3.5" /></Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Cards */}
        <div className="space-y-5">
          {/* Network Visibility */}
          <div className="bg-card rounded-2xl border border-border p-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-crimson uppercase tracking-wider mb-2">
              <Eye className="w-4 h-4" /> Network Visibility
            </div>
            <div className="flex items-end gap-3">
              <span className="text-3xl font-bold text-foreground">{stats.profile_impressions.toLocaleString()}</span>
              <span className="text-sm font-semibold text-emerald-600 mb-1">↗{stats.impressions_change}%</span>
            </div>
            <p className="text-xs text-muted-foreground">Profile impressions this month</p>
            {/* Mini bar chart */}
            <div className="flex items-end gap-1 mt-4 h-12">
              {[30, 45, 60, 40, 75, 55, 80, 65, 90, 70, 85, 95].map((h, i) => (
                <div key={i} className="flex-1 bg-crimson/20 rounded-sm" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gradient-to-br from-crimson to-crimson-dark rounded-2xl p-6 text-white">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/70 flex items-center gap-1.5 mb-4">
              ⚡ Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: FileText, label: "New Post" },
                { icon: Calendar, label: "Host Event" },
                { icon: Users, label: "Find Partners" },
                { icon: Megaphone, label: "Campaigns" },
              ].map((action) => (
                <button
                  key={action.label}
                  className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <action.icon className="w-5 h-5" />
                  <span className="text-xs">{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
