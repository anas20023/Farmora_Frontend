'use client';

/**
 * VerificationClient — "Framed Sheet" admin panel
 * Shows role-requests from farmers AND buyers in two tabs,
 * with a table per tab and inline Approve / Reject actions.
 * Calls: GET /admin/role-requests  ·  PATCH /admin/role-requests/:type/:profileId
 * Calls: PATCH /admin/farmers/:profileId/verification   (farmer-only verification status)
 */

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import {
    CheckCircle2,
    ChevronLeft,
    ChevronRight,
    Clock,
    RefreshCw,
    Search,
    ShieldCheck,
    X,
    XCircle,
} from 'lucide-react';
import {
    adminGetRoleRequests,
    adminReviewRoleRequest,
    adminVerifyFarmer,
    type RoleRequest,
    type RoleRequestType,
    type RoleRequestQueryStatus,
    type VerificationStatus,
} from '@/lib/api/admin';

// ─── local helpers ────────────────────────────────────────────────────────────

const STATUS_LABELS: Record<VerificationStatus, string> = {
    PENDING: 'Pending',
    APPROVED: 'Approved',
    REJECTED: 'Rejected',
};

const STATUS_CLASSES: Record<VerificationStatus, string> = {
    PENDING:  'bg-warning/15 text-warning border border-warning/20',
    APPROVED: 'bg-success/15 text-success border border-success/20',
    REJECTED: 'bg-danger/15 text-danger border border-danger/20',
};

function fmt(iso: string) {
    return new Intl.DateTimeFormat('en', { dateStyle: 'medium' }).format(new Date(iso));
}

// ─── sub-components ───────────────────────────────────────────────────────────

interface ActionDialogProps {
    request: RoleRequest;
    onClose: () => void;
    onDone: () => void;
}

