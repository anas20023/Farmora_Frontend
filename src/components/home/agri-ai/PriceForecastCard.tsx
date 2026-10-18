"use client";

import { ArrowUpRight, TrendingUp } from "lucide-react";
import type { AgriAiStationData } from "@/types/agri-ai";

interface PriceForecastCardProps {
  priceForecast: AgriAiStationData["priceForecast"];
}

export default function PriceForecastCard({ priceForecast }: PriceForecastCardProps) {
  const { title, saturationIndex, currency, currentSpot, predictedMin, predictedMax, unit } =
    priceForecast;

  return (
    <div className="mt-4 flex flex-col justify-between gap-4 rounded-2xl border border-[#d8ebe0] bg-[#edf7f1] p-4 transition-all duration-200 hover:border-emerald-400/50 hover:bg-[#e8f5ec] sm:flex-row sm:items-center sm:p-5 dark:border-emerald-900/50 dark:bg-[#12271d] dark:hover:border-emerald-700/60">
      {/* Left Column: ML Forecast Info */}
      <div className="flex items-center gap-3.5">
        <div className="grid size-10 shrink-0 place-items-center rounded-xl border border-[#cde4d6] bg-white text-[#134e3a] shadow-2xs dark:border-emerald-800/60 dark:bg-[#1b3a2c] dark:text-emerald-300">
          <TrendingUp aria-hidden="true" className="size-5 stroke-[2]" />
        </div>
        <div className="min-w-0">
          <h4 className="text-xs font-bold text-[#0a3826] sm:text-sm dark:text-white">
            {title}
          </h4>
          <p className="mt-0.5 text-[11px] font-medium text-[#527061] sm:text-xs dark:text-emerald-200/70">
            {saturationIndex}
          </p>
        </div>
      </div>

      {/* Right Column: Spot & Predicted Price Block */}
      <div className="flex shrink-0 items-center justify-between gap-6 border-t border-[#d8ebe0] pt-3 sm:border-t-0 sm:pt-0 dark:border-emerald-900/40">
        {/* Current Spot Price */}
        <div className="flex flex-col items-start sm:items-end">
          <span className="text-[10px] font-semibold tracking-wider text-[#527061] uppercase dark:text-emerald-300/70 sm:text-[11px]">
            Current Spot
          </span>
          <div className="mt-0.5 flex items-baseline gap-0.5 font-bold text-[#0a3826] dark:text-white">
            <span className="text-sm text-emerald-800 dark:text-emerald-300">{currency}</span>
            <span className="text-base sm:text-lg">{currentSpot}</span>
            <span className="text-xs font-normal text-[#527061] dark:text-emerald-300/60">
              /{unit}
            </span>
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="hidden h-8 w-px bg-[#cde4d6] sm:block dark:bg-emerald-800/40" />

        {/* Predicted 14d Range */}
        <div className="flex flex-col items-start sm:items-end">
          <span className="text-[10px] font-semibold tracking-wider text-[#527061] uppercase dark:text-emerald-300/70 sm:text-[11px]">
            Predicted 14d
          </span>
          <div className="mt-0.5 flex items-baseline gap-1 font-bold text-[#134e3a] dark:text-emerald-300">
            <ArrowUpRight aria-hidden="true" className="size-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
            <span className="text-sm">{currency}</span>
            <span className="text-base sm:text-lg">
              {predictedMin}–{currency} {predictedMax}
            </span>
            <span className="text-xs font-normal text-[#527061] dark:text-emerald-300/60">
              /{unit}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
