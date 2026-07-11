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
      className={cn('flex items-center gap-2.5 group', className)}
      aria-label="Skinouva"
    >
      <div className="w-9 h-9 rounded-xl bg-ink flex items-center justify-center shadow-soft flex-shrink-0 group-hover:bg-mocha transition-colors duration-200">
        <span className="text-ivory font-extrabold text-base leading-none" aria-hidden="true">S</span>
      </div>
      <div className="flex flex-col leading-none">
        <span className="font-arabic text-ink font-extrabold text-base tracking-tight">سكينوفا</span>
        <span className="font-sans text-taupe text-[10px] uppercase tracking-[0.18em] mt-0.5">Skinouva · UAE</span>
      </div>
    </Link>
  );
}
