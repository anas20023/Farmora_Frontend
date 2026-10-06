import { getSessionCookie } from "better-auth/cookies";
import { type NextRequest, NextResponse } from "next/server";

/**
 * Routes that require a signed-in user. Add each new private area here.
 * This is an optimistic cookie check; server pages and route handlers must
 * still validate the session and enforce role permissions with Better Auth.
 */
const protectedRoutePrefixes = ["/profile"] as const;
const authenticationRoutes = ["/login", "/register"] as const;

function matchesPrefix(pathname: string, prefixes: readonly string[]) {
  return prefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasSession = Boolean(getSessionCookie(request));
  const isProtectedRoute = matchesPrefix(pathname, protectedRoutePrefixes);
  const isAuthenticationRoute = matchesPrefix(pathname, authenticationRoutes);

  // Authentication: return unauthenticated visitors to sign-in.
  if (isProtectedRoute && !hasSession) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Authenticated users should not be sent back through sign-in or registration.
  if (isAuthenticationRoute && hasSession) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
