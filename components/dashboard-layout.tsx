import { Sidebar } from "@/components/sidebar";
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
  return (
    <div className="flex min-h-screen bg-slate-50/50">
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
  );
}
