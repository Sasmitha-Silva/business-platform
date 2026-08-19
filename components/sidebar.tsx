"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  Store,
  ShieldCheck,
  Settings,
  FolderTree,
  Users,
  UserCog,
  ClipboardList,
  BarChart3,
  HelpCircle,
  LogOut,
  Edit3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { UserRole } from "@/lib/types";

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard,
  Building2,
  Store,
  ShieldCheck,
  Settings,
  FolderTree,
  Users,
  UserCog,
  ClipboardList,
  BarChart3,
  Edit3,
};

interface SidebarLink {
  href: string;
  label: string;
  icon: string;
}

interface SidebarProps {
  role: UserRole;
  links: readonly SidebarLink[];
  userName?: string;
  userRole?: string;
  districtInfo?: string;
  className?: string;
}

export function Sidebar({
  role,
  links,
  userName = "Member Portal",
  userRole,
  districtInfo,
  className,
}: SidebarProps) {
  const pathname = usePathname();

  const portalSubtitle =
    role === "owner"
      ? "Business Workspace"
      : role === "super_admin" || (role as string) === "admin"
      ? "Super Admin Portal"
      : "Moderator Portal";

  return (
    <aside
      className={cn(
        "w-64 shrink-0 bg-white border-r border-slate-200 flex flex-col h-screen sticky top-0 z-30 shadow-2xs",
        className
      )}
    >
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-100 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-[#D41367] text-white flex items-center justify-center font-bold text-base shadow-xs shrink-0">
          R
        </div>
        <div className="min-w-0">
          <Link href="/" className="text-sm font-bold text-slate-900 block truncate hover:text-[#D41367] transition-colors">
            Rotaract Network
          </Link>
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            {portalSubtitle}
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-3.5 space-y-1.5 overflow-y-auto">
        <div className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          Workspace Navigation
        </div>

        {links.map((link) => {
          const Icon = iconMap[link.icon] || LayoutDashboard;

          // Match exact route for base paths, prefix matching for nested paths
          const isBasePortalRoute = ["/", "/dashboard", "/admin", "/moderator"].includes(link.href);
          const isActive = isBasePortalRoute
            ? pathname === link.href
            : pathname === link.href || pathname.startsWith(link.href + "/");

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all group",
                isActive
                  ? "bg-[#D41367] text-white shadow-xs"
                  : "text-slate-600 hover:bg-pink-50 hover:text-[#D41367]"
              )}
            >
              <Icon
                className={cn(
                  "w-4 h-4 shrink-0 transition-transform group-hover:scale-105",
                  isActive ? "text-white" : "text-slate-400 group-hover:text-[#D41367]"
                )}
              />
              <span className="truncate">{link.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer & User Profile Card */}
      <div className="p-3.5 border-t border-slate-100 space-y-2 bg-slate-50/50">
        {/* User Card */}
        <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1">
          <p className="text-xs font-bold text-slate-900 truncate">
            {userName}
          </p>
          {userRole && (
            <p className="text-[11px] text-slate-500 font-medium truncate">
              {userRole}
            </p>
          )}
          {districtInfo && (
            <p className="text-[10px] text-[#D41367] font-semibold pt-1 border-t border-slate-100 truncate">
              {districtInfo}
            </p>
          )}
        </div>

        {/* Quick Footer Links */}
        <div className="flex items-center justify-between gap-1 px-1">
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-slate-500 hover:text-[#D41367] hover:bg-pink-50 rounded-lg px-2 h-7.5"
            asChild
          >
            <Link href="/how-it-works#faq">
              <HelpCircle className="w-3.5 h-3.5 mr-1" />
              <span>Support</span>
            </Link>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg px-2 h-7.5"
            asChild
          >
            <Link href="/auth/login">
              <LogOut className="w-3.5 h-3.5 mr-1" />
              <span>Logout</span>
            </Link>
          </Button>
        </div>
      </div>
    </aside>
  );
}
