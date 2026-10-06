"use client";

import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, type FormEvent, useState } from "react";
import { KeyRound, Sprout } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { getAuthErrorMessage } from "@/lib/auth-error";

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
      toast.error(getAuthErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }

  return <main className="grid min-h-screen place-items-center bg-background px-4 text-foreground"><section className="w-full max-w-md rounded-2xl border border-border bg-surface p-8 shadow-xl shadow-black/5"><div className="text-center"><span className="mx-auto grid size-12 place-items-center rounded-2xl bg-accent text-accent-foreground"><Sprout className="size-6" /></span><h1 className="mt-4 text-2xl font-bold">Reset your password</h1></div>{invalidToken ? <p className="mt-5 rounded-lg border border-danger/30 bg-danger/10 p-3 text-sm text-danger">This reset link is invalid or has expired. Request a new one from the sign-in page.</p> : <form onSubmit={handleSubmit} className="mt-6 space-y-4"><label className="block text-sm font-medium">New password<input required minLength={8} type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-1.5 h-10 w-full rounded-lg border border-border bg-field-background px-3" /></label><label className="block text-sm font-medium">Confirm new password<input required minLength={8} type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} className="mt-1.5 h-10 w-full rounded-lg border border-border bg-field-background px-3" /></label><button disabled={loading} className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-accent font-semibold text-accent-foreground disabled:opacity-60"><KeyRound className="size-4" />{loading ? "Resetting…" : "Reset password"}</button></form>}<Link href="/login" className="mt-5 block text-center text-sm font-medium text-accent hover:underline">Back to sign in</Link></section></main>;
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-background" aria-busy="true" />}>
      <ResetPasswordForm />
    </Suspense>
  );
}
