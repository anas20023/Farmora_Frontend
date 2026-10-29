"use client";

import Image from "next/image";
import { CheckCircle2, MapPin, Radio, ShieldCheck, X } from "lucide-react";
import type { VerifiedFarmItem } from "@/types/farms";

interface FarmProfileModalProps {
  farm: VerifiedFarmItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function FarmProfileModal({
  farm,
  isOpen,
  onClose,
}: FarmProfileModalProps) {
  if (!isOpen || !farm) return null;

  return (
    <div
      data-ui="true"
      role="dialog"
      aria-modal="true"
      aria-labelledby="farm-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
    >
      <div className="relative max-h-[90svh] w-full max-w-xl overflow-y-auto rounded bg-surface p-6 text-foreground border border-border">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 rounded p-1 text-muted hover:text-foreground"
        >
          <X className="size-5" />
        </button>

        {/* Header Visual */}
        <div className="relative aspect-[16/8] w-full overflow-hidden rounded bg-muted/20">
          <Image
            src={farm.image}
            alt={farm.name}
            fill
            className="object-cover"
          />
          <div className="absolute top-3 left-3 rounded bg-surface/90 px-3 py-1 text-xs font-semibold text-accent">
            {farm.badge.label}
          </div>
        </div>

        <div className="mt-4">
          <h3 id="farm-modal-title" className="font-display text-2xl font-bold">
            {farm.name}
          </h3>
          <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted">
            <span className="flex items-center gap-1">
              <MapPin className="size-3.5 text-accent" />
              {farm.location}
            </span>
            <span>Rating {farm.rating.score} ({farm.rating.reviewsCount} reviews)</span>
            {farm.inspectionDate && (
              <span className="flex items-center gap-1 text-accent">
                <ShieldCheck className="size-3.5" />
                Verified: {farm.inspectionDate}
              </span>
            )}
          </div>
        </div>

        {farm.description && (
          <p className="mt-3 text-sm text-muted leading-relaxed">
            {farm.description}
          </p>
        )}

        {/* Live IoT Node Readings */}
        <div className="mt-5 rounded bg-surface-secondary p-4 border border-rule">
          <div className="flex items-center justify-between pb-2">
            <div className="flex items-center gap-2">
              <Radio className="size-4 text-accent" />
              <span className="text-xs font-bold text-foreground">
                Plot Telemetry Node
              </span>
            </div>
            <span className="text-xs font-medium text-accent">
              {farm.telemetry.statusText}
            </span>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
            <div className="rounded bg-surface p-2.5">
              <span className="text-muted block">Soil Moisture</span>
              <span className="font-display text-lg font-bold text-foreground">
                {farm.telemetry.soilMoisture}
              </span>
            </div>
            <div className="rounded bg-surface p-2.5">
              <span className="text-muted block">Canopy Temperature</span>
              <span className="font-display text-lg font-bold text-foreground">
                {farm.telemetry.canopyTemp || "24.6°C"}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded bg-accent px-5 py-2 text-sm font-semibold text-accent-foreground hover:opacity-90"
          >
            Close Registry
          </button>
        </div>
      </div>
    </div>
  );
}
