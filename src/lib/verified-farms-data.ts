import type { FeaturedFarmsSectionData } from "@/types/farms";

/**
 * Server-side data provider for the Farmora Featured Verified Farms section.
 * Supplies audited grower telemetry, soil certifications, active crop batches,
 * and regional accreditation info across Bangladesh.
 */
export async function getVerifiedFarmsData(): Promise<FeaturedFarmsSectionData> {
  return {
    overline: "AUDITED AGRICULTURAL PARTNERS",
    title: "Featured Verified Farms",
    description:
      "Every farm is physically inspected, soil-tested, and equipped with telemetry nodes for full transparency.",
    viewAllLink: {
      label: "View All 1,240+ Verified Farms",
      href: "#verified-farms",
    },
    farms: [
      {
        id: "farm-green-valley",
        name: "Green Valley Agro",
        location: "Bogura • 12 Acres",
        district: "Bogura",
        acreage: "12 Acres",
        badge: {
          label: "Certified Organic",
          iconName: "organic",
        },
        rating: {
          score: 4.9,
          reviewsCount: 128,
        },
        soilComposition: "Rich Alluvial Loam (pH 6.6)",
        activeHarvests: "Tomatoes, Broccoli, Cabbage",
        telemetry: {
          sensorCount: 6,
          statusText: "6 Sensors Online",
          lastUpdated: "2 mins ago",
          soilMoisture: "38% Optimal",
          soilPh: "6.6 Balanced",
          canopyTemp: "24.5°C",
        },
        image: "/farms/green-valley.jpg",
        farmerName: "Tariqul Islam & Family",
        inspectionDate: "October 02, 2026",
        description:
          "Specializes in organic certified winter brassicas and vine tomatoes using solar-powered sub-surface drip irrigation and real-time nutrient telemetry in the Karatoya river basin.",
        batches: [
          {
            id: "batch-gv-1",
            cropName: "Vine-Ripened Organic Tomatoes",
            harvestWindow: "Nov 28 - Dec 05",
            quantityAvailable: "1,420 kg",
            unitPrice: "৳ 65/kg",
          },
          {
            id: "batch-gv-2",
            cropName: "Crisp Winter Cauliflower",
            harvestWindow: "Nov 22 - Nov 30",
            quantityAvailable: "850 pcs",
            unitPrice: "৳ 45/piece",
          },
          {
            id: "batch-gv-3",
            cropName: "Savoy Organic Cabbage",
            harvestWindow: "Dec 10 - Dec 18",
            quantityAvailable: "1,200 pcs",
            unitPrice: "৳ 38/piece",
          },
        ],
      },
      {
        id: "farm-sonargaon-heritage",
        name: "Sonargaon Heritage Farm",
        location: "Narayanganj • 8 Acres",
        district: "Narayanganj",
        acreage: "8 Acres",
        badge: {
          label: "Heritage Grower",
          iconName: "heritage",
        },
        rating: {
          score: 4.85,
          reviewsCount: 94,
        },
        soilComposition: "Meghna Silt Basin (pH 6.9)",
        activeHarvests: "Miniket Rice, Winter Gourds",
        telemetry: {
          sensorCount: 4,
          statusText: "4 Sensors Online",
          lastUpdated: "Just now",
          soilMoisture: "44% Moist",
          soilPh: "6.9 Optimal",
          canopyTemp: "26.1°C",
        },
        image: "/farms/sonargaon-heritage.jpg",
        farmerName: "Abdur Rashid Bhuiyan",
        inspectionDate: "September 18, 2026",
        description:
          "Third-generation agro-heritage estate cultivating aromatic indigenous rice grains and water gourds along the Meghna river tributary with zero synthetic pesticides.",
        batches: [
          {
            id: "batch-sh-1",
            cropName: "Premium Miniket Aromatic Rice",
            harvestWindow: "Dec 12 - Dec 20",
            quantityAvailable: "4,800 kg",
            unitPrice: "৳ 78/kg",
          },
          {
            id: "batch-sh-2",
            cropName: "Sweet Winter Bottle Gourds",
            harvestWindow: "Nov 15 - Nov 25",
            quantityAvailable: "650 pcs",
            unitPrice: "৳ 55/piece",
          },
        ],
      },
      {
        id: "farm-barind-tech",
        name: "Barind Tech Orchards",
        location: "Rajshahi • 15 Acres",
        district: "Rajshahi",
        acreage: "15 Acres",
        badge: {
          label: "IoT Full-Coverage",
          iconName: "iot",
        },
        rating: {
          score: 4.95,
          reviewsCount: 210,
        },
        soilComposition: "Barind Red Clay (pH 5.8)",
        activeHarvests: "Guavas, Bell Peppers, Pulses",
        telemetry: {
          sensorCount: 10,
          statusText: "10 Sensors Online",
          lastUpdated: "1 min ago",
          soilMoisture: "32% Controlled",
          soilPh: "5.8 Acidic Loam",
          canopyTemp: "25.0°C",
        },
        image: "/farms/barind-tech.jpg",
        farmerName: "Dr. Farhana Yasmin",
        inspectionDate: "October 08, 2026",
        description:
          "Precision-agriculture model orchard utilizing Dutch micro-drip fertigation, sensor mesh telemetry nodes, and integrated pest management in the high Barind tract.",
        batches: [
          {
            id: "batch-bt-1",
            cropName: "Hydroponic Sweet Bell Peppers",
            harvestWindow: "Dec 05 - Dec 15",
            quantityAvailable: "650 kg",
            unitPrice: "৳ 120/kg",
          },
          {
            id: "batch-bt-2",
            cropName: "Thai Super Sweet Guavas",
            harvestWindow: "Nov 30 - Dec 10",
            quantityAvailable: "2,400 kg",
            unitPrice: "৳ 85/kg",
          },
          {
            id: "batch-bt-3",
            cropName: "High-Protein Lentil Pulses",
            harvestWindow: "Jan 05 - Jan 15",
            quantityAvailable: "3,100 kg",
            unitPrice: "৳ 140/kg",
          },
        ],
      },
    ],
  };
}
