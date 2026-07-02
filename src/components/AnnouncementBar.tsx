'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { AnimatePresence, motion } from 'framer-motion';

const messages = {
  ar: [
    '✨ نتيجة من أول علبة أو استرداد أموالك 100%',
    '🚚 الدفع عند الاستلام متاح لجميع مدن الإمارات',
    '⚡ شحن VIP مبرد لضمان الفعالية القصوى',
  ],
  en: [
    '✨ Results from the first box or 100% money back',
    '🚚 Cash on Delivery available across the UAE',
    '⚡ VIP Climate-Controlled Shipping for maximum potency',
  ],
};

export function AnnouncementBar() {
  const locale = useLocale() as 'ar' | 'en';
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % messages[locale].length);
    }, 4000);
    return () => clearInterval(timer);
  }, [locale]);

  return (
    <div className="bg-mocha text-ivory py-2 px-4 text-center overflow-hidden relative z-[60]">
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="text-[11px] md:text-sm font-bold tracking-wide"
        >
          {messages[locale][index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}