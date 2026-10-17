"use client";

import type { AgriAiSectionData } from "@/types/agri-ai";
import FeatureCard from "./FeatureCard";
import TelemetryDashboardCard from "./TelemetryDashboardCard";

interface AgriAiClientProps {
  data: AgriAiSectionData;
}

export default function AgriAiClient({ data }: AgriAiClientProps) {
  const { badge, heading, description, features, station, alternativeStations } = data;

  return (
    <section
      id="agri-ai"
      aria-labelledby="agri-ai-title"
      className="relative w-full border-b border-[#d8edd9] bg-[#eaf5ee] py-14 sm:py-20 lg:py-24 transition-colors duration-200 dark:border-emerald-950/70 dark:bg-[#091711]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Telemetry Engine Value Proposition */}
          <div className="flex flex-col items-start lg:col-span-5">
            {/* Top Badge: AgriAI Telemetry Engine */}
            <div className="inline-flex items-center rounded-full border border-[#cbe6d4] bg-[#dcefe3]/80 px-3.5 py-1 text-xs font-semibold text-[#1e4e37] shadow-2xs dark:border-emerald-800/50 dark:bg-emerald-950/60 dark:text-emerald-200">
              {badge}
            </div>

            {/* Main Headline */}
            <h2
              id="agri-ai-title"
              className="mt-4 text-3xl font-extrabold tracking-tight text-[#0a3826] sm:text-4xl lg:text-[2.75rem] lg:leading-[1.14] dark:text-[#f0fdf4]"
            >
              {heading.line1}
              <br />
              {heading.line2}
            </h2>

            {/* Description Body */}
            <p className="mt-4 text-sm leading-relaxed text-[#3d5a4c] sm:text-base dark:text-emerald-200/80">
              {description}
            </p>

            {/* 2 Feature Cards Stack */}
            <div className="mt-6 flex w-full flex-col gap-3.5 sm:mt-8 sm:gap-4">
              {features.map((feature) => (
                <FeatureCard key={feature.id} feature={feature} />
              ))}
            </div>
          </div>

          {/* Right Column: Live Telemetry & AI Advisory Dashboard Card */}
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
