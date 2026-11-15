"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Clock, MapPin, Package, ShieldCheck, Truck } from "lucide-react";
import toast from "react-hot-toast";

export default function BuyerDashboardPage() {
  const orders = [
    {
      id: "ORD-9281",
      crop: "Organic Tomatoes",
      farm: "Barind Tech Farm",
      location: "Bogura Valley",
      qty: "150 kg",
      price: "৳9,750",
      status: "Harvested",
      eta: "Nov 02 (Tomorrow)",
      image: "/crops/tomatoes.jpg",
      stages: ["Placed", "Confirmed", "Harvested", "Delivered"],
      currentStage: 2,
    },
    {
      id: "ORD-8812",
      crop: "Sonargaon Bell Peppers",
      farm: "Sonargaon Heritage",
      location: "Narayanganj",
      qty: "50 kg",
      price: "৳5,500",
      status: "Confirmed",
      eta: "Nov 08",
      image: "/crops/bell-peppers.jpg",
      stages: ["Placed", "Confirmed", "Harvested", "Delivered"],
      currentStage: 1,
    },
    {
      id: "ORD-7403",
      crop: "Winter Shonagachi Rice",
      farm: "Green Valley Agro",
      location: "Dinajpur",
      qty: "300 kg",
      price: "৳15,600",
      status: "Confirmed",
      eta: "Nov 15",
      image: "/crops/rice.jpg",
      stages: ["Placed", "Confirmed", "Harvested", "Delivered"],
      currentStage: 1,
    },
  ];

  return (
    <div data-ui="true" className="space-y-8">
      {/* Title Row */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between pb-6">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
            Buyer Procurement Terminal
          </h1>
          <p className="text-sm text-muted">
            Track active harvest pre-orders, verified origins, and cold-chain deliveries
          </p>
        </div>

        <Link
          href="/#crops"
          className="inline-flex items-center gap-1.5 rounded bg-accent px-4 py-2 text-xs font-semibold text-accent-foreground hover:opacity-90"
        >
          <span>Reserve New Crop Batch</span>
          <ArrowUpRight className="size-3.5" />
        </Link>
      </div>

      {/* KPI Container */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 rounded bg-surface p-6 border border-border">
        <div>
          <div className="text-xs font-medium text-muted">Active Pre-Orders</div>
          <div className="mt-1 font-display text-2xl font-bold text-foreground">
            3 Batches
          </div>
          <div className="text-xs text-muted mt-0.5">500 kg total produce</div>
        </div>

        <div>
          <div className="text-xs font-medium text-muted">Escrow Locked</div>
          <div className="mt-1 font-display text-2xl font-bold text-foreground">
            ৳30,850
          </div>
          <div className="text-xs text-accent mt-0.5">Protected until inspection</div>
        </div>

        <div>
          <div className="text-xs font-medium text-muted">Earliest Delivery</div>
          <div className="mt-1 font-display text-2xl font-bold text-foreground">
            Tomorrow
          </div>
          <div className="text-xs text-muted mt-0.5">Tomatoes (Barind Tech)</div>
        </div>

        <div>
          <div className="text-xs font-medium text-muted">Quality Assurance</div>
          <div className="mt-1 font-display text-2xl font-bold text-foreground">
            100%
          </div>
          <div className="text-xs text-accent mt-0.5">Soil sensor verified</div>
        </div>
      </div>

      {/* Active Orders List */}
      <div className="space-y-4">
        <h2 className="font-display text-xl font-bold text-foreground">
          Current Batch Orders
        </h2>

        <div className="space-y-4">
          {orders.map((ord) => (
            <div
              key={ord.id}
              className="rounded bg-surface p-6 text-foreground border border-border"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4">
                <div className="flex items-center gap-3">
                  <div className="relative size-12 shrink-0 overflow-hidden rounded bg-muted/20">
                    <Image src={ord.image} alt={ord.crop} fill className="object-cover" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-display text-lg font-bold">{ord.crop}</h3>
                      <span className="text-xs text-muted">({ord.id})</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted mt-0.5">
                      <MapPin className="size-3 text-accent" />
                      <span>{ord.farm} · {ord.location}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div>
                    <div className="text-xs text-muted">Batch Size</div>
                    <div className="font-semibold text-foreground">{ord.qty}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted">Escrow Price</div>
                    <div className="font-display text-lg font-bold text-foreground">{ord.price}</div>
                  </div>
                </div>
              </div>

              {/* Lifecycle Progress Bar */}
              <div className="mt-6">
                <div className="grid grid-cols-4 gap-2 text-xs">
                  {ord.stages.map((stage, idx) => {
                    const isDone = idx <= ord.currentStage;
                    const isCurrent = idx === ord.currentStage;
                    return (
                      <div key={stage} className="flex flex-col gap-1">
                        <div
                          className={`h-1.5 w-full rounded-full ${
                            isDone ? "bg-accent" : "bg-surface-secondary"
                          }`}
                        />
                        <div className="flex items-center justify-between">
                          <span
                            className={`font-medium ${
                              isCurrent
                                ? "text-accent font-bold"
                                : isDone
                                ? "text-foreground"
                                : "text-muted"
                            }`}
                          >
                            {stage}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 flex items-center justify-between text-xs text-muted pt-2">
                  <div className="flex items-center gap-1.5">
                    <Clock className="size-3.5 text-accent" />
                    <span>Estimated Gate Arrival: {ord.eta}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="size-3.5 text-accent" />
                    <span>Regulated Escrow Verified</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
