'use client';

import { useCallback, useEffect, useState } from 'react';
import { CheckCircle2, Clock3, RefreshCw, ShieldAlert } from 'lucide-react';
import {
    type RoleApplicationResponse,
    getRoleApplicationStatus,
} from '@/lib/api/role-applications';

export function useRoleApplicationStatus(enabled = true) {
    const [application, setApplication] = useState<RoleApplicationResponse | null>(null);
    const [isLoading, setIsLoading] = useState(enabled);
    const [error, setError] = useState<string | null>(null);

    const refresh = useCallback(async () => {
        if (!enabled) return;
        setIsLoading(true);
        try {
            const nextApplication = await getRoleApplicationStatus();
            setApplication(nextApplication);
            setError(null);
        } catch (requestError) {
            setError(requestError instanceof Error ? requestError.message : 'Unable to load verification status.');
        } finally {
            setIsLoading(false);
        }
    }, [enabled]);

    useEffect(() => {
        const timeoutId = window.setTimeout(() => void refresh(), 0);
        const intervalId = window.setInterval(() => void refresh(), 30_000);
        return () => {
            window.clearTimeout(timeoutId);
            window.clearInterval(intervalId);
        };
    }, [refresh]);

    return { application, isLoading, error, refresh, setApplication };
}

const statusAppearance = {
    APPROVED: { label: 'Approved', Icon: CheckCircle2, className: 'text-success' },
    PENDING: { label: 'Under review', Icon: Clock3, className: 'text-warning' },
    REJECTED: { label: 'Needs attention', Icon: ShieldAlert, className: 'text-danger' },
    NONE: { label: 'Not started', Icon: ShieldAlert, className: 'text-muted' },
} as const;

interface RoleApplicationStatusProps {
    application: RoleApplicationResponse | null;
    isLoading?: boolean;
    error?: string | null;
    onRefresh?: () => void;
}

export function RoleApplicationStatus({ application, isLoading, error, onRefresh }: RoleApplicationStatusProps) {
    const status = application?.applicationStatus?.toUpperCase() ?? 'NONE';
    const appearance = statusAppearance[status as keyof typeof statusAppearance] ?? {
        label: status.toLowerCase().replace(/^./, (letter) => letter.toUpperCase()),
        Icon: Clock3,
        className: 'text-muted',
    };
    const Icon = appearance.Icon;

    return (
        <div className="rounded-md border border-border/60 bg-surface-secondary/40 p-3">
            <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                    <Icon className={`size-4 ${appearance.className}`} />
                    <div>
                        <p className="text-xs text-muted">Role application</p>
                        <p className={`text-sm font-semibold ${appearance.className}`}>
                            {isLoading ? 'Checking status…' : appearance.label}
                        </p>
                    </div>
                </div>
                {onRefresh && (
                    <button type="button" onClick={onRefresh} disabled={isLoading} aria-label="Refresh application status" className="rounded p-1 text-muted hover:bg-surface hover:text-foreground disabled:opacity-50">
                        <RefreshCw className={`size-4 ${isLoading ? 'animate-spin' : ''}`} />
                    </button>
                )}
            </div>
            {application?.wishedRole && (
                <p className="mt-2 text-xs text-muted">
                    Applying as a <span className="font-medium capitalize text-foreground">{application.wishedRole}</span>.
                </p>
            )}
            {error && <p className="mt-2 text-xs text-danger">{error}</p>}
        </div>
    );
}
