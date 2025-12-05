
import { create } from 'zustand';

interface StoreState {
    // Wallet
    isConnected: boolean;
    walletAddress: string | null;
    balance: number;
    connectWallet: () => void;
    disconnectWallet: () => void;

    // Staking
    totalStaked: number;
    stakedToPool: number;
    stakedToChampions: Record<string, { amount: number; stakedAt: number }>; // championId -> position
    championPoints: Record<string, number>; // championId -> glory points
    gloryPoints: number;
    coSOLBalance: number;

    // Actions
    stakeToPool: (amount: number) => void;
    stakeToChampion: (championId: string, amount: number) => void;
}

export const useStore = create<StoreState>((set) => ({
    isConnected: true,
    walletAddress: 'So1a...Vault',
    balance: 1000, // Mock initial balance

    totalStaked: 5000000, // Initial Mock TVL
    stakedToPool: 0,
    stakedToChampions: {},
    championPoints: {},
    gloryPoints: 0,
    coSOLBalance: 0,

    connectWallet: () => set({ isConnected: true, walletAddress: 'So11...1111' }),
    disconnectWallet: () => set({ isConnected: false, walletAddress: null }),

    stakeToPool: (amount) => set((state) => ({
        balance: state.balance - amount,
        stakedToPool: state.stakedToPool + amount,
        totalStaked: state.totalStaked + amount,
        coSOLBalance: state.coSOLBalance + amount, // 1:1 mint
    })),

    stakeToChampion: (championId, amount) => set((state) => {
        const now = Date.now();
        const existing = state.stakedToChampions[championId];
        const heldDays = existing ? (now - existing.stakedAt) / (1000 * 60 * 60 * 24) : 0;
        const durationBonus = existing ? existing.amount * heldDays * 2 : 0; // 2 points per SOL per day held
        const newGlory = amount * 10 + durationBonus; // base + time-weighted bonus

        return {
            balance: state.balance - amount,
            stakedToChampions: {
                ...state.stakedToChampions,
                [championId]: {
                    amount: (existing?.amount || 0) + amount,
                    stakedAt: now,
                },
            },
            totalStaked: state.totalStaked + amount,
            gloryPoints: state.gloryPoints + newGlory,
            championPoints: {
                ...state.championPoints,
                [championId]: (state.championPoints[championId] || 0) + newGlory,
            },
            coSOLBalance: state.coSOLBalance + amount, // 1:1 mint
        };
    }),
}));
