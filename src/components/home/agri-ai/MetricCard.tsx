"use client";

import { Droplet, Thermometer, Wind } from "lucide-react";
import { Tooltip } from "@heroui/react";
import type { TelemetryMetricItem } from "@/types/agri-ai";

interface MetricCardProps {
  metric: TelemetryMetricItem;
}

export default function MetricCard({ metric }: MetricCardProps) {
  const { label, icon, value, statusBadge, subtext, progressPercent, tooltipInfo } = metric;

  const renderIcon = () => {
    switch (icon) {
      case "droplet":
        return <Droplet aria-hidden="true" className="size-4 text-[#1b6b47] dark:text-emerald-400" />;
      case "thermometer":
        return <Thermometer aria-hidden="true" className="size-4 text-amber-600 dark:text-amber-400" />;
      case "wind":
        return <Wind aria-hidden="true" className="size-4 text-[#1b6b47] dark:text-emerald-400" />;
      default:
        return null;
    }
  };

  const getStatusBadgeStyle = () => {
    switch (statusBadge.variant) {
      case "warning":
        return "bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300 border-amber-200/60 dark:border-amber-900/50";
      case "info":
        return "bg-[#d8f2e2] text-[#135036] dark:bg-emerald-950/70 dark:text-emerald-300 border-[#c4e8d2] dark:border-emerald-800/40";
      case "success":
      default:
        return "bg-[#d8f2e2] text-[#135036] dark:bg-emerald-950/70 dark:text-emerald-300 border-[#c4e8d2] dark:border-emerald-800/40";
    }
  };

  const getProgressBarColor = () => {
    switch (statusBadge.variant) {
      case "warning":
        return "bg-amber-500 dark:bg-amber-400";
      case "info":
      case "success":
      default:
        return "bg-[#135036] dark:bg-emerald-400";
    }
  };

  const cardContent = (
    <div className="group flex flex-col justify-between rounded-2xl border border-[#d8ebe0] bg-[#edf7f1] p-3.5 hover:border-emerald-400/50 hover:bg-[#e7f4eb] dark:border-emerald-900/50 dark:bg-[#12271d] dark:hover:border-emerald-700/60 sm:p-4">
      {/* Top Header: Label & Icon */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-[#496557] dark:text-emerald-200/75 sm:text-[13px]">
          {label}
        </span>
        <span className="grid size-6 place-items-center rounded-lg bg-white/70 dark:bg-emerald-950/60">
          {renderIcon()}
        </span>
      </div>

      {/* Main Metric Value & Status Tag */}
      <div className="mt-2.5 flex items-baseline gap-2">
        <span className="text-2xl font-extrabold tracking-tight text-[#0a3826] dark:text-white sm:text-3xl">
          {value}
        </span>
        <span
          className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-semibold tracking-wide ${getStatusBadgeStyle()}`}
        >
          {statusBadge.label}
        </span>
      </div>

      {/* Progress Line */}
      <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-[#d6ecde] dark:bg-emerald-950/80">
        <div
          className={`h-full rounded-full ${getProgressBarColor()}`}
          style={{ width: `${Math.min(100, Math.max(10, progressPercent))}%` }}
        />
      </div>

      {/* Subtext Target/Delta */}
      <div className="mt-2 text-[11px] font-medium text-[#557365] dark:text-emerald-300/70 sm:text-xs">
        {subtext}
      </div>
    </div>
  );

  if (!tooltipInfo) {
    return cardContent;
  }

  return (
    <Tooltip delay={150}>
      <Tooltip.Trigger className="w-full text-left outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-2xl">
        {cardContent}
      </Tooltip.Trigger>
      <Tooltip.Content className="max-w-xs rounded-xl border border-[#cbe6d4] bg-white p-2.5 text-xs text-[#1e4e37] dark:border-emerald-800/60 dark:bg-[#102319] dark:text-emerald-100">
        <p className="font-semibold text-emerald-900 dark:text-emerald-200">{label} Sensor Node</p>
        <p className="mt-1 text-gray-600 dark:text-gray-300">{tooltipInfo}</p>
      </Tooltip.Content>
    </Tooltip>
  );
}
