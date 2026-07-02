import Link from 'next/link';
import { cn } from '@/lib/utils';

type LogoProps = {
  locale: string;
  className?: string;
};

export function Logo({ locale, className }: LogoProps) {
  return (
    <Link
      href={`/${locale}`}
      className={cn('flex items-center gap-3 group', className)}
      aria-label="Skinouva"
    >
      {/* Logo mark */}
      <div className="w-10 h-10 rounded-full bg-rose flex items-center justify-center shadow-soft flex-shrink-0 group-hover:bg-mocha transition-colors duration-200">
        <span className="text-ivory font-bold text-lg leading-none" aria-hidden="true">S</span>
      </div>
      {/* Brand text lockup */}
      <div className="flex flex-col leading-tight">
        <span className="font-arabic text-mocha font-bold text-lg leading-snug tracking-wide">سكينوفا</span>
        <span className="font-sans text-taupe text-xs uppercase tracking-[0.15em] leading-none">Skinouva</span>
      </div>
    </Link>
  );
}
