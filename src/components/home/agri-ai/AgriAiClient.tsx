"use client";

import type { AgriAiSectionData } from "@/types/agri-ai";
import TelemetryDashboardCard from "./TelemetryDashboardCard";
import { Cpu, Radio, ShieldCheck } from "lucide-react";

interface AgriAiClientProps {
  data: AgriAiSectionData;
}

export default function AgriAiClient({ data }: AgriAiClientProps) {
  const { badge, heading, description, station, alternativeStations } = data;

  return (
    <section
      id="telemetry"
      aria-labelledby="agri-ai-title"
      className="relative w-full bg-background py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
          {/* Left Column: Heading and Context */}
          <div className="flex flex-col items-start lg:col-span-5">
            <div className="mb-3 flex items-center gap-2">
              <span className="size-2 rounded-full bg-accent" />
              <span className="text-xs font-semibold text-muted">
                {badge}
              </span>
            </div>

            <h2
              id="agri-ai-title"
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-foreground"
            >
              {heading.line1} {heading.line2}
            </h2>

            <p className="mt-4 text-base leading-relaxed text-muted">
              {description}
            </p>

            <div className="mt-8 space-y-4 w-full">
              <div className="rounded bg-surface p-4 border border-border">
                <div className="flex items-center gap-2 text-foreground font-semibold text-sm">
                  <Radio className="size-4 text-accent" />
                  <span>Calibrated In-Soil Probes</span>
                </div>
                <p className="mt-1 text-xs text-muted leading-relaxed">
                  Sub-surface volumetric water content (VWC) and mineral salinity measured at 15cm and 45cm root depths.
                </p>
              </div>

              <div className="rounded bg-surface p-4 border border-border">
                <div className="flex items-center gap-2 text-foreground font-semibold text-sm">
                  <Cpu className="size-4 text-accent" />
                  <span>Ensemble Microclimate ML</span>
                </div>
                <p className="mt-1 text-xs text-muted leading-relaxed">
                  Predicts localized disease susceptibility, thermal degree hours, and optimal harvest windows.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Live Telemetry Dashboard */}
          <div className="w-full lg:col-span-7">
            <TelemetryDashboardCard
              station={station}
              alternativeStations={alternativeStations}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
