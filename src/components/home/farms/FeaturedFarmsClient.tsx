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
      id="farms"
      aria-labelledby="featured-farms-heading"
      className="relative w-full bg-background py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Blueprint: The printed guest list */}
        <div className="mb-14 overflow-hidden rounded bg-surface-secondary/70 p-8 sm:p-12 text-center border border-rule">
          <div className="mx-auto max-w-2xl">
            <span className="text-xs font-semibold text-muted">
              REGISTERED PRODUCER NETWORK
            </span>

            <h3 className="mt-3 font-display text-2xl sm:text-3xl font-bold text-foreground">
              The Verified Farms of Farmora
            </h3>

            <p className="mt-4 font-display text-lg sm:text-xl text-muted leading-relaxed">
              Barind Tech Farm (Bogura) &nbsp;·&nbsp; Sonargaon Heritage (Narayanganj) &nbsp;·&nbsp; Green Valley Agro (Dinajpur) &nbsp;·&nbsp; Meghna Alluvial Silt Plots (Chandpur) &nbsp;·&nbsp; Rangpur Bio-Canopy Growers
            </p>

            <div className="mt-6 text-xs text-muted">
              All plots undergo quarterly soil spectroscopic testing and operate solar-powered IoT gateways.
            </div>
          </div>
        </div>

        {/* Section Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-10">
          <div>
            <h2
              id="featured-farms-heading"
              className="font-display text-3xl sm:text-4xl font-bold text-foreground"
            >
              {title}
            </h2>
            <p className="mt-2 text-base text-muted max-w-2xl">
              {description}
            </p>
          </div>

          <Link
            href={viewAllLink.href}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline"
          >
            <span>{viewAllLink.label}</span>
            <ArrowRight className="size-4" />
          </Link>
        </div>

        {/* Farm Cards Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {farms.map((farm) => (
            <FarmCard
              key={farm.id}
              farm={farm}
              onSelectFarm={handleSelectFarm}
            />
          ))}
        </div>
      </div>

      <FarmProfileModal
        farm={selectedFarm}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
}
