"use client";

import { Sparkles } from "lucide-react";

interface AdvisoryBannerProps {
  advisory: {
    badge: string;
    confidence: string;
    message: string;
    timestamp?: string;
  };
}

export default function AdvisoryBanner({ advisory }: AdvisoryBannerProps) {
  const { badge, confidence, message } = advisory;

  return (
    <div className="mt-4 flex items-start gap-3.5 rounded-2xl border border-[#16553d] bg-[#0c3928] p-4 text-white shadow-sm transition-all duration-200 hover:border-emerald-500/40 sm:p-5 dark:border-emerald-900/60 dark:bg-[#072419]">
      {/* AI Sparkle Node Icon */}
      <div className="grid size-9 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/10 text-emerald-300 sm:size-10">
        <Sparkles aria-hidden="true" className="size-4.5 sm:size-5" />
      </div>

      {/* Advisory Content */}
      <div className="min-w-0 flex-1">
        {/* Top Tag Row */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <span className="text-xs font-bold tracking-wide text-[#52d699]">
            {badge}
          </span>
          <span className="text-xs text-white/50">•</span>
          <span className="text-xs font-medium text-emerald-100/75">
            {confidence}
          </span>
        </div>

        {/* Advisory Quotation */}
        <p className="mt-1.5 text-xs font-normal leading-relaxed text-emerald-50 sm:text-sm">
          {message}
        </p>
      </div>
    </div>
  );
}
