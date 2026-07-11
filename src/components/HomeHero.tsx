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

const HERO_DUO_IMAGE = '/products/hero-duo.png';

/** Nama-style home hero — one duo product photo */
export function HomeHero({
  locale,
  badge,
  headline,
  subheadline,
  cta,
  guaranteeLine,
  imageBadge,
}: Props) {
  const ar = locale === 'ar';

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
    <section className="relative overflow-hidden bg-[#F5F2E9] pt-6 pb-16 md:pt-32 md:pb-24">
      <div className="pointer-events-none absolute top-20 start-[8%] w-[420px] h-[420px] rounded-full bg-[#E8DFD2]/80 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 end-[5%] w-[380px] h-[380px] rounded-full bg-[#EDE6DC] blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
          {/* Copy */}
          <div className="order-2 lg:order-1 text-center lg:text-start">
            <span className="inline-block text-[11px] md:text-xs font-semibold text-[#5A6B5C] bg-white/70 border border-[#E8E3DC] px-3.5 py-1.5 rounded-full mb-5">
              {badge}
            </span>

            <h1 className="text-[1.9rem] md:text-[2.65rem] lg:text-[2.85rem] font-extrabold text-[#134E3A] leading-[1.18] mb-4">
              {headline}
            </h1>

            <p className="text-[#5A6B5C] text-sm md:text-[15px] leading-relaxed mb-6 max-w-lg mx-auto lg:mx-0">
              {subheadline}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-7 max-w-lg mx-auto lg:max-w-none lg:mx-0">
              {trustBoxes.map(({ title, desc, icon: Icon }) => (
                <div
                  key={title}
                  className="bg-white border border-[#E8E3DC] rounded-xl px-2 py-3 text-center"
                >
                  <Icon size={15} className="mx-auto mb-1.5 text-[#134E3A]" strokeWidth={2} />
                  <p className="font-extrabold text-[#134E3A] text-[11px] md:text-xs leading-tight">
                    {title}
                  </p>
                  <p className="text-[9px] md:text-[10px] text-[#5A6B5C] mt-0.5 leading-tight">
                    {desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 max-w-lg mx-auto lg:max-w-none lg:mx-0 sm:justify-start">
              <Link
                href={`/${locale}#products`}
                className="inline-flex items-center justify-center gap-2 bg-[#134E3A] text-white font-bold text-sm md:text-base px-7 py-3.5 rounded-xl hover:bg-[#0F3D2D] transition-colors w-full sm:w-auto"
              >
                {cta}
                <ChevronRight className={cn('w-4 h-4', ar && 'rotate-180')} />
              </Link>
              <span className="inline-flex items-center justify-center gap-1.5 text-[11px] font-bold text-[#134E3A] bg-white border border-[#E8E3DC] px-3.5 py-2.5 rounded-full whitespace-nowrap">
                <RotateCcw size={12} className="text-gold" />
                {guaranteeLine}
              </span>
            </div>
          </div>

          {/* One duo photo — both products together */}
          <div className="order-1 lg:order-2 relative pb-4">
            <div className="relative rounded-[1.75rem] bg-white border border-[#E8E3DC] shadow-soft overflow-hidden">
              <div className="relative w-full aspect-[4/5] md:aspect-square">
                <Image
                  src={HERO_DUO_IMAGE}
                  alt={ar ? 'سكينوفا — السيرومان معاً' : 'Skinouva — both serums together'}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 560px"
                />
              </div>
            </div>

            <div className="absolute bottom-0 end-3 md:end-5 z-20 bg-white border border-[#E8E3DC] rounded-xl px-3 py-2.5 shadow-soft flex items-center gap-2 max-w-[240px]">
              <span className="w-7 h-7 rounded-lg bg-[#134E3A] flex items-center justify-center shrink-0">
                <ShieldCheck size={15} className="text-gold" />
              </span>
              <p className="text-[10px] md:text-[11px] font-bold text-[#134E3A] leading-snug">
                {imageBadge}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
