"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import {
  ArrowRight,
  CheckCircle2,
  Gem,
  Info,
  ShieldCheck,
  X,
  FileText,
  BadgeCheck,
} from "lucide-react";
import type { CtaData } from "@/types/cta";

interface CtaClientProps {
  data: CtaData;
}

export default function CtaClient({ data }: CtaClientProps) {
  const router = useRouter();
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const {
    badge,
    headline,
    description,
    features,
    primaryAction,
    secondaryAction,
    termsModal,
  } = data;

  // Lock background scrolling and add Escape listener when modal is open
  useEffect(() => {
    if (!isTermsOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsTermsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isTermsOpen]);

  return (
    <section
      aria-labelledby="cta-heading"
      className="relative w-full py-8 sm:py-12 lg:py-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main CTA Card */}
        <div className="relative overflow-hidden rounded-3xl border border-emerald-900/30 bg-gradient-to-br from-[#063b28] via-[#043321] to-[#022417] p-7 shadow-2xl shadow-emerald-950/20 sm:p-10 lg:rounded-[2.25rem] lg:p-14 dark:border-emerald-800/40 dark:shadow-black/60">
          {/* Subtle Ambient Decorative Lighting */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-emerald-500/10 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -left-24 size-96 rounded-full bg-emerald-400/10 blur-3xl"
          />

          <div className="relative z-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
            {/* Left Content Column */}
            <div className="flex flex-col items-start lg:col-span-8">
              {/* Badge: Empowering Bangladesh Growers */}
              <div
                className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-[#174d37]/90 px-3.5 py-1 text-xs font-medium text-emerald-200 backdrop-blur-xs"
                role="status"
              >
                <Gem aria-hidden="true" className="size-3.5 text-emerald-300" />
                <span>{badge.label}</span>
              </div>

              {/* Main Headline */}
              <h2
                id="cta-heading"
                className="mt-5 text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl lg:text-[2.65rem] lg:leading-[1.18]"
              >
                {headline}
              </h2>

              {/* Proposition Description */}
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-emerald-100/80 sm:text-base">
                {description}
              </p>

              {/* Bullet Features Checklist */}
              <ul
                className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 pt-1 sm:pt-2"
                aria-label="Farmora grower guarantees"
              >
                {features.map((feature) => (
                  <li
                    key={feature.id}
                    className="flex items-center gap-2 text-xs font-medium text-emerald-50 sm:text-sm"
                  >
                    <CheckCircle2
                      aria-hidden="true"
                      className="size-4 shrink-0 text-emerald-400"
                    />
                    <span>{feature.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Action Buttons Column */}
            <div className="flex flex-col items-stretch justify-center gap-3.5 sm:flex-row sm:items-center lg:col-span-4 lg:flex-col lg:items-end">
              {/* Primary Action Button: Register Your Farm */}
              <Button
                size="lg"
                onPress={() => router.push(primaryAction.href)}
                aria-label={primaryAction.ariaLabel}
                className="group flex h-12 w-full items-center justify-center gap-2.5 rounded-xl bg-white px-7 text-sm font-semibold text-[#043321] shadow-md transition-all duration-150 hover:bg-emerald-50 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-white sm:w-64"
              >
                <span>{primaryAction.label}</span>
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 text-[#043321] transition-transform duration-150 group-hover:translate-x-1"
                />
              </Button>

              {/* Secondary Action Button: Explore Grower Terms */}
              <Button
                size="lg"
                variant="outline"
                onPress={() => setIsTermsOpen(true)}
                aria-label={secondaryAction.ariaLabel}
                className="flex h-12 w-full items-center justify-center gap-2.5 rounded-xl border border-white/20 bg-[#0e4833]/90 px-7 text-sm font-medium text-white transition-all duration-150 hover:border-white/35 hover:bg-[#12553d] focus-visible:ring-2 focus-visible:ring-emerald-400 sm:w-64"
              >
                <Info
                  aria-hidden="true"
                  className="size-4 text-emerald-200"
                />
                <span>{secondaryAction.label}</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Grower Terms Modal Dialog */}
      {isTermsOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="grower-terms-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsTermsOpen(false);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-3.5 sm:p-6 backdrop-blur-sm"
        >
          {/* Modal Container: Flex column with 90dvh viewport height cap */}
          <div className="relative flex max-h-[90dvh] w-full max-w-xl flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl transition-all">
            {/* Modal Header: Fixed / Non-scrolling */}
            <div className="relative shrink-0 border-b border-border/70 px-5 py-4 sm:px-6 sm:py-5">
              {/* Close button */}
              <button
                type="button"
                aria-label="Close grower terms dialog"
                onClick={() => setIsTermsOpen(false)}
                className="absolute right-4 top-4 rounded-lg p-1.5 text-muted transition-colors hover:bg-surface-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
              >
                <X aria-hidden="true" className="size-5" />
              </button>

              <div className="flex items-start gap-3.5 pr-8">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent sm:size-11">
                  <FileText aria-hidden="true" className="size-5 sm:size-6" />
                </span>
                <div>
                  <h3
                    id="grower-terms-title"
                    className="text-base font-bold tracking-tight text-foreground sm:text-xl"
                  >
                    {termsModal.title}
                  </h3>
                  <p className="mt-0.5 text-xs text-muted sm:text-sm">
                    {termsModal.subtitle}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Content: Vertically scrollable with min-h-0 and internal padding */}
            <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-5 py-4 sm:px-6 sm:py-5 space-y-3.5">
              {/* Terms List: All 4 cards accessible */}
              <div className="space-y-3">
                {termsModal.terms.map((term) => (
                  <div
                    key={term.id}
                    className="flex items-start justify-between gap-3 rounded-xl border border-border bg-surface-secondary/70 p-3 sm:p-3.5"
                  >
                    <div className="flex items-start gap-2.5">
                      <BadgeCheck
                        aria-hidden="true"
                        className="mt-0.5 size-4.5 shrink-0 text-accent"
                      />
                      <div>
                        <h4 className="text-xs font-semibold text-foreground sm:text-sm">
                          {term.title}
                        </h4>
                        <p className="mt-0.5 text-xs text-muted leading-relaxed">
                          {term.description}
                        </p>
                      </div>
                    </div>
                    {term.badge ? (
                      <span className="shrink-0 rounded-md bg-accent/10 px-2 py-0.5 text-[11px] font-medium text-accent">
                        {term.badge}
                      </span>
                    ) : null}
                  </div>
                ))}
              </div>

              {/* Escrow regulatory note */}
              <div className="flex items-center gap-2.5 rounded-lg border border-border/60 bg-surface-tertiary px-3.5 py-2.5 text-xs text-muted">
                <ShieldCheck
                  aria-hidden="true"
                  className="size-4 shrink-0 text-accent"
                />
                <span className="leading-relaxed">{termsModal.escrowNote}</span>
              </div>
            </div>

            {/* Modal Footer: Fixed / Non-scrolling Action Buttons */}
            <div className="shrink-0 border-t border-border/70 bg-surface px-5 py-3.5 sm:px-6 sm:py-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <Button
                variant="ghost"
                size="md"
                onPress={() => setIsTermsOpen(false)}
                className="border border-border"
              >
                Close
              </Button>
              <Button
                variant="primary"
                size="md"
                onPress={() => {
                  setIsTermsOpen(false);
                  router.push(primaryAction.href);
                }}
              >
                <span>Proceed to Registration</span>
                <ArrowRight aria-hidden="true" className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
