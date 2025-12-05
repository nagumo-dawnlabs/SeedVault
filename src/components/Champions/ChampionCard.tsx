import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Tag } from 'lucide-react';
import { Champion } from '../../data/champions';

interface ChampionCardProps {
    champion: Champion;
    onStake: (champion: Champion) => void;
}

export const ChampionCard: React.FC<ChampionCardProps> = ({ champion, onStake }) => {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="glass-panel p-6 rounded-sm flex flex-col h-full group hover:border-colosseum-green/50 transition-colors"
        >
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <img src={champion.logo} alt={champion.name} className="w-12 h-12 rounded-full bg-colosseum-border" />
                    <div>
                        <h3 className="text-lg font-bold group-hover:text-colosseum-green transition-colors uppercase tracking-wide">{champion.name}</h3>
                        <span className="text-xs px-2 py-0.5 rounded-sm bg-colosseum-border text-colosseum-text-muted uppercase">
                            {champion.category}
                        </span>
                    </div>
                </div>
            </div>

            <p className="text-sm text-colosseum-text-muted mb-4 flex-grow">
                {champion.description}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                <div className="flex items-center space-x-2 text-colosseum-text-muted">
                    <Tag size={16} />
                    <span>{champion.tags.slice(0, 2).join(' • ') || champion.category}</span>
                </div>
                <div className="flex items-center space-x-2 text-colosseum-text-muted">
                    <Trophy size={16} />
                    <span>{champion.achievements.length > 0 ? 'Winner' : 'Candidate'}</span>
                </div>
            </div>

            <button
                onClick={() => onStake(champion)}
                className="w-full mt-auto btn-secondary text-sm py-2"
            >
                Support Team
            </button>
        </motion.div>
    );
};
