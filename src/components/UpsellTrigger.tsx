'use client';

import { useEffect } from 'react';
import { useCheckoutStore } from '@/features/checkout/store';

/**
 * Watches checkout store for a confirmed order and automatically opens the upsell modal.
 */
export function UpsellTrigger() {
  const { orderId, showUpsell, upsellProductId, openUpsell } = useCheckoutStore();

  useEffect(() => {
    if (orderId && upsellProductId && !showUpsell) {
      openUpsell();
    }
  }, [orderId, upsellProductId, showUpsell, openUpsell]);

  return null;
}
