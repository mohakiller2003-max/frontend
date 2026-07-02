import { create } from 'zustand';

type CheckoutState = {
  isOpen: boolean;
  isSubmitting: boolean;
  orderId: string | null;
  orderNumber: string | null;
  totalAed: number | null;
  customerPhone: string | null;
  customerName: string | null;
  upsellProductId: string | null;
  showUpsell: boolean;
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
    upsellProductId: string | null;
    purchaseEventId: string;
  }) => void;
  openUpsell: () => void;
  closeUpsell: () => void;
  setUpsellAccepted: (totalAed: number) => void;
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
  upsellProductId: null,
  showUpsell: false,
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
      upsellProductId: params.upsellProductId,
      purchaseEventId: params.purchaseEventId,
      isOpen: false, // Close checkout modal explicitly
      showUpsell: !!params.upsellProductId, // Open upsell automatically if available
    }),

  openUpsell: () => set({ showUpsell: true }),
  closeUpsell: () => set({ showUpsell: false }),
  setUpsellAccepted: (totalAed) => set({ upsellAccepted: true, totalAed, showUpsell: false }),

  reset: () =>
    set({
      isOpen: false,
      isSubmitting: false,
      orderId: null,
      orderNumber: null,
      totalAed: null,
      customerPhone: null,
      customerName: null,
      upsellProductId: null,
      showUpsell: false,
      upsellAccepted: false,
      purchaseEventId: null,
    }),
}));
