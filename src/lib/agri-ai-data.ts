import type { AgriAiSectionData } from "@/types/agri-ai";

/**
 * Server-side data provider for the Agri AI Telemetry Engine section.
 * Provides the live telemetry metrics, edge AI advisory insights,
 * and ML price hedging predictions.
 */
export async function getAgriAiData(): Promise<AgriAiSectionData> {
  return {
    badge: "AgriAI Telemetry Engine",
    heading: {
      line1: "Decisions grounded in living",
      line2: "data, not guesswork.",
    },
    description:
      "Every plot in the Farmora network streams micro-level humidity, nitrogen indicators, and root-zone moisture to our edge prediction engine. Farmers boost their yield while institutional buyers get predictable volume delivery.",
    features: [
      {
        id: "feature-irrigation",
        icon: "droplet",
        title: "Dynamic Automated Irrigation Prompts",
        description:
          "Saves up to 34% groundwater by irrigating only during specific transpiration windows.",
      },
      {
        id: "feature-hedging",
        icon: "trending-up",
        title: "Market Price Hedging Forecasts",
        description:
          "Machine learning projections alert growers 14 days ahead of market demand dips.",
      },
    ],
    station: {
      stationId: "Station #BD-RAJ-881 (Barind High-Plateau)",
      shortName: "BD-RAJ-881",
      location: "Barind High-Plateau, Rajshahi",
      firmwareVersion: "v4.2.1",
      solarBatteryPercent: 98,
      isLive: true,
      statusLabel: "Live Data Stream",
      metrics: [
        {
          id: "metric-moisture",
          label: "Soil Moisture",
          icon: "droplet",
          value: "61%",
          statusBadge: {
            label: "Optimal",
            variant: "success",
          },
          subtext: "Field capacity: 55–65% target",
          progressPercent: 61,
          tooltipInfo: "Root-zone volumetric water content calibrated for loam clay soils.",
        },
        {
          id: "metric-temp",
          label: "Plot Ambient Temp",
          icon: "thermometer",
          value: "28.4°C",
          statusBadge: {
            label: "Sunny",
            variant: "warning",
          },
          subtext: "Daily Delta: ±4.2°C",
          progressPercent: 71,
          tooltipInfo: "Canopy thermal sensor calibrated with ground microclimate sensors.",
        },
        {
          id: "metric-humidity",
          label: "Canopy Humidity",
          icon: "wind",
          value: "73%",
          statusBadge: {
            label: "Stable",
            variant: "info",
          },
          subtext: "Dew point: 19.8°C",
          progressPercent: 73,
          tooltipInfo: "Vapor pressure deficit tracking to prevent early fungal spore formation.",
        },
      ],
      advisory: {
        badge: "AgriAI Live Advisory",
        confidence: "Verified Model 94.2% Confidence",
        message:
          "“Advisory: Barind Plot 3 irrigation optimal. Recommended harvest window: Nov 28–Dec 02 for maximum crispness and shelf longevity.”",
        timestamp: "Updated 4 mins ago",
      },
      priceForecast: {
        title: "Machine Learning Price Forecast (Bogura / Dhaka Hubs)",
        saturationIndex: "Winter harvest yield saturation index: Moderately Low",
        currency: "৳",
        currentSpot: 65,
        predictedMin: 69,
        predictedMax: 75,
        unit: "kg",
        trendDirection: "up",
      },
    },
    alternativeStations: [
      {
        stationId: "Station #BD-BOG-204 (Bogura Agro Hub)",
        shortName: "BD-BOG-204",
        location: "Shibganj, Bogura",
        firmwareVersion: "v4.2.0",
        solarBatteryPercent: 94,
        isLive: true,
        statusLabel: "Live Data Stream",
        metrics: [
          {
            id: "metric-moisture-bog",
            label: "Soil Moisture",
            icon: "droplet",
            value: "58%",
            statusBadge: {
              label: "Optimal",
              variant: "success",
            },
            subtext: "Field capacity: 55–65% target",
            progressPercent: 58,
            tooltipInfo: "Alluvial sandy loam moisture equilibrium reached.",
          },
          {
            id: "metric-temp-bog",
            label: "Plot Ambient Temp",
            icon: "thermometer",
            value: "27.1°C",
            statusBadge: {
              label: "Mild",
              variant: "warning",
            },
            subtext: "Daily Delta: ±3.8°C",
            progressPercent: 67,
            tooltipInfo: "Mild sunshine with zero heat stress indicators on foliage.",
          },
          {
            id: "metric-humidity-bog",
            label: "Canopy Humidity",
            icon: "wind",
            value: "76%",
            statusBadge: {
              label: "Stable",
              variant: "info",
            },
            subtext: "Dew point: 20.4°C",
            progressPercent: 76,
            tooltipInfo: "Transpiration rate steady within optimal photosynthesizing bands.",
          },
        ],
        advisory: {
          badge: "AgriAI Live Advisory",
          confidence: "Verified Model 96.1% Confidence",
          message:
            "“Advisory: Bogura Plot 1 nitrogen absorption at 91%. Nitrogen top-dress complete. Maintain current drip irrigation cadence.”",
          timestamp: "Updated 8 mins ago",
        },
        priceForecast: {
          title: "Machine Learning Price Forecast (Bogura / Karwan Bazar)",
          saturationIndex: "Winter harvest yield saturation index: Low Demand Friction",
          currency: "৳",
          currentSpot: 58,
          predictedMin: 64,
          predictedMax: 70,
          unit: "kg",
          trendDirection: "up",
        },
      },
    ],
  };
}
