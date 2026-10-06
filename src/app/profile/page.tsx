import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import Navbar from "@/components/Navbar";
import ProfileClient from "./ProfileClient";
import type { SerializableUserProfile } from "@/types/profile";
import { Sprout } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "User Profile | Farmora",
  description: "View and manage your Farmora profile, agricultural operations, and account security.",
};

const DEMO_USER_CREATED_AT = "2025-06-12T10:15:00.000Z";
const DEMO_USER_UPDATED_AT = "2026-09-28T14:20:00.000Z";
const DEMO_SESSION_CREATED_AT = "2026-10-06T12:00:00.000Z";
const DEMO_SESSION_EXPIRES_AT = "2026-10-13T12:00:00.000Z";

interface RawBetterAuthUser {
  id: string;
  name?: string | null;
  email?: string | null;
  emailVerified?: boolean;
  image?: string | null;
  role?: string;
  wished_role?: string;
  username?: string | null;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

interface RawBetterAuthSession {
  id: string;
  createdAt?: string | Date;
  expiresAt?: string | Date;
  ipAddress?: string | null;
  userAgent?: string | null;
}

function getInitials(name?: string | null): string {
  if (!name) return "FM";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function toISOString(value?: string | Date | null): string {
  if (!value) return "2026-01-01T00:00:00.000Z";
  if (value instanceof Date) return value.toISOString();
  return String(value);
}

interface ProfilePageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ProfilePage({ searchParams }: ProfilePageProps) {
  const resolvedSearchParams = await searchParams;
  const isExplicitPreview = resolvedSearchParams?.preview === "true";

  // Server-side session fetching via Better Auth
  let session = null;
  try {
    const requestHeaders = await headers();
    session = await auth.api.getSession({
      headers: requestHeaders,
    });
  } catch (error) {
    // Graceful catch when database connection is not reachable in local dev
    console.warn("Server-side Better Auth session fetch encountered an error:", error);
  }

  // Handle unauthenticated state
  if (!session?.user) {
    // If a database URL is configured in production or explicit redirect requested, redirect to login
    if (process.env.DB_URL && !isExplicitPreview) {
      redirect("/login");
    }
  }

  // Extract ONLY serializable and safe profile data
  let serializedUser: SerializableUserProfile;
  const isPreview = !session?.user;

  if (session?.user) {
    const rawUser = session.user as unknown as RawBetterAuthUser;
    const rawSession = session.session as unknown as RawBetterAuthSession | undefined;

    serializedUser = {
      id: String(rawUser.id),
      name: String(rawUser.name || "Farmora Member"),
      email: String(rawUser.email || ""),
      emailVerified: Boolean(rawUser.emailVerified),
      image: rawUser.image ? String(rawUser.image) : null,
      role: String(rawUser.role || rawUser.wished_role || "user"),
      wishedRole: String(rawUser.wished_role || rawUser.role || "farmer"),
      username: rawUser.username ? String(rawUser.username) : null,
      createdAt: toISOString(rawUser.createdAt),
      updatedAt: toISOString(rawUser.updatedAt),
      initials: getInitials(rawUser.name),
      sessionInfo: rawSession
        ? {
            id: String(rawSession.id),
            createdAt: toISOString(rawSession.createdAt),
            expiresAt: toISOString(rawSession.expiresAt),
            ipAddress: rawSession.ipAddress ? String(rawSession.ipAddress) : null,
            userAgent: rawSession.userAgent ? String(rawSession.userAgent) : null,
          }
        : null,
    };
  } else {
    // Development preview fallback matching Better Auth user schema
    serializedUser = {
      id: "usr_farmora_dev_982431",
      name: "Tariqul Islam",
      email: "tariqul.farmer@farmora.org",
      emailVerified: true,
      image: null,
      role: "farmer",
      wishedRole: "farmer",
      username: "tariqul_agro",
      createdAt: DEMO_USER_CREATED_AT,
      updatedAt: DEMO_USER_UPDATED_AT,
      initials: "TI",
      sessionInfo: {
        id: "sess_ba_demo_88491024",
        createdAt: DEMO_SESSION_CREATED_AT,
        expiresAt: DEMO_SESSION_EXPIRES_AT,
        ipAddress: "127.0.0.1",
        userAgent: "Next.js App Router (Better Auth)",
      },
    };
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Primary Navigation Bar */}
      <Navbar />

      {/* Main Profile Page Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        <ProfileClient user={serializedUser} isPreview={isPreview} />
      </main>

      {/* Production Footer conforming to design tokens */}
      <footer className="mt-auto border-t border-border bg-surface-secondary/40 py-6 text-sm text-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-foreground font-semibold">
            <span className="grid size-6 place-items-center rounded bg-accent text-accent-foreground">
              <Sprout className="size-3.5" />
            </span>
            <span>Farmora Marketplace</span>
          </div>
          <p className="text-xs text-muted">
            &copy; 2026 Farmora Inc. Smart Agriculture Marketplace. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs">
            <Link href="#terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
            <Link href="#privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="#support" className="hover:text-foreground transition-colors">Support Desk</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
