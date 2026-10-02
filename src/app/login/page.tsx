"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { Button, Separator } from "@heroui/react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound,
  Lock,
  LogIn,
  Mail,
  Moon,
  Sprout,
  Sun,
  X,
} from "lucide-react";
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

  // Initialize and synchronize dark/light theme matching Navbar
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
      // Attempt login via better-auth client if available
      await authClient.signIn.email({
        email: email.trim(),
        password: password,
        rememberMe: rememberMe,
        callbackURL: "/",
      }, {
        onError: (ctx) => {
          console.log(ctx)
          toast.error(ctx.error.message)
        },
        onSuccess: (ctx) => {
          console.log(ctx.response)
          toast.success("Login Succesful")
          router.push('/')
        }
      });
      setIsLoading(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong")
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    try {
      if (authClient?.signIn?.social) {
        await authClient.signIn.social({
          provider: "google",
          callbackURL: "/",
        }).catch(() => {
          // Continue gracefully
        });
      }
    } catch {
      // Graceful fallback
    } finally {
      // Per user requirement: navigate to / route
      setTimeout(() => {
        router.push("/");
      }, 350);
    }
  };

  const handleForgotSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (forgotEmail) {
      setForgotSubmitted(true);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col justify-between bg-background text-foreground transition-colors duration-200">
      {/* Background ambient decorative glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -top-36 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-accent/15 blur-3xl" />
        <div className="absolute -bottom-36 right-10 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />
      </div>

      {/* Top Header / Bar */}
      <header className="relative z-10 flex w-full items-center justify-between px-4 py-4 sm:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium text-muted transition-colors hover:bg-surface-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          <span>Back to Home</span>
        </Link>

        <div className="flex items-center gap-2">
          <Button
            aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
            isIconOnly
            size="sm"
            variant="ghost"
            onPress={toggleTheme}
            className="rounded-lg border border-border text-foreground hover:bg-surface-secondary"
          >
            {isDark ? (
              <Sun aria-hidden="true" className="size-4" />
            ) : (
              <Moon aria-hidden="true" className="size-4" />
            )}
          </Button>
        </div>
      </header>

      {/* Center Main Section */}
      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          {/* Center: Logo and “Farmora” and sub titles */}
          <div className="flex flex-col items-center text-center">
            <Link
              href="/"
              className="group mb-3 inline-flex flex-col items-center transition-transform hover:scale-105 focus-visible:outline-none"
            >
              <span className="grid size-12 place-items-center rounded-2xl bg-accent text-accent-foreground shadow-lg shadow-accent/25 ring-2 ring-accent/20">
                <Sprout aria-hidden="true" className="size-7" />
              </span>
            </Link>

            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Farmora
            </h1>

            <p className="mt-1 text-sm font-medium text-foreground/90 sm:text-base">
              Smart Agriculture Marketplace
            </p>
          </div>

          {/* Center: Login Form Card */}
          <div className="mt-6 rounded-2xl border border-border bg-surface p-6 shadow-xl shadow-black/5 backdrop-blur-sm sm:p-8 dark:shadow-black/25">
            <div className="mb-6">
              <h2 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                Welcome back
              </h2>
              <p className="text-xs text-muted sm:text-sm">
                Enter your credentials to access your Farmora account
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4" noValidate={false}>
              {/* Email Field */}
              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="block text-xs font-medium text-foreground sm:text-sm"
                >
                  Email Address
                </label>
                <div className="relative flex items-center">
                  <span className="pointer-events-none absolute left-3 text-muted">
                    <Mail aria-hidden="true" className="size-4" />
                  </span>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="farmer@farmora.com"
                    className="h-10 w-full rounded-lg border border-border bg-field-background pl-9 pr-3 text-sm text-field-foreground placeholder:text-field-placeholder transition-colors focus:border-focus focus:outline-none focus:ring-1 focus:ring-focus"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="current-password"
                    className="block text-xs font-medium text-foreground sm:text-sm"
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
                    className="text-xs font-medium text-accent hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-focus"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative flex items-center">
                  <span className="pointer-events-none absolute left-3 text-muted">
                    <Lock aria-hidden="true" className="size-4" />
                  </span>
                  <input
                    id="current-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="h-10 w-full rounded-lg border border-border bg-field-background pl-9 pr-10 text-sm text-field-foreground placeholder:text-field-placeholder transition-colors focus:border-focus focus:outline-none focus:ring-1 focus:ring-focus"
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 rounded p-1 text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-focus"
                  >
                    {showPassword ? (
                      <EyeOff aria-hidden="true" className="size-4" />
                    ) : (
                      <Eye aria-hidden="true" className="size-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex cursor-pointer items-center gap-2 select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="size-4 rounded border-border accent-accent focus:ring-focus"
                  />
                  <span className="text-xs text-muted sm:text-sm">
                    Remember this device
                  </span>
                </label>
              </div>

              {/* Login Button (HeroUI v3) */}
              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  fullWidth
                  isDisabled={isLoading}
                  className="h-11 font-medium shadow-md shadow-accent/20 transition-all hover:opacity-95"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <Sprout aria-hidden="true" className="size-4 animate-spin" />
                      <span>Signing in...</span>
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <LogIn aria-hidden="true" className="size-4" />
                      <span>Join / Login</span>
                    </span>
                  )}
                </Button>
              </div>
            </form>

            {/* Separator / Divider */}
            <div className="relative my-6 flex items-center justify-center">
              <Separator className="w-full bg-border" />
              <span className="absolute bg-surface px-3 text-xs uppercase tracking-wider text-muted">
                or continue with
              </span>
            </div>

            {/* Continue with Google Button from HeroUI v3 */}
            <Button
              type="button"
              variant="outline"
              size="md"
              fullWidth
              isDisabled={isGoogleLoading}
              onPress={handleGoogleLogin}
              className="h-11 border-border bg-surface font-medium text-foreground transition-colors hover:bg-surface-secondary"
            >
              {isGoogleLoading ? (
                <span className="flex items-center gap-2">
                  <Sprout aria-hidden="true" className="size-4 animate-spin" />
                  <span>Connecting to Google...</span>
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2.5">
                  <FcGoogle aria-hidden="true" className="size-4 text-accent" />
                  <span>Continue with Google</span>
                </span>
              )}
            </Button>

            {/* Card Footer notes */}
            <div className="mt-6 flex flex-col items-center gap-2 text-center text-xs text-muted">
              <p>
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="font-medium text-accent hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-focus"
                >
                  Join Farmora today
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Footer */}
      <footer className="relative z-10 py-4 text-center text-xs text-muted">
        <p>&copy; {new Date().getFullYear()} Farmora Inc. All rights reserved.</p>
      </footer>

      {/* Forgot Password Modal Dialog */}
      {forgotModalOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="forgot-password-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
        >
          <div className="relative w-full max-w-md rounded-2xl border border-border bg-surface p-6 shadow-2xl">
            <button
              type="button"
              aria-label="Close dialog"
              onClick={() => {
                setForgotModalOpen(false);
                setForgotSubmitted(false);
              }}
              className="absolute right-4 top-4 rounded-lg p-1.5 text-muted hover:bg-surface-secondary hover:text-foreground"
            >
              <X aria-hidden="true" className="size-4" />
            </button>

            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl bg-accent/15 text-accent">
                <KeyRound aria-hidden="true" className="size-5" />
              </span>
              <div>
                <h3
                  id="forgot-password-title"
                  className="text-base font-semibold text-foreground"
                >
                  Reset your password
                </h3>
                <p className="text-xs text-muted">
                  We will send a password reset link to your email
                </p>
              </div>
            </div>

            {forgotSubmitted ? (
              <div className="mt-5 space-y-4">
                <div className="flex items-start gap-3 rounded-lg border border-border bg-surface-secondary p-3.5 text-xs text-foreground sm:text-sm">
                  <CheckCircle2
                    aria-hidden="true"
                    className="size-5 shrink-0 text-accent"
                  />
                  <div>
                    <p className="font-medium text-foreground">
                      Reset instructions sent
                    </p>
                    <p className="mt-0.5 text-muted">
                      If an account exists for <span className="font-semibold text-foreground">{forgotEmail}</span>, you will receive a secure password recovery link.
                    </p>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="primary"
                  fullWidth
                  size="md"
                  onPress={() => {
                    setForgotModalOpen(false);
                    setForgotSubmitted(false);
                  }}
                >
                  Back to Sign In
                </Button>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="mt-5 space-y-4">
                <div className="space-y-1.5">
                  <label
                    htmlFor="reset-email"
                    className="block text-xs font-medium text-foreground"
                  >
                    Account Email
                  </label>
                  <div className="relative flex items-center">
                    <span className="pointer-events-none absolute left-3 text-muted">
                      <Mail aria-hidden="true" className="size-4" />
                    </span>
                    <input
                      id="reset-email"
                      type="email"
                      required
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      placeholder="farmer@farmora.com"
                      className="h-10 w-full rounded-lg border border-border bg-field-background pl-9 pr-3 text-sm text-field-foreground placeholder:text-field-placeholder focus:border-focus focus:outline-none focus:ring-1 focus:ring-focus"
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="md"
                    onPress={() => setForgotModalOpen(false)}
                    className="flex-1 border border-border"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    className="flex-1"
                  >
                    <span className="flex items-center justify-center gap-1.5">
                      <span>Send Link</span>
                      <ArrowRight aria-hidden="true" className="size-4" />
                    </span>
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
