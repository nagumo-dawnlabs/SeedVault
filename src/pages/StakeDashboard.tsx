import React from 'react';
import { useStore } from '../store/useStore';
import { champions } from '../data/champions';
import { motion } from 'framer-motion';
import { Shield, Award } from 'lucide-react';

export const StakeDashboard: React.FC = () => {
    const { coSOLBalance, stakedToPool, stakedToChampions, gloryPoints, championPoints } = useStore();

    const championStakes = Object.entries(stakedToChampions || {})
        .filter(([, pos]) => pos.amount > 0)
        .map(([id, pos]) => {
            const champ = champions.find((c) => c.id === id);
            return {
                id,
                amount: pos.amount,
                name: champ?.name || 'Unknown',
                category: champ?.category || 'Validator',
                points: championPoints[id] || 0,
            };
        });

    return (
        <div className="py-12 space-y-8">
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
            >
                <h1 className="text-4xl font-bold text-white">Your Dashboard</h1>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <SummaryCard icon={<Shield size={20} />} label="coSOL Balance" value={`${coSOLBalance.toFixed(2)} coSOL`} />
                <SummaryCard icon={<Award size={20} />} label="Glory Points" value={`${gloryPoints.toFixed(0)} pts`} />
            </div>

            <div className="glass-panel p-6 rounded-sm">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold uppercase tracking-wide text-white">Stake Breakdown</h3>
                    <span className="text-sm text-colosseum-text-muted">Live snapshot</span>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm">
                        <thead className="text-colosseum-text-muted uppercase tracking-wide text-xs">
                            <tr>
                                <th className="py-3 px-4">Type</th>
                                <th className="py-3 px-4">Validator / Pool</th>
                                <th className="py-3 px-4">Category</th>
                                <th className="py-3 px-4 text-right">Amount (SOL)</th>
                                <th className="py-3 px-4 text-right">Points</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-colosseum-border/60">
                            <tr>
                                <td className="py-3 px-4 text-white">Pool</td>
                                <td className="py-3 px-4 text-colosseum-text-muted">Colosseum Winner Pool</td>
                                <td className="py-3 px-4 text-colosseum-text-muted">Auto</td>
                                <td className="py-3 px-4 text-right text-white">{stakedToPool.toFixed(2)}</td>
                                <td className="py-3 px-4 text-right text-colosseum-text-muted">—</td>
                            </tr>
                            {championStakes.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="py-4 px-4 text-colosseum-text-muted">No direct stakes yet.</td>
                                </tr>
                            )}
                            {championStakes.map((stake) => (
                                <tr key={stake.id}>
                                    <td className="py-3 px-4 text-white">Direct</td>
                                    <td className="py-3 px-4 text-white">{stake.name}</td>
                                    <td className="py-3 px-4 text-colosseum-text-muted">{stake.category}</td>
                                    <td className="py-3 px-4 text-right text-white">{stake.amount.toFixed(2)}</td>
                                    <td className="py-3 px-4 text-right text-colosseum-green">{stake.points.toFixed(0)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const SummaryCard: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-4 rounded-sm flex items-center justify-between"
    >
        <div className="space-y-1">
            <p className="text-xs uppercase tracking-wide text-colosseum-text-muted">{label}</p>
            <p className="text-xl font-semibold text-white">{value}</p>
        </div>
        <div className="p-2 rounded-sm bg-colosseum-card border border-colosseum-border text-colosseum-green">
            {icon}
        </div>
    </motion.div>
);

export default StakeDashboard;
