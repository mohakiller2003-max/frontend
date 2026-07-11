import { ReviewCard } from '@/components/ReviewCard';
import type { ProductReview } from '@/data/products';

type Props = {
  locale: 'ar' | 'en';
  reviews: ProductReview[];
  concern: string;
  eyebrow: string;
  headline: string;
  subheadline: string;
  confirmedLabel: string;
};

/** Nama-style “real experiences” block — long story reviews before compare */
export function RealExperiencesSection({
  locale,
  reviews,
  concern,
  eyebrow,
  headline,
  subheadline,
  confirmedLabel,
}: Props) {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-10 md:mb-12 max-w-2xl mx-auto">
        <p className="text-sm font-semibold text-taupe mb-2">{eyebrow}</p>
        <h2 className="text-2xl md:text-4xl font-extrabold text-ink mb-3 leading-tight">{headline}</h2>
        <p className="text-taupe text-sm md:text-base leading-relaxed">{subheadline}</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {reviews.slice(0, 3).map((r) => (
          <ReviewCard
            key={r.initials}
            initials={r.initials}
            rating={r.rating}
            text={r.text[locale]}
            name={r.name?.[locale]}
            age={r.age[locale]}
            city={r.city[locale]}
            concern={concern}
            confirmed
            confirmedLabel={confirmedLabel}
            className="min-h-[280px]"
          />
        ))}
      </div>
    </div>
  );
}
