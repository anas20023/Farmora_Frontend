"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button, Card, Chip, Tooltip } from "@heroui/react";
import toast from "react-hot-toast";
import {
  ArrowRight,
  Banknote,
  CheckCircle2,
  Leaf,
  Radio,
  ShieldCheck,
  ShoppingCart,
  Sprout,
  Timer,
  Tractor,
  TrendingUp,
  X,
  Zap,
} from "lucide-react";
import type { HeroData, KpiMetricItem } from "@/types/hero";

interface HeroClientProps {
  data: HeroData;
}

export default function HeroClient({ data }: HeroClientProps) {
  const router = useRouter();
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);
  const [reserveKg, setReserveKg] = useState<number>(50);

  const {
    telemetryPill,
    pipelineBadge,
    headline,
    description,
    primaryAction,
    secondaryAction,
    quickStats,
    preview,
    kpiMetrics,
  } = data;

  const handleReserveConfirm = () => {
    toast.success(
      `Pre-order confirmed for ${reserveKg}kg of ${preview.plot.title.split("•")[1]?.trim() || "Batch"}! Escrow smart contract initiated.`,
      {
        duration: 4500,
        icon: "🌱",
        style: {
          borderRadius: "12px",
          background: "#063b28",
          color: "#fff",
          fontSize: "14px",
        },
      }
    );
    setIsReserveModalOpen(false);
  };

  const renderKpiIcon = (iconType: KpiMetricItem["icon"]) => {
    switch (iconType) {
      case "shield":
        return <ShieldCheck className="size-5 text-emerald-700 dark:text-emerald-400" />;
      case "payout":
        return <Banknote className="size-5 text-emerald-700 dark:text-emerald-400" />;
      case "tractor":
        return <Tractor className="size-5 text-emerald-700 dark:text-emerald-400" />;
      case "timer":
        return <Timer className="size-5 text-amber-600 dark:text-amber-400" />;
      case "iot":
        return <Radio className="size-5 text-emerald-700 dark:text-emerald-400" />;
      default:
        return null;
    }
  };

  const renderSecondaryBadge = (item: KpiMetricItem) => {
    if (!item.secondaryBadge) return null;

    switch (item.secondaryBadge.type) {
      case "trend":
        return <TrendingUp className="size-4.5 text-emerald-700 dark:text-emerald-400" />;
      case "leaf":
        return <Leaf className="size-4 text-emerald-700 dark:text-emerald-400" />;
      case "dot":
        return (
          <span className="relative flex size-2.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-75" />
            <span className="relative inline-flex size-2.5 rounded-full bg-emerald-600" />
          </span>
        );
      case "text":
        return item.icon === "timer" ? (
          <span className="inline-block rounded bg-amber-100/90 px-2 py-0.5 text-[11px] font-semibold text-amber-800 dark:bg-amber-950/70 dark:text-amber-300">
            {item.secondaryBadge.text}
          </span>
        ) : (
          <span className="inline-block rounded bg-emerald-100/80 px-2 py-0.5 text-[11px] font-semibold text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300">
            {item.secondaryBadge.text}
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <section
      aria-label="Farmora Platform Hero"
      className="relative w-full border-b border-[#d8edd9] bg-[#eaf5ee] py-8 sm:py-12 lg:py-16 transition-colors duration-200 dark:border-emerald-950/70 dark:bg-[#091711]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Grid: Left Value Proposition & Right Telemetry Visual */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-10">
          {/* Left Column: Headlines, Actions, and Quick Stats */}
          <div className="flex flex-col items-start lg:col-span-6 xl:col-span-6">
            {/* Top Telemetry Active Pill */}
            <Tooltip delay={150}>
              <Tooltip.Trigger>
                <div
                  role="status"
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#cbe6d4] bg-[#dcefe3]/80 px-3.5 py-1 text-xs font-medium text-[#1e4e37] shadow-2xs transition-colors hover:bg-[#d4ecdc] dark:border-emerald-800/40 dark:bg-emerald-950/60 dark:text-emerald-200"
                >
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                    <span className="relative inline-flex size-2 rounded-full bg-emerald-700 dark:bg-emerald-400" />
                  </span>
                  <span className="truncate">{telemetryPill.text}</span>
                </div>
              </Tooltip.Trigger>
              <Tooltip.Content className="max-w-xs rounded-xl border border-[#cbe6d4] bg-white p-2.5 text-xs text-[#1e4e37] shadow-xl dark:border-emerald-800/60 dark:bg-[#102319] dark:text-emerald-100">
                <p className="font-semibold text-emerald-900 dark:text-emerald-200">
                  Live Edge Telemetry
                </p>
                <p className="mt-1 text-gray-600 dark:text-gray-300">
                  Real-time moisture, pH, and solar canopy sensors streaming telemetry every 60 seconds from Rajshahi, Bogura, and Narayanganj agro clusters.
                </p>
              </Tooltip.Content>
            </Tooltip>

            {/* Direct Farm-to-Enterprise Pipeline Badge */}
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#c1e2ce] bg-[#e3f4ea]/70 px-3.5 py-1 text-xs font-medium text-[#1b4332] dark:border-emerald-800/50 dark:bg-emerald-950/40 dark:text-emerald-200 sm:text-sm">
              <Leaf aria-hidden="true" className="size-3.5 text-[#1b4332] dark:text-emerald-300" />
              <span>{pipelineBadge.text}</span>
            </div>

            {/* Main Headline */}
            <h1 className="mt-5 text-3xl font-bold tracking-tight text-[#0a3826] sm:text-5xl lg:text-[3.25rem] lg:leading-[1.12] dark:text-[#f0fdf4]">
              {headline.line1}
              <br />
              {headline.line2}
            </h1>

            {/* Body Description */}
            <p className="mt-4.5 max-w-xl text-sm leading-relaxed text-[#325244] sm:text-base md:text-[17px] dark:text-emerald-200/80">
              {description}
            </p>

            {/* Primary & Secondary Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5 sm:gap-4">
              {/* Primary Action Button: Browse Marketplace */}
              <Button
                size="lg"
                onPress={() => router.push(primaryAction.href)}
                aria-label={primaryAction.ariaLabel}
                className="group flex h-12 items-center justify-center gap-2 rounded-2xl bg-[#134e3a] px-6 text-sm font-semibold text-white shadow-md shadow-emerald-950/15 transition-all duration-200 hover:bg-[#0c3829] hover:shadow-lg focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                <span>{primaryAction.label}</span>
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 text-white transition-transform duration-200 group-hover:translate-x-1"
                />
              </Button>

              {/* Secondary Action Button: Join as Farmer with Free IoT kit badge */}
              <Button
                size="lg"
                variant="outline"
                onPress={() => router.push(secondaryAction.href)}
                aria-label={secondaryAction.ariaLabel}
                className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-[#cce3d6] bg-white px-5 text-sm font-medium text-[#134e3a] shadow-2xs transition-all duration-200 hover:border-[#b4d6c0] hover:bg-[#f6fbf8] focus-visible:ring-2 focus-visible:ring-emerald-400 dark:border-emerald-800/60 dark:bg-[#12251c] dark:text-emerald-200 dark:hover:bg-[#183326]"
              >
                <Sprout aria-hidden="true" className="size-4.5 text-[#134e3a] dark:text-emerald-400" />
                <span>{secondaryAction.label}</span>
                {secondaryAction.badge ? (
                  <span className="ml-1 rounded-full bg-[#bbf2d6] px-2 py-0.5 text-xs font-semibold text-[#0e4833] dark:bg-emerald-800/60 dark:text-emerald-100">
                    {secondaryAction.badge}
                  </span>
                ) : null}
              </Button>
            </div>

            {/* 3 Quick Stats Row */}
            <div className="mt-10 grid w-full max-w-lg grid-cols-3 gap-4 pt-2">
              {quickStats.map((stat) => (
                <div key={stat.id} className="flex flex-col">
                  <span className="text-2xl font-bold tracking-tight text-[#0a3826] sm:text-3xl dark:text-emerald-100">
                    {stat.value}
                  </span>
                  <span className="mt-1 text-xs font-medium text-[#466657] sm:text-sm dark:text-emerald-300/70">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Hero Visual with IoT Telemetry Overlay Cards */}
          <div className="relative w-full lg:col-span-6 xl:col-span-6">
            <div className="relative aspect-4/3 w-full overflow-hidden rounded-3xl border border-emerald-900/15 bg-emerald-950/20 shadow-2xl sm:rounded-[2.25rem] dark:border-emerald-700/30 dark:shadow-black/60">
              {/* Background Farm & IoT Sensor Image */}
              <Image
                src={preview.imageSrc}
                alt={preview.imageAlt}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                className="object-cover object-center transition-transform duration-700 hover:scale-103"
              />

              {/* Ambient Glass Vignette for contrast */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10"
              />

              {/* Floating Overlay 1: Top-Left Plot Telemetry Card */}
              <div className="absolute left-3.5 top-3.5 z-20 sm:left-5 sm:top-5">
                <div className="flex items-center gap-3 rounded-2xl border border-white/70 bg-white/95 p-2 px-3 shadow-xl backdrop-blur-md sm:p-2.5 sm:px-3.5 dark:border-emerald-700/40 dark:bg-[#102319]/95">
                  <div className="grid size-8.5 place-items-center rounded-xl bg-[#e3f4ea] text-[#144d37] sm:size-9 dark:bg-emerald-900/60 dark:text-emerald-300">
                    <Sprout aria-hidden="true" className="size-4.5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-gray-900 sm:text-sm dark:text-white">
                      {preview.plot.title}
                    </h3>
                    <p className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 sm:text-xs dark:text-emerald-400">
                      <span className="size-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400" />
                      Moisture: {preview.plot.moisture} • {preview.plot.status}
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Overlay 2: Upper-Right AgriAI Alert Card */}
              <div className="absolute right-3.5 top-14 z-20 sm:right-5 sm:top-18">
                <div className="flex flex-col rounded-2xl border border-white/70 bg-white/95 p-3 shadow-xl backdrop-blur-md dark:border-emerald-700/40 dark:bg-[#102319]/95">
                  {/* AgriAI Alert Badge */}
                  <div className="mb-1.5 flex justify-end">
                    <span className="rounded-md bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-800 dark:bg-amber-950/70 dark:text-amber-300">
                      {preview.alert.badge}
                    </span>
                  </div>

                  {/* Main Alert Content */}
                  <div className="flex items-center gap-2.5">
                    <div className="grid size-8 place-items-center rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-950/60 dark:text-orange-400">
                      <Zap aria-hidden="true" className="size-4.5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 sm:text-sm dark:text-white">
                        {preview.alert.title}
                      </h4>
                      <p className="text-[11px] font-medium text-gray-500 dark:text-gray-400">
                        {preview.alert.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Overlay 3: Bottom Reservation Banner */}
              <div className="absolute bottom-3.5 left-3.5 right-3.5 z-20 sm:bottom-4 sm:left-4 sm:right-4">
                <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/70 bg-white/95 p-2.5 px-3 shadow-2xl backdrop-blur-md sm:p-3 sm:px-4 dark:border-emerald-700/40 dark:bg-[#102319]/95">
                  {/* Left: Cart Icon and Batch Info */}
                  <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
                    <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#144d37] text-white">
                      <ShoppingCart aria-hidden="true" className="size-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-gray-950 sm:text-base dark:text-white">
                          {preview.reservation.currencySymbol} {preview.reservation.pricePerKg}
                          <span className="text-xs font-normal text-gray-500 dark:text-gray-400">/kg</span>
                        </span>
                        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-medium text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300">
                          {preview.reservation.preOrdersCount} Pre-orders
                        </span>
                      </div>
                      <p className="truncate text-[11px] font-medium text-gray-500 dark:text-gray-400">
                        {preview.reservation.clusterName} • {preview.reservation.batchNumber}
                      </p>
                    </div>
                  </div>

                  {/* Right: Reserve Button */}
                  <Button
                    size="sm"
                    onPress={() => setIsReserveModalOpen(true)}
                    className="shrink-0 rounded-xl bg-[#144d37] px-4 py-2 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-[#0c3829] focus-visible:ring-2 focus-visible:ring-emerald-400 sm:text-sm"
                  >
                    Reserve
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom KPI Metric Cards Row (5 Cards) */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-5 sm:mt-12">
          {kpiMetrics.map((item) => (
            <Card
              key={item.id}
              className="group flex flex-col justify-between rounded-2xl border border-[#d6ecde] bg-white p-4 shadow-2xs transition-all duration-200 hover:border-emerald-300 hover:shadow-md sm:p-5 dark:border-emerald-800/40 dark:bg-[#102319] dark:hover:border-emerald-700/60"
            >
              {/* Card Header Row: Icon & Status / Trend Indicator */}
              <div className="flex items-center justify-between">
                <span className="grid size-9 place-items-center rounded-xl bg-[#e3f4ea]/80 dark:bg-emerald-950/60">
                  {renderKpiIcon(item.icon)}
                </span>
                <div>{renderSecondaryBadge(item)}</div>
              </div>

              {/* Card Body: Metric Value and Label */}
              <div className="mt-4">
                <div className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
                  {item.value}
                </div>
                <div className="mt-1 text-xs font-medium text-gray-500 sm:text-sm dark:text-gray-400">
                  {item.label}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Interactive Reservation Modal */}
      {isReserveModalOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="reserve-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsReserveModalOpen(false);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs"
        >
          <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-[#cce3d6] bg-white p-6 shadow-2xl dark:border-emerald-800/50 dark:bg-[#102319]">
            {/* Close Button */}
            <button
              type="button"
              aria-label="Close reservation modal"
              onClick={() => setIsReserveModalOpen(false)}
              className="absolute right-4 top-4 rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-emerald-900/50 dark:hover:text-gray-200"
            >
              <X className="size-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-2xl bg-[#144d37] text-white">
                <ShoppingCart className="size-6" />
              </span>
              <div>
                <h3
                  id="reserve-modal-title"
                  className="text-lg font-bold text-gray-900 dark:text-white"
                >
                  Reserve Crop Batch
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {preview.reservation.clusterName} • {preview.reservation.batchNumber}
                </p>
              </div>
            </div>

            {/* Batch Telemetry Snapshot */}
            <div className="mt-5 rounded-2xl border border-emerald-100 bg-[#f4faf6] p-3.5 text-xs text-emerald-900 dark:border-emerald-800/30 dark:bg-emerald-950/40 dark:text-emerald-200">
              <div className="flex items-center justify-between font-semibold">
                <span>{preview.plot.title}</span>
                <span className="rounded bg-emerald-200/70 px-1.5 py-0.5 text-[11px] dark:bg-emerald-800/60">
                  Moisture: {preview.plot.moisture}
                </span>
              </div>
              <p className="mt-1 text-gray-600 dark:text-gray-300">
                Predicted harvest in 6 days. Sugar Brix index optimal at 4.8. Locked in escrow at{" "}
                <span className="font-bold text-emerald-800 dark:text-emerald-300">
                  {preview.reservation.currencySymbol} {preview.reservation.pricePerKg}/kg
                </span>
                .
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="mt-5">
              <label
                htmlFor="quantity-slider"
                className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300"
              >
                Reservation Quantity (kg)
              </label>
              <div className="mt-2 flex items-center gap-3">
                <input
                  id="quantity-slider"
                  type="range"
                  min="10"
                  max="500"
                  step="10"
                  value={reserveKg}
                  onChange={(e) => setReserveKg(Number(e.target.value))}
                  className="h-2 w-full cursor-pointer accent-[#144d37]"
                />
                <span className="w-16 rounded-xl border border-gray-200 bg-gray-50 py-1.5 text-center text-sm font-bold text-gray-900 dark:border-emerald-800 dark:bg-emerald-950 dark:text-white">
                  {reserveKg}kg
                </span>
              </div>
              <div className="mt-2 flex justify-between text-xs text-gray-500">
                <span>Min: 10kg</span>
                <span>Est. Total: {preview.reservation.currencySymbol} {(reserveKg * preview.reservation.pricePerKg).toLocaleString()}</span>
                <span>Max: 500kg</span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="mt-6 flex items-center justify-end gap-2.5">
              <Button
                variant="ghost"
                size="md"
                onPress={() => setIsReserveModalOpen(false)}
                className="rounded-xl border border-gray-200 dark:border-emerald-800"
              >
                Cancel
              </Button>
              <Button
                size="md"
                onPress={handleReserveConfirm}
                className="rounded-xl bg-[#144d37] px-5 font-semibold text-white hover:bg-[#0c3829]"
              >
                Confirm Pre-order
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
