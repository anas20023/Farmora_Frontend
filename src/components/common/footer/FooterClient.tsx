"use client";

import Link from "next/link";
import Image from "next/image";
import type { FooterData } from "@/types/footer";

interface FooterClientProps {
  data: FooterData;
}

export default function FooterClient({ data }: FooterClientProps) {
  const { brand, sections, metadata } = data;

  const letterBlocks = [
    { letter: "F", bg: "var(--field-spruce)", ink: "var(--field-spruce-ink)" },
    { letter: "A", bg: "var(--field-clay)", ink: "var(--field-clay-ink)" },
    { letter: "R", bg: "var(--field-gold)", ink: "var(--field-gold-ink)" },
    { letter: "M", bg: "var(--field-slate)", ink: "var(--field-slate-ink)" },
    { letter: "O", bg: "var(--field-spruce)", ink: "var(--field-spruce-ink)" },
    { letter: "R", bg: "var(--field-clay)", ink: "var(--field-clay-ink)" },
    { letter: "A", bg: "var(--field-gold)", ink: "var(--field-gold-ink)" },
  ];

  return (
    <footer
      id="contact"
      role="contentinfo"
      aria-label="Farmora Footer"
      className="w-full bg-surface-secondary/40 text-foreground pt-16 pb-12"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Blueprint: The mark, built large (blocks construction) */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {letterBlocks.map((item, idx) => (
            <div
              key={idx}
              className="flex h-20 sm:h-28 md:h-36 items-center justify-center rounded font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight select-none"
              style={{ backgroundColor: item.bg, color: item.ink }}
            >
              {item.letter}
            </div>
          ))}
        </div>

        {/* Link Columns & Operations */}
        <div className="mt-14 grid grid-cols-2 gap-8 sm:grid-cols-4 lg:grid-cols-12 lg:gap-8">
          <div className="col-span-2 lg:col-span-4">
            <div className="flex items-center gap-2.5">
              <Image src="/Logo.png" alt="Farmora" width={35} height={35} />
              <span className="font-display text-xl font-bold text-foreground">
                {brand.primaryName}
              </span>
            </div>
            <p className="mt-3 text-sm text-muted max-w-sm leading-relaxed">
              {brand.description}
            </p>
            <div className="mt-4 text-xs text-muted">
              Dhaka Agritech Hub · Bogura Sub-Station · Dinajpur Gateway
            </div>
          </div>

          <div className="col-span-1 lg:col-span-3">
            <h4 className="text-xs font-semibold text-foreground mb-3">
              Direct Marketplace
            </h4>
            <ul className="space-y-2 text-sm text-muted">
              <li><a href="#crops" className="hover:text-foreground">Harvest Batches</a></li>
              <li><a href="#farms" className="hover:text-foreground">Verified Farm Registry</a></li>
              <li><a href="#how-it-works" className="hover:text-foreground">Lifecycle & Escrow</a></li>
              <li><Link href="/login" className="hover:text-foreground">Buyer Terminal</Link></li>
            </ul>
          </div>

          <div className="col-span-1 lg:col-span-3">
            <h4 className="text-xs font-semibold text-foreground mb-3">
              IoT Telemetry
            </h4>
            <ul className="space-y-2 text-sm text-muted">
              <li><a href="#telemetry" className="hover:text-foreground">In-Soil Probes</a></li>
              <li><a href="#telemetry" className="hover:text-foreground">Canopy Thermal Degree</a></li>
              <li><a href="#telemetry" className="hover:text-foreground">AgriAI Yield Model</a></li>
              <li><Link href="/register" className="hover:text-foreground">Request Sensor Node</Link></li>
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-2">
            <h4 className="text-xs font-semibold text-foreground mb-3">
              Compliance
            </h4>
            <ul className="space-y-2 text-xs text-muted">
              <li>Escrow Protected</li>
              <li>Zero Chemical Ripening</li>
              <li>GPS Coordinates Logged</li>
              <li>Cold Chain Audit</li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 text-xs text-muted">
          <div>
            © {new Date().getFullYear()} Farmora Technologies Ltd. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>SDG 2 · SDG 12 Aligned</span>
            <a href="#terms" className="hover:text-foreground">Terms of Trade</a>
            <a href="#privacy" className="hover:text-foreground">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
