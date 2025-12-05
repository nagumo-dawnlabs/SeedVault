import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { champions, Champion } from '../data/champions';
import { ChampionCard } from '../components/Champions/ChampionCard';
import { DirectStakeModal } from '../components/Champions/DirectStakeModal';
import { FilterBar } from '../components/Champions/FilterBar';

export const ChampionsArena: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedChampion, setSelectedChampion] = useState<Champion | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const categories = Array.from(new Set(champions.map(c => c.category)));

    const filteredChampions = selectedCategory === 'All'
        ? champions
        : champions.filter(c => c.category === selectedCategory);

    const handleStakeClick = (champion: Champion) => {
        setSelectedChampion(champion);
        setIsModalOpen(true);
    };

    return (
        <div className="py-8">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="text-4xl font-bold mb-2">Projects</h1>
                <p className="text-colosseum-text-muted">
                    Directly support the teams building the future of Solana.
                </p>
            </motion.div>

            <FilterBar
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredChampions.map((champion, index) => (
                    <motion.div
                        key={champion.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <ChampionCard champion={champion} onStake={handleStakeClick} />
                    </motion.div>
                ))}
            </div>

            <DirectStakeModal
                champion={selectedChampion}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
};
