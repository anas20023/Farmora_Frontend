"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { CheckCircle2, ShieldCheck, X, Plus, Minus } from "lucide-react";
import type { CropItem } from "@/types/crops";

interface PreOrderModalProps {
  crop: CropItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function PreOrderModal({
  crop,
  isOpen,
  onClose,
}: PreOrderModalProps) {
  const [quantity, setQuantity] = useState(50);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsConfirmed(false);
      setQuantity(crop?.unit === "/piece" ? 25 : 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, crop]);

  if (!isOpen || !crop) return null;

  const unitLabel = crop.unit.replace("/", "");
  const totalPrice = quantity * crop.price;

  const handleConfirm = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsConfirmed(true);
    }, 400);
  };

  return (
    <div
      data-ui="true"
      role="dialog"
      aria-modal="true"
      aria-labelledby="preorder-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
    >
      <div className="relative w-full max-w-lg overflow-hidden rounded bg-surface p-6 text-foreground border border-border">
        {/* Close Button */}
        <button
          type="button"
          aria-label="Close pre-order modal"
          onClick={onClose}
          className="absolute top-4 right-4 rounded p-1 text-muted transition-colors hover:text-foreground"
        >
          <X aria-hidden="true" className="size-5" />
        </button>

        {isConfirmed ? (
          <div className="py-4 text-center space-y-4">
            <div className="mx-auto grid size-12 place-items-center rounded-full bg-accent/15 text-accent">
              <CheckCircle2 aria-hidden="true" className="size-8" />
            </div>
            <div>
              <h3 className="font-display text-2xl font-bold text-foreground">
                Allocation Reserved
              </h3>
              <p className="mt-1 text-sm text-muted">
                Your pre-order for{" "}
                <span className="font-semibold text-foreground">
                  {quantity} {unitLabel}
                </span>{" "}
                of {crop.title} has been logged in escrow.
              </p>
            </div>

            <div className="rounded bg-surface-secondary p-4 text-left text-xs space-y-2 border border-rule">
              <div className="flex justify-between">
                <span className="text-muted">Total Batch Value:</span>
                <span className="font-bold text-foreground">
                  ৳{totalPrice.toLocaleString()} BDT
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Target Harvest:</span>
                <span className="text-foreground">{crop.harvestDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Origin Plot:</span>
                <span className="text-foreground">{crop.location}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-full rounded bg-accent py-2.5 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 pb-4">
              <div className="relative size-14 shrink-0 overflow-hidden rounded">
                <Image
                  src={crop.image}
                  alt={crop.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 id="preorder-modal-title" className="font-display text-xl font-bold leading-tight">
                  {crop.title}
                </h3>
                <p className="text-xs text-muted mt-0.5">{crop.location} · ৳{crop.price} {crop.unit}</p>
              </div>
            </div>

            <div className="mt-5 space-y-4">
              <div>
                <label className="text-xs font-semibold text-muted block mb-1">
                  RESERVE QUANTITY ({unitLabel.toUpperCase()})
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(10, quantity - 10))}
                    className="flex size-9 items-center justify-center rounded border border-border bg-surface hover:bg-surface-secondary"
                  >
                    <Minus className="size-4" />
                  </button>
                  <input
                    type="number"
                    min="10"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                    className="w-24 rounded border border-border bg-background px-3 py-1.5 text-center font-bold text-foreground focus:outline-none focus:ring-1 focus:ring-accent"
                  >
                  </input>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 10)}
                    className="flex size-9 items-center justify-center rounded border border-border bg-surface hover:bg-surface-secondary"
                  >
                    <Plus className="size-4" />
                  </button>
                </div>
              </div>

              <div className="rounded bg-surface-secondary p-4 space-y-2 text-xs border border-rule">
                <div className="flex justify-between">
                  <span className="text-muted">Unit Price</span>
                  <span className="font-medium text-foreground">৳{crop.price} / {unitLabel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Quality & Moisture Verification</span>
                  <span className="font-medium text-accent">Verified</span>
                </div>
                <div className="flex justify-between pt-2 font-display text-base font-bold">
                  <span>Total Escrow Lock</span>
                  <span className="text-foreground">৳{totalPrice.toLocaleString()} BDT</span>
                </div>
              </div>

              <div className="text-xs text-muted flex items-start gap-2">
                <ShieldCheck className="size-4 shrink-0 text-accent" />
                <span>
                  Escrow payment is secured until produce is harvested and inspected at delivery.
                </span>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded px-4 py-2 text-sm font-medium text-muted hover:text-foreground"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleConfirm}
                className="rounded bg-accent px-5 py-2 text-sm font-semibold text-accent-foreground hover:opacity-90 disabled:opacity-50"
              >
                {isSubmitting ? "Locking Escrow..." : "Confirm Pre-Order"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
