import { getVerifiedFarmsData } from "@/lib/verified-farms-data";
import FeaturedFarmsClient from "@/components/home/farms/FeaturedFarmsClient";

/**
 * Server Component representing the Farmora Featured Verified Farms section.
 * Fetches verified farm accreditations, physical inspection records, and real-time
 * telemetry on the server, streaming structured data to the FeaturedFarmsClient UI component.
 */
export default async function FeaturedFarmsSection() {
  const data = await getVerifiedFarmsData();

  return <FeaturedFarmsClient data={data} />;
}

export { FeaturedFarmsSection };
