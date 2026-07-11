import { FlaskConical, RotateCcw, ShieldCheck, Truck } from 'lucide-react';

type Props = {
  locale: 'ar' | 'en';
};

export function HomeTrustPills({ locale }: Props) {
  const ar = locale === 'ar';
  const items = [
    {
      icon: FlaskConical,
      value: ar ? 'تركيز واضح' : 'Clear dose',
      label: ar ? 'على العبوة' : 'on the label',
    },
    {
      icon: Truck,
      value: 'COD',
      label: ar ? 'كل الإمارات' : 'All UAE',
    },
    {
      icon: ShieldCheck,
      value: ar ? 'مبرد' : 'VIP',
      label: ar ? 'شحن 24-48س' : '24–48h ship',
    },
    {
      icon: RotateCcw,
      value: '30',
      label: ar ? 'يوم ضمان' : 'day guarantee',
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-10 max-w-4xl mx-auto lg:mx-0">
      {items.map(({ icon: Icon, value, label }) => (
        <div key={label} className="glass-card p-4 text-center">
          <Icon size={18} className="mx-auto mb-2 text-gold" />
          <p className="font-extrabold text-ink text-base md:text-lg leading-tight">{value}</p>
          <p className="text-[11px] text-taupe font-semibold mt-1">{label}</p>
        </div>
      ))}
    </div>
  );
}
