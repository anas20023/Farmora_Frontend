import { getHeroData } from "@/lib/hero-data";
import HeroClient from "@/components/hero/HeroClient";

/**
 * Server Component representing the Farmora Hero Section.
 * Fetches real-time IoT node telemetry statistics, market batch reservations,
 * and high-impact ecosystem propositions on the server before hydrating the HeroClient UI.
 */
export default async function HeroSection() {
  const data = await getHeroData();

  return <HeroClient data={data} />;
}

export { HeroSection };
