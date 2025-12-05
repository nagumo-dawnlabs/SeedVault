import React from 'react';

interface FilterBarProps {
    categories: string[];
    selectedCategory: string;
    onSelectCategory: (category: string) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ categories, selectedCategory, onSelectCategory }) => {
    return (
        <div className="flex flex-wrap gap-2 mb-8">
            <button
                onClick={() => onSelectCategory('All')}
                className={`px-4 py-2 rounded-sm text-sm font-medium transition-all uppercase tracking-wide ${selectedCategory === 'All'
                        ? 'bg-colosseum-green-dark text-colosseum-green border border-colosseum-green'
                        : 'bg-colosseum-card text-colosseum-text-muted hover:text-white hover:bg-colosseum-border border border-transparent'
                    }`}
            >
                All
            </button>
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => onSelectCategory(category)}
                    className={`px-4 py-2 rounded-sm text-sm font-medium transition-all uppercase tracking-wide ${selectedCategory === category
                            ? 'bg-colosseum-green-dark text-colosseum-green border border-colosseum-green'
                            : 'bg-colosseum-card text-colosseum-text-muted hover:text-white hover:bg-colosseum-border border border-transparent'
                        }`}
                >
                    {category}
                </button>
            ))}
        </div>
    );
};
