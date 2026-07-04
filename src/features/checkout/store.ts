import { create } from 'zustand';

export type ConfirmedOrderItem = {
  productId: string;
  quantity: number;
  priceAed: number;
};

type CheckoutState = {
  isOpen: boolean;
  isSubmitting: boolean;
  orderId: string | null;
  orderNumber: string | null;
  totalAed: number | null;
  customerPhone: string | null;
  customerName: string | null;
  orderItems: ConfirmedOrderItem[];
  upsellProductId: string | null;
  showUpsell: boolean;
  upsellDismissed: boolean;
  upsellAccepted: boolean;
  purchaseEventId: string | null;

  openCheckout: () => void;
  closeCheckout: () => void;
  setSubmitting: (v: boolean) => void;
  setOrderConfirmed: (params: {
    orderId: string;
    orderNumber: string;
    totalAed: number;
    customerName: string;
    customerPhone: string;
    orderItems: ConfirmedOrderItem[];
    upsellProductId: string | null;
    purchaseEventId: string;
  }) => void;
  openUpsell: () => void;
  closeUpsell: () => void;
  setUpsellAccepted: (params: { totalAed: number; productId: string; priceAed: number }) => void;
  reset: () => void;
};

export const useCheckoutStore = create<CheckoutState>((set) => ({
  isOpen: false,
  isSubmitting: false,
  orderId: null,
  orderNumber: null,
  totalAed: null,
  customerPhone: null,
  customerName: null,
  orderItems: [],
  upsellProductId: null,
  showUpsell: false,
  upsellDismissed: false,
  upsellAccepted: false,
  purchaseEventId: null,

  openCheckout: () => set({ isOpen: true }),
  closeCheckout: () => set({ isOpen: false }),
  setSubmitting: (v) => set({ isSubmitting: v }),

  setOrderConfirmed: (params) =>
    set({
      orderId: params.orderId,
      orderNumber: params.orderNumber,
      totalAed: params.totalAed,
      customerName: params.customerName,
      customerPhone: params.customerPhone,
      orderItems: params.orderItems,
      upsellProductId: params.upsellProductId,
      purchaseEventId: params.purchaseEventId,
      isOpen: false,
      showUpsell: !!params.upsellProductId,
      upsellDismissed: false,
    }),

  openUpsell: () => set({ showUpsell: true }),
  closeUpsell: () => set({ showUpsell: false, upsellDismissed: true }),
  setUpsellAccepted: ({ totalAed, productId, priceAed }) =>
    set((state) => ({
      upsellAccepted: true,
      totalAed,
      showUpsell: false,
      upsellDismissed: true,
      orderItems: [
        ...state.orderItems,
        { productId, quantity: 1, priceAed },
      ],
    })),

  reset: () =>
    set({
      isOpen: false,
      isSubmitting: false,
      orderId: null,
      orderNumber: null,
      totalAed: null,
      customerPhone: null,
      customerName: null,
      orderItems: [],
      upsellProductId: null,
      showUpsell: false,
      upsellDismissed: false,
      upsellAccepted: false,
      purchaseEventId: null,
    }),
}));
