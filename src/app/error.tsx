'use client';
import { useEffect } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Error({
    error,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Preserve the original error for diagnostics without exposing it to users.
        console.error('Unhandled application error:', error);
    }, [error]);
    const router = useRouter();
    return (
        <main className="grid min-h-svh place-items-center bg-background px-4 text-foreground">
            <section className="w-full max-w-md rounded bg-surface p-8 text-center border border-border">
                <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-danger/10 text-danger">
                    <AlertTriangle aria-hidden="true" className="size-7" />
                </span>
                <h1 className="mt-3 text-xl font-bold">
                    We couldn’t load this page
                </h1>
                <p className="mt-2 text-sm leading-6 text-muted">
                    Something unexpected happened. Your account and data are
                    safe. Please try again.
                </p>
                <button
                    type="button"
                    onClick={() => router.refresh()}
                    className="mt-6 inline-flex h-10 items-center gap-2 rounded-lg bg-accent px-4 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2">
                    <RefreshCw aria-hidden="true" className="size-4" />
                    Try again
                </button>
            </section>
        </main>
    );
}
