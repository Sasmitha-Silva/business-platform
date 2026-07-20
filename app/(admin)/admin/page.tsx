import Link from "next/link";
import { AlertOctagon, Download, Calendar, ShieldCheck, Building2, MoreVertical, TrendingUp, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/stat-card";
import { VerificationBadge } from "@/components/verification-badge";
import { mockAdminAnalytics, mockBusinesses } from "@/lib/mock-data";

export default function SuperAdminDashboardPage() {
  const analytics = mockAdminAnalytics;
  const recentVerifications = mockBusinesses.slice(0, 3);

  return (
    <div className="space-y-6 animate-fade-in max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Super Admin Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Real-time ecosystem intelligence & network health monitoring.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl gap-2 text-xs border-border bg-white">
            <Calendar className="w-4 h-4" /> Last 30 Days
          </Button>
          <Button className="bg-crimson hover:bg-crimson-dark text-white rounded-xl text-xs gap-2 shadow-md">
            <Download className="w-4 h-4" /> Export Report
          </Button>
        </div>
      </div>

      {/* Critical Alert Banner */}
      <div className="bg-red-50 border border-red-200 rounded-3xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-2xl bg-red-600 text-white flex items-center justify-center shrink-0">
            <AlertOctagon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-red-900 text-sm">Critical Alert: Districts with Zero Moderators</h3>
            <p className="text-xs text-red-800/80 mt-0.5">
              District {analytics.districts_without_moderators.join(", ")} have no active administrators. Community management risk detected.
            </p>
          </div>
        </div>
        <Button className="bg-red-700 hover:bg-red-800 text-white rounded-xl text-xs font-bold shrink-0 px-5" asChild>
          <Link href="/admin/moderators">Assign Now</Link>
        </Button>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          label="TOTAL BUSINESSES"
          value={analytics.total_businesses.toLocaleString()}
          change={analytics.total_businesses_change}
          accentColor="#9B1B30"
        />
        <StatCard
          label="GOLD TIER"
          value={analytics.gold_tier_count.toLocaleString()}
          subtext={`${analytics.gold_tier_percentage}% of total network`}
          accentColor="#C7A94F"
        />
        <StatCard
          label="SILVER TIER"
          value={analytics.silver_tier_count.toLocaleString()}
          subtext={`${analytics.silver_tier_percentage}% of total network`}
          accentColor="#6B7280"
        />
        <StatCard
          label="UNVERIFIED"
          value={analytics.unverified_count.toLocaleString()}
          subtext="Requires manual review"
          accentColor="#DC2626"
        />
      </div>

      {/* Charts & Analytics Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Registration Trends Line Chart Placeholder */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-border p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-foreground text-base">Registration Trends</h2>
            <div className="flex items-center gap-4 text-xs font-semibold">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-crimson" /> Businesses</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-600" /> Users</span>
            </div>
          </div>

          <div className="h-64 flex items-end gap-2 pt-8 pb-2 border-b border-border">
            {analytics.monthly_registrations.map((item) => (
              <div key={item.month} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                <div className="w-full bg-blue-100 rounded-t-md hover:bg-blue-200 transition-colors" style={{ height: `${(item.users / 2200) * 100}%` }} />
                <div className="w-full bg-crimson/80 rounded-t-md hover:bg-crimson transition-colors" style={{ height: `${(item.businesses / 2200) * 100}%` }} />
                <span className="text-[10px] text-muted-foreground mt-2 font-medium">{item.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Category Breakdown Donut Chart */}
        <div className="bg-white rounded-3xl border border-border p-6 shadow-sm space-y-4 flex flex-col justify-between">
          <h2 className="font-bold text-foreground text-base">Category Breakdown</h2>

          <div className="relative w-44 h-44 mx-auto my-4 flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="38" fill="none" stroke="#9B1B30" strokeWidth="16" strokeDasharray="80 200" />
              <circle cx="50" cy="50" r="38" fill="none" stroke="#4A90D9" strokeWidth="16" strokeDasharray="50 200" strokeDashoffset="-80" />
              <circle cx="50" cy="50" r="38" fill="none" stroke="#C7A94F" strokeWidth="16" strokeDasharray="40 200" strokeDashoffset="-130" />
              <circle cx="50" cy="50" r="38" fill="none" stroke="#333333" strokeWidth="16" strokeDasharray="60 200" strokeDashoffset="-170" />
            </svg>
          </div>

          <div className="space-y-2 pt-2 text-xs">
            {analytics.category_breakdown.map((cat) => (
              <div key={cat.name} className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: cat.color }} />
                  <span className="text-muted-foreground font-medium">{cat.name}</span>
                </span>
                <span className="font-bold text-foreground">{cat.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Verifications */}
      <div className="bg-white rounded-3xl border border-border p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-foreground text-base">Recent Verifications</h2>
          <Link href="/admin/verifications" className="text-xs text-crimson font-bold hover:underline">
            View All
          </Link>
        </div>

        <div className="space-y-3">
          {recentVerifications.map((biz) => (
            <div key={biz.id} className="flex items-center justify-between p-4 rounded-2xl bg-warm-bg border border-border/60 hover:bg-pink-50/40 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center font-bold text-crimson text-sm">
                  {biz.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-sm text-foreground">{biz.name}</h3>
                  <p className="text-xs text-muted-foreground">Registered in District 3220 · {biz.category?.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <VerificationBadge level={biz.verification_level} size="sm" />
                <span className="text-xs text-muted-foreground">2 hours ago</span>
                <Button variant="ghost" size="icon" className="w-7 h-7"><MoreVertical className="w-3.5 h-3.5" /></Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
