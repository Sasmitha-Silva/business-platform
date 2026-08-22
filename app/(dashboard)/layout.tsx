import type { Metadata } from "next";
import { DashboardLayout } from "@/components/dashboard-layout";
import { OWNER_SIDEBAR_LINKS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Business Dashboard",
  description: "Manage your Rotaract business profile, verification, and inquiries.",
};

export default function OwnerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout
      role="owner"
      links={OWNER_SIDEBAR_LINKS}
      userName="Rtr. Sarah Perera"
      userRole="Verified Tier: Gold"
    >
      {children}
    </DashboardLayout>
  );
}
