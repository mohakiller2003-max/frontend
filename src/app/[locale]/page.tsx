import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { PRODUCTS } from '@/data/products';
import { SectionShell } from '@/components/SectionShell';
import { ProductCard } from '@/components/ProductCard';
import { ReviewCard } from '@/components/ReviewCard';
import { FaqAccordion } from '@/components/FaqAccordion';
import { HomeHero } from '@/components/HomeHero';
import {
  ShieldCheck,
  CheckCircle2,
  PhoneCall,
  Truck,
  Sun,
  Wind,
  FlaskConical,
  Leaf,
  BadgeCheck,
  ChevronRight,
  Heart,
} from 'lucide-react';

type Props = { params: { locale: string } };

export default async function HomePage({ params: { locale } }: Props) {
  const loc = locale as 'ar' | 'en';

  const faqT = await getTranslations({ locale, namespace: 'faq' });
  const cro = await getTranslations({ locale, namespace: 'homeCro' });

  const faqItems = faqT.raw('items') as { q: string; a: string }[];
  const pillars = cro.raw('pillars.points') as { title: string; desc: string }[];
  const deliverySteps = cro.raw('codExperience.steps') as { step: string; title: string; desc: string }[];

  const txa = PRODUCTS[0];
  const azelaic = PRODUCTS[1];

  const pillarIcons = [BadgeCheck, Leaf, FlaskConical, ShieldCheck];

  const reviews = [
    {
      initials: 'س.ع',
      rating: 5,
      text:
        loc === 'ar'
          ? 'أنا أقرأ كل ingredient label. أغلب البراندات ما تكتب التركيز. سكينوفا أول مرة أشوف ١٥٪ مكتوبة بوضوح — هذا اللي خلاني أثق وأطلب بالدفع عند الباب.'
          : 'I read every ingredient label. Most brands hide the dose. Skinouva was the first time I saw 15% written clearly — that is why I trusted COD.',
      age: loc === 'ar' ? '٣٢ سنة' : '32 yrs',
      city: loc === 'ar' ? 'دبي' : 'Dubai',
      concern: loc === 'ar' ? 'بقع داكنة' : 'Dark spots',
    },
    {
      initials: 'ن.ر',
      rating: 5,
      text:
        loc === 'ar'
          ? 'جربت brands أوروبية غالية — ما ناسبوا حر أبوظبي. آثار الحبوب الهرموني خفّت مع الأزيليك، والدفع عند الاستلام خلاني أجرب بدون خوف.'
          : 'Tried expensive European brands — they failed in Abu Dhabi heat. Hormonal acne marks calmed with Azelaic, and COD let me try without fear.',
      age: loc === 'ar' ? '٢٨ سنة' : '28 yrs',
      city: loc === 'ar' ? 'أبوظبي' : 'Abu Dhabi',
      concern: loc === 'ar' ? 'آثار حبوب' : 'Acne marks',
    },
    {
      initials: 'م.خ',
      rating: 5,
      text:
        loc === 'ar'
          ? 'البقع اللي كانت تبان من تحت الفاونديشن في حر الشارقة — بدأت تخف من أول أسبوعين. ما كنت متوقعة نتيجة من طلب COD.'
          : 'Spots that showed through foundation in Sharjah heat — started fading within two weeks. Did not expect that from a COD order.',
      age: loc === 'ar' ? '٣٥ سنة' : '35 yrs',
      city: loc === 'ar' ? 'الشارقة' : 'Sharjah',
      concern: loc === 'ar' ? 'تصبّغ' : 'Pigmentation',
    },
    {
      initials: 'ل.م',
      rating: 5,
      text:
        loc === 'ar'
          ? 'أخذت الروتين الكامل TXA + Azelaic. بشرتي صارت أوضح وما عاد أحتاج foundation كل يوم. الفريق اتصل عليّ لتأكيد العنوان بسرعة.'
          : 'Took the full TXA + Azelaic routine. Skin looks clearer and I do not need foundation daily. The team called to confirm my address fast.',
      age: loc === 'ar' ? '٣٠ سنة' : '30 yrs',
      city: loc === 'ar' ? 'العين' : 'Al Ain',
      concern: loc === 'ar' ? 'روتين كامل' : 'Full routine',
    },
  ];

  return (
    <>
      <HomeHero
        locale={loc}
        badge={cro('hero.badge')}
        headline={cro('hero.headline')}
        subheadline={cro('hero.subheadline')}
        cta={cro('hero.ctaPrimary')}
        guaranteeLine={
          loc === 'ar' ? 'ضمان استرجاع 30 يوم' : '30-day money-back guarantee'
        }
        imageBadge={
          loc === 'ar'
            ? 'الدفع عند الباب · شحن مبرد لكل الإمارات'
            : 'Pay at the door · cooled shipping UAE-wide'
        }
        products={[txa, azelaic]}
      />

      {/* 3. Product grid — 2 problems + duo */}
      <SectionShell background="transparent" id="products" className="py-20 md:py-28 bg-[#F5F2E9]">
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#134E3A] mb-4">
            {cro('collection.eyebrow')}
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#134E3A] mb-4">
            {cro('collection.headline')}
          </h2>
          <p className="text-lg text-[#5A6B5C]">{cro('collection.subheadline')}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {PRODUCTS.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </SectionShell>

      {/* 4. Why us — 4 authority pillars */}
      <SectionShell background="white" className="py-20 md:py-28" lazy>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14 max-w-3xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#134E3A] mb-4">
              {cro('pillars.eyebrow')}
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#134E3A] mb-4 leading-tight">
              {cro('pillars.headline')}
            </h2>
            <p className="text-lg text-[#5A6B5C]">{cro('pillars.subheadline')}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {pillars.map((point, i) => {
              const Icon = pillarIcons[i] || Sun;
              return (
                <div
                  key={i}
                  className="bg-white border border-[#E8E3DC] rounded-[1.75rem] p-6 md:p-7 h-full shadow-soft"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#134E3A] flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="text-base font-bold text-[#134E3A] mb-3">{point.title}</h3>
                  <p className="text-[#5A6B5C] text-sm leading-relaxed">{point.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="bg-[#134E3A] text-white p-8 md:p-10 rounded-[2rem] text-center max-w-3xl mx-auto shadow-soft">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Wind className="w-5 h-5 text-gold" />
              <Sun className="w-5 h-5 text-gold" />
            </div>
            <p className="text-base md:text-lg leading-relaxed font-medium">
              {cro('pillars.solution')}
            </p>
          </div>
        </div>
      </SectionShell>

      {/* 5. Skeptic reviews */}
      <SectionShell background="transparent" className="py-20 md:py-28 bg-[#F5F2E9]" lazy>
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#134E3A] mb-4">
            {loc === 'ar' ? 'آراء مؤكدة' : 'Confirmed buyers'}
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#134E3A] mb-3">
            {cro('socialProof.headline')}
          </h2>
          <p className="text-[#5A6B5C]">{cro('socialProof.subheadline')}</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {reviews.map((r) => (
            <ReviewCard
              key={r.initials}
              initials={r.initials}
              rating={r.rating}
              text={r.text}
              age={r.age}
              city={r.city}
              concern={r.concern}
              confirmed
              confirmedLabel={loc === 'ar' ? 'مشترية مؤكدة' : 'Confirmed buyer'}
            />
          ))}
        </div>
      </SectionShell>

      {/* 6. COD 3-step */}
      <SectionShell background="white" className="py-20 md:py-28" lazy>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#134E3A] bg-[#134E3A]/10 px-3.5 py-1.5 rounded-full mb-4">
              {cro('codExperience.badge')}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#134E3A] mb-4">
              {cro('codExperience.headline')}
            </h2>
            <p className="text-[#5A6B5C] text-lg">{cro('codExperience.subheadline')}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {deliverySteps.map((step, idx) => {
              const Icons = [CheckCircle2, PhoneCall, Truck];
              const Icon = Icons[idx];
              return (
                <div key={idx} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-[#134E3A] border-[3px] border-gold flex items-center justify-center shadow-soft">
                    <Icon className="w-7 h-7 text-gold" />
                  </div>
                  <span className="text-xs font-bold text-gold">{step.step}</span>
                  <h3 className="font-bold text-lg text-[#134E3A] mt-2 mb-2">{step.title}</h3>
                  <p className="text-sm text-[#5A6B5C] leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </SectionShell>

      {/* 7. Final ritual CTA — Nama style */}
      <section className="relative overflow-hidden bg-[#1A2E28] py-20 md:py-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06)_0%,transparent_65%)]" />
        <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
          <p className="text-[11px] md:text-xs font-bold uppercase tracking-[0.2em] text-gold mb-5">
            {cro('ritual.eyebrow')}
          </p>
          <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-5 leading-tight">
            {cro('ritual.headline')}
          </h2>
          <p className="text-white/75 text-sm md:text-base leading-relaxed mb-9 max-w-xl mx-auto">
            {cro('ritual.body')}
          </p>

          <Link
            href={`/${locale}#products`}
            className="inline-flex items-center justify-center gap-2 bg-[#C4A35A] text-[#1A2E28] font-bold text-sm md:text-base px-9 py-3.5 rounded-full border border-[#D4B86A]/50 shadow-[0_0_0_4px_rgba(196,163,90,0.15)] hover:bg-[#d4b36a] transition-colors"
          >
            {cro('ritual.cta')}
            <ChevronRight className={`w-4 h-4 ${loc === 'ar' ? 'rotate-180' : ''}`} />
          </Link>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-4 mt-12">
            {(
              [
                { icon: FlaskConical, label: loc === 'ar' ? 'تركيز واضح' : 'Clear dose' },
                { icon: Truck, label: loc === 'ar' ? 'شحن مبرد UAE' : 'Cooled UAE ship' },
                { icon: CheckCircle2, label: loc === 'ar' ? 'الدفع عند الباب' : 'Pay at the door' },
                { icon: Heart, label: loc === 'ar' ? 'ضمان 30 يوم' : '30-day guarantee' },
              ] as const
            ).map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-white/85">
                <Icon size={15} className="text-gold shrink-0" />
                <span className="text-xs font-semibold">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FAQ */}
      <SectionShell background="white" className="py-20 md:py-28" lazy>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-extrabold text-ink text-center mb-3">{faqT('title')}</h2>
          <p className="text-center text-taupe mb-10">{faqT('subtitle')}</p>
          <div className="glass-card p-6 md:p-10">
            <FaqAccordion items={faqItems} />
          </div>
        </div>
      </SectionShell>
    </>
  );
}
