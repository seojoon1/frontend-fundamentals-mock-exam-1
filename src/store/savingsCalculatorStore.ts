import { create } from 'zustand';
import { SavingsProduct } from '../api';

interface SavingsCalculatorState {
  products: SavingsProduct[];
  targetAmount: number | null;
  monthlyAmount: number | null;
  term: number;
  selectedProductId: string | null;
  selectedTab: string;
  annualRate: number;

  // Actions
  setProducts: (products: SavingsProduct[]) => void;
  setTargetAmount: (amount: number | null) => void;
  setMonthlyAmount: (amount: number | null) => void;
  setTerm: (term: number) => void;
  setSelectedProductId: (id: string | null) => void;
  setSelectedTab: (tab: string) => void;
  setAnnualRate: (rate: number) => void;
}

export const useSavingsCalculatorStore = create<SavingsCalculatorState>((set) => ({
  products: [],
  targetAmount: null,
  monthlyAmount: null,
  term: 12,
  selectedProductId: null,
  selectedTab: 'results',
  annualRate: 0,

  setProducts: (products) => set({ products }),
  setTargetAmount: (amount) => set({ targetAmount: amount }),
  setMonthlyAmount: (amount) => set({ monthlyAmount: amount }),
  setTerm: (term) => set({ term }),
  setSelectedProductId: (id) => set({ selectedProductId: id }),
  setSelectedTab: (tab) => set({ selectedTab: tab }),
  setAnnualRate: (rate) => set({ annualRate: rate }),
}));
