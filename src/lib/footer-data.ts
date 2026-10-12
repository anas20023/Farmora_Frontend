import type { FooterData } from "@/types/footer";

/**
 * Server-side data provider for the Farmora Footer.
 * Prepares navigation sections, trust indicators, branding, and metadata.
 * Numerical data is currently populated with realistic dummy metrics.
 */
export async function getFooterData(): Promise<FooterData> {
  return {
    brand: {
      primaryName: "Farmora .",
      secondaryName: "Farmora",
      description:
        "Direct farm-to-enterprise agricultural exchange powered by IoT edge monitoring, satellite soil analytics, and transparent digital contracts across Bangladesh.",
    },
    badges: [
      {
        id: "verified-farms",
        label: "verified farms",
        icon: "check",
        stat: "1,240 verified producers",
        tooltip: "Independently verified smallholder and commercial farms across 64 districts.",
      },
      {
        id: "iot-telemetry",
        label: "IoT Active Telemetry",
        icon: "signal",
        stat: "4,820 live edge sensors",
        tooltip: "Continuous real-time soil moisture, temperature, and canopy telemetry.",
      },
      {
        id: "bdt-escrow",
        label: "Secured ৳ BDT Escrow",
        icon: "escrow",
        stat: "৳ 84.5M secured",
        tooltip: "Protected trade settlements with Bangladesh Bank compliant digital escrow.",
      },
    ],
    sections: [
      {
        title: "MARKETPLACE",
        links: [
          { label: "Grain & Paddy Batches", href: "#marketplace-grains" },
          { label: "Seasonal Vegetables", href: "#marketplace-vegetables" },
          { label: "Certified Organic Pulses", href: "#marketplace-pulses" },
          { label: "Export Quality Spices", href: "#marketplace-spices" },
          { label: "Wholesale Pre-orders", href: "#marketplace-pre-orders" },
        ],
      },
      {
        title: "FARMER TOOLS",
        links: [
          { label: "AgriAI Yield Prediction", href: "#tools-yield-prediction" },
          { label: "Soil Moisture Sensors", href: "#tools-soil-moisture" },
          { label: "Micro-Climate Stations", href: "#tools-micro-climate" },
          { label: "Fair Price Indexing", href: "#tools-price-indexing" },
          { label: "Harvest Smart Contracts", href: "#tools-smart-contracts" },
        ],
      },
      {
        title: "COMPANY",
        links: [
          { label: "About Farmora", href: "#about" },
          { label: "Trust & Traceability", href: "#trust" },
          { label: "Institutional Buyers", href: "#buyers" },
          { label: "Privacy Policy", href: "#privacy" },
          { label: "Terms of Service", href: "#terms" },
        ],
      },
    ],
    metadata: {
      copyright: `Copyright © ${new Date().getFullYear()} Farmora Agritech Ltd. All rights reserved.`,
      settlementCurrency: "Settlements denominated in ৳ BDT",
      settlementRegions: "Dhaka • Rajshahi • Sylhet",
    },
  };
}
