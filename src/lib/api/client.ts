import { authClient } from '@/lib/auth-client';

export class ApiError extends Error {
    readonly status: number;
    readonly details?: unknown;

    constructor(message: string, status: number, details?: unknown) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.details = details;
    }
}

const apiBaseUrl =process.env.NEXT_PUBLIC_API_BASE_URL|| "http://localhost:5000/api/v1"

function messageFromPayload(payload: unknown): string | undefined {
    if (!payload || typeof payload !== 'object') return undefined;
    const value = payload as Record<string, unknown>;
    return typeof value.message === 'string'
        ? value.message
        : typeof value.error === 'string'
          ? value.error
          : undefined;
}

async function getJwtAuthorizationHeader(): Promise<string | null> {
    // API requests in this app originate in Client Components. On the server,
    // there is no browser session cookie available for Better Auth to exchange.
    if (typeof window === 'undefined') return null;

    const { data, error } = await authClient.token();
    if (error || !data?.token) {
        throw new ApiError(
            error?.message ?? 'Your session has expired. Please sign in again.',
            401,
        );
    }

    return `Bearer ${data.token}`;
}

/** Shared JSON client for Farmora's public API. */
export async function apiRequest<T>(
    path: string,
    init: RequestInit = {},
): Promise<T> {
    const headers = new Headers(init.headers);
    headers.set('Accept', 'application/json');

    if (init.body && !headers.has('Content-Type')) {
        headers.set('Content-Type', 'application/json');
    }

    if (!headers.has('Authorization')) {
        const authorization = await getJwtAuthorizationHeader();
        if (authorization) headers.set('Authorization', authorization);
    }

    const response = await fetch(`${apiBaseUrl}/${path.replace(/^\//, '')}`, {
        ...init,
        headers,
        credentials: 'include',
    });

    const contentType = response.headers.get('content-type') ?? '';
    const payload: unknown = contentType.includes('application/json')
        ? await response.json()
        : await response.text();

    if (!response.ok) {
        throw new ApiError(
            messageFromPayload(payload) ?? 'The request could not be completed.',
            response.status,
            payload,
        );
    }

    return payload as T;
}
