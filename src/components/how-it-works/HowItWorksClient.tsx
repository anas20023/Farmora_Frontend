"use client";

import { Card, Tooltip } from "@heroui/react";
import {
  Clock,
  QrCode,
  Radio,
  ShieldCheck,
  Store,
  Truck,
} from "lucide-react";
import type {
  HowItWorksData,
  WorkflowBadgeItem,
  WorkflowStepItem,
} from "@/types/how-it-works";

interface HowItWorksClientProps {
  data: HowItWorksData;
}

export default function HowItWorksClient({ data }: HowItWorksClientProps) {
  const { header, steps } = data;

  const renderStepIcon = (iconType: WorkflowStepItem["icon"]) => {
    switch (iconType) {
      case "sensor":
        return <Radio className="size-5.5 text-[#134e3a] dark:text-emerald-300" />;
      case "store":
        return <Store className="size-5.5 text-[#134e3a] dark:text-emerald-300" />;
      case "delivery":
        return <Truck className="size-5.5 text-[#134e3a] dark:text-emerald-300" />;
      default:
        return null;
    }
  };

  const renderFooterIcon = (icon?: WorkflowBadgeItem["icon"]) => {
    switch (icon) {
      case "clock":
        return <Clock className="size-3.5 text-[#2d6a4f] dark:text-emerald-400" />;
      case "shield":
        return <ShieldCheck className="size-3.5 text-[#2d6a4f] dark:text-emerald-400" />;
      case "qr":
        return <QrCode className="size-3.5 text-[#2d6a4f] dark:text-emerald-400" />;
      default:
        return null;
    }
  };

  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-title"
      className="relative w-full border-b border-[#d8edd9] bg-[#eaf5ee] py-14 sm:py-20 lg:py-24 transition-colors duration-200 dark:border-emerald-950/70 dark:bg-[#091711]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header: Eyebrow, Main Title, Subtitle & Active Cycle Badge */}
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <span className="block text-[11px] font-bold uppercase tracking-[0.14em] text-[#2d6a4f] sm:text-xs dark:text-emerald-400">
              {header.eyebrow}
            </span>

            {/* Main Heading */}
            <h2
              id="how-it-works-title"
              className="mt-3 text-3xl font-bold tracking-tight text-[#0a3826] sm:text-4xl lg:text-5xl dark:text-[#f0fdf4]"
            >
              {header.title.line1}
              <br />
              {header.title.line2}
            </h2>

            {/* Subtitle Description */}
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#3a5d4e] sm:text-base dark:text-emerald-200/80">
              {header.description}
            </p>
          </div>

          {/* Active Cycle Badge */}
          <div className="shrink-0">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#cbe6d4] bg-white/70 px-4 py-1.5 text-xs font-semibold text-[#1e4e37] shadow-2xs backdrop-blur-xs transition-colors hover:bg-white dark:border-emerald-800/40 dark:bg-emerald-950/60 dark:text-emerald-200">
              <span className="size-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400 animate-pulse" />
              <span>{header.activeCycle}</span>
            </div>
          </div>
        </div>

        {/* Workflow 3-Step Cards Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:mt-16 md:grid-cols-3 lg:gap-8">
          {steps.map((step) => (
            <Card
              key={step.id}
              className="group relative flex flex-col justify-between rounded-[2rem] border border-[#d6ecde] bg-white/60 p-7 shadow-2xs backdrop-blur-xs transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:bg-white/85 hover:shadow-lg sm:p-8 dark:border-emerald-800/30 dark:bg-[#102319]/70 dark:hover:border-emerald-700/60 dark:hover:bg-[#12281e]"
            >
              <div>
                {/* Card Top Row: Step Icon & Big Step Number */}
                <div className="flex items-center justify-between">
                  <Tooltip delay={150}>
                    <Tooltip.Trigger>
                      <div className="grid size-12 cursor-pointer place-items-center rounded-2xl border border-white/60 bg-white shadow-2xs transition-transform duration-200 group-hover:scale-105 dark:border-emerald-700/30 dark:bg-[#163325]">
                        {renderStepIcon(step.icon)}
                      </div>
                    </Tooltip.Trigger>
                    {step.tooltipDetail ? (
                      <Tooltip.Content className="max-w-xs rounded-xl border border-[#cbe6d4] bg-white p-2.5 text-xs text-[#1e4e37] shadow-xl dark:border-emerald-800/60 dark:bg-[#102319] dark:text-emerald-100">
                        <p className="font-semibold text-emerald-900 dark:text-emerald-200">
                          {step.title}
                        </p>
                        <p className="mt-1 text-gray-600 dark:text-gray-300">
                          {step.tooltipDetail}
                        </p>
                      </Tooltip.Content>
                    ) : null}
                  </Tooltip>

                  <span className="select-none text-3xl font-bold tracking-tight text-[#a1c6b1] sm:text-4xl dark:text-emerald-800/50">
                    {step.stepNumber}
                  </span>
                </div>

                {/* Step Title */}
                <h3 className="mt-7 text-lg font-bold tracking-tight text-[#0a3826] sm:text-xl dark:text-white">
                  {step.title}
                </h3>

                {/* Step Description */}
                <p className="mt-3 text-xs leading-relaxed text-[#466657] sm:text-sm dark:text-emerald-200/70">
                  {step.description}
                </p>
              </div>

              {/* Step Footer: Verified Telemetry & Quality Markers */}
              <div className="mt-8 flex items-center justify-between border-t border-[#d8edd9]/70 pt-4 text-xs font-medium text-[#2d6a4f] dark:border-emerald-800/25 dark:text-emerald-300">
                <div className="flex items-center gap-1.5">
                  {renderFooterIcon(step.footerLeft.icon)}
                  <span>{step.footerLeft.text}</span>
                </div>
                <span className="font-semibold text-[#325a47] dark:text-emerald-300">
                  {step.footerRight}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
