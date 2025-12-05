import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy } from 'lucide-react';
import { Champion } from '../../data/champions';
import { useStore } from '../../store/useStore';

interface DirectStakeModalProps {
    champion: Champion | null;
    isOpen: boolean;
    onClose: () => void;
}

export const DirectStakeModal: React.FC<DirectStakeModalProps> = ({ champion, isOpen, onClose }) => {
    const { balance, stakeToChampion } = useStore();
    const [amount, setAmount] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    if (!isOpen || !champion) return null;

    const handleStake = () => {
        if (!amount) return;
        const val = parseFloat(amount);
        if (val > 0 && val <= balance) {
            stakeToChampion(champion.id, val);
            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
                setAmount('');
                onClose();
            }, 2000);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-md bg-colosseum-card border border-colosseum-border rounded-sm p-6 shadow-2xl z-10"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-colosseum-text-muted hover:text-white"
                        >
                            <X size={24} />
                        </button>

                        {showSuccess ? (
                            <div className="text-center py-8">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="w-20 h-20 bg-colosseum-green/20 rounded-full flex items-center justify-center mx-auto mb-4"
                                >
                                    <Trophy size={40} className="text-colosseum-green" />
                                </motion.div>
                                <h3 className="text-2xl font-bold text-white mb-2 uppercase tracking-wide">Support Confirmed!</h3>
                                <p className="text-colosseum-text-muted">
                                    You staked {amount} SOL to {champion.name}.
                                </p>
                                <div className="mt-4 space-y-1">
                                    <p className="text-colosseum-green font-bold">
                                        +{parseFloat(amount) * 10} Glory Points Earned
                                    </p>
                                    <p className="text-white font-bold">
                                        +{amount} coSOL Received
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="flex items-center space-x-4 mb-6">
                                    <img src={champion.logo} alt={champion.name} className="w-12 h-12 rounded-full bg-colosseum-border" />
                                    <div>
                                        <h3 className="text-xl font-bold uppercase tracking-wide">Support {champion.name}</h3>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-colosseum-text-muted mb-2 uppercase tracking-wider">
                                            Stake Amount (SOL)
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                value={amount}
                                                onChange={(e) => setAmount(e.target.value)}
                                                placeholder="0.00"
                                                className="w-full bg-black border border-colosseum-border rounded-sm px-4 py-3 text-white focus:outline-none focus:border-colosseum-green focus:ring-1 focus:ring-colosseum-green"
                                            />
                                            <div className="absolute right-3 top-3 text-sm text-colosseum-text-muted">
                                                Max: {balance.toFixed(2)}
                                            </div>
                                        </div>
                                    </div>

                                        <button
                                            onClick={handleStake}
                                            disabled={!amount || parseFloat(amount) <= 0 || parseFloat(amount) > balance}
                                            className="w-full btn-primary disabled:opacity-50"
                                        >
                                            Confirm Stake
                                        </button>
                                </div>
                            </>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
