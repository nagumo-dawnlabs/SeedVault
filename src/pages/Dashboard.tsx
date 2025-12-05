import React, { useState } from 'react';
import { StatsBanner } from '../components/Dashboard/StatsBanner';
import { PoolStakeCard } from '../components/Dashboard/PoolStakeCard';
import { motion } from 'framer-motion';
import { champions, Champion } from '../data/champions';
import { useStore } from '../store/useStore';
import { CheckCircle } from 'lucide-react';

export const Dashboard: React.FC = () => {
    const [stakeMode, setStakeMode] = useState<'pool' | 'direct'>('pool');
    const [selectedValidator, setSelectedValidator] = useState<Champion>(champions[0]);
    const [directAmount, setDirectAmount] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [success, setSuccess] = useState<{ type: 'pool' | 'direct'; amount: number; target?: string } | null>(null);
    const { balance, stakeToChampion } = useStore();

    const handleDirectStake = () => {
        if (!directAmount) return;
        const val = parseFloat(directAmount);
        if (val > 0 && val <= balance) {
            stakeToChampion(selectedValidator.id, val);
            setDirectAmount('');
            setSuccess({ type: 'direct', amount: val, target: selectedValidator.name });
        }
    };

    return (
        <div className="py-12 space-y-12">
            <section className="relative overflow-hidden rounded-sm border border-colosseum-border bg-black/60 px-6 py-16">
                <div className="absolute inset-0 bg-grid opacity-20" />
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-colosseum-green-dark/30 via-black/10 to-transparent" />

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative max-w-5xl mx-auto text-center"
                >
                    <h1 className="text-6xl md:text-8xl font-bold leading-[0.9] tracking-tighter text-white">
                        STAKE THE FUTURE
                    </h1>
                </motion.div>
            </section>

            <StatsBanner />

            <div className="bg-colosseum-card/40 border border-colosseum-border rounded-sm">
                <div className="flex">
                    {['pool', 'direct'].map((mode) => (
                        <button
                            key={mode}
                            onClick={() => setStakeMode(mode as 'pool' | 'direct')}
                            className={`flex-1 px-6 py-3 text-sm font-semibold uppercase tracking-wide border-b ${stakeMode === mode
                                ? 'text-white border-colosseum-green'
                                : 'text-colosseum-text-muted border-transparent hover:text-white'
                                }`}
                        >
                            {mode === 'pool' ? 'Pool Stake' : 'Direct Stake'}
                        </button>
                    ))}
                </div>

                {stakeMode === 'pool' && (
                    <div className="p-6 space-y-8">
                        <PoolStakeCard onSuccess={(amount) => setSuccess({ type: 'pool', amount })} />
                    </div>
                )}

                {stakeMode === 'direct' && (
                    <div className="p-6 space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="glass-panel p-6 rounded-sm space-y-4">
                                <div>
                                    <p className="text-sm font-semibold text-white">Select Validator</p>
                                </div>
                                <div className="bg-black/50 border border-colosseum-border rounded-sm px-3 py-2 flex items-center gap-2">
                                    <span className="text-colosseum-text-muted text-sm">🔍</span>
                                    <input
                                        type="text"
                                        placeholder="Search validators..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full bg-transparent text-white placeholder:text-colosseum-text-muted outline-none text-sm"
                                    />
                                </div>

                                <div className="bg-colosseum-card/60 border border-colosseum-border rounded-sm overflow-hidden">
                                    <div className="px-4 py-3 text-colosseum-text-muted text-xs uppercase tracking-wide">
                                        Validators
                                    </div>
                                    <div className="max-h-72 overflow-y-auto">
                                        {champions
                                            .filter((champ) => champ.name.toLowerCase().includes(searchTerm.toLowerCase()))
                                            .map((champ) => (
                                                <button
                                                    key={champ.id}
                                                    onClick={() => setSelectedValidator(champ)}
                                                    className={`w-full text-left px-4 py-3 border-b border-colosseum-border/60 transition-all ${
                                                        selectedValidator.id === champ.id
                                                            ? 'bg-colosseum-green-dark/30 text-white border-colosseum-green'
                                                            : 'text-colosseum-text-muted hover:text-white hover:bg-colosseum-border/40'
                                                    }`}
                                                >
                                                    <span className="font-semibold">{champ.name}</span>
                                                </button>
                                            ))}
                                    </div>
                                </div>
                            </div>

                            <div className="glass-panel p-6 rounded-sm space-y-4">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-xs uppercase tracking-[0.2em] text-colosseum-text-muted mb-1">Direct Stake</p>
                                        <h3 className="text-2xl font-bold uppercase tracking-wide text-white">{selectedValidator.name}</h3>
                                        <p className="text-colosseum-text-muted mt-2 max-w-xl">{selectedValidator.description}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-colosseum-text-muted">
                                    <div className="flex items-center space-x-2">
                                        <span className="w-2 h-2 rounded-full bg-colosseum-green" />
                                        <span>{selectedValidator.category} validator</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className="w-2 h-2 rounded-full bg-colosseum-green" />
                                        <span>{selectedValidator.achievements[0] || 'Accelerator candidate'}</span>
                                    </div>
                                </div>

                                <div className="space-y-3 max-w-md">
                                    <label className="block text-sm font-medium text-colosseum-text-muted uppercase tracking-wider">
                                        Amount (SOL)
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            value={directAmount}
                                            onChange={(e) => setDirectAmount(e.target.value)}
                                            placeholder="0.00"
                                            className="w-full bg-black border border-colosseum-border rounded-sm px-4 py-3 text-white focus:outline-none focus:border-colosseum-green focus:ring-1 focus:ring-colosseum-green transition-all"
                                        />
                                        <div className="absolute right-3 top-3 text-sm text-colosseum-text-muted">
                                            Max: {balance.toFixed(2)}
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleDirectStake}
                                        disabled={!directAmount || parseFloat(directAmount) <= 0 || parseFloat(directAmount) > balance}
                                        className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <span>Stake to {selectedValidator.name}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {success && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSuccess(null)} />
                    <div className="relative w-full max-w-md bg-colosseum-card border border-colosseum-border rounded-sm p-6 shadow-2xl text-center space-y-4">
                        <div className="mx-auto w-20 h-20 bg-colosseum-green/20 rounded-full flex items-center justify-center">
                            <CheckCircle size={48} className="text-colosseum-green" />
                        </div>
                        <h3 className="text-2xl font-bold uppercase tracking-wide text-white">Stake Confirmed</h3>
                        <p className="text-colosseum-text-muted">
                            {success.type === 'pool'
                                ? `You staked ${success.amount} SOL to the Pool and minted ${success.amount} coSOL.`
                                : `You staked ${success.amount} SOL to ${success.target} and minted ${success.amount} coSOL.`}
                        </p>
                        <button
                            onClick={() => setSuccess(null)}
                            className="btn-primary w-full"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
