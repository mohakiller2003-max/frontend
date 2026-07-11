'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, Sparkles } from 'lucide-react';
import type { Product } from '@/data/products';
import { formatAED } from '@/lib/utils';

type Props = {
  complementaryProduct: Product;
  locale: 'ar' | 'en';
};

/** Cross-sell card — square 1:1 photo (1024×1024), no empty space */
export function CrossSellSection({ complementaryProduct, locale }: Props) {
  const ar = locale === 'ar';
  const fromPrice =
    complementaryProduct.offers.find((o) => o.quantity === 1)?.priceAed ??
    complementaryProduct.offers[0]?.priceAed ??
    199;
  const href = `/${locale}/products/${complementaryProduct.slug[locale]}`;

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-6 md:mb-8">
        <p className="text-sm font-semibold text-[#5A6B5C] mb-2">
          {ar ? 'كمّلي روتينج' : 'Complete your routine'}
        </p>
        <h3 className="text-xl md:text-2xl font-extrabold text-[#134E3A] leading-tight">
          {ar ? 'السيروم الثاني لنتيجة أوضح' : 'The second serum for clearer results'}
        </h3>
      </div>

      <div className="bg-white rounded-[1.5rem] border border-[#E8E3DC] shadow-soft overflow-hidden">
        <div className="relative w-full aspect-square bg-[#F5F2E9]">
          <span className="absolute top-3 end-3 z-10 inline-flex items-center gap-1 bg-gold text-[#134E3A] text-[11px] font-black px-3 py-1.5 rounded-full shadow-soft pointer-events-none">
            <Sparkles size={12} />
            {ar ? 'اكتشفي' : 'Discover'}
          </span>
          <Link href={href} className="absolute inset-0 block">
            <Image
              src={complementaryProduct.imageUrl}
              alt={complementaryProduct.name[locale]}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 448px"
            />
          </Link>
        </div>

        <div className="p-4 md:p-5 text-start">
          <Link href={href} className="block hover:opacity-90 transition-opacity">
            <h4 className="font-extrabold text-[#134E3A] text-base md:text-lg leading-snug mb-2">
              {complementaryProduct.name[locale]}
            </h4>
            <p className="text-sm text-[#5A6B5C] leading-relaxed line-clamp-2 mb-4">
              {complementaryProduct.subheadline[locale]}
            </p>
          </Link>

          <div className="flex items-center justify-between gap-3 pt-3 border-t border-[#E8E3DC]">
            <div className="text-start">
              <p className="text-[10px] font-semibold text-[#5A6B5C] uppercase tracking-wide">
                {ar ? 'يبدأ من' : 'From'}
              </p>
              <p className="text-lg font-extrabold text-[#134E3A] tabular-nums">
                {formatAED(fromPrice, locale)}
              </p>
            </div>
            <Link
              href={href}
              className="inline-flex items-center gap-1.5 text-sm font-bold text-white bg-[#134E3A] hover:bg-[#0F3D2D] px-3.5 py-2 rounded-full transition-colors"
            >
              {ar ? 'اكتشفي' : 'Discover'}
              <ChevronLeft size={14} className={ar ? '' : 'rotate-180'} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
