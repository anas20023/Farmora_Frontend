"use client";

import { ShieldCheck, Cpu, ArrowDownRight, Sprout, Tractor, Sparkles } from "lucide-react";

interface MarketplaceHeroProps {
  stats: {
    totalListings: number;
    inStockCount: number;
    preOrderCount: number;
    verifiedFarmsCount: number;
    totalTonnageAvailable: number;
  };
}

export default function MarketplaceHero({ stats }: MarketplaceHeroProps) {
  return (
    <section className="relative border-b border-border bg-surface/50 backdrop-blur-sm">
      {/* Subtle top indicator bar */}
      <div className="border-b border-border/60 bg-surface-secondary/60 px-4 py-2 text-xs text-muted">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            <span className="font-medium text-foreground">Live Telemetry & Escrow Grid:</span>
            <span>240 IoT Sensor Probes Active across 12 Farming Districts</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
              <ShieldCheck className="size-3.5" />
              BDT Escrow Protected
            </span>
            <span className="hidden sm:inline text-muted">•</span>
            <span className="hidden sm:flex items-center gap-1">
              <Cpu className="size-3.5 text-accent" />
              IoT Harvest Monitoring
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-secondary px-3 py-1 text-xs font-semibold tracking-wide text-accent">
              <Sprout className="size-3.5" />
              <span>DIRECT-FROM-ORIGIN COMMODITIES</span>
            </div>
            <h1 className="font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Agricultural Marketplace
            </h1>
            <p className="text-sm sm:text-base text-muted leading-relaxed">
              Procure certified farm harvests directly from verified producers in Bangladesh.
              Order ready-to-dispatch lots or lock in future crop allocations with transparent soil telemetry and BDT escrow guarantee.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 lg:gap-4 shrink-0">
            <div className="rounded-md border border-border bg-surface p-3 sm:p-4 text-left shadow-xs">
              <div className="text-xs font-medium text-muted flex items-center justify-between">
                <span>Active Listings</span>
                <ArrowDownRight className="size-3.5 text-accent" />
              </div>
              <div className="mt-1 font-display text-xl sm:text-2xl font-bold text-foreground">
                {stats.totalListings}
              </div>
              <div className="text-[11px] text-muted">Across 7 categories</div>
            </div>

            <div className="rounded-md border border-border bg-surface p-3 sm:p-4 text-left shadow-xs">
              <div className="text-xs font-medium text-muted flex items-center justify-between">
                <span>Immediate Dispatch</span>
                <span className="size-2 rounded-full bg-emerald-500" />
              </div>
              <div className="mt-1 font-display text-xl sm:text-2xl font-bold text-foreground text-emerald-600 dark:text-emerald-400">
                {stats.inStockCount} Lots
              </div>
              <div className="text-[11px] text-muted">Ready for pickup/freight</div>
            </div>

            <div className="rounded-md border border-border bg-surface p-3 sm:p-4 text-left shadow-xs">
              <div className="text-xs font-medium text-muted flex items-center justify-between">
                <span>Pre-Order Harvests</span>
                <Sparkles className="size-3.5 text-amber-500" />
              </div>
              <div className="mt-1 font-display text-xl sm:text-2xl font-bold text-foreground text-amber-600 dark:text-amber-400">
                {stats.preOrderCount} Batches
              </div>
              <div className="text-[11px] text-muted">Lock in advance price</div>
            </div>

            <div className="rounded-md border border-border bg-surface p-3 sm:p-4 text-left shadow-xs">
              <div className="text-xs font-medium text-muted flex items-center justify-between">
                <span>Total Tonnage</span>
                <Tractor className="size-3.5 text-accent" />
              </div>
              <div className="mt-1 font-display text-xl sm:text-2xl font-bold text-foreground">
                {stats.totalTonnageAvailable} MT
              </div>
              <div className="text-[11px] text-muted">Available volume</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
