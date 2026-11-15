"use client";

import Image from "next/image";
import { BadgeCheck, MapPin } from "lucide-react";
import type { VerifiedFarmItem } from "@/types/farms";

interface FarmCardProps {
  farm: VerifiedFarmItem;
  onSelectFarm: (farm: VerifiedFarmItem) => void;
}

export default function FarmCard({ farm, onSelectFarm }: FarmCardProps) {
  return (
    <div data-ui="true" className="flex flex-col rounded bg-surface p-5 text-foreground border border-border">
      {/* Farm Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded bg-muted/20">
        <Image
          src={farm.image}
          alt={farm.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />
        <div className="absolute top-2.5 left-2.5 rounded bg-surface/90 px-2.5 py-1 text-xs font-semibold text-accent">
          {farm.badge.label}
        </div>
      </div>

      <div className="mt-4 flex flex-1 flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-bold text-foreground">
              {farm.name}
            </h3>
            <span className="text-xs text-muted">
              Rating {farm.rating.score}
            </span>
          </div>

          <div className="mt-1 flex items-center gap-1 text-xs text-muted">
            <MapPin aria-hidden="true" className="size-3.5 shrink-0 text-accent" />
            <span>{farm.location}</span>
          </div>

          <div className="mt-3 space-y-1.5 text-xs bg-surface-secondary/40 p-2.5 rounded">
            <div className="flex justify-between">
              <span className="text-muted">Soil Profile:</span>
              <span className="font-medium text-foreground">{farm.soilComposition}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Active Harvests:</span>
              <span className="font-medium text-foreground">{farm.activeHarvests}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Node Status:</span>
              <span className="font-medium text-accent">{farm.telemetry.statusText}</span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onSelectFarm(farm)}
          className="mt-4 w-full rounded border border-border bg-surface py-2 text-xs font-semibold text-foreground transition-colors hover:bg-surface-secondary"
        >
          View Farm Registry & Batches
        </button>
      </div>
    </div>
  );
}
