'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Check, Clock } from 'lucide-react';
import { cn, formatAED } from '@/lib/utils';
import type { Offer, Product } from '@/data/products';

type Props = {
  product: Product;
  onAdd: (quantity: 1 | 2 | 3) => void;
};

export function CroOfferSelector({ product, onAdd }: Props) {
  const t = useTranslations('offers');
  const locale = useLocale() as 'ar' | 'en';
  const [selected, setSelected] = useState<1 | 2 | 3>(2);

  const selectedOffer = product.offers.find((o) => o.quantity === selected)!;

  return (
    <div className="flex flex-col flex-1 gap-4 md:gap-5 min-h-0">
      <p className="flex items-center gap-2 text-sm md:text-base font-bold text-red-600">
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-red-50 border border-red-100 shrink-0">
          <Clock size={16} />
        </span>
        {product.urgencyLine[locale]}
      </p>

      <p className="text-base font-black text-mocha">{t('selectOffer')}</p>

      <div className="flex flex-col flex-1 gap-3 md:gap-4 justify-between min-h-[280px] md:min-h-[340px]">
        {product.offers.map((offer) => (
          <OfferCard
            key={offer.quantity}
            offer={offer}
            locale={locale}
            selected={selected === offer.quantity}
            onSelect={() => setSelected(offer.quantity)}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={() => onAdd(selected)}
        className="w-full bg-mocha text-ivory py-4 md:py-5 rounded-2xl font-black text-base md:text-lg hover:bg-mocha/90 active:scale-[0.99] transition-all shadow-xl mt-1"
      >
        {product.ctaRoutine[locale]} · {formatAED(selectedOffer.priceAed)}
      </button>

      <p className="text-center text-sm font-bold text-taupe pb-1">{t('codNote')}</p>
    </div>
  );
}

function OfferCard({
  offer,
  locale,
  selected,
  onSelect,
}: {
  offer: Offer;
  locale: 'ar' | 'en';
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        'w-full text-start flex-1 min-h-[88px] md:min-h-[100px] p-5 md:p-6 rounded-2xl border-2 transition-all relative overflow-hidden',
        selected
          ? 'border-mocha bg-mocha/[0.04] shadow-md ring-1 ring-mocha/10'
          : 'border-sand bg-white hover:border-taupe'
      )}
    >
      {offer.topRibbon && (
        <span className="absolute top-0 inset-x-0 bg-pearl text-[11px] font-bold text-taupe text-center py-1.5 border-b border-sand">
          {offer.topRibbon[locale]}
        </span>
      )}

      <div className={cn('flex items-center justify-between gap-4 h-full', offer.topRibbon && 'pt-6')}>
        <div className="flex gap-3 min-w-0 items-center">
          <div
            className={cn(
              'w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0',
              selected ? 'border-mocha bg-mocha text-ivory' : 'border-sand bg-white'
            )}
          >
            {selected && <Check size={14} strokeWidth={3} />}
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="font-black text-mocha text-base md:text-lg">{offer.title[locale]}</span>
              {offer.quantity !== 1 && (
                <span
                  className={cn(
                    'text-[11px] px-2.5 py-0.5 rounded-full font-bold',
                    offer.quantity === 2 ? 'bg-rose/15 text-rose' : 'bg-gold/15 text-gold'
                  )}
                >
                  {offer.badge[locale]}
                </span>
              )}
            </div>
            <p className="text-sm text-taupe font-medium">{offer.subtitle[locale]}</p>
            {offer.savings && (
              <p className="text-sm font-bold text-green-700 mt-1">{offer.savings[locale]}</p>
            )}
          </div>
        </div>
        <span className="text-2xl md:text-[1.65rem] font-black text-mocha shrink-0 tabular-nums">
          {formatAED(offer.priceAed)}
        </span>
      </div>
    </button>
  );
}
