'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Check } from 'lucide-react';
import { cn, formatAED } from '@/lib/utils';
import type { Offer } from '@/data/products';

type OfferSelectorProps = {
  offers: Offer[];
  defaultQuantity?: 1 | 2 | 3;
  onAdd: (quantity: 1 | 2 | 3) => void;
  ctaLabel?: string;
};

export function OfferSelector({ offers, defaultQuantity = 2, onAdd, ctaLabel }: OfferSelectorProps) {
  const t = useTranslations('offers');
  const locale = useLocale() as 'ar' | 'en';
  const [selected, setSelected] = useState<1 | 2 | 3>(defaultQuantity);

  const labelMap: Record<string, string> = {
    one: t('one'),
    two: t('two'),
    three: t('three'),
  };

  return (
    <div className="space-y-3">
      {/* Offer cards */}
      <div className="space-y-2">
        {offers.map((offer) => {
          const isSelected = selected === offer.quantity;
          const perPiece = Math.round(offer.priceAed / offer.quantity);

          return (
            <div
              key={offer.quantity}
              role="button"
              tabIndex={0}
              onClick={() => setSelected(offer.quantity)}
              onKeyDown={(e) => e.key === 'Enter' && setSelected(offer.quantity)}
              className={cn(
                'w-full flex items-center justify-between p-4 rounded-card border-2 transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose cursor-pointer',
                isSelected
                  ? 'border-rose bg-rose/5 shadow-soft'
                  : 'border-sand bg-ivory hover:border-taupe'
              )}
              aria-pressed={isSelected}
              aria-label={`${labelMap[offer.labelKey]} - ${formatAED(offer.priceAed, locale)}`}
            >
              <div className="flex items-center gap-3">
                {/* Radio indicator */}
                <div
                  className={cn(
                    'w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0',
                    isSelected ? 'border-rose' : 'border-sand'
                  )}
                  aria-hidden="true"
                >
                  {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-rose" />}
                </div>

                <div className="text-start">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-mocha">{labelMap[offer.labelKey]}</span>
                    <div
                      className={cn(
                        'text-xs px-2 py-0.5 rounded-pill font-medium',
                        offer.badge.ar === 'أفضل قيمة' || offer.badge.en === 'Best Value'
                          ? 'bg-gold/15 text-gold'
                          : offer.badge.ar === 'الأكثر طلبًا' || offer.badge.en === 'Most Popular'
                          ? 'bg-rose/15 text-rose'
                          : 'bg-sand text-taupe'
                      )}
                    >
                      {offer.badge[locale]}
                    </div>
                  </div>
                  <span className="text-xs text-taupe mt-0.5 block">
                    {formatAED(perPiece, locale)} {t('perPiece')}
                  </span>
                </div>
              </div>

              <div className="text-end">
                <span className="text-lg font-bold text-mocha">{formatAED(offer.priceAed, locale)}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Scarcity */}
      <p className="text-sm text-red-500 text-center font-bold animate-pulse">{t('scarcity')}</p>

      {/* Add to cart CTA */}
      <button
        type="button"
        onClick={() => onAdd(selected)}
        className="w-full bg-mocha text-ivory py-4 px-6 rounded-pill font-bold text-lg hover:bg-mocha/90 active:scale-[0.99] transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-mocha focus-visible:ring-offset-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
      >
        {ctaLabel || t('addToCart')}
      </button>
    </div>
  );
}
