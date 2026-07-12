import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

type LogoProps = {
  locale: string;
  className?: string;
  /** Icon-only mark (no wordmark) */
  markOnly?: boolean;
};

export function Logo({ locale, className, markOnly = false }: LogoProps) {
  return (
    <Link
      href={`/${locale}`}
      className={cn('flex items-center gap-2.5 group', className)}
      aria-label="Skinouva"
    >
      <Image
        src="/brand/logo.png"
        alt="Skinouva"
        width={48}
        height={48}
        className="w-10 h-10 md:w-11 md:h-11 object-contain flex-shrink-0"
        priority
      />
      {!markOnly ? (
        <div className="flex flex-col leading-none">
          <span className="font-arabic text-ink font-extrabold text-base tracking-tight">سكينوفا</span>
          <span className="font-sans text-taupe text-[10px] uppercase tracking-[0.18em] mt-0.5">
            Skinouva · UAE
          </span>
        </div>
      ) : null}
    </Link>
  );
}
