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
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { UserRole } from "@/lib/types";
import { useAuth } from "@/components/auth-provider";

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

import { Skeleton } from "@/components/ui/skeleton";

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
  userName,
  userRole,
  districtInfo,
  className,
}: SidebarProps) {
  const pathname = usePathname();
  const { profile, isLoading, signOut } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const formattedRole = (r?: string) => {
    if (!r) return "";
    if (r === "super_admin") return "Super Admin";
    if (r === "moderator") return "District Moderator";
    if (r === "owner") return "Business Owner";
    return r.replace("_", " ").toUpperCase();
  };

  const displayName = profile?.full_name || userName;
  const displayRole = profile?.role ? formattedRole(profile.role) : userRole ? formattedRole(userRole) : formattedRole(role);

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
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#D41367] to-pink-500 flex items-center justify-center text-white font-bold shadow-xs">
            R
          </div>
          <div>
            <div className="font-extrabold text-sm tracking-tight text-slate-900 leading-none">
              Rotaract Loop
            </div>
            <div className="text-[10px] text-slate-500 font-medium">
              {portalSubtitle}
            </div>
          </div>
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {links.map((link) => {
          const Icon = iconMap[link.icon] || LayoutDashboard;
          const isExactRoot =
            link.href === "/admin-dashboard" ||
            link.href === "/business-dashboard" ||
            link.href === "/moderator-dashboard" ||
            link.href === "/super-admin" ||
            link.href === "/moderator";

          const isActive = isExactRoot
            ? pathname === link.href
            : pathname === link.href || pathname.startsWith(`${link.href}/`);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group",
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
          {!mounted || (isLoading && !displayName) ? (
            <div className="space-y-1.5 py-0.5">
              <Skeleton className="h-3.5 w-28 rounded-md" />
              <Skeleton className="h-2.5 w-20 rounded-md" />
            </div>
          ) : (
            <>
              <p className="text-xs font-bold text-slate-900 truncate">
                {displayName || "Authenticated Member"}
              </p>
              {displayRole && (
                <p className="text-[11px] text-slate-500 font-medium truncate capitalize">
                  {displayRole}
                </p>
              )}
              {districtInfo && (
                <p className="text-[10px] text-[#D41367] font-semibold pt-1 border-t border-slate-100 truncate">
                  {districtInfo}
                </p>
              )}
            </>
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
            onClick={() => signOut()}
            className="text-xs text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg px-2 h-7.5 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5 mr-1" />
            <span>Logout</span>
          </Button>
        </div>
      </div>
    </aside>
  );
}
