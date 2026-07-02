'use client';

import { useEffect } from 'react';
import { loadPixels } from '@/features/tracking/pixels';
import { captureUtmFromUrl } from '@/lib/utm';

export function PixelDeferredLoader() {
  useEffect(() => {
    captureUtmFromUrl();
    loadPixels();
  }, []);

  return null;
}
