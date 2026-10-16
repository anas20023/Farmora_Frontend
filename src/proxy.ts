import { getSessionCookie } from 'better-auth/cookies';
import { type NextRequest, NextResponse } from 'next/server';

const roleDashboardPaths = {
    admin: '/dashboard/admin',
    farmer: '/dashboard/farmer',
    buyer: '/dashboard/buyer',
} as const satisfies Record<string, `/dashboard/${string}`>;

interface SessionResponse {
    user?: {
        role?: string | null;
    } | null;
}

type DashboardRole = keyof typeof roleDashboardPaths;

function isDashboardRole(role: string): role is DashboardRole {
    return Object.hasOwn(roleDashboardPaths, role);
}

function loginResponse(request: NextRequest) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set(
        'callbackUrl',
        `${request.nextUrl.pathname}${request.nextUrl.search}`,
    );
    return NextResponse.redirect(loginUrl);
}

function unauthorizedResponse(request: NextRequest) {
    if (
        request.nextUrl.pathname.startsWith('/api/') ||
        request.headers.get('accept')?.includes('application/json')
    ) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const errorUrl = new URL('/auth-error', request.url);
    errorUrl.searchParams.set('error', 'unauthorized');
    return NextResponse.redirect(errorUrl);
}

function destinationForRole(role: string) {
    if (role === 'user') return '/';
    return isDashboardRole(role) ? roleDashboardPaths[role] : null;
}

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const isDashboardRoute =
        pathname === '/dashboard' || pathname.startsWith('/dashboard/');
    const requiresAuth =
        isDashboardRoute || pathname === '/profile' || pathname.startsWith('/profile/');
    const isGuestOnlyRoute = pathname === '/login' || pathname === '/register';

    // A cookie only proves that a session may exist; validate it before allowing
    // access or selecting a role-specific destination.
    if (!getSessionCookie(request)) {
        return requiresAuth ? loginResponse(request) : NextResponse.next();
    }

    try {
        const sessionResponse = await fetch(
            new URL('/api/auth/get-session', request.url),
            {
                headers: {
                    cookie: request.headers.get('cookie') ?? '',
                },
                cache: 'no-store',
            },
        );

        if (!sessionResponse.ok) {
            return requiresAuth ? loginResponse(request) : NextResponse.next();
        }

        const session: SessionResponse = await sessionResponse.json();

        if (!session.user) {
            return requiresAuth ? loginResponse(request) : NextResponse.next();
        }

        const role =
            typeof session.user.role === 'string'
                ? session.user.role.toLowerCase()
                : '';
        const destination = destinationForRole(role);

        if (isGuestOnlyRoute) {
            return destination
                ? NextResponse.redirect(new URL(destination, request.url))
                : unauthorizedResponse(request);
        }

        if (!isDashboardRoute) return NextResponse.next();

        if (!destination) return unauthorizedResponse(request);

        // /dashboard is a role-aware entry point. Regular users have no
        // dashboard namespace and are sent to the public home page.
        if (pathname === '/dashboard') {
            return NextResponse.redirect(new URL(destination, request.url));
        }

        // Do not let a signed-in user enter another role's dashboard.
        if (
            destination === '/' ||
            !(
                pathname === destination ||
                pathname.startsWith(`${destination}/`)
            )
        ) {
            return unauthorizedResponse(request);
        }

        return NextResponse.next();
    } catch (error: unknown) {
        console.error('Proxy session validation failed:', error);
        return requiresAuth ? loginResponse(request) : NextResponse.next();
    }
}

export const config = {
    matcher: ['/login', '/register', '/profile/:path*', '/dashboard/:path*'],
};
