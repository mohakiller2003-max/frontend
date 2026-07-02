import { cn } from '@/lib/utils';
import type { Ingredient } from '@/data/products';

type IngredientCardProps = {
  ingredient: Ingredient;
  locale: 'ar' | 'en';
  className?: string;
};

export function IngredientCard({ ingredient, locale, className }: IngredientCardProps) {
  return (
    <div className={cn('bg-ivory border border-sand rounded-card p-5 shadow-soft', className)}>
      <div className="w-10 h-10 rounded-full bg-pearl flex items-center justify-center mb-3 border border-sand">
        <span className="text-rose text-lg font-bold" aria-hidden="true">✦</span>
      </div>
      <h4 className="font-semibold text-mocha mb-1.5">{ingredient.name[locale]}</h4>
      <p className="text-sm text-taupe leading-relaxed">{ingredient.benefit[locale]}</p>
    </div>
  );
}
