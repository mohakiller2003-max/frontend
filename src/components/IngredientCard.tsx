import { FlaskConical, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Ingredient } from '@/data/products';
import type { ProductTheme } from '@/lib/productTheme';

type Props = {
  ingredient: Ingredient;
  locale: 'ar' | 'en';
  theme: ProductTheme;
  className?: string;
};

/** Nama-style card: green icon circle + dose pill + highlight strip */
export function IngredientCard({ ingredient, locale, className }: Props) {
  return (
    <div
      className={cn(
        'bg-white border border-[#E8E3DC] rounded-[1.25rem] p-5 md:p-6 shadow-soft h-full flex flex-col',
        className,
      )}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-11 h-11 rounded-full bg-[#134E3A] flex items-center justify-center shrink-0">
          <FlaskConical size={18} className="text-gold" strokeWidth={2} />
        </div>
        <h4 className="font-extrabold text-[#222222] text-base md:text-lg flex-1 leading-snug">
          {ingredient.name[locale]}
        </h4>
        {ingredient.dose && (
          <span className="text-[11px] font-bold px-3 py-1.5 rounded-full bg-[#134E3A] text-gold shrink-0">
            {ingredient.dose[locale]}
          </span>
        )}
      </div>

      <p className="text-sm text-[#555555] leading-relaxed flex-1">{ingredient.benefit[locale]}</p>

      {ingredient.highlight && (
        <div className="mt-4 flex items-start gap-2 rounded-xl bg-[#E8F0EB] px-3.5 py-3">
          <Sparkles size={14} className="text-gold shrink-0 mt-0.5" />
          <p className="text-[12px] md:text-[13px] font-bold text-[#134E3A] leading-snug">
            {ingredient.highlight[locale]}
          </p>
        </div>
      )}
    </div>
  );
}
