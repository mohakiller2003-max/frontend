'use client';

import { useCartStore } from '@/features/cart/store';
import { useTranslations } from 'next-intl';
import { OfferSelector } from '@/components/OfferSelector';
import { type Product, PRODUCTS } from '@/data/products';
import { firePixelEvent } from '@/features/tracking/pixels';
import { generateEventId } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Image from 'next/image';

type Props = {
  product: Product;
  locale: 'ar' | 'en';
  dark?: boolean;
  stickyMobile?: boolean;
};

export function ProductOfferSection({ product, locale, dark = false, stickyMobile = false }: Props) {
  const { addItem, open: openCart } = useCartStore();
  const t = useTranslations('product');
  const complementaryProduct = PRODUCTS.find((p) => p.id === product.complementaryId);

  const handleAdd = (quantity: 1 | 2 | 3) => {
    addItem(product.id, quantity);
    openCart();
    firePixelEvent('AddToCart', {
      content_ids: [product.id],
      value: product.offers.find((o) => o.quantity === quantity)?.priceAed,
      currency: 'AED',
    }, generateEventId('AddToCart'));
  };

  if (stickyMobile) {
    return (
      <div className="fixed bottom-0 inset-x-0 z-30 md:hidden bg-ivory border-t border-sand px-4 py-3 safe-area-bottom shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <button
          onClick={() => {
            const el = document.getElementById('offer-selector');
            if (el) {
              const y = el.getBoundingClientRect().top + window.scrollY - 100;
              window.scrollTo({ top: y, behavior: 'smooth' });
            } else {
              handleAdd(2);
            }
          }}
          className="w-full bg-mocha text-ivory py-4 rounded-pill font-bold text-lg hover:bg-mocha/90 transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <span>{t('stickyCtaMobile')}</span>
          <span className="text-ivory/70 text-sm font-normal px-2 border-l border-ivory/20">{locale === 'ar' ? 'يبدأ من' : 'From'} 199 AED</span>
        </button>
      </div>
    );
  }

  return (
    <div id="offer-selector" className={cn("space-y-6", dark && 'text-ivory')}>
      <OfferSelector
        offers={product.offers}
        defaultQuantity={2}
        onAdd={handleAdd}
        ctaLabel={t('addOffer')}
      />
    </div>
  );
}
