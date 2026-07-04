import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { OFFERS_BY_QUANTITY, PRODUCT_MAP } from '@/data/products';
import { trackEvent } from '@/lib/analytics';

export type CartItem = {
  productId: string;
  quantity: 1 | 2 | 3;
  priceAed: number;
};

type CartState = {
  items: CartItem[];
  isOpen: boolean;
  open: () => void;
  close: () => void;
  addItem: (productId: string, quantity: 1 | 2 | 3) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  subtotal: () => number;
  total: () => number;
  itemCount: () => number;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),

      addItem: (productId, quantity) => {
        const price = OFFERS_BY_QUANTITY[quantity];
        if (!price || !PRODUCT_MAP[productId]) return;

        set((state) => {
          const existing = state.items.findIndex((i) => i.productId === productId);
          if (existing >= 0) {
            const updated = [...state.items];
            updated[existing] = { productId, quantity, priceAed: price };
            return { items: updated };
          }
          return { items: [...state.items, { productId, quantity, priceAed: price }] };
        });
        trackEvent({ event_type: 'add_to_cart', product_id: productId, page_path: typeof window !== 'undefined' ? window.location.pathname : undefined });
      },

      removeItem: (productId) =>
        set((state) => ({ items: state.items.filter((i) => i.productId !== productId) })),

      clearCart: () => set({ items: [] }),

      subtotal: () => get().items.reduce((sum, i) => sum + i.priceAed, 0),
      total: () => get().items.reduce((sum, i) => sum + i.priceAed, 0),
      itemCount: () => get().items.reduce((sum, i) => sum + 1, 0),
    }),
    {
      name: 'skn-cart',
      partialize: (state) => ({ items: state.items }),
    }
  )
);
