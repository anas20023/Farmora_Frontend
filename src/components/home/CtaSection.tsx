import { getCtaData } from "@/lib/cta-data";
import CtaClient from "@/components/home/cta/CtaClient";

/**
 * Server Component representing the Farmora Call To Action (CTA) section.
 * Fetches required value proposition copy, telemetry guarantees, and action configurations
 * on the server, streaming structured data to the CtaClient UI component.
 */
export default async function CtaSection() {
  const data = await getCtaData();

  return <CtaClient data={data} />;
}

export { CtaSection };
