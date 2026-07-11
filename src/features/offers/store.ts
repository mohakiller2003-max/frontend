import { create } from 'zustand';

type OfferSelectionState = {
  /** Selected offer quantity per productId — default treated as 2 when missing */
  selectedByProduct: Record<string, 1 | 2 | 3>;
  setSelected: (productId: string, quantity: 1 | 2 | 3) => void;
  getSelected: (productId: string) => 1 | 2 | 3;
};

export const useOfferSelectionStore = create<OfferSelectionState>((set, get) => ({
  selectedByProduct: {},
  setSelected: (productId, quantity) =>
    set((state) => ({
      selectedByProduct: { ...state.selectedByProduct, [productId]: quantity },
    })),
  getSelected: (productId) => get().selectedByProduct[productId] ?? 2,
}));
