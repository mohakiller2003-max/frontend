import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

type ReviewCardProps = {
  initials: string;
  rating: number;
  text: string;
  concern?: string;
  city?: string;
  className?: string;
};

export function ReviewCard({ initials, rating, text, concern, city, className }: ReviewCardProps) {
  return (
    <div className={cn('bg-ivory border border-sand rounded-card p-5 shadow-soft', className)}>
      <div className="flex items-center gap-1 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={14}
            className={i < rating ? 'text-gold fill-gold' : 'text-sand fill-sand'}
            aria-hidden="true"
          />
        ))}
      </div>
      <p className="text-mocha text-sm leading-relaxed mb-3">{text}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-pearl border border-sand flex items-center justify-center">
            <span className="text-xs font-bold text-taupe">{initials}</span>
          </div>
          {city && <span className="text-xs text-taupe">{city}</span>}
        </div>
        {concern && (
          <span className="text-xs text-taupe bg-pearl px-2 py-0.5 rounded-pill">{concern}</span>
        )}
      </div>
    </div>
  );
}
