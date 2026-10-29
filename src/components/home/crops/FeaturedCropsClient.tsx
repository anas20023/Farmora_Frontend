"use client";

import { useState } from "react";
import type { CropItem, FeaturedCropsSectionData } from "@/types/crops";
import CropCard from "./CropCard";
import PreOrderModal from "./PreOrderModal";

interface FeaturedCropsClientProps {
  data: FeaturedCropsSectionData;
}

export default function FeaturedCropsClient({
  data,
}: FeaturedCropsClientProps) {
  const { title, description, crops } = data;
  const [preOrderCrop, setPreOrderCrop] = useState<CropItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenPreOrder = (crop: CropItem) => {
    setPreOrderCrop(crop);
    setIsModalOpen(true);
  };

  const paletteFields = [
    { bg: "var(--field-clay)", ink: "var(--field-clay-ink)" },
    { bg: "var(--field-gold)", ink: "var(--field-gold-ink)" },
    { bg: "var(--field-spruce)", ink: "var(--field-spruce-ink)" },
    { bg: "var(--field-slate)", ink: "var(--field-slate-ink)" },
  ];

  return (
    <section
      id="crops"
      aria-labelledby="featured-crops-heading"
      className="relative w-full bg-background py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Blueprint: Specimens on colour tiles (12-column grid) */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Columns 1-3: Heading and 30ch statement */}
          <div className="lg:col-span-4">
            <div className="mb-3 flex items-center gap-2">
              <span className="size-2 rounded-full bg-accent" />
              <span className="text-xs font-semibold text-muted">
                HARVEST SPECIMENS
              </span>
            </div>

            <h2
              id="featured-crops-heading"
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-foreground"
            >
              {title}
            </h2>

            <p className="mt-4 text-base text-muted max-w-[32ch] leading-relaxed">
              {description} Each batch is linked directly to in-soil IoT sensors and verifiable harvest windows.
            </p>

            <div className="mt-8 hidden lg:block pt-6 text-xs text-muted">
              <div>Continuous soil data logged</div>
              <div className="mt-1 font-medium text-foreground">Zero chemical ripening guarantee</div>
            </div>
          </div>

          {/* Columns 5-12: Specimen Tiles Grid */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {crops.slice(0, 4).map((crop, idx) => {
                const field = paletteFields[idx % paletteFields.length];
                return (
                  <CropCard
                    key={crop.id}
                    crop={crop}
                    bgField={field.bg}
                    inkField={field.ink}
                    isDouble={idx === 1}
                    onPreOrder={handleOpenPreOrder}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <PreOrderModal
        crop={preOrderCrop}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setPreOrderCrop(null);
        }}
      />
    </section>
  );
}
