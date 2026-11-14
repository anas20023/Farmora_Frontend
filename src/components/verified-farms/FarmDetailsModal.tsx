"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  Compass,
  FileCheck2,
  Layers,
  Mail,
  MessageCircle,
  Phone,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Tractor,
  X,
} from "lucide-react";
import { Avatar, Button } from "@heroui/react";
import type { Farm } from "@/types/verified-farms";
import { VerificationStatus } from "@/types/verified-farms";

interface FarmDetailsModalProps {
  farm: Farm | null;
  isOpen: boolean;
  onClose: () => void;
}

type ModalTab = "overview" | "plots" | "activities";

export default function FarmDetailsModal({
  farm,
  isOpen,
  onClose,
}: FarmDetailsModalProps) {
  const [activeTab, setActiveTab] = useState<ModalTab>("overview");

  // Prevent background scrolling while modal is open
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  if (!isOpen || !farm) return null;

  const isApproved = farm.farmer.verificationStatus === VerificationStatus.APPROVED;
  const initials = farm.farmer.farmerName
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const marketplaceUrl = `/marketplace?farm=${encodeURIComponent(farm.id)}&farmName=${encodeURIComponent(farm.name)}`;

  // Aggregate all activities across plots for the activities tab
  const allActivities = farm.plots.flatMap((p) =>
    p.recentActivities.map((act) => ({
      ...act,
      plotName: p.plotName,
      plotNumber: p.plotNumber,
      cropName: p.currentCrop,
    }))
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="farm-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          setActiveTab("overview");
          onClose();
        }
      }}
    >
      <div className="relative my-auto w-full max-w-3xl overflow-hidden rounded border border-border bg-surface text-foreground shadow-2xl transition-colors max-h-[92vh] flex flex-col">
        {/* Sticky Header with Title and Close Button */}
        <div className="flex items-center justify-between border-b border-border bg-surface px-5 py-4 sm:px-6">
          <div className="flex items-center gap-2.5">
            <span className="grid size-8 place-items-center rounded bg-accent/15 text-accent">
              <Tractor className="size-4" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="farm-modal-title" className="font-display text-lg font-bold text-foreground sm:text-xl">
                  {farm.name}
                </h2>
                {isApproved && (
                  <span className="inline-flex items-center gap-1 rounded bg-accent/15 px-2 py-0.5 text-[10px] font-bold text-accent">
                    <ShieldCheck className="size-3" />
                    Verified
                  </span>
                )}
              </div>
              <p className="text-xs text-muted">
                {farm.locationName} · {farm.division} Division
              </p>
            </div>
          </div>

          <button
            type="button"
            aria-label="Close farm details modal"
            onClick={() => {
              setActiveTab("overview");
              onClose();
            }}
            className="flex size-8 items-center justify-center rounded border border-border bg-surface-secondary text-muted transition-colors hover:bg-surface-tertiary hover:text-foreground cursor-pointer"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-border bg-surface-secondary/40 px-5 sm:px-6">
          <button
            type="button"
            onClick={() => setActiveTab("overview")}
            className={`flex items-center gap-1.5 border-b-2 px-3 py-2.5 text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === "overview"
                ? "border-accent text-accent"
                : "border-transparent text-muted hover:text-foreground"
            }`}
          >
            <Compass className="size-3.5" />
            <span>Farm &amp; Farmer Overview</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("plots")}
            className={`flex items-center gap-1.5 border-b-2 px-3 py-2.5 text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === "plots"
                ? "border-accent text-accent"
                : "border-transparent text-muted hover:text-foreground"
            }`}
          >
            <Layers className="size-3.5" />
            <span>Active Plots ({farm.plots.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("activities")}
            className={`flex items-center gap-1.5 border-b-2 px-3 py-2.5 text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === "activities"
                ? "border-accent text-accent"
                : "border-transparent text-muted hover:text-foreground"
            }`}
          >
            <Activity className="size-3.5" />
            <span>Cultivation Activity Log ({allActivities.length})</span>
          </button>
        </div>

        {/* Scrollable Body Content */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-6 flex-1 text-sm">
          {/* TAB 1: OVERVIEW & FARMER PROFILE */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Cover Banner */}
              <div className="relative aspect-[21/9] w-full overflow-hidden rounded border border-border bg-surface-secondary">
                <Image
                  src={farm.coverImage}
                  alt={farm.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 800px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 text-white">
                  <div>
                    <span className="text-[11px] font-semibold text-accent/90 uppercase tracking-wider">
                      Physical Inspection Record
                    </span>
                    <p className="text-xs text-white/90">
                      Certificate #{farm.inspectionRecord.certificateNo}
                    </p>
                  </div>
                  <span className="rounded bg-black/60 px-2.5 py-1 text-xs font-medium backdrop-blur-xs">
                    Inspected on {farm.inspectionRecord.lastInspected}
                  </span>
                </div>
              </div>

              {/* Farmer Profile Card */}
              <div className="rounded border border-border bg-surface-secondary/40 p-4 sm:p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-3.5">
                    <Avatar size="lg" className="size-16 rounded-full ring-2 ring-background border border-border shrink-0">
                      <Avatar.Image src={farm.farmer.avatar} alt={farm.farmer.farmerName} />
                      <Avatar.Fallback className="text-base font-bold">{initials}</Avatar.Fallback>
                    </Avatar>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-display text-base font-bold text-foreground">
                          {farm.farmer.farmerName}
                        </h3>
                        <span className="inline-flex items-center gap-1 rounded bg-accent/15 px-2 py-0.5 text-[10px] font-semibold text-accent">
                          <ShieldCheck className="size-3" />
                          Approved Producer
                        </span>
                      </div>
                      <p className="text-xs text-muted mt-0.5">
                        {farm.farmer.accreditationBadge}
                      </p>
                      <div className="mt-1.5 flex flex-wrap items-center gap-3 text-xs text-muted">
                        <span>{farm.farmer.experienceYears} Years Agriculture</span>
                        <span>·</span>
                        <span>{farm.farmer.totalHarvestsDelivered} Verified Harvests</span>
                        <span>·</span>
                        <span className="flex items-center gap-1 text-foreground font-semibold">
                          <Sparkles className="size-3 text-amber-500 fill-amber-500" />
                          {farm.farmer.rating.score.toFixed(1)} ({farm.farmer.rating.reviewsCount} reviews)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Direct Contact Action Group */}
                  <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto shrink-0">
                    <a
                      href={`tel:${farm.farmer.phone}`}
                      className="inline-flex items-center gap-1.5 rounded border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:border-accent hover:text-accent cursor-pointer"
                    >
                      <Phone className="size-3.5" />
                      <span>{farm.farmer.phone}</span>
                    </a>

                    <a
                      href={`mailto:${farm.farmer.email}`}
                      className="inline-flex items-center gap-1.5 rounded border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:border-accent hover:text-accent cursor-pointer"
                    >
                      <Mail className="size-3.5" />
                      <span>Email</span>
                    </a>

                    {farm.farmer.whatsapp && (
                      <a
                        href={`https://wa.me/${farm.farmer.whatsapp.replace(/[^0-9]/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded border border-emerald-500/40 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 transition-colors hover:bg-emerald-500/20"
                      >
                        <MessageCircle className="size-3.5" />
                        <span>WhatsApp</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Farmer Bio */}
                <p className="mt-4 text-xs leading-relaxed text-muted border-t border-border/60 pt-3">
                  {farm.farmer.bio}
                </p>
              </div>

              {/* Farm Overview Key Metrics Grid */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted mb-3">
                  Farm Specifications &amp; Accreditation
                </h4>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 text-xs">
                  <div className="rounded border border-border bg-surface p-3">
                    <span className="text-muted block text-[11px]">Total Monitored Area</span>
                    <p className="font-display text-base font-bold text-foreground mt-0.5">
                      {farm.totalArea} {farm.areaUnit}
                    </p>
                    <span className="text-[10px] text-muted">Contiguous Farmland</span>
                  </div>

                  <div className="rounded border border-border bg-surface p-3">
                    <span className="text-muted block text-[11px]">Soil Composition</span>
                    <p className="font-display text-base font-bold text-foreground mt-0.5 truncate" title={farm.soilType}>
                      {farm.soilType}
                    </p>
                    <span className="text-[10px] text-accent font-medium">pH: {farm.soilPh}</span>
                  </div>

                  <div className="rounded border border-border bg-surface p-3">
                    <span className="text-muted block text-[11px]">Active Cultivation</span>
                    <p className="font-display text-base font-bold text-foreground mt-0.5">
                      {farm.activeCropCycles} Crop Cycles
                    </p>
                    <span className="text-[10px] text-muted">{farm.activePlotsCount} Active Plots</span>
                  </div>

                  <div className="rounded border border-border bg-surface p-3">
                    <span className="text-muted block text-[11px]">Network Status</span>
                    <p className="font-display text-base font-bold text-emerald-600 dark:text-emerald-400 mt-0.5 flex items-center gap-1.5">
                      <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                      {farm.status}
                    </p>
                    <span className="text-[10px] text-muted">IoT Nodes Reporting</span>
                  </div>
                </div>
              </div>

              {/* Cultivation Summary & Farming Practices */}
              <div className="rounded border border-border bg-surface p-4 space-y-3">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted">
                    Cultivation Methodology
                  </h4>
                  <p className="mt-1.5 text-xs text-foreground leading-relaxed">
                    {farm.cultivationSummary}
                  </p>
                </div>

                <div className="border-t border-border/60 pt-3">
                  <span className="text-[11px] font-semibold text-muted block mb-2">
                    Verified Agronomic Standards
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {farm.farmingPractices.map((practice) => (
                      <span
                        key={practice}
                        className="inline-flex items-center gap-1 rounded bg-accent/10 border border-accent/20 px-2.5 py-1 text-xs font-medium text-accent"
                      >
                        <CheckCircle2 className="size-3" />
                        {practice}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Inspection Purity Audit Record */}
                <div className="border-t border-border/60 pt-3 text-xs text-muted flex items-start gap-2">
                  <FileCheck2 className="size-4 text-accent shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-foreground">
                      Auditor: {farm.inspectionRecord.auditor}
                    </span>
                    <p className="text-[11px] mt-0.5">
                      Water test result: {farm.inspectionRecord.waterSourcePurity}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ACTIVE FARM PLOTS */}
          {activeTab === "plots" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted">
                  Showing detailed plot records for {farm.name}. All plots are GPS-tagged and soil-monitored.
                </p>
                <span className="text-xs font-semibold text-accent">
                  {farm.plots.length} Active Plots
                </span>
              </div>

              <div className="space-y-3">
                {farm.plots.map((plot) => (
                  <div
                    key={plot.id}
                    className="rounded border border-border bg-surface p-4 transition-all hover:border-accent/40"
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="rounded bg-surface-secondary px-2 py-0.5 text-xs font-bold text-foreground">
                            {plot.plotNumber}
                          </span>
                          <h4 className="font-display text-sm font-bold text-foreground">
                            {plot.plotName}
                          </h4>
                          <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-semibold text-accent">
                            {plot.cropCategory}
                          </span>
                        </div>
                        <p className="mt-1 font-semibold text-accent text-sm">
                          {plot.currentCrop}
                        </p>
                      </div>

                      {/* Cultivation status badge */}
                      <span className="self-start rounded border border-border bg-surface-secondary/70 px-2.5 py-1 text-xs font-medium text-foreground">
                        {plot.cultivationStatus}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-3">
                      <div className="flex justify-between text-[11px] text-muted mb-1">
                        <span>Cycle Maturity</span>
                        <span className="font-semibold text-foreground">
                          {plot.progressPercent}% · {plot.healthScore}
                        </span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-surface-secondary">
                        <div
                          className="h-full rounded-full bg-accent transition-all duration-500"
                          style={{ width: `${plot.progressPercent}%` }}
                        />
                      </div>
                    </div>

                    {/* Plot Meta Data Grid */}
                    <div className="mt-3.5 grid grid-cols-2 gap-2 text-xs sm:grid-cols-4 border-t border-border/50 pt-3">
                      <div>
                        <span className="text-[10px] text-muted block">Plot Area</span>
                        <span className="font-semibold text-foreground">{plot.area}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-muted block">Planting Date</span>
                        <span className="text-foreground">{plot.plantingDate}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-muted block">Expected Harvest</span>
                        <span className="font-semibold text-accent">{plot.expectedHarvestDate}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-muted block">Irrigation Mode</span>
                        <span className="text-foreground">{plot.irrigationType}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: CULTIVATION ACTIVITY LOG */}
          {activeTab === "activities" && (
            <div className="space-y-4">
              <p className="text-xs text-muted">
                Audited timeline of field operations, fertilizer amendments, and pest monitoring conducted across {farm.name}.
              </p>

              <div className="relative border-l-2 border-border/80 pl-4 ml-2 space-y-5">
                {allActivities.map((act) => (
                  <div key={act.id} className="relative group">
                    {/* Timeline Node Icon */}
                    <span className="absolute -left-[25px] top-1 grid size-4 place-items-center rounded-full bg-accent text-accent-foreground ring-4 ring-background">
                      <CheckCircle2 className="size-2.5" />
                    </span>

                    <div className="rounded border border-border bg-surface p-3.5 transition-colors hover:border-accent/40">
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded bg-accent/15 px-2 py-0.5 text-[10px] font-semibold text-accent">
                            {act.stage}
                          </span>
                          <span className="text-xs font-bold text-foreground">
                            {act.title}
                          </span>
                        </div>
                        <span className="flex items-center gap-1 text-[11px] text-muted">
                          <Calendar className="size-3" />
                          {act.date}
                        </span>
                      </div>

                      <p className="mt-1.5 text-xs text-muted leading-relaxed">
                        {act.description}
                      </p>

                      <div className="mt-2 flex flex-wrap items-center gap-3 text-[11px] text-muted border-t border-border/40 pt-2">
                        <span>
                          Target: <strong className="text-foreground">{act.plotName} ({act.plotNumber})</strong>
                        </span>
                        <span>·</span>
                        <span>Crop: <strong className="text-foreground">{act.cropName}</strong></span>
                        {act.method && (
                          <>
                            <span>·</span>
                            <span className="text-accent font-medium">Method: {act.method}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between border-t border-border bg-surface-secondary/40 px-5 py-4 sm:px-6">
          <div className="text-xs text-muted">
            Direct farmer connection guaranteed with Farmora buyer protection.
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onPress={() => {
                setActiveTab("overview");
                onClose();
              }}
              className="rounded border border-border bg-surface px-4 py-2 text-xs font-semibold text-foreground hover:bg-surface-secondary cursor-pointer"
            >
              Close
            </Button>

            <Link
              href={marketplaceUrl}
              onClick={() => {
                setActiveTab("overview");
                onClose();
              }}
              className="inline-flex items-center gap-1.5 rounded bg-accent px-4 py-2 text-xs font-semibold text-accent-foreground transition-all hover:bg-accent-hover"
            >
              <ShoppingBag className="size-3.5" />
              <span>Browse Farm Crops</span>
              <ArrowUpRight className="size-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
