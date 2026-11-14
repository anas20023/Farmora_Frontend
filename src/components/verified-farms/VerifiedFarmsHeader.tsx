"use client";

import Link from "next/link";
import { ChevronRight, ShieldCheck, Sparkles } from "lucide-react";
import VerifiedFarmsThemeToggle from "./VerifiedFarmsThemeToggle";

export default function VerifiedFarmsHeader() {
  return (
    <div className="w-full border-b border-border bg-surface/60 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:px-6 lg:px-8 md:flex-row md:items-center md:justify-between">
        {/* Left: Breadcrumb & Title Context */}
        <div className="space-y-1.5">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted">
            <Link
              href="/"
              className="transition-colors hover:text-foreground hover:underline"
            >
              Farmora Home
            </Link>
            <ChevronRight className="size-3 text-muted/60" />
            <span className="font-medium text-foreground">Verified Farms</span>
          </nav>

          {/* Heading with verified icon */}
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Verified Farms
            </h1>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/25 bg-accent/10 px-2.5 py-0.5 text-xs font-semibold text-accent">
              <ShieldCheck className="size-3.5" />
              <span>DAE & IoT Audited</span>
            </span>
          </div>

          <p className="max-w-2xl text-xs text-muted sm:text-sm">
            Discover trusted farmers and explore verified agricultural farms across Bangladesh.
          </p>
        </div>

        {/* Right: Trust indicator & Theme Switcher */}
        <div className="flex items-center gap-3 self-start md:self-center">
          <div className="hidden lg:flex items-center gap-2 rounded border border-border bg-surface-secondary/60 px-3 py-1.5 text-xs text-muted">
            <Sparkles className="size-3.5 text-accent" />
            <span>100% Physical Field Inspected</span>
          </div>
          <VerifiedFarmsThemeToggle showLabel={true} />
        </div>
      </div>
    </div>
  );
}
