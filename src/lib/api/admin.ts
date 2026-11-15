/**
 * Farmora Admin API client
 * Base: process.env.NEXT_PUBLIC_API_BASE_URL/api/v1/admin
 *
 * Covers every route exposed by the backend admin router:
 *   GET    /admin/users
 *   GET    /admin/role-requests
 *   PATCH  /admin/role-requests/:type/:profileId
 *   PATCH  /admin/users/:userId/role
 *   POST   /admin/users/:userId/ban
 *   PATCH  /admin/farmers/:profileId/verification
 */

import { apiRequest } from './client';

// ─── Shared enumerations ─────────────────────────────────────────────────────

export type SystemRole = 'user' | 'farmer' | 'buyer' | 'admin';
export type VerificationStatus = 'PENDING' | 'APPROVED' | 'REJECTED';
export type RoleRequestType = 'farmer' | 'buyer';
export type RoleRequestQueryStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'ALL';

// ─── GET /admin/users ────────────────────────────────────────────────────────

export interface AdminUser {
    id: string;
    name: string;
    email: string;
    image: string | null;
    username: string | null;
    role: SystemRole;
    wished_role: SystemRole | null;
    emailVerified: boolean;
    banned: boolean;
    bannedReason: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface GetUsersParams {
    page?: number;
    limit?: number;
    search?: string;
}

export interface GetUsersResponse {
    users: AdminUser[];
    total: number;
    page: number;
    limit: number;
}

export function adminGetUsers(params?: GetUsersParams): Promise<GetUsersResponse> {
    const qs = new URLSearchParams();
    if (params?.page)   qs.set('page',   String(params.page));
    if (params?.limit)  qs.set('limit',  String(params.limit));
    if (params?.search) qs.set('search', params.search);
    const query = qs.toString();
    return apiRequest<GetUsersResponse>(`/admin/users${query ? `?${query}` : ''}`);
}

// ─── GET /admin/role-requests ────────────────────────────────────────────────

export interface FarmerProfile {
    id: string;
    farmName: string | null;
    location: string | null;
    phone: string | null;
    bio: string | null;
    verificationStatus: VerificationStatus;
    createdAt: string;
}

export interface BuyerProfile {
    id: string;
    companyName: string | null;
    phone: string | null;
    bio: string | null;
    verificationStatus: VerificationStatus;
    createdAt: string;
}

export interface RoleRequest {
    profileId: string;
    type: RoleRequestType;
    status: VerificationStatus;
    verificationStatus?: VerificationStatus;
    phone?: string | null;
    bio?: string | null;
    user: {
        id: string;
        name: string;
        email: string;
        image: string | null;
    };
    profile?: FarmerProfile | BuyerProfile;
    submittedAt: string;
    createdAt?: string;
}

export interface GetRoleRequestsParams {
    type?: RoleRequestType | 'all' | 'user';
    status?: RoleRequestQueryStatus;
    page?: number;
    limit?: number;
}

export interface GetRoleRequestsResponse {
    requests: RoleRequest[];
    total: number;
    page: number;
    limit: number;
}

interface BackendRoleRequestsEnvelope {
    success: boolean;
    data: Array<{
        type: RoleRequestType;
        profileId: string;
        userId: string;
        phone: string | null;
        bio: string | null;
        verificationStatus: VerificationStatus;
        verifiedAt: string | null;
        createdAt: string;
        updatedAt: string;
        user: {
            id: string;
            name: string;
            email: string;
            image?: string | null;
            role?: string | null;
            wished_role?: string | null;
            createdAt?: string;
        };
    }>;
    pagination?: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

export async function adminGetRoleRequests(
    params?: GetRoleRequestsParams,
): Promise<GetRoleRequestsResponse> {
    const qs = new URLSearchParams();
    if (params?.type)   qs.set('type',   params.type);
    if (params?.status) qs.set('status', params.status);
    if (params?.page)   qs.set('page',   String(params.page));
    if (params?.limit)  qs.set('limit',  String(params.limit));
    const query = qs.toString();

    const raw = await apiRequest<BackendRoleRequestsEnvelope | GetRoleRequestsResponse>(
        `/admin/role-requests${query ? `?${query}` : ''}`,
    );

    // Normalize backend response { success: true, data: [...], pagination: { total, ... } }
    if ('data' in raw && Array.isArray(raw.data)) {
        const requests: RoleRequest[] = raw.data.map((item) => ({
            profileId: item.profileId,
            type: item.type,
            status: item.verificationStatus,
            verificationStatus: item.verificationStatus,
            phone: item.phone,
            bio: item.bio,
            submittedAt: item.createdAt,
            createdAt: item.createdAt,
            user: {
                id: item.user.id,
                name: item.user.name,
                email: item.user.email,
                image: item.user.image ?? null,
            },
            profile: {
                id: item.profileId,
                farmName: null,
                location: null,
                companyName: null,
                phone: item.phone,
                bio: item.bio,
                verificationStatus: item.verificationStatus,
                createdAt: item.createdAt,
            },
        }));

        return {
            requests,
            total: raw.pagination?.total ?? requests.length,
            page: raw.pagination?.page ?? (params?.page || 1),
            limit: raw.pagination?.limit ?? (params?.limit || 10),
        };
    }

    return raw as GetRoleRequestsResponse;
}

// ─── PATCH /admin/role-requests/:type/:profileId ─────────────────────────────

export interface ReviewRoleRequestBody {
    status?: 'APPROVED' | 'REJECTED';
    action?: 'APPROVE' | 'REJECT';
    reason?: string;
    rejectionReason?: string;
}

export interface ReviewRoleRequestResponse {
    message: string;
    profileId?: string;
    status?: VerificationStatus;
    data?: unknown;
}

export function adminReviewRoleRequest(
    type: RoleRequestType,
    profileId: string,
    body: ReviewRoleRequestBody,
): Promise<ReviewRoleRequestResponse> {
    const action = body.action || (body.status === 'APPROVED' ? 'APPROVE' : 'REJECT');
    const rejectionReason = body.rejectionReason || body.reason;

    return apiRequest<ReviewRoleRequestResponse>(
        `/admin/role-requests/${type}/${profileId}`,
        {
            method: 'PATCH',
            body: JSON.stringify({
                action,
                status: body.status || (action === 'APPROVE' ? 'APPROVED' : 'REJECTED'),
                rejectionReason,
                reason: rejectionReason,
            }),
        },
    );
}

// ─── PATCH /admin/users/:userId/role ────────────────────────────────────────

export interface UpdateUserRoleBody {
    role: SystemRole;
}

export interface UpdateUserRoleResponse {
    message: string;
    userId: string;
    role: SystemRole;
}

export function adminUpdateUserRole(
    userId: string,
    body: UpdateUserRoleBody,
): Promise<UpdateUserRoleResponse> {
    return apiRequest<UpdateUserRoleResponse>(`/admin/users/${userId}/role`, {
        method: 'PATCH',
        body: JSON.stringify(body),
    });
}

// ─── POST /admin/users/:userId/ban ──────────────────────────────────────────

export interface BanUserBody {
    banned: boolean;
    reason?: string;
}

export interface BanUserResponse {
    message: string;
    userId: string;
    banned: boolean;
}

export function adminBanUser(
    userId: string,
    body: BanUserBody,
): Promise<BanUserResponse> {
    return apiRequest<BanUserResponse>(`/admin/users/${userId}/ban`, {
        method: 'POST',
        body: JSON.stringify(body),
    });
}

// ─── PATCH /admin/farmers/:profileId/verification ───────────────────────────

export interface VerifyFarmerBody {
    status: VerificationStatus;
}

export interface VerifyFarmerResponse {
    message: string;
    profileId: string;
    status: VerificationStatus;
}

export function adminVerifyFarmer(
    profileId: string,
    body: VerifyFarmerBody,
): Promise<VerifyFarmerResponse> {
    return apiRequest<VerifyFarmerResponse>(
        `/admin/farmers/${profileId}/verification`,
        { method: 'PATCH', body: JSON.stringify(body) },
    );
}

