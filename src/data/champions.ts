export interface Champion {
    id: string;
    name: string;
    description: string;
    category: 'DeFi' | 'Infrastructure' | 'Consumer' | 'Gaming';
    logo: string; // URL or placeholder
    tags: string[];
    achievements: string[];
}

export const champions: Champion[] = [
    {
        id: '1',
        name: 'Ore',
        description: 'Mining protocol on Solana. Winner of Renaissance Hackathon.',
        category: 'Infrastructure',
        logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=Ore',
        tags: ['Winner', 'Infra', 'Mining'],
        achievements: ['Grand Champion 2024'],
    },
    {
        id: '2',
        name: 'Dean\'s List',
        description: 'A DAO of power users and feedback providers.',
        category: 'Consumer',
        logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=DeansList',
        tags: ['Community', 'DAO'],
        achievements: ['Community Choice'],
    },
    {
        id: '3',
        name: 'Uprock',
        description: 'DePIN network for mobile internet sharing.',
        category: 'Infrastructure',
        logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=Uprock',
        tags: ['DePIN', 'Mobile'],
        achievements: ['Accelerator Batch 2'],
    },
    {
        id: '4',
        name: 'Meteora',
        description: 'Dynamic liquidity protocols for Solana.',
        category: 'DeFi',
        logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=Meteora',
        tags: ['DeFi', 'Liquidity'],
        achievements: ['Top TVL'],
    },
    {
        id: '5',
        name: 'Cubes',
        description: 'Next gen NFT marketplace aggregator.',
        category: 'Consumer',
        logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=Cubes',
        tags: ['NFT', 'Marketplace'],
        achievements: [],
    }
];
