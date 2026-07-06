'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Star } from 'lucide-react';
import { cn, formatAED } from '@/lib/utils';
import type { Product } from '@/data/products';
import { useCartStore } from '@/features/cart/store';

type ProductCardProps = {
  product: Product;
  className?: string;
};

export function ProductCard({ product, className }: ProductCardProps) {
  const locale = useLocale() as 'ar' | 'en';
  const t = useTranslations('offers');
  const { addItem, open: openCart } = useCartStore();

  const handleCTA = () => {
    addItem(product.id, 2); // default 2 pieces
    openCart();
  };

  const popularOffer = product.offers.find((o) => o.quantity === 2)!;

  return (
    <div className={cn('bg-ivory border border-sand rounded-card-lg overflow-hidden shadow-soft hover:shadow-card transition-shadow duration-200 flex flex-col', className)}>
      {/* Product Image */}
      <Link href={`/${locale}/products/${product.slug[locale]}`} tabIndex={-1} aria-hidden="true">
        <div className="relative aspect-[3/4] bg-white">
          <Image
            src={product.imageUrl}
            alt={product.name[locale]}
            fill
            className="object-contain p-4"
            sizes="(max-width: 768px) 100vw, 320px"
          />
        </div>
      </Link>

      <div className="p-5 flex flex-col flex-1">
        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-2">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={12}
                className={i < Math.floor(product.ratingPlaceholder) ? 'text-gold fill-gold' : 'text-sand fill-sand'}
                aria-hidden="true"
              />
            ))}
          </div>
          <span className="text-xs text-taupe">{product.ratingPlaceholder}/5</span>
        </div>

        {/* Headline */}
        <Link href={`/${locale}/products/${product.slug[locale]}`} className="hover:text-rose transition-colors">
          <h3 className="font-semibold text-mocha text-base leading-snug mb-1">
            {product.name[locale]}
          </h3>
        </Link>
        <p className="text-sm text-taupe leading-relaxed mb-4 flex-1">
          {product.subheadline[locale]}
        </p>

        {/* Price preview */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-taupe">{locale === 'ar' ? 'يبدأ من' : 'From'}</span>
          <span className="font-bold text-mocha">{formatAED(199)}</span>
        </div>

        {/* Scarcity */}
        <p className="text-xs text-red-500 mb-3 font-bold animate-pulse">{t('scarcity')}</p>

        {/* CTA */}
        <button
          onClick={handleCTA}
          className="w-full bg-mocha text-ivory py-3 rounded-pill font-semibold text-sm hover:bg-mocha/90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-mocha"
        >
          {locale === 'ar' ? 'اختاري العرض' : 'Choose Offer'}
        </button>
      </div>
    </div>
  );
}
