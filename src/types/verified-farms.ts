export enum VerificationStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export enum FarmStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  UNDER_REVIEW = "UNDER_REVIEW",
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  image: string;
  role: "farmer" | "buyer" | "admin" | "user";
  createdAt: string;
}

export interface CultivationActivity {
  id: string;
  title: string;
  stage:
    | "Land Preparation"
    | "Seed Planting"
    | "Irrigation"
    | "Fertilizer Application"
    | "Crop Monitoring"
    | "Harvesting";
  date: string;
  status: "Completed" | "In Progress" | "Upcoming";
  description: string;
  method?: string;
}

export interface FarmPlot {
  id: string;
  plotNumber: string;
  plotName: string;
  area: string;
  soilType: string;
  currentCrop: string;
  cropCategory: "Rice & Grains" | "Vegetables" | "Fruits" | "Legumes" | "Cash Crops";
  plantingDate: string;
  expectedHarvestDate: string;
  cultivationStatus:
    | "Land Preparation"
    | "Vegetative Growth"
    | "Flowering & Fruiting"
    | "Harvest Ready"
    | "Active Maturation";
  progressPercent: number;
  healthScore: string;
  irrigationType: string;
  recentActivities: CultivationActivity[];
}

export interface FarmerProfile {
  id: string;
  userId: string;
  user: User;
  farmerName: string;
  avatar: string;
  bio: string;
  verificationStatus: VerificationStatus;
  verifiedDate: string;
  experienceYears: number;
  phone: string;
  email: string;
  whatsapp?: string;
  nationalIdVerified: boolean;
  division: string;
  district: string;
  upazila: string;
  rating: {
    score: number;
    reviewsCount: number;
  };
  totalHarvestsDelivered: number;
  accreditationBadge: string;
}

export interface Farm {
  id: string;
  farmerId: string;
  farmer: FarmerProfile;
  name: string;
  slug: string;
  coverImage: string;
  status: FarmStatus;
  division: string;
  district: string;
  upazila: string;
  locationName: string;
  fullAddress: string;
  totalArea: number;
  areaUnit: "Acres" | "Bighas" | "Hectares";
  soilType: string;
  soilPh: string;
  activeCropCycles: number;
  activePlotsCount: number;
  activeCrops: string[];
  cropCategories: ("Rice & Grains" | "Vegetables" | "Fruits" | "Legumes" | "Cash Crops")[];
  cultivationSummary: string;
  farmingPractices: string[];
  plots: FarmPlot[];
  inspectionRecord: {
    auditor: string;
    lastInspected: string;
    certificateNo: string;
    waterSourcePurity: string;
  };
}

export interface VerifiedFarmsDirectoryStats {
  totalFarms: number;
  registeredFarmers: number;
  activeCropPlots: number;
  monitoredAcreage: string;
  avgTrustScore: number;
}

export interface VerifiedFarmsDirectoryData {
  stats: VerifiedFarmsDirectoryStats;
  farms: Farm[];
}
