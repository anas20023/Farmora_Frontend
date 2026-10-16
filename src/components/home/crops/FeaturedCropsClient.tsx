"use client";

import { useState } from "react";
import { ChevronDown, Check, Sparkles } from "lucide-react";
import type { CropItem, FeaturedCropsSectionData } from "@/types/crops";
import CropCard from "./CropCard";
import PreOrderModal from "./PreOrderModal";

interface FeaturedCropsClientProps {
  data: FeaturedCropsSectionData;
}

export default function FeaturedCropsClient({
  data,
}: FeaturedCropsClientProps) {
  const { overline, title, description, filterLabel, seasons, crops } = data;

  const [selectedSeason, setSelectedSeason] = useState(data.currentSeason);
  const [isSeasonDropdownOpen, setIsSeasonDropdownOpen] = useState(false);
  const [preOrderCrop, setPreOrderCrop] = useState<CropItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenPreOrder = (crop: CropItem) => {
    setPreOrderCrop(crop);
    setIsModalOpen(true);
  };

  const handleClosePreOrder = () => {
    setIsModalOpen(false);
    setPreOrderCrop(null);
  };

  const handleSelectSeason = (seasonLabel: string) => {
    setSelectedSeason(seasonLabel);
    setIsSeasonDropdownOpen(false);
  };

  return (
    <section
      aria-labelledby="featured-crops-heading"
      className="relative w-full bg-[#edf7f1] py-12 transition-colors duration-200 sm:py-16 lg:py-20 dark:bg-[#07150e]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Block with Title & Season Filter */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          {/* Left Title & Overline */}
          <div className="max-w-2xl">
            <p className="text-xs font-bold tracking-wider text-[#386b51] uppercase sm:text-[13px] dark:text-emerald-400">
              {overline}
            </p>

            <h2
              id="featured-crops-heading"
              className="mt-2.5 text-3xl font-extrabold tracking-tight text-[#0d3824] sm:text-4xl lg:text-[2.65rem] lg:leading-[1.15] dark:text-white"
            >
              {title}
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-[#496154] sm:text-base dark:text-emerald-100/75">
              {description}
            </p>
          </div>

          {/* Right Season Filter Selector */}
          <div className="relative flex items-center gap-2.5 self-start lg:self-end">
            <span className="text-xs font-medium text-[#55695e] sm:text-sm dark:text-emerald-100/70">
              {filterLabel}
            </span>

            <div className="relative">
              <button
                type="button"
                aria-expanded={isSeasonDropdownOpen}
                aria-label="Filter crops by season"
                onClick={() => setIsSeasonDropdownOpen(!isSeasonDropdownOpen)}
                className="inline-flex items-center gap-2 rounded-full border border-[#cbe0d3] bg-white px-4 py-1.5 text-xs font-semibold text-[#0d3824] shadow-xs transition-colors hover:border-[#104b30] focus-visible:ring-2 focus-visible:ring-focus focus-visible:outline-none dark:border-emerald-900/60 dark:bg-[#10241b] dark:text-emerald-200 sm:text-sm"
              >
                <span>{selectedSeason}</span>
                <ChevronDown
                  aria-hidden="true"
                  className={`size-3.5 text-[#55695e] transition-transform duration-200 dark:text-emerald-300 ${
                    isSeasonDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Season Selection Menu */}
              {isSeasonDropdownOpen ? (
                <>
                  <div
                    aria-hidden="true"
                    className="fixed inset-0 z-40"
                    onClick={() => setIsSeasonDropdownOpen(false)}
                  />
                  <div
                    role="menu"
                    className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-xl border border-border bg-surface p-1.5 shadow-xl animate-in fade-in zoom-in-95 duration-150 dark:bg-[#0c1813]"
                  >
                    <div className="px-3 py-1.5 text-[11px] font-semibold text-muted uppercase tracking-wider">
                      Crop Production Seasons
                    </div>
                    {seasons.map((season) => (
                      <button
                        key={season.id}
                        type="button"
                        role="menuitem"
                        onClick={() => handleSelectSeason(season.label)}
                        className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs font-medium transition-colors ${
                          selectedSeason === season.label
                            ? "bg-accent/10 text-accent font-semibold"
                            : "text-foreground hover:bg-surface-secondary"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <Sparkles aria-hidden="true" className="size-3.5 text-muted" />
                          <span>{season.label}</span>
                        </span>
                        {selectedSeason === season.label ? (
                          <Check aria-hidden="true" className="size-3.5 text-accent" />
                        ) : null}
                      </button>
                    ))}
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>

        {/* Crops 4-Column Responsive Grid */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6 sm:mt-10">
          {crops.map((crop) => (
            <CropCard
              key={crop.id}
              crop={crop}
              onPreOrder={handleOpenPreOrder}
            />
          ))}
        </div>
      </div>

      {/* Pre-Order Modal Dialog */}
      <PreOrderModal
        crop={preOrderCrop}
        isOpen={isModalOpen}
        onClose={handleClosePreOrder}
      />
    </section>
  );
}
