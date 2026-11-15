import type { CtaData } from "@/types/cta";

/**
 * Server-side data provider for the Farmora Call To Action (CTA) section.
 * Supplies brand proposition copy, feature commitments, action links,
 * and telemetry/escrow terms data.
 */
export async function getCtaData(): Promise<CtaData> {
  return {
    badge: {
      label: "Direct Agricultural Infrastructure",
      iconName: "gem",
    },
    headline:
      "Eliminate middlemen markups with direct plot telemetry and verified escrow settlements.",
    highlightMargin: "35%",
    description:
      "We deliver telemetry hardware straight to your plot, connect your harvest to verified buyers, and guarantee prompt bank transfers via escrow upon weight receipt.",
    features: [
      {
        id: "feat-iot",
        text: "Free IoT Field Installation",
        tooltipText:
          "Solar-powered soil moisture and canopy telemetry units deployed directly to your farm plot within 72 hours.",
      },
      {
        id: "feat-commission",
        text: "Zero Upfront Commission",
        tooltipText:
          "No listing charges or upfront deductions. Pay zero commission until your harvest is verified and settled.",
      },
      {
        id: "feat-agronomist",
        text: "Agronomist On-Call Support",
        tooltipText:
          "24/7 localized consultations, disease prevention alerts, and harvest timing guidance.",
      },
    ],
    primaryAction: {
      label: "Register Your Farm",
      href: "/register",
      ariaLabel: "Register your farm on the Farmora agricultural marketplace",
    },
    secondaryAction: {
      label: "Explore Grower Terms",
      href: "#grower-terms",
      ariaLabel: "Explore grower terms, escrow settlements, and IoT hardware agreement",
    },
    termsModal: {
      title: "Farmora Grower Agreement & Platform Terms",
      subtitle: "Regulated Agricultural Escrow and IoT Telemetry SLA",
      terms: [
        {
          id: "term-1",
          title: "1. Hardware Deployment & Telemetry Ownership",
          description:
            "Farmora IoT Sensor probes remain property of Farmora Corporation and are serviced under lifetime warranty during active harvest listing cycles.",
          badge: "Hardware SLA",
        },
        {
          id: "term-2",
          title: "2. Escrow & Payout Settlement",
          description:
            "All batch funds are placed in regulated escrow at pre-order confirmation and released to the farmer's verified bank account within 2 hours of delivery confirmation.",
          badge: "Instant Payout",
        },
        {
          id: "term-3",
          title: "3. Quality Verification & Telemetry Standards",
          description:
            "Produce must align with soil moisture and maturity curves logged by in-field telemetry during the 7-day harvest countdown window.",
          badge: "Quality SLA",
        },
      ],
      escrowNote:
        "All batch payments are held in escrow under scheduled banking regulations.",
    },
  };
}
