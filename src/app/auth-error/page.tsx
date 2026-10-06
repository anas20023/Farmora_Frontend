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
};

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const details = authErrors[error ?? ""] ?? {
    title: "We couldn’t sign you in",
    message: "Something interrupted authentication. Please try again or use a different sign-in method.",
  };

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
        <h1 className="mt-3 text-xl font-bold">{details.title}</h1>
        <p className="mt-2 text-sm leading-6 text-muted">{details.message}</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Link href="/login" className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-accent px-4 text-sm font-semibold text-accent-foreground hover:opacity-90">
            <ArrowLeft aria-hidden="true" className="size-4" />
            Back to sign in
          </Link>
          <Link href="/register" className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-border px-4 text-sm font-semibold hover:bg-surface-secondary">
            <Mail aria-hidden="true" className="size-4" />
            Create account
          </Link>
        </div>
      </section>
    </main>
  );
}
