"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@heroui/react";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("themechange", callback);
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  mediaQuery.addEventListener("change", callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("themechange", callback);
    mediaQuery.removeEventListener("change", callback);
  };
}

function getSnapshot(): boolean {
  if (typeof window === "undefined") return false;
  const storedTheme = window.localStorage.getItem("farmora-theme");
  if (storedTheme) {
    return storedTheme === "dark";
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function getServerSnapshot(): boolean {
  return false;
}

interface VerifiedFarmsThemeToggleProps {
  showLabel?: boolean;
  className?: string;
}

export default function VerifiedFarmsThemeToggle({
  showLabel = false,
  className = "",
}: VerifiedFarmsThemeToggleProps) {
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggleTheme = () => {
    const nextIsDark = !isDark;
    document.documentElement.classList.toggle("dark", nextIsDark);
    document.documentElement.dataset.theme = nextIsDark ? "dark" : "light";
    window.localStorage.setItem("farmora-theme", nextIsDark ? "dark" : "light");
    window.dispatchEvent(new Event("themechange"));
  };

  return (
    <Button
      type="button"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      variant="outline"
      size="sm"
      onPress={toggleTheme}
      className={`inline-flex items-center gap-2 rounded border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-foreground shadow-xs transition-all hover:bg-surface-secondary hover:text-foreground cursor-pointer ${className}`}
    >
      {isDark ? (
        <Sun className="size-4 text-amber-400 transition-transform hover:rotate-45" />
      ) : (
        <Moon className="size-4 text-slate-700 transition-transform hover:-rotate-12" />
      )}
      {showLabel && (
        <span className="hidden sm:inline">
          {isDark ? "Light Mode" : "Dark Mode"}
        </span>
      )}
    </Button>
  );
}
