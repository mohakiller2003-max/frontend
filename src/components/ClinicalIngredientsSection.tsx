import { Check, Droplets, FlaskConical, Leaf, ShieldCheck, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { Ingredient, LocalizedText, Product } from '@/data/products';
import type { ProductTheme } from '@/lib/productTheme';
import { IngredientCard } from '@/components/IngredientCard';
import { PhotoSlotPlaceholder } from '@/components/PhotoSlotPlaceholder';

type Props = {
  product: Product;
  locale: 'ar' | 'en';
  theme: ProductTheme;
  noNasties: string[];
  noNastiesHeadline: string;
  /** Force labeled local slot instead of current ingredients image */
  useLabelPlaceholder?: boolean;
};

const freeFromIcons = [Leaf, FlaskConical, Droplets, ShieldCheck, Sparkles, Check, Leaf, Droplets];

/** Nama-style ingredients: cream section, forest-green accents, dose cards */
export function ClinicalIngredientsSection({
  product,
  locale,
  theme,
  noNasties,
  noNastiesHeadline,
  useLabelPlaceholder = true,
}: Props) {
  const loc = locale;
  const ar = loc === 'ar';
  const doseHint = product.id.includes('tranexamic')
    ? ar
      ? 'ماكرو للصيقة ١٥٪ ترانيكساميك — واضحة وقابلة للقراءة'
      : 'Macro of 15% TXA label — sharp and readable'
    : ar
      ? 'ماكرو للصيقة ١٦٪ أزيليك — واضحة وقابلة للقراءة'
      : 'Macro of 16% Azelaic label — sharp and readable';

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* Content first → right in RTL (Nama), left in LTR */}
        <div>
          <p className="text-xs md:text-sm font-bold text-[#134E3A] mb-2">
            {ar ? 'المكونات الفعالة' : 'Active Ingredients'}
          </p>
          <h2 className="text-2xl md:text-[1.9rem] font-extrabold text-[#134E3A] leading-tight mb-3">
            {ar ? 'السر في التركيز، مو في القائمة' : 'The secret is the dose, not the list'}
          </h2>
          <p className="text-sm md:text-[15px] text-[#555555] leading-relaxed mb-7 max-w-lg">
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
            <ul className="mt-5 space-y-2.5">
              {product.benefitBullets.slice(0, 3).map((b: LocalizedText) => (
                <li
                  key={b.ar}
                  className="flex items-center gap-3 text-sm font-semibold text-[#222222] bg-white border border-[#E8E3DC] rounded-2xl px-4 py-3 shadow-soft"
                >
                  <span className="w-8 h-8 rounded-full bg-[#134E3A]/10 flex items-center justify-center shrink-0">
                    <Leaf size={15} className="text-[#134E3A]" />
                  </span>
                  <span>{b[loc]}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Image + free-from — forced same width */}
        <div className="min-w-0 w-full">
          <div className="w-full rounded-[1.25rem] overflow-hidden bg-white border border-[#E8E3DC] shadow-soft">
            {useLabelPlaceholder ? (
              <PhotoSlotPlaceholder
                locale={loc}
                kind="label"
                title={ar ? 'لصيقة التركيز على العبوة' : 'Dose label on bottle'}
                hint={doseHint}
                aspect="portrait"
                className="!rounded-none border-0"
              />
            ) : (
              <div className="relative w-full pb-[125%]">
                <Image
                  src={product.ingredientsImageUrl || product.imageUrl}
                  alt={product.name[loc]}
                  fill
                  className={
                    product.ingredientsImageUrl
                      ? 'object-cover'
                      : cn('object-contain p-4 md:p-5')
                  }
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  loading="lazy"
                />
              </div>
            )}
          </div>

          <div className="w-full mt-5 bg-white border border-[#E8E3DC] rounded-[1.25rem] p-5 md:p-6 shadow-soft">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="w-5 h-5 text-gold" strokeWidth={2.25} />
              <h3 className="font-extrabold text-[#134E3A] text-base md:text-lg">
                {noNastiesHeadline}
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {noNasties.map((n, i) => {
                const Icon = freeFromIcons[i % freeFromIcons.length];
                return (
                  <div
                    key={n}
                    className="flex items-center justify-between gap-2 rounded-xl bg-[#F5F1E6] border border-[#E8E3DC]/80 px-3 py-2.5"
                  >
                    <span className="text-[11px] md:text-xs font-semibold text-[#134E3A] leading-tight">
                      {n}
                    </span>
                    <Icon size={14} className="text-[#134E3A] shrink-0 opacity-80" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
