"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle2, ShieldCheck, X } from "lucide-react";
import type { CtaData } from "@/types/cta";

interface CtaClientProps {
  data: CtaData;
}

export default function CtaClient({ data }: CtaClientProps) {
  const router = useRouter();
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const { headline, description, features, primaryAction, termsModal } = data;

  useEffect(() => {
    if (!isTermsOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsTermsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isTermsOpen]);

  return (
    <section aria-labelledby="cta-heading" className="relative w-full py-16 sm:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Blueprint: The action tile row */}
        <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-12 min-h-[360px]">
          {/* Left flanking photographic tile */}
          <div className="relative hidden md:block md:col-span-3 overflow-hidden rounded bg-surface-secondary">
            <Image
              src="/images/hero-farm-iot.jpg"
              alt="Farm telemetry probe in plot"
              fill
              className="object-cover"
            />
          </div>

          {/* Center wide accent tile */}
          <div className="flex flex-col justify-between rounded bg-accent p-8 sm:p-12 text-accent-foreground md:col-span-6">
            <div>
              <div className="mb-3 text-xs font-semibold opacity-90">
                DIRECT GROWER & BUYER INFRASTRUCTURE
              </div>
              <h2
                id="cta-heading"
                className="font-display text-3xl sm:text-4xl font-bold leading-tight"
              >
                {headline}
              </h2>
              <p className="mt-4 text-sm sm:text-base opacity-90 leading-relaxed max-w-lg">
                {description}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => router.push(primaryAction.href)}
                className="inline-flex items-center gap-2 rounded bg-foreground px-6 py-3.5 text-sm font-semibold text-background transition-opacity hover:opacity-90"
              >
                <span>{primaryAction.label}</span>
                <ArrowRight className="size-4" />
              </button>

              <button
                type="button"
                onClick={() => setIsTermsOpen(true)}
                className="text-xs font-semibold underline underline-offset-4 opacity-90 hover:opacity-100"
              >
                Review Escrow & IoT Terms
              </button>
            </div>
          </div>

          {/* Right flanking palette tile */}
          <div className="relative hidden md:flex md:col-span-3 flex-col justify-between rounded bg-[var(--field-clay)] p-8 text-[var(--field-clay-ink)]">
            <div className="text-xs font-semibold uppercase opacity-85">
              GROWER COMMITMENT
            </div>
            <div>
              <div className="font-display text-3xl font-bold">35% Higher</div>
              <div className="text-xs mt-1 opacity-90">Direct net farmer margin verified across 1,240+ growers.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Terms Modal */}
      {isTermsOpen && (
        <div
          data-ui="true"
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
        >
          <div className="relative max-h-[85svh] w-full max-w-lg overflow-y-auto rounded bg-surface p-6 text-foreground border border-border">
            <button
              type="button"
              onClick={() => setIsTermsOpen(false)}
              className="absolute top-4 right-4 rounded p-1 text-muted hover:text-foreground"
            >
              <X className="size-5" />
            </button>

            <h3 className="font-display text-2xl font-bold">
              {termsModal.title}
            </h3>
            <p className="text-xs text-muted mt-1">{termsModal.subtitle}</p>

            <div className="mt-6 space-y-4 text-xs leading-relaxed text-muted">
              {termsModal.terms.map((term) => (
                <div key={term.id} className="rounded bg-surface-secondary p-4">
                  <h4 className="font-bold text-foreground mb-1">{term.title}</h4>
                  <p>{term.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setIsTermsOpen(false)}
                className="rounded bg-accent px-5 py-2 text-sm font-semibold text-accent-foreground hover:opacity-90"
              >
                Close Terms
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
