"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { FeaturedFarmsSectionData, VerifiedFarmItem } from "@/types/farms";
import FarmCard from "./FarmCard";
import FarmProfileModal from "./FarmProfileModal";

interface FeaturedFarmsClientProps {
  data: FeaturedFarmsSectionData;
}

export default function FeaturedFarmsClient({
  data,
}: FeaturedFarmsClientProps) {
  const { overline, title, description, viewAllLink, farms } = data;
  const [selectedFarm, setSelectedFarm] = useState<VerifiedFarmItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectFarm = (farm: VerifiedFarmItem) => {
    setSelectedFarm(farm);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedFarm(null);
  };

  return (
    <section
      aria-labelledby="featured-farms-heading"
      className="relative w-full bg-[#edf7f1] py-12 transition-colors duration-200 sm:py-16 lg:py-20 dark:bg-[#07150e]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Block with Title & View All Link */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          {/* Left Title & Overline */}
          <div className="max-w-2xl">
            <p className="text-xs font-bold tracking-wider text-[#386b51] uppercase sm:text-[13px] dark:text-emerald-400">
              {overline}
            </p>

            <h2
              id="featured-farms-heading"
              className="mt-2.5 text-3xl font-extrabold tracking-tight text-[#0d3824] sm:text-4xl lg:text-[2.65rem] lg:leading-[1.15] dark:text-white"
            >
              {title}
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-[#496154] sm:text-base dark:text-emerald-100/75">
              {description}
            </p>
          </div>

          {/* Right Side View All Link */}
          <Link
            href={viewAllLink.href}
            className="group inline-flex items-center gap-1.5 self-start text-xs font-semibold text-[#0d3824] transition-colors hover:text-accent hover:underline sm:text-sm lg:self-end dark:text-emerald-300 dark:hover:text-emerald-200"
          >
            <span>{viewAllLink.label}</span>
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* 3-Column Responsive Grid */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6 sm:mt-10">
          {farms.map((farm) => (
            <FarmCard
              key={farm.id}
              farm={farm}
              onSelectFarm={handleSelectFarm}
            />
          ))}
        </div>
      </div>

      {/* Interactive Farm Profile & Batches Modal */}
      <FarmProfileModal
        farm={selectedFarm}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
}
