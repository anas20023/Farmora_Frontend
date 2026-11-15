import Footer from '@/components/common/Footer';
import Navbar from '@/components/common/Navbar';
import React from 'react';

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-svh flex-col bg-background text-foreground">
            <Navbar />
            {children}
            <Footer />
        </div>
    );
}
