"use client";

import { useState } from "react";
import {
  InputGroup,
  Select,
  ListBox,
  Tabs,
  Slider,
  Button,
  Chip,
} from "@heroui/react";
import {
  Search,
  X,
  SlidersHorizontal,
  ChevronDown,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Cpu,
  Layers,
  ArrowUpDown,
} from "lucide-react";
import type {
  CropCategory,
  ListingType,
  SortOption,
} from "@/types/marketplace";
import { CATEGORY_LABELS } from "@/lib/marketplace-data";

interface CategoryCountItem {
  id: CropCategory | "ALL";
  label: string;
  count: number;
}

interface MarketplaceFiltersProps {
  search: string;
  onSearchChange: (val: string) => void;
  category: CropCategory | "ALL";
  onCategoryChange: (val: CropCategory | "ALL") => void;
  listingType: ListingType | "ALL";
  onListingTypeChange: (val: ListingType | "ALL") => void;
  priceRange: [number, number];
  onPriceRangeChange: (val: [number, number]) => void;
  minPossiblePrice: number;
  maxPossiblePrice: number;
  sortBy: SortOption;
  onSortChange: (val: SortOption) => void;
  onlyOrganic: boolean;
  onOnlyOrganicChange: (val: boolean) => void;
  onlyIotVerified: boolean;
  onOnlyIotVerifiedChange: (val: boolean) => void;
  totalFilteredCount: number;
  totalCount: number;
  categoryCounts: CategoryCountItem[];
  typeCounts: { all: number; inStock: number; preOrder: number };
  onResetFilters: () => void;
  hasActiveFilters: boolean;
}

