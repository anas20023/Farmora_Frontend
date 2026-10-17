export interface AgriAiFeatureItem {
  id: string;
  icon: "droplet" | "trending-up";
  title: string;
  description: string;
}

export interface TelemetryMetricItem {
  id: string;
  label: string;
  icon: "droplet" | "thermometer" | "wind";
  value: string;
  statusBadge: {
    label: string;
    variant: "success" | "warning" | "info" | "default";
  };
  subtext: string;
  progressPercent: number;
  tooltipInfo?: string;
}

export interface AgriAiStationData {
  stationId: string;
  shortName: string;
  location: string;
  firmwareVersion: string;
  solarBatteryPercent: number;
  isLive: boolean;
  statusLabel: string;
  metrics: TelemetryMetricItem[];
  advisory: {
    badge: string;
    confidence: string;
    message: string;
    timestamp?: string;
  };
  priceForecast: {
    title: string;
    saturationIndex: string;
    currency: string;
    currentSpot: number;
    predictedMin: number;
    predictedMax: number;
    unit: string;
    trendDirection: "up" | "down" | "stable";
  };
}

export interface AgriAiSectionData {
  badge: string;
  heading: {
    line1: string;
    line2: string;
  };
  description: string;
  features: AgriAiFeatureItem[];
  station: AgriAiStationData;
  alternativeStations?: AgriAiStationData[];
}
