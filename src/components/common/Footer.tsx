import { getFooterData } from "@/lib/footer-data";
import FooterClient from "@/components/common/footer/FooterClient";

/**
 * Server Component representing the Farmora global Footer.
 * Fetches required navigation, branding, and telemetry statistics on the server
 * and streams serialized data into the FooterClient UI component.
 */
export default async function Footer() {
  const data = await getFooterData();

  return <FooterClient data={data} />;
}

export { Footer };
