"use client";

import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, type FormEvent, useState } from "react";
import Image from "next/image";
import { KeyRound } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

function ResetPasswordForm() {
  const params = useSearchParams();
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const token = params.get("token");
  const invalidToken = !token || params.get("error") === "INVALID_TOKEN";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (password.length < 8) return toast.error("Password must be at least 8 characters long.");
    if (password !== confirmPassword) return toast.error("Passwords do not match.");
    setLoading(true);
    try {
      const { error } = await authClient.resetPassword({ newPassword: password, token: token ?? undefined });
      if (error) throw error;
      toast.success("Your password has been reset. Please sign in.");
      router.push("/login");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="grid min-h-[100svh] place-items-center bg-background px-4 text-foreground">
      <section className="w-full max-w-md rounded bg-surface p-8 text-foreground border border-border">
        <div className="text-center">
          <div className="flex justify-center mb-3">
            <Image src="/Logo.png" alt="Farmora" width={35} height={35} />
          </div>
          <h1 className="font-display text-2xl font-bold">Reset Your Password</h1>
          <p className="text-xs text-muted mt-1">Create a new secure passphrase for your Farmora account</p>
        </div>

        {invalidToken ? (
          <div className="mt-5 rounded bg-danger/10 p-3 text-xs text-danger">
            This reset link is invalid or has expired. Request a new one from the sign-in page.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-muted mb-1.5">
                New password
              </label>
              <input
                required
                minLength={8}
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted mb-1.5">
                Confirm new password
              </label>
              <input
                required
                minLength={8}
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                className="w-full rounded border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded bg-accent py-2.5 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              <KeyRound className="size-4" />
              <span>{loading ? "Resetting…" : "Set New Password"}</span>
            </button>
          </form>
        )}

        <Link href="/login" className="mt-6 block text-center text-xs font-semibold text-accent hover:underline">
          Back to Sign In
        </Link>
      </section>
    </main>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<main className="min-h-[100svh] bg-background" aria-busy="true" />}>
      <ResetPasswordForm />
    </Suspense>
  );
}
