import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Wallet, Menu, X } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';

export const Header: React.FC = () => {
    const { walletAddress, balance, coSOLBalance } = useStore();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    const navItems = [
        { name: 'Top', path: '/' },
        { name: 'Projects', path: '/champions' },
        { name: 'Dashboard', path: '/dashboard' },
    ];

    const isActive = (path: string) => location.pathname === path;

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-colosseum-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-3 group">
                        {/* Simple Icon representing the column/pillar from the logo */}
                        <div className="flex space-x-1">
                            <div className="w-1.5 h-6 bg-white rounded-sm"></div>
                            <div className="w-1.5 h-6 bg-white rounded-sm"></div>
                            <div className="w-1.5 h-6 bg-white rounded-sm"></div>
                        </div>
                        <span className="text-xl font-bold tracking-widest text-white uppercase">SeedVault</span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex space-x-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`text-sm font-medium transition-colors duration-200 uppercase tracking-wide ${isActive(item.path)
                                    ? 'text-white'
                                    : 'text-colosseum-text-muted hover:text-white'
                                    }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Wallet Actions */}
                    <div className="hidden md:flex items-center space-x-4">
                        <div className="flex items-center space-x-4 bg-colosseum-card border border-colosseum-border rounded-sm px-4 py-2">
                            <span className="text-sm text-colosseum-green font-mono">
                                {balance.toFixed(2)} SOL
                            </span>
                            <div className="h-4 w-px bg-colosseum-border" />
                            <div className="flex items-center space-x-2 text-sm text-colosseum-text-muted">
                                <Wallet size={16} />
                                <span className="font-mono">{walletAddress}</span>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-white hover:text-colosseum-green"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-black border-b border-colosseum-border overflow-hidden"
                    >
                        <div className="px-4 pt-2 pb-4 space-y-2">
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`block px-3 py-2 rounded-sm text-base font-medium uppercase tracking-wide ${isActive(item.path)
                                        ? 'bg-colosseum-green-dark/30 text-colosseum-green'
                                        : 'text-colosseum-text-muted hover:text-white'
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <div className="pt-4 border-t border-colosseum-border">
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center px-3">
                                        <div className="text-colosseum-text-muted text-sm">
                                            Balance: <span className="text-white">{balance.toFixed(2)} SOL</span>
                                        </div>
                                        <div className="text-colosseum-text-muted text-sm">
                                            coSOL: <span className="text-colosseum-green">{coSOLBalance.toFixed(2)}</span>
                                        </div>
                                    </div>
                                    <div className="px-3 py-2 text-colosseum-text-muted text-sm">
                                        <span className="font-mono text-white">{walletAddress}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};
