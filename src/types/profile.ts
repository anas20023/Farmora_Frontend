export type UserRole = "farmer" | "buyer" | "admin" | "user" | string;

export interface SessionInfo {
  id: string;
  createdAt: string;
  expiresAt: string;
  ipAddress?: string | null;
  userAgent?: string | null;
}

export interface SerializableUserProfile {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  role: UserRole;
  wishedRole: string;
  username: string | null;
  createdAt: string;
  updatedAt: string;
  initials: string;
  sessionInfo?: SessionInfo | null;
}
