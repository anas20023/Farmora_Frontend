import { getHowItWorksData } from "@/lib/how-it-works-data";
import HowItWorksClient from "@/components/home/how-it-works/HowItWorksClient";

/**
 * Server Component representing the "How Farmora Works" section.
 * Fetches verified operational pipeline workflows and telemetry guarantees
 * on the server, streaming structured data into HowItWorksClient.
 */
export default async function HowItWorksSection() {
  const data = await getHowItWorksData();

  return <HowItWorksClient data={data} />;
}

export { HowItWorksSection };
