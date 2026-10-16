"use client";

import Image from "next/image";
import { Button, Card } from "@heroui/react";
import {
  BadgeCheck,
  CheckCircle2,
  MapPin,
  Radio,
  ShieldCheck,
  Star,
} from "lucide-react";
import type { VerifiedFarmItem } from "@/types/farms";

interface FarmCardProps {
  farm: VerifiedFarmItem;
  onSelectFarm: (farm: VerifiedFarmItem) => void;
}

function renderBadgeIcon(iconName: string) {
  switch (iconName) {
    case "organic":
      return <CheckCircle2 aria-hidden="true" className="size-3.5 text-emerald-600 dark:text-emerald-400" />;
    case "heritage":
      return <ShieldCheck aria-hidden="true" className="size-3.5 text-emerald-600 dark:text-emerald-400" />;
    case "iot":
      return <Radio aria-hidden="true" className="size-3.5 text-emerald-600 dark:text-emerald-400" />;
    default:
      return <BadgeCheck aria-hidden="true" className="size-3.5 text-emerald-600 dark:text-emerald-400" />;
  }
}

export default function FarmCard({ farm, onSelectFarm }: FarmCardProps) {
  return (
    <Card
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#dbe8df] bg-white p-3.5 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-emerald-950/70 dark:bg-[#0f1f18] sm:p-4"
    >
      {/* Farm Aerial / Landscape Image Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-muted/20">
        <Image
          src={farm.image}
          alt={farm.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority
        />

        {/* Top-Left Verification Tag Badge */}
        <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full border border-black/5 bg-white/95 px-3 py-1 text-xs font-semibold text-[#1c6442] shadow-xs backdrop-blur-md dark:border-white/10 dark:bg-black/80 dark:text-emerald-300">
          {renderBadgeIcon(farm.badge.iconName)}
          <span>{farm.badge.label}</span>
        </div>

        {/* Bottom-Right Rating Pill */}
        <div className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-black/65 px-2.5 py-1 text-[11px] font-medium text-white shadow-xs backdrop-blur-md">
          <Star aria-hidden="true" className="size-3 fill-amber-400 text-amber-400" />
          <span>
            <strong className="font-semibold">{farm.rating.score}</strong> ({farm.rating.reviewsCount} reviews)
          </span>
        </div>
      </div>

      {/* Card Content & Telemetry Details */}
      <div className="flex flex-1 flex-col pt-3.5">
        {/* Farm Name */}
        <h3 className="text-lg font-bold tracking-tight text-[#0d3824] transition-colors dark:text-emerald-100">
          {farm.name}
        </h3>

        {/* Location & Acreage */}
        <div className="mt-1 flex items-center gap-1 text-xs font-medium text-[#52645a] dark:text-emerald-100/60">
          <MapPin aria-hidden="true" className="size-3.5 shrink-0 text-[#386b51] dark:text-emerald-400" />
          <span>{farm.location}</span>
        </div>

        {/* Key-Value Specifications */}
        <div className="mt-4 space-y-2.5 border-t border-separator/60 pt-3.5 text-xs">
          {/* Soil Composition */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-[#52645a] dark:text-emerald-100/65 font-medium shrink-0">
              Soil Composition:
            </span>
            <span className="truncate text-right font-semibold text-[#0d3824] dark:text-emerald-100">
              {farm.soilComposition}
            </span>
          </div>

          {/* Active Harvests */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-[#52645a] dark:text-emerald-100/65 font-medium shrink-0">
              Active Harvests:
            </span>
            <span className="truncate text-right font-semibold text-[#0d3824] dark:text-emerald-100">
              {farm.activeHarvests}
            </span>
          </div>

          {/* Telemetry Status */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-[#52645a] dark:text-emerald-100/65 font-medium shrink-0">
              Telemetry Status:
            </span>
            <span className="inline-flex items-center gap-1.5 font-semibold text-[#1c6442] dark:text-emerald-300">
              <span
                aria-hidden="true"
                className="size-2 rounded-full bg-emerald-500 animate-pulse"
              />
              <span>{farm.telemetry.statusText}</span>
            </span>
          </div>
        </div>

        {/* Action Button: View Farm Profile & Batches */}
        <div className="mt-5 pt-1">
          <Button
            type="button"
            variant="primary"
            size="md"
            fullWidth
            onPress={() => onSelectFarm(farm)}
            className="h-11 w-full rounded-xl border border-emerald-500/20 bg-[#dcf3e5] font-semibold text-[#1c6442] shadow-xs transition-colors hover:bg-[#cee9d8] dark:border-emerald-700/30 dark:bg-emerald-950/80 dark:text-emerald-300 dark:hover:bg-emerald-900/80"
          >
            <span>View Farm Profile & Batches</span>
          </Button>
        </div>
      </div>
    </Card>
  );
}
