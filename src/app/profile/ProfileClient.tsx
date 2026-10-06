"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Avatar,
  Button,
  Card,
  Chip,
  Separator,
} from "@heroui/react";
import {
  AlertCircle,
  Calendar,
  Check,
  CheckCircle2,
  Copy,
  FileBadge,
  Globe,
  KeyRound,
  Laptop,
  LogOut,
  Mail,
  MapPin,
  RefreshCw,
  Shield,
  ShieldCheck,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
  Sprout,
  Tractor,
  User,
  UserCheck,
} from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import type { SerializableUserProfile } from "@/types/profile";

interface ProfileClientProps {
  user: SerializableUserProfile;
  isPreview?: boolean;
}

type TabKey = "overview" | "operations" | "security" | "preferences";

export default function ProfileClient({ user, isPreview }: ProfileClientProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [copiedId, setCopiedId] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const isFarmer = (user.role || user.wishedRole || "").toLowerCase() === "farmer";

  const handleCopyId = async () => {
    try {
      await navigator.clipboard.writeText(user.id);
      setCopiedId(true);
      toast.success("User ID copied to clipboard!");
      setTimeout(() => setCopiedId(false), 2500);
    } catch {
      toast.error("Failed to copy User ID");
    }
  };

  const handleSignOut = async () => {
    setIsLoggingOut(true);
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("Signed out successfully");
            router.push("/login");
          },
          onError: (ctx) => {
            toast.error(ctx.error?.message || "Failed to sign out");
            setIsLoggingOut(false);
          },
        },
      });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error signing out");
      setIsLoggingOut(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    try {
      return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(new Date(dateString));
    } catch {
      return dateString;
    }
  };

  const formatDateTime = (dateString?: string) => {
    if (!dateString) return "N/A";
    try {
      return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date(dateString));
    } catch {
      return dateString;
    }
  };

  const tabs: { key: TabKey; label: string; icon: typeof User }[] = [
    { key: "overview", label: "Overview", icon: User },
    { key: "operations", label: isFarmer ? "Farming Profile" : "Marketplace Profile", icon: isFarmer ? Tractor : ShoppingBag },
    { key: "security", label: "Security & Sessions", icon: ShieldCheck },
    { key: "preferences", label: "Preferences", icon: SlidersHorizontal },
  ];

  return (
    <div className="w-full space-y-6">
      {/* Dev / Preview Mode Banner */}
      {isPreview && (
        <aside
          aria-label="Development preview notice"
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-lg border border-warning/40 bg-warning/10 px-4 py-3 text-warning-foreground"
        >
          <div className="flex items-center gap-3">
            <AlertCircle className="size-5 shrink-0 text-warning" />
            <div className="text-sm">
              <span className="font-semibold">Development Preview Mode:</span> Database connection not configured locally. Displaying sample Better Auth session schema for review.
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              className="text-xs border-warning/50 text-warning-foreground hover:bg-warning/20"
              onPress={() => router.push("/login")}
            >
              Go to Login
            </Button>
          </div>
        </aside>
      )}

      {/* Main Profile Header Card */}
      <Card variant="default" className="relative overflow-hidden border border-border bg-surface shadow-sm">
        {/* Decorative Top Accent Banner */}
        <div
          aria-hidden="true"
          className="h-32 sm:h-40 w-full bg-gradient-to-r from-accent/90 via-accent/70 to-surface-secondary relative"
        >
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff20_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
          <div className="absolute right-4 bottom-4 hidden sm:flex items-center gap-2 rounded-full bg-background/80 px-3 py-1 text-xs font-medium text-foreground backdrop-blur border border-border">
            <Sprout className="size-3.5 text-accent" />
            <span>Farmora Verified Member</span>
          </div>
        </div>

        <Card.Content className="relative px-4 sm:px-8 pb-6 pt-0">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-14 sm:-mt-16 mb-6">
            {/* User Avatar + Presence */}
            <div className="flex items-end gap-4">
              <div className="relative">
                <Avatar size="lg" className="size-24 sm:size-28 ring-4 ring-background border border-border shadow-md">
                  {user.image ? (
                    <Avatar.Image src={user.image} alt={user.name} />
                  ) : null}
                  <Avatar.Fallback className="bg-accent text-accent-foreground text-2xl font-bold">
                    {user.initials}
                  </Avatar.Fallback>
                </Avatar>
                <span
                  title="Active account"
                  className="absolute bottom-1 right-1 size-4 rounded-full bg-emerald-500 ring-2 ring-background"
                />
              </div>

              <div className="space-y-1 mb-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                    {user.name}
                  </h1>
                  {user.emailVerified ? (
                    <Chip color="success" variant="soft" size="sm">
                      <Chip.Label className="flex items-center gap-1 font-medium">
                        <CheckCircle2 className="size-3" />
                        Verified
                      </Chip.Label>
                    </Chip>
                  ) : (
                    <Chip color="warning" variant="soft" size="sm">
                      <Chip.Label className="flex items-center gap-1 font-medium">
                        <AlertCircle className="size-3" />
                        Unverified
                      </Chip.Label>
                    </Chip>
                  )}
                </div>
                <p className="text-sm text-muted">
                  {user.username ? `@${user.username}` : user.email}
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onPress={handleCopyId}
                aria-label="Copy User ID"
                className="gap-1.5"
              >
                {copiedId ? (
                  <>
                    <Check className="size-3.5 text-success" />
                    <span>Copied ID</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-3.5 text-muted" />
                    <span>Copy ID</span>
                  </>
                )}
              </Button>

              <Button
                variant="danger-soft"
                size="sm"
                onPress={handleSignOut}
                isDisabled={isLoggingOut}
                aria-label="Sign out of Farmora"
                className="gap-1.5"
              >
                {isLoggingOut ? (
                  <RefreshCw className="size-3.5 animate-spin" />
                ) : (
                  <LogOut className="size-3.5" />
                )}
                <span>{isLoggingOut ? "Signing out..." : "Log Out"}</span>
              </Button>
            </div>
          </div>

          <Separator className="my-4" />

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="rounded-md border border-border/60 bg-surface-secondary/50 p-3">
              <div className="flex items-center gap-2 text-xs text-muted mb-1">
                {isFarmer ? <Tractor className="size-3.5 text-accent" /> : <ShoppingBag className="size-3.5 text-accent" />}
                <span>Role</span>
              </div>
              <div className="font-semibold text-foreground capitalize">
                {user.role || user.wishedRole || "Member"}
              </div>
            </div>

            <div className="rounded-md border border-border/60 bg-surface-secondary/50 p-3">
              <div className="flex items-center gap-2 text-xs text-muted mb-1">
                <Calendar className="size-3.5 text-accent" />
                <span>Joined</span>
              </div>
              <div className="font-semibold text-foreground">
                {formatDate(user.createdAt)}
              </div>
            </div>

            <div className="rounded-md border border-border/60 bg-surface-secondary/50 p-3">
              <div className="flex items-center gap-2 text-xs text-muted mb-1">
                <Shield className="size-3.5 text-accent" />
                <span>Status</span>
              </div>
              <div className="flex items-center gap-1.5 font-semibold text-foreground">
                <span className="size-2 rounded-full bg-emerald-500" />
                <span>Active</span>
              </div>
            </div>

            <div className="rounded-md border border-border/60 bg-surface-secondary/50 p-3">
              <div className="flex items-center gap-2 text-xs text-muted mb-1">
                <Sparkles className="size-3.5 text-accent" />
                <span>Tier</span>
              </div>
              <div className="font-semibold text-foreground">
                Level 1 Producer
              </div>
            </div>
          </div>
        </Card.Content>
      </Card>

      {/* Tabs Navigation */}
      <div className="border-b border-border">
        <nav
          aria-label="Profile Sections"
          className="flex space-x-2 overflow-x-auto pb-px scrollbar-none"
        >
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 whitespace-nowrap border-b-2 px-4 py-2.5 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-focus ${
                  isActive
                    ? "border-accent text-accent font-semibold"
                    : "border-transparent text-muted hover:border-border hover:text-foreground"
                }`}
              >
                <IconComponent className={`size-4 ${isActive ? "text-accent" : "text-muted"}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Panels */}
      <div className="space-y-6">
        {/* 1. OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left 2 cols: Personal Details */}
            <div className="md:col-span-2 space-y-6">
              <Card variant="default" className="border border-border bg-surface">
                <Card.Header className="px-6 pt-6 pb-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <Card.Title className="text-lg font-semibold text-foreground">
                        Account Information
                      </Card.Title>
                      <Card.Description className="text-sm text-muted">
                        Primary identification and contact details stored with Better Auth
                      </Card.Description>
                    </div>
                    <Chip color="default" variant="soft" size="sm">
                      <Chip.Label>ID: {user.id.slice(0, 8)}...</Chip.Label>
                    </Chip>
                  </div>
                </Card.Header>
                <Card.Content className="px-6 py-4">
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="rounded-md border border-border/50 bg-surface-secondary/40 p-3">
                      <dt className="text-xs font-medium text-muted">Full Name</dt>
                      <dd className="mt-1 text-sm font-semibold text-foreground">{user.name}</dd>
                    </div>

                    <div className="rounded-md border border-border/50 bg-surface-secondary/40 p-3">
                      <dt className="text-xs font-medium text-muted">Email Address</dt>
                      <dd className="mt-1 text-sm font-semibold text-foreground flex items-center justify-between">
                        <span className="truncate">{user.email}</span>
                        {user.emailVerified && (
                          <CheckCircle2 className="size-4 text-emerald-500 shrink-0 ml-1" />
                        )}
                      </dd>
                    </div>

                    <div className="rounded-md border border-border/50 bg-surface-secondary/40 p-3">
                      <dt className="text-xs font-medium text-muted">Normalized Username</dt>
                      <dd className="mt-1 text-sm font-semibold text-foreground">
                        {user.username ? `@${user.username}` : "Not configured"}
                      </dd>
                    </div>

                    <div className="rounded-md border border-border/50 bg-surface-secondary/40 p-3">
                      <dt className="text-xs font-medium text-muted">Registration Role</dt>
                      <dd className="mt-1 text-sm font-semibold text-foreground capitalize">
                        {user.wishedRole || user.role}
                      </dd>
                    </div>

                    <div className="rounded-md border border-border/50 bg-surface-secondary/40 p-3">
                      <dt className="text-xs font-medium text-muted">Account Created</dt>
                      <dd className="mt-1 text-sm font-semibold text-foreground">
                        {formatDateTime(user.createdAt)}
                      </dd>
                    </div>

                    <div className="rounded-md border border-border/50 bg-surface-secondary/40 p-3">
                      <dt className="text-xs font-medium text-muted">Last Updated</dt>
                      <dd className="mt-1 text-sm font-semibold text-foreground">
                        {formatDateTime(user.updatedAt)}
                      </dd>
                    </div>
                  </dl>
                </Card.Content>
              </Card>

              {/* Bio & Agricultural Focus Card */}
              <Card variant="default" className="border border-border bg-surface">
                <Card.Header className="px-6 pt-6 pb-2">
                  <Card.Title className="text-lg font-semibold text-foreground">
                    Agricultural Summary
                  </Card.Title>
                  <Card.Description className="text-sm text-muted">
                    Your focus and market presence across the Farmora network
                  </Card.Description>
                </Card.Header>
                <Card.Content className="px-6 py-4 space-y-4">
                  <p className="text-sm text-foreground/90 leading-relaxed">
                    {isFarmer
                      ? `Dedicated agricultural producer participating in the Farmora Smart Marketplace. Specializing in sustainable crop cultivation, wholesale distribution, and direct-to-consumer regional trade.`
                      : `Registered commercial buyer on the Farmora network. Actively sourcing verified agricultural commodities, seasonal harvests, and organic produce from local farming collectives.`}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="inline-flex items-center gap-1 rounded-md bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent">
                      <Sprout className="size-3" />
                      Smart Farming
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-md bg-surface-secondary px-2.5 py-1 text-xs font-medium text-foreground border border-border">
                      <MapPin className="size-3 text-muted" />
                      Bangladesh Agro-Hub
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-md bg-surface-secondary px-2.5 py-1 text-xs font-medium text-foreground border border-border">
                      <Globe className="size-3 text-muted" />
                      Regional Marketplace
                    </span>
                  </div>
                </Card.Content>
              </Card>
            </div>

            {/* Right 1 col: Quick Cards */}
            <div className="space-y-6">
              {/* Verification & Trust Status */}
              <Card variant="secondary" className="border border-border bg-surface-secondary/60">
                <Card.Header className="px-5 pt-5 pb-2">
                  <Card.Title className="text-base font-semibold text-foreground flex items-center gap-2">
                    <ShieldCheck className="size-4 text-accent" />
                    Trust & Verification
                  </Card.Title>
                </Card.Header>
                <Card.Content className="px-5 py-3 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted">Identity Status</span>
                    <span className="font-semibold text-success flex items-center gap-1">
                      <Check className="size-3.5" /> Verified
                    </span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted">Email Verified</span>
                    <span className={user.emailVerified ? "text-success font-semibold" : "text-warning font-semibold"}>
                      {user.emailVerified ? "Yes" : "Pending"}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted">Farmora Score</span>
                    <span className="font-bold text-accent">98 / 100</span>
                  </div>
                </Card.Content>
              </Card>

              {/* Badges Earned */}
              <Card variant="default" className="border border-border bg-surface">
                <Card.Header className="px-5 pt-5 pb-2">
                  <Card.Title className="text-base font-semibold text-foreground flex items-center gap-2">
                    <FileBadge className="size-4 text-accent" />
                    Member Badges
                  </Card.Title>
                </Card.Header>
                <Card.Content className="px-5 py-3 space-y-2.5">
                  <div className="flex items-center gap-3 rounded-md bg-surface-secondary/70 p-2.5">
                    <div className="grid size-8 place-items-center rounded bg-accent/20 text-accent">
                      <Sprout className="size-4" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-foreground">Early Pioneer</p>
                      <p className="text-[11px] text-muted">Joined during initial rollout</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-md bg-surface-secondary/70 p-2.5">
                    <div className="grid size-8 place-items-center rounded bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                      <UserCheck className="size-4" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-foreground">Verified Trader</p>
                      <p className="text-[11px] text-muted">Completed account verification</p>
                    </div>
                  </div>
                </Card.Content>
              </Card>
            </div>
          </div>
        )}

        {/* 2. OPERATIONS TAB */}
        {activeTab === "operations" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card variant="default" className="border border-border bg-surface">
              <Card.Header className="px-6 pt-6 pb-2">
                <Card.Title className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Tractor className="size-5 text-accent" />
                  {isFarmer ? "Farming Operations" : "Procurement Profile"}
                </Card.Title>
                <Card.Description className="text-sm text-muted">
                  {isFarmer
                    ? "Manage your crop varieties, cultivation metrics, and harvest schedules"
                    : "Preferred agricultural commodities and bulk purchasing specifications"}
                </Card.Description>
              </Card.Header>
              <Card.Content className="px-6 py-4 space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted">Primary Focus Areas</label>
                  <div className="flex flex-wrap gap-2">
                    {(isFarmer
                      ? ["Paddy & Rice", "Seasonal Vegetables", "Organic Pulses", "Horticulture"]
                      : ["Grain Bulk", "Direct Fresh Vegetables", "Cold Storage Commodities"]
                    ).map((item) => (
                      <Chip key={item} color="default" variant="secondary" size="sm">
                        <Chip.Label>{item}</Chip.Label>
                      </Chip>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <label className="text-xs font-medium text-muted">Farming Methodology</label>
                  <div className="rounded-md border border-border bg-surface-secondary/40 p-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-semibold text-foreground">Eco-Friendly & Good Agricultural Practices (GAP)</span>
                      <span className="text-xs text-accent font-medium">Standards Compliant</span>
                    </div>
                    <p className="text-xs text-muted mt-1">
                      Adheres to environmentally conscious pest management and soil health protocols.
                    </p>
                  </div>
                </div>
              </Card.Content>
            </Card>

            <Card variant="default" className="border border-border bg-surface">
              <Card.Header className="px-6 pt-6 pb-2">
                <Card.Title className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <MapPin className="size-5 text-accent" />
                  Regional Logistics & Coverage
                </Card.Title>
                <Card.Description className="text-sm text-muted">
                  Logistical zones and distribution centers connected to your account
                </Card.Description>
              </Card.Header>
              <Card.Content className="px-6 py-4 space-y-4">
                <div className="rounded-md border border-border bg-surface-secondary/40 p-3 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-foreground">Primary Operating Hub</span>
                    <span className="text-xs text-accent font-medium">Active Depot</span>
                  </div>
                  <p className="text-xs text-muted">
                    Rajshahi & Rangpur Agro-corridor with direct route to Dhaka Wholesale Terminal.
                  </p>
                </div>

                <div className="rounded-md border border-border bg-surface-secondary/40 p-3 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-foreground">Delivery Method</span>
                    <span className="text-xs text-muted">Farm Gate & Hub Delivery</span>
                  </div>
                  <p className="text-xs text-muted">
                    Equipped for flexible transport coordination through Farmora certified haulers.
                  </p>
                </div>
              </Card.Content>
            </Card>
          </div>
        )}

        {/* 3. SECURITY TAB */}
        {activeTab === "security" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card variant="default" className="border border-border bg-surface">
              <Card.Header className="px-6 pt-6 pb-2">
                <Card.Title className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <KeyRound className="size-5 text-accent" />
                  Authentication Credentials
                </Card.Title>
                <Card.Description className="text-sm text-muted">
                  Better Auth credentials and verification management
                </Card.Description>
              </Card.Header>
              <Card.Content className="px-6 py-4 space-y-4">
                <div className="flex items-center justify-between rounded-md border border-border bg-surface-secondary/40 p-3">
                  <div className="flex items-center gap-3">
                    <Mail className="size-4 text-muted" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">{user.email}</p>
                      <p className="text-xs text-muted">Primary login identifier</p>
                    </div>
                  </div>
                  {user.emailVerified ? (
                    <Chip color="success" variant="soft" size="sm">
                      <Chip.Label>Verified</Chip.Label>
                    </Chip>
                  ) : (
                    <Chip color="warning" variant="soft" size="sm">
                      <Chip.Label>Pending</Chip.Label>
                    </Chip>
                  )}
                </div>

                <div className="flex items-center justify-between rounded-md border border-border bg-surface-secondary/40 p-3">
                  <div className="flex items-center gap-3">
                    <Shield className="size-4 text-muted" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">Password Protection</p>
                      <p className="text-xs text-muted">Secured with strong hashing</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" onPress={() => toast("Password reset link requested")}>
                    Change
                  </Button>
                </div>
              </Card.Content>
            </Card>

            <Card variant="default" className="border border-border bg-surface">
              <Card.Header className="px-6 pt-6 pb-2">
                <Card.Title className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Laptop className="size-5 text-accent" />
                  Active Session
                </Card.Title>
                <Card.Description className="text-sm text-muted">
                  Details from your current authenticated Better Auth session
                </Card.Description>
              </Card.Header>
              <Card.Content className="px-6 py-4 space-y-3">
                <div className="rounded-md border border-border bg-surface-secondary/40 p-3 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted">Session Status</span>
                    <span className="font-semibold text-emerald-500 flex items-center gap-1">
                      <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Active
                    </span>
                  </div>
                  {user.sessionInfo?.id && (
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted">Session Reference</span>
                      <span className="font-mono text-foreground">
                        {user.sessionInfo.id.slice(0, 12)}...
                      </span>
                    </div>
                  )}
                  {user.sessionInfo?.createdAt && (
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted">Established At</span>
                      <span className="text-foreground">{formatDateTime(user.sessionInfo.createdAt)}</span>
                    </div>
                  )}
                  {user.sessionInfo?.expiresAt && (
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted">Expires At</span>
                      <span className="text-foreground">{formatDateTime(user.sessionInfo.expiresAt)}</span>
                    </div>
                  )}
                </div>

                <div className="pt-2">
                  <Button
                    variant="danger-soft"
                    size="sm"
                    className="w-full"
                    onPress={handleSignOut}
                    isDisabled={isLoggingOut}
                  >
                    <LogOut className="size-4" />
                    <span>Terminate Current Session</span>
                  </Button>
                </div>
              </Card.Content>
            </Card>
          </div>
        )}

        {/* 4. PREFERENCES TAB */}
        {activeTab === "preferences" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card variant="default" className="border border-border bg-surface">
              <Card.Header className="px-6 pt-6 pb-2">
                <Card.Title className="text-lg font-semibold text-foreground">
                  Marketplace Notifications
                </Card.Title>
                <Card.Description className="text-sm text-muted">
                  Configure alerts for harvest offers, bids, and market prices
                </Card.Description>
              </Card.Header>
              <Card.Content className="px-6 py-4 space-y-3">
                <div className="flex items-center justify-between rounded-md border border-border bg-surface-secondary/40 p-3">
                  <div>
                    <p className="text-sm font-semibold text-foreground">Order Updates</p>
                    <p className="text-xs text-muted">Receive notifications when bids or sales occur</p>
                  </div>
                  <Chip color="success" variant="soft" size="sm">
                    <Chip.Label>Enabled</Chip.Label>
                  </Chip>
                </div>

                <div className="flex items-center justify-between rounded-md border border-border bg-surface-secondary/40 p-3">
                  <div>
                    <p className="text-sm font-semibold text-foreground">Price Fluctuation Alerts</p>
                    <p className="text-xs text-muted">Daily market digest of regional commodity indices</p>
                  </div>
                  <Chip color="default" variant="soft" size="sm">
                    <Chip.Label>Subscribed</Chip.Label>
                  </Chip>
                </div>
              </Card.Content>
            </Card>

            <Card variant="default" className="border border-border bg-surface">
              <Card.Header className="px-6 pt-6 pb-2">
                <Card.Title className="text-lg font-semibold text-foreground">
                  Localization & Regional Format
                </Card.Title>
                <Card.Description className="text-sm text-muted">
                  Adjust default currency and measurement standards
                </Card.Description>
              </Card.Header>
              <Card.Content className="px-6 py-4 space-y-3">
                <div className="flex items-center justify-between rounded-md border border-border bg-surface-secondary/40 p-3">
                  <div>
                    <p className="text-sm font-semibold text-foreground">Default Currency</p>
                    <p className="text-xs text-muted">All prices displayed in local tender</p>
                  </div>
                  <span className="text-sm font-bold text-accent">BDT (৳)</span>
                </div>

                <div className="flex items-center justify-between rounded-md border border-border bg-surface-secondary/40 p-3">
                  <div>
                    <p className="text-sm font-semibold text-foreground">Weight & Mass Units</p>
                    <p className="text-xs text-muted">Standard trade units</p>
                  </div>
                  <span className="text-sm font-semibold text-foreground">Kilograms (kg) / Maund (মন)</span>
                </div>
              </Card.Content>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
