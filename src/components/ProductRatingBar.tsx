import { Star } from 'lucide-react';

type Props = {
  locale: 'ar' | 'en';
  rating: number;
  reviewCount: number;
  confirmedLabel: string;
  priceLabel: string;
};

/** Compact inline rating — Nama style, not a big card */
export function ProductRatingBar({ locale, rating, reviewCount, confirmedLabel, priceLabel }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-4 md:mb-3 text-[13px]">
      <div className="inline-flex items-center gap-1">
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={13} className="text-gold fill-gold" />
          ))}
        </div>
        <span className="font-extrabold text-ink tabular-nums">{rating.toFixed(1)}</span>
      </div>
      <span className="text-taupe font-medium">
        ({reviewCount} {confirmedLabel})
      </span>
      <span className="text-sand">·</span>
      <span className="font-bold text-ink">{priceLabel}</span>
    </div>
  );
}