export default function MarketplaceFilters({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  listingType,
  onListingTypeChange,
  priceRange,
  onPriceRangeChange,
  minPossiblePrice,
  maxPossiblePrice,
  sortBy,
  onSortChange,
  onlyOrganic,
  onOnlyOrganicChange,
  onlyIotVerified,
  onOnlyIotVerifiedChange,
  totalFilteredCount,
  totalCount,
  categoryCounts,
  typeCounts,
  onResetFilters,
  hasActiveFilters,
}: MarketplaceFiltersProps) {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  return (
    <div className="space-y-4">
      {/* Primary Toolbar: Search + Quick Tabs + Mobile Filter Trigger */}
      <div className="rounded-lg border border-border bg-surface p-3 sm:p-4 shadow-2xs">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          {/* Search Input with Hero UI InputGroup */}
          <div className="w-full lg:max-w-md">
            <InputGroup className="w-full border border-border rounded bg-surface-secondary/40 focus-within:border-accent focus-within:ring-1 focus-within:ring-accent transition-all">
              <InputGroup.Prefix className="pl-3 text-muted">
                <Search className="size-4" />
              </InputGroup.Prefix>
              <InputGroup.Input
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search by crop, variety, farm or district..."
                className="w-full bg-transparent px-2.5 py-2 text-sm text-foreground placeholder:text-muted focus:outline-none"
                aria-label="Search crops and farms"
              />
              {search && (
                <InputGroup.Suffix className="pr-2.5">
                  <button
                    type="button"
                    onClick={() => onSearchChange("")}
                    className="rounded p-0.5 text-muted hover:text-foreground"
                    aria-label="Clear search query"
                  >
                    <X className="size-3.5" />
                  </button>
                </InputGroup.Suffix>
              )}
            </InputGroup>
          </div>

          {/* Listing Type Tabs (Hero UI Tabs) */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="w-full sm:w-auto">
              <Tabs
                aria-label="Filter by offer availability"
                selectedKey={listingType}
                onSelectionChange={(key) =>
                  onListingTypeChange(String(key) as ListingType | "ALL")
                }
                className="w-full"
              >
                <Tabs.ListContainer className="rounded-md border border-border bg-surface-secondary/50 p-1">
                  <Tabs.List className="flex items-center gap-1">
                    <Tabs.Tab
                      id="ALL"
                      className="flex cursor-pointer items-center gap-1.5 rounded px-3 py-1.5 text-xs font-semibold text-muted transition-colors hover:text-foreground data-[selected=true]:bg-surface data-[selected=true]:text-accent data-[selected=true]:shadow-2xs"
                    >
                      <span>All Offers</span>
                      <span className="rounded-full bg-surface-secondary px-1.5 py-0.2 text-[10px] text-foreground">
                        {typeCounts.all}
                      </span>
                    </Tabs.Tab>
                    <Tabs.Tab
                      id="IN_STOCK"
                      className="flex cursor-pointer items-center gap-1.5 rounded px-3 py-1.5 text-xs font-semibold text-muted transition-colors hover:text-foreground data-[selected=true]:bg-surface data-[selected=true]:text-emerald-600 dark:data-[selected=true]:text-emerald-400 data-[selected=true]:shadow-2xs"
                    >
                      <span className="size-1.5 rounded-full bg-emerald-500" />
                      <span>In Stock</span>
                      <span className="rounded-full bg-surface-secondary px-1.5 py-0.2 text-[10px] text-foreground">
                        {typeCounts.inStock}
                      </span>
                    </Tabs.Tab>
                    <Tabs.Tab
                      id="PRE_ORDER"
                      className="flex cursor-pointer items-center gap-1.5 rounded px-3 py-1.5 text-xs font-semibold text-muted transition-colors hover:text-foreground data-[selected=true]:bg-surface data-[selected=true]:text-amber-600 dark:data-[selected=true]:text-amber-400 data-[selected=true]:shadow-2xs"
                    >
                      <Sparkles className="size-3 text-amber-500" />
                      <span>Pre-Order</span>
                      <span className="rounded-full bg-surface-secondary px-1.5 py-0.2 text-[10px] text-foreground">
                        {typeCounts.preOrder}
                      </span>
                    </Tabs.Tab>
                  </Tabs.List>
                </Tabs.ListContainer>
              </Tabs>
            </div>

            {/* Mobile Filter Toggle Button */}
            <div className="flex sm:hidden w-full items-center justify-between pt-2 border-t border-border">
              <Button
                variant="outline"
                size="sm"
                onPress={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
                className="w-full flex items-center justify-center gap-2"
              >
                <SlidersHorizontal className="size-3.5 text-accent" />
                <span>Filters & Price Range</span>
                {hasActiveFilters && (
                  <span className="size-2 rounded-full bg-accent" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Secondary Bar on Desktop: Category Dropdown + Price Slider + Quick Chips + Sorting */}
        <div className={`mt-4 pt-4 border-t border-border/70 ${isMobileFiltersOpen ? "block" : "hidden sm:block"}`}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Category Dropdown (Hero UI Select & ListBox) */}
            <div className="md:col-span-4 lg:col-span-3">
              <label className="block text-[11px] font-semibold text-muted uppercase tracking-wider mb-1.5">
                Crop Category
              </label>
              <Select
                aria-label="Filter by Crop Category"
                selectedKey={category}
                onSelectionChange={(key) =>
                  onCategoryChange(String(key) as CropCategory | "ALL")
                }
                className="w-full"
              >
                <Select.Trigger className="flex h-10 w-full items-center justify-between rounded border border-border bg-surface px-3 text-sm text-foreground hover:bg-surface-secondary/40 focus:outline-none focus:ring-1 focus:ring-accent transition-colors">
                  <div className="flex items-center gap-2 truncate">
                    <Layers className="size-3.5 text-accent shrink-0" />
                    <Select.Value className="truncate font-medium">
                      {CATEGORY_LABELS[category]}
                    </Select.Value>
                  </div>
                  <Select.Indicator>
                    <ChevronDown className="size-4 text-muted shrink-0" />
                  </Select.Indicator>
                </Select.Trigger>
                <Select.Popover className="min-w-[15rem] rounded-md border border-border bg-surface p-1 shadow-xl z-50 animate-in fade-in zoom-in-95 duration-100">
                  <ListBox className="space-y-0.5 outline-none max-h-64 overflow-y-auto">
                    {categoryCounts.map((item) => (
                      <ListBox.Item
                        key={item.id}
                        id={item.id}
                        className="flex cursor-pointer items-center justify-between rounded px-3 py-2 text-xs sm:text-sm text-foreground hover:bg-surface-secondary outline-none data-[selected=true]:bg-accent/15 data-[selected=true]:text-accent font-medium transition-colors"
                      >
                        <span>{item.label}</span>
                        <span className="text-xs text-muted font-normal">
                          {item.count}
                        </span>
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

            {/* Price Range Slider (Hero UI Slider) */}
            <div className="md:col-span-5 lg:col-span-4">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-[11px] font-semibold text-muted uppercase tracking-wider">
                  Price Limit (BDT)
                </span>
                <span className="font-mono text-xs font-bold text-foreground">
                  ৳{priceRange[0]} — ৳{priceRange[1]}
                </span>
              </div>
              <div className="px-1 py-1">
                <Slider
                  aria-label="Price range filter"
                  value={priceRange}
                  onChange={(val) => {
                    if (Array.isArray(val) && val.length === 2) {
                      onPriceRangeChange([val[0], val[1]]);
                    }
                  }}
                  minValue={minPossiblePrice}
                  maxValue={maxPossiblePrice}
                  step={5}
                  className="w-full"
                >
                  <Slider.Track className="relative h-2 w-full rounded-full bg-surface-secondary cursor-pointer">
                    <Slider.Fill className="absolute h-full rounded-full bg-accent" />
                    <Slider.Thumb
                      index={0}
                      aria-label="Minimum price"
                      className="size-4 rounded-full border-2 border-surface bg-accent shadow-sm focus:outline-none focus:ring-2 focus:ring-accent cursor-grab active:cursor-grabbing transition-transform"
                    />
                    <Slider.Thumb
                      index={1}
                      aria-label="Maximum price"
                      className="size-4 rounded-full border-2 border-surface bg-accent shadow-sm focus:outline-none focus:ring-2 focus:ring-accent cursor-grab active:cursor-grabbing transition-transform"
                    />
                  </Slider.Track>
                </Slider>
              </div>
              <div className="flex justify-between text-[10px] text-muted font-mono mt-1">
                <span>৳{minPossiblePrice}</span>
                <span>৳{maxPossiblePrice}</span>
              </div>
            </div>

            {/* Quick Verification & Quality Toggles */}
            <div className="md:col-span-3 lg:col-span-3 flex flex-wrap items-center gap-2">
              <label className="w-full block text-[11px] font-semibold text-muted uppercase tracking-wider mb-0.5">
                Quality Attributes
              </label>
              <button
                type="button"
                onClick={() => onOnlyOrganicChange(!onlyOrganic)}
                className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition-colors cursor-pointer ${
                  onlyOrganic
                    ? "border-emerald-600 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-semibold"
                    : "border-border bg-surface-secondary/40 text-muted hover:text-foreground"
                }`}
              >
                <ShieldCheck className="size-3.5 text-emerald-500" />
                <span>Organic</span>
              </button>

              <button
                type="button"
                onClick={() => onOnlyIotVerifiedChange(!onlyIotVerified)}
                className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition-colors cursor-pointer ${
                  onlyIotVerified
                    ? "border-accent bg-accent/10 text-accent font-semibold"
                    : "border-border bg-surface-secondary/40 text-muted hover:text-foreground"
                }`}
              >
                <Cpu className="size-3.5 text-accent" />
                <span>IoT Probes</span>
              </button>
            </div>

            {/* Reset Actions if active */}
            <div className="md:col-span-12 lg:col-span-2 flex items-end justify-start lg:justify-end">
              {hasActiveFilters ? (
                <Button
                  variant="outline"
                  size="sm"
                  onPress={onResetFilters}
                  className="w-full lg:w-auto text-xs text-muted hover:text-foreground gap-1.5 border-dashed"
                >
                  <RotateCcw className="size-3" />
                  <span>Reset All</span>
                </Button>
              ) : (
                <div className="hidden lg:block text-xs text-muted text-right">
                  <span>Filtered Live</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Results Header: Count & Sorting Options */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-1 text-xs text-muted">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-foreground">
            Showing {totalFilteredCount} of {totalCount} listings
          </span>
          {category !== "ALL" && (
            <Chip color="default" variant="soft" size="sm">
              <Chip.Label className="flex items-center gap-1 text-[11px]">
                {CATEGORY_LABELS[category]}
                <button
                  type="button"
                  onClick={() => onCategoryChange("ALL")}
                  className="hover:text-foreground"
                  aria-label="Remove category filter"
                >
                  <X className="size-3" />
                </button>
              </Chip.Label>
            </Chip>
          )}
          {listingType !== "ALL" && (
            <Chip color="default" variant="soft" size="sm">
              <Chip.Label className="flex items-center gap-1 text-[11px]">
                {listingType === "IN_STOCK" ? "In Stock" : "Pre-Order"}
                <button
                  type="button"
                  onClick={() => onListingTypeChange("ALL")}
                  className="hover:text-foreground"
                  aria-label="Remove listing type filter"
                >
                  <X className="size-3" />
                </button>
              </Chip.Label>
            </Chip>
          )}
          {onlyOrganic && (
            <Chip color="success" variant="soft" size="sm">
              <Chip.Label className="flex items-center gap-1 text-[11px]">
                Organic Only
                <button
                  type="button"
                  onClick={() => onOnlyOrganicChange(false)}
                  className="hover:text-foreground"
                  aria-label="Remove organic filter"
                >
                  <X className="size-3" />
                </button>
              </Chip.Label>
            </Chip>
          )}
          {onlyIotVerified && (
            <Chip color="accent" variant="soft" size="sm">
              <Chip.Label className="flex items-center gap-1 text-[11px]">
                IoT Monitored
                <button
                  type="button"
                  onClick={() => onOnlyIotVerifiedChange(false)}
                  className="hover:text-foreground"
                  aria-label="Remove IoT filter"
                >
                  <X className="size-3" />
                </button>
              </Chip.Label>
            </Chip>
          )}
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <span className="text-muted flex items-center gap-1 font-medium">
            <ArrowUpDown className="size-3.5 text-accent" />
            Sort:
          </span>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            aria-label="Sort product listings"
            className="rounded border border-border bg-surface px-2.5 py-1.5 text-xs text-foreground font-medium focus:border-accent focus:outline-none"
          >
            <option value="POPULARITY">Popularity & Rating</option>
            <option value="PRICE_ASC">Price: Low to High</option>
            <option value="PRICE_DESC">Price: High to Low</option>
            <option value="HARVEST_DATE_ASC">Harvest Window (Earliest)</option>
            <option value="RATING_DESC">Top Rated Producers</option>
            <option value="NEWEST">Newest Listings</option>
          </select>
        </div>
      </div>
    </div>
  );
}
