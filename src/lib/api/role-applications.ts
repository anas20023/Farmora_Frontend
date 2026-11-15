import { apiRequest } from './client';

export type ApplicableRole = 'farmer' | 'buyer';
export type RoleApplicationStatus =
    | 'NONE'
    | 'PENDING'
    | 'APPROVED'
    | 'REJECTED'
    | string;

export interface RoleApplicationInput {
    wished_role: ApplicableRole;
    phone: string;
    bio?: string | null;
}

export interface RoleApplicationDetails {
    verificationStatus?: RoleApplicationStatus;
    phone?: string;
    bio?: string | null;
    [key: string]: unknown;
}

export interface RoleApplicationResponse {
    currentRole: string;
    wishedRole?: ApplicableRole | null;
    applicationStatus: RoleApplicationStatus;
    profileDetails: RoleApplicationDetails | null;
}

export function submitRoleApplication(input: RoleApplicationInput) {
    return apiRequest<RoleApplicationResponse>('/users/apply-role', {
        method: 'POST',
        body: JSON.stringify(input),
    });
}

export function getRoleApplicationStatus() {
    return apiRequest<RoleApplicationResponse>('/users/role-application');
}
