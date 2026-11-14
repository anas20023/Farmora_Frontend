"use client";

import { useId } from "react";
import {
  Filter,
  RotateCcw,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

export interface FilterState {
  searchQuery: string;
  division: string;
  district: string;
  cropCategory: string;
  soilType: string;
  cropTag: string;
}

interface VerifiedFarmsFilterProps {
  filters: FilterState;
  onFilterChange: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  onClearFilters: () => void;
  matchingCount: number;
  totalCount: number;
  availableDivisions: string[];
  availableDistricts: string[];
  availableCropCategories: string[];
  availableSoilTypes: string[];
}

const POPULAR_CROP_TAGS = [
  "All Crops",
  "Rice",
  "Tomato",
  "Potato",
  "Brinjal",
  "Chili",
  "Mango",
  "Cucumber",
  "Cauliflower",
  "Guava",
];

export default function VerifiedFarmsFilter({
  filters,
  onFilterChange,
  onClearFilters,
  matchingCount,
  totalCount,
  availableDivisions,
  availableDistricts,
  availableCropCategories,
  availableSoilTypes,
}: VerifiedFarmsFilterProps) {
  const searchInputId = useId();
  const divisionSelectId = useId();
  const districtSelectId = useId();
  const cropCategorySelectId = useId();
  const soilTypeSelectId = useId();

  const hasActiveFilters = Boolean(
    filters.searchQuery ||
    filters.division !== "ALL" ||
    filters.district !== "ALL" ||
    filters.cropCategory !== "ALL" ||
    filters.soilType !== "ALL" ||
    (filters.cropTag && filters.cropTag !== "All Crops")
  );

  return (
    <div
      id="farms-catalogue"
      className="scroll-mt-20 rounded border border-border bg-surface p-5 shadow-xs transition-colors sm:p-6"
    >
      {/* Top row: Search input + Clear Filters */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        {/* Search bar */}
        <div className="relative flex-1">
          <label htmlFor={searchInputId} className="sr-only">
            Search verified farms, farmers, districts, or crops
          </label>
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted">
            <Search className="size-4" />
          </div>
          <input
            id={searchInputId}
            type="text"
            value={filters.searchQuery}
            onChange={(e) => onFilterChange("searchQuery", e.target.value)}
            placeholder="Search by farmer name, farm, district, upazila, or crop (e.g. Tariqul, Bogura, Rice, Tomato)..."
            className="w-full rounded border border-border bg-background py-2.5 pr-10 pl-10 text-sm text-foreground placeholder:text-muted/70 transition-colors focus:border-accent focus:outline-hidden focus:ring-1 focus:ring-accent"
          />
          {filters.searchQuery && (
            <button
              type="button"
              aria-label="Clear search query"
              onClick={() => onFilterChange("searchQuery", "")}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted hover:text-foreground cursor-pointer"
            >
              <X className="size-4" />
            </button>
          )}
        </div>

        {/* Clear filters action */}
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onClearFilters}
            className="inline-flex items-center justify-center gap-1.5 rounded border border-border bg-surface-secondary px-3.5 py-2.5 text-xs font-semibold text-foreground transition-colors hover:bg-surface-tertiary cursor-pointer self-start md:self-auto shrink-0"
          >
            <RotateCcw className="size-3.5 text-muted" />
            <span>Reset Filters</span>
          </button>
        )}
      </div>

      {/* Second row: Dropdown filters */}
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {/* Division Filter */}
        <div className="space-y-1">
          <label htmlFor={divisionSelectId} className="text-[11px] font-semibold text-muted">
            Division
          </label>
          <select
            id={divisionSelectId}
            value={filters.division}
            onChange={(e) => onFilterChange("division", e.target.value)}
            className="w-full rounded border border-border bg-background px-3 py-2 text-xs font-medium text-foreground transition-colors focus:border-accent focus:outline-hidden"
          >
            <option value="ALL">All Divisions (Bangladesh)</option>
            {availableDivisions.map((div) => (
              <option key={div} value={div}>
                {div} Division
              </option>
            ))}
          </select>
        </div>

        {/* District Filter */}
        <div className="space-y-1">
          <label htmlFor={districtSelectId} className="text-[11px] font-semibold text-muted">
            District
          </label>
          <select
            id={districtSelectId}
            value={filters.district}
            onChange={(e) => onFilterChange("district", e.target.value)}
            className="w-full rounded border border-border bg-background px-3 py-2 text-xs font-medium text-foreground transition-colors focus:border-accent focus:outline-hidden"
          >
            <option value="ALL">All Districts</option>
            {availableDistricts.map((dist) => (
              <option key={dist} value={dist}>
                {dist}
              </option>
            ))}
          </select>
        </div>

        {/* Crop Category Filter */}
        <div className="space-y-1">
          <label htmlFor={cropCategorySelectId} className="text-[11px] font-semibold text-muted">
            Crop Category
          </label>
          <select
            id={cropCategorySelectId}
            value={filters.cropCategory}
            onChange={(e) => onFilterChange("cropCategory", e.target.value)}
            className="w-full rounded border border-border bg-background px-3 py-2 text-xs font-medium text-foreground transition-colors focus:border-accent focus:outline-hidden"
          >
            <option value="ALL">All Crop Categories</option>
            {availableCropCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Soil Type Filter */}
        <div className="space-y-1">
          <label htmlFor={soilTypeSelectId} className="text-[11px] font-semibold text-muted">
            Soil Composition
          </label>
          <select
            id={soilTypeSelectId}
            value={filters.soilType}
            onChange={(e) => onFilterChange("soilType", e.target.value)}
            className="w-full rounded border border-border bg-background px-3 py-2 text-xs font-medium text-foreground transition-colors focus:border-accent focus:outline-hidden"
          >
            <option value="ALL">All Soil Profiles</option>
            {availableSoilTypes.map((soil) => (
              <option key={soil} value={soil}>
                {soil}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Third row: Quick crop category chips */}
      <div className="mt-4 pt-3 border-t border-border/70 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-semibold text-muted mr-1 flex items-center gap-1">
            <SlidersHorizontal className="size-3 text-accent" />
            Quick Crops:
          </span>
          {POPULAR_CROP_TAGS.map((tag) => {
            const isSelected =
              tag === "All Crops"
                ? !filters.cropTag || filters.cropTag === "All Crops"
                : filters.cropTag === tag;
            return (
              <button
                key={tag}
                type="button"
                onClick={() =>
                  onFilterChange("cropTag", tag === "All Crops" ? "" : tag)
                }
                className={`rounded-full px-2.5 py-0.5 text-xs font-medium transition-all cursor-pointer ${
                  isSelected
                    ? "bg-accent text-accent-foreground shadow-2xs font-semibold"
                    : "bg-surface-secondary text-muted hover:bg-surface-tertiary hover:text-foreground"
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>

        {/* Results Counter */}
        <div className="flex items-center gap-2 text-xs text-muted self-end sm:self-auto shrink-0">
          <Filter className="size-3 text-accent" />
          <span>
            Showing <strong className="text-foreground">{matchingCount}</strong> of{" "}
            <strong>{totalCount}</strong> verified farms
          </span>
        </div>
      </div>
    </div>
  );
}
