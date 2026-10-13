"use client";

import Image from "next/image";
import { Button, Card } from "@heroui/react";
import { Bookmark } from "lucide-react";
import type { CropItem } from "@/types/crops";

interface CropCardProps {
  crop: CropItem;
  onPreOrder: (crop: CropItem) => void;
}

export default function CropCard({ crop, onPreOrder }: CropCardProps) {
  return (
    <Card
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#dbe8df] bg-white p-3.5 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-emerald-950/70 dark:bg-[#0f1f18] sm:p-4"
    >
      {/* Crop Visual Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-muted/20">
        <Image
          src={crop.image}
          alt={crop.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority
        />

        {/* Growth Stage Pill Badge */}
        <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full border border-black/5 bg-white/95 px-3 py-1 text-xs font-semibold shadow-xs backdrop-blur-md dark:border-white/10 dark:bg-black/80">
          <span
            aria-hidden="true"
            className={`size-2 rounded-full ${crop.stage.dotColor} animate-pulse`}
          />
          <span className={crop.stage.textColor || "text-foreground"}>
            {crop.stage.label}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="flex flex-1 flex-col pt-3.5">
        {/* Title */}
        <h3 className="line-clamp-2 min-h-[2.85rem] text-[1.05rem] font-bold leading-snug text-[#0d3824] transition-colors dark:text-emerald-100">
          {crop.title}
        </h3>

        {/* Region & Plot */}
        <p className="mt-1 text-xs font-medium text-[#52645a] dark:text-emerald-100/60">
          {crop.location}
        </p>

        {/* Pricing & Harvest Badge Row */}
        <div className="mt-3.5 flex items-baseline justify-between gap-2">
          {/* Price with Symbol */}
          <div className="flex items-baseline gap-1.5">
            <span
              aria-label="Currency: Bangladeshi Taka"
              className="inline-flex items-center justify-center rounded-xs bg-[#124b31] px-1 py-0.5 text-[11px] font-bold leading-none text-white dark:bg-emerald-700"
            >
              ৳
            </span>
            <span className="text-2xl font-extrabold tracking-tight text-[#0d3824] dark:text-emerald-50">
              {crop.price}
            </span>
            <span className="text-xs font-medium text-[#52645a] dark:text-emerald-100/60">
              {crop.unit}
            </span>
          </div>

          {/* Harvest Date Badge */}
          <div className="inline-flex items-center rounded-md border border-emerald-500/20 bg-[#dcf3e5] px-2.5 py-1 text-[11px] font-semibold text-[#1c6442] dark:border-emerald-700/30 dark:bg-emerald-950/80 dark:text-emerald-300">
            {crop.harvestDate}
          </div>
        </div>

        {/* Allocation Progress Bar */}
        <div className="mt-4 space-y-1.5">
          <div className="flex items-center justify-between text-xs font-medium">
            <span className="text-[#52645a] dark:text-emerald-100/70">
              Pre-ordered: {crop.preorderedAmount}
            </span>
            <span className="font-bold text-[#0d3824] dark:text-emerald-300">
              {crop.progressPercent}%
            </span>
          </div>

          {/* Progress bar track */}
          <div
            role="progressbar"
            aria-valuenow={crop.progressPercent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${crop.title} pre-order progress`}
            className="h-2 w-full overflow-hidden rounded-full bg-[#e2ede6] dark:bg-emerald-950"
          >
            <div
              className="h-full rounded-full bg-[#0a3823] transition-all duration-700 ease-out dark:bg-emerald-500"
              style={{ width: `${Math.min(100, crop.progressPercent)}%` }}
            />
          </div>

          {/* Countdown remaining */}
          <p className="text-xs font-medium text-[#52645a] dark:text-emerald-100/60">
            {crop.countdownText}
          </p>
        </div>

        {/* Action Button */}
        <div className="mt-5 pt-1">
          <Button
            type="button"
            variant="primary"
            size="md"
            fullWidth
            onPress={() => onPreOrder(crop)}
            className="h-11 w-full rounded-xl bg-[#0a3823] font-medium text-white shadow-xs transition-colors hover:bg-[#072a1a] dark:bg-emerald-800 dark:hover:bg-emerald-700"
          >
            <span className="inline-flex items-center justify-center gap-2">
              <Bookmark aria-hidden="true" className="size-4" />
              <span>Pre-Order Batch</span>
            </span>
          </Button>
        </div>
      </div>
    </Card>
  );
}
