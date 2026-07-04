'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackEvent } from '@/lib/analytics';

export function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const productMatch = pathname.match(/\/products\/([^/]+)/);
    trackEvent({
      event_type: productMatch ? 'product_view' : 'page_view',
      page_path: pathname,
      product_id: productMatch?.[1],
    });
  }, [pathname]);

  return null;
}
