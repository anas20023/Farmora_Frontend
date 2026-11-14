import type { Metadata } from "next";
import { getMarketplaceListings } from "@/lib/marketplace-data";
import MarketplaceClient from "@/components/marketplace/MarketplaceClient";

export const metadata: Metadata = {
  title: "Browse Marketplace · Direct Agricultural Commodities | Farmora",
  description:
    "Procure verified agricultural harvests directly from farmers in Bangladesh. Access real-time IoT soil telemetry, advance pre-orders, and guaranteed BDT escrow commerce.",
  keywords: [
    "Bangladesh agriculture marketplace",
    "direct farm produce",
    "IoT farm telemetry",
    "pre-order crops",
    "organic vegetables",
    "aromatic rice",
    "agricultural escrow",
  ],
};

/**
 * Server Component: Fetches static Prisma-structured crop listings and passes
 * them to the client presentation component without client-side useEffect fetching.
 */
export default async function MarketplacePage() {
  const { listings, stats } = await getMarketplaceListings();

  return (
    <MarketplaceClient
      initialListings={listings}
      stats={stats}
    />
  );
}
