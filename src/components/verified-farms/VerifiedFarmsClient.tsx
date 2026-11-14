"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpDown,
  FilterX,
  RotateCcw,
  ShieldCheck,
  Sprout,
} from "lucide-react";
import type { Farm, VerifiedFarmsDirectoryData } from "@/types/verified-farms";
import VerifiedFarmsHeader from "./VerifiedFarmsHeader";
import VerifiedFarmsHero from "./VerifiedFarmsHero";
import VerifiedFarmsFilter, { type FilterState } from "./VerifiedFarmsFilter";
import VerifiedFarmCard from "./VerifiedFarmCard";
import FarmDetailsModal from "./FarmDetailsModal";

interface VerifiedFarmsClientProps {
  initialData: VerifiedFarmsDirectoryData;
}

const INITIAL_FILTERS: FilterState = {
  searchQuery: "",
  division: "ALL",
  district: "ALL",
  cropCategory: "ALL",
  soilType: "ALL",
  cropTag: "",
};

export default function VerifiedFarmsClient({
  initialData,
}: VerifiedFarmsClientProps) {
  const { stats, farms: allFarms } = initialData;

  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [selectedFarm, setSelectedFarm] = useState<Farm | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState<"rating" | "acreage" | "name" | "plots">("rating");

  // Derive unique filter options
  const availableDivisions = useMemo(() => {
    return Array.from(new Set(allFarms.map((f) => f.division))).sort();
  }, [allFarms]);

  const availableDistricts = useMemo(() => {
    const list =
      filters.division === "ALL"
        ? allFarms
        : allFarms.filter((f) => f.division === filters.division);
    return Array.from(new Set(list.map((f) => f.district))).sort();
  }, [allFarms, filters.division]);

  const availableCropCategories = useMemo(() => {
    const cats = new Set<string>();
    allFarms.forEach((f) => f.cropCategories.forEach((c) => cats.add(c)));
    return Array.from(cats).sort();
  }, [allFarms]);

  const availableSoilTypes = useMemo(() => {
    return Array.from(new Set(allFarms.map((f) => f.soilType))).sort();
  }, [allFarms]);

  // Handle filter changes
  const handleFilterChange = <K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => {
    setFilters((prev) => {
      const next = { ...prev, [key]: value };
      // If division changes and current district isn't in new division, reset district
      if (key === "division" && value !== "ALL") {
        const validDistricts = allFarms
          .filter((f) => f.division === value)
          .map((f) => f.district);
        if (!validDistricts.includes(prev.district)) {
          next.district = "ALL";
        }
      }
      return next;
    });
  };

  const handleClearFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  // Filter and sort farms
  const filteredFarms = useMemo(() => {
    const q = filters.searchQuery.trim().toLowerCase();

    return allFarms
      .filter((farm) => {
        // Search query filter (matches farmer, farm, district, upazila, crops, plots)
        if (q) {
          const nameMatch = farm.name.toLowerCase().includes(q);
          const farmerMatch = farm.farmer.farmerName.toLowerCase().includes(q);
          const districtMatch = farm.district.toLowerCase().includes(q);
          const upazilaMatch = farm.upazila.toLowerCase().includes(q);
          const locationMatch = farm.locationName.toLowerCase().includes(q);
          const cropMatch = farm.activeCrops.some((c) =>
            c.toLowerCase().includes(q)
          );
          const plotCropMatch = farm.plots.some(
            (p) =>
              p.currentCrop.toLowerCase().includes(q) ||
              p.plotName.toLowerCase().includes(q)
          );

          if (
            !nameMatch &&
            !farmerMatch &&
            !districtMatch &&
            !upazilaMatch &&
            !locationMatch &&
            !cropMatch &&
            !plotCropMatch
          ) {
            return false;
          }
        }

        // Division filter
        if (filters.division !== "ALL" && farm.division !== filters.division) {
          return false;
        }

        // District filter
        if (filters.district !== "ALL" && farm.district !== filters.district) {
          return false;
        }

        // Crop category filter
        if (
          filters.cropCategory !== "ALL" &&
          !farm.cropCategories.includes(filters.cropCategory as never)
        ) {
          return false;
        }

        // Soil type filter
        if (filters.soilType !== "ALL" && farm.soilType !== filters.soilType) {
          return false;
        }

        // Quick crop tag filter
        if (filters.cropTag) {
          const tag = filters.cropTag.toLowerCase();
          const matchesTag =
            farm.activeCrops.some((c) => c.toLowerCase().includes(tag)) ||
            farm.plots.some((p) => p.currentCrop.toLowerCase().includes(tag));
          if (!matchesTag) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "rating") {
          return b.farmer.rating.score - a.farmer.rating.score;
        }
        if (sortBy === "acreage") {
          return b.totalArea - a.totalArea;
        }
        if (sortBy === "plots") {
          return b.plots.length - a.plots.length;
        }
        if (sortBy === "name") {
          return a.name.localeCompare(b.name);
        }
        return 0;
      });
  }, [allFarms, filters, sortBy]);

  const handleOpenDetails = (farm: Farm) => {
    setSelectedFarm(farm);
    setIsModalOpen(true);
  };

  const handleCloseDetails = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
      {/* 1. Page Header with Breadcrumbs, Verified Trust Badge, and Theme Toggle */}
      <VerifiedFarmsHeader />

      {/* 2. Hero Banner with Stats and Visual Presentation */}
      <VerifiedFarmsHero stats={stats} />

      {/* 3. Main Directory Content: Filter Bar & Farm Grid */}
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-8">
        {/* Search & Filter Component */}
        <VerifiedFarmsFilter
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          matchingCount={filteredFarms.length}
          totalCount={allFarms.length}
          availableDivisions={availableDivisions}
          availableDistricts={availableDistricts}
          availableCropCategories={availableCropCategories}
          availableSoilTypes={availableSoilTypes}
        />

        {/* Directory Sub-header: Results info & Sort Options */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-4">
          <div>
            <h3 className="font-display text-xl font-bold text-foreground">
              Verified Farm Directory
            </h3>
            <p className="text-xs text-muted">
              Every profile corresponds to an audited grower registered with the Department of Agricultural Extension (DAE).
            </p>
          </div>

          {/* Sorting Dropdown */}
          <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
            <span className="text-xs text-muted flex items-center gap-1">
              <ArrowUpDown className="size-3.5 text-accent" />
              Sort by:
            </span>
            <select
              aria-label="Sort verified farms"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="rounded border border-border bg-surface px-2.5 py-1.5 text-xs font-semibold text-foreground transition-colors focus:border-accent focus:outline-hidden"
            >
              <option value="rating">Highest Rated Farmers</option>
              <option value="acreage">Largest Land Area</option>
              <option value="plots">Most Active Plots</option>
              <option value="name">Alphabetical (A - Z)</option>
            </select>
          </div>
        </div>

        {/* 4. Farm Cards Grid or Friendly Empty State */}
        {filteredFarms.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredFarms.map((farm) => (
              <VerifiedFarmCard
                key={farm.id}
                farm={farm}
                onViewDetails={handleOpenDetails}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="rounded border border-dashed border-border bg-surface p-12 text-center shadow-xs">
            <div className="mx-auto grid size-12 place-items-center rounded-full bg-accent/15 text-accent mb-4">
              <FilterX className="size-6" />
            </div>
            <h4 className="font-display text-lg font-bold text-foreground">
              No Verified Farms Found
            </h4>
            <p className="mx-auto mt-1.5 max-w-md text-xs text-muted leading-relaxed">
              We couldn&apos;t find any verified farms matching your selected combination of search terms, division, district, or soil profile.
            </p>
            <div className="mt-5 flex justify-center">
              <button
                type="button"
                onClick={handleClearFilters}
                className="inline-flex items-center gap-2 rounded bg-accent px-4 py-2 text-xs font-semibold text-accent-foreground shadow-xs transition-colors hover:bg-accent-hover cursor-pointer"
              >
                <RotateCcw className="size-3.5" />
                <span>Reset All Filters</span>
              </button>
            </div>
          </div>
        )}

        {/* Trust & Verification Assurance Banner */}
        <div className="rounded border border-border bg-surface-secondary/50 p-6 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3.5">
              <div className="grid size-10 place-items-center rounded bg-accent/15 text-accent shrink-0">
                <ShieldCheck className="size-5" />
              </div>
              <div>
                <h4 className="font-display text-sm font-bold text-foreground sm:text-base">
                  Are you an agricultural producer seeking verification?
                </h4>
                <p className="mt-1 text-xs text-muted max-w-2xl leading-relaxed">
                  Join the Farmora verified network. Our agronomists conduct soil spectroscopic analysis, verify water source purity, and deploy solar IoT telemetry nodes to showcase your farm to wholesale buyers nationwide.
                </p>
              </div>
            </div>

            <div className="shrink-0 self-start sm:self-auto">
              <a
                href="/login?redirect=/profile"
                className="inline-flex items-center gap-2 rounded bg-accent px-4 py-2 text-xs font-semibold text-accent-foreground transition-opacity hover:opacity-90"
              >
                <Sprout className="size-3.5" />
                <span>Apply for Farm Verification</span>
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* 5. Farm Details Modal */}
      <FarmDetailsModal
        farm={selectedFarm}
        isOpen={isModalOpen}
        onClose={handleCloseDetails}
      />
    </div>
  );
}
