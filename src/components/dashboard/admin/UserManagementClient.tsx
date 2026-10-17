'use client';

import { useState, useTransition } from 'react';
import type { SyntheticEvent } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import {
    banUserAction,
    deleteUserAction,
    setUserPasswordAction,
    unbanUserAction,
} from '@/actions/admin-users';
import {
    ChevronLeft,
    ChevronRight,
    KeyRound,
    Search,
    ShieldBan,
    Trash2,
    Users,
} from 'lucide-react';

export type ListedUser = {
    id: string;
    name: string;
    email: string;
    image: string | null;
    username: string | null;
    role: string;
    wishedRole: string | null;
    emailVerified: boolean;
    banned: boolean;
    createdAt: string;
};

type UserManagementClientProps = {
    users: ListedUser[];
    total: number;
    page: number;
    pageSize: number;
    search: string;
    filter: 'all' | 'role' | 'wished_role';
    filterValue: string;
};

export default function UserManagementClient({
    users,
    total,
    page,
    pageSize,
    search,
    filter,
    filterValue,
}: UserManagementClientProps) {
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();
    const [searchInput, setSearchInput] = useState(search);
    const [passwordUser, setPasswordUser] = useState<ListedUser | null>(null);
    const [newPassword, setNewPassword] = useState('');
    const [isActing, setIsActing] = useState(false);
    const totalPages = Math.max(1, Math.ceil(total / pageSize));

    const navigate = (changes: Record<string, string>) => {
        const params = new URLSearchParams({
            search,
            filter,
            filterValue,
            page: '1',
            ...changes,
        });
        for (const [key, value] of [...params.entries()]) {
            if (!value || (key === 'filter' && value === 'all'))
                params.delete(key);
        }
        startTransition(() =>
            router.replace(`${pathname}${params.size ? `?${params}` : ''}`, {
                scroll: false,
            }),
        );
    };

    const submitSearch = (
        event: SyntheticEvent<HTMLFormElement, SubmitEvent>,
    ) => {
        event.preventDefault();
        navigate({ search: searchInput });
    };

    const runAction = async (
        action: () => Promise<{ ok: boolean; message: string }>,
    ) => {
        setIsActing(true);
        const result = await action();
        if (result.ok) toast.success(result.message);
        else toast.error(result.message);
        setIsActing(false);
        if (result.ok) router.refresh();
    };

    const submitPassword = async (
        event: SyntheticEvent<HTMLFormElement, SubmitEvent>,
    ) => {
        event.preventDefault();
        if (!passwordUser) return;
        await runAction(() =>
            setUserPasswordAction(passwordUser.id, newPassword),
        );
        setNewPassword('');
        setPasswordUser(null);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        User management
                    </h1>
                    <p className="mt-1 text-sm text-muted">
                        Search, filter, and manage registered Farmora users.
                    </p>
                </div>
                <span className="inline-flex w-fit items-center gap-2 rounded-md bg-surface-secondary px-3 py-2 text-sm font-medium">
                    <Users className="size-4" />
                    {total} {total === 1 ? 'user' : 'users'}
                </span>
            </div>

            <div className="rounded-lg border border-border bg-surface p-4">
                <form
                    className="grid gap-3 md:grid-cols-4"
                    onSubmit={submitSearch}>
                    <label className="relative md:col-span-2">
                        <span className="sr-only">Search users</span>
                        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
                        <input
                            type="search"
                            value={searchInput}
                            onChange={(event) =>
                                setSearchInput(event.target.value)
                            }
                            placeholder="Search name, email, or username"
                            className="h-10 w-full rounded-md border border-border bg-field-background py-2 pl-9 pr-3 text-sm outline-none focus:border-focus focus:ring-2 focus:ring-focus/20"
                        />
                    </label>
                    <button
                        type="submit"
                        disabled={isPending}
                        className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-accent px-4 text-sm font-medium text-accent-foreground disabled:opacity-50">
                        <Search className="size-4" />
                        Search
                    </button>
                    <label>
                        <span className="sr-only">Filter users</span>
                        <select
                            value={filter}
                            onChange={(event) =>
                                navigate({
                                    filter: event.target.value,
                                    filterValue: '',
                                })
                            }
                            className="h-10 w-full rounded-md border border-border bg-field-background px-3 text-sm outline-none focus:border-focus focus:ring-2 focus:ring-focus/20">
                            <option value="all">All users</option>
                            <option value="role">Account role</option>
                            <option value="wished_role">Requested role</option>
                        </select>
                    </label>
                    {filter !== 'all' ? (
                        <label className="md:col-span-4">
                            <span className="sr-only">Filter value</span>
                            <select
                                value={filterValue}
                                onChange={(event) =>
                                    navigate({
                                        filterValue: event.target.value,
                                    })
                                }
                                className="h-10 w-full rounded-md border border-border bg-field-background px-3 text-sm outline-none focus:border-focus focus:ring-2 focus:ring-focus/20">
                                <option value="">Select a filter</option>
                                <option value="user">User</option>
                                <option value="farmer">Farmer</option>
                                <option value="buyer">Buyer</option>
                                <option value="admin">Admin</option>
                            </select>
                        </label>
                    ) : null}
                </form>
            </div>

            <div
                className={`overflow-hidden rounded-lg border border-border bg-surface ${isPending ? 'opacity-60' : ''}`}
                aria-busy={isPending}>
                <div className="overflow-x-auto">
                    <table className="w-full min-w-225 text-left text-sm">
                        <thead className="border-b border-border bg-surface-secondary text-xs uppercase tracking-wide text-muted">
                            <tr>
                                <th className="px-5 py-3 font-medium">User</th>
                                <th className="px-5 py-3 font-medium">Role</th>
                                <th className="px-5 py-3 font-medium">
                                    Status
                                </th>
                                <th className="px-5 py-3 font-medium">
                                    Joined
                                </th>
                                <th className="px-5 py-3 font-medium">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {users.map((user) => (
                                <tr
                                    key={user.id}
                                    className="hover:bg-surface-secondary/50">
                                    <td className="px-5 py-4">
                                        <p className="font-medium text-foreground">
                                            {user.name}
                                        </p>
                                        <p className="mt-0.5 text-muted">
                                            {user.email}
                                        </p>
                                        {user.username ? (
                                            <p className="mt-0.5 text-xs text-muted">
                                                @{user.username}
                                            </p>
                                        ) : null}
                                    </td>
                                    <td className="px-5 py-4 capitalize">
                                        {user.role}
                                    </td>
                                    <td className="px-5 py-4">
                                        <span
                                            className={`rounded-full px-2.5 py-1 text-xs font-medium ${user.banned ? 'bg-danger/15 text-danger' : 'bg-success/15 text-success'}`}>
                                            {user.banned ? 'Banned' : 'Active'}
                                        </span>
                                        {!user.emailVerified ? (
                                            <span className="ml-2 text-xs text-warning">
                                                Unverified
                                            </span>
                                        ) : null}
                                    </td>
                                    <td className="px-5 py-4 text-muted">
                                        {new Intl.DateTimeFormat('en', {
                                            dateStyle: 'medium',
                                        }).format(new Date(user.createdAt))}
                                    </td>
                                    <td className="px-5 py-4">
                                        <div className="flex gap-2">
                                            <button
                                                type="button"
                                                disabled={isActing}
                                                onClick={() =>
                                                    runAction(() =>
                                                        user.banned
                                                            ? unbanUserAction(
                                                                  user.id,
                                                              )
                                                            : banUserAction(
                                                                  user.id,
                                                              ),
                                                    )
                                                }
                                                className="rounded-md border border-border p-2 text-muted hover:text-foreground"
                                                title={
                                                    user.banned
                                                        ? 'Unban user'
                                                        : 'Ban user'
                                                }>
                                                {user.banned ? (
                                                    <Users className="size-4" />
                                                ) : (
                                                    <ShieldBan className="size-4" />
                                                )}
                                            </button>
                                            <button
                                                type="button"
                                                disabled={isActing}
                                                onClick={() =>
                                                    setPasswordUser(user)
                                                }
                                                className="rounded-md border border-border p-2 text-muted hover:text-foreground"
                                                title="Set password">
                                                <KeyRound className="size-4" />
                                            </button>
                                            <button
                                                type="button"
                                                disabled={isActing}
                                                onClick={() => {
                                                    if (
                                                        window.confirm(
                                                            `Permanently delete ${user.email}? This cannot be undone.`,
                                                        )
                                                    )
                                                        runAction(() =>
                                                            deleteUserAction(
                                                                user.id,
                                                            ),
                                                        );
                                                }}
                                                className="rounded-md border border-danger/40 p-2 text-danger hover:bg-danger/10"
                                                title="Delete user">
                                                <Trash2 className="size-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {!users.length ? (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="px-5 py-12 text-center text-muted">
                                        No users match the current search and
                                        filters.
                                    </td>
                                </tr>
                            ) : null}
                        </tbody>
                    </table>
                </div>
                <div className="flex items-center justify-between border-t border-border px-4 py-3 text-sm">
                    <p className="text-muted">
                        Page {page} of {totalPages}
                    </p>
                    <div className="flex gap-2">
                        <button
                            type="button"
                            disabled={page <= 1 || isPending}
                            onClick={() => navigate({ page: String(page - 1) })}
                            className="inline-flex items-center gap-1 rounded-md border border-border px-3 py-1.5 disabled:opacity-50">
                            <ChevronLeft className="size-4" />
                            Previous
                        </button>
                        <button
                            type="button"
                            disabled={page >= totalPages || isPending}
                            onClick={() => navigate({ page: String(page + 1) })}
                            className="inline-flex items-center gap-1 rounded-md border border-border px-3 py-1.5 disabled:opacity-50">
                            Next
                            <ChevronRight className="size-4" />
                        </button>
                    </div>
                </div>
            </div>

            {passwordUser ? (
                <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4">
                    <form
                        onSubmit={submitPassword}
                        className="w-full max-w-md rounded-lg bg-surface p-6 shadow-xl">
                        <h2 className="text-lg font-semibold">
                            Set user password
                        </h2>
                        <p className="mt-1 text-sm text-muted">
                            Set a new password for {passwordUser.email}.
                        </p>
                        <label className="mt-4 block text-sm font-medium">
                            New password
                            <input
                                required
                                minLength={8}
                                type="password"
                                value={newPassword}
                                onChange={(event) =>
                                    setNewPassword(event.target.value)
                                }
                                className="mt-2 h-10 w-full rounded-md border border-border bg-field-background px-3"
                            />
                        </label>
                        <div className="mt-6 flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={() => setPasswordUser(null)}
                                className="rounded-md border border-border px-4 py-2 text-sm">
                                Cancel
                            </button>
                            <button
                                disabled={isActing}
                                className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground disabled:opacity-50">
                                Save password
                            </button>
                        </div>
                    </form>
                </div>
            ) : null}
        </div>
    );
}
