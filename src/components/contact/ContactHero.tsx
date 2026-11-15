"use client";

import { Headphones } from "lucide-react";
import { Chip } from "@heroui/react";
import type { ContactPageData } from "@/types/contact";

interface ContactHeroProps {
  hero: ContactPageData["hero"];
}

export default function ContactHero({ hero }: ContactHeroProps) {
  const { badge, headline, description, stats } = hero;

  return (
    <section className="relative w-full overflow-hidden border-b border-[#d8edd9] bg-[#eaf5ee] py-12 transition-colors duration-200 sm:py-16 lg:py-20 dark:border-emerald-950/70 dark:bg-[#091711]">
      {/* Subtle background decorative glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 -z-0 h-96 w-96 -translate-x-1/2 rounded-full bg-emerald-400/15 blur-3xl dark:bg-emerald-600/10"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-600 dark:bg-emerald-400" />
            </span>
            <Chip
              size="sm"
              className="rounded-full border border-[#cbe6d4] bg-[#dcefe3]/80 px-3.5 py-1 text-xs font-semibold text-[#1e4e37] shadow-2xs dark:border-emerald-800/50 dark:bg-emerald-950/60 dark:text-emerald-200"
            >
              <Headphones aria-hidden="true" className="mr-1 inline-block size-3.5 text-emerald-700 dark:text-emerald-400" />
              {badge}
            </Chip>
          </div>

          {/* Main Headline */}
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-[#0a3826] sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15] dark:text-[#f0fdf4]">
            {headline.line1}
            <br className="hidden sm:inline" />{" "}
            <span className="text-[#134e3a] dark:text-emerald-400">{headline.line2}</span>
          </h1>

          {/* Description */}
          <p className="mt-4 text-sm leading-relaxed text-[#3d5a4c] sm:text-base md:text-lg dark:text-emerald-200/80">
            {description}
          </p>

          {/* 4 Stats Grid */}
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center rounded-2xl border border-[#d6ecde] bg-white/90 p-4 shadow-xs backdrop-blur-xs transition-transform duration-200 hover:-translate-y-0.5 dark:border-emerald-900/40 dark:bg-[#10241b]/90 sm:p-5"
              >
                <span className="text-xl font-extrabold tracking-tight text-[#0a3826] sm:text-2xl dark:text-white">
                  {stat.value}
                </span>
                <span className="mt-1 text-center text-xs font-medium text-[#496557] dark:text-emerald-300/70">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
