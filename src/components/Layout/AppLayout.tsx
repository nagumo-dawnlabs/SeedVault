import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

interface AppLayoutProps {
    children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
    return (
        <div className="relative min-h-screen flex flex-col bg-colosseum-black text-colosseum-text overflow-hidden">
            <div className="pointer-events-none absolute inset-0 bg-grid opacity-10" />
            <Header />
            <main className="relative z-10 flex-grow pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                {children}
            </main>
            <Footer />
        </div>
    );
};
