import { DashboardLayout } from "@/components/dashboard-layout";
import { MODERATOR_SIDEBAR_LINKS } from "@/lib/constants";

export default function ModeratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout
      role="moderator"
      links={MODERATOR_SIDEBAR_LINKS}
      userName="Ptr. Dilshan Wickremasinghe"
      userRole="District Moderator"
      districtInfo="District 3220 HQ"
    >
      {children}
    </DashboardLayout>
  );
}
