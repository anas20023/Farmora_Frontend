import VerificationClient from '@/components/dashboard/admin/VerificationClient';

export const metadata = {
    title: 'Verification queue | Farmora Admin',
    description: 'Review and action farmer and buyer role applications.',
};

export default function VerificationRequestsPage() {
    return <VerificationClient />;
}
