"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@heroui/react";
import {
  CheckCircle2,
  Lock,
  ShieldCheck,
  Sprout,
  X,
  Plus,
  Minus,
} from "lucide-react";
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
    }, 600);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="preorder-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-surface p-6 shadow-2xl transition-all dark:bg-[#0c1813]">
        {/* Close Button */}
        <button
          type="button"
          aria-label="Close pre-order modal"
          onClick={onClose}
          className="absolute top-4 right-4 rounded-lg p-1.5 text-muted transition-colors hover:bg-surface-secondary hover:text-foreground"
        >
          <X aria-hidden="true" className="size-5" />
        </button>

        {isConfirmed ? (
          <div className="py-4 text-center space-y-4">
            <div className="mx-auto grid size-16 place-items-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 aria-hidden="true" className="size-9" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">
                Allocation Reserved!
              </h3>
              <p className="mt-1 text-sm text-muted">
                Your pre-order for{" "}
                <span className="font-semibold text-foreground">
                  {quantity} {unitLabel}
                </span>{" "}
                of {crop.title} has been logged.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-surface-secondary p-4 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-muted">Total Batch Value:</span>
                <span className="font-bold text-foreground">
                  ৳ {totalPrice.toLocaleString()} BDT
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Target Harvest:</span>
                <span className="font-medium text-foreground">
                  {crop.harvestDate.replace("Harvest: ", "")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Escrow Protection:</span>
                <span className="font-medium text-emerald-600 dark:text-emerald-400">
                  100% Guaranteed
                </span>
              </div>
            </div>

            <Button
              variant="primary"
              fullWidth
              size="md"
              onPress={onClose}
              className="h-11 bg-[#0a3823] font-medium text-white hover:bg-[#072a1a] dark:bg-emerald-800"
            >
              Done
            </Button>
          </div>
        ) : (
          <div>
            {/* Header info */}
            <div className="flex items-start gap-4 pr-6">
              <div className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-muted">
                <Image
                  src={crop.image}
                  alt={crop.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <span className="inline-block rounded-md bg-accent/10 px-2 py-0.5 text-[11px] font-semibold text-accent">
                  Advance Allocation
                </span>
                <h3
                  id="preorder-modal-title"
                  className="mt-1 text-base font-bold text-foreground line-clamp-1"
                >
                  {crop.title}
                </h3>
                <p className="text-xs text-muted">{crop.location}</p>
              </div>
            </div>

            {/* Price & Harvest overview */}
            <div className="mt-4 grid grid-cols-2 gap-3 rounded-xl border border-border bg-surface-secondary/70 p-3">
              <div>
                <p className="text-[11px] text-muted">Fixed Batch Price</p>
                <p className="text-base font-extrabold text-[#0d3824] dark:text-emerald-300">
                  ৳ {crop.price}{" "}
                  <span className="text-xs font-normal text-muted">
                    {crop.unit}
                  </span>
                </p>
              </div>
              <div>
                <p className="text-[11px] text-muted">Expected Harvest</p>
                <p className="text-sm font-semibold text-foreground">
                  {crop.harvestDate.replace("Harvest: ", "")}
                </p>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mt-5 space-y-2">
              <label className="block text-xs font-semibold text-foreground">
                Select Allocation Quantity ({unitLabel})
              </label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => setQuantity((q) => Math.max(10, q - 10))}
                  className="grid size-10 place-items-center rounded-xl border border-border bg-surface text-foreground transition-colors hover:bg-surface-secondary"
                >
                  <Minus aria-hidden="true" className="size-4" />
                </button>
                <div className="flex-1 text-center">
                  <span className="text-2xl font-bold text-foreground">
                    {quantity}
                  </span>
                  <span className="ml-1 text-sm text-muted">{unitLabel}</span>
                </div>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => setQuantity((q) => q + 10)}
                  className="grid size-10 place-items-center rounded-xl border border-border bg-surface text-foreground transition-colors hover:bg-surface-secondary"
                >
                  <Plus aria-hidden="true" className="size-4" />
                </button>
              </div>
            </div>

            {/* Estimated Total & Escrow badge */}
            <div className="mt-5 border-t border-separator pt-4 space-y-3">
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-medium text-foreground">
                  Total Escrow Deposit:
                </span>
                <span className="text-xl font-bold text-[#0d3824] dark:text-emerald-400">
                  ৳ {totalPrice.toLocaleString()} BDT
                </span>
              </div>

              <div className="flex items-center gap-2 rounded-lg bg-emerald-500/10 p-2.5 text-xs text-emerald-800 dark:text-emerald-300">
                <ShieldCheck aria-hidden="true" className="size-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                <span>
                  Funds remain securely protected in BDT escrow until delivery verification.
                </span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="mt-5 flex gap-2.5">
              <Button
                variant="ghost"
                size="md"
                onPress={onClose}
                className="flex-1 border border-border text-foreground hover:bg-surface-secondary"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="md"
                isDisabled={isSubmitting}
                onPress={handleConfirm}
                className="flex-1 bg-[#0a3823] font-medium text-white hover:bg-[#072a1a] dark:bg-emerald-800"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <Sprout aria-hidden="true" className="size-4 animate-spin" />
                    <span>Reserving...</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Lock aria-hidden="true" className="size-4" />
                    <span>Confirm Pre-Order</span>
                  </span>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
