import { Clock, Droplets, Sun, Moon, Sparkles, Heart, Package } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { LocalizedText } from '@/data/products';

type HowToStep = {
  icon?: 'droplets' | 'moon' | 'sun' | 'clock' | 'sparkles' | 'heart' | 'package';
  title: LocalizedText;
  desc: LocalizedText;
};

type StatItem = { value: string; label: string };

type Props = {
  locale: 'ar' | 'en';
  eyebrow: string;
  howToUse: LocalizedText;
  headline: string;
  subheadline: string;
  steps: HowToStep[];
  stats: StatItem[];
};

const ICONS = {
  droplets: Droplets,
  moon: Moon,
  sun: Sun,
  clock: Clock,
  sparkles: Sparkles,
  heart: Heart,
  package: Package,
};

/** Nama-style how-to: eyebrow + 4 rich cards + tip strip + dark stats bar */
export function ProductHowToSection({
  locale,
  eyebrow,
  howToUse,
  headline,
  subheadline,
  steps,
  stats,
}: Props) {
  const loc = locale;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-10 md:mb-12">
        <p className="text-sm font-semibold text-taupe mb-2">{eyebrow}</p>
        <h2 className="text-2xl md:text-4xl font-extrabold text-ink mb-3 leading-tight">{headline}</h2>
        <p className="text-taupe text-sm md:text-base">{subheadline}</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
        {steps.map((step, i) => {
          const Icon = ICONS[step.icon ?? 'droplets'];
          return (
            <div
              key={`${step.title.en}-${i}`}
              className="bg-white border border-sand rounded-2xl p-4 md:p-5 shadow-soft text-center md:text-start"
            >
              <div className="w-10 h-10 rounded-full bg-ink text-ivory flex items-center justify-center mx-auto md:mx-0 mb-3">
                <Icon size={18} />
              </div>
              <p className="font-extrabold text-ink text-sm md:text-base mb-1.5 leading-snug">
                {step.title[loc]}
              </p>
              <p className="text-[11px] md:text-xs text-taupe leading-relaxed">{step.desc[loc]}</p>
            </div>
          );
        })}
      </div>

      <p className="text-center text-taupe leading-relaxed max-w-3xl mx-auto text-xs md:text-sm bg-white border border-sand rounded-2xl px-5 py-4 mb-6">
        {howToUse[loc]}
      </p>

      <div className="bg-ink rounded-2xl md:rounded-[1.5rem] px-4 py-5 md:px-8 md:py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-2">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={cn(
                'text-center px-2',
                i > 0 && 'md:border-s md:border-white/15',
              )}
            >
              <p className="text-2xl md:text-3xl font-black text-gold tabular-nums mb-1">{s.value}</p>
              <p className="text-[10px] md:text-xs text-ivory/70 font-medium leading-snug">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
