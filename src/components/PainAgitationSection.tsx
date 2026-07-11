'use client';

import Image from 'next/image';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ProductTheme } from '@/lib/productTheme';
import type { LocalizedText } from '@/data/products';

type PainQuote = { quote: LocalizedText; solution: LocalizedText };

type Props = {
  eyebrow: string;
  headline: string;
  subheadline: string;
  quotes: PainQuote[];
  statNumber: string;
  statText: string;
  statSource: string;
  imageUrl?: string | null;
  productImageUrl: string;
  doseLabel: string;
  imageAlt?: string;
  theme: ProductTheme;
  locale: 'ar' | 'en';
};

/** Nama-style pain section: paired problem/solution cards + image with stat bar */
export function PainAgitationSection({
  eyebrow,
  headline,
  subheadline,
  quotes,
  statNumber,
  statText,
  statSource,
  imageUrl,
  productImageUrl,
  doseLabel,
  imageAlt,
  theme,
  locale,
}: Props) {
  const loc = locale;
  const lifestyle = Boolean(imageUrl?.trim());
  const src = lifestyle ? imageUrl! : productImageUrl;
  const shown = quotes.slice(0, 4);

  return (
    <div className="max-w-6xl mx-auto" dir="ltr">
      <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8 lg:gap-10 items-start">
        {/* Content LEFT (Nama) */}
        <div className="order-2 lg:order-1" dir={loc === 'ar' ? 'rtl' : 'ltr'}>
          <p className="text-sm font-semibold text-taupe mb-2">{eyebrow}</p>
          <h2 className="text-2xl md:text-[1.85rem] lg:text-[2rem] font-extrabold text-ink leading-tight mb-2.5">
            {headline}
          </h2>
          <p className="text-[0.95rem] text-taupe leading-relaxed mb-6 max-w-xl">{subheadline}</p>

          <div className="flex flex-col gap-3">
            {shown.map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-sand overflow-hidden bg-white shadow-soft"
              >
                {/* Problem half */}
                <div className="flex items-center gap-3 px-3.5 py-3 md:px-4 md:py-3.5 bg-white">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-[#E85D5D] flex items-center justify-center">
                    <X size={13} className="text-white" strokeWidth={3} aria-hidden />
                  </span>
                  <p className="flex-1 text-[13px] md:text-sm font-semibold text-ink leading-snug">
                    {item.quote[loc]}
                  </p>
                </div>
                {/* Solution half */}
                <div
                  className={cn(
                    'flex items-center gap-3 px-3.5 py-3 md:px-4 md:py-3.5 border-t border-sand/70',
                    theme.id === 'txa' ? 'bg-blush-light' : 'bg-mint-light',
                  )}
                >
                  <span className="shrink-0 w-6 h-6 rounded-full bg-success flex items-center justify-center">
                    <Check size={13} className="text-white" strokeWidth={3} aria-hidden />
                  </span>
                  <p className="flex-1 text-[13px] md:text-sm text-mocha leading-snug">{item.solution[loc]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Image RIGHT (Nama) */}
        <div className="order-1 lg:order-2 lg:sticky lg:top-24">
          <div className="relative w-full max-w-[400px] mx-auto lg:max-w-none">
            <div
              className={cn(
                'relative overflow-hidden rounded-[1.35rem]',
                'min-h-[320px] sm:min-h-[420px] lg:min-h-[520px]',
                theme.accentLight,
              )}
            >
              <Image
                src={src}
                alt={imageAlt || headline}
                fill
                className={lifestyle ? 'object-cover object-center' : 'object-contain p-8 md:p-12 pb-28'}
                sizes="(max-width: 1024px) 400px, 400px"
                loading="lazy"
              />

              {!lifestyle && (
                <span
                  className={cn(
                    'absolute top-4 end-4 text-xs font-extrabold px-3 py-1.5 rounded-full bg-white border border-sand shadow-soft',
                    theme.accent,
                  )}
                >
                  {doseLabel}
                </span>
              )}

              {/* Nama-style dark stat bar + number box */}
              <div
                className="absolute inset-x-0 bottom-0 bg-ink text-ivory px-3.5 py-3.5 md:px-4 md:py-4"
                dir={loc === 'ar' ? 'rtl' : 'ltr'}
              >
                <div className="flex items-center gap-3">
                  <div className="shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-lg bg-[#5C6B4A] flex items-center justify-center">
                    <span className="text-2xl md:text-3xl font-black text-gold leading-none tabular-nums">
                      {statNumber.replace('٪', '').replace('%', '')}
                      <span className="text-base">{loc === 'ar' ? '٪' : '%'}</span>
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] md:text-xs leading-snug text-ivory/95 font-medium">
                      {statText}
                    </p>
                    <p className="text-[10px] text-ivory/45 mt-1">{statSource}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
