import type { Metadata } from "next";
import { getVerifiedFarmsDirectoryData } from "@/lib/verified-farms-directory-data";
import VerifiedFarmsClient from "@/components/verified-farms/VerifiedFarmsClient";

export const metadata: Metadata = {
  title: "Verified Farms | Farmora · Bangladesh Agricultural Network",
  description:
    "Discover trusted farmers and explore verified agricultural farms across Bangladesh. Direct from field to wholesale market with audited transparency, soil certification, and IoT telemetry.",
};

/**
 * Server Component representing the Farmora Verified Farms directory page.
 * Loads verified agricultural producer profiles, soil health certifications,
 * active plots, and cultivation telemetry on the server before streaming to the client.
 */
export default async function VerifiedFarmsPage() {
  const data = await getVerifiedFarmsDirectoryData();

  return <VerifiedFarmsClient initialData={data} />;
}
