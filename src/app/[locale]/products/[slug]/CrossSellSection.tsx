'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, Sparkles } from 'lucide-react';
import type { Product } from '@/data/products';
import { formatAED, cn } from '@/lib/utils';
import { getProductTheme } from '@/lib/productTheme';

type Props = {
  complementaryProduct: Product;
  locale: 'ar' | 'en';
};

/** Nama-style cross-sell: discovery product card → other PDP */
export function CrossSellSection({ complementaryProduct, locale }: Props) {
  const ar = locale === 'ar';
  const theme = getProductTheme(complementaryProduct);
  const fromPrice =
    complementaryProduct.offers.find((o) => o.quantity === 1)?.priceAed ??
    complementaryProduct.offers[0]?.priceAed ??
    199;
  const href = `/${locale}/products/${complementaryProduct.slug[locale]}`;

  return (
    <div className="max-w-xl mx-auto">
      <div className="text-center mb-8">
        <p className="text-sm font-semibold text-taupe mb-2">
          {ar ? 'كمّلي روتينج' : 'Complete your routine'}
        </p>
        <h3 className="text-xl md:text-3xl font-extrabold text-ink leading-tight">
          {ar ? 'السيروم الثاني لنتيجة أوضح' : 'The second serum for clearer results'}
        </h3>
      </div>

      {/* Card is a div (not Link) to avoid Image/Link removeChild crashes on client nav */}
      <div className="bg-white rounded-[1.75rem] border border-sand shadow-soft overflow-hidden">
        <div className={cn('relative flex justify-center', theme.accentLight)}>
          <span className="absolute top-4 end-4 z-10 inline-flex items-center gap-1 bg-gold text-ink text-[11px] font-black px-3 py-1.5 rounded-full shadow-soft pointer-events-none">
            <Sparkles size={12} />
            {ar ? 'اكتشفي' : 'Discover'}
          </span>
          <Link href={href} className="relative w-full max-w-[220px] md:max-w-[260px] aspect-[9/16] my-6 md:my-8 block">
            <Image
              src={complementaryProduct.imageUrl}
              alt={complementaryProduct.name[locale]}
              fill
              className="object-contain p-2"
              sizes="(max-width: 768px) 220px, 260px"
            />
          </Link>
        </div>

        <div className="p-5 md:p-6 text-start">
          <Link href={href} className="block hover:opacity-90 transition-opacity">
            <h4 className="font-extrabold text-ink text-base md:text-lg leading-snug mb-2">
              {complementaryProduct.name[locale]}
            </h4>
            <p className="text-sm text-taupe leading-relaxed line-clamp-3 mb-5">
              {complementaryProduct.subheadline[locale]}
            </p>
          </Link>

          <div className="flex items-center justify-between gap-3 pt-4 border-t border-sand">
            <Link
              href={href}
              className="inline-flex items-center gap-1.5 text-sm font-bold text-mocha bg-pearl border border-sand px-3.5 py-2 rounded-full hover:border-ink/20 transition-colors"
            >
              {ar ? 'اكتشفي' : 'Discover'}
              <ChevronLeft size={14} className={ar ? '' : 'rotate-180'} />
            </Link>
            <div className="text-end">
              <p className="text-[10px] font-semibold text-taupe uppercase tracking-wide">
                {ar ? 'يبدأ من' : 'From'}
              </p>
              <p className="text-lg md:text-xl font-extrabold text-ink tabular-nums">
                {formatAED(fromPrice, locale)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
