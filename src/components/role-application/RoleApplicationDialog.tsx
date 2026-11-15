'use client';

import { FormEvent, useState } from 'react';
import { ShoppingBag, Tractor, X } from 'lucide-react';
import toast from 'react-hot-toast';
import {
    type ApplicableRole,
    type RoleApplicationResponse,
    submitRoleApplication,
} from '@/lib/api/role-applications';

interface RoleApplicationDialogProps {
    isOpen: boolean;
    role?: ApplicableRole | null;
    canSelectRole?: boolean;
    onClose: () => void;
    onSubmitted?: (application: RoleApplicationResponse) => void;
}

export default function RoleApplicationDialog({
    isOpen,
    role,
    canSelectRole,
    onClose,
    onSubmitted,
}: RoleApplicationDialogProps) {
    const [selectedRoleOverride, setSelectedRoleOverride] = useState<ApplicableRole | null>(null);
    const [phone, setPhone] = useState('');
    const [bio, setBio] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const selectedRole: ApplicableRole = selectedRoleOverride ?? role ?? 'farmer';
    const showRoleSelector = canSelectRole ?? !role;
    const roleLabel = `${selectedRole.charAt(0).toUpperCase()}${selectedRole.slice(1)}`;

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);

        try {
            const application = await submitRoleApplication({
                wished_role: selectedRole,
                phone: phone.trim(),
                bio: bio.trim() || null,
            });
            toast.success(`Your ${roleLabel} verification application was submitted.`);
            onSubmitted?.(application);
            onClose();
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : 'Unable to submit your application.',
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs"
            role="presentation"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget && !isSubmitting) onClose();
            }}>
            <section
                role="dialog"
                aria-modal="true"
                aria-labelledby="role-application-title"
                className="w-full max-w-lg rounded-lg border border-border bg-surface p-6 text-foreground shadow-xl">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                            Role verification
                        </p>
                        <h2 id="role-application-title" className="mt-1 text-xl font-semibold text-foreground">
                            Become a verified {roleLabel}
                        </h2>
                        <p className="mt-2 text-sm leading-6 text-muted">
                            {selectedRole === 'farmer'
                                ? 'Add your contact details so the Farmora team can review your farmer profile and verify your farm.'
                                : 'Add your contact details so the Farmora team can review your buyer profile and enable wholesale purchasing.'}
                        </p>
                    </div>
                    <button
                        type="button"
                        aria-label="Close verification application"
                        onClick={onClose}
                        disabled={isSubmitting}
                        className="rounded p-1 text-muted hover:bg-surface-secondary hover:text-foreground disabled:cursor-not-allowed transition-colors">
                        <X className="size-5" />
                    </button>
                </div>

                <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                    {showRoleSelector && (
                        <div className="space-y-1.5">
                            <span className="block text-sm font-medium text-foreground">
                                Select role to apply for
                            </span>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={() => setSelectedRoleOverride('farmer')}
                                    className={`flex items-center justify-center gap-2 rounded-md border p-3 text-sm font-medium transition-colors cursor-pointer ${
                                        selectedRole === 'farmer'
                                            ? 'border-accent bg-accent/15 text-accent font-semibold ring-1 ring-accent'
                                            : 'border-border bg-background text-muted hover:border-accent/40 hover:text-foreground'
                                    }`}>
                                    <Tractor className="size-4" />
                                    <span>Farmer</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setSelectedRoleOverride('buyer')}
                                    className={`flex items-center justify-center gap-2 rounded-md border p-3 text-sm font-medium transition-colors cursor-pointer ${
                                        selectedRole === 'buyer'
                                            ? 'border-accent bg-accent/15 text-accent font-semibold ring-1 ring-accent'
                                            : 'border-border bg-background text-muted hover:border-accent/40 hover:text-foreground'
                                    }`}>
                                    <ShoppingBag className="size-4" />
                                    <span>Buyer</span>
                                </button>
                            </div>
                        </div>
                    )}

                    <label className="block text-sm font-medium text-foreground">
                        Phone number
                        <input
                            type="tel"
                            value={phone}
                            onChange={(event) => setPhone(event.target.value)}
                            required
                            autoComplete="tel"
                            placeholder="+880 1XXX-XXXXXX"
                            className="mt-1.5 w-full rounded border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none placeholder:text-muted focus:border-accent focus:ring-2 focus:ring-accent/20"
                        />
                    </label>

                    <label className="block text-sm font-medium text-foreground">
                        Brief bio <span className="font-normal text-muted">(optional)</span>
                        <textarea
                            value={bio}
                            onChange={(event) => setBio(event.target.value)}
                            rows={4}
                            maxLength={500}
                            placeholder={
                                selectedRole === 'farmer'
                                    ? 'Tell us about your farm location, crops, or farming experience.'
                                    : 'Tell us about your organization or purchasing requirements.'
                            }
                            className="mt-1.5 w-full resize-y rounded border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none placeholder:text-muted focus:border-accent focus:ring-2 focus:ring-accent/20"
                        />
                    </label>

                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isSubmitting}
                            className="rounded px-4 py-2 text-sm font-semibold text-muted hover:bg-surface-secondary hover:text-foreground disabled:cursor-not-allowed transition-colors">
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="rounded bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60">
                            {isSubmitting ? 'Submitting…' : `Submit as ${roleLabel}`}
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
}
