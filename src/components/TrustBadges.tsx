import { useTranslations, useLocale } from 'next-intl';
import { ShieldCheck, Truck, Star, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

type TrustBadgesProps = { className?: string; compact?: boolean };

export function TrustBadges({ className, compact = false }: TrustBadgesProps) {
  const t = useTranslations('trust');

  const locale = useLocale();

  const badges = [
    { icon: Zap, label: t('cod'), desc: locale === 'ar' ? 'بدون مخاطرة' : 'No risk' },
    { icon: Truck, label: t('delivery'), desc: locale === 'ar' ? 'خلال 24-48 ساعة' : 'Within 24-48 hours' },
    { icon: ShieldCheck, label: t('secure'), desc: locale === 'ar' ? 'استرداد كامل' : 'Full refund' },
    { icon: Star, label: t('ingredients'), desc: locale === 'ar' ? 'نتائج أسرع' : 'Faster results' },
  ];

  if (compact) {
    return (
      <div className={cn('flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-2 w-full', className)}>
        {badges.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex items-center gap-1.5 text-mocha/80 text-[11px] sm:text-xs"
          >
            <Icon size={14} className="text-gold flex-shrink-0" aria-hidden="true" />
            <span className="font-medium whitespace-nowrap">{label}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn('grid grid-cols-2 md:flex md:flex-wrap md:justify-center gap-3 md:gap-6', className)}>
      {badges.map(({ icon: Icon, label, desc }) => (
        <div
          key={label}
          className="flex flex-col md:flex-row items-center md:items-center gap-2 md:gap-3 bg-white border border-sand/60 shadow-sm hover:border-gold/30 hover:shadow-md transition-all rounded-xl text-mocha p-3 md:px-5 md:py-3 md:min-w-[220px]"
        >
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
            <Icon size={18} className="text-gold md:w-5 md:h-5" aria-hidden="true" />
          </div>
          <div className="flex flex-col text-center md:text-start">
            <span className="font-bold text-[11px] md:text-sm leading-tight">{label}</span>
            <span className="text-[10px] md:text-xs text-taupe font-medium mt-0.5">{desc}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
