"use client";

import Image from "next/image";
import { Card, Button, Chip } from "@heroui/react";
import {
  MapPin,
  ShieldCheck,
  Star,
  ShoppingBag,
  Eye,
  Calendar,
  Sparkles,
  Cpu,
  Package,
} from "lucide-react";
import type { ProductListing } from "@/types/marketplace";

interface ProductCardProps {
  listing: ProductListing;
  onQuickView: (listing: ProductListing) => void;
  onAddToCart: (listing: ProductListing) => void;
}

export default function ProductCard({
  listing,
  onQuickView,
  onAddToCart,
}: ProductCardProps) {
  const primaryImage =
    listing.images.find((img) => img.isPrimary) || listing.images[0];
  const isPreOrder = listing.listingType === "PRE_ORDER";

  // Calculate rating stars
  const fullStars = Math.floor(listing.averageRating);
  const hasHalfStar = listing.averageRating - fullStars >= 0.5;

  return (
    <article className="group h-full flex flex-col">
      <Card
        variant="default"
        className="h-full flex flex-col overflow-hidden rounded-lg border border-border bg-surface shadow-2xs transition-all duration-200 hover:border-accent/40 hover:shadow-md"
      >
        {/* Top Media Region */}
        <div className="relative aspect-[16/11] w-full overflow-hidden bg-surface-secondary">
          {primaryImage ? (
            <Image
              src={primaryImage.url}
              alt={primaryImage.alt || listing.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-muted">
              <Package className="size-8" />
            </div>
          )}

          {/* Top Overlays */}
          <div className="absolute top-2.5 left-2.5 right-2.5 flex items-start justify-between gap-2 z-10">
            {/* Listing Type Tag */}
            {isPreOrder ? (
              <Chip color="warning" variant="soft" size="sm" className="backdrop-blur-xs font-semibold shadow-2xs">
                <Chip.Label className="flex items-center gap-1 text-[11px] font-semibold text-amber-700 dark:text-amber-300">
                  <Sparkles className="size-3" />
                  Pre-Order
                </Chip.Label>
              </Chip>
            ) : (
              <Chip color="success" variant="soft" size="sm" className="backdrop-blur-xs font-semibold shadow-2xs">
                <Chip.Label className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300">
                  <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  In Stock
                </Chip.Label>
              </Chip>
            )}

            {/* Quality & IoT badges */}
            <div className="flex items-center gap-1">
              {listing.organicCertified && (
                <span
                  title="Organic Certified"
                  className="rounded bg-emerald-600/90 text-white p-1 shadow-2xs backdrop-blur-xs"
                >
                  <ShieldCheck className="size-3.5" />
                </span>
              )}
              {listing.farm.iotEnabled && (
                <span
                  title="IoT Sensor Monitored Soil & Canopy"
                  className="rounded bg-accent/90 text-white p-1 shadow-2xs backdrop-blur-xs"
                >
                  <Cpu className="size-3.5" />
                </span>
              )}
            </div>
          </div>

          {/* Bottom Overlay on Image: Harvest Window / Available Quantity */}
          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[11px] font-medium z-10">
            <span className="rounded bg-surface/90 px-2 py-0.5 text-foreground backdrop-blur-xs shadow-2xs">
              {listing.availableQuantity.toLocaleString()} {listing.unit.replace("/", "")} avail.
            </span>
            {isPreOrder ? (
              <span className="flex items-center gap-1 rounded bg-amber-950/80 text-amber-200 px-2 py-0.5 backdrop-blur-xs">
                <Calendar className="size-3" />
                {listing.harvestDate.slice(5)}
              </span>
            ) : (
              <span className="rounded bg-black/60 text-white px-2 py-0.5 backdrop-blur-xs">
                Ready to ship
              </span>
            )}
          </div>
        </div>

        {/* Card Body */}
        <Card.Content className="flex flex-1 flex-col p-4">
          {/* Category & Rating */}
          <div className="flex items-center justify-between gap-2 text-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-accent">
              {listing.cropCategory}
            </span>

            {/* Star Rating */}
            <div className="flex items-center gap-1">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`size-3 ${
                      i < fullStars
                        ? "fill-amber-500 text-amber-500"
                        : i === fullStars && hasHalfStar
                        ? "fill-amber-500/50 text-amber-500"
                        : "text-muted/40"
                    }`}
                  />
                ))}
              </div>
              <span className="font-semibold text-foreground text-[11px]">
                {listing.averageRating.toFixed(1)}
              </span>
              <span className="text-[10px] text-muted">
                ({listing.totalReviews})
              </span>
            </div>
          </div>

          {/* Title */}
          <h2
            onClick={() => onQuickView(listing)}
            className="mt-1.5 font-display text-base font-bold text-foreground leading-snug line-clamp-1 hover:text-accent cursor-pointer transition-colors"
          >
            {listing.title}
          </h2>

          {/* Farm and Location */}
          <div className="mt-1 flex items-center gap-1.5 text-xs text-muted truncate">
            <span className="truncate font-medium text-foreground/90">
              {listing.farm.name}
            </span>
            <span>•</span>
            <span className="flex items-center gap-0.5 shrink-0 text-muted">
              <MapPin className="size-3 text-accent" />
              {listing.farm.district}
            </span>
          </div>

          {/* Short Specs / Subtext */}
          <p className="mt-2 text-xs text-muted line-clamp-2 leading-relaxed flex-1">
            {listing.shortDescription || listing.description}
          </p>

          {/* Price & Minimum Order Block */}
          <div className="mt-4 pt-3 border-t border-border/60 flex items-baseline justify-between">
            <div>
              <div className="flex items-baseline gap-1">
                <span className="font-display text-2xl font-black text-foreground tracking-tight">
                  {listing.currency}{listing.pricePerUnit}
                </span>
                <span className="text-xs font-medium text-muted">
                  {listing.unit}
                </span>
              </div>
              <div className="text-[10px] text-muted">
                Min. order: {listing.minOrderQuantity} {listing.unit.replace("/", "")}
              </div>
            </div>

            {listing.escrowSecured && (
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                <ShieldCheck className="size-3" />
                Escrow
              </span>
            )}
          </div>
        </Card.Content>

        {/* Card Actions Footer */}
        <Card.Footer className="px-4 pb-4 pt-0 gap-2 grid grid-cols-2">
          <Button
            variant="outline"
            size="sm"
            onPress={() => onQuickView(listing)}
            className="w-full text-xs font-semibold gap-1.5 border-border hover:bg-surface-secondary"
            aria-label={`Quick view details for ${listing.title}`}
          >
            <Eye className="size-3.5 text-muted" />
            <span>Quick View</span>
          </Button>

          <Button
            variant="primary"
            size="sm"
            onPress={() => onAddToCart(listing)}
            className="w-full text-xs font-semibold gap-1.5 bg-accent hover:bg-accent-hover text-accent-foreground shadow-2xs"
            aria-label={`Add ${listing.title} to cart`}
          >
            <ShoppingBag className="size-3.5" />
            <span>{isPreOrder ? "Pre-Order" : "Add to Cart"}</span>
          </Button>
        </Card.Footer>
      </Card>
    </article>
  );
}
