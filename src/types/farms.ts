export interface FarmBadge {
  label: string;
  iconName: "organic" | "heritage" | "iot";
}

export interface FarmRating {
  score: number;
  reviewsCount: number;
}

export interface FarmBatchItem {
  id: string;
  cropName: string;
  harvestWindow: string;
  quantityAvailable: string;
  unitPrice: string;
}

export interface FarmSensorTelemetry {
  sensorCount: number;
  statusText: string; // e.g. "6 Sensors Online"
  lastUpdated?: string;
  soilMoisture?: string;
  soilPh?: string;
  canopyTemp?: string;
}

export interface VerifiedFarmItem {
  id: string;
  name: string;
  location: string;
  district: string;
  acreage: string; // e.g. "12 Acres"
  badge: FarmBadge;
  rating: FarmRating;
  soilComposition: string; // e.g. "Rich Alluvial Loam (pH 6.6)"
  activeHarvests: string; // e.g. "Tomatoes, Broccoli, Cabbage"
  telemetry: FarmSensorTelemetry;
  image: string;
  farmerName?: string;
  inspectionDate?: string;
  description?: string;
  batches?: FarmBatchItem[];
}

export interface FeaturedFarmsSectionData {
  overline: string;
  title: string;
  description: string;
  viewAllLink: {
    label: string;
    href: string;
  };
  farms: VerifiedFarmItem[];
}
