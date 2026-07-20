import { Sidebar } from "@/components/sidebar";
import { Footer } from "@/components/footer";
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
    <div className="flex min-h-screen">
      <Sidebar
        role={role}
        links={links}
        userName={userName}
        userRole={userRole}
        districtInfo={districtInfo}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
