import Link from "next/link";
import { Sidebar } from "@/components/sidebar";
import { Monitor, Laptop, ArrowRight, Home, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { UserRole } from "@/lib/types";

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: UserRole;
  links: readonly { href: string; label: string; icon: string }[];
  userName?: string;
  userRole?: string;
  districtInfo?: string;
}

export function DashboardLayout({
  children,
  role,
  links,
  userName,
  userRole,
  districtInfo,
}: DashboardLayoutProps) {
  const portalName =
    role === "super_admin"
      ? "Super Admin Workspace"
      : role === "moderator"
      ? "District Moderator Desk"
      : "Enterprise Management Portal";

  return (
    <>
      {/* ================= MOBILE BLOCKER SCREEN (Visible on < lg screens) ================= */}
      <div className="lg:hidden min-h-screen bg-white text-slate-900 flex flex-col items-center justify-between p-6 sm:p-10 relative overflow-hidden font-sans">
        {/* Background Precision Mesh Grid (Matching Hero Theme) */}
        <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
          <div
            className="absolute top-0 left-0 w-[440px] sm:w-[560px] h-[440px] sm:h-[560px]"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(212, 19, 103, 0.12) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(212, 19, 103, 0.12) 1px, transparent 1px)
              `,
              backgroundSize: "32px 32px",
              maskImage: "radial-gradient(circle at top left, black 30%, transparent 75%)",
              WebkitMaskImage: "radial-gradient(circle at top left, black 30%, transparent 75%)",
            }}
          />
          <div
            className="absolute bottom-0 right-0 w-[440px] sm:w-[560px] h-[440px] sm:h-[560px]"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(212, 19, 103, 0.12) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(212, 19, 103, 0.12) 1px, transparent 1px)
              `,
              backgroundSize: "32px 32px",
              maskImage: "radial-gradient(circle at bottom right, black 30%, transparent 75%)",
              WebkitMaskImage: "radial-gradient(circle at bottom right, black 30%, transparent 75%)",
            }}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-pink-50/70 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Top Branding Header */}
        <div className="w-full flex items-center justify-between z-10 border-b border-slate-200/80 pb-4">
          <Link href="/" className="flex items-center gap-1.5">
            <span className="text-base font-black tracking-tight text-slate-900">
              Rotaract <span className="text-[#D41367]">Network</span>
            </span>
          </Link>
          <span className="text-[10px] font-extrabold uppercase px-3 py-1 rounded-full bg-pink-50 text-[#D41367] border border-pink-200 shadow-2xs">
            {portalName}
          </span>
        </div>

        {/* Center Main Warning Graphic & Message */}
        <div className="my-auto py-8 max-w-sm w-full space-y-6 text-center z-10">
          {/* Animated Graphic Icon Stack */}
          <div className="relative inline-flex items-center justify-center mx-auto">
            {/* Outer Glow Ring */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-br from-pink-50 via-white to-pink-100/60 border-2 border-[#D41367]/30 flex items-center justify-center shadow-lg shadow-[#D41367]/10">
              <Laptop className="w-12 h-12 sm:w-14 sm:h-14 text-[#D41367]" />
            </div>

            {/* Small Device Indicator Badge */}
            <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-2xl bg-white border-2 border-slate-200 flex items-center justify-center text-slate-700 shadow-md">
              <Monitor className="w-5 h-5 text-[#0050A2]" />
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-3">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug">
              Please Access From a Computer
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
              The <strong className="text-[#D41367]">{portalName}</strong> is designed and optimized for widescreen desktop computers to manage high-precision enterprise listings, document verification audits, and district controls.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2.5 pt-2">
            <Button
              className="w-full bg-[#D41367] hover:bg-[#B80E56] text-white font-extrabold text-xs sm:text-sm rounded-2xl py-3 shadow-md shadow-[#D41367]/20 flex items-center justify-center gap-2 cursor-pointer h-auto"
              asChild
            >
              <Link href="/directory">
                <Compass className="w-4 h-4" />
                <span>Explore Public Directory</span>
                <ArrowRight className="w-3.5 h-3.5 ml-auto" />
              </Link>
            </Button>

            <Button
              variant="outline"
              className="w-full border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs sm:text-sm rounded-2xl py-3 flex items-center justify-center gap-2 cursor-pointer h-auto shadow-2xs"
              asChild
            >
              <Link href="/">
                <Home className="w-4 h-4 text-slate-600" />
                <span>Return to Homepage</span>
              </Link>
            </Button>
          </div>
        </div>

        {/* Footer info */}
        <div className="w-full text-center text-[10px] text-slate-400 font-medium pt-4 border-t border-slate-100 z-10">
          Rotaract Business Platform &copy; {new Date().getFullYear()} RSAMDIO
        </div>
      </div>

      {/* ================= DESKTOP DASHBOARD (Visible on lg+ screens) ================= */}
      <div className="hidden lg:flex min-h-screen bg-slate-50/50">
        <Sidebar
          role={role}
          links={links}
          userName={userName}
          userRole={userRole}
          districtInfo={districtInfo}
        />
        <div className="flex-1 flex flex-col min-w-0">
          <main className="flex-1 p-5 sm:p-6 lg:p-8 pb-12">{children}</main>
        </div>
      </div>
    </>
  );
}
