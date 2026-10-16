import DashboardPagePlaceholder from "@/components/dashboard/common/DashboardPagePlaceholder";
import DashboardShell from "@/components/dashboard/common/DashboardShell";

export default function AdminDashboardPage() {
  return (
    <DashboardShell role="admin">
      <DashboardPagePlaceholder
        title="Admin Dashboard"
        description="Add administration tools, reporting, and moderation here."
      />
    </DashboardShell>
  );
}
