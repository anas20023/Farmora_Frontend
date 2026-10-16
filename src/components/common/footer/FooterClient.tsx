"use client";

import Link from "next/link";
import { Chip, Separator, Tooltip } from "@heroui/react";
import { CircleCheck, Banknote, Sprout } from "lucide-react";
import { HiOutlineSignal } from "react-icons/hi2";
import type { FooterBadgeIcon, FooterData } from "@/types/footer";

interface FooterClientProps {
  data: FooterData;
}

function renderBadgeIcon(icon: FooterBadgeIcon) {
  switch (icon) {
    case "check":
      return (
        <CircleCheck
          aria-hidden="true"
          className="size-3.5 text-[#2d6a4f] dark:text-emerald-400"
        />
      );
    case "signal":
      return (
        <HiOutlineSignal
          aria-hidden="true"
          className="size-3.5 text-[#2d6a4f] dark:text-emerald-400"
        />
      );
    case "escrow":
      return (
        <Banknote
          aria-hidden="true"
          className="size-3.5 text-[#2d6a4f] dark:text-emerald-400"
        />
      );
    default:
      return null;
  }
}

export default function FooterClient({ data }: FooterClientProps) {
  const { brand, badges, sections, metadata } = data;

  return (
    <footer
      role="contentinfo"
      aria-label="Farmora Footer"
      className="w-full border-t border-[#dbeedd] bg-[#effdf1] text-[#475049] transition-colors duration-200 dark:border-emerald-950/70 dark:bg-[#0c1813] dark:text-emerald-100/80"
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Brand & Value Proposition Column */}
          <div className="flex flex-col items-start lg:col-span-5">
            {/* Logo and Brand Titles */}
            <Link
              href="/"
              className="group inline-flex items-center gap-3 rounded-md outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-focus"
              aria-label="Farmora Homepage"
            >
              <div className="flex items-center gap-2">
                <span className="grid size-8 place-items-center rounded-lg bg-[#164e32] text-white shadow-xs transition-transform group-hover:scale-105 dark:bg-emerald-700 dark:text-emerald-100">
                  <Sprout aria-hidden="true" className="size-4.5" />
                </span>
                <span className="text-[17px] font-semibold tracking-tight text-[#164e32] dark:text-emerald-300">
                  {brand.primaryName}
                </span>
              </div>
              <span className="text-[19px] font-bold tracking-tight text-[#164e32] dark:text-emerald-100">
                {brand.secondaryName}
              </span>
            </Link>

            {/* Description */}
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#475049] dark:text-emerald-100/75">
              {brand.description}
            </p>

            {/* Trust Badges */}
            <div
              className="mt-6 flex flex-wrap items-center gap-2.5"
              aria-label="Platform Trust & Security Badges"
            >
              {badges.map((badge) => (
                <Tooltip key={badge.id} delay={150}>
                  <Tooltip.Trigger>
                    <Chip
                      variant="soft"
                      className="h-7 cursor-pointer border border-[#cfe4d3] bg-[#e5f3e7] px-2.5 text-xs font-medium text-[#2d6a4f] transition-all hover:border-[#b5d9bc] hover:bg-[#d8eedb] dark:border-emerald-800/50 dark:bg-emerald-950/60 dark:text-emerald-300 dark:hover:border-emerald-700/60 dark:hover:bg-emerald-900/60"
                      aria-label={`${badge.label}${badge.stat ? `: ${badge.stat}` : ""}`}
                    >
                      <span className="flex items-center gap-1.5">
                        {renderBadgeIcon(badge.icon)}
                        <span>{badge.label}</span>
                      </span>
                    </Chip>
                  </Tooltip.Trigger>
                  <Tooltip.Content className="max-w-xs rounded-md border border-[#cce2cf] bg-white p-2.5 text-xs text-[#1f362d] shadow-lg dark:border-emerald-800/60 dark:bg-[#14231b] dark:text-emerald-100">
                    <p className="font-semibold text-[#164e32] dark:text-emerald-300">
                      {badge.label}
                    </p>
                    {badge.tooltip ? (
                      <p className="mt-1 text-[#475049] dark:text-emerald-100/70">
                        {badge.tooltip}
                      </p>
                    ) : null}
                    {badge.stat ? (
                      <p className="mt-1.5 inline-block rounded bg-[#effdf1] px-1.5 py-0.5 font-mono text-[11px] font-medium text-[#164e32] dark:bg-emerald-950/70 dark:text-emerald-300">
                        {badge.stat}
                      </p>
                    ) : null}
                  </Tooltip.Content>
                </Tooltip>
              ))}
            </div>
          </div>

          {/* Navigation Links Columns */}
          <nav
            aria-label="Footer Navigation"
            className="grid grid-cols-1 gap-8 sm:grid-cols-3 lg:col-span-7"
          >
            {sections.map((section) => (
              <div key={section.title} className="flex flex-col">
                <h3 className="text-xs font-bold uppercase tracking-[0.08em] text-[#1b2720] dark:text-emerald-300">
                  {section.title}
                </h3>
                <ul className="mt-4 flex flex-col space-y-2.5">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="inline-block text-sm text-[#5f6961] transition-colors duration-150 hover:text-[#164e32] focus-visible:rounded-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus dark:text-emerald-100/70 dark:hover:text-emerald-300"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Separator Divider */}
        <Separator className="my-8 border-t border-[#dcecdc] dark:border-emerald-950/60 sm:my-10" />

        {/* Bottom Bar: Copyright & Settlements */}
        <div className="flex flex-col items-center justify-between gap-4 text-xs text-[#5f6961] sm:flex-row dark:text-emerald-100/60">
          <p>{metadata.copyright}</p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:justify-end">
            <span>{metadata.settlementCurrency}</span>
            <span className="font-medium tracking-wide">
              {metadata.settlementRegions}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
