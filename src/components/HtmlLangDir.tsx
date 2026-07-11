'use client';

import { useEffect } from 'react';

/** Syncs <html lang/dir> when locale changes (root layout owns html/body). */
export function HtmlLangDir({ locale }: { locale: string }) {
  useEffect(() => {
    const root = document.documentElement;
    root.lang = locale;
    root.dir = locale === 'ar' ? 'rtl' : 'ltr';
  }, [locale]);

  return null;
}
