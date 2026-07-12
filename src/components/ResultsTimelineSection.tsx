import Image from 'next/image';
import { Heart, Sparkles } from 'lucide-react';
import type { TimelineStepCro } from '@/data/products';
import { PhotoSlotPlaceholder } from '@/components/PhotoSlotPlaceholder';
import { cn } from '@/lib/utils';

type TimelinePhotoSlot = {
  title: { ar: string; en: string };
  hint: { ar: string; en: string };
  /** Real photo path under /public — if set, replaces placeholder */
  src?: string | null;
  alt?: string;
};

type Props = {
  locale: 'ar' | 'en';
  badge: string;
  headline: string;
  subheadline: string;
  steps: TimelineStepCro[];
  nudge: string;
  /** Photo under each week — real src or labeled placeholder */
  photoSlots?: TimelinePhotoSlot[];
};

const DEFAULT_SLOTS: TimelinePhotoSlot[] = [
  {
    title: { ar: 'الأسبوع ٠', en: 'Week 0' },
    hint: {
      ar: 'صورة قبل البدء — نفس الإضاءة والزاوية',
      en: 'Before starting — same light and angle',
    },
  },
  {
    title: { ar: 'الأسبوع ٢', en: 'Week 2' },
    hint: {
      ar: 'نفس الزاوية بعد أسبوعين انتظام',
      en: 'Same angle after two weeks of use',
    },
  },
  {
    title: { ar: 'الأسبوع ٤', en: 'Week 4' },
    hint: {
      ar: 'نهاية الزجاجة الأولى — قارني مع الأسبوع ٠',
      en: 'End of first bottle — compare to week 0',
    },
  },
];

/** Photo-first 30-day results strip — tall portraits, minimal chrome */
export function ResultsTimelineSection({
  locale,
  badge,
  headline,
  subheadline,
  steps,
  nudge,
  photoSlots = DEFAULT_SLOTS,
}: Props) {
  const ar = locale === 'ar';

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8 md:mb-12 px-1">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#134E3A] bg-[#134E3A]/10 px-3.5 py-1.5 rounded-full mb-4">
          <Sparkles size={12} className="text-gold" />
          {badge}
        </span>
        <h2 className="text-2xl md:text-4xl font-extrabold text-[#134E3A] mb-3 leading-tight">
          {headline}
        </h2>
        <p className="text-[#5A6B5C] text-sm md:text-base max-w-xl mx-auto">{subheadline}</p>
      </div>

      {/* Desktop: 3 tall portraits · Mobile: snap scroll */}
      <div
        className={cn(
          'mb-8 md:mb-10',
          'flex md:grid md:grid-cols-3 gap-3 md:gap-4',
          'overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none',
          'pb-2 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0',
        )}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        dir={ar ? 'rtl' : 'ltr'}
      >
        {steps.map((step, idx) => {
          const slot = photoSlots[idx] ?? DEFAULT_SLOTS[idx];
          const weekLabel = slot?.title[locale] ?? step.week[locale];
          const isLast = idx === steps.length - 1;

          return (
            <article
              key={idx}
              className={cn(
                'relative flex flex-col shrink-0 snap-center',
                'w-[78vw] max-w-[320px] md:w-auto md:max-w-none',
                'bg-white border border-[#E8E3DC] rounded-[1.35rem] overflow-hidden',
              )}
            >
              {/* Tall portrait — face is the product */}
              <div className="relative w-full aspect-[3/4] bg-[#F2EFDF]">
                {slot?.src ? (
                  <Image
                    src={slot.src}
                    alt={slot.alt || `${step.title[locale]} — ${weekLabel}`}
                    fill
                    className="object-cover object-[center_20%]"
                    sizes="(max-width: 768px) 78vw, 33vw"
                    loading="lazy"
                  />
                ) : (
                  <PhotoSlotPlaceholder
                    locale={locale}
                    kind="beforeAfter"
                    title={weekLabel}
                    hint={slot?.hint[locale]}
                    aspect="portrait"
                    className="!rounded-none border-0 absolute inset-0 h-full max-h-none !aspect-auto"
                  />
                )}

                {/* Soft bottom fade into white content */}
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white/90 to-transparent"
                  aria-hidden
                />

                {/* Week chip */}
                <span className="absolute top-3 start-3 z-10 bg-[#134E3A] text-gold text-[11px] md:text-xs font-extrabold px-3 py-1.5 rounded-full tracking-wide">
                  {weekLabel}
                </span>

                {/* Step index */}
                <span className="absolute top-3 end-3 z-10 w-8 h-8 rounded-full bg-white/95 border border-[#E8E3DC] text-[#134E3A] text-sm font-black flex items-center justify-center">
                  {idx + 1}
                </span>

                {/* Progress arrow hint between cards (desktop) */}
                {!isLast ? (
                  <div
                    className="hidden md:flex absolute top-1/2 -translate-y-1/2 z-20 items-center justify-center pointer-events-none"
                    style={ar ? { left: '-0.7rem' } : { right: '-0.7rem' }}
                    aria-hidden
                  >
                    <span className="w-6 h-6 rounded-full bg-[#134E3A] text-gold text-xs font-black flex items-center justify-center shadow-soft">
                      {ar ? '←' : '→'}
                    </span>
                  </div>
                ) : null}
              </div>

              <div className="px-4 pt-3 pb-5 md:px-5 md:pt-4 md:pb-6 text-center flex-1 flex flex-col">
                <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#8A7F72] mb-1.5">
                  {step.week[locale]}
                </p>
                <h3 className="text-[15px] md:text-lg font-extrabold text-[#134E3A] mb-2 leading-snug">
                  {step.title[locale]}
                </h3>
                <p className="text-[13px] md:text-sm text-[#5A6B5C] leading-relaxed">
                  {step.desc[locale]}
                </p>
              </div>
            </article>
          );
        })}
      </div>

      <p className="md:hidden text-center text-[11px] text-[#8A7F72] font-medium mb-6 -mt-4">
        {ar ? 'اسحبي لتشوفي الأسابيع ←' : 'Swipe to see each week →'}
      </p>

      <div className="bg-[#134E3A] rounded-2xl px-5 py-4 md:px-7 md:py-5 flex items-start md:items-center gap-3 md:gap-4">
        <div className="w-10 h-10 rounded-full bg-white/10 border border-gold/40 flex items-center justify-center shrink-0">
          <Heart size={16} className="text-gold fill-gold/40" />
        </div>
        <p className="text-sm md:text-[15px] font-bold text-white leading-snug text-start flex-1">
          {nudge}
        </p>
      </div>
    </div>
  );
}
