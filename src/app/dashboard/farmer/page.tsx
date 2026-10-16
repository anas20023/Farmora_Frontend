import DashboardPagePlaceholder from "@/components/dashboard/common/DashboardPagePlaceholder";
import DashboardShell from "@/components/dashboard/common/DashboardShell";

export default function FarmerDashboardPage() {
  return (
    <DashboardShell role="farmer">
      <DashboardPagePlaceholder
        title="Farmer Dashboard"
        description="Add farm, crop, and production management tools here."
      />
    </DashboardShell>
  );
}
