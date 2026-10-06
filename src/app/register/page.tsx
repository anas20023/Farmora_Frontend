"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { Button, Separator } from "@heroui/react";
import {
  ArrowLeft,
  Check,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Moon,
  ShieldCheck,
  ShoppingBag,
  Sprout,
  Sun,
  Tractor,
  User,
  UserPlus,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { getAuthErrorMessage } from "@/lib/auth-error";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

type UserRole = "farmer" | "buyer";

export default function RegisterPage() {
  const router = useRouter();

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("farmer");
  const [agreeTerms, setAgreeTerms] = useState(true);

  // UI interaction states
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Initialize and synchronize dark/light theme matching globals.css
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

  // Password strength calculation
  const getPasswordStrength = () => {
    if (!password) return 0;
    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    return score;
  };

  const passwordStrength = getPasswordStrength();

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
      await authClient.signUp.email({
      name: name.trim(),
      email: email.trim(),
      wished_role: role.trim(),
      password: password,
      callbackURL: "/login",
    }, {
      onSuccess: () => {
        // Better Auth intentionally returns the same response for an existing
        // email, so this message avoids leaking whether an account exists.
        toast.success("Check your inbox for the next step. If you already have an account, please sign in instead.",{

        })
        router.push('/login')
      },
      onError: (ctx) => {
              toast.error(ctx.error instanceof Error ? ctx.error.message : "Something went wrong")
      }
      });
    } catch (error) {
      const message = getAuthErrorMessage(error);
      setErrorMessage(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }

  };

  const handleGoogleJoin = async () => {
    setIsGoogleLoading(true);
    try {
      if (authClient?.signIn?.social) {
        await authClient.signIn.social({
          provider: "google",
          callbackURL: "/login",
        }).catch((err) => {
          toast.error(err.message || "Someting went wrong")
        });
      }
    } catch {
      // Graceful fallback
      toast.error("Someting went wrong")
    } finally {
      // Per user requirement: navigate to /login route
      setTimeout(() => {
        router.push("/login");
        toast.success("Google Authentication Sucessful")
      }, 500);
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
        <div className="absolute -bottom-36 left-10 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute top-1/3 -right-20 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
      </div>

      {/* Top Navigation Bar */}
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

      {/* Main Content Area */}
      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 py-6 sm:px-6 lg:px-8">
        <div className="w-full max-w-lg">
          {/* Header Branding */}
          <div className="flex flex-col items-center text-center">
            <Link
              href="/"
              className="group mb-3 inline-flex flex-col items-center transition-transform hover:scale-105 focus-visible:outline-none"
            >
              <span className="grid size-12 place-items-center rounded-2xl bg-accent text-accent-foreground shadow-lg shadow-accent/25 ring-2 ring-accent/20">
                <Sprout aria-hidden="true" className="size-7" />
              </span>
            </Link>

            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Join Farmora
            </h1>

            <p className="mt-1 text-sm font-medium text-foreground/90 sm:text-base">
              Smart Agriculture Marketplace
            </p>

            <p className="mt-1 max-w-sm text-xs text-muted sm:text-sm">
              Create your account to start trading, selling, and sourcing agricultural goods
            </p>
          </div>

          {/* Registration Card */}
          <div className="mt-6 rounded-2xl border border-border bg-surface p-5 shadow-xl shadow-black/5 backdrop-blur-sm sm:p-8 dark:shadow-black/25">
            <div className="mb-5">
              <h2 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                Create your account
              </h2>
              <p className="text-xs text-muted sm:text-sm">
                Select your account role and enter your details below
              </p>
            </div>

            {errorMessage ? (
              <div className="mb-4 rounded-lg border border-danger/40 bg-danger/10 p-3 text-xs text-danger sm:text-sm">
                {errorMessage}
              </div>
            ) : null}
            <form onSubmit={handleRegister} className="space-y-4" noValidate={false}>
              {/* Role Selection Options: Farmer or Buyer */}
              <div className="space-y-2">
                <label className="block text-xs font-medium text-foreground sm:text-sm">
                  I am registering as a:
                </label>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {/* Farmer Option */}
                  <button
                    type="button"
                    onClick={() => setRole("farmer")}
                    className={`relative flex flex-col items-start rounded-xl border p-3.5 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus ${role === "farmer"
                      ? "border-accent bg-accent/10 shadow-sm ring-1 ring-accent"
                      : "border-border bg-field-background hover:bg-surface-secondary"
                      }`}
                  >
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className={`grid size-8 place-items-center rounded-lg ${role === "farmer"
                            ? "bg-accent text-accent-foreground"
                            : "bg-surface-secondary text-muted"
                            }`}
                        >
                          <Tractor aria-hidden="true" className="size-4" />
                        </span>
                        <span className="text-sm font-semibold text-foreground">
                          Farmer
                        </span>
                      </div>
                      {role === "farmer" ? (
                        <span className="grid size-5 place-items-center rounded-full bg-accent text-accent-foreground">
                          <Check aria-hidden="true" className="size-3" />
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-2 text-xs text-muted">
                      Sell agricultural harvests, list crops & manage direct farm supplies
                    </p>
                  </button>

                  {/* Buyer Option */}
                  <button
                    type="button"
                    onClick={() => setRole("buyer")}
                    className={`relative flex flex-col items-start rounded-xl border p-3.5 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus ${role === "buyer"
                      ? "border-accent bg-accent/10 shadow-sm ring-1 ring-accent"
                      : "border-border bg-field-background hover:bg-surface-secondary"
                      }`}
                  >
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className={`grid size-8 place-items-center rounded-lg ${role === "buyer"
                            ? "bg-accent text-accent-foreground"
                            : "bg-surface-secondary text-muted"
                            }`}
                        >
                          <ShoppingBag aria-hidden="true" className="size-4" />
                        </span>
                        <span className="text-sm font-semibold text-foreground">
                          Buyer
                        </span>
                      </div>
                      {role === "buyer" ? (
                        <span className="grid size-5 place-items-center rounded-full bg-accent text-accent-foreground">
                          <Check aria-hidden="true" className="size-3" />
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-2 text-xs text-muted">
                      Source fresh farm produce, purchase wholesale & negotiate orders
                    </p>
                  </button>
                </div>
              </div>

              {/* Name Field */}
              <div className="space-y-1.5">
                <label
                  htmlFor="register-name"
                  className="block text-xs font-medium text-foreground sm:text-sm"
                >
                  Full Name
                </label>
                <div className="relative flex items-center">
                  <span className="pointer-events-none absolute left-3 text-muted">
                    <User aria-hidden="true" className="size-4" />
                  </span>
                  <input
                    id="register-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Elena Rostova"
                    className="h-10 w-full rounded-lg border border-border bg-field-background pl-9 pr-3 text-sm text-field-foreground placeholder:text-field-placeholder transition-colors focus:border-focus focus:outline-none focus:ring-1 focus:ring-focus"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-1.5">
                <label
                  htmlFor="register-email"
                  className="block text-xs font-medium text-foreground sm:text-sm"
                >
                  Email Address
                </label>
                <div className="relative flex items-center">
                  <span className="pointer-events-none absolute left-3 text-muted">
                    <Mail aria-hidden="true" className="size-4" />
                  </span>
                  <input
                    id="register-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="farmer@farmora.com"
                    className="h-10 w-full rounded-lg border border-border bg-field-background pl-9 pr-3 text-sm text-field-foreground placeholder:text-field-placeholder transition-colors focus:border-focus focus:outline-none focus:ring-1 focus:ring-focus"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-1.5">
                <label
                  htmlFor="register-password"
                  className="block text-xs font-medium text-foreground sm:text-sm"
                >
                  Password
                </label>
                <div className="relative flex items-center">
                  <span className="pointer-events-none absolute left-3 text-muted">
                    <Lock aria-hidden="true" className="size-4" />
                  </span>
                  <input
                    id="register-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a strong password"
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

                {/* Password Strength Indicator */}
                {password ? (
                  <div className="pt-1">
                    <div className="flex h-1.5 w-full gap-1 overflow-hidden rounded-full bg-surface-secondary">
                      <div
                        className={`h-full flex-1 transition-all ${passwordStrength >= 1 ? "bg-danger" : "bg-transparent"
                          }`}
                      />
                      <div
                        className={`h-full flex-1 transition-all ${passwordStrength >= 2 ? "bg-warning" : "bg-transparent"
                          }`}
                      />
                      <div
                        className={`h-full flex-1 transition-all ${passwordStrength >= 3 ? "bg-accent" : "bg-transparent"
                          }`}
                      />
                      <div
                        className={`h-full flex-1 transition-all ${passwordStrength >= 4 ? "bg-accent" : "bg-transparent"
                          }`}
                      />
                    </div>
                    <div className="mt-1 flex justify-between text-[11px] text-muted">
                      <span>
                        {passwordStrength <= 1 && "Weak password"}
                        {passwordStrength === 2 && "Moderate password"}
                        {passwordStrength === 3 && "Strong password"}
                        {passwordStrength >= 4 && "Very strong password"}
                      </span>
                      <span>Min 8 characters</span>
                    </div>
                  </div>
                ) : null}
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start gap-2 pt-1">
                <input
                  id="agree-terms"
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-0.5 size-4 rounded border-border accent-accent focus:ring-focus"
                />
                <label
                  htmlFor="agree-terms"
                  className="text-xs text-muted leading-snug cursor-pointer select-none"
                >
                  I agree to the{" "}
                  <span className="font-medium text-foreground hover:underline">
                    Terms of Service
                  </span>{" "}
                  and{" "}
                  <span className="font-medium text-foreground hover:underline">
                    Privacy Policy
                  </span>
                </label>
              </div>

              {/* Submit Registration Button (HeroUI v3) */}
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
                      <span>Creating account...</span>
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <UserPlus aria-hidden="true" className="size-4" />
                      <span>Join Farmora</span>
                    </span>
                  )}
                </Button>
              </div>
            </form>

            {/* Separator */}
            <div className="relative my-6 flex items-center justify-center">
              <Separator className="w-full bg-border" />
              <span className="absolute bg-surface px-3 text-xs uppercase tracking-wider text-muted">
                or continue with
              </span>
            </div>

            {/* Continue with Google Button (HeroUI v3) */}
            <Button
              type="button"
              variant="outline"
              size="md"
              fullWidth
              isDisabled={isGoogleLoading}
              onPress={handleGoogleJoin}
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

            {/* Link to Login */}
            <div className="mt-6 flex flex-col items-center gap-3 text-center text-xs text-muted">
              <p>
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-medium text-accent hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-focus"
                >
                  Log in to your account
                </Link>
              </p>

              <div className="flex items-center gap-1.5 text-muted/70">
                <ShieldCheck aria-hidden="true" className="size-3.5 text-accent" />
                <span>Protected with end-to-end agro marketplace security</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-4 text-center text-xs text-muted">
        <p>&copy; {new Date().getFullYear()} Farmora Inc. All rights reserved.</p>
      </footer>
    </div>
  );
}
