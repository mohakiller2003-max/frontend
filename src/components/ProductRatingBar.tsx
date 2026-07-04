import { Star } from 'lucide-react';

type Props = {
  locale: 'ar' | 'en';
  rating: number;
  reviewCount: number;
  confirmedLabel: string;
  priceLabel: string;
};

export function ProductRatingBar({ locale, rating, reviewCount, confirmedLabel, priceLabel }: Props) {
  return (
    <div className="inline-flex flex-wrap items-center gap-3 mb-5 p-3 md:p-4 bg-white border border-sand rounded-2xl shadow-soft w-full sm:w-auto">
      <div className="flex items-center gap-1.5 bg-gradient-to-r from-gold/20 to-gold/5 px-3 py-2 rounded-xl border border-gold/25">
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={16} className="text-gold fill-gold drop-shadow-sm" />
          ))}
        </div>
        <span className="font-black text-mocha text-base tabular-nums">{rating.toFixed(1)}</span>
      </div>
      <div className="text-sm font-bold text-taupe leading-snug">
        <span className="text-mocha">({reviewCount.toLocaleString(locale === 'ar' ? 'ar-AE' : 'en-AE')}</span>{' '}
        {confirmedLabel})
        <span className="text-sand mx-2">·</span>
        <span className="text-mocha">{priceLabel}</span>
      </div>
    </div>
  );
}
