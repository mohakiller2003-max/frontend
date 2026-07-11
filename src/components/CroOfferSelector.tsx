'use client';

import { useTranslations, useLocale } from 'next-intl';
import { cn, formatAED } from '@/lib/utils';
import type { Offer, Product } from '@/data/products';
import { useOfferSelectionStore } from '@/features/offers/store';
import { UrgencyCountdown } from '@/components/UrgencyCountdown';

type Props = {
  product: Product;
  onAdd: (quantity: 1 | 2 | 3) => void;
  compact?: boolean;
};

export function CroOfferSelector({ product, onAdd, compact = false }: Props) {
  const t = useTranslations('offers');
  const locale = useLocale() as 'ar' | 'en';
  const selected = useOfferSelectionStore((s) => s.selectedByProduct[product.id] ?? 2);
  const setSelected = useOfferSelectionStore((s) => s.setSelected);
  const selectedOffer = product.offers.find((o) => o.quantity === selected)!;

  return (
    <div className="flex flex-col gap-4 md:gap-3.5">
      {!compact && (
        <UrgencyCountdown
          locale={locale}
          fallback={product.urgencyLine[locale]}
          hoursFromNow={product.id.includes('azelaic') ? 48 : 46}
        />
      )}

      <p className="text-[13px] md:text-sm font-bold text-ink">{t('selectOffer')}</p>

      {/* Extra top padding so corner badges don’t collide between cards */}
      <div className="flex flex-col gap-4 md:gap-3.5 pt-1">
        {product.offers.map((offer) => (
          <OfferCard
            key={offer.quantity}
            offer={offer}
            locale={locale}
            selected={selected === offer.quantity}
            onSelect={() => setSelected(product.id, offer.quantity)}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={() => onAdd(selected)}
        className="w-full btn-primary py-4 md:py-3.5 text-[15px] mt-1"
      >
        {product.ctaRoutine[locale]} · {formatAED(selectedOffer.priceAed, locale)}
      </button>

      <p className="text-center text-[11px] font-medium text-taupe -mt-1">{t('codNote')}</p>
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
  const isFavourite = offer.quantity === 2;
  const isBestValue = offer.quantity === 3;
  const isStarter = offer.quantity === 1;

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        'relative w-full rounded-2xl border-2 text-start transition-colors',
        'px-3.5 py-3.5 md:px-3.5 md:py-3',
        selected
          ? 'border-ink bg-[#F7F4F0]'
          : 'border-sand bg-white hover:border-taupe/35',
      )}
    >
      {isStarter && (
        <span className="absolute -top-2.5 start-3 z-10 text-[9px] md:text-[10px] font-bold px-2 py-0.5 rounded-md bg-success/15 text-success">
          {locale === 'ar' ? 'نتيجة من الأولى' : 'From bottle 1'}
        </span>
      )}
      {isFavourite && (
        <span className="absolute -top-2.5 start-3 z-10 text-[9px] md:text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-gold text-ink">
          {locale === 'ar' ? 'الأكثر اختياراً' : 'Most chosen'}
        </span>
      )}
      {isBestValue && (
        <span className="absolute -top-2.5 start-3 z-10 text-[9px] md:text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-gold text-ink">
          {locale === 'ar' ? 'الأكثر توفيراً' : 'Best value'}
        </span>
      )}

      <div className="flex items-center gap-3">
        <span
          className={cn(
            'shrink-0 w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center',
            selected ? 'border-ink' : 'border-[#D4CBC3]',
          )}
          aria-hidden
        >
          {selected ? <span className="w-2 h-2 rounded-full bg-ink" /> : null}
        </span>

        <div className="flex-1 min-w-0">
          <p className="font-bold text-ink text-[13px] md:text-sm leading-snug">{offer.title[locale]}</p>
          <p className="text-[11px] md:text-xs text-taupe mt-1 leading-snug">{offer.subtitle[locale]}</p>
        </div>

        <div className="shrink-0 text-end ps-2">
          <p className="text-base md:text-[15px] font-extrabold text-ink tabular-nums leading-none">
            {formatAED(offer.priceAed, locale)}
          </p>
          {offer.savings ? (
            <p className="text-[10px] md:text-[11px] font-semibold text-taupe mt-1 leading-tight">
              {offer.savings[locale]}
            </p>
          ) : (
            <p className="text-[10px] text-transparent mt-1 select-none" aria-hidden>
              —
            </p>
          )}
        </div>
      </div>
    </button>
  );
}
