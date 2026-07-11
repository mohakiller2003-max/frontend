'use client';

import dynamic from 'next/dynamic';

export const CartDrawer = dynamic(
  () => import('./CartDrawer').then((m) => m.CartDrawer),
  { ssr: false },
);

export const CheckoutModal = dynamic(
  () => import('./CheckoutModal').then((m) => m.CheckoutModal),
  { ssr: false },
);

export const UpsellModal = dynamic(
  () => import('./UpsellModal').then((m) => m.UpsellModal),
  { ssr: false },
);

export const UpsellTrigger = dynamic(
  () => import('./UpsellTrigger').then((m) => m.UpsellTrigger),
  { ssr: false },
);

export const OrderCompleteHandler = dynamic(
  () => import('./OrderCompleteHandler').then((m) => m.OrderCompleteHandler),
  { ssr: false },
);
