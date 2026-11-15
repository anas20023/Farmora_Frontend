import type { Metadata } from "next";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import ContactClient from "@/components/contact/ContactClient";
import { getContactPageData } from "@/lib/contact-data";

export const metadata: Metadata = {
  title: "Contact Us & Regional Field Support | Farmora",
  description:
    "Get in touch with Farmora's agronomists, IoT field engineers, and enterprise trade desks across Dhaka, Bogura, and Jashore hubs. 24/7 farmer hotline & verified escrow protection.",
  openGraph: {
    title: "Contact Us & Regional Field Support | Farmora Agritech",
    description:
      "Direct farm-to-enterprise agricultural support, 0 ৳ deposit IoT edge telemetry sensors, and digital escrow assistance across all 64 districts in Bangladesh.",
    siteName: "Farmora",
  },
};

/**
 * Server Component for the Farmora Contact Page.
 * Fetches structured support channel data, verified physical addresses,
 * office hubs, business hours, and FAQs on the server, streaming serializable
 * data into the ContactClient component.
 */
export default async function ContactPage() {
  const data = await getContactPageData();

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1 w-full">
        <ContactClient data={data} />
      </main>
      <Footer />
    </div>
  );
}
