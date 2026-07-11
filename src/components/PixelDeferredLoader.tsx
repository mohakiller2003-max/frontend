'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { configurePixels, loadPixels, trackPageView } from '@/features/tracking/pixels';
import { captureUtmFromUrl } from '@/lib/utm';

function bootPixels(onReady: () => void) {
  captureUtmFromUrl();

  fetch('/api/pixels/config', { cache: 'no-store' })
    .then((res) => res.json())
    .then((config: { meta?: string; tiktok?: string; snap?: string }) => {
      configurePixels({
        meta: config.meta || '',
        tiktok: config.tiktok || '',
        snap: config.snap || '',
      });
      loadPixels();
      onReady();
    })
    .catch(() => {
      loadPixels();
      onReady();
    });
}

export function PixelDeferredLoader() {
  const pathname = usePathname();
  const readyRef = useRef(false);
  const lastPathRef = useRef<string | null>(null);
  const pathnameRef = useRef(pathname);
  pathnameRef.current = pathname;

  useEffect(() => {
    let started = false;

    const start = () => {
      if (started) return;
      started = true;
      bootPixels(() => {
        readyRef.current = true;
        lastPathRef.current = pathnameRef.current;
      });
    };

    // Defer ad scripts until user engages — keeps scroll smooth on first paint
    const events = ['pointerdown', 'keydown', 'touchstart'] as const;
    const onInteract = () => {
      start();
      events.forEach((e) => window.removeEventListener(e, onInteract));
    };
    events.forEach((e) => window.addEventListener(e, onInteract, { passive: true }));

    const fallback = window.setTimeout(start, 8000);

    return () => {
      window.clearTimeout(fallback);
      events.forEach((e) => window.removeEventListener(e, onInteract));
    };
  }, []);

  useEffect(() => {
    if (!readyRef.current) return;
    if (lastPathRef.current === pathname) return;
    lastPathRef.current = pathname;

    const idleHandle =
      typeof window.requestIdleCallback === 'function'
        ? window.requestIdleCallback(() => trackPageView(), { timeout: 1500 })
        : window.setTimeout(() => trackPageView(), 200);

    return () => {
      if (typeof idleHandle === 'number') {
        window.clearTimeout(idleHandle);
      } else if (typeof window.cancelIdleCallback === 'function') {
        window.cancelIdleCallback(idleHandle);
      }
    };
  }, [pathname]);

  return null;
}
