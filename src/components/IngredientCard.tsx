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

/** Nama-style ingredient card: icon + name + dose badge + body + highlight strip */
export function IngredientCard({ ingredient, locale, theme, className }: Props) {
  return (
    <div className={cn('bg-white border border-sand rounded-2xl p-5 md:p-6 shadow-soft h-full flex flex-col', className)}>
      <div className="flex items-start justify-between gap-3 mb-3">
        <div
          className={cn(
            'w-10 h-10 rounded-full flex items-center justify-center shrink-0',
            theme.id === 'txa' ? 'bg-blush-accent/15' : 'bg-mint-accent/15',
          )}
        >
          <FlaskConical
            size={18}
            className={theme.id === 'txa' ? 'text-blush-accent' : 'text-mint-accent'}
          />
        </div>
        {ingredient.dose && (
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-ink text-ivory shrink-0">
            {ingredient.dose[locale]}
          </span>
        )}
      </div>

      <h4 className="font-extrabold text-ink text-base md:text-lg mb-2">{ingredient.name[locale]}</h4>
      <p className="text-sm text-taupe leading-relaxed flex-1">{ingredient.benefit[locale]}</p>

      {ingredient.highlight && (
        <div
          className={cn(
            'mt-4 flex items-start gap-2 rounded-xl px-3 py-2.5',
            theme.id === 'txa' ? 'bg-blush-light' : 'bg-mint-light',
          )}
        >
          <Sparkles
            size={14}
            className={cn('shrink-0 mt-0.5', theme.id === 'txa' ? 'text-blush-accent' : 'text-mint-accent')}
          />
          <p className="text-[12px] font-semibold text-mocha leading-snug">{ingredient.highlight[locale]}</p>
        </div>
      )}
    </div>
  );
}
