import { getFeaturedCropsData } from "@/lib/featured-crops-data";
import FeaturedCropsClient from "@/components/crops/FeaturedCropsClient";

/**
 * Server Component representing the Farmora Featured Crops & Pre-Orders section.
 * Fetches agricultural allocation data, seasonal harvest windows, and telemetry
 * stages on the server and delivers structured data to the FeaturedCropsClient UI component.
 */
export default async function FeaturedCropsSection() {
  const data = await getFeaturedCropsData();

  return <FeaturedCropsClient data={data} />;
}

export { FeaturedCropsSection };
