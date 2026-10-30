"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { ArrowLeft, Check, Eye, EyeOff, Lock, Mail, Moon, ShoppingBag, Sun, Tractor, User } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";

type UserRole = "farmer" | "buyer";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("farmer");
  const [agreeTerms, setAgreeTerms] = useState(true);

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    if (!name.trim() || !email.trim() || !password) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
      return;
    }

    if (!agreeTerms) {
      setErrorMessage("Please accept the terms of service to proceed.");
      return;
    }

    setIsLoading(true);

    try {
      await authClient.signUp.email(
        {
          name: name.trim(),
          email: email.trim(),
          password: password,
          wished_role: role,
          callbackURL: "/dashboard",
        },
        {
          onError: (ctx) => {
            setErrorMessage(ctx.error.message || "Failed to create account.");
            toast.error(ctx.error.message || "Registration failed");
          },
          onSuccess: () => {
            toast.success("Account created successfully. Welcome to Farmora!");
            router.replace("/dashboard");
          },
        }
      );
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      setErrorMessage(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setIsGoogleLoading(true);
    try {
      if (authClient?.signIn?.social) {
        await authClient.signIn.social({
          provider: "google",
          callbackURL: "/dashboard",
        });
      }
    } catch {
      toast.error("Google sign up failed");
    } finally {
      setIsGoogleLoading(false);
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

      {/* Main Form */}
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-8 sm:px-6">
        <div className="w-full max-w-lg">
          <div className="flex flex-col items-center text-center">
          <Image src="/Logo.png" alt="Farmora" width={35} height={35} />

            <h1 className="font-display text-3xl font-bold tracking-tight text-foreground">
              Register for Farmora
            </h1>

            <p className="mt-1 text-sm text-muted">
              Choose your trading role to set up your console
            </p>
          </div>

          <div data-ui="true" className="mt-8 rounded bg-surface p-6 sm:p-8 text-foreground border border-border">
            {errorMessage && (
              <div className="mb-4 rounded bg-danger/10 p-3 text-xs text-danger">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-4">
              {/* Role Selection */}
              <div>
                <label className="block text-xs font-semibold text-muted mb-2">
                  Account Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRole("farmer")}
                    className={`flex items-center gap-3 rounded p-3 text-left transition-colors border ${role === "farmer"
                        ? "border-accent bg-accent/10 text-foreground"
                        : "border-border bg-background text-muted hover:text-foreground"
                      }`}
                  >
                    <Tractor className="size-5 shrink-0 text-accent" />
                    <div>
                      <div className="text-xs font-bold text-foreground">Producer / Farmer</div>
                      <div className="text-[11px] text-muted">Sell harvests & monitor IoT</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRole("buyer")}
                    className={`flex items-center gap-3 rounded p-3 text-left transition-colors border ${role === "buyer"
                        ? "border-accent bg-accent/10 text-foreground"
                        : "border-border bg-background text-muted hover:text-foreground"
                      }`}
                  >
                    <ShoppingBag className="size-5 shrink-0 text-accent" />
                    <div>
                      <div className="text-xs font-bold text-foreground">Buyer / Enterprise</div>
                      <div className="text-[11px] text-muted">Source verified batches</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs font-semibold text-muted mb-1.5"
                >
                  Full Name / Organization
                </label>
                <div className="relative flex items-center">
                  <span className="pointer-events-none absolute left-3 text-muted">
                    <User className="size-4" />
                  </span>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Md. Rafiqul Islam"
                    className="w-full rounded border border-border bg-background py-2.5 pl-10 pr-3 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                </div>
              </div>

              {/* Email */}
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
                    placeholder="rafiq@barindagro.com"
                    className="w-full rounded border border-border bg-background py-2.5 pl-10 pr-3 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-xs font-semibold text-muted mb-1.5"
                >
                  Password (min 8 characters)
                </label>
                <div className="relative flex items-center">
                  <span className="pointer-events-none absolute left-3 text-muted">
                    <Lock className="size-4" />
                  </span>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
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

              {/* Terms */}
              <div className="flex items-start">
                <input
                  id="terms"
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-0.5 size-4 rounded border-border accent-accent"
                />
                <label htmlFor="terms" className="ml-2 text-xs text-muted leading-tight">
                  I agree to the Farmora Escrow Trade Agreement, Telemetry SLAs, and verified harvest guidelines.
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded bg-accent py-2.5 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                {isLoading ? "Creating Account..." : "Complete Registration"}
              </button>
            </form>

            <div className="my-6 text-center">
              <span className="text-xs text-muted">
                or sign up with
              </span>
            </div>

            <button
              type="button"
              onClick={handleGoogleSignup}
              disabled={isGoogleLoading}
              className="flex w-full items-center justify-center gap-2 rounded border border-border bg-surface py-2.5 text-sm font-medium text-foreground hover:bg-surface-secondary"
            >
              <FcGoogle className="size-4" />
              <span>Google Registration</span>
            </button>
          </div>

          <p className="mt-6 text-center text-xs text-muted">
            Already registered?{" "}
            <Link href="/login" className="font-semibold text-accent hover:underline">
              Sign in to your account
            </Link>
          </p>
        </div>
      </main>

      <footer className="py-4 text-center text-xs text-muted">
        Farmora Technologies · Regulated Escrow & Telemetry Platform
      </footer>
    </div>
  );
}
