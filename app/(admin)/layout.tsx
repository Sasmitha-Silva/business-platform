import type { Metadata } from "next";
import { DashboardLayout } from "@/components/dashboard-layout";
import { ADMIN_SIDEBAR_LINKS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Rotaract Business Network district management and administrative portal.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout
      role="super_admin"
      links={ADMIN_SIDEBAR_LINKS}
      userName="Rtn. Kanishka De Silva"
      userRole="Super Admin"
    >
      {children}
    </DashboardLayout>
  );
}
