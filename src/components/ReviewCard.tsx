import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

type ReviewCardProps = {
  initials: string;
  rating: number;
  text: string;
  name?: string;
  concern?: string;
  city?: string;
  age?: string;
  confirmed?: boolean;
  confirmedLabel?: string;
  className?: string;
};

export function ReviewCard({
  initials,
  rating,
  text,
  name,
  concern,
  city,
  age,
  confirmed,
  confirmedLabel,
  className,
}: ReviewCardProps) {
  const avatarLetter = (name?.trim()?.[0] || initials?.[0] || '?').toUpperCase();

  return (
    <div
      className={cn(
        'bg-white border border-sand/80 rounded-[1.25rem] p-6 md:p-7 shadow-soft h-full flex flex-col',
        className,
      )}
    >
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={13}
              className={i < rating ? 'text-gold fill-gold' : 'text-sand fill-sand'}
              aria-hidden="true"
            />
          ))}
        </div>
        {confirmed && confirmedLabel && (
          <span className="text-[10px] font-bold uppercase tracking-wide text-success bg-success/10 px-2 py-0.5 rounded-full shrink-0">
            {confirmedLabel}
          </span>
        )}
      </div>

      <p className="text-ink text-sm md:text-[15px] leading-relaxed mb-6 flex-1">&ldquo;{text}&rdquo;</p>

      <div className="flex items-center gap-3 pt-4 border-t border-sand/60">
        <div className="w-10 h-10 rounded-full bg-pearl border border-sand flex items-center justify-center shrink-0">
          <span className="text-sm font-bold text-ink">{avatarLetter}</span>
        </div>
        <div className="min-w-0">
          {name && <p className="text-sm font-extrabold text-ink truncate">{name}</p>}
          {(age || city) && (
            <p className="text-xs font-semibold text-taupe truncate">
              {[age, city].filter(Boolean).join(' · ')}
            </p>
          )}
          {!name && concern && <p className="text-[11px] text-taupe truncate">{concern}</p>}
          {name && concern && <p className="text-[11px] text-taupe truncate mt-0.5">{concern}</p>}
        </div>
      </div>
    </div>
  );
}
