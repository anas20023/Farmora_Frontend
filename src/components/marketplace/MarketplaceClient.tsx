"use client";

import { useState, useMemo } from "react";
import toast from "react-hot-toast";
import { ShoppingBag, Sprout, RotateCcw } from "lucide-react";
import { Button } from "@heroui/react";
import type {
  ProductListing,
  CropCategory,
  ListingType,
  SortOption,
  CartItem,
} from "@/types/marketplace";
import { CATEGORY_LABELS } from "@/lib/marketplace-data";
import MarketplaceHero from "./MarketplaceHero";
import MarketplaceFilters from "./MarketplaceFilters";
import ProductCard from "./ProductCard";
import ProductQuickViewModal from "./ProductQuickViewModal";
import MarketplacePagination from "./MarketplacePagination";
import CartDrawer from "./CartDrawer";

interface MarketplaceClientProps {
  initialListings: ProductListing[];
  stats: {
    totalListings: number;
    inStockCount: number;
    preOrderCount: number;
    verifiedFarmsCount: number;
    totalTonnageAvailable: number;
  };
}

const PAGE_SIZE = 8;

export default function MarketplaceClient({
  initialListings,
  stats,
}: MarketplaceClientProps) {
  // Filter states
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<CropCategory | "ALL">("ALL");
  const [listingType, setListingType] = useState<ListingType | "ALL">("ALL");
  const [onlyOrganic, setOnlyOrganic] = useState(false);
  const [onlyIotVerified, setOnlyIotVerified] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("POPULARITY");
  const [currentPage, setCurrentPage] = useState(1);

  // Price boundaries
  const { minPossiblePrice, maxPossiblePrice } = useMemo(() => {
    let min = Infinity;
    let max = -Infinity;
    for (const item of initialListings) {
      if (item.pricePerUnit < min) min = item.pricePerUnit;
      if (item.pricePerUnit > max) max = item.pricePerUnit;
    }
    return {
      minPossiblePrice: Math.floor(min / 5) * 5 || 20,
      maxPossiblePrice: Math.ceil(max / 10) * 10 || 350,
    };
  }, [initialListings]);

  const [priceRange, setPriceRange] = useState<[number, number]>([
    minPossiblePrice,
    maxPossiblePrice,
  ]);

  // Modal & Cart states
  const [quickViewListing, setQuickViewListing] = useState<ProductListing | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const item of initialListings) {
      counts[item.cropCategory] = (counts[item.cropCategory] || 0) + 1;
    }
    const categories: (CropCategory | "ALL")[] = [
      "ALL",
      "CEREAL",
      "PULSE",
      "VEGETABLE",
      "FRUIT",
      "OILSEED",
      "SPICE",
      "TUBER",
    ];
    return categories.map((cat) => ({
      id: cat,
      label: CATEGORY_LABELS[cat],
      count: cat === "ALL" ? initialListings.length : counts[cat] || 0,
    }));
  }, [initialListings]);

  // Listing type counts
  const typeCounts = useMemo(() => {
    let inStock = 0;
    let preOrder = 0;
    for (const item of initialListings) {
      if (item.listingType === "IN_STOCK") inStock++;
      if (item.listingType === "PRE_ORDER") preOrder++;
    }
    return {
      all: initialListings.length,
      inStock,
      preOrder,
    };
  }, [initialListings]);

  // Active filter check
  const hasActiveFilters = useMemo(() => {
    return (
      search.trim() !== "" ||
      category !== "ALL" ||
      listingType !== "ALL" ||
      onlyOrganic ||
      onlyIotVerified ||
      priceRange[0] > minPossiblePrice ||
      priceRange[1] < maxPossiblePrice
    );
  }, [
    search,
    category,
    listingType,
    onlyOrganic,
    onlyIotVerified,
    priceRange,
    minPossiblePrice,
    maxPossiblePrice,
  ]);

  // Reset filters
  const handleResetFilters = () => {
    setSearch("");
    setCategory("ALL");
    setListingType("ALL");
    setOnlyOrganic(false);
    setOnlyIotVerified(false);
    setPriceRange([minPossiblePrice, maxPossiblePrice]);
    setSortBy("POPULARITY");
    setCurrentPage(1);
  };

  // Filter and sort listings
  const filteredAndSortedListings = useMemo(() => {
    const q = search.trim().toLowerCase();

    const filtered = initialListings.filter((item) => {
      // Search text
      if (q) {
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesCropType = item.cropType.name.toLowerCase().includes(q);
        const matchesBotanical = item.cropType.botanicalName?.toLowerCase().includes(q) || false;
        const matchesFarm = item.farm.name.toLowerCase().includes(q);
        const matchesDistrict = item.farm.district.toLowerCase().includes(q);
        const matchesTags = item.tags.some((t) => t.toLowerCase().includes(q));

        if (
          !matchesTitle &&
          !matchesCropType &&
          !matchesBotanical &&
          !matchesFarm &&
          !matchesDistrict &&
          !matchesTags
        ) {
          return false;
        }
      }

      // Category
      if (category !== "ALL" && item.cropCategory !== category) {
        return false;
      }

      // Listing Type
      if (listingType !== "ALL" && item.listingType !== listingType) {
        return false;
      }

      // Price Range
      if (item.pricePerUnit < priceRange[0] || item.pricePerUnit > priceRange[1]) {
        return false;
      }

      // Organic
      if (onlyOrganic && !item.organicCertified) {
        return false;
      }

      // IoT Monitored
      if (onlyIotVerified && !item.farm.iotEnabled) {
        return false;
      }

      return true;
    });

    // Sorting
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "PRICE_ASC":
          return a.pricePerUnit - b.pricePerUnit;
        case "PRICE_DESC":
          return b.pricePerUnit - a.pricePerUnit;
        case "HARVEST_DATE_ASC":
          return new Date(a.harvestDate).getTime() - new Date(b.harvestDate).getTime();
        case "RATING_DESC":
          return b.averageRating - a.averageRating || b.totalReviews - a.totalReviews;
        case "NEWEST":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "POPULARITY":
        default:
          return (
            b.averageRating * b.totalReviews -
            a.averageRating * a.totalReviews
          );
      }
    });
  }, [
    initialListings,
    search,
    category,
    listingType,
    priceRange,
    onlyOrganic,
    onlyIotVerified,
    sortBy,
  ]);

  // Paginated items
  const totalPages = Math.ceil(filteredAndSortedListings.length / PAGE_SIZE);
  const pagedListings = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredAndSortedListings.slice(start, start + PAGE_SIZE);
  }, [filteredAndSortedListings, currentPage]);

  // Filter change handlers that reset to page 1
  const handleSearchChange = (val: string) => {
    setSearch(val);
    setCurrentPage(1);
  };

  const handleCategoryChange = (val: CropCategory | "ALL") => {
    setCategory(val);
    setCurrentPage(1);
  };

  const handleListingTypeChange = (val: ListingType | "ALL") => {
    setListingType(val);
    setCurrentPage(1);
  };

  const handlePriceRangeChange = (val: [number, number]) => {
    setPriceRange(val);
    setCurrentPage(1);
  };

  // Quick View triggers
  const handleOpenQuickView = (listing: ProductListing) => {
    setQuickViewListing(listing);
    setIsQuickViewOpen(true);
  };

  // Add to Cart
  const handleAddToCart = (listing: ProductListing, qty?: number) => {
    const quantity = qty || listing.minOrderQuantity || 50;
    setCartItems((prev) => {
      const existingIdx = prev.findIndex((item) => item.listing.id === listing.id);
      if (existingIdx > -1) {
        const next = [...prev];
        const nextQty = next[existingIdx].quantity + quantity;
        next[existingIdx] = {
          ...next[existingIdx],
          quantity: nextQty,
          totalPrice: nextQty * listing.pricePerUnit,
        };
        return next;
      } else {
        return [
          ...prev,
          {
            listing,
            quantity,
            totalPrice: quantity * listing.pricePerUnit,
          },
        ];
      }
    });

    const isPre = listing.listingType === "PRE_ORDER";
    toast.success(
      isPre
        ? `Pre-ordered ${quantity} ${listing.unit.replace("/", "")} of ${listing.title}!`
        : `Added ${quantity} ${listing.unit.replace("/", "")} of ${listing.title} to cart!`,
      {
        duration: 3500,
        icon: isPre ? "🌱" : "🛒",
      }
    );
  };

  const handleRemoveCartItem = (listingId: string) => {
    setCartItems((prev) => prev.filter((item) => item.listing.id !== listingId));
    toast("Item removed from cart", { icon: "🗑️" });
  };

  const handleUpdateCartQuantity = (listingId: string, newQty: number) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.listing.id === listingId) {
          return {
            ...item,
            quantity: newQty,
            totalPrice: newQty * item.listing.pricePerUnit,
          };
        }
        return item;
      })
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* 1. Marketplace Hero Header */}
      <MarketplaceHero stats={stats} />

      {/* 2. Main Marketplace Content Area */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-6">
        {/* Filters Toolbar */}
        <MarketplaceFilters
          search={search}
          onSearchChange={handleSearchChange}
          category={category}
          onCategoryChange={handleCategoryChange}
          listingType={listingType}
          onListingTypeChange={handleListingTypeChange}
          priceRange={priceRange}
          onPriceRangeChange={handlePriceRangeChange}
          minPossiblePrice={minPossiblePrice}
          maxPossiblePrice={maxPossiblePrice}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onlyOrganic={onlyOrganic}
          onOnlyOrganicChange={(v) => {
            setOnlyOrganic(v);
            setCurrentPage(1);
          }}
          onlyIotVerified={onlyIotVerified}
          onOnlyIotVerifiedChange={(v) => {
            setOnlyIotVerified(v);
            setCurrentPage(1);
          }}
          totalFilteredCount={filteredAndSortedListings.length}
          totalCount={initialListings.length}
          categoryCounts={categoryCounts}
          typeCounts={typeCounts}
          onResetFilters={handleResetFilters}
          hasActiveFilters={hasActiveFilters}
        />

        {/* Product Cards Grid or Empty State */}
        {pagedListings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
            {pagedListings.map((listing) => (
              <ProductCard
                key={listing.id}
                listing={listing}
                onQuickView={handleOpenQuickView}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-surface p-12 text-center">
            <div className="mx-auto grid size-12 place-items-center rounded-full bg-accent/15 text-accent">
              <Sprout className="size-6" />
            </div>
            <h3 className="mt-4 font-display text-lg font-bold text-foreground">
              No matching agricultural listings found
            </h3>
            <p className="mt-1 max-w-md text-xs sm:text-sm text-muted">
              We couldn&apos;t find any crops matching your active filter criteria. Try adjusting your search query, price limit, or category selection.
            </p>
            <div className="mt-5">
              <Button
                variant="primary"
                size="sm"
                onPress={handleResetFilters}
                className="gap-2 bg-accent hover:bg-accent-hover text-accent-foreground"
              >
                <RotateCcw className="size-3.5" />
                <span>Reset All Filters</span>
              </Button>
            </div>
          </div>
        )}

        {/* Pagination */}
        <MarketplacePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={filteredAndSortedListings.length}
          pageSize={PAGE_SIZE}
        />
      </main>

      {/* Floating Cart Trigger Pill */}
      {cartItems.length > 0 && (
        <aside aria-label="Shopping Cart Trigger" className="fixed bottom-6 right-6 z-40">
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 rounded-full border border-border bg-accent px-4 py-3 text-xs font-bold text-accent-foreground shadow-xl hover:bg-accent-hover transition-all duration-200 cursor-pointer animate-in slide-in-from-bottom"
          >
            <ShoppingBag className="size-4" />
            <span>Procurement Cart</span>
            <span className="rounded-full bg-surface px-2 py-0.5 text-[11px] font-black text-foreground">
              {cartItems.length}
            </span>
          </button>
        </aside>
      )}

      {/* Quick View Modal */}
      <ProductQuickViewModal
        listing={quickViewListing}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
        onAddToCart={handleAddToCart}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={handleRemoveCartItem}
        onUpdateQuantity={handleUpdateCartQuantity}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
