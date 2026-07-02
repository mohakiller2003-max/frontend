'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

type Props = { className?: string };

export function LanguageSwitcher({ className }: Props) {
  const locale = useLocale();
  const t = useTranslations('lang');
  const pathname = usePathname();
  const router = useRouter();

  const targetLocale = locale === 'ar' ? 'en' : 'ar';

  const handleSwitch = () => {
    // Replace current locale prefix with target locale
    const newPath = pathname.replace(/^\/(ar|en)/, `/${targetLocale}`);
    document.cookie = `NEXT_LOCALE=${targetLocale};path=/;max-age=31536000`;
    router.push(newPath);
  };

  return (
    <button
      onClick={handleSwitch}
      className={cn(
        'flex items-center gap-1 px-3 py-1.5 rounded-pill border border-sand text-mocha text-sm font-medium hover:border-taupe hover:bg-pearl transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-rose focus:ring-offset-1',
        className
      )}
      aria-label={`Switch to ${targetLocale === 'ar' ? 'Arabic' : 'English'}`}
    >
      <span className={locale === 'ar' ? 'font-arabic' : 'font-sans'}>
        {t('current')}
      </span>
      <span className="text-taupe mx-0.5">|</span>
      <span className={targetLocale === 'ar' ? 'font-arabic' : 'font-sans text-taupe'}>
        {t('switch')}
      </span>
    </button>
  );
}
