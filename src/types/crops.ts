export interface CropGrowthStage {
  label: string;
  dotColor: string; // Tailwind color class e.g. "bg-amber-500"
  textColor?: string;
}

export interface CropItem {
  id: string;
  title: string;
  location: string;
  stage: CropGrowthStage;
  price: number;
  unit: "/kg" | "/piece" | string;
  currency: string; // e.g. "৳"
  harvestDate: string; // e.g. "Harvest: Nov 28"
  preorderedAmount: string; // e.g. "1,420 kg" or "2,150 pcs"
  progressPercent: number; // e.g. 71
  countdownDays: number;
  countdownText: string; // e.g. "Harvest countdown: 6 days remaining"
  image: string;
  season: string; // e.g. "Rabi / Winter 2025"
  farmName?: string;
  totalAllocation?: string;
  escrowGuaranteed?: boolean;
}

export interface SeasonOption {
  id: string;
  label: string;
  isActive?: boolean;
}

export interface FeaturedCropsSectionData {
  overline: string;
  title: string;
  description: string;
  filterLabel: string;
  seasons: SeasonOption[];
  currentSeason: string;
  crops: CropItem[];
}
