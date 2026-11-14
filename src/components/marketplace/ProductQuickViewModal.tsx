"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  X,
  MapPin,
  ShieldCheck,
  Star,
  Cpu,
  Calendar,
  Sparkles,
  ShoppingBag,
  Plus,
  Minus,
  CheckCircle2,
  Tractor,
  Layers,
  Thermometer,
  Droplets,
  Activity,
  ArrowRight,
} from "lucide-react";
import { Button, Chip } from "@heroui/react";
import type { ProductListing } from "@/types/marketplace";

interface ProductQuickViewModalProps {
  listing: ProductListing | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (listing: ProductListing, quantity: number) => void;
}

export default function ProductQuickViewModal({
  listing,
  isOpen,
  onClose,
  onAddToCart,
}: ProductQuickViewModalProps) {
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [quantity, setQuantity] = useState(50);
  const [activeTab, setActiveTab] = useState<"details" | "telemetry" | "reviews">("details");

  useEffect(() => {
    if (listing) {
      setSelectedImageIdx(0);
      setQuantity(listing.minOrderQuantity || 50);
      setActiveTab("details");
    }
  }, [listing]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !listing) return null;

  const isPreOrder = listing.listingType === "PRE_ORDER";
  const step = listing.minOrderQuantity >= 100 ? 50 : 10;
  const unitClean = listing.unit.replace("/", "");
  const totalPrice = quantity * listing.pricePerUnit;

  const handleIncrement = () => {
    if (quantity + step <= listing.availableQuantity) {
      setQuantity((q) => q + step);
    }
  };

  const handleDecrement = () => {
    if (quantity - step >= listing.minOrderQuantity) {
      setQuantity((q) => q - step);
    }
  };

  const handleOrder = () => {
    onAddToCart(listing, quantity);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="quick-view-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[92svh] w-full max-w-4xl overflow-y-auto rounded-lg border border-border bg-surface text-foreground shadow-2xl"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal dialog"
          className="absolute top-4 right-4 z-20 rounded-full border border-border/80 bg-surface/80 p-1.5 text-muted hover:text-foreground backdrop-blur-xs transition-colors"
        >
          <X className="size-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6">
          {/* Left Column: Visual Gallery & Key Farm Details */}
          <div className="md:col-span-5 space-y-4">
            {/* Main Stage Image */}
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md border border-border bg-surface-secondary">
              {listing.images[selectedImageIdx] ? (
                <Image
                  src={listing.images[selectedImageIdx].url}
                  alt={listing.images[selectedImageIdx].alt || listing.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover"
                />
              ) : null}

              {/* Status Badge */}
              <div className="absolute top-2.5 left-2.5">
                {isPreOrder ? (
                  <span className="inline-flex items-center gap-1 rounded bg-amber-500/90 text-white px-2 py-0.5 text-xs font-semibold backdrop-blur-xs">
                    <Sparkles className="size-3" />
                    Pre-Order Harvest
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded bg-emerald-600/90 text-white px-2 py-0.5 text-xs font-semibold backdrop-blur-xs">
                    <CheckCircle2 className="size-3" />
                    In Stock • Ready
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail Strip */}
            {listing.images.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {listing.images.map((img, idx) => (
                  <button
                    key={img.id}
                    type="button"
                    onClick={() => setSelectedImageIdx(idx)}
                    className={`relative size-16 shrink-0 overflow-hidden rounded border transition-all ${
                      selectedImageIdx === idx
                        ? "border-accent ring-2 ring-accent/30"
                        : "border-border opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img.url}
                      alt={img.alt}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Farm Profile Snippet */}
            <div className="rounded-md border border-border bg-surface-secondary/40 p-3 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-foreground flex items-center gap-1">
                  <Tractor className="size-3.5 text-accent" />
                  {listing.farm.name}
                </span>
                {listing.farm.verified && (
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-0.5">
                    <ShieldCheck className="size-3" />
                    Verified Farm
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1 text-muted">
                <MapPin className="size-3 text-accent" />
                <span>
                  {listing.farm.location}, {listing.farm.district},{" "}
                  {listing.farm.division}
                </span>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-border/60 text-muted">
                <span>Producer: {listing.farm.ownerName}</span>
                <span>Acreage: {listing.farm.acreage}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Specifications, Telemetry, Pricing & Stepper */}
          <div className="md:col-span-7 flex flex-col justify-between space-y-4">
            <div>
              {/* Category & Botanical */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="rounded bg-accent/10 px-2 py-0.5 font-bold text-accent uppercase tracking-wider text-[10px]">
                  {listing.cropCategory}
                </span>
                {listing.cropType.botanicalName && (
                  <span className="italic text-muted font-mono text-[11px]">
                    {listing.cropType.botanicalName}
                  </span>
                )}
                {listing.organicCertified && (
                  <span className="rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 font-semibold text-[10px] flex items-center gap-1">
                    <ShieldCheck className="size-3" />
                    Organic Certified
                  </span>
                )}
              </div>

              {/* Title */}
              <h2
                id="quick-view-title"
                className="mt-2 font-display text-2xl font-bold tracking-tight text-foreground"
              >
                {listing.title}
              </h2>

              {/* Rating & Total Reviews */}
              <div className="mt-1 flex items-center gap-2 text-xs">
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`size-3.5 ${
                        i < Math.floor(listing.averageRating)
                          ? "fill-amber-500 text-amber-500"
                          : "text-muted/40"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-bold text-foreground">
                  {listing.averageRating.toFixed(1)}
                </span>
                <span className="text-muted">
                  ({listing.totalReviews} verified buyer reviews)
                </span>
              </div>

              {/* Modal Sub-Tabs */}
              <div className="mt-4 flex border-b border-border text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setActiveTab("details")}
                  className={`pb-2 px-3 transition-colors ${
                    activeTab === "details"
                      ? "border-b-2 border-accent text-accent"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  Overview & Specs
                </button>
                {listing.cropCycle && (
                  <button
                    type="button"
                    onClick={() => setActiveTab("telemetry")}
                    className={`pb-2 px-3 flex items-center gap-1 transition-colors ${
                      activeTab === "telemetry"
                        ? "border-b-2 border-accent text-accent"
                        : "text-muted hover:text-foreground"
                    }`}
                  >
                    <Cpu className="size-3.5" />
                    IoT Soil Telemetry
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setActiveTab("reviews")}
                  className={`pb-2 px-3 transition-colors ${
                    activeTab === "reviews"
                      ? "border-b-2 border-accent text-accent"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  Buyer Reviews ({listing.reviews.length})
                </button>
              </div>

              {/* Tab Contents */}
              <div className="mt-3 text-xs text-foreground/90 leading-relaxed min-h-[140px]">
                {activeTab === "details" && (
                  <div className="space-y-3">
                    <p className="text-muted text-xs leading-relaxed">
                      {listing.description}
                    </p>

                    {/* Specs Table */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2">
                      <div className="rounded border border-border/60 bg-surface-secondary/30 p-2">
                        <span className="block text-[10px] text-muted">Quality Grade</span>
                        <span className="font-semibold">{listing.specs?.grade || "Grade A"}</span>
                      </div>
                      <div className="rounded border border-border/60 bg-surface-secondary/30 p-2">
                        <span className="block text-[10px] text-muted">Harvest Window</span>
                        <span className="font-semibold">{listing.estimatedDeliveryWindow}</span>
                      </div>
                      <div className="rounded border border-border/60 bg-surface-secondary/30 p-2">
                        <span className="block text-[10px] text-muted">Packaging</span>
                        <span className="font-semibold truncate block">{listing.specs?.packaging || "Standard Crates"}</span>
                      </div>
                      {listing.specs?.originPlot && (
                        <div className="rounded border border-border/60 bg-surface-secondary/30 p-2">
                          <span className="block text-[10px] text-muted">Plot Origin</span>
                          <span className="font-semibold">{listing.specs.originPlot}</span>
                        </div>
                      )}
                      {listing.specs?.brixSugarLevel && (
                        <div className="rounded border border-border/60 bg-surface-secondary/30 p-2">
                          <span className="block text-[10px] text-muted">Brix Sweetness</span>
                          <span className="font-semibold text-amber-600 dark:text-amber-400">
                            {listing.specs.brixSugarLevel}
                          </span>
                        </div>
                      )}
                      <div className="rounded border border-border/60 bg-surface-secondary/30 p-2">
                        <span className="block text-[10px] text-muted">Available Stock</span>
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                          {listing.availableQuantity.toLocaleString()} {unitClean}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "telemetry" && listing.cropCycle && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-foreground">
                        Cycle Code: {listing.cropCycle.cycleCode}
                      </span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                        <Activity className="size-3.5" />
                        Crop Health Index: {listing.cropCycle.healthIndex || 95}%
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div className="rounded border border-border bg-surface-secondary/40 p-2.5">
                        <div className="flex items-center gap-1 text-[10px] text-muted mb-1">
                          <Droplets className="size-3 text-sky-500" />
                          Soil Moisture
                        </div>
                        <div className="font-semibold text-xs text-foreground">
                          {listing.cropCycle.currentSoilMoisture || "62% Optimal"}
                        </div>
                      </div>

                      <div className="rounded border border-border bg-surface-secondary/40 p-2.5">
                        <div className="flex items-center gap-1 text-[10px] text-muted mb-1">
                          <Thermometer className="size-3 text-amber-500" />
                          Canopy Temp
                        </div>
                        <div className="font-semibold text-xs text-foreground">
                          {listing.cropCycle.currentCanopyTemp || "23.5°C"}
                        </div>
                      </div>

                      <div className="rounded border border-border bg-surface-secondary/40 p-2.5">
                        <div className="flex items-center gap-1 text-[10px] text-muted mb-1">
                          <Layers className="size-3 text-emerald-500" />
                          Soil pH
                        </div>
                        <div className="font-semibold text-xs text-foreground">
                          {listing.cropCycle.currentPh || "6.6 (Neutral)"}
                        </div>
                      </div>
                    </div>

                    <div className="rounded bg-accent/5 border border-accent/20 p-2.5 text-[11px] text-muted">
                      <strong className="text-foreground">Current Cultivation Stage: </strong>
                      {listing.cropCycle.stageName}. Sensor probes broadcast continuous hourly moisture and nitrogen readings directly to Farmora telemetry servers.
                    </div>
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                    {listing.reviews.map((rev) => (
                      <div
                        key={rev.id}
                        className="rounded border border-border/60 bg-surface-secondary/30 p-2.5 space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-foreground">
                            {rev.authorName}
                          </span>
                          <span className="text-[10px] text-muted">
                            {rev.createdAt}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-amber-500">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="size-3 fill-amber-500" />
                          ))}
                          <span className="text-[10px] text-muted ml-1">
                            {rev.authorRole.replace("_", " ")}
                          </span>
                        </div>
                        <p className="text-xs text-foreground/80">
                          &quot;{rev.comment}&quot;
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Actions: Stepper, Pricing & Add to Cart */}
            <div className="pt-4 border-t border-border space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                {/* Stepper */}
                <div>
                  <label className="block text-[11px] font-semibold text-muted uppercase tracking-wider mb-1">
                    Order Quantity ({unitClean})
                  </label>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={handleDecrement}
                      disabled={quantity <= listing.minOrderQuantity}
                      className="size-9 flex items-center justify-center rounded border border-border bg-surface text-foreground hover:bg-surface-secondary disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="size-3.5" />
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => {
                        const val = parseInt(e.target.value, 10);
                        if (!isNaN(val)) setQuantity(val);
                      }}
                      min={listing.minOrderQuantity}
                      max={listing.availableQuantity}
                      className="w-24 text-center font-mono font-bold text-sm h-9 rounded border border-border bg-surface text-foreground focus:border-accent focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleIncrement}
                      disabled={quantity + step > listing.availableQuantity}
                      className="size-9 flex items-center justify-center rounded border border-border bg-surface text-foreground hover:bg-surface-secondary disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="size-3.5" />
                    </button>
                  </div>
                </div>

                {/* Total Price Display */}
                <div className="text-right">
                  <span className="text-[11px] text-muted block">
                    Total Estimated Value
                  </span>
                  <div className="font-display text-2xl font-black text-foreground">
                    ৳{totalPrice.toLocaleString()} <span className="text-xs font-normal text-muted">BDT</span>
                  </div>
                  <span className="text-[10px] text-muted">
                    ৳{listing.pricePerUnit} per {unitClean}
                  </span>
                </div>
              </div>

              {/* Order Button */}
              <div className="pt-2">
                <Button
                  variant="primary"
                  size="md"
                  onPress={handleOrder}
                  className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-accent-foreground font-bold shadow-md"
                >
                  <ShoppingBag className="size-4" />
                  <span>
                    {isPreOrder
                      ? `Pre-Order ${quantity} ${unitClean} with BDT Escrow`
                      : `Add ${quantity} ${unitClean} to Purchase Order`}
                  </span>
                  <ArrowRight className="size-4" />
                </Button>
              </div>

              {/* Escrow note */}
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-muted text-center pt-1">
                <ShieldCheck className="size-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>
                  Payments held in Farmora escrow until delivery inspection and moisture confirmation.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
