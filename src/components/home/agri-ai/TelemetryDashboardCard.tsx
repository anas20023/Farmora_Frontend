"use client";

import { useState } from "react";
import { Activity, Droplet, RefreshCw, Thermometer, Wind, ShieldAlert, Cpu } from "lucide-react";
import toast from "react-hot-toast";
import type { AgriAiStationData } from "@/types/agri-ai";

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
        `Telemetry stream synced: ${currentStation.shortName} · Soil moisture 61% · Optimal`,
        {
          duration: 3000,
          style: {
            borderRadius: "4px",
            background: "#0c7866",
            color: "#ffffff",
            fontSize: "13px",
          },
        }
      );
    }, 400);
  };

  const handleSwitchStation = (newStation: AgriAiStationData) => {
    setCurrentStation(newStation);
    toast.success(`Connected to telemetry node: ${newStation.stationId}`, {
      duration: 2500,
      style: {
        borderRadius: "4px",
        background: "#0c7866",
        color: "#ffffff",
        fontSize: "13px",
      },
    });
  };

  return (
    <div data-ui="true" className="w-full rounded bg-surface p-6 sm:p-8 text-foreground border border-border">
      {/* Node Identity and Control */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-accent" />
            <span className="font-display text-lg font-bold text-foreground">
              {currentStation.stationId}
            </span>
            <span className="text-xs text-muted">
              ({currentStation.shortName})
            </span>
          </div>
          <div className="text-xs text-muted mt-1">
            Firmware {currentStation.firmwareVersion} · Solar Battery {currentStation.solarBatteryPercent}% · Solar PV Active
          </div>
        </div>

        <div className="flex items-center gap-2">
          {allStations.map((st) => (
            <button
              key={st.stationId}
              type="button"
              onClick={() => handleSwitchStation(st)}
              className={`rounded px-2.5 py-1 text-xs font-medium transition-colors ${
                st.stationId === currentStation.stationId
                  ? "bg-accent text-accent-foreground"
                  : "bg-surface-secondary text-muted hover:text-foreground"
              }`}
            >
              {st.shortName}
            </button>
          ))}
          <button
            type="button"
            onClick={handleRefreshStream}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 rounded border border-border bg-surface px-2.5 py-1 text-xs font-medium text-foreground hover:bg-surface-secondary"
          >
            <RefreshCw className={`size-3 ${isRefreshing ? "animate-spin" : ""}`} />
            <span>Sync</span>
          </button>
        </div>
      </div>

      {/* Telemetry Metrics Grid */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {currentStation.metrics.map((metric) => (
          <div key={metric.label} className="rounded bg-surface-secondary p-4">
            <div className="flex items-center justify-between text-xs text-muted">
              <span>{metric.label}</span>
              <span className="font-medium text-accent">{metric.statusBadge.label}</span>
            </div>
            <div className="mt-2 font-display text-2xl font-bold text-foreground">
              {metric.value}
            </div>
            <div className="mt-1 text-xs text-muted">
              {metric.subtext}
            </div>
          </div>
        ))}
      </div>

      {/* AgriAI Crop Risk & Yield Prediction Panel */}
      <div className="mt-6 rounded bg-surface-secondary/70 p-5 border border-rule">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cpu className="size-4 text-accent" />
            <span className="font-display text-base font-bold text-foreground">
              AgriAI Real-time Advisory
            </span>
          </div>
          <span className="text-xs font-semibold text-accent">
            {currentStation.advisory.confidence} ML Confidence
          </span>
        </div>

        <p className="mt-2 text-sm text-muted leading-relaxed">
          {currentStation.advisory.message}
        </p>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 pt-3 text-xs text-muted">
          <span>Advisory Category: {currentStation.advisory.badge}</span>
          <span>Forecast: {currentStation.priceForecast.title} ({currentStation.priceForecast.currency} {currentStation.priceForecast.currentSpot} {currentStation.priceForecast.unit})</span>
        </div>
      </div>

      {/* Advisory Legal Disclaimer */}
      <div className="mt-4 flex items-start gap-2 text-xs text-muted">
        <ShieldAlert className="size-4 shrink-0 text-muted" />
        <span>
          Telemetry readings are calibrated at 15-minute intervals. Agricultural decisions should take into account localized weather forecasts.
        </span>
      </div>
    </div>
  );
}
