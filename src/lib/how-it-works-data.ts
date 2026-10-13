import type { HowItWorksData } from "@/types/how-it-works";

/**
 * Server-side data provider for the "How Farmora Works" section.
 * Supplies verbatim operational pipeline descriptions, step indicators,
 * telemetry cadence guarantees, and verified trade highlights.
 */
export async function getHowItWorksData(): Promise<HowItWorksData> {
  return {
    header: {
      eyebrow: "END-TO-END OPERATIONAL PIPELINE",
      title: {
        line1: "How Farmora transforms",
        line2: "agriculture",
      },
      description:
        "Bridging rural growers with commercial food networks using continuous IoT telemetry, verifiable crop lifecycle stages, and cold-chain routing.",
      activeCycle: "Active Cycle: Winter Harvest 2025",
    },
    steps: [
      {
        id: "step-1",
        stepNumber: "01",
        icon: "sensor",
        title: "Smart Monitoring & AI Growth",
        description:
          "Farmers track soil moisture, micro-climate weather, and AI yield forecasts via solar-powered field sensor arrays installed directly on cultivation beds.",
        footerLeft: {
          icon: "clock",
          text: "15-min sensor ping",
        },
        footerRight: "Plot-Level Precision",
        tooltipDetail:
          "Solar sensor nodes monitor volumetric water content (VWC), electrical conductivity, and leaf canopy thermal index.",
      },
      {
        id: "step-2",
        stepNumber: "02",
        icon: "store",
        title: "Direct Farm-to-Table Marketplace",
        description:
          "Consumers and enterprise buyers discover verified farms, inspect real-time growth curves, and pre-order batches at guaranteed transparent pricing.",
        footerLeft: {
          icon: "shield",
          text: "Verified Origin Escrow",
        },
        footerRight: "0% Brokerage",
        tooltipDetail:
          "Payments locked securely in Bangladesh Bank-compliant escrow until buyer receives and inspects batch telemetry receipts.",
      },
      {
        id: "step-3",
        stepNumber: "03",
        icon: "delivery",
        title: "Transparent Harvest & Delivery",
        description:
          "Orders are harvested exactly at peak sugar and moisture maturity. Temperature-controlled transit brings produce to your doorstep within 24 hours.",
        footerLeft: {
          icon: "qr",
          text: "QR Batch Trace",
        },
        footerRight: "Peak Crispness",
        tooltipDetail:
          "Every delivery crate is stamped with a cryptographic QR hash showing harvest timestamp, GPS origin, and transit cold-chain log.",
      },
    ],
  };
}
