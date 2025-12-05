import React from 'react';
import { TrendingUp, Lock } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { motion } from 'framer-motion';

export const StatsBanner: React.FC = () => {
    const { totalStaked } = useStore();

    const stats = [
        {
            label: 'Total Value Locked',
            value: `${totalStaked.toLocaleString()} SOL`,
            icon: Lock,
            color: 'text-colosseum-green',
        },
        {
            label: 'Current APY',
            value: '7.5%',
            icon: TrendingUp,
            color: 'text-white',
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {stats.map((stat, index) => (
                <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-panel p-6 rounded-sm flex items-center justify-between group hover:border-colosseum-green/50 transition-colors"
                >
                    <div>
                        <p className="text-colosseum-text-muted text-sm font-medium mb-1 uppercase tracking-wider">{stat.label}</p>
                        <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-sm bg-colosseum-card border border-colosseum-border group-hover:border-colosseum-green/30 transition-colors`}>
                        <stat.icon size={24} className={stat.color} />
                    </div>
                </motion.div>
            ))}
        </div>
    );
};
