"use client";

import { useState } from "react";
import { Card, Chip } from "@heroui/react";
import { Activity, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";
import type { AgriAiStationData } from "@/types/agri-ai";
import MetricCard from "./MetricCard";
import AdvisoryBanner from "./AdvisoryBanner";
import PriceForecastCard from "./PriceForecastCard";

interface TelemetryDashboardCardProps {
  station: AgriAiStationData;
  alternativeStations?: AgriAiStationData[];
}

export default function TelemetryDashboardCard({
  station: initialStation,
  alternativeStations = [],
}: TelemetryDashboardCardProps) {
  const [currentStation, setCurrentStation] = useState<AgriAiStationData>(initialStation);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const allStations = [initialStation, ...alternativeStations];

  const handleRefreshStream = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success(
        `Telemetry stream synced for ${currentStation.shortName}! Volumetric soil moisture and canopy readings up to date.`,
        {
          duration: 3500,
          icon: "📡",
          style: {
            borderRadius: "14px",
            background: "#0c3928",
            color: "#ffffff",
            fontSize: "13px",
          },
        }
      );
    }, 600);
  };

  const handleSwitchStation = (newStation: AgriAiStationData) => {
    setCurrentStation(newStation);
    toast.success(`Connected to telemetry station: ${newStation.stationId}`, {
      duration: 3000,
      icon: "🛰️",
      style: {
        borderRadius: "14px",
        background: "#0c3928",
        color: "#ffffff",
        fontSize: "13px",
      },
    });
  };

  return (
    <Card className="w-full rounded-3xl border border-[#d2e8db] bg-white p-5 shadow-xl shadow-emerald-950/5 transition-all duration-300 sm:p-7 dark:border-emerald-900/60 dark:bg-[#0c1c14] dark:shadow-black/40">
      {/* Top Station Header Row */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Left: Station Identity & Firmware/Battery Status */}
        <div className="flex items-center gap-3">
          {/* Pulsing Green Indicator */}
          <span className="relative flex size-2.5 shrink-0">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-75" />
            <span className="relative inline-flex size-2.5 rounded-full bg-emerald-600 dark:bg-emerald-400" />
          </span>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold tracking-tight text-[#0a3826] sm:text-base dark:text-white">
                {currentStation.stationId}
              </h3>

              {allStations.length > 1 && (
                <div className="hidden items-center gap-1 sm:flex">
                  {allStations.map((st) => (
                    <button
                      key={st.stationId}
                      type="button"
                      aria-label={`Switch to station ${st.shortName}`}
                      onClick={() => handleSwitchStation(st)}
                      className={`rounded-md px-1.5 py-0.5 text-[10px] font-semibold transition-colors ${
                        st.stationId === currentStation.stationId
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                          : "text-muted hover:bg-surface-secondary"
                      }`}
                    >
                      {st.shortName}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <p className="mt-0.5 text-xs text-[#527061] dark:text-emerald-300/70">
              {`Active Firmware ${currentStation.firmwareVersion} • Solar Battery: ${currentStation.solarBatteryPercent}%`}
            </p>
          </div>
        </div>

        {/* Right: Live Data Stream Pill Badge & Refresh Button */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Chip
            size="sm"
            className="flex items-center gap-1.5 rounded-full border border-[#bfe4cd] bg-[#d7f1e1] px-3 py-1 text-xs font-semibold text-[#145339] dark:border-emerald-800/40 dark:bg-emerald-950/70 dark:text-emerald-300"
          >
            <Activity aria-hidden="true" className="size-3 text-emerald-700 dark:text-emerald-400" />
            <span>{currentStation.statusLabel}</span>
          </Chip>

          <button
            type="button"
            aria-label="Refresh telemetry stream"
            onClick={handleRefreshStream}
            className="grid size-7 place-items-center rounded-full border border-[#cde4d6] text-[#1e4e37] transition-all hover:bg-[#e7f4eb] hover:text-[#0a3826] dark:border-emerald-800/50 dark:text-emerald-300 dark:hover:bg-emerald-950/60"
            title="Sync live telemetry"
          >
            <RefreshCw
              aria-hidden="true"
              className={`size-3.5 transition-transform duration-500 ${
                isRefreshing ? "animate-spin text-emerald-600" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Horizontal Divider */}
      <hr className="my-4 border-t border-[#e5f0e8] sm:my-5 dark:border-emerald-900/40" />

      {/* 3 Metric Cards Grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
        {currentStation.metrics.map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </div>

      {/* AgriAI Live Advisory Banner */}
      <AdvisoryBanner advisory={currentStation.advisory} />

      {/* Machine Learning Price Forecast Card */}
      <PriceForecastCard priceForecast={currentStation.priceForecast} />
    </Card>
  );
}
