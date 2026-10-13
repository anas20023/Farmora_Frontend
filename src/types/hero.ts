export interface TelemetryPillData {
  dotActive: boolean;
  text: string;
}

export interface PipelineBadgeData {
  text: string;
  iconName?: "leaf" | "sprout";
}

export interface HeroAction {
  label: string;
  href: string;
  badge?: string;
  variant: "primary" | "secondary";
  ariaLabel?: string;
}

export interface HeroStatItem {
  id: string;
  value: string;
  label: string;
}

export interface PlotOverlayData {
  title: string;
  moisture: string;
  status: string;
}

export interface AgriAiAlertData {
  badge: string;
  title: string;
  subtitle: string;
}

export interface BatchReservationData {
  pricePerKg: number;
  preOrdersCount: number;
  clusterName: string;
  batchNumber: string;
  currencySymbol: string;
}

export interface KpiMetricItem {
  id: string;
  icon: "shield" | "payout" | "tractor" | "timer" | "iot";
  secondaryBadge?: {
    type: "trend" | "text" | "dot" | "leaf";
    text?: string;
  };
  value: string;
  label: string;
}

export interface HeroData {
  telemetryPill: TelemetryPillData;
  pipelineBadge: PipelineBadgeData;
  headline: {
    line1: string;
    line2: string;
  };
  description: string;
  primaryAction: HeroAction;
  secondaryAction: HeroAction;
  quickStats: HeroStatItem[];
  preview: {
    imageSrc: string;
    imageAlt: string;
    plot: PlotOverlayData;
    alert: AgriAiAlertData;
    reservation: BatchReservationData;
  };
  kpiMetrics: KpiMetricItem[];
}
