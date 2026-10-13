import type { CtaData } from "@/types/cta";

/**
 * Server-side data provider for the Farmora Call To Action (CTA) section.
 * Supplies exact brand proposition copy, feature commitments, action links,
 * and dummy telemetry/escrow terms data.
 */
export async function getCtaData(): Promise<CtaData> {
  return {
    badge: {
      label: "Empowering Bangladesh Growers",
      iconName: "gem",
    },
    headline:
      "Earn up to 35% higher margins by eliminating middlemen with zero listing fees and free IoT sensor deployment.",
    highlightMargin: "35%",
    description:
      "We deliver telemetry hardware straight to your plot, connect your yield to verified wholesale and institutional buyers, and guarantee prompt bank transfers via Bangladesh Bank-authorized escrow upon delivery.",
    features: [
      {
        id: "feat-iot",
        text: "Free IoT Field Installation",
        tooltipText:
          "Complimentary solar-powered soil moisture and canopy telemetry units deployed directly to your farm plot within 72 hours.",
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
          "24/7 localized agronomist consultations, disease prevention alerts, and harvest timing guidance in Bengali.",
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
      subtitle:
        "Transparent, farmer-first trade rules backed by digital smart contracts and verified banking escrow.",
      terms: [
        {
          id: "term-1",
          title: "Zero-Cost IoT Edge Sensor Deployment",
          description:
            "Farmora provides and installs solar-powered telemetry sensors at 0 ৳ deposit across all 64 districts in Bangladesh.",
          badge: "Hardware Kit",
        },
        {
          id: "term-2",
          title: "Bank-Authorized Escrow Settlement",
          description:
            "Buyer payment is locked in escrow prior to dispatch and automatically disbursed within 24 hours of delivery and quality verification.",
          badge: "24h Payout",
        },
        {
          id: "term-3",
          title: "Transparent Fair Market Pricing",
          description:
            "No middleman brokerage cuts. Producers receive 100% of the agreed batch price with full digital weight receipts.",
          badge: "Direct Trade",
        },
        {
          id: "term-4",
          title: "Institutional Buyer Verification",
          description:
            "Trade exclusively with certified wholesale networks, corporate agro-processors, and accredited export houses.",
          badge: "KYC Verified",
        },
      ],
      escrowNote:
        "Settlement escrow operations comply with Bangladesh Bank guidelines for digital commercial agriculture settlement.",
    },
  };
}
