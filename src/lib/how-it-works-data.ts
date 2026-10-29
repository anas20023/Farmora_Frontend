import type { HowItWorksData } from "@/types/how-it-works";

/**
 * Server-side data provider for the "How Farmora Works" section.
 * Supplies operational pipeline descriptions, stage indicators,
 * telemetry cadence guarantees, and verified trade highlights.
 */
export async function getHowItWorksData(): Promise<HowItWorksData> {
  return {
    header: {
      eyebrow: "OPERATIONAL STAGES",
      title: {
        line1: "From Living Soil",
        line2: "to Verified Gate",
      },
      description:
        "Bridging rural growers with commercial food buyers through continuous IoT telemetry, verifiable crop lifecycle stages, and cold-chain routing.",
      activeCycle: "Active Cycle: Winter Harvest",
    },
    steps: [
      {
        id: "stage-sown",
        stepNumber: "Sown",
        icon: "sensor",
        title: "Soil Monitoring & Seeding",
        description:
          "Probes record volumetric moisture, electrical conductivity, and temperature directly from plot soil beds every 15 minutes.",
        footerLeft: {
          icon: "clock",
          text: "15-min sensor ping",
        },
        footerRight: "Plot-Level Precision",
        tooltipDetail:
          "Solar sensor nodes monitor volumetric water content (VWC), electrical conductivity, and leaf canopy thermal index.",
      },
      {
        id: "stage-inspected",
        stepNumber: "Inspected",
        icon: "store",
        title: "AgriAI Yield & Health Analysis",
        description:
          "Machine learning models evaluate canopy growth, predict harvest dates with 94%+ confidence, and open direct batch reservations.",
        footerLeft: {
          icon: "shield",
          text: "Verified Escrow",
        },
        footerRight: "Zero Brokerage",
        tooltipDetail:
          "Payments locked securely in regulated escrow until buyer receives and inspects batch telemetry receipts.",
      },
      {
        id: "stage-delivered",
        stepNumber: "Delivered",
        icon: "delivery",
        title: "Precision Harvest & Cold Transit",
        description:
          "Crops harvested at peak Brix maturity and dispatched within 24 hours in temperature-controlled routing with cryptographic batch verification.",
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
