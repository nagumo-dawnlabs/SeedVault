import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-colosseum-black border-t border-colosseum-border py-8 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <span className="text-lg font-bold text-colosseum-text">SeedVault</span>
                        <span className="text-colosseum-text-muted ml-2 text-sm">Backed by Colosseum</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};
