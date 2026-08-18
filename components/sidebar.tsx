"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Building2, Store, ShieldCheck, Settings,
  FolderTree, Users, UserCog, ClipboardList, BarChart3,
  HelpCircle, LogOut, Sparkles, Edit3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { UserRole } from "@/lib/types";

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard, Building2, Store, ShieldCheck, Settings,
  FolderTree, Users, UserCog, ClipboardList, BarChart3, Edit3,
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

  return (
    <aside
      className={cn(
        "w-56 shrink-0 bg-card border-r border-border flex flex-col h-screen sticky top-0",
        className
      )}
    >
      {/* Header */}
      <div className="p-5 border-b border-border">
        <Link href="/" className="text-lg font-bold text-crimson">
          Rotaract Network
        </Link>
        <div className="mt-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-crimson to-crimson-light flex items-center justify-center text-white text-xs font-bold">
            {userName.charAt(0)}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-crimson truncate">
              {userName}
            </p>
            {userRole && (
              <p className="text-xs text-muted-foreground truncate">
                {userRole}
              </p>
            )}
          </div>
        </div>
        {districtInfo && (
          <p className="text-xs text-crimson font-medium mt-2">{districtInfo}</p>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {links.map((link) => {
          const Icon = iconMap[link.icon] || LayoutDashboard;

          // Fixed active route matching: Base portal roots (/dashboard, /admin, /moderator) must match exact route
          const isBasePortalRoute = ["/", "/dashboard", "/admin", "/moderator"].includes(link.href);
          const isActive = isBasePortalRoute
            ? pathname === link.href
            : pathname === link.href || pathname.startsWith(link.href + "/");

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap",
                isActive
                  ? "bg-crimson text-white shadow-sm font-bold"
                  : "text-muted-foreground hover:bg-accent hover:text-crimson"
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-border space-y-1">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-sm text-muted-foreground hover:text-crimson px-4"
        >
          <HelpCircle className="w-4 h-4" />
          Support
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-sm text-muted-foreground hover:text-crimson px-4"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
        <Button className="w-full bg-crimson hover:bg-crimson-dark text-white rounded-xl mt-2 gap-2">
          <Sparkles className="w-4 h-4" />
          Upgrade Profile
        </Button>
      </div>
    </aside>
  );
}
