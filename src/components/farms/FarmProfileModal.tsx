"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@heroui/react";
import {
  Calendar,
  CheckCircle2,
  Clock,
  MapPin,
  Radio,
  ShieldCheck,
  Sprout,
  Star,
  Thermometer,
  Trees,
  Waves,
  X,
} from "lucide-react";
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
  const [inquirySent, setInquirySent] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setInquirySent(false);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !farm) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="farm-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-border bg-surface p-5 shadow-2xl transition-all sm:p-7 dark:bg-[#0c1813]">
        {/* Close Button */}
        <button
          type="button"
          aria-label="Close farm profile dialog"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 rounded-lg bg-surface/80 p-2 text-muted backdrop-blur-xs transition-colors hover:bg-surface-secondary hover:text-foreground"
        >
          <X aria-hidden="true" className="size-5" />
        </button>

        {/* Modal Header & Farm Banner */}
        <div className="relative aspect-[16/8] w-full overflow-hidden rounded-xl bg-muted">
          <Image
            src={farm.image}
            alt={farm.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Floating Badges */}
          <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#1c6442] backdrop-blur-md dark:bg-black/80 dark:text-emerald-300">
            <CheckCircle2 aria-hidden="true" className="size-3.5" />
            <span>{farm.badge.label}</span>
          </div>

          <div className="absolute bottom-3 left-3 right-3 text-white">
            <h3 id="farm-modal-title" className="text-xl font-bold sm:text-2xl">
              {farm.name}
            </h3>
            <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-white/90">
              <span className="flex items-center gap-1">
                <MapPin aria-hidden="true" className="size-3.5" />
                {farm.location}
              </span>
              <span className="flex items-center gap-1">
                <Star aria-hidden="true" className="size-3.5 fill-amber-400 text-amber-400" />
                {farm.rating.score} ({farm.rating.reviewsCount} reviews)
              </span>
              {farm.inspectionDate ? (
                <span className="flex items-center gap-1 text-emerald-300">
                  <ShieldCheck aria-hidden="true" className="size-3.5" />
                  Inspected: {farm.inspectionDate}
                </span>
              ) : null}
            </div>
          </div>
        </div>

        {/* Farm Description */}
        {farm.description ? (
          <p className="mt-4 text-xs leading-relaxed text-muted sm:text-sm">
            {farm.description}
          </p>
        ) : null}

        {/* Live IoT Telemetry Dashboard */}
        <div className="mt-5 rounded-xl border border-border bg-surface-secondary/60 p-4">
          <div className="flex items-center justify-between border-b border-separator/70 pb-2.5">
            <div className="flex items-center gap-2">
              <Radio aria-hidden="true" className="size-4 text-emerald-600 dark:text-emerald-400" />
              <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">
                Live IoT Telemetry
              </h4>
            </div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              {farm.telemetry.statusText}
            </span>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-lg bg-surface p-2.5 shadow-xs">
              <div className="flex items-center gap-1.5 text-[11px] text-muted">
                <Waves aria-hidden="true" className="size-3.5 text-accent" />
                <span>Moisture</span>
              </div>
              <p className="mt-1 text-sm font-bold text-foreground">
                {farm.telemetry.soilMoisture || "38% Optimal"}
              </p>
            </div>

            <div className="rounded-lg bg-surface p-2.5 shadow-xs">
              <div className="flex items-center gap-1.5 text-[11px] text-muted">
                <Sprout aria-hidden="true" className="size-3.5 text-accent" />
                <span>Soil pH</span>
              </div>
              <p className="mt-1 text-sm font-bold text-foreground">
                {farm.telemetry.soilPh || "6.6 Balanced"}
              </p>
            </div>

            <div className="rounded-lg bg-surface p-2.5 shadow-xs">
              <div className="flex items-center gap-1.5 text-[11px] text-muted">
                <Thermometer aria-hidden="true" className="size-3.5 text-accent" />
                <span>Canopy Temp</span>
              </div>
              <p className="mt-1 text-sm font-bold text-foreground">
                {farm.telemetry.canopyTemp || "25.0°C"}
              </p>
            </div>

            <div className="rounded-lg bg-surface p-2.5 shadow-xs">
              <div className="flex items-center gap-1.5 text-[11px] text-muted">
                <Clock aria-hidden="true" className="size-3.5 text-accent" />
                <span>Last Ping</span>
              </div>
              <p className="mt-1 text-sm font-bold text-foreground">
                {farm.telemetry.lastUpdated || "Just now"}
              </p>
            </div>
          </div>
        </div>

        {/* Active Batches Section */}
        {farm.batches && farm.batches.length > 0 ? (
          <div className="mt-5 space-y-2.5">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">
                Current Harvest Batches ({farm.batches.length})
              </h4>
              <span className="text-[11px] text-muted">Protected by BDT Escrow</span>
            </div>

            <div className="space-y-2">
              {farm.batches.map((batch) => (
                <div
                  key={batch.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-xl border border-border bg-surface p-3 transition-colors hover:border-accent/40"
                >
                  <div>
                    <p className="text-sm font-bold text-foreground">
                      {batch.cropName}
                    </p>
                    <p className="flex items-center gap-2 text-xs text-muted">
                      <span className="flex items-center gap-1">
                        <Calendar aria-hidden="true" className="size-3 text-muted" />
                        {batch.harvestWindow}
                      </span>
                      <span>•</span>
                      <span>Available: {batch.quantityAvailable}</span>
                    </p>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-3 pt-1 sm:pt-0">
                    <span className="text-sm font-extrabold text-[#0d3824] dark:text-emerald-300">
                      {batch.unitPrice}
                    </span>
                    <Button
                      size="sm"
                      variant="primary"
                      className="bg-[#0a3823] text-white hover:bg-[#072a1a] dark:bg-emerald-800"
                      onPress={() => setInquirySent(true)}
                    >
                      Pre-Order
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {/* Inquiry Notification */}
        {inquirySent ? (
          <div className="mt-4 flex items-center gap-2.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-800 dark:text-emerald-300">
            <CheckCircle2 aria-hidden="true" className="size-4 shrink-0" />
            <span>
              Pre-order inquiry submitted! A verified agronomist coordinator will contact you shortly.
            </span>
          </div>
        ) : null}

        {/* Modal Footer */}
        <div className="mt-6 flex justify-end gap-2.5 border-t border-separator pt-4">
          <Button
            variant="ghost"
            size="md"
            onPress={onClose}
            className="border border-border text-foreground hover:bg-surface-secondary"
          >
            Close
          </Button>
          <Button
            variant="primary"
            size="md"
            onPress={() => setInquirySent(true)}
            className="bg-[#0a3823] text-white hover:bg-[#072a1a] dark:bg-emerald-800"
          >
            Direct Farm Inquiry
          </Button>
        </div>
      </div>
    </div>
  );
}
