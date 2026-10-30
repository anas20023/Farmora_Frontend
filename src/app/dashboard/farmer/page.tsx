"use client";

import { useState } from "react";
import Image from "next/image";
import { Activity, CheckCircle2, ChevronRight, Cpu, Droplet, Radio, Sun, Thermometer, Tractor, TrendingUp } from "lucide-react";
import toast from "react-hot-toast";

export default function FarmerDashboardPage() {
  const [selectedPlot, setSelectedPlot] = useState("Plot B-4");

  const plots = [
    {
      id: "Plot B-4",
      crop: "Organic Tomatoes",
      location: "Bogura Valley",
      moisture: "61%",
      ec: "1.4 mS/cm",
      temp: "24.6°C",
      stage: "Fruiting (Week 7)",
      harvestIn: "6 days",
      escrowOrders: "142 kg reserved",
      image: "/crops/tomatoes.jpg",
    },
    {
      id: "Plot A-1",
      crop: "Winter Shonagachi Rice",
      location: "Barind Tech Plot",
      moisture: "14%",
      ec: "0.8 mS/cm",
      temp: "26.1°C",
      stage: "Grain Fill",
      harvestIn: "14 days",
      escrowOrders: "400 kg reserved",
      image: "/crops/rice.jpg",
    },
    {
      id: "Plot S-9",
      crop: "Crisp Bell Peppers",
      location: "Sonargaon Heritage",
      moisture: "58%",
      ec: "1.2 mS/cm",
      temp: "23.8°C",
      stage: "Flowering",
      harvestIn: "18 days",
      escrowOrders: "85 kg reserved",
      image: "/crops/bell-peppers.jpg",
    },
  ];

  const current = plots.find((p) => p.id === selectedPlot) || plots[0];

  const handleHarvestReady = () => {
    toast.success(`Harvest notification dispatched to registered buyers for ${current.crop}! Escrow cold-chain transit initiated.`, {
      style: {
        borderRadius: "4px",
        background: "#0c7866",
        color: "#ffffff",
        fontSize: "13px",
      },
    });
  };

  return (
    <div data-ui="true" className="space-y-8">
      {/* Title Row */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between pb-6">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
            Farmer Production Console
          </h1>
          <p className="text-sm text-muted">
            Telemetry node telemetry, active crop stages, and buyer pre-order allocations
          </p>
        </div>

        <button
          type="button"
          onClick={handleHarvestReady}
          className="rounded bg-accent px-4 py-2 text-xs font-semibold text-accent-foreground hover:opacity-90"
        >
          Signal Harvest Readiness
        </button>
      </div>

      {/* KPI Container (measured typography, not tiles) */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 rounded bg-surface p-6 border border-border">
        <div>
          <div className="text-xs font-medium text-muted">Monitored Plots</div>
          <div className="mt-1 font-display text-2xl font-bold text-foreground">
            3 Active
          </div>
          <div className="text-xs text-accent mt-0.5">All sensors live</div>
        </div>

        <div>
          <div className="text-xs font-medium text-muted">Soil Moisture (Average)</div>
          <div className="mt-1 font-display text-2xl font-bold text-foreground">
            61.4%
          </div>
          <div className="text-xs text-muted mt-0.5">Optimal VWC range</div>
        </div>

        <div>
          <div className="text-xs font-medium text-muted">Escrowed Pre-Orders</div>
          <div className="mt-1 font-display text-2xl font-bold text-foreground">
            ৳148,500
          </div>
          <div className="text-xs text-accent mt-0.5">+18% vs last cycle</div>
        </div>

        <div>
          <div className="text-xs font-medium text-muted">Next Harvest Window</div>
          <div className="mt-1 font-display text-2xl font-bold text-foreground">
            6 Days
          </div>
          <div className="text-xs text-muted mt-0.5">Plot B-4 (Tomatoes)</div>
        </div>
      </div>

      {/* Main Grid: Telemetry Details & Crop Selector + Rail */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Main Column (8 cols) */}
        <div className="space-y-6 lg:col-span-8">
          {/* Plot Switcher */}
          <div className="flex items-center gap-2">
            {plots.map((plot) => (
              <button
                key={plot.id}
                type="button"
                onClick={() => setSelectedPlot(plot.id)}
                className={`rounded px-3 py-1.5 text-xs font-medium transition-colors ${
                  selectedPlot === plot.id
                    ? "bg-foreground text-background"
                    : "bg-surface text-muted hover:text-foreground border border-border"
                }`}
              >
                {plot.id}: {plot.crop}
              </button>
            ))}
          </div>

          {/* Active Plot Telemetry Card */}
          <div className="rounded bg-surface p-6 text-foreground border border-border">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6">
              <div className="flex items-center gap-3">
                <div className="relative size-12 shrink-0 overflow-hidden rounded bg-muted/20">
                  <Image src={current.image} alt={current.crop} fill className="object-cover" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold">{current.crop}</h3>
                  <p className="text-xs text-muted">{current.location} · {current.stage}</p>
                </div>
              </div>

              <div className="text-right">
                <div className="text-xs font-medium text-muted">Pre-Order Reservation</div>
                <div className="font-display text-lg font-bold text-accent">{current.escrowOrders}</div>
              </div>
            </div>

            {/* In-Soil Real-time Telemetry Metrics */}
            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="rounded bg-surface-secondary p-4">
                <div className="flex items-center gap-1.5 text-xs text-muted">
                  <Droplet className="size-3.5 text-accent" />
                  <span>Soil Moisture</span>
                </div>
                <div className="mt-1.5 font-display text-2xl font-bold text-foreground">
                  {current.moisture}
                </div>
                <div className="text-[11px] text-muted mt-0.5">Target: 55-65%</div>
              </div>

              <div className="rounded bg-surface-secondary p-4">
                <div className="flex items-center gap-1.5 text-xs text-muted">
                  <Activity className="size-3.5 text-accent" />
                  <span>EC Salinity</span>
                </div>
                <div className="mt-1.5 font-display text-2xl font-bold text-foreground">
                  {current.ec}
                </div>
                <div className="text-[11px] text-muted mt-0.5">Mineral balanced</div>
              </div>

              <div className="rounded bg-surface-secondary p-4">
                <div className="flex items-center gap-1.5 text-xs text-muted">
                  <Thermometer className="size-3.5 text-amber-600" />
                  <span>Root Temp</span>
                </div>
                <div className="mt-1.5 font-display text-2xl font-bold text-foreground">
                  {current.temp}
                </div>
                <div className="text-[11px] text-muted mt-0.5">Optimal growth</div>
              </div>
            </div>

            {/* AI Crop Recommendation */}
            <div className="mt-6 rounded bg-surface-secondary p-4 border border-rule">
              <div className="flex items-center gap-2 text-xs font-semibold text-accent">
                <Cpu className="size-4" />
                <span>AgriAI Growth Optimization</span>
              </div>
              <p className="mt-2 text-xs text-muted leading-relaxed">
                Soil volumetric water content is steady. Sugar Brix synthesis indicates peak flavor maturity in 6 days. Maintain current drip irrigation cadence of 2.4L/bed at dawn.
              </p>
            </div>
          </div>
        </div>

        {/* Rail Column (4 cols) */}
        <div className="space-y-6 lg:col-span-4">
          <div className="rounded bg-surface p-5 text-foreground border border-border">
            <h4 className="font-display text-base font-bold text-foreground pb-3">
              Incoming Batch Orders
            </h4>

            <div className="mt-4 space-y-3 text-xs">
              <div className="rounded bg-surface-secondary p-3">
                <div className="flex justify-between font-semibold text-foreground">
                  <span>Agrifood Logistics Dhaka</span>
                  <span className="text-accent">৳52,000</span>
                </div>
                <div className="mt-1 text-muted">800 kg · Winter Rice · Escrow Locked</div>
                <div className="mt-2 text-[11px] text-muted">Delivery Target: Nov 12</div>
              </div>

              <div className="rounded bg-surface-secondary p-3">
                <div className="flex justify-between font-semibold text-foreground">
                  <span>Green Basket Retail</span>
                  <span className="text-accent">৳18,200</span>
                </div>
                <div className="mt-1 text-muted">280 kg · Organic Tomatoes · Escrow Locked</div>
                <div className="mt-2 text-[11px] text-muted">Delivery Target: Nov 04</div>
              </div>

              <div className="rounded bg-surface-secondary p-3">
                <div className="flex justify-between font-semibold text-foreground">
                  <span>Bengal Fresh Wholesale</span>
                  <span className="text-accent">৳22,000</span>
                </div>
                <div className="mt-1 text-muted">200 kg · Bell Peppers · Escrow Locked</div>
                <div className="mt-2 text-[11px] text-muted">Delivery Target: Nov 16</div>
              </div>
            </div>

            <div className="mt-4 pt-3 text-center">
              <span className="text-xs text-muted">Escrow funds released 2h post delivery receipt</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
