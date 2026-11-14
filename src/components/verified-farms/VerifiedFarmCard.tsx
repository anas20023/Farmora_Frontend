"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Eye,
  Layers,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Sprout,
  Tractor,
} from "lucide-react";
import { Avatar, Button, Card } from "@heroui/react";
import type { Farm } from "@/types/verified-farms";
import { FarmStatus, VerificationStatus } from "@/types/verified-farms";

interface VerifiedFarmCardProps {
  farm: Farm;
  onViewDetails: (farm: Farm) => void;
}

export default function VerifiedFarmCard({
  farm,
  onViewDetails,
}: VerifiedFarmCardProps) {
  const isApproved = farm.farmer.verificationStatus === VerificationStatus.APPROVED;
  const isActive = farm.status === FarmStatus.ACTIVE;

  const initials = farm.farmer.farmerName
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const marketplaceUrl = `/marketplace?farm=${encodeURIComponent(farm.id)}&farmName=${encodeURIComponent(farm.name)}`;

  return (
    <Card
      data-ui="true"
      className="group flex flex-col justify-between overflow-hidden rounded border border-border bg-surface text-foreground transition-all duration-200 hover:border-accent/40 hover:shadow-md"
    >
      <div>
        {/* Cover Image & Overlaid Badges */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-secondary">
          <Image
            src={farm.coverImage}
            alt={farm.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

          {/* Top Floating Badges */}
          <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
            {/* Verification status badge */}
            {isApproved ? (
              <span className="inline-flex items-center gap-1 rounded bg-surface/90 px-2.5 py-1 text-[11px] font-semibold text-accent shadow-xs backdrop-blur-xs border border-border/50">
                <ShieldCheck className="size-3.5 text-accent" />
                <span>DAE Verified</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded bg-surface/90 px-2.5 py-1 text-[11px] font-semibold text-amber-600 shadow-xs backdrop-blur-xs">
                Under Review
              </span>
            )}

            {/* Farm Status badge */}
            <span className="inline-flex items-center gap-1 rounded bg-surface/90 px-2 py-1 text-[11px] font-medium text-foreground shadow-xs backdrop-blur-xs border border-border/50">
              <span
                className={`size-1.5 rounded-full ${
                  isActive ? "bg-emerald-500 animate-pulse" : "bg-neutral-400"
                }`}
              />
              <span>{isActive ? "Active Farm" : "Seasonal Hiatus"}</span>
            </span>
          </div>

          {/* Bottom Image Overlay: Practices Tag */}
          <div className="absolute bottom-2.5 left-2.5 flex flex-wrap gap-1.5">
            {farm.farmingPractices.slice(0, 2).map((practice) => (
              <span
                key={practice}
                className="rounded bg-black/60 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-xs"
              >
                {practice}
              </span>
            ))}
          </div>
        </div>

        {/* Card Header: Farm Name & Location */}
        <div className="p-5 pb-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-display text-lg font-bold text-foreground group-hover:text-accent transition-colors line-clamp-1">
                {farm.name}
              </h3>
              <div className="mt-1 flex items-center gap-1 text-xs text-muted">
                <MapPin className="size-3.5 shrink-0 text-accent" />
                <span className="truncate">
                  {farm.locationName} · {farm.division} Division
                </span>
              </div>
            </div>

            {/* Rating badge */}
            <div className="shrink-0 rounded border border-border bg-surface-secondary/70 px-2 py-1 text-right">
              <div className="flex items-center gap-1 text-xs font-bold text-foreground">
                <Sparkles className="size-3 text-amber-500 fill-amber-500" />
                <span>{farm.farmer.rating.score.toFixed(1)}</span>
              </div>
              <p className="text-[10px] text-muted">
                {farm.farmer.rating.reviewsCount} reviews
              </p>
            </div>
          </div>

          {/* Farmer Profile Mini Bar */}
          <div className="mt-4 flex items-center justify-between rounded border border-border/60 bg-surface-secondary/40 p-2.5">
            <div className="flex items-center gap-2.5">
              <Avatar size="sm" className="size-9 rounded-full ring-2 ring-background border border-border shrink-0">
                <Avatar.Image src={farm.farmer.avatar} alt={farm.farmer.farmerName} />
                <Avatar.Fallback className="text-xs font-semibold">{initials}</Avatar.Fallback>
              </Avatar>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="truncate text-xs font-semibold text-foreground">
                    {farm.farmer.farmerName}
                  </p>
                  <ShieldCheck className="size-3 shrink-0 text-emerald-600" />
                </div>
                <p className="text-[11px] text-muted">
                  {farm.farmer.experienceYears} yrs farming · {farm.farmer.totalHarvestsDelivered} deliveries
                </p>
              </div>
            </div>

            {/* Quick Contact Icons */}
            <div className="flex items-center gap-1 shrink-0">
              <a
                href={`tel:${farm.farmer.phone}`}
                aria-label={`Call ${farm.farmer.farmerName}`}
                title={`Call ${farm.farmer.phone}`}
                className="flex size-7 items-center justify-center rounded border border-border bg-surface text-muted transition-colors hover:border-accent hover:text-accent"
              >
                <Phone className="size-3.5" />
              </a>
              <a
                href={`mailto:${farm.farmer.email}`}
                aria-label={`Email ${farm.farmer.farmerName}`}
                title={`Email ${farm.farmer.email}`}
                className="flex size-7 items-center justify-center rounded border border-border bg-surface text-muted transition-colors hover:border-accent hover:text-accent"
              >
                <Mail className="size-3.5" />
              </a>
            </div>
          </div>

          {/* Farmer Short Bio */}
          <p className="mt-2.5 text-xs text-muted line-clamp-2 leading-relaxed">
            {farm.farmer.bio}
          </p>

          {/* Farm Specs Table */}
          <div className="mt-3.5 grid grid-cols-2 gap-2 text-xs">
            <div className="rounded border border-border/40 bg-surface-secondary/30 p-2">
              <span className="text-[10px] font-medium text-muted flex items-center gap-1">
                <Layers className="size-3 text-accent" />
                Total Farm Size
              </span>
              <p className="mt-0.5 font-semibold text-foreground">
                {farm.totalArea} {farm.areaUnit}
              </p>
            </div>

            <div className="rounded border border-border/40 bg-surface-secondary/30 p-2">
              <span className="text-[10px] font-medium text-muted flex items-center gap-1">
                <Sprout className="size-3 text-accent" />
                Soil Composition
              </span>
              <p className="mt-0.5 font-semibold text-foreground truncate" title={farm.soilType}>
                {farm.soilType}
              </p>
            </div>
          </div>

          {/* Active Crops Summary */}
          <div className="mt-3">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-semibold text-muted flex items-center gap-1">
                <Tractor className="size-3 text-accent" />
                Active Crops & Plots ({farm.activePlotsCount} Plots)
              </span>
              <span className="text-accent font-medium">
                {farm.activeCropCycles} Active Cycles
              </span>
            </div>

            <div className="mt-2 flex flex-wrap gap-1.5">
              {farm.activeCrops.map((crop) => (
                <span
                  key={crop}
                  className="rounded-full border border-border bg-surface-secondary/60 px-2.5 py-0.5 text-[11px] font-medium text-foreground"
                >
                  {crop}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Card Action Buttons Footer */}
      <div className="p-5 pt-0 border-t border-border/50 mt-3">
        <div className="pt-3 grid grid-cols-2 gap-2">
          {/* View Farm Details Modal Trigger */}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onPress={() => onViewDetails(farm)}
            className="flex items-center justify-center gap-1.5 rounded border border-border bg-surface py-2 text-xs font-semibold text-foreground transition-colors hover:bg-surface-secondary cursor-pointer"
          >
            <Eye className="size-3.5 text-muted" />
            <span>Farm Details</span>
          </Button>

          {/* Browse Farm Crops in Marketplace */}
          <Link
            href={marketplaceUrl}
            className="flex items-center justify-center gap-1.5 rounded bg-accent py-2 text-xs font-semibold text-accent-foreground transition-all hover:bg-accent-hover"
          >
            <ShoppingBag className="size-3.5" />
            <span>Browse Crops</span>
            <ArrowUpRight className="size-3" />
          </Link>
        </div>
      </div>
    </Card>
  );
}
