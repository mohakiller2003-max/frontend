import { FlaskConical, ShieldCheck, Sparkles, Stethoscope, Truck } from 'lucide-react';
import { cn, formatLocaleNumber } from '@/lib/utils';
import type { ProductTheme } from '@/lib/productTheme';

type Props = {
  locale: 'ar' | 'en';
  theme: ProductTheme;
  expertQuote: string;
  expertTitle: string;
  rating: number;
  reviewCount: number;
  doseLabel: string;
};

/** Nama-style authority block — UAE-adapted (no SFDA/Halal claims) */
export function AuthorityCredibilitySection({
  locale,
  theme,
  expertQuote,
  expertTitle,
  rating,
  reviewCount,
  doseLabel,
}: Props) {
  const ar = locale === 'ar';

  const pillars = [
    {
      title: ar ? 'تركيز واضح' : 'Clear dose',
      desc: ar ? 'النسبة مكتوبة على العبوة — مو وعود عامة' : 'Percentage on the label — not vague claims',
      icon: FlaskConical,
    },
    {
      title: ar ? 'ثابت بالحر' : 'Heat-stable',
      desc: ar ? 'مناسب لشمس الخليج والتكييف — مو فيتامين C يتأكسد' : 'Built for Gulf sun and AC — not oxidising vitamin C',
      icon: Sparkles,
    },
    {
      title: ar ? 'تركيبة نظيفة' : 'Clean formula',
      desc: ar ? 'بدون عطور صناعية وكحول مجفّف' : 'No artificial fragrance or drying alcohol',
      icon: ShieldCheck,
    },
    {
      title: ar ? 'COD + ضمان' : 'COD + guarantee',
      desc: ar ? 'ادفعين عند الباب · ٣٠ يوم استرجاع' : 'Pay at the door · 30-day refund',
      icon: Truck,
    },
  ];

  const stats = [
    { value: doseLabel, label: ar ? 'تركيز فعّال على العبوة' : 'Active dose on the label' },
    {
      value: ar ? `+${formatLocaleNumber(1200, locale)}` : '1,200+',
      label: ar ? 'طلب في الإمارات هذا الشهر' : 'UAE orders this month',
    },
    {
      value: `${formatLocaleNumber(rating, locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}★`,
      label: ar
        ? `متوسط تقييم العميلات (${formatLocaleNumber(reviewCount, locale)}+)`
        : `Avg. customer rating (${reviewCount}+)`,
    },
    { value: ar ? '٣٠ يوم' : '30 days', label: ar ? 'ضمان استرجاع كامل' : 'Full money-back guarantee' },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-10 max-w-2xl mx-auto">
        <p className="text-sm font-semibold text-taupe mb-2">
          {ar ? 'الأمان والمصداقية' : 'Safety & credibility'}
        </p>
        <h2 className="text-2xl md:text-4xl font-extrabold text-ink mb-3 leading-tight">
          {ar ? 'تركيبة سريرية، مو وعود فاضية' : 'A clinical formula — not empty promises'}
        </h2>
        <p className="text-taupe text-sm md:text-base leading-relaxed">
          {ar
            ? 'تركيز واضح، تركيبة ثابتة لحر الإمارات، ودعم عميلة يدفع عند الباب بدون مخاطرة.'
            : 'Clear dose, heat-stable for UAE climate, and a COD experience with zero upfront risk.'}
        </p>
      </div>

      {/* Trust pillars — UAE adapted */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {pillars.map(({ title, desc, icon: Icon }) => (
          <div
            key={title}
            className="bg-white border border-sand rounded-2xl p-4 md:p-5 text-center shadow-soft"
          >
            <div
              className={cn(
                'w-10 h-10 rounded-full mx-auto mb-3 flex items-center justify-center',
                theme.id === 'txa' ? 'bg-blush-accent/15' : 'bg-mint-accent/15',
              )}
            >
              <Icon
                size={18}
                className={theme.id === 'txa' ? 'text-blush-accent' : 'text-mint-accent'}
              />
            </div>
            <p className="font-extrabold text-ink text-sm mb-1">{title}</p>
            <p className="text-[11px] text-taupe leading-snug">{desc}</p>
          </div>
        ))}
      </div>

      {/* Expert + stats */}
      <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-5 items-stretch">
        <div className="bg-ink text-ivory rounded-[1.5rem] p-6 md:p-8 relative overflow-hidden">
          <div className="flex items-center gap-2 mb-5">
            <Stethoscope className="w-5 h-5 text-gold" />
            <span className="text-xs font-bold uppercase tracking-wider text-gold">
              {ar ? 'رأي اختصاصي' : 'Specialist opinion'}
            </span>
          </div>
          <p className="text-base md:text-lg leading-relaxed mb-6 relative z-10">{expertQuote}</p>
          <div className="relative z-10">
            <p className="font-bold text-ivory">{expertTitle}</p>
            <p className="text-xs text-ivory/55 mt-1">
              {ar
                ? 'عناية بالبشرة · خبرة بمناخ الخليج'
                : 'Skincare · Gulf climate experience'}
            </p>
          </div>
          <Stethoscope
            className="absolute -end-4 -bottom-4 w-40 h-40 text-white/5 pointer-events-none"
            aria-hidden
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-pearl border border-sand rounded-2xl p-4 md:p-5 flex flex-col justify-center"
            >
              <p className="text-xl md:text-2xl font-black text-ink tabular-nums mb-1">{s.value}</p>
              <p className="text-[11px] md:text-xs text-taupe font-medium leading-snug">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
