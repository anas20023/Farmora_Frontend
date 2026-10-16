import type { ReactNode } from "react";
import DashboardSidebar from "@/components/dashboard/common/DashboardSidebar";
import { dashboardConfigs, type DashboardRole } from "@/config/dashboard";
import { Avatar, Button } from "@heroui/react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { LogOut } from "lucide-react";
import { logoutAction } from "@/actions/auth";

type DashboardShellProps = {
  role: DashboardRole;
  children: ReactNode;
};

export default async function DashboardShell({ role, children }: DashboardShellProps) {
  const config = dashboardConfigs[role];
  const session = await auth.api.getSession({
    headers: await headers()
  })
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <DashboardSidebar config={config} />
      <div className="min-w-0 flex-1 pt-14 md:pt-0">
        <header className="flex h-16 justify-between items-center border-b border-border bg-surface px-4 sm:px-6">
          <div>
            <p className="text-sm font-semibold">{config.label} Dashboard</p>
          </div>
          <div className="flex flex-row justify-between items-center gap-4">
            <Avatar className="rounded-full">
              <Avatar.Image alt={session?.user.name || "John Doe"} src={session?.user.image || ""} />
              <Avatar.Fallback>{session?.user.name.toUpperCase().slice(0, 2) || "U"}</Avatar.Fallback>
            </Avatar>
            <form action={logoutAction}>
              <Button
                id="logout"
                type="submit"
                variant="danger-soft"
              >
                <LogOut className="size-4" />
                Log out
              </Button>
            </form>
          </div>

        </header>
        <section className="mx-auto w-full max-w-7xl p-4 sm:p-6 lg:p-8">
          {children}
        </section>
      </div>
    </div>
  );
}
