'use client';

import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

type Props = {
  locale: 'ar' | 'en';
  fallback: string;
  hoursFromNow?: number;
};

function pad(n: number) {
  return String(n).padStart(2, '0');
}

/** Thin urgency strip — Nama-style, sits above offer cards */
export function UrgencyCountdown({ locale, fallback, hoursFromNow = 48 }: Props) {
  const [remainingMs, setRemainingMs] = useState<number | null>(null);

  useEffect(() => {
    const end = Date.now() + hoursFromNow * 60 * 60 * 1000;
    const tick = () => setRemainingMs(Math.max(0, end - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [hoursFromNow]);

  const hours = remainingMs != null ? Math.floor(remainingMs / 3_600_000) : null;
  const mins = remainingMs != null ? Math.floor((remainingMs % 3_600_000) / 60_000) : null;
  const secs = remainingMs != null ? Math.floor((remainingMs % 60_000) / 1000) : null;

  return (
    <div className="flex items-center gap-2 rounded-xl bg-[#FDECEC] border border-[#F5C6C6]/60 px-3.5 py-2.5 md:py-2">
      <Clock size={14} className="text-[#B94A48] shrink-0" />
      <p className="text-[12px] md:text-[13px] font-semibold text-[#8B3A38] leading-snug">
        {fallback}
        {hours != null && mins != null && secs != null && (
          <span className="ms-1.5 font-extrabold tabular-nums" dir="ltr">
            {pad(hours)}:{pad(mins)}:{pad(secs)}
          </span>
        )}
        <span className="sr-only">
          {locale === 'ar' ? 'العدّاد التنازلي للعرض' : 'Offer countdown'}
        </span>
      </p>
    </div>
  );
}
