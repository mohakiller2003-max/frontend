import { Clock, Droplets, RotateCcw, Truck } from 'lucide-react';

type Props = { locale: 'ar' | 'en' };

export function ProductHeroTrustPills({ locale }: Props) {
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
          className="bg-white border border-sand rounded-2xl p-4 md:p-5 text-center shadow-soft"
        >
          <Icon size={20} className="mx-auto text-mocha mb-2" />
          <p className="font-black text-mocha text-lg md:text-xl">{value}</p>
          <p className="text-xs text-taupe font-semibold mt-1">{label}</p>
        </div>
      ))}
    </div>
  );
}
