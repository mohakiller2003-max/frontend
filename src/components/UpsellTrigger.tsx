'use client';

import { useEffect } from 'react';
import { useCheckoutStore } from '@/features/checkout/store';

/**
 * Watches checkout store for a confirmed order and automatically opens the upsell modal.
 */
export function UpsellTrigger() {
  const { orderId, showUpsell, upsellProductId, upsellDismissed, openUpsell } = useCheckoutStore();

  useEffect(() => {
    // Only open if we have an order with upsell, it's not already showing, and user hasn't dismissed it
    if (orderId && upsellProductId && !showUpsell && !upsellDismissed) {
      openUpsell();
    }
  }, [orderId, upsellProductId, showUpsell, upsellDismissed, openUpsell]);

  return null;
}
