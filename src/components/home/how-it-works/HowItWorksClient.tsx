"use client";

import Image from "next/image";
import { Check, Clock, QrCode, Radio, ShieldCheck, Store, Truck } from "lucide-react";
import type { HowItWorksData, WorkflowBadgeItem, WorkflowStepItem } from "@/types/how-it-works";

interface HowItWorksClientProps {
  data: HowItWorksData;
}

export default function HowItWorksClient({ data }: HowItWorksClientProps) {
  const { header, steps } = data;

  const stageHeights = ["h-56 sm:h-64", "h-72 sm:h-80", "h-92 sm:h-96"];
  const stageBgs = ["bg-[#22382f] text-white", "bg-[#714f04] text-white", "bg-[#0c7866] text-white"];
  const stageImages = ["/crops/rice.jpg", "/crops/bell-peppers.jpg", "/crops/tomatoes.jpg"];

  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-title"
      className="relative w-full bg-background py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="mb-3 flex items-center gap-2">
            <span className="inline-block size-2 rounded-full bg-accent" />
            <span className="text-xs font-semibold text-muted">
              {header.eyebrow}
            </span>
          </div>

          <h2
            id="how-it-works-title"
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-foreground"
          >
            {header.title.line1} {header.title.line2}
          </h2>

          <p className="mt-4 text-base text-muted max-w-2xl leading-relaxed">
            {header.description}
          </p>
        </div>

        {/* Blueprint: Tiles that grow (order carried by size) */}
        <div className="grid grid-cols-1 items-end gap-6 md:grid-cols-3">
          {steps.map((step, idx) => (
            <div key={step.id} className="flex flex-col">
              {/* Growing Tile */}
              <div
                className={`relative w-full overflow-hidden rounded ${stageHeights[idx]} ${stageBgs[idx]} transition-transform duration-300`}
              >
                <div className="absolute inset-0 opacity-40 mix-blend-overlay">
                  <Image
                    src={stageImages[idx]}
                    alt={step.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="relative z-10 flex h-full flex-col justify-between p-6">
                  <div className="flex items-center justify-between text-xs font-semibold tracking-wider">
                    <span>STAGE {idx + 1}</span>
                    <span className="rounded bg-black/25 px-2.5 py-1">{step.stepNumber}</span>
                  </div>

                  <div>
                    <div className="font-display text-2xl font-bold leading-snug">
                      {step.title}
                    </div>
                    <div className="mt-2 text-xs opacity-90">
                      {step.footerRight} · {step.footerLeft.text}
                    </div>
                  </div>
                </div>
              </div>

              {/* Text beneath the tile */}
              <div className="mt-4">
                <div className="font-display text-lg font-bold text-foreground">
                  {step.title}
                </div>
                <p className="mt-1 text-sm text-muted leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
