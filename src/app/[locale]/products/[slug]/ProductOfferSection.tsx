'use client';

import { useCartStore } from '@/features/cart/store';
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
};

export function ProductOfferSection({ product, locale, dark = false, stickyMobile = false }: Props) {
  const { addItem, open: openCart } = useCartStore();

  const handleAdd = (quantity: 1 | 2 | 3) => {
    addItem(product.id, quantity);
    openCart();
    firePixelEvent(
      'AddToCart',
      {
        content_ids: [product.id],
        value: product.offers.find((o) => o.quantity === quantity)?.priceAed,
        currency: 'AED',
      },
      generateEventId('AddToCart')
    );
  };

  if (stickyMobile) {
    return (
      <div className="fixed bottom-0 inset-x-0 z-30 md:hidden bg-ivory border-t border-sand px-4 py-3 safe-area-bottom shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <button
          type="button"
          onClick={() => {
            const el = document.getElementById('offer-selector');
            if (el) {
              const y = el.getBoundingClientRect().top + window.scrollY - 100;
              window.scrollTo({ top: y, behavior: 'smooth' });
            } else {
              handleAdd(2);
            }
          }}
          className="w-full bg-mocha text-ivory py-4 rounded-2xl font-black text-base hover:bg-mocha/90 transition-all shadow-md active:scale-[0.98]"
        >
          {product.ctaRoutine[locale]} · {formatAED(279)}
        </button>
      </div>
    );
  }

  return (
    <div id="offer-selector" className={cn('flex flex-col flex-1 min-h-0', dark && 'text-ivory')}>
      <CroOfferSelector product={product} onAdd={handleAdd} />
    </div>
  );
}
