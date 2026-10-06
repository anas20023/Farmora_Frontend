"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw, Sprout } from "lucide-react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Preserve the original error for diagnostics without exposing it to users.
    console.error("Unhandled application error:", error);
  }, [error]);

  return (
    <main className="grid min-h-screen place-items-center bg-background px-4 text-foreground">
      <section className="w-full max-w-md rounded-2xl border border-border bg-surface p-8 text-center shadow-xl shadow-black/5">
        <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-danger/10 text-danger">
          <AlertTriangle aria-hidden="true" className="size-7" />
        </span>
        <div className="mt-5 flex items-center justify-center gap-2 text-accent">
          <Sprout aria-hidden="true" className="size-4" />
          <span className="text-sm font-semibold">Farmora</span>
        </div>
        <h1 className="mt-3 text-xl font-bold">We couldn’t load this page</h1>
        <p className="mt-2 text-sm leading-6 text-muted">
          Something unexpected happened. Your account and data are safe. Please try again.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 inline-flex h-10 items-center gap-2 rounded-lg bg-accent px-4 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2"
        >
          <RefreshCw aria-hidden="true" className="size-4" />
          Try again
        </button>
      </section>
    </main>
  );
}
