import type { ReactNode } from "react";
import DashboardSidebar from "@/components/dashboard/common/DashboardSidebar";
import { dashboardConfigs, type DashboardRole } from "@/config/dashboard";

type DashboardShellProps = {
  role: DashboardRole;
  children: ReactNode;
};

export default function DashboardShell({ role, children }: DashboardShellProps) {
  const config = dashboardConfigs[role];

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <DashboardSidebar config={config} />
      <div className="min-w-0 flex-1 pt-14 md:pt-0">
        <header className="flex h-16 items-center border-b border-border bg-surface px-4 sm:px-6">
          <p className="text-sm font-semibold">{config.label} Dashboard</p>
        </header>
        <section className="mx-auto w-full max-w-7xl p-4 sm:p-6 lg:p-8">
          {children}
        </section>
      </div>
    </div>
  );
}
