import Link from "next/link";
import { AlertTriangle, ArrowLeft, Mail, Sprout } from "lucide-react";

type AuthErrorDetails = {
  title: string;
  message: string;
};

const authErrors: Record<string, AuthErrorDetails> = {
  account_not_linked: {
    title: "This account is not linked",
    message: "This Google account is not connected to a Farmora sign-in method. Sign in with the method you originally used, or create a Farmora account first.",
  },
  access_denied: {
    title: "Google sign-in was cancelled",
    message: "You did not grant permission to continue with Google. You can try again whenever you are ready.",
  },
  invalid_callback_url: {
    title: "We couldn’t complete sign-in",
    message: "The sign-in link is invalid or has expired. Please start again from the login page.",
  },
  unauthorized: {
    title: "Access Restricted",
    message: "Your account does not have permission to view this console view.",
  },
};

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const details = authErrors[error ?? ""] ?? {
    title: "Authentication Interrupted",
    message: "Something interrupted authentication. Please try again or use a different sign-in method.",
  };

  return (
    <main className="grid min-h-[100svh] place-items-center bg-background px-4 text-foreground">
      <section className="w-full max-w-md rounded bg-surface p-8 text-center text-foreground border border-border">
        <span className="mx-auto grid size-12 place-items-center rounded bg-danger/10 text-danger">
          <AlertTriangle aria-hidden="true" className="size-6" />
        </span>
        <div className="mt-4 flex items-center justify-center gap-2 text-accent">
          <Sprout aria-hidden="true" className="size-4" />
          <span className="font-display font-bold">Farmora</span>
        </div>
        <h1 className="mt-3 font-display text-2xl font-bold">{details.title}</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted">{details.message}</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Link href="/login" className="inline-flex h-10 items-center justify-center gap-2 rounded bg-accent px-4 text-xs font-semibold text-accent-foreground hover:opacity-90">
            <ArrowLeft aria-hidden="true" className="size-4" />
            Back to sign in
          </Link>
          <Link href="/register" className="inline-flex h-10 items-center justify-center gap-2 rounded border border-border bg-surface px-4 text-xs font-semibold text-foreground hover:bg-surface-secondary">
            <Mail aria-hidden="true" className="size-4" />
            Create account
          </Link>
        </div>
      </section>
    </main>
  );
}
