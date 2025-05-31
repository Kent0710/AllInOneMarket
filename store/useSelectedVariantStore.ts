import { create } from 'zustand';

interface SelectedVariantStore {
  selectedVariant: string;
  setSelectedVariant: (variant: string) => void;
}

export const useSelectedVariantStore = create<SelectedVariantStore>((set) => ({
  selectedVariant: '',
  setSelectedVariant: (variant: string) => set({ selectedVariant: variant }),
}));
