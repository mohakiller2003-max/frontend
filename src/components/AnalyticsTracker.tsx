'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackEvent } from '@/lib/analytics';

export function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const productMatch = pathname.match(/\/products\/([^/]+)/);
    const payload = {
      event_type: productMatch ? ('product_view' as const) : ('page_view' as const),
      page_path: pathname,
      product_id: productMatch?.[1],
    };

    const send = () => trackEvent(payload);

    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(send, { timeout: 2000 });
      return () => window.cancelIdleCallback(id);
    }

    const timer = window.setTimeout(send, 300);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  return null;
}
