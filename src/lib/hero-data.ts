import type { HeroData } from "@/types/hero";

/**
 * Server-side data provider for the Farmora Hero section.
 * Supplies verbatim hero propositions, live IoT node telemetry stats,
 * batch pre-order dummy states, and ecosystem KPI metrics.
 */
export async function getHeroData(): Promise<HeroData> {
  return {
    telemetryPill: {
      dotActive: true,
      text: "240 IoT Sensor Nodes Telemetry Active • Rajshahi • Bogura • Narayanganj",
    },
    pipelineBadge: {
      text: "Direct Farm-to-Enterprise Pipeline",
      iconName: "leaf",
    },
    headline: {
      line1: "Fresh from farms,",
      line2: "powered by intelligence.",
    },
    description:
      "Connect directly with verified local farmers. Track soil telemetry, pre-order upcoming harvests, and experience transparent agriculture backed by smart IoT & AgriAI.",
    primaryAction: {
      label: "Browse Marketplace",
      href: "#marketplace",
      variant: "primary",
      ariaLabel: "Browse the Farmora smart agricultural marketplace",
    },
    secondaryAction: {
      label: "Join as Farmer",
      badge: "Free IoT kit",
      href: "/register",
      variant: "secondary",
      ariaLabel: "Join Farmora as a producer and claim a free IoT kit",
    },
    quickStats: [
      {
        id: "markup",
        value: "0%",
        label: "Middlemen markup",
      },
      {
        id: "delivery",
        value: "24h",
        label: "Harvest-to-gate delivery",
      },
      {
        id: "verified",
        value: "100%",
        label: "Soil sensor verified",
      },
    ],
    preview: {
      imageSrc: "/images/hero-farm-iot.jpg",
      imageAlt: "Solar-powered IoT field telemetry probe in vegetable farm rows",
      plot: {
        title: "Plot B-4 • Organic Tomatoes",
        moisture: "61%",
        status: "Optimal",
      },
      alert: {
        badge: "AGRIAI ALERT",
        title: "Harvest in 6 Days",
        subtitle: "Sugar Brix index: 4.8",
      },
      reservation: {
        currencySymbol: "৳",
        pricePerKg: 65,
        preOrdersCount: 142,
        clusterName: "Bogura Green Valley Cluster",
        batchNumber: "Batch #TM-89",
      },
    },
    kpiMetrics: [
      {
        id: "kpi-farmers",
        icon: "shield",
        secondaryBadge: { type: "trend" },
        value: "1,240+",
        label: "Verified Farmers",
      },
      {
        id: "kpi-payouts",
        icon: "payout",
        secondaryBadge: { type: "text", text: "+18% MoM" },
        value: "৳ 4.8M",
        label: "Direct Farmer Payouts",
      },
      {
        id: "kpi-harvest",
        icon: "tractor",
        secondaryBadge: { type: "leaf" },
        value: "18,500+",
        label: "Metric Tons Harvested",
      },
      {
        id: "kpi-freshness",
        icon: "timer",
        secondaryBadge: { type: "text", text: "Peak QC" },
        value: "99.4%",
        label: "Freshness Guarantee",
      },
      {
        id: "kpi-iot",
        icon: "iot",
        secondaryBadge: { type: "dot" },
        value: "100%",
        label: "Transparent Soil & IoT Data",
      },
    ],
  };
}
