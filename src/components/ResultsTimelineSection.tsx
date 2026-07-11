import { Heart, Sparkles } from 'lucide-react';
import type { TimelineStepCro } from '@/data/products';

type Props = {
  locale: 'ar' | 'en';
  badge: string;
  headline: string;
  subheadline: string;
  steps: TimelineStepCro[];
  nudge: string;
};

/** Nama-style timeline — cream bg, forest green accents */
export function ResultsTimelineSection({
  locale,
  badge,
  headline,
  subheadline,
  steps,
  nudge,
}: Props) {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-10 md:mb-14">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#134E3A] bg-[#134E3A]/10 px-3.5 py-1.5 rounded-full mb-4">
          <Sparkles size={12} className="text-gold" />
          {badge}
        </span>
        <h2 className="text-2xl md:text-4xl font-extrabold text-[#134E3A] mb-3 leading-tight">
          {headline}
        </h2>
        <p className="text-[#5A6B5C] text-sm md:text-base max-w-xl mx-auto">{subheadline}</p>
      </div>

      <div className="relative mb-8 md:mb-12">
        <div
          className="hidden md:block absolute top-7 start-[16.66%] end-[16.66%] h-px bg-[#D4D0C4]"
          aria-hidden
        />

        <div className="grid md:grid-cols-3 gap-8 md:gap-5">
          {steps.map((step, idx) => (
            <div key={idx} className="relative pt-2 md:pt-0">
              <div className="flex justify-center mb-4 relative z-10">
                <div className="w-14 h-14 rounded-full flex items-center justify-center font-black text-xl bg-[#134E3A] text-gold border-[3px] border-gold shadow-soft">
                  {idx + 1}
                </div>
              </div>

              <div className="bg-white border border-[#E8E3DC] rounded-2xl p-5 md:p-6 shadow-soft text-center h-full">
                <p className="text-xs font-bold text-[#5A6B5C] mb-1.5">{step.week[locale]}</p>
                <h3 className="text-base md:text-lg font-extrabold text-[#134E3A] mb-2 leading-snug">
                  {step.title[locale]}
                </h3>
                <p className="text-sm text-[#5A6B5C] leading-relaxed">{step.desc[locale]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-[#E8E3DC] rounded-2xl px-5 py-4 md:px-6 md:pt-6 md:pb-5 shadow-soft flex items-start md:items-center gap-3 md:gap-4">
        <div className="w-10 h-10 rounded-full bg-[#134E3A] flex items-center justify-center shrink-0">
          <Heart size={16} className="text-gold fill-gold/40" />
        </div>
        <p className="text-sm md:text-[15px] font-bold text-[#134E3A] leading-snug text-start flex-1 md:translate-y-0.5">
          {nudge}
        </p>
      </div>
    </div>
  );
}
