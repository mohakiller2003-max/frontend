'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { ChevronLeft, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Product } from '@/data/products';
import { getProductTheme } from '@/lib/productTheme';

type ProductCardProps = {
  product: Product;
  className?: string;
};

/** Nama-style product discovery card */
export function ProductCard({ product, className }: ProductCardProps) {
  const locale = useLocale() as 'ar' | 'en';
  const ar = locale === 'ar';
  const theme = getProductTheme(product);
  const href = `/${locale}/products/${product.slug[locale]}`;
  const isTxa = product.id === 'tranexamic-niacinamide-serum';

  const routineBadge = isTxa
    ? ar
      ? 'روتين البقع · 15% ترانيكساميك'
      : 'Spot routine · 15% TXA'
    : ar
      ? 'روتين الآثار · 16% أزيليك'
      : 'Marks routine · 16% Azelaic';

  const fromPrice = ar ? '199 د.ا' : '199 AED';

  return (
    <article
      className={cn(
        'bg-white border border-[#E8E2DA] rounded-[1.5rem] overflow-hidden shadow-[0_8px_30px_rgba(40,30,20,0.06)] flex flex-col group h-full',
        className,
      )}
    >
      <Link href={href} className="relative block">
        <div className={cn('relative aspect-[4/5]', theme.accentLight)}>
          <span className="absolute top-3 end-3 z-10 text-[10px] md:text-[11px] font-bold text-ink bg-white/95 border border-[#E8E2DA] px-2.5 py-1 rounded-full shadow-sm max-w-[85%] truncate">
            {routineBadge}
          </span>
          <Image
            src={product.imageUrl}
            alt={product.name[locale]}
            fill
            className="object-contain p-6 md:p-8 group-hover:scale-[1.02] transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, 420px"
          />
        </div>
      </Link>

      <div className="p-5 md:p-6 flex flex-col flex-1 text-start">
        <Link href={href} className="hover:opacity-85 transition-opacity">
          <h3 className="font-extrabold text-ink text-base md:text-lg leading-snug mb-2">
            {product.name[locale]}
          </h3>
        </Link>

        <p className="text-sm text-taupe leading-relaxed mb-4 line-clamp-3 flex-1">
          {product.subheadline[locale]}
        </p>

        <div className="flex items-center gap-2 mb-5">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={13}
                className={
                  i < Math.round(product.ratingPlaceholder)
                    ? 'text-gold fill-gold'
                    : 'text-sand fill-sand'
                }
                aria-hidden
              />
            ))}
          </div>
          <span className="text-xs text-taupe font-medium tabular-nums">
            ({product.reviewCountPlaceholder})
          </span>
        </div>

        <div className="flex items-end justify-between gap-3 pt-4 border-t border-[#E8E2DA]">
          <div>
            <p className="text-[10px] font-semibold text-taupe mb-0.5">
              {ar ? 'يبدأ من' : 'From'}
            </p>
            <p className="text-lg md:text-xl font-extrabold text-ink tabular-nums">{fromPrice}</p>
          </div>

          <Link
            href={href}
            className="inline-flex items-center gap-1.5 text-xs md:text-sm font-bold text-ink bg-[#EEF2EF] hover:bg-[#E4EBE6] px-3.5 py-2.5 rounded-xl transition-colors shrink-0"
          >
            {ar ? 'تصفح العروض' : 'Browse offers'}
            <ChevronLeft size={14} className={ar ? '' : 'rotate-180'} />
          </Link>
        </div>
      </div>
    </article>
  );
}
