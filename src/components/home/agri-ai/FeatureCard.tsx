"use client";

import { Droplets, TrendingUp } from "lucide-react";
import type { AgriAiFeatureItem } from "@/types/agri-ai";

interface FeatureCardProps {
  feature: AgriAiFeatureItem;
}

export default function FeatureCard({ feature }: FeatureCardProps) {
  const { icon, title, description } = feature;

  const renderIcon = () => {
    switch (icon) {
      case "droplet":
        return (
          <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#e6f5ec] text-[#134e3a] dark:bg-emerald-950/60 dark:text-emerald-300">
            <Droplets aria-hidden="true" className="size-5 stroke-2" />
          </div>
        );
      case "trending-up":
        return (
          <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#e6f5ec] text-[#134e3a] dark:bg-emerald-950/60 dark:text-emerald-300">
            <TrendingUp aria-hidden="true" className="size-5 stroke-2" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="group flex items-start gap-4 rounded-2xl border border-[#d6ecde] bg-white p-4.5 shadow-xs transition-all duration-200 hover:border-[#134e3a]/40 hover:shadow-md dark:border-emerald-800/40 dark:bg-[#10241b] dark:hover:border-emerald-700/60 sm:p-5">
      {renderIcon()}
      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-semibold tracking-tight text-[#0a3826] transition-colors group-hover:text-[#134e3a] dark:text-white dark:group-hover:text-emerald-300 sm:text-base">
          {title}
        </h3>
        <p className="mt-1 text-xs leading-relaxed text-[#496557] dark:text-emerald-200/75 sm:text-sm">
          {description}
        </p>
      </div>
    </div>
  );
}
