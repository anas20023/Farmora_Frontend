"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Avatar, Button, Menu, Popover } from "@heroui/react";
import { ChevronDown, LogIn, LogOut, Menu as MenuIcon, Moon, Sprout, Sun, UserRound, X } from "lucide-react";
import { authClient } from "@/lib/auth-client";

const navigation = [
  { label: "Market Place", href: "#marketplace" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Contact", href: "#contact" },
];

function initials(name?: string | null) {
  return (name || "Farmora User").split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();
}

export default function Navbar() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("farmora-theme");
    const shouldUseDark = storedTheme ? storedTheme === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.classList.toggle("dark", shouldUseDark);
    document.documentElement.dataset.theme = shouldUseDark ? "dark" : "light";
    const animationFrame = window.requestAnimationFrame(() => setIsDark(shouldUseDark));

    return () => window.cancelAnimationFrame(animationFrame);
  }, []);

  const toggleTheme = () => {
    const nextIsDark = !isDark;
    setIsDark(nextIsDark);
    document.documentElement.classList.toggle("dark", nextIsDark);
    document.documentElement.dataset.theme = nextIsDark ? "dark" : "light";
    window.localStorage.setItem("farmora-theme", nextIsDark ? "dark" : "light");
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const user = session?.user;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      <nav aria-label="Main navigation" className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-foreground transition-opacity hover:opacity-80" onClick={closeMobileMenu}>
          <span className="grid size-9 place-items-center rounded-md bg-accent text-accent-foreground"><Sprout aria-hidden="true" className="size-5" /></span>
          <span className="text-lg font-semibold tracking-tight">Farmora</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navigation.map((item) => (
            <Link key={item.label} href={item.href} className="rounded-md px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-surface-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus">
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button aria-label={`Switch to ${isDark ? "light" : "dark"} mode`} isIconOnly size="sm" variant="ghost" onPress={toggleTheme}>
            {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </Button>

          {user ? (
            <Popover>
              <Popover.Trigger>
                <button aria-label="Open account menu" className="flex items-center gap-1 rounded-full outline-none ring-focus transition-shadow focus-visible:ring-2">
                  <Avatar size="sm">
                    {user.image ? <Avatar.Image alt={user.name || "Profile"} src={user.image} /> : null}
                    <Avatar.Fallback>{initials(user.name)}</Avatar.Fallback>
                  </Avatar>
                  <ChevronDown aria-hidden="true" className="hidden size-4 text-muted sm:block" />
                </button>
              </Popover.Trigger>
              <Popover.Content placement="bottom end" className="mt-2 w-56">
                <Popover.Dialog className="outline-none">
                  <div className="border-b border-separator px-3 py-2.5">
                    <p className="truncate text-sm font-medium text-foreground">{user.name || "Farmora User"}</p>
                    <p className="truncate text-xs text-muted">{user.email}</p>
                  </div>
                  <Menu aria-label="Account options" className="p-1">
                    <Menu.Item id="profile" href="/profile" textValue="Profile"><UserRound className="size-4" />Profile</Menu.Item>
                    <Menu.Item id="logout" textValue="Log out" onAction={() => authClient.signOut()}><LogOut className="size-4" />Log out</Menu.Item>
                  </Menu>
                </Popover.Dialog>
              </Popover.Content>
            </Popover>
          ) : (
            <Button size="sm" variant="primary" onPress={() => router.push("/login")}>
              <LogIn aria-hidden="true" className="size-4" /><span className="hidden sm:inline">Join / Login</span><span className="sm:hidden">Join</span>
            </Button>
          )}

          <Button aria-expanded={isMobileMenuOpen} aria-label="Toggle navigation menu" className="md:hidden" isIconOnly size="sm" variant="ghost" onPress={() => setIsMobileMenuOpen((open) => !open)}>
            {isMobileMenuOpen ? <X className="size-5" /> : <MenuIcon className="size-5" />}
          </Button>
        </div>
      </nav>

      {isMobileMenuOpen ? (
        <div className="border-t border-border bg-background px-4 py-3 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 sm:px-2">
            {navigation.map((item) => (
              <Link key={item.label} href={item.href} className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-surface-secondary" onClick={closeMobileMenu}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
