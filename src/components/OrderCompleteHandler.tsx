'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useCheckoutStore } from '@/features/checkout/store';
import { PRODUCT_MAP } from '@/data/products';

/**
 * Ensures every successful order reaches the thank-you page.
 * UpsellModal handles the upsell path; this covers no-upsell and broken upsell IDs.
 */
export function OrderCompleteHandler() {
  const locale = useLocale();
  const router = useRouter();
  const { orderId, upsellProductId, showUpsell, upsellDismissed } = useCheckoutStore();

  useEffect(() => {
    if (!orderId || showUpsell || upsellDismissed) return;

    const hasValidUpsell =
      upsellProductId && PRODUCT_MAP[upsellProductId];

    if (!hasValidUpsell) {
      router.push(`/${locale}/thank-you`);
    }
  }, [orderId, upsellProductId, showUpsell, upsellDismissed, router, locale]);

  return null;
}
