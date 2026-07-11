'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';

const messages = {
  ar: [
    'تركيز واضح على العبوة — الدفع عند الاستلام',
    'شحن VIP مبرد لكل الإمارات 24–48س',
    'ضمان 30 يوم — استرداد كامل بدون أسئلة',
  ],
  en: [
    'Clear dose on the label — cash on delivery',
    'VIP cooled shipping across UAE · 24–48h',
    '30-day guarantee — full refund, no questions',
  ],
};

export function AnnouncementBar() {
  const locale = useLocale() as 'ar' | 'en';
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % messages[locale].length);
    }, 4500);
    return () => clearInterval(timer);
  }, [locale]);

  return (
    <div className="bg-ink text-ivory py-2.5 px-4 text-center relative z-40">
      <p className="text-[11px] md:text-xs font-semibold tracking-wide transition-opacity duration-300">
        {messages[locale][index]}
      </p>
    </div>
  );
}
