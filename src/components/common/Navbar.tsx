'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Avatar, Button, Menu, Popover } from '@heroui/react';
import {
    ArrowUpRight,
    ChevronDown,
    LayoutDashboard,
    LogIn,
    LogOut,
    Menu as MenuIcon,
    Moon,
    Sun,
    UserRound,
    X,
} from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import Image from 'next/image';

const navigation = [
    { label: 'Browse Marketplace', href: '/marketplace' },
    { label: 'Verified Farms', href: '/farms' },
    { label: 'Contact', href: '/contact' },
];

function initials(name?: string | null) {
    return (name || 'Farmora User')
        .split(' ')
        .map((part) => part[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();
}

export default function Navbar() {
    const router = useRouter();
    const { data: session } = authClient.useSession();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const storedTheme = window.localStorage.getItem('farmora-theme');
        const shouldUseDark = storedTheme
            ? storedTheme === 'dark'
            : window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.classList.toggle('dark', shouldUseDark);
        document.documentElement.dataset.theme = shouldUseDark
            ? 'dark'
            : 'light';
        const animationFrame = window.requestAnimationFrame(() =>
            setIsDark(shouldUseDark),
        );

        return () => window.cancelAnimationFrame(animationFrame);
    }, []);

    const toggleTheme = () => {
        const nextIsDark = !isDark;
        setIsDark(nextIsDark);
        document.documentElement.classList.toggle('dark', nextIsDark);
        document.documentElement.dataset.theme = nextIsDark ? 'dark' : 'light';
        window.localStorage.setItem(
            'farmora-theme',
            nextIsDark ? 'dark' : 'light',
        );
    };

    const closeMobileMenu = () => setIsMobileMenuOpen(false);
    const user = session?.user;

    return (
        <header
            data-ui="true"
            className="sticky top-0 z-50 w-full bg-background border-b border-border">
            <nav
                aria-label="Main navigation"
                className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <Link
                    href="/"
                    className="flex items-center gap-2.5 text-foreground transition-opacity hover:opacity-85"
                    onClick={closeMobileMenu}>
                    <Image
                        src="/Logo.png"
                        alt="Farmora"
                        width={35}
                        height={35}
                    />
                    <span className="font-display text-2xl font-bold tracking-tight">
                        Farmora
                    </span>
                </Link>

                <div className="hidden items-center gap-6 md:flex">
                    {navigation.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="text-sm font-medium text-muted transition-colors hover:text-foreground">
                            {item.label}
                        </Link>
                    ))}
                    {user && user.wished_role !== user.role && (
                        <button
                            type="button"
                            className="inline-flex items-center gap-2 rounded bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90 cursor-pointer">
                            <span>
                                Become a Verified{' '}
                                {user?.wished_role
                                    ? user.wished_role.charAt(0).toUpperCase() +
                                      user.wished_role.slice(1)
                                    : 'User'}
                            </span>
                        </button>
                    )}
                </div>

                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
                        className="flex size-9 items-center justify-center rounded text-muted transition-colors hover:bg-surface-secondary hover:text-foreground"
                        onClick={toggleTheme}>
                        {isDark ? (
                            <Sun className="size-4" />
                        ) : (
                            <Moon className="size-4" />
                        )}
                    </button>

                    {user ? (
                        <Popover>
                            <Popover.Trigger>
                                <button
                                    type="button"
                                    aria-label="Open account menu"
                                    className="flex items-center gap-2 rounded px-2 py-1 text-sm font-medium text-foreground transition-colors hover:bg-surface-secondary">
                                    <Avatar size="sm">
                                        {user.image ? (
                                            <Avatar.Image
                                                alt={user.name || 'Profile'}
                                                src={user.image}
                                            />
                                        ) : null}
                                        <Avatar.Fallback>
                                            {initials(user.name)}
                                        </Avatar.Fallback>
                                    </Avatar>
                                    <span className="hidden sm:inline">
                                        {user.name || 'Account'}
                                    </span>
                                    <ChevronDown
                                        aria-hidden="true"
                                        className="size-3.5 text-muted"
                                    />
                                </button>
                            </Popover.Trigger>
                            <Popover.Content
                                placement="bottom end"
                                className="mt-2 w-56 rounded bg-surface p-1 text-surface-foreground border border-border">
                                <Popover.Dialog className="outline-none">
                                    <div className="px-3 py-2">
                                        <p className="truncate text-sm font-medium text-foreground">
                                            {user.name || 'Farmora User'}
                                        </p>
                                        <p className="truncate text-xs text-muted">
                                            {user.email}
                                        </p>
                                    </div>
                                    <Menu
                                        aria-label="Account options"
                                        className="p-1">
                                        <Menu.Item
                                            id="profile"
                                            href="/profile"
                                            textValue="Profile">
                                            <UserRound className="size-4" />
                                            Profile
                                        </Menu.Item>
                                        {session.user.role !== 'user' && (
                                            <Menu.Item
                                                id="dashboard"
                                                href={`/dashboard/${session.user.role}`}
                                                textValue="Dashboard">
                                                <LayoutDashboard className="size-4" />
                                                Dashboard
                                            </Menu.Item>
                                        )}
                                        <Menu.Item
                                            id="logout"
                                            textValue="Log out"
                                            onAction={() =>
                                                authClient.signOut()
                                            }>
                                            <LogOut className="size-4" />
                                            Log out
                                        </Menu.Item>
                                    </Menu>
                                </Popover.Dialog>
                            </Popover.Content>
                        </Popover>
                    ) : (
                        <Button
                            size="sm"
                            className="rounded bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
                            onPress={() => router.push('/login')}>
                            <LogIn aria-hidden="true" className="size-4" />
                            <span>Sign In</span>
                        </Button>
                    )}

                    <button
                        type="button"
                        className="flex size-9 items-center justify-center rounded text-muted md:hidden hover:text-foreground"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle navigation menu">
                        {isMobileMenuOpen ? (
                            <X className="size-5" />
                        ) : (
                            <MenuIcon className="size-5" />
                        )}
                    </button>
                </div>
            </nav>

            {isMobileMenuOpen && (
                <div
                    data-ui="true"
                    className="bg-surface px-4 py-5 md:hidden border-b border-border">
                    <div className="flex flex-col gap-3">
                        {navigation.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="text-base font-medium text-foreground hover:text-accent"
                                onClick={closeMobileMenu}>
                                {item.label}
                            </Link>
                        ))}

                        {user && user.wished_role !== user.role && (
                            <button
                                type="button"
                                className="inline-flex items-center gap-2 rounded text-sm font-semibold text-accent-background transition-opacity hover:opacity-90 cursor-pointer">
                                <span>
                                    Become Verified{' '}
                                    {user?.wished_role
                                        ? user.wished_role
                                              .charAt(0)
                                              .toUpperCase() +
                                          user.wished_role.slice(1)
                                        : 'User'}
                                </span>
                                <ArrowUpRight />
                            </button>
                        )}
                        {!user && (
                            <Button
                                size="sm"
                                className="mt-2 w-full rounded bg-accent text-accent-foreground"
                                onPress={() => {
                                    closeMobileMenu();
                                    router.push('/login');
                                }}>
                                Sign In
                            </Button>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}
