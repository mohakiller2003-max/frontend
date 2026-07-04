'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Check, Clock, Truck, RotateCcw, ShieldCheck, Droplets } from 'lucide-react';
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
    <div className="space-y-4">
      <p className="flex items-center gap-2 text-sm font-bold text-red-600 animate-pulse">
        <Clock size={16} className="shrink-0" />
        {product.urgencyLine[locale]}
      </p>

      <p className="text-sm font-black text-mocha">{t('selectOffer')}</p>

      <div className="space-y-3">
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
        className="w-full bg-mocha text-ivory py-4 md:py-5 rounded-2xl font-black text-base md:text-lg hover:bg-mocha/90 active:scale-[0.99] transition-all shadow-xl"
      >
        {product.ctaRoutine[locale]} · {formatAED(selectedOffer.priceAed)}
      </button>

      <p className="text-center text-sm font-bold text-taupe">{t('codNote')}</p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
        {[
          { icon: Droplets, value: '30', label: locale === 'ar' ? 'مل في الزجاجة' : 'ml per bottle' },
          { icon: Clock, value: '30', label: locale === 'ar' ? 'يوم لكل زجاجة' : 'days per bottle' },
          { icon: Truck, value: 'COD', label: locale === 'ar' ? 'كل الإمارات' : 'All UAE' },
          { icon: RotateCcw, value: locale === 'ar' ? '30' : '30', label: locale === 'ar' ? 'يوم ضمان' : 'day guarantee' },
        ].map(({ icon: Icon, value, label }) => (
          <div
            key={label}
            className="bg-white border border-sand rounded-xl p-3 text-center shadow-sm"
          >
            <Icon size={16} className="mx-auto text-mocha mb-1" />
            <p className="font-black text-mocha text-sm">{value}</p>
            <p className="text-[10px] text-taupe font-semibold leading-tight">{label}</p>
          </div>
        ))}
      </div>
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
        'w-full text-start p-4 md:p-5 rounded-2xl border-2 transition-all relative overflow-hidden',
        selected
          ? 'border-mocha bg-mocha/[0.03] shadow-md ring-1 ring-mocha/10'
          : 'border-sand bg-white hover:border-taupe'
      )}
    >
      {offer.topRibbon && (
        <span className="absolute top-0 left-0 right-0 bg-pearl text-[10px] font-bold text-taupe text-center py-1 border-b border-sand">
          {offer.topRibbon[locale]}
        </span>
      )}

      <div className={cn('flex items-start justify-between gap-3', offer.topRibbon && 'pt-5')}>
        <div className="flex gap-3 min-w-0">
          <div
            className={cn(
              'mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0',
              selected ? 'border-mocha bg-mocha text-ivory' : 'border-sand bg-white'
            )}
          >
            {selected && <Check size={12} strokeWidth={3} />}
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="font-black text-mocha">{offer.title[locale]}</span>
              {offer.quantity !== 1 && (
                <span
                  className={cn(
                    'text-[10px] px-2 py-0.5 rounded-full font-bold',
                    offer.quantity === 2 ? 'bg-rose/15 text-rose' : 'bg-gold/15 text-gold'
                  )}
                >
                  {offer.badge[locale]}
                </span>
              )}
            </div>
            <p className="text-xs text-taupe font-medium">{offer.subtitle[locale]}</p>
            {offer.savings && (
              <p className="text-xs font-bold text-green-700 mt-1">{offer.savings[locale]}</p>
            )}
          </div>
        </div>
        <span className="text-xl font-black text-mocha shrink-0">{formatAED(offer.priceAed)}</span>
      </div>
    </button>
  );
}
