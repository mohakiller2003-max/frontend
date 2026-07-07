'use client';

import { useEffect, useRef } from 'react';
import { firePixelEvent } from '@/features/tracking/pixels';
import { generateEventId } from '@/lib/utils';

type Props = {
  productId: string;
  valueAed: number;
};

export function ProductViewPixel({ productId, valueAed }: Props) {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    firePixelEvent(
      'ViewContent',
      {
        content_ids: [productId],
        currency: 'AED',
        value: valueAed,
      },
      generateEventId('ViewContent'),
    );
  }, [productId, valueAed]);

  return null;
}
