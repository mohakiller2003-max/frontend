import { Clock, Droplets, Sun, Moon, Sparkles, Heart, Package } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { LocalizedText } from '@/data/products';
import { PhotoSlotPlaceholder } from '@/components/PhotoSlotPlaceholder';

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
  /** Local preview slots for texture + apply video */
  showMediaSlots?: boolean;
  /** Real howto video path under /public */
  videoSrc?: string | null;
  videoPoster?: string | null;
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

/** Nama-style how-to: forest green + gold accents */
export function ProductHowToSection({
  locale,
  eyebrow,
  howToUse,
  headline,
  subheadline,
  steps,
  stats,
  showMediaSlots = true,
  videoSrc = null,
  videoPoster = null,
}: Props) {
  const loc = locale;
  const ar = loc === 'ar';

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-10 md:mb-12">
        <p className="text-sm font-bold text-[#134E3A] mb-2">{eyebrow}</p>
        <h2 className="text-2xl md:text-4xl font-extrabold text-[#134E3A] mb-3 leading-tight">
          {headline}
        </h2>
        <p className="text-[#5A6B5C] text-sm md:text-base">{subheadline}</p>
      </div>

      {showMediaSlots ? (
        <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-4 mb-8">
          {videoSrc ? (
            <div className="relative w-full overflow-hidden rounded-[1.25rem] border border-[#E8E3DC] bg-[#134E3A] aspect-[16/10] shadow-soft">
              <video
                className="absolute inset-0 h-full w-full object-cover"
                src={videoSrc}
                poster={videoPoster || undefined}
                controls
                playsInline
                preload="metadata"
                aria-label={ar ? 'فيديو طريقة الاستخدام' : 'How to use video'}
              >
                {ar
                  ? 'المتصفح ما يدعم تشغيل الفيديو.'
                  : 'Your browser does not support the video tag.'}
              </video>
            </div>
          ) : (
            <PhotoSlotPlaceholder
              locale={loc}
              kind="video"
              title={ar ? 'فيديو ١٥–٢٥ ثانية' : '15–25s video'}
              hint={
                ar
                  ? 'وجه نظيف → ٢–٣ قطرات → تدليك خفيف. بدون صوت أو موسيقى صاخبة.'
                  : 'Clean face → 2–3 drops → light pat. Mute or soft audio only.'
              }
              aspect="landscape"
              className="md:aspect-[16/10] !aspect-[16/10]"
            />
          )}
          <div className="grid grid-cols-2 gap-3">
            <PhotoSlotPlaceholder
              locale={loc}
              kind="texture"
              title={ar ? 'قطرة' : 'Drop'}
              hint={ar ? 'تكستشر خفيف على البشرة' : 'Light texture on skin'}
              aspect="square"
            />
            <PhotoSlotPlaceholder
              locale={loc}
              kind="apply"
              title={ar ? 'تطبيق' : 'Apply'}
              hint={ar ? '٢–٣ قطرات على الوجه' : '2–3 drops on face'}
              aspect="square"
            />
          </div>
        </div>
      ) : null}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
        {steps.map((step, i) => {
          const Icon = ICONS[step.icon ?? 'droplets'];
          return (
            <div
              key={`${step.title.en}-${i}`}
              className="bg-white border border-[#E8E3DC] rounded-2xl p-4 md:p-5 shadow-soft text-center md:text-start"
            >
              <div className="w-10 h-10 rounded-full bg-[#134E3A] text-gold flex items-center justify-center mx-auto md:mx-0 mb-3">
                <Icon size={18} />
              </div>
              <p className="font-extrabold text-[#134E3A] text-sm md:text-base mb-1.5 leading-snug">
                {step.title[loc]}
              </p>
              <p className="text-[11px] md:text-xs text-[#5A6B5C] leading-relaxed">{step.desc[loc]}</p>
            </div>
          );
        })}
      </div>

      <p className="text-center text-[#5A6B5C] leading-relaxed max-w-3xl mx-auto text-xs md:text-sm bg-white border border-[#E8E3DC] rounded-2xl px-5 py-4 mb-6">
        {howToUse[loc]}
      </p>

      <div className="bg-[#134E3A] rounded-2xl md:rounded-[1.5rem] px-4 py-5 md:px-8 md:py-6">
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
              <p className="text-[10px] md:text-xs text-white/75 font-medium leading-snug">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
