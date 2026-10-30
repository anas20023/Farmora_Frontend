'use client';

import { FormEvent, useState } from 'react';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';
import {
    type ApplicableRole,
    type RoleApplicationResponse,
    submitRoleApplication,
} from '@/lib/api/role-applications';

interface RoleApplicationDialogProps {
    isOpen: boolean;
    role: ApplicableRole;
    onClose: () => void;
    onSubmitted?: (application: RoleApplicationResponse) => void;
}

export default function RoleApplicationDialog({
    isOpen,
    role,
    onClose,
    onSubmitted,
}: RoleApplicationDialogProps) {
    const [phone, setPhone] = useState('');
    const [bio, setBio] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const roleLabel = `${role.charAt(0).toUpperCase()}${role.slice(1)}`;

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);

        try {
            const application = await submitRoleApplication({
                wished_role: role,
                phone: phone.trim(),
                bio: bio.trim() || null,
            });
            toast.success('Your verification application was submitted.');
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
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/55 p-4"
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
                        <h2 id="role-application-title" className="mt-1 text-xl font-semibold">
                            Become a verified {roleLabel}
                        </h2>
                        <p className="mt-2 text-sm leading-6 text-muted">
                            Add your contact details so the Farmora team can review your {roleLabel.toLowerCase()} profile.
                        </p>
                    </div>
                    <button
                        type="button"
                        aria-label="Close verification application"
                        onClick={onClose}
                        disabled={isSubmitting}
                        className="rounded p-1 text-muted hover:bg-surface-secondary hover:text-foreground disabled:cursor-not-allowed">
                        <X className="size-5" />
                    </button>
                </div>

                <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                    <label className="block text-sm font-medium">
                        Phone number
                        <input
                            type="tel"
                            value={phone}
                            onChange={(event) => setPhone(event.target.value)}
                            required
                            autoComplete="tel"
                            placeholder="+880 1XXX-XXXXXX"
                            className="mt-1.5 w-full rounded border border-border bg-background px-3 py-2.5 text-sm outline-none placeholder:text-muted focus:border-accent focus:ring-2 focus:ring-accent/20"
                        />
                    </label>
                    <label className="block text-sm font-medium">
                        Brief bio <span className="font-normal text-muted">(optional)</span>
                        <textarea
                            value={bio}
                            onChange={(event) => setBio(event.target.value)}
                            rows={4}
                            maxLength={500}
                            placeholder="Tell us a little about your farm or buying activity."
                            className="mt-1.5 w-full resize-y rounded border border-border bg-background px-3 py-2.5 text-sm outline-none placeholder:text-muted focus:border-accent focus:ring-2 focus:ring-accent/20"
                        />
                    </label>
                    <div className="flex justify-end gap-3 pt-2">
                        <button type="button" onClick={onClose} disabled={isSubmitting} className="rounded px-4 py-2 text-sm font-semibold text-muted hover:bg-surface-secondary hover:text-foreground disabled:cursor-not-allowed">
                            Cancel
                        </button>
                        <button type="submit" disabled={isSubmitting} className="rounded bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60">
                            {isSubmitting ? 'Submitting…' : 'Submit application'}
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
}
