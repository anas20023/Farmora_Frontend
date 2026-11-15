"use client";

import Link from "next/link";
import { Users } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminDashboardPage() {
  const farmApplications = [
    {
      id: "APP-042",
      farm: "Meghna Alluvial Silt Plots",
      farmer: "Kamrul Hassan",
      region: "Chandpur",
      acres: "18.5 Acres",
      soilType: "River Silt Loam",
      sensors: "4 Solar Nodes Pending",
      submitted: "2 days ago",
    },
    {
      id: "APP-039",
      farm: "Rangpur Bio-Canopy Growers",
      farmer: "Nazmul Haque",
      region: "Rangpur",
      acres: "24.0 Acres",
      soilType: "Sandy Alluvium",
      sensors: "6 Nodes Ready",
      submitted: "4 days ago",
    },
  ];

  const handleApprove = (name: string) => {
    toast.success(`Farm certification approved for ${name}. Telemetry gateway keys generated.`);
  };

  const handleReject = (name: string) => {
    toast(`Farm application for ${name} flagged for re-inspection.`);
  };

  return (
    <div data-ui="true" className="space-y-8">
      {/* Title Row */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between pb-6">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
            Platform Operations & Moderation
          </h1>
          <p className="text-sm text-muted">
            Telemetry node telemetry, producer certification queue, and escrow transaction oversight
          </p>
        </div>

        <Link
          href="/dashboard/admin/users"
          className="inline-flex items-center gap-1.5 rounded bg-accent px-4 py-2 text-xs font-semibold text-accent-foreground hover:opacity-90"
        >
          <Users className="size-3.5" />
          <span>Manage Platform Users</span>
        </Link>
      </div>

      {/* KPI Container */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 rounded bg-surface p-6 border border-border">
        <div>
          <div className="text-xs font-medium text-muted">Online IoT Nodes</div>
          <div className="mt-1 font-display text-2xl font-bold text-foreground">
            240 / 242
          </div>
          <div className="text-xs text-accent mt-0.5">99.2% uptime ping</div>
        </div>

        <div>
          <div className="text-xs font-medium text-muted">Verification Queue</div>
          <div className="mt-1 font-display text-2xl font-bold text-foreground">
            2 Pending
          </div>
          <div className="text-xs text-muted mt-0.5">Avg turnaround 36h</div>
        </div>

        <div>
          <div className="text-xs font-medium text-muted">Active Escrow Volume</div>
          <div className="mt-1 font-display text-2xl font-bold text-foreground">
            ৳4.8M
          </div>
          <div className="text-xs text-accent mt-0.5">Zero escrow disputes</div>
        </div>

        <div>
          <div className="text-xs font-medium text-muted">AgriAI Model Accuracy</div>
          <div className="mt-1 font-display text-2xl font-bold text-foreground">
            94.2%
          </div>
          <div className="text-xs text-muted mt-0.5">Harvest date precision</div>
        </div>
      </div>

      {/* Moderation & Gateway Health */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Pending Farm Certifications */}
        <div className="space-y-4 lg:col-span-8">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-bold text-foreground">
              Farm Certification Applications
            </h2>
            <span className="text-xs text-muted">Requires verification audit</span>
          </div>

          <div className="space-y-3">
            {farmApplications.map((app) => (
              <div
                key={app.id}
                className="rounded bg-surface p-5 text-foreground border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-lg font-bold">{app.farm}</h3>
                    <span className="text-xs text-muted">({app.id})</span>
                  </div>
                  <div className="mt-1 text-xs text-muted">
                    Farmer: <span className="text-foreground font-medium">{app.farmer}</span> · {app.region} · {app.acres}
                  </div>
                  <div className="mt-1 text-xs text-muted">
                    Soil: {app.soilType} · Telemetry: {app.sensors}
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-center">
                  <button
                    type="button"
                    onClick={() => handleReject(app.farm)}
                    className="rounded border border-border bg-surface px-3 py-1.5 text-xs font-medium text-danger hover:bg-surface-secondary"
                  >
                    Flag Audit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleApprove(app.farm)}
                    className="rounded bg-accent px-3 py-1.5 text-xs font-semibold text-accent-foreground hover:opacity-90"
                  >
                    Approve Certification
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Telemetry Gateway Health Status */}
        <div className="space-y-4 lg:col-span-4">
          <h2 className="font-display text-xl font-bold text-foreground">
            Gateway Health
          </h2>

          <div className="rounded bg-surface p-5 text-foreground border border-border space-y-3 text-xs">
            <div className="flex items-center justify-between pb-2">
              <div>
                <div className="font-bold text-foreground">Bogura Base Gateway #1</div>
                <div className="text-muted">84 nodes connected</div>
              </div>
              <span className="text-accent font-semibold">Healthy (99.8%)</span>
            </div>

            <div className="flex items-center justify-between pb-2">
              <div>
                <div className="font-bold text-foreground">Dinajpur Sub-Station #3</div>
                <div className="text-muted">68 nodes connected</div>
              </div>
              <span className="text-accent font-semibold">Healthy (99.4%)</span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold text-foreground">Narayanganj Delta Node #7</div>
                <div className="text-muted">42 nodes connected</div>
              </div>
              <span className="text-accent font-semibold">Healthy (98.9%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
