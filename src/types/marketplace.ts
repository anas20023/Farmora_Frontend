/**
 * Types aligned with Prisma Schema for Farmora Marketplace
 * Models: ProductListing, ProductImage, CropCycle, CropType, Farm, Review
 * Enums: ListingType, ListingStatus, CropCategory, GrowthStage
 */

export type ListingType = "IN_STOCK" | "PRE_ORDER";

export type ListingStatus = "ACTIVE" | "PENDING" | "SOLD_OUT" | "ARCHIVED";

export type CropCategory =
  | "CEREAL"
  | "PULSE"
  | "VEGETABLE"
  | "FRUIT"
  | "OILSEED"
  | "SPICE"
  | "TUBER";

export type GrowthStage =
  | "SEEDLING"
  | "VEGETATIVE"
  | "FLOWERING"
  | "GRAIN_FILLING"
  | "FRUIT_MATURATION"
  | "READY_FOR_HARVEST"
  | "HARVESTED";

export interface CropType {
  id: string;
  name: string;
  botanicalName?: string;
  category: CropCategory;
  standardUnit: string;
  description?: string;
  shelfLifeDays?: number;
  optimalStorageTemp?: string;
}

export interface CropCycle {
  id: string;
  cycleCode: string;
  cropTypeId: string;
  cropType?: CropType;
  farmId: string;
  stage: GrowthStage;
  stageName: string;
  plantingDate: string;
  estimatedHarvestDate: string;
  actualHarvestDate?: string;
  currentSoilMoisture?: string;
  currentCanopyTemp?: string;
  currentPh?: string;
  healthIndex?: number; // 0 - 100
  nitrogenLevel?: string;
}

export interface Farm {
  id: string;
  name: string;
  ownerName: string;
  location: string;
  district: string;
  division: string;
  acreage: string;
  verified: boolean;
  organicCertified: boolean;
  iotEnabled: boolean;
  rating: number;
  reviewsCount: number;
  avatarUrl?: string;
  coverImage?: string;
  soilType?: string;
  phone?: string;
  joinYear?: number;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
  order: number;
}

export interface Review {
  id: string;
  userId: string;
  authorName: string;
  authorRole: "COMMERCIAL_BUYER" | "WHOLESALER" | "RETAIL_CONSUMER" | "AGRI_EXPORTER";
  authorLocation?: string;
  rating: number; // 1-5
  comment: string;
  createdAt: string;
  verifiedPurchase: boolean;
}

export interface ProductListing {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription?: string;
  cropTypeId: string;
  cropType: CropType;
  cropCycleId?: string;
  cropCycle?: CropCycle;
  farmId: string;
  farm: Farm;
  images: ProductImage[];
  pricePerUnit: number;
  currency: string; // "৳"
  unit: string; // "/kg", "/piece", "/crate", "/quintal"
  availableQuantity: number;
  totalQuantity: number;
  minOrderQuantity: number;
  listingType: ListingType;
  listingStatus: ListingStatus;
  cropCategory: CropCategory;
  harvestDate: string;
  estimatedDeliveryWindow: string;
  escrowSecured: boolean;
  organicCertified?: boolean;
  featured?: boolean;
  averageRating: number;
  totalReviews: number;
  reviews: Review[];
  tags: string[];
  specs?: {
    grade?: string;
    packaging?: string;
    originPlot?: string;
    brixSugarLevel?: string;
    moistureContent?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export type SortOption =
  | "POPULARITY"
  | "PRICE_ASC"
  | "PRICE_DESC"
  | "RATING_DESC"
  | "HARVEST_DATE_ASC"
  | "NEWEST";

export interface MarketplaceFilterState {
  search: string;
  category: CropCategory | "ALL";
  listingType: ListingType | "ALL";
  minPrice: number;
  maxPrice: number;
  sortBy: SortOption;
  onlyOrganic: boolean;
  onlyIotVerified: boolean;
  page: number;
  pageSize: number;
}

export interface CartItem {
  listing: ProductListing;
  quantity: number;
  totalPrice: number;
}
