'use client';

import { useTranslations } from 'next-intl';
import { useCartStore } from '@/features/cart/store';
import { useOfferSelectionStore } from '@/features/offers/store';
import { CroOfferSelector } from '@/components/CroOfferSelector';
import { type Product } from '@/data/products';
import { firePixelEvent } from '@/features/tracking/pixels';
import { generateEventId, formatAED } from '@/lib/utils';
import { cn } from '@/lib/utils';

type Props = {
  product: Product;
  locale: 'ar' | 'en';
  dark?: boolean;
  stickyMobile?: boolean;
  sectionId?: string;
  compact?: boolean;
};

export function ProductOfferSection({
  product,
  locale,
  dark = false,
  stickyMobile = false,
  sectionId = 'offer-selector',
  compact = false,
}: Props) {
  const t = useTranslations('offers');
  const { addItem, open: openCart } = useCartStore();
  const selectedQty = useOfferSelectionStore((s) => s.selectedByProduct[product.id] ?? 2);
  const selectedOffer =
    product.offers.find((o) => o.quantity === selectedQty) ??
    product.offers.find((o) => o.quantity === 2) ??
    product.offers[1];

  const handleAdd = (quantity: 1 | 2 | 3) => {
    addItem(product.id, quantity);
    openCart();
    firePixelEvent(
      'AddToCart',
      {
        content_ids: [product.id],
        content_name: product.name[locale],
        value: product.offers.find((o) => o.quantity === quantity)?.priceAed,
        currency: 'AED',
      },
      generateEventId('AddToCart'),
    );
  };

  if (stickyMobile) {
    const qtyLabel =
      selectedQty === 1
        ? locale === 'ar'
          ? 'زجاجة واحدة'
          : '1 bottle'
        : selectedQty === 2
          ? locale === 'ar'
            ? 'زجاجتين · الأكثر اختياراً'
            : '2 bottles · most chosen'
          : locale === 'ar'
            ? 'ثلاث زجاجات'
            : '3 bottles';

    return (
      <div className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-ivory/95 backdrop-blur-md border-t border-sand px-3 pt-2.5 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <button
          type="button"
          onClick={() => handleAdd(selectedQty)}
          className="w-full bg-mocha text-ivory py-3.5 rounded-2xl font-black text-[15px] active:scale-[0.98] transition-transform"
        >
          <span className="block leading-tight">
            {t('stickyCtaMobile')} · {formatAED(selectedOffer.priceAed, locale)}
          </span>
          <span className="block text-[11px] font-semibold text-ivory/70 mt-0.5">{qtyLabel}</span>
        </button>
        <p className="text-center text-[10px] text-taupe mt-1.5 font-semibold">{t('codNote')}</p>
      </div>
    );
  }

  return (
    <div id={sectionId} className={cn('flex flex-col flex-1 min-h-0', dark && 'text-ivory')}>
      <CroOfferSelector product={product} onAdd={handleAdd} compact={compact} />
    </div>
  );
}
