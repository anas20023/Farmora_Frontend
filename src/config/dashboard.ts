export type DashboardRole = "admin" | "buyer" | "farmer";

export type DashboardNavigationItem = {
  label: string;
  href: string;
};

export type DashboardConfig = {
  label: string;
  navigation: DashboardNavigationItem[];
};

export const dashboardConfigs: Record<DashboardRole, DashboardConfig> = {
  admin: {
    label: "Admin",
    navigation: [
      { label: "Overview", href: "/dashboard/admin" },
      { label: "Users", href: "/dashboard/admin/users" },
      { label: "Analytics", href: "/dashboard/admin/analytics" },
    ],
  },
  buyer: {
    label: "Buyer",
    navigation: [
      { label: "Overview", href: "/dashboard/buyer" },
      { label: "Orders", href: "/dashboard/buyer/orders" },
      { label: "Saved items", href: "/dashboard/buyer/saved" },
    ],
  },
  farmer: {
    label: "Farmer",
    navigation: [
      { label: "Overview", href: "/dashboard/farmer" },
      { label: "Farms", href: "/dashboard/farmer/farms" },
      { label: "Crops", href: "/dashboard/farmer/crops" },
    ],
  },
};
