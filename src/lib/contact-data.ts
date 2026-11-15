import type { ContactPageData } from "@/types/contact";

/**
 * Server-side data provider for the Farmora Contact & Support page.
 * Returns comprehensive support channels, verified physical addresses
 * with administrative division breakdown, office hubs, business hours, and FAQs.
 */
export async function getContactPageData(): Promise<ContactPageData> {
  return {
    hero: {
      badge: "24/7 Agro Support & Direct Inquiries",
      headline: {
        line1: "Connect with our Agritech Specialists,",
        line2: "Grower Care, & Enterprise Hubs.",
      },
      description:
        "Whether you are an enterprise buyer scheduling large-scale crop contracts, a grower seeking telemetry sensor installation, or an institutional partner exploring our digital escrow — our regional field teams are ready to assist across all 64 districts.",
      stats: [
        { value: "< 15 min", label: "Average Farmer Hotline Response" },
        { value: "64 Districts", label: "On-the-ground Field Coverage" },
        { value: "100%", label: "Bangladesh Bank Compliant Escrow" },
        { value: "4,800+", label: "Active IoT Telemetry Nodes" },
      ],
    },
    phones: [
      {
        title: "Farmer Toll-Free Helpline",
        number: "08003276672",
        displayNumber: "0800-FARMORA (0800-3276672)",
        availability: "6:00 AM – 10:00 PM (Daily)",
        badge: "Toll-Free (Bangla & Regional Dialects)",
        isPrimary: true,
      },
      {
        title: "Enterprise & Bulk Trade Desk",
        number: "+8809612445566",
        displayNumber: "+880 9612-445566",
        availability: "Sunday – Thursday, 9:00 AM – 6:00 PM",
        badge: "Wholesale & Contract Farming",
      },
      {
        title: "Emergency IoT Field Telemetry",
        number: "+8801711009988",
        displayNumber: "+880 1711-009988",
        availability: "24/7 Rapid Incident Dispatch",
        badge: "Hardware & Sensor Offline Alerts",
      },
    ],
    emails: [
      {
        department: "General Inquiries & Customer Care",
        email: "support@farmora.com",
        purpose: "Platform assistance, user account verification, and general inquiries.",
        responseTime: "Within 2 hours",
      },
      {
        department: "Farmer Onboarding & IoT Sensor Kits",
        email: "growers@farmora.com",
        purpose: "Soil testing requests, 0 ৳ deposit telemetry sensors, and harvest scheduling.",
        responseTime: "Same-day response",
      },
      {
        department: "Institutional Buyers & Escrow Desk",
        email: "enterprise@farmora.com",
        purpose: "Cold-chain freight, batch volume hedging, and escrow contract terms.",
        responseTime: "Within 1 hour",
      },
      {
        department: "Partnerships, Press & AgTech Grants",
        email: "partners@farmora.com",
        purpose: "Agricultural research, government liaisons, and NGO collaborations.",
        responseTime: "Within 24 hours",
      },
    ],
    workingHours: {
      weekdays: {
        days: "Sunday – Thursday",
        hours: "8:30 AM – 6:30 PM",
        status: "Full Field & Trading Operations",
      },
      saturday: {
        days: "Saturday",
        hours: "9:00 AM – 2:00 PM",
        status: "Cold-Chain Logistics & Urgent Farmer Support",
      },
      friday: {
        days: "Friday",
        hours: "Automated Systems Only",
        status: "24/7 Digital Escrow & IoT Edge Monitoring Active",
      },
      timezone: "Bangladesh Standard Time (BST, UTC+6)",
      note: "Live IoT field sensors transmit telemetry 24 hours a day, 365 days a year without downtime.",
    },
    offices: [
      {
        id: "office-dhaka-hq",
        name: "Farmora Agritech Center (Headquarters)",
        hubType: "Headquarters",
        address: {
          division: "Dhaka",
          district: "Dhaka",
          upazila: "Tejgaon",
          postalCode: "1208",
          streetAddress: "Level 7, Farmora Agritech Center, 42 Shaheed Tajuddin Ahmed Sarani",
          area: "Tejgaon Industrial Area",
          country: "Bangladesh",
          landmark: "Opposite to Nabisco Bus Stop, near Channel i",
        },
        phone: "+880 2 9884501",
        email: "dhaka.hq@farmora.com",
        hours: "Sun – Thu: 8:30 AM – 6:30 PM",
        coordinates: {
          lat: 23.7693,
          lng: 90.3995,
        },
        mapEmbedUrl:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.536762319089!2d90.3973113!3d23.7693!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c777a8344e69%3A0x67db23a54b383be7!2sTejgaon%20Industrial%20Area%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd",
        directionsUrl: "https://maps.google.com/?q=Tejgaon+Industrial+Area,+Dhaka,+Bangladesh",
        activeSensorsMonitored: 1240,
      },
      {
        id: "office-bogura-hub",
        name: "Northern Agro-Cluster & Cold-Chain Hub",
        hubType: "Agro-Cluster Hub",
        address: {
          division: "Rajshahi",
          district: "Bogura",
          upazila: "Shibganj",
          postalCode: "5810",
          streetAddress: "Plot 14-16, Farmora Cold-Chain Center, Rangpur Road",
          area: "Mahasthangarh Agri-Corridor",
          country: "Bangladesh",
          landmark: "Adjacent to Bogura Rural Development Academy (RDA)",
        },
        phone: "+880 51 69211",
        email: "bogura.hub@farmora.com",
        hours: "Sun – Sat: 6:00 AM – 8:00 PM (Active Harvest Windows)",
        coordinates: {
          lat: 24.8510,
          lng: 89.3697,
        },
        mapEmbedUrl:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14503.743132170366!2d89.3597!3d24.851!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fc54e7e60e0a5d%3A0x40026e63dc366a70!2sBogra!5e0!3m2!1sen!2sbd!4v1700000000001!5m2!1sen!2sbd",
        directionsUrl: "https://maps.google.com/?q=Bogra,+Bangladesh",
        activeSensorsMonitored: 2180,
      },
      {
        id: "office-jashore-hub",
        name: "South-Western Vegetable & Soil Testing Hub",
        hubType: "Regional Cold-Chain Hub",
        address: {
          division: "Khulna",
          district: "Jashore",
          upazila: "Jashore Sadar",
          postalCode: "7400",
          streetAddress: "Holding 88, Agritech Incubation Complex, Arabpur",
          area: "Arabpur High-Tech Agriculture Zone",
          country: "Bangladesh",
          landmark: "Near Jashore University of Science & Technology (JUST)",
        },
        phone: "+880 421 68740",
        email: "jashore.hub@farmora.com",
        hours: "Sun – Thu: 7:00 AM – 5:00 PM",
        coordinates: {
          lat: 23.1664,
          lng: 89.2115,
        },
        mapEmbedUrl:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14690.697415494295!2d89.2015!3d23.1664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ff108bb6b9075d%3A0x33446c59b2aa260a!2sJessore!5e0!3m2!1sen!2sbd!4v1700000000002!5m2!1sen!2sbd",
        directionsUrl: "https://maps.google.com/?q=Jessore,+Bangladesh",
        activeSensorsMonitored: 1400,
      },
    ],
    faqs: [
      {
        id: "faq-ordering-1",
        category: "ordering",
        question: "How does Farmora's digital escrow protect institutional buyers and smallholders?",
        answer:
          "When an order or pre-order batch is placed, buyer funds are securely deposited into a Bangladesh Bank-regulated digital escrow account. Funds are never released to the farmer until the buyer receives the delivery, verifies the batch temperature cold-chain log, and confirms that moisture/purity parameters match the pre-order contract specifications. If a batch fails quality checks, escrow automatically initiates an instant refund.",
        highlight: "100% Capital Protection & Quality Guarantee",
      },
      {
        id: "faq-ordering-2",
        category: "ordering",
        question: "Can buyers pre-order unharvested crops to lock in wholesale prices?",
        answer:
          "Yes. Farmora allows institutional buyers, food processors, and supermarket chains to reserve entire harvest allotments 30 to 90 days ahead of maturity. Our ML price hedging projections help both parties lock in fair, index-based rates that protect against seasonal volatility and middlemen exploitation.",
        highlight: "Guaranteed Pre-Harvest Allotments",
      },
      {
        id: "faq-verification-1",
        category: "verification",
        question: "How are farms and soil health verified before listing on Farmora?",
        answer:
          "Every farm undergoes a rigorous 4-step verification protocol conducted by Farmora agronomists: (1) GPS boundary verification and satellite land audit, (2) on-site chemical pesticide and heavy metal residue laboratory tests, (3) calibration of soil pH and organic matter composition, and (4) installation of tamper-proof solar IoT telemetry probes. Only farms passing all checks receive the 'Farmora Verified' badge.",
        highlight: "Independent Agronomist Audits & Lab Testing",
      },
      {
        id: "faq-verification-2",
        category: "verification",
        question: "What standards are required for Certified Organic crop badges?",
        answer:
          "Farms designated as Organic must provide continuous zero-synthetic-fertilizer telemetry records for a minimum of 3 consecutive crop cycles, along with third-party certification aligned with Bangladesh Good Agricultural Practices (B-GAP) and regional organic oversight standards.",
        highlight: "B-GAP & 3-Cycle Residual Audits",
      },
      {
        id: "faq-delivery-1",
        category: "delivery",
        question: "What are the harvest-to-doorstep delivery timelines across divisions?",
        answer:
          "Produce is harvested exactly at physiological maturity during pre-calculated transpiration windows. Our cold-chain transit fleet delivers perishables to Dhaka metropolitan hubs within 12 to 18 hours of harvest, and inter-division routes (such as Rajshahi to Chittagong) within 24 hours under active 4°C to 12°C climate-controlled monitoring.",
        highlight: "Under 24-Hour Transpiration-Guaranteed Logistics",
      },
      {
        id: "faq-delivery-2",
        category: "delivery",
        question: "How does cryptographic QR batch tracing work on delivery crates?",
        answer:
          "Every shipping crate features a scannable tamper-proof QR code. Scanning reveals the specific GPS plot origin, farmer identity, harvest timestamp, soil sensor telemetry history during ripening, and vehicle transit temperature data.",
        highlight: "Farm-to-Fork Cryptographic Batch Trace",
      },
      {
        id: "faq-payments-1",
        category: "payments",
        question: "What payment methods are supported for retail and commercial orders?",
        answer:
          "Farmora supports corporate bank BEFTN/NPSB transfers, RTGS real-time gross settlement for bulk orders, corporate debit/credit cards, and regional MFS (bKash, Nagad, Rocket) for smallholder transactions, all seamlessly routed through our licensed escrow gateway.",
        highlight: "BEFTN, RTGS, Corporate Cards & MFS Supported",
      },
      {
        id: "faq-telemetry-1",
        category: "telemetry",
        question: "How do farmers qualify for the 0 ৳ deposit IoT edge sensor kit?",
        answer:
          "Any registered grower with at least 1 acre of active vegetable or grain cultivation who commits to transparent marketplace batch allocations qualifies for our subsidized IoT sensor deployment. Our field engineering team installs the solar sensor array at zero upfront cost.",
        highlight: "0 ৳ Upfront Deposit for Qualified Growers",
      },
    ],
  };
}
