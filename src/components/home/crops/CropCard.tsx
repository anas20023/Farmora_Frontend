"use client";

import Image from "next/image";
import type { CropItem } from "@/types/crops";

interface CropCardProps {
  crop: CropItem;
  bgField?: string;
  inkField?: string;
  isDouble?: boolean;
  onPreOrder: (crop: CropItem) => void;
}

export default function CropCard({
  crop,
  bgField = "var(--surface-secondary)",
  inkField = "var(--foreground)",
  isDouble = false,
  onPreOrder,
}: CropCardProps) {
  return (
    <div className={`flex flex-col ${isDouble ? "sm:col-span-2" : ""}`}>
      {/* 4:5 Specimen Tile */}
      <div
        className={`relative w-full overflow-hidden rounded ${
          isDouble ? "aspect-[8/5]" : "aspect-[4/5]"
        }`}
        style={{ backgroundColor: bgField, color: inkField }}
      >
        <div className="absolute top-3 left-3 z-10 text-xs font-semibold tracking-wider">
          {crop.stage.label}
        </div>
        <div className="absolute top-3 right-3 z-10 text-xs font-bold">
          ৳{crop.price} {crop.unit}
        </div>

        <div className="relative h-full w-full p-4 flex items-center justify-center">
          <div className="relative h-4/5 w-4/5 overflow-hidden rounded">
            <Image
              src={crop.image}
              alt={crop.title}
              fill
              sizes="(max-width: 640px) 100vw, 33vw"
              className="object-cover"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={() => onPreOrder(crop)}
          className="absolute bottom-3 right-3 z-10 rounded bg-foreground px-3 py-1.5 text-xs font-semibold text-background transition-opacity hover:opacity-90"
        >
          Pre-Order
        </button>
      </div>

      {/* Item info outside tile aligned to left */}
      <div className="mt-3">
        <div className="font-display text-lg font-bold text-foreground leading-snug">
          {crop.title}
        </div>
        <div className="mt-1 text-xs text-muted flex items-center justify-between">
          <span>{crop.location}</span>
          <span>{crop.harvestDate} · {crop.preorderedAmount} reserved</span>
        </div>
      </div>
    </div>
  );
}
