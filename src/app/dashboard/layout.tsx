import DashboardShell from "@/components/dashboard/common/DashboardShell";

export default function DashboardLayout(props: LayoutProps<"/dashboard">) {
  return <DashboardShell>{props.children}</DashboardShell>;
}
