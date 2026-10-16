import DashboardPagePlaceholder from "@/components/dashboard/common/DashboardPagePlaceholder";
import DashboardShell from "@/components/dashboard/common/DashboardShell";

export default function BuyerDashboardPage() {
  return (
    <DashboardShell role="buyer">
      <DashboardPagePlaceholder
        title="Buyer Dashboard"
        description="Add orders, saved products, and marketplace tools here."
      />
    </DashboardShell>
  );
}
