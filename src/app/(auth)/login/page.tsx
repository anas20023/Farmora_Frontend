"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, Eye, EyeOff, Lock, Mail, Moon, Sprout, Sun, X } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSubmitted, setForgotSubmitted] = useState(false);
  const [isForgotLoading, setIsForgotLoading] = useState(false);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("farmora-theme");
    const shouldUseDark = storedTheme
      ? storedTheme === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;

    document.documentElement.classList.toggle("dark", shouldUseDark);
    document.documentElement.dataset.theme = shouldUseDark ? "dark" : "light";
    const animationFrame = window.requestAnimationFrame(() =>
      setIsDark(shouldUseDark)
    );

    return () => window.cancelAnimationFrame(animationFrame);
  }, []);

  const toggleTheme = () => {
    const nextIsDark = !isDark;
    setIsDark(nextIsDark);
    document.documentElement.classList.toggle("dark", nextIsDark);
    document.documentElement.dataset.theme = nextIsDark ? "dark" : "light";
    window.localStorage.setItem("farmora-theme", nextIsDark ? "dark" : "light");
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) return;

    setIsLoading(true);

    try {
      await authClient.signIn.email({
        email: email.trim(),
        password: password,
        rememberMe: rememberMe,
        callbackURL: "/dashboard",
      }, {
        onError: (ctx) => {
          toast.error(ctx.error.message || "Invalid credentials");
        },
        onSuccess: () => {
          toast.success("Signed in successfully");
          router.replace("/dashboard");
        }
      });
      setIsLoading(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    try {
      if (authClient?.signIn?.social) {
        await authClient.signIn.social({
          provider: "google",
          callbackURL: "/dashboard",
        }).catch((err) => {
          toast.error(err instanceof Error ? err.message : "Google sign in failed");
        });
      }
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleForgotPassword = async (e: FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) return;

    setIsForgotLoading(true);
    try {
      const { error } = await authClient.requestPasswordReset({
        email: forgotEmail.trim(),
        redirectTo: "/reset-password",
      });
      if (error) throw error;
      setForgotSubmitted(true);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setIsForgotLoading(false);
    }
  };

  return (
    <div className="flex min-h-[100svh] flex-col justify-between bg-background text-foreground">
      {/* Top Bar */}
      <header className="flex w-full items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          <span>Back to Home</span>
        </Link>

        <button
          type="button"
          aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
          onClick={toggleTheme}
          className="flex size-9 items-center justify-center rounded border border-border bg-surface text-muted hover:text-foreground"
        >
          {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </button>
      </header>

      {/* Main Container */}
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-8 sm:px-6">
        <div className="w-full max-w-md">
          {/* Logo & Headline */}
          <div className="flex flex-col items-center text-center">
            <span className="grid size-11 place-items-center rounded bg-accent text-accent-foreground mb-3">
              <Sprout className="size-6" />
            </span>

            <h1 className="font-display text-3xl font-bold tracking-tight text-foreground">
              Sign In to Farmora
            </h1>

            <p className="mt-1 text-sm text-muted">
              Smart agricultural marketplace and telemetry console
            </p>
          </div>

          {/* Form Card */}
          <div data-ui="true" className="mt-8 rounded bg-surface p-6 sm:p-8 text-foreground border border-border">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-semibold text-muted mb-1.5"
                >
                  Email Address
                </label>
                <div className="relative flex items-center">
                  <span className="pointer-events-none absolute left-3 text-muted">
                    <Mail className="size-4" />
                  </span>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="farmer@farmora.com"
                    className="w-full rounded border border-border bg-background py-2.5 pl-10 pr-3 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="password"
                    className="block text-xs font-semibold text-muted"
                  >
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setForgotEmail(email);
                      setForgotSubmitted(false);
                      setForgotModalOpen(true);
                    }}
                    className="text-xs font-medium text-accent hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>

                <div className="relative flex items-center">
                  <span className="pointer-events-none absolute left-3 text-muted">
                    <Lock className="size-4" />
                  </span>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded border border-border bg-background py-2.5 pl-10 pr-10 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 text-muted hover:text-foreground"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="size-4 rounded border-border accent-accent"
                />
                <label htmlFor="remember" className="ml-2 text-xs text-muted">
                  Keep me signed in on this device
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded bg-accent py-2.5 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                {isLoading ? "Signing in..." : "Sign In to Console"}
              </button>
            </form>

            <div className="my-6 text-center">
              <span className="text-xs text-muted">
                or continue with
              </span>
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isGoogleLoading}
              className="flex w-full items-center justify-center gap-2 rounded border border-border bg-surface py-2.5 text-sm font-medium text-foreground hover:bg-surface-secondary"
            >
              <FcGoogle className="size-4" />
              <span>Google Single Sign-On</span>
            </button>
          </div>

          <p className="mt-6 text-center text-xs text-muted">
            Do not have an account?{" "}
            <Link href="/register" className="font-semibold text-accent hover:underline">
              Register as Farmer or Buyer
            </Link>
          </p>
        </div>
      </main>

      <footer className="py-4 text-center text-xs text-muted">
        Farmora Technologies · Regulated Escrow & Telemetry Platform
      </footer>

      {/* Forgot Password Modal */}
      {forgotModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
        >
          <div className="relative w-full max-w-sm rounded bg-surface p-6 text-foreground border border-border">
            <button
              type="button"
              onClick={() => setForgotModalOpen(false)}
              className="absolute top-4 right-4 rounded p-1 text-muted hover:text-foreground"
            >
              <X className="size-5" />
            </button>

            <h3 className="font-display text-xl font-bold">Reset Password</h3>

            {forgotSubmitted ? (
              <div className="mt-4 text-xs text-muted space-y-4">
                <p>
                  If an account exists for <strong className="text-foreground">{forgotEmail}</strong>, password reset instructions have been sent.
                </p>
                <button
                  type="button"
                  onClick={() => setForgotModalOpen(false)}
                  className="w-full rounded bg-accent py-2 text-xs font-semibold text-accent-foreground hover:opacity-90"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotPassword} className="mt-4 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-muted mb-1">
                    Your Registered Email
                  </label>
                  <input
                    type="email"
                    required
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="farmer@farmora.com"
                    className="w-full rounded border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setForgotModalOpen(false)}
                    className="rounded px-3 py-1.5 text-xs text-muted hover:text-foreground"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isForgotLoading}
                    className="rounded bg-accent px-4 py-1.5 text-xs font-semibold text-accent-foreground hover:opacity-90 disabled:opacity-50"
                  >
                    {isForgotLoading ? "Sending..." : "Send Reset Link"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
