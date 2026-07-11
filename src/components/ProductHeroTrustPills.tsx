import { Clock, Droplets, RotateCcw, Truck } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ProductTheme } from '@/lib/productTheme';

type Props = {
  locale: 'ar' | 'en';
  theme: ProductTheme;
};

export function ProductHeroTrustPills({ locale, theme }: Props) {
  const ar = locale === 'ar';
  const items = [
    { icon: Droplets, value: '30', label: ar ? 'مل في الزجاجة' : 'ml per bottle' },
    { icon: Clock, value: '30', label: ar ? 'يوم لكل زجاجة' : 'days per bottle' },
    { icon: Truck, value: 'COD', label: ar ? 'كل الإمارات' : 'All UAE' },
    { icon: RotateCcw, value: '30', label: ar ? 'يوم ضمان' : 'day guarantee' },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 max-w-6xl mx-auto px-4 md:px-6">
      {items.map(({ icon: Icon, value, label }) => (
        <div
          key={label}
          className={cn('glass-card p-4 md:p-5 text-center', theme.accentMuted)}
        >
          <Icon size={18} className={cn('mx-auto mb-2', theme.accent)} />
          <p className="font-extrabold text-ink text-lg md:text-xl">{value}</p>
          <p className="text-[11px] text-taupe font-semibold mt-1">{label}</p>
        </div>
      ))}
    </div>
  );
}
