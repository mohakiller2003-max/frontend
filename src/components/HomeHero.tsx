import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, FlaskConical, RotateCcw, ShieldCheck, Truck } from 'lucide-react';
import type { Product } from '@/data/products';
import { cn } from '@/lib/utils';

type Props = {
  locale: 'ar' | 'en';
  badge: string;
  headline: string;
  subheadline: string;
  cta: string;
  guaranteeLine: string;
  imageBadge: string;
  products: [Product, Product];
};

/** Nama-style home hero */
export function HomeHero({
  locale,
  badge,
  headline,
  subheadline,
  cta,
  guaranteeLine,
  imageBadge,
  products,
}: Props) {
  const ar = locale === 'ar';
  const [txa, azelaic] = products;

  const trustBoxes = [
    {
      title: ar ? 'تركيز واضح' : 'Clear dose',
      desc: ar ? 'على العبوة' : 'On the label',
      icon: FlaskConical,
    },
    {
      title: 'COD',
      desc: ar ? 'كل الإمارات' : 'All UAE',
      icon: Truck,
    },
    {
      title: ar ? 'شحن مبرد' : 'Cooled',
      desc: '24–48h',
      icon: ShieldCheck,
    },
    {
      title: ar ? '30 يوم' : '30 days',
      desc: ar ? 'ضمان استرجاع' : 'Money-back',
      icon: RotateCcw,
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#F7F3EC] pt-6 pb-16 md:pt-32 md:pb-24">
      <div className="pointer-events-none absolute top-20 start-[8%] w-[420px] h-[420px] rounded-full bg-[#E8DFD2]/80 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 end-[5%] w-[380px] h-[380px] rounded-full bg-[#EDE6DC] blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
          {/* Copy */}
          <div className="order-2 lg:order-1 text-center lg:text-start">
            <span className="inline-block text-[11px] md:text-xs font-semibold text-taupe bg-white/70 border border-sand/80 px-3.5 py-1.5 rounded-full mb-5">
              {badge}
            </span>

            <h1 className="text-[1.9rem] md:text-[2.65rem] lg:text-[2.85rem] font-extrabold text-ink leading-[1.18] mb-4">
              {headline}
            </h1>

            <p className="text-taupe text-sm md:text-[15px] leading-relaxed mb-6 max-w-lg mx-auto lg:mx-0">
              {subheadline}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-7 max-w-lg mx-auto lg:max-w-none lg:mx-0">
              {trustBoxes.map(({ title, desc, icon: Icon }) => (
                <div
                  key={title}
                  className="bg-white border border-[#E5DED4] rounded-xl px-2 py-3 text-center"
                >
                  <Icon size={15} className="mx-auto mb-1.5 text-[#2F4A3E]" strokeWidth={2} />
                  <p className="font-extrabold text-ink text-[11px] md:text-xs leading-tight">{title}</p>
                  <p className="text-[9px] md:text-[10px] text-taupe mt-0.5 leading-tight">{desc}</p>
                </div>
              ))}
            </div>

            {/* Nama: CTA (start/right) + guarantee pill beside it */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 max-w-lg mx-auto lg:max-w-none lg:mx-0 sm:justify-start">
              <Link
                href={`/${locale}#products`}
                className="inline-flex items-center justify-center gap-2 bg-ink text-ivory font-bold text-sm md:text-base px-7 py-3.5 rounded-xl hover:bg-ink/90 transition-colors w-full sm:w-auto"
              >
                {cta}
                <ChevronRight className={cn('w-4 h-4', ar && 'rotate-180')} />
              </Link>
              <span className="inline-flex items-center justify-center gap-1.5 text-[11px] font-bold text-ink bg-[#F0E6D8] border border-[#E5D5C0] px-3.5 py-2.5 rounded-full whitespace-nowrap">
                <RotateCcw size={12} className="text-[#8B6914]" />
                {guaranteeLine}
              </span>
            </div>
          </div>

          {/* Visual — one framed composition */}
          <div className="order-1 lg:order-2 relative pb-4">
            <div className="relative rounded-[1.75rem] bg-white border border-[#E5DED4] shadow-[0_12px_40px_rgba(40,30,20,0.08)] overflow-hidden">
              <div className="pt-6 pb-2 text-center">
                <p className="text-base md:text-lg font-extrabold text-ink tracking-wide">
                  {ar ? 'سكينوفا' : 'Skinouva'}
                </p>
                <p className="text-[11px] text-taupe font-medium mt-0.5">
                  {ar ? 'مختبر بشرة الإمارات' : 'UAE skin lab'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 px-5 md:px-8 pb-8 pt-2">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-to-b from-blush-light to-[#F8F0EC]">
                  <Image
                    src={txa.imageUrl}
                    alt={txa.name[locale]}
                    fill
                    className="object-contain p-3"
                    priority
                    sizes="(max-width: 1024px) 45vw, 280px"
                  />
                </div>
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-to-b from-mint-light to-[#EEF6F3]">
                  <Image
                    src={azelaic.imageUrl}
                    alt={azelaic.name[locale]}
                    fill
                    className="object-contain p-3"
                    priority
                    sizes="(max-width: 1024px) 45vw, 280px"
                  />
                </div>
              </div>
            </div>

            {/* Floating badge — overlaps bottom corner like Nama */}
            <div className="absolute bottom-0 end-3 md:end-5 z-20 bg-white border border-[#E5DED4] rounded-xl px-3 py-2.5 shadow-[0_8px_24px_rgba(40,30,20,0.1)] flex items-center gap-2 max-w-[240px]">
              <span className="w-7 h-7 rounded-lg bg-[#E8F5EF] flex items-center justify-center shrink-0">
                <ShieldCheck size={15} className="text-[#2F6B4F]" />
              </span>
              <p className="text-[10px] md:text-[11px] font-bold text-ink leading-snug">{imageBadge}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