function ActionDialog({ request, onClose, onDone }: ActionDialogProps) {
    const [decision, setDecision] = useState<'APPROVED' | 'REJECTED' | null>(null);
    const [reason, setReason] = useState('');
    const [loading, setLoading] = useState(false);

    async function submit() {
        if (!decision) return;
        setLoading(true);
        try {
            await adminReviewRoleRequest(request.type, request.profileId, {
                status: decision,
                reason: reason.trim() || undefined,
            });

            // For farmer approvals also push the verification status
            if (request.type === 'farmer' && decision === 'APPROVED') {
                await adminVerifyFarmer(request.profileId, { status: 'APPROVED' });
            }

            toast.success(
                `${request.user.name}'s ${request.type} application ${decision === 'APPROVED' ? 'approved' : 'rejected'}.`,
            );
            onDone();
        } catch (err: unknown) {
            toast.error(
                err instanceof Error ? err.message : 'Could not complete the action.',
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4 backdrop-blur-xs">
            <div className="w-full max-w-lg rounded-lg border border-border bg-surface p-6 shadow-xl">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h2 className="text-base font-semibold text-foreground">
                            Review role application
                        </h2>
                        <p className="mt-0.5 text-xs text-muted">
                            {request.user.name} · {request.user.email}
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded p-1 text-muted hover:bg-surface-secondary hover:text-foreground transition-colors"
                        aria-label="Close"
                    >
                        <X className="size-4" />
                    </button>
                </div>

                <div className="mt-4 rounded-md border border-border/50 bg-surface-secondary p-4 text-xs text-muted space-y-1.5">
                    <div><span className="font-medium text-foreground">Type:</span> <span className="capitalize">{request.type}</span></div>
                    {request.phone && <div><span className="font-medium text-foreground">Phone:</span> {request.phone}</div>}
                    {request.bio && <div><span className="font-medium text-foreground">Bio:</span> {request.bio}</div>}
                    <div><span className="font-medium text-foreground">Submitted:</span> {fmt(request.submittedAt)}</div>
                    <div><span className="font-medium text-foreground">Current status:</span>{' '}
                        <span className={`inline-block rounded-full px-2 py-0.5 text-[11px] font-medium ${STATUS_CLASSES[request.status]}`}>
                            {STATUS_LABELS[request.status]}
                        </span>
                    </div>
                </div>

                <div className="mt-4 flex gap-3">
                    <button
                        type="button"
                        onClick={() => setDecision('APPROVED')}
                        className={`flex-1 flex items-center justify-center gap-1.5 rounded-md border py-2 text-xs font-medium transition-colors ${
                            decision === 'APPROVED'
                                ? 'border-success bg-success/15 text-success'
                                : 'border-border bg-surface text-muted hover:bg-surface-secondary hover:text-foreground'
                        }`}
                    >
                        <CheckCircle2 className="size-3.5" />
                        Approve
                    </button>
                    <button
                        type="button"
                        onClick={() => setDecision('REJECTED')}
                        className={`flex-1 flex items-center justify-center gap-1.5 rounded-md border py-2 text-xs font-medium transition-colors ${
                            decision === 'REJECTED'
                                ? 'border-danger bg-danger/15 text-danger'
                                : 'border-border bg-surface text-muted hover:bg-surface-secondary hover:text-foreground'
                        }`}
                    >
                        <XCircle className="size-3.5" />
                        Reject
                    </button>
                </div>

                {decision === 'REJECTED' && (
                    <div className="mt-3">
                        <label className="block text-xs font-medium text-foreground mb-1">
                            Reason <span className="text-muted font-normal">(optional)</span>
                        </label>
                        <textarea
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            rows={3}
                            placeholder="Briefly explain the rejection reason…"
                            className="w-full rounded-md border border-border bg-surface px-3 py-2 text-xs text-foreground placeholder:text-muted/60 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 resize-none"
                        />
                    </div>
                )}

                <div className="mt-5 flex justify-end gap-2">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        className="rounded-md border border-border px-4 py-2 text-xs font-medium text-muted hover:bg-surface-secondary hover:text-foreground disabled:opacity-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={submit}
                        disabled={!decision || loading}
                        className="inline-flex items-center gap-1.5 rounded-md bg-accent px-4 py-2 text-xs font-medium text-accent-foreground hover:bg-accent-hover disabled:opacity-40 transition-colors"
                    >
                        {loading ? <RefreshCw className="size-3.5 animate-spin" /> : <ShieldCheck className="size-3.5" />}
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
}

// ─── main table ───────────────────────────────────────────────────────────────

interface RequestTableProps {
    type: RoleRequestType;
    statusFilter: RoleRequestQueryStatus;
    search: string;
    refreshKey: number;
    onRefresh: () => void;
}

function RequestTable({ type, statusFilter, search, refreshKey, onRefresh }: RequestTableProps) {
    const [rows, setRows]       = useState<RoleRequest[]>([]);
    const [total, setTotal]     = useState(0);
    const [page, setPage]       = useState(1);
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState<RoleRequest | null>(null);

    const PAGE_SIZE = 10;
    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

    useEffect(() => {
        let isMounted = true;
        const fetchRequests = async () => {
            setLoading(true);
            try {
                const data = await adminGetRoleRequests({
                    type,
                    status: statusFilter,
                    page,
                    limit: PAGE_SIZE,
                });
                if (!isMounted) return;

                const rawData = data as unknown as Record<string, unknown>;
                const requestList: RoleRequest[] = Array.isArray(data.requests)
                    ? data.requests
                    : Array.isArray(rawData.data)
                      ? (rawData.data as RoleRequest[])
                      : [];

                const pagination = rawData.pagination as Record<string, unknown> | undefined;
                const totalCount =
                    data.total ??
                    (typeof pagination?.total === 'number' ? pagination.total : requestList.length);

                // client-side search filter
                const q = search.toLowerCase().trim();
                setRows(
                    q
                        ? requestList.filter(
                              (r) =>
                                  r.user?.name?.toLowerCase().includes(q) ||
                                  r.user?.email?.toLowerCase().includes(q) ||
                                  r.phone?.toLowerCase().includes(q),
                          )
                        : requestList,
                );
                setTotal(totalCount);
            } catch (err: unknown) {
                if (isMounted) {
                    toast.error(
                        err instanceof Error ? err.message : 'Failed to load role requests.',
                    );
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        void fetchRequests();

        return () => {
            isMounted = false;
        };
    }, [type, statusFilter, page, search, refreshKey]);

    return (
        <div
            data-ui="true"
            className={`overflow-hidden rounded-lg border border-border bg-surface transition-opacity ${loading ? 'opacity-60' : ''}`}
            aria-busy={loading}
        >
            <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] text-left text-xs sm:text-[13px]">
                    <thead data-ui="true" className="border-b border-border bg-surface-secondary text-xs font-medium text-muted">
                        <tr>
                            <th className="px-5 py-3 font-medium">Applicant</th>
                            <th className="px-5 py-3 font-medium">Profile details</th>
                            <th className="px-5 py-3 font-medium">Submitted</th>
                            <th className="px-5 py-3 font-medium">Status</th>
                            <th className="px-5 py-3 font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody data-ui="true" className="divide-y divide-border">
                        {rows.map((req) => {
                            const p = req.profile as unknown as Record<string, unknown>;
                            return (
                                <tr key={req.profileId} className="hover:bg-surface-secondary/50 transition-colors">
                                    <td className="px-5 py-3">
                                        <p className="font-medium text-foreground">{req.user.name}</p>
                                        <p className="mt-0.5 text-muted">{req.user.email}</p>
                                    </td>
                                    <td className="px-5 py-3 text-muted">
                                        {req.phone ? (
                                            <p className="font-medium text-foreground">{req.phone}</p>
                                        ) : p?.phone ? (
                                            <p className="font-medium text-foreground">{String(p.phone)}</p>
                                        ) : null}
                                        {req.bio ? (
                                            <p className="mt-0.5 text-xs line-clamp-1">{req.bio}</p>
                                        ) : p?.bio ? (
                                            <p className="mt-0.5 text-xs line-clamp-1">{String(p.bio)}</p>
                                        ) : p?.farmName || p?.companyName ? (
                                            <p className="mt-0.5 text-xs text-foreground/80">{String(p.farmName ?? p.companyName)}</p>
                                        ) : !req.phone && !p?.phone ? (
                                            <p className="text-xs italic text-muted/60">—</p>
                                        ) : null}
                                    </td>
                                    <td className="px-5 py-3 text-muted">
                                        {fmt(req.submittedAt)}
                                    </td>
                                    <td className="px-5 py-3">
                                        <span className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-medium ${STATUS_CLASSES[req.status]}`}>
                                            {STATUS_LABELS[req.status]}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3">
                                        <button
                                            type="button"
                                            onClick={() => setSelected(req)}
                                            className="inline-flex items-center gap-1 rounded-md border border-border bg-surface px-3 py-1.5 text-xs font-medium text-muted hover:bg-surface-secondary hover:text-foreground transition-colors"
                                        >
                                            <ShieldCheck className="size-3.5" />
                                            Review
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}

                        {!loading && rows.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-5 py-12 text-center text-muted">
                                    No {type} applications match the current filters.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div data-ui="true" className="flex items-center justify-between border-t border-border px-4 py-3 text-xs text-muted">
                <p>Page {page} of {totalPages} · {total} total</p>
                <div className="flex gap-2">
                    <button
                        type="button"
                        disabled={page <= 1 || loading}
                        onClick={() => setPage((p) => p - 1)}
                        className="inline-flex items-center gap-1 rounded-md border border-border bg-surface px-3 py-1.5 text-foreground hover:bg-surface-secondary disabled:opacity-40 transition-colors"
                    >
                        <ChevronLeft className="size-3.5" />
                        Previous
                    </button>
                    <button
                        type="button"
                        disabled={page >= totalPages || loading}
                        onClick={() => setPage((p) => p + 1)}
                        className="inline-flex items-center gap-1 rounded-md border border-border bg-surface px-3 py-1.5 text-foreground hover:bg-surface-secondary disabled:opacity-40 transition-colors"
                    >
                        Next
                        <ChevronRight className="size-3.5" />
                    </button>
                </div>
            </div>

            {selected && (
                <ActionDialog
                    request={selected}
                    onClose={() => setSelected(null)}
                    onDone={() => { setSelected(null); onRefresh(); }}
                />
            )}
        </div>
    );
}

// ─── root export ──────────────────────────────────────────────────────────────

type Tab = RoleRequestType;
type StatusFilter = RoleRequestQueryStatus;

export default function VerificationClient() {
    const [tab, setTab]                   = useState<Tab>('farmer');
    const [statusFilter, setStatusFilter] = useState<StatusFilter>('ALL');
    const [search, setSearch]             = useState('');
    const [searchInput, setSearchInput]   = useState('');
    const [refreshKey, setRefreshKey]     = useState(0);

    function refresh() { setRefreshKey((k) => k + 1); }

    const TABS: { id: Tab; label: string }[] = [
        { id: 'farmer', label: 'Farmer applications' },
        { id: 'buyer',  label: 'Buyer applications'  },
    ];

    const STATUS_OPTIONS: { value: StatusFilter; label: string }[] = [
        { value: 'ALL',      label: 'All statuses'  },
        { value: 'PENDING',  label: 'Pending'        },
        { value: 'APPROVED', label: 'Approved'       },
        { value: 'REJECTED', label: 'Rejected'       },
    ];

    return (
        <div className="space-y-6">
            {/* Title row */}
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                        Verification queue
                    </h1>
                    <p className="mt-1 text-sm text-muted">
                        Review and approve farmer and buyer role applications.
                    </p>
                </div>
                <button
                    type="button"
                    onClick={refresh}
                    className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-4 py-2 text-sm font-medium text-muted hover:bg-surface-secondary hover:text-foreground transition-colors"
                >
                    <RefreshCw className="size-3.5" />
                    Refresh
                </button>
            </div>

            {/* Tab strip + toolbar */}
            <div>
                {/* Tabs */}
                <div className="flex border-b border-border">
                    {TABS.map(({ id, label }) => (
                        <button
                            key={id}
                            type="button"
                            onClick={() => setTab(id)}
                            className={`px-5 py-2.5 text-sm font-medium transition-colors relative ${
                                tab === id
                                    ? 'text-foreground after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-accent'
                                    : 'text-muted hover:text-foreground'
                            }`}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                {/* Filter bar */}
                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
                    {/* Search */}
                    <form
                        className="relative flex-1 max-w-xs"
                        onSubmit={(e) => { e.preventDefault(); setSearch(searchInput); setRefreshKey((k) => k + 1); }}
                    >
                        <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted" />
                        <input
                            type="search"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            placeholder="Search name or email…"
                            className="h-9 w-full rounded-md border border-border bg-surface pl-8 pr-3 text-sm text-foreground placeholder:text-muted/60 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
                        />
                    </form>

                    {/* Status select */}
                    <select
                        value={statusFilter}
                        onChange={(e) => { setStatusFilter(e.target.value as StatusFilter); setRefreshKey((k) => k + 1); }}
                        className="h-9 rounded-md border border-border bg-surface px-3 text-sm text-foreground outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
                    >
                        {STATUS_OPTIONS.map(({ value, label }) => (
                            <option key={value} value={value} className="bg-surface text-foreground">{label}</option>
                        ))}
                    </select>

                    {/* Status legend */}
                    <div className="ml-auto hidden sm:flex items-center gap-3 text-xs">
                        {(['PENDING','APPROVED','REJECTED'] as VerificationStatus[]).map((s) => (
                            <span key={s} className={`inline-block rounded-full px-2.5 py-0.5 font-medium ${STATUS_CLASSES[s]}`}>
                                {STATUS_LABELS[s]}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Table */}
            <RequestTable
                type={tab}
                statusFilter={statusFilter}
                search={search}
                refreshKey={refreshKey}
                onRefresh={refresh}
            />

            {/* Quick stats strip */}
            <div className="flex items-center gap-6 text-xs text-muted">
                <span className="flex items-center gap-1"><Clock className="size-3.5" />Pending items require admin review</span>
                <span className="flex items-center gap-1"><CheckCircle2 className="size-3.5 text-success" />Approval triggers automatic role upgrade</span>
            </div>
        </div>
    );
}
