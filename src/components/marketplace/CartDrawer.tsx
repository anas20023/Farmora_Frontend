"use client";

import { useEffect } from "react";
import Image from "next/image";
import {
  X,
  ShoppingBag,
  ShieldCheck,
  Trash2,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@heroui/react";
import toast from "react-hot-toast";
import type { CartItem } from "@/types/marketplace";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (listingId: string) => void;
  onUpdateQuantity: (listingId: string, quantity: number) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onUpdateQuantity,
  onClearCart,
}: CartDrawerProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const totalAmount = items.reduce((acc, curr) => acc + curr.totalPrice, 0);
  const totalVolume = items.reduce((acc, curr) => acc + curr.quantity, 0);

  const handleCheckout = () => {
    toast.success("Order logged to BDT Escrow! Invoice drafted for dispatch confirmation.", {
      duration: 4000,
      icon: "🌾",
    });
    onClearCart();
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
      className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex h-full w-full max-w-md flex-col border-l border-border bg-surface p-6 text-foreground shadow-2xl animate-in slide-in-from-right duration-300"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div className="flex items-center gap-2">
            <ShoppingBag className="size-5 text-accent" />
            <h2 id="cart-drawer-title" className="font-display text-lg font-bold">
              Procurement Cart
            </h2>
            <span className="rounded-full bg-accent/15 px-2 py-0.5 text-xs font-semibold text-accent">
              {items.length}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded p-1 text-muted hover:text-foreground transition-colors"
            aria-label="Close cart drawer"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {items.length === 0 ? (
            <div className="flex h-64 flex-col items-center justify-center text-center text-muted space-y-2">
              <ShoppingBag className="size-12 text-muted/40" />
              <p className="font-medium text-foreground">Your cart is empty</p>
              <p className="text-xs">Browse the agricultural marketplace and add produce or pre-order upcoming harvests.</p>
            </div>
          ) : (
            items.map((item) => {
              const primaryImg =
                item.listing.images.find((i) => i.isPrimary) ||
                item.listing.images[0];
              const isPre = item.listing.listingType === "PRE_ORDER";

              return (
                <div
                  key={item.listing.id}
                  className="rounded-md border border-border/80 bg-surface-secondary/40 p-3 space-y-2"
                >
                  <div className="flex gap-3">
                    <div className="relative size-16 shrink-0 overflow-hidden rounded border border-border bg-surface">
                      {primaryImg && (
                        <Image
                          src={primaryImg.url}
                          alt={item.listing.title}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-display text-xs font-bold truncate text-foreground">
                          {item.listing.title}
                        </h4>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.listing.id)}
                          className="text-muted hover:text-danger transition-colors p-0.5"
                          aria-label={`Remove ${item.listing.title} from cart`}
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] text-muted truncate">
                        {item.listing.farm.name} • {item.listing.farm.district}
                      </div>

                      <div className="mt-1 flex items-center justify-between text-xs">
                        <span className="font-mono font-bold text-foreground">
                          ৳{item.totalPrice.toLocaleString()} BDT
                        </span>
                        {isPre ? (
                          <span className="flex items-center gap-0.5 text-[10px] text-amber-600 dark:text-amber-400 font-semibold">
                            <Sparkles className="size-2.5" />
                            Pre-Order ({item.listing.harvestDate.slice(5)})
                          </span>
                        ) : (
                          <span className="flex items-center gap-0.5 text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                            <CheckCircle2 className="size-2.5" />
                            Immediate Dispatch
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Quantity adjustment */}
                  <div className="flex items-center justify-between pt-2 border-t border-border/40 text-xs">
                    <span className="text-muted text-[11px]">
                      {item.quantity} {item.listing.unit.replace("/", "")} @ ৳{item.listing.pricePerUnit}/{item.listing.unit.replace("/", "")}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() =>
                          onUpdateQuantity(
                            item.listing.id,
                            Math.max(
                              item.listing.minOrderQuantity,
                              item.quantity - 10
                            )
                          )
                        }
                        className="rounded border border-border px-1.5 py-0.5 text-xs text-muted hover:text-foreground hover:bg-surface"
                      >
                        -10
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          onUpdateQuantity(
                            item.listing.id,
                            Math.min(
                              item.listing.availableQuantity,
                              item.quantity + 10
                            )
                          )
                        }
                        className="rounded border border-border px-1.5 py-0.5 text-xs text-muted hover:text-foreground hover:bg-surface"
                      >
                        +10
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Drawer Footer with Escrow Summary */}
        {items.length > 0 && (
          <div className="pt-4 border-t border-border space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-muted">
                <span>Total Commodity Volume:</span>
                <span className="font-semibold text-foreground">
                  {totalVolume.toLocaleString()} units
                </span>
              </div>
              <div className="flex justify-between text-muted">
                <span>Escrow Processing Fee:</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  ৳ 0 (0% Promo)
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold pt-2 border-t border-border">
                <span>Total Payable:</span>
                <span className="font-mono text-base font-black text-accent">
                  ৳{totalAmount.toLocaleString()} BDT
                </span>
              </div>
            </div>

            <div className="rounded bg-emerald-500/10 border border-emerald-500/20 p-2.5 text-[11px] text-emerald-700 dark:text-emerald-300 flex items-start gap-2">
              <ShieldCheck className="size-4 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
              <span>
                100% BDT Escrow Guarantee. Funds remain secure in institutional custody until your physical delivery inspection is verified.
              </span>
            </div>

            <Button
              variant="primary"
              size="md"
              onPress={handleCheckout}
              className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-accent-foreground font-bold shadow-md"
            >
              <span>Confirm Order with BDT Escrow</span>
              <ArrowRight className="size-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
