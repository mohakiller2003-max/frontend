import { cn } from '@/lib/utils';

type ImagePlaceholderProps = {
  className?: string;
  label?: string;
  aspect?: 'square' | 'portrait' | 'landscape';
  variant?: 'serum' | 'hero' | 'lifestyle';
};

const GRADIENTS = {
  serum: 'from-pearl via-sand to-ivory',
  hero: 'from-ivory via-pearl to-sand',
  lifestyle: 'from-sand via-ivory to-pearl',
};

export function ImagePlaceholder({
  className,
  label,
  aspect = 'square',
  variant = 'serum',
}: ImagePlaceholderProps) {
  const aspectClasses = {
    square: 'aspect-square',
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[4/3]',
  };

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-card-lg bg-gradient-to-br',
        GRADIENTS[variant],
        aspectClasses[aspect],
        className
      )}
      role="img"
      aria-label={label || 'Product image placeholder'}
    >
      {/* Decorative serum bottle shape */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <div className="w-16 h-32 rounded-t-full rounded-b-lg bg-white/40 border border-white/60 shadow-soft" />
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-4 rounded-t-full bg-rose/20 border border-rose/30" />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-10 h-0.5 bg-taupe/30 rounded-full" />
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-taupe/20 rounded-full" />
        </div>
      </div>
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-sand/20 to-transparent" />
    </div>
  );
}
