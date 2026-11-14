"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  CheckCircle2,
  Compass,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Tractor,
} from "lucide-react";
import type { VerifiedFarmsDirectoryStats } from "@/types/verified-farms";

interface VerifiedFarmsHeroProps {
  stats: VerifiedFarmsDirectoryStats;
  onExploreClick?: () => void;
}

export default function VerifiedFarmsHero({
  stats,
  onExploreClick,
}: VerifiedFarmsHeroProps) {
  const handleScrollToCatalogue = () => {
    if (onExploreClick) {
      onExploreClick();
      return;
    }
    const element = document.getElementById("farms-catalogue");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-surface/40 via-background to-background py-12 sm:py-16 lg:py-20">
      {/* Subtle background ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-1/4 -z-10 h-96 w-96 rounded-full bg-accent/8 blur-3xl"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Heading, Description, CTA, Stats */}
          <div className="lg:col-span-7">
            {/* Overline badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
              <Sparkles className="size-3.5" />
              <span>BANGLADESH AUDITED PRODUCER NETWORK</span>
            </div>

            {/* Main Heading */}
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Discover Bangladesh&apos;s Verified Farms
            </h2>

            {/* Body */}
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
              Connect directly with trusted farmers whose soil biology, irrigation purity, and active crop cycles have been physically audited and continuously verified through Farmora&apos;s field inspection and IoT telemetry standards.
            </p>

            {/* CTAs */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleScrollToCatalogue}
                className="inline-flex items-center gap-2 rounded bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground shadow-xs transition-all hover:bg-accent-hover hover:shadow cursor-pointer"
              >
                <Compass className="size-4" />
                <span>Explore Verified Farms</span>
                <ArrowDown className="size-4 animate-bounce" />
              </button>

              <Link
                href="/marketplace"
                className="inline-flex items-center gap-2 rounded border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-surface-secondary"
              >
                <ShoppingBag className="size-4 text-accent" />
                <span>Browse Marketplace Crops</span>
              </Link>
            </div>

            {/* Key Stats Bar */}
            <div className="mt-10 grid grid-cols-2 gap-4 border-t border-border pt-8 sm:grid-cols-4">
              <div className="space-y-1">
                <p className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  {stats.totalFarms.toLocaleString()}+
                </p>
                <p className="text-xs font-medium text-muted">
                  Verified Farms
                </p>
              </div>

              <div className="space-y-1">
                <p className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  {stats.registeredFarmers.toLocaleString()}+
                </p>
                <p className="text-xs font-medium text-muted">
                  Registered Farmers
                </p>
              </div>

              <div className="space-y-1">
                <p className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  {stats.activeCropPlots.toLocaleString()}+
                </p>
                <p className="text-xs font-medium text-muted">
                  Active Crop Plots
                </p>
              </div>

              <div className="space-y-1">
                <p className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  {stats.monitoredAcreage}
                </p>
                <p className="text-xs font-medium text-muted">
                  Acreage Monitored
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Agricultural Visual Showcase */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              {/* Main Image Frame */}
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded border border-border bg-surface shadow-xl">
                <Image
                  src="/images/hero-farm-iot.jpg"
                  alt="Verified smart farm in Bangladesh with IoT sensor telemetry"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Floating Top Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-2 rounded bg-surface/90 px-3 py-1.5 text-xs font-semibold text-foreground backdrop-blur-xs shadow-xs border border-border/60">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                  </span>
                  <span>Live Telemetry Gateways Active</span>
                </div>

                {/* Bottom Image Overlay Card */}
                <div className="absolute bottom-3 left-3 right-3 rounded bg-surface/95 p-3.5 backdrop-blur-md border border-border/80 shadow-md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="grid size-9 place-items-center rounded bg-accent/15 text-accent">
                        <Tractor className="size-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-foreground">
                          Audited Organic & GAP Fields
                        </p>
                        <p className="text-[11px] text-muted">
                          Bogura · Cumilla · Rajshahi · Jashore · Rangpur
                        </p>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded bg-accent/10 px-2 py-0.5 text-[10px] font-bold text-accent">
                      <ShieldCheck className="size-3" />
                      100% Certified
                    </span>
                  </div>

                  <div className="mt-2.5 flex items-center justify-between border-t border-border/60 pt-2 text-[11px] text-muted">
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="size-3 text-emerald-500" />
                      Zero chemical pesticide residue
                    </span>
                    <span className="font-semibold text-foreground">
                      Trust Index 4.92 / 5.0
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
