import { Camera, ImageIcon, Video } from 'lucide-react';
import { cn } from '@/lib/utils';

export type PhotoSlotKind = 'pack' | 'label' | 'texture' | 'beforeAfter' | 'video' | 'apply';

type Props = {
  locale: 'ar' | 'en';
  kind: PhotoSlotKind;
  /** Short title shown large — e.g. "Week 0" */
  title?: string;
  hint?: string;
  aspect?: 'square' | 'portrait' | 'landscape' | 'video';
  className?: string;
};

const KIND_COPY: Record<
  PhotoSlotKind,
  { ar: string; en: string; icon: 'camera' | 'image' | 'video' }
> = {
  pack: { ar: 'صورة العبوة', en: 'Pack shot', icon: 'image' },
  label: { ar: 'لصيقة التركيز %', en: 'Label with % close-up', icon: 'camera' },
  texture: { ar: 'قطرة التكستشر', en: 'Texture drop', icon: 'camera' },
  beforeAfter: { ar: 'قبل / بعد', en: 'Before / after', icon: 'image' },
  video: { ar: 'فيديو التطبيق', en: 'Apply video 15–25s', icon: 'video' },
  apply: { ar: 'خطوة التطبيق', en: 'Apply still', icon: 'camera' },
};

const ASPECT = {
  square: 'aspect-square',
  portrait: 'aspect-[3/4]',
  landscape: 'aspect-[4/3]',
  video: 'aspect-[9/16] max-h-[420px]',
};

/**
 * Local-only layout slot — shows where a real photo/video will go.
 * Replace by passing a real src to the parent gallery / section later.
 */
export function PhotoSlotPlaceholder({
  locale,
  kind,
  title,
  hint,
  aspect = 'portrait',
  className,
}: Props) {
  const copy = KIND_COPY[kind];
  const Icon = copy.icon === 'video' ? Video : copy.icon === 'camera' ? Camera : ImageIcon;
  const label = copy[locale];

  return (
    <div
      className={cn(
        'relative w-full overflow-hidden rounded-[1.25rem] border-2 border-dashed border-[#C4B8A8] bg-[#F7F3EA]',
        ASPECT[aspect],
        className,
      )}
      role="img"
      aria-label={title ? `${label} — ${title}` : label}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 px-4 text-center">
        <div className="w-11 h-11 rounded-full bg-white border border-[#E8E3DC] flex items-center justify-center">
          <Icon size={18} className="text-[#134E3A]" strokeWidth={2} />
        </div>
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#8A7F72]">
          {locale === 'ar' ? 'مكان الصورة · محلي' : 'Photo slot · local'}
        </p>
        {title ? (
          <p className="text-sm md:text-base font-extrabold text-[#134E3A] leading-snug">{title}</p>
        ) : null}
        <p className="text-xs md:text-sm font-bold text-[#222222] leading-snug max-w-[16rem]">
          {label}
        </p>
        {hint ? (
          <p className="text-[11px] text-[#5A6B5C] leading-relaxed max-w-[18rem]">{hint}</p>
        ) : null}
      </div>
    </div>
  );
}
