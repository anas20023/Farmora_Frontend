"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LayoutDashboard, Menu, Sprout, X } from "lucide-react";
import type { DashboardConfig } from "@/config/dashboard";

type DashboardSidebarProps = {
  config: DashboardConfig;
};

export default function DashboardSidebar({ config }: DashboardSidebarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navigation = (
    <nav className="space-y-1 p-3" aria-label={`${config.label} dashboard`}>
        {config.navigation.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-accent text-accent-foreground"
                  : "text-muted hover:bg-surface-secondary hover:text-foreground"
              }`}
            >
              <LayoutDashboard className="size-4" aria-hidden="true" />
              {item.label}
            </Link>
          );
        })}
    </nav>
  );

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-30 flex h-14 items-center border-b border-border bg-surface px-4 md:hidden">
        <button
          type="button"
          aria-label="Open dashboard navigation"
          aria-expanded={isOpen}
          onClick={() => setIsOpen(true)}
          className="rounded-md p-2 text-foreground hover:bg-surface-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
        >
          <Menu className="size-5" aria-hidden="true" />
        </button>
        <span className="ml-3 text-sm font-semibold">Farmora</span>
      </div>

      <aside className="hidden w-64 shrink-0 border-r border-border bg-surface md:block">
        <div className="flex h-16 items-center gap-2 border-b border-border px-5">
          <Sprout className="size-5 text-accent" aria-hidden="true" />
          <span className="font-semibold text-foreground">Farmora</span>
        </div>
        {navigation}
      </aside>

      {isOpen ? (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            aria-label="Close dashboard navigation"
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/40"
          />
          <aside className="relative flex h-full w-72 flex-col bg-surface shadow-xl">
            <div className="flex h-14 items-center justify-between border-b border-border px-4">
              <div className="flex items-center gap-2">
                <Sprout className="size-5 text-accent" aria-hidden="true" />
                <span className="font-semibold">Farmora</span>
              </div>
              <button
                type="button"
                aria-label="Close dashboard navigation"
                onClick={() => setIsOpen(false)}
                className="rounded-md p-2 text-foreground hover:bg-surface-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>
            {navigation}
          </aside>
        </div>
      ) : null}
    </>
  );
}
