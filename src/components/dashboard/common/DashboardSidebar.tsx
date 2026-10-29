"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BarChart3, ChevronLeft, ChevronRight, Heart, LayoutDashboard, Menu, Package, Sprout, Users, Wheat, X } from "lucide-react";
import type { DashboardConfig } from "@/config/dashboard";

type DashboardSidebarProps = { config: DashboardConfig };

const navigationIcons = {
  Overview: LayoutDashboard,
  Users,
  Analytics: BarChart3,
  Orders: Package,
  "Saved items": Heart,
  Farms: Sprout,
  Crops: Wheat,
};

export default function DashboardSidebar({ config }: DashboardSidebarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navigation = (collapsed = false) => (
    <nav className="space-y-1 p-3" aria-label={`${config.label} dashboard`}>
      {config.navigation.map((item) => {
        const isActive = pathname === item.href;
        const Icon = navigationIcons[item.label as keyof typeof navigationIcons] ?? LayoutDashboard;

        return (
          <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)} aria-label={collapsed ? item.label : undefined} title={collapsed ? item.label : undefined} className={`flex items-center rounded-md py-2 text-sm font-medium transition-colors ${collapsed ? "justify-center px-2" : "gap-2 px-3"} ${isActive ? "bg-accent text-accent-foreground" : "text-muted hover:bg-surface-secondary hover:text-foreground"}`}>
            <Icon className="size-4 shrink-0" aria-hidden="true" />
            {!collapsed ? <span>{item.label}</span> : null}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      <div data-ui="true" className="fixed inset-x-0 top-0 z-30 flex h-14 items-center border-b border-border bg-surface px-4 md:hidden">
        <button type="button" aria-label="Open dashboard navigation" aria-expanded={isOpen} onClick={() => setIsOpen(true)} className="rounded-md p-2 text-foreground hover:bg-surface-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus">
          <Menu className="size-5" aria-hidden="true" />
        </button>
        <span className="ml-3 text-sm font-semibold">Farmora</span>
      </div>

      <aside data-ui="true" className={`hidden shrink-0 overflow-hidden border-r border-border bg-surface transition-[width] duration-200 md:flex md:flex-col ${isCollapsed ? "w-16" : "w-64"}`}>
        <div data-ui="true" className={`flex h-16 items-center border-b border-border ${isCollapsed ? "justify-center px-2" : "gap-2 px-5"}`}>
          <Sprout className="size-5 shrink-0 text-accent" aria-hidden="true" />
          {!isCollapsed ? <span className="font-semibold text-foreground">Farmora</span> : null}
        </div>
        {navigation(isCollapsed)}
        <div data-ui="true" className="mt-auto border-t border-border p-3">
          <button type="button" aria-label={isCollapsed ? "Expand dashboard navigation" : "Collapse dashboard navigation"} title={isCollapsed ? "Expand navigation" : "Collapse navigation"} onClick={() => setIsCollapsed((collapsed) => !collapsed)} className="flex w-full items-center justify-center rounded-md p-2 text-muted transition-colors hover:bg-surface-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus">
            {isCollapsed ? <ChevronRight className="size-4" /> : <ChevronLeft className="size-4" />}
          </button>
        </div>
      </aside>

      {isOpen ? (
        <div className="fixed inset-0 z-50 md:hidden">
          <button type="button" aria-label="Close dashboard navigation" onClick={() => setIsOpen(false)} className="absolute inset-0 bg-black/40" />
          <aside data-ui="true" className="relative flex h-full w-72 flex-col bg-surface border-r border-border">
            <div data-ui="true" className="flex h-14 items-center justify-between border-b border-border px-4">
              <div className="flex items-center gap-2">
                <Sprout className="size-5 text-accent" aria-hidden="true" />
                <span className="font-semibold">Farmora</span>
              </div>
              <button type="button" aria-label="Close dashboard navigation" onClick={() => setIsOpen(false)} className="rounded-md p-2 text-foreground hover:bg-surface-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus">
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>
            {navigation()}
          </aside>
        </div>
      ) : null}
    </>
  );
}
