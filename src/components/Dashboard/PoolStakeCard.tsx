import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck } from 'lucide-react';

interface PoolStakeCardProps {
    onSuccess?: (amount: number) => void;
}

export const PoolStakeCard: React.FC<PoolStakeCardProps> = ({ onSuccess }) => {
    const { balance, stakeToPool } = useStore();
    const [amount, setAmount] = useState('');

    const handleStake = () => {
        if (!amount) return;
        const val = parseFloat(amount);
        if (val > 0 && val <= balance) {
            stakeToPool(val);
            setAmount('');
            onSuccess?.(val);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-panel p-8 rounded-sm border-colosseum-green/20 relative overflow-hidden"
        >
            <div className="absolute top-0 right-0 p-4 opacity-10 text-colosseum-green">
                <ShieldCheck size={120} />
            </div>

            <h2 className="text-2xl font-bold mb-2 uppercase tracking-wide">Stake to Pool</h2>
            <p className="text-colosseum-text-muted mb-6 max-w-md">
                Delegate your SOL to the entire Colosseum winner validators.
            </p>

            <div className="space-y-4 max-w-md relative z-10">
                <div>
                    <label className="block text-sm font-medium text-colosseum-text-muted mb-2 uppercase tracking-wider">
                        Amount (SOL)
                    </label>
                    <div className="relative">
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0.00"
                            className="w-full bg-black border border-colosseum-border rounded-sm px-4 py-3 text-white focus:outline-none focus:border-colosseum-green focus:ring-1 focus:ring-colosseum-green transition-all"
                        />
                        <div className="absolute right-3 top-3 text-sm text-colosseum-text-muted">
                            Max: {balance.toFixed(2)}
                        </div>
                    </div>
                </div>

                <button
                    onClick={handleStake}
                    disabled={!amount || parseFloat(amount) <= 0 || parseFloat(amount) > balance}
                    className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <span>Stake Now</span>
                    <ArrowRight size={18} />
                </button>
            </div>
        </motion.div>
    );
};
