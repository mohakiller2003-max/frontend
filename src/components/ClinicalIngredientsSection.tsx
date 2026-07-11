import Image from 'next/image';
import { Check, Leaf, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Ingredient, LocalizedText, Product } from '@/data/products';
import type { ProductTheme } from '@/lib/productTheme';
import { IngredientCard } from '@/components/IngredientCard';

type Props = {
  product: Product;
  locale: 'ar' | 'en';
  theme: ProductTheme;
  noNasties: string[];
  noNastiesHeadline: string;
};

/** Nama-style: product image + free-from | dose-first ingredient cards */
export function ClinicalIngredientsSection({
  product,
  locale,
  theme,
  noNasties,
  noNastiesHeadline,
}: Props) {
  const loc = locale;
  const ar = loc === 'ar';
  const isTxa = theme.id === 'txa';

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-start">
        {/* Left: image + free-from */}
        <div className="space-y-5">
          <div
            className={cn(
              'relative aspect-[4/5] max-h-[480px] rounded-[1.5rem] overflow-hidden border',
              theme.accentLight,
              isTxa ? 'border-blush-accent/20' : 'border-mint-accent/20',
            )}
          >
            <Image
              src={product.imageUrl}
              alt={product.name[loc]}
              fill
              className="object-contain p-8 md:p-10"
              sizes="(max-width: 1024px) 100vw, 480px"
              loading="lazy"
            />
          </div>

          <div className="bg-white border border-sand rounded-2xl p-5 md:p-6 shadow-soft">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="w-5 h-5 text-success" />
              <h3 className="font-extrabold text-ink text-base md:text-lg">{noNastiesHeadline}</h3>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {noNasties.map((n) => (
                <div
                  key={n}
                  className="flex items-center gap-2 rounded-xl bg-pearl border border-sand px-2.5 py-2.5"
                >
                  <span className="w-5 h-5 rounded-full bg-success/15 flex items-center justify-center shrink-0">
                    <Check size={11} className="text-success" strokeWidth={3} />
                  </span>
                  <span className="text-[11px] md:text-xs font-semibold text-mocha leading-tight">{n}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: ingredients */}
        <div>
          <p className="text-sm font-semibold text-taupe mb-2">
            {ar ? 'المكوّنات الفعّالة' : 'Active ingredients'}
          </p>
          <h2 className="text-2xl md:text-[1.85rem] font-extrabold text-ink leading-tight mb-2.5">
            {ar ? 'السر في التركيز، مو في القائمة' : 'The secret is the dose, not the list'}
          </h2>
          <p className="text-sm text-taupe leading-relaxed mb-6 max-w-lg">
            {ar
              ? 'كل مكوّن بجرعة واضحة على العبوة — مو خلطة عامة بدون تركيز.'
              : 'Every active at a clear dose on the label — not a vague blend without concentration.'}
          </p>

          <div className="flex flex-col gap-4">
            {product.keyIngredients.map((ing: Ingredient) => (
              <IngredientCard key={ing.name.ar} ingredient={ing} locale={loc} theme={theme} />
            ))}
          </div>

          {product.benefitBullets.length > 0 && (
            <ul className="mt-5 space-y-2">
              {product.benefitBullets.slice(0, 3).map((b: LocalizedText) => (
                <li
                  key={b.ar}
                  className="flex items-start gap-2.5 text-sm font-semibold text-mocha bg-white border border-sand rounded-xl px-3 py-2.5"
                >
                  <Leaf size={15} className="text-success shrink-0 mt-0.5" />
                  <span>{b[loc]}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
