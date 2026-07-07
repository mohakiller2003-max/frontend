'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { configurePixels, loadPixels, trackPageView } from '@/features/tracking/pixels';
import { captureUtmFromUrl } from '@/lib/utm';

export function PixelDeferredLoader() {
  const pathname = usePathname();
  const readyRef = useRef(false);
  const lastPathRef = useRef<string | null>(null);

  const pathnameRef = useRef(pathname);
  pathnameRef.current = pathname;

  useEffect(() => {
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
        readyRef.current = true;
        lastPathRef.current = pathnameRef.current;
      })
      .catch(() => {
        loadPixels();
        readyRef.current = true;
        lastPathRef.current = pathnameRef.current;
      });
  }, []);

  useEffect(() => {
    if (!readyRef.current) return;
    if (lastPathRef.current === pathname) return;
    lastPathRef.current = pathname;
    trackPageView();
  }, [pathname]);

  return null;
}
