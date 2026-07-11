import { Users, Star, ShieldCheck } from 'lucide-react';

type Props = {
  locale: 'ar' | 'en';
  rating: number;
  reviewCount: number;
};

export function ProductSocialProofBar({ locale, rating, reviewCount }: Props) {
  const ar = locale === 'ar';
  return (
    <div className="bg-ink text-white py-3.5">
      <div className="max-w-6xl mx-auto px-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-center">
        <span className="inline-flex items-center gap-2 text-sm font-bold">
          <Users className="w-4 h-4 text-gold" />
          {ar ? '+١٬٢٠٠ طلب هذا الشهر في الإمارات' : '1,200+ UAE orders this month'}
        </span>
        <span className="hidden sm:inline text-white/25">|</span>
        <span className="inline-flex items-center gap-1.5 text-sm font-bold">
          <Star className="w-4 h-4 text-gold fill-gold" />
          {rating.toFixed(1)}
          <span className="text-white/70 font-medium">
            ({reviewCount.toLocaleString(ar ? 'ar-AE' : 'en-AE')} {ar ? 'تقييم مؤكد' : 'confirmed'})
          </span>
        </span>
        <span className="hidden md:inline text-white/25">|</span>
        <span className="inline-flex items-center gap-1.5 text-sm font-bold">
          <ShieldCheck className="w-4 h-4" />
          {ar ? 'ادفعين عند الباب · شحن مبرد' : 'Pay at the door · cooled ship'}
        </span>
      </div>
    </div>
  );
}
