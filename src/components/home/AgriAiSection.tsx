import { getAgriAiData } from "@/lib/agri-ai-data";
import AgriAiClient from "@/components/home/agri-ai/AgriAiClient";

/**
 * Server Component representing the Farmora AgriAI Telemetry Engine section.
 * Fetches real-time sensor node telemetry, edge AI crop advisory recommendations,
 * and ML price hedging predictions on the server, delivering structured data
 * to the AgriAiClient UI component.
 */
export default async function AgriAiSection() {
  const data = await getAgriAiData();

  return <AgriAiClient data={data} />;
}

export { AgriAiSection };
