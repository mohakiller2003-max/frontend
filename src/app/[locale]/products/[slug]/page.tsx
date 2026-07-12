import { getProductBySlug, PRODUCTS } from '@/data/products';
import { SectionShell } from '@/components/SectionShell';
import { FaqAccordion } from '@/components/FaqAccordion';
import { ProductOfferSection } from './ProductOfferSection';
import { CrossSellSection } from './CrossSellSection';
import { ProductRatingBar } from '@/components/ProductRatingBar';
import { ProductViewPixel } from '@/components/ProductViewPixel';
import { PainAgitationSection } from '@/components/PainAgitationSection';
import { ProductSocialProofBar } from '@/components/ProductSocialProofBar';
import { ProductHowToSection } from '@/components/ProductHowToSection';
import { ClinicalIngredientsSection } from '@/components/ClinicalIngredientsSection';
import { AuthorityCredibilitySection } from '@/components/AuthorityCredibilitySection';
import { RealExperiencesSection } from '@/components/RealExperiencesSection';
import { GuaranteeSection } from '@/components/GuaranteeSection';
import { ResultsTimelineSection } from '@/components/ResultsTimelineSection';
import { getProductTheme } from '@/lib/productTheme';
import { cn } from '@/lib/utils';
import {
  CheckCircle2,
  ShieldCheck,
  FlaskConical,
  XCircle,
  Truck,
  RotateCcw,
  Banknote,
} from 'lucide-react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

type Props = { params: { locale: string; slug: string } };

export async function generateStaticParams() {
  return PRODUCTS.flatMap((p) => [
    { locale: 'ar', slug: p.slug.ar },
    { locale: 'en', slug: p.slug.en },
  ]);
}

export default async function ProductPage({ params: { locale, slug } }: Props) {
  const loc = locale as 'ar' | 'en';
  const product = getProductBySlug(slug, loc);
  if (!product) notFound();

  const t = await getTranslations({ locale, namespace: 'product' });
  const offersT = await getTranslations({ locale, namespace: 'offers' });
  const croShared = await getTranslations({ locale, namespace: 'productCro' });
  const faqT = await getTranslations({ locale, namespace: 'faq' });
  const guarT = await getTranslations({ locale, namespace: 'guarantee' });

  const cro = product.cro;
  const faqProductItems = (faqT.raw('productItems') as { q: string; a: string }[]) || [];
  const faqShippingItems = (faqT.raw('shippingItems') as { q: string; a: string }[]) || [];
  const faqItems = (faqT.raw('items') as { q: string; a: string }[]) || [];
  const productFaq = faqProductItems.length ? faqProductItems : faqItems.slice(0, 4);
  const shippingFaq = faqShippingItems.length ? faqShippingItems : faqItems.slice(4);

  const compareClinics = croShared.raw('compareClinics') as { title: string; price: string; points: string[] };
  const compareCheap = croShared.raw('compareCheap') as { title: string; price: string; points: string[] };
  const compareUs = croShared.raw('compareUs') as { title: string; price: string; points: string[] };
  const noNasties = croShared.raw('noNasties') as string[];
  const deliverySteps = croShared.raw('deliverySteps') as { title: string; desc: string }[];
  const deliveryEmirates = croShared.raw('deliveryEmirates') as string[];

  const compProduct = PRODUCTS.find((p) => p.id === product.complementaryId);
  const theme = getProductTheme(product);
  const isTxa = product.id === 'tranexamic-niacinamide-serum';
  const doseLabel = isTxa
    ? loc === 'ar'
      ? '15% ترانيكساميك'
      : '15% TXA'
    : loc === 'ar'
      ? '16% أزيليك'
      : '16% Azelaic';

  const heroTrust = [
    { icon: FlaskConical, label: loc === 'ar' ? '30 مل' : '30 ml' },
    { icon: Banknote, label: 'COD' },
    { icon: Truck, label: loc === 'ar' ? '24–48س' : '24–48h' },
    { icon: RotateCcw, label: loc === 'ar' ? '30 يوم' : '30 days' },
  ];

  return (
    <div key={product.id}>
      <ProductViewPixel productId={product.id} valueAed={199} />

      {/* HERO — cold traffic lands here */}
      <section className={cn('bg-gradient-to-b pt-4 pb-8 md:pt-8 md:pb-12 overflow-hidden', theme.heroGradient)}>
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 items-start" dir="ltr">
            {/* Image + trust pills under it (Nama layout) */}
            <div className="order-1 md:order-2 md:sticky md:top-24 space-y-3">
              <div
                className={cn(
                  'relative w-full aspect-[3/4] max-h-[640px] rounded-[1.5rem] border overflow-hidden bg-white',
                  isTxa ? 'border-blush-accent/25' : 'border-mint-accent/25',
                )}
              >
                <Image
                  src={product.pdpImageUrl || product.imageUrl}
                  alt={product.name[loc]}
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="(max-width: 768px) 100vw, 480px"
                />
                <div className="absolute top-3 end-3 z-10 bg-white px-2.5 py-1 rounded-full border border-sand shadow-soft flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-gold" />
                  <span className="text-[10px] font-bold text-mocha">
                    {loc === 'ar' ? 'ضمان ٣٠ يوم' : '30-day guarantee'}
                  </span>
                </div>
              </div>

              {/* 4 trust pills under image — Nama style */}
              <div className="grid grid-cols-4 gap-1.5" dir={loc === 'ar' ? 'rtl' : 'ltr'}>
                {heroTrust.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center justify-center gap-1 rounded-xl bg-white border border-sand px-1 py-2.5 text-center min-h-[64px]"
                  >
                    <Icon size={14} className="text-gold shrink-0" />
                    <span className="text-[9px] md:text-[10px] font-bold text-mocha leading-tight">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col order-2 md:order-1" dir={loc === 'ar' ? 'rtl' : 'ltr'}>
              <span
                className={cn(
                  'inline-flex self-start items-center gap-2 text-[11px] font-bold tracking-wide px-3 py-1 rounded-full mb-2.5 border',
                  theme.accentMuted,
                  isTxa ? 'border-blush-accent/20 text-blush-accent' : 'border-mint-accent/20 text-mint-accent',
                )}
              >
                <Truck className="w-3.5 h-3.5" />
                {product.heroBadge[loc]}
              </span>

              <h1 className="text-[1.55rem] md:text-[1.85rem] lg:text-[2.1rem] font-extrabold text-ink mb-3 md:mb-2.5 leading-[1.25] tracking-tight">
                {product.heroHeadline[loc]}
              </h1>
              <p className="text-taupe text-[0.9rem] md:text-[0.95rem] leading-relaxed mb-4 md:mb-3 font-medium">
                {product.subheadline[loc]}
              </p>

              <ProductRatingBar
                locale={loc}
                rating={product.ratingPlaceholder}
                reviewCount={product.reviewCountPlaceholder}
                confirmedLabel={offersT('confirmedReviews')}
                priceLabel={offersT('priceFromBottle', {
                  price: loc === 'ar' ? '199 د.ا' : '199 AED',
                })}
              />

              <div className="mt-1 md:mt-0">
                <ProductOfferSection product={product} locale={loc} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProductSocialProofBar
        locale={loc}
        rating={product.ratingPlaceholder}
        reviewCount={product.reviewCountPlaceholder}
      />

      {/* Pain + regional stat */}
      <SectionShell background="pearl" className="py-14 md:py-20" lazy>
        <PainAgitationSection
          eyebrow={cro.painEyebrow[loc]}
          headline={cro.painHeadline[loc]}
          subheadline={cro.painSub[loc]}
          quotes={cro.painQuotes}
          statNumber={cro.statNumber[loc]}
          statText={cro.stat[loc]}
          statSource={cro.statSource[loc]}
          imageUrl={product.painImageUrl}
          productImageUrl={product.imageUrl}
          doseLabel={doseLabel}
          imageAlt={product.name[loc]}
          theme={theme}
          locale={loc}
        />
      </SectionShell>

      {/* Ingredients — Nama style (cream + forest green) */}
      <SectionShell background="transparent" className="py-14 md:py-20 bg-[#F2EFDF]" lazy>
        <ClinicalIngredientsSection
          product={product}
          locale={loc}
          theme={theme}
          noNasties={noNasties}
          noNastiesHeadline={croShared('noNastiesHeadline')}
          useLabelPlaceholder={false}
        />
      </SectionShell>

      {/* Authority & credibility — Nama style, UAE-adapted */}
      <SectionShell background="white" className="py-14 md:py-20" lazy>
        <AuthorityCredibilitySection
          locale={loc}
          theme={theme}
          expertQuote={cro.expertQuote[loc]}
          expertTitle={cro.expertTitle[loc]}
          rating={product.ratingPlaceholder}
          reviewCount={product.reviewCountPlaceholder}
          doseLabel={doseLabel}
        />
      </SectionShell>

      {/* Timeline — Nama horizontal results */}
      <SectionShell background="transparent" className="py-14 md:py-20 bg-[#F5F2E9]" lazy>
        <ResultsTimelineSection
          locale={loc}
          badge={loc === 'ar' ? 'النتيجة من الزجاجة الأولى' : 'Results from the first bottle'}
          headline={cro.timelineHeadline[loc]}
          subheadline={cro.timelineSub[loc]}
          steps={cro.timeline}
          nudge={cro.timelineBundleNudge[loc]}
          photoSlots={
            isTxa
              ? [
                  {
                    title: { ar: 'الأسبوع ٠', en: 'Week 0' },
                    hint: { ar: '', en: '' },
                    src: '/products/timeline-txa-w0-v2.png',
                    alt:
                      loc === 'ar'
                        ? 'قبل البدء — بقع داكنة ظاهرة'
                        : 'Before starting — visible dark spots',
                  },
                  {
                    title: { ar: 'الأسبوع ٢', en: 'Week 2' },
                    hint: { ar: '', en: '' },
                    src: '/products/timeline-txa-w2-v2.png',
                    alt:
                      loc === 'ar'
                        ? 'بعد أسبوعين — البقع تبدأ تفكّ'
                        : 'Week 2 — spots starting to soften',
                  },
                  {
                    title: { ar: 'الأسبوع ٤', en: 'Week 4' },
                    hint: { ar: '', en: '' },
                    src: '/products/timeline-txa-w4-v2.png',
                    alt:
                      loc === 'ar'
                        ? 'نهاية الزجاجة — فرق أوضح'
                        : 'End of bottle — clearer difference',
                  },
                ]
              : [
                  {
                    title: { ar: 'الأسبوع ٠', en: 'Week 0' },
                    hint: { ar: '', en: '' },
                    src: '/products/timeline-az-w0-v2.png',
                    alt:
                      loc === 'ar'
                        ? 'قبل البدء — حبوب وآثار ظاهرة'
                        : 'Before starting — breakouts and marks visible',
                  },
                  {
                    title: { ar: 'الأسبوع ٢', en: 'Week 2' },
                    hint: { ar: '', en: '' },
                    src: '/products/timeline-az-w2-v2.png',
                    alt:
                      loc === 'ar'
                        ? 'بعد أسبوعين — بشرة أهدى وآثار أخف'
                        : 'Week 2 — calmer skin, lighter marks',
                  },
                  {
                    title: { ar: 'الأسبوع ٤', en: 'Week 4' },
                    hint: { ar: '', en: '' },
                    src: '/products/timeline-az-w4-v2.png',
                    alt:
                      loc === 'ar'
                        ? 'نهاية الزجاجة — دورة أوضح'
                        : 'End of bottle — clearer cycle',
                  },
                ]
          }
        />
      </SectionShell>

      {/* Real experiences — before compare */}
      <SectionShell background="white" className="py-14 md:py-20" lazy>
        <RealExperiencesSection
          locale={loc}
          reviews={product.reviews}
          concern={product.concern[loc]}
          eyebrow={croShared('realExperiencesEyebrow')}
          headline={croShared('realExperiencesHeadline')}
          subheadline={croShared('realExperiencesSubheadline')}
          confirmedLabel={croShared('confirmedBadge')}
        />
      </SectionShell>

      {/* Compare */}
      <SectionShell background="ivory" className="py-14 md:py-20" lazy>
        <div className="max-w-4xl mx-auto text-center mb-10">
          <h2 className="text-2xl md:text-4xl font-extrabold text-ink mb-3">{croShared('compareHeadline')}</h2>
          <p className="text-taupe">{croShared('compareSub')}</p>
        </div>
        <div className="max-w-5xl mx-auto overflow-x-auto pb-2 -mx-4 px-4 md:mx-auto md:px-0 md:overflow-visible">
          <div className="grid grid-cols-3 gap-3 md:gap-5 min-w-[680px] md:min-w-0 items-stretch">
            <div className="bg-sand/15 border border-sand rounded-2xl p-4 md:p-6 opacity-75">
              <h3 className="font-bold text-sm md:text-base text-mocha mb-2">{compareClinics.title}</h3>
              <p className="text-red-500 font-bold text-sm mb-4">{compareClinics.price}</p>
              <ul className="space-y-3">
                {compareClinics.points.map((pt, i) => (
                  <li key={i} className="flex gap-2 text-xs md:text-sm text-taupe">
                    <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-sand/15 border border-sand rounded-2xl p-4 md:p-6 opacity-75">
              <h3 className="font-bold text-sm md:text-base text-mocha mb-2">{compareCheap.title}</h3>
              <p className="text-red-500 font-bold text-sm mb-4">{compareCheap.price}</p>
              <ul className="space-y-3">
                {compareCheap.points.map((pt, i) => (
                  <li key={i} className="flex gap-2 text-xs md:text-sm text-taupe">
                    <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-ink border-2 border-gold rounded-2xl p-4 md:p-6 relative z-10 md:scale-105 shadow-glow">
              <div className="absolute -top-2.5 end-3 bg-gold text-ink text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                {loc === 'ar' ? 'الأفضل' : 'BEST'}
              </div>
              <h3 className="font-bold text-base md:text-lg text-ivory mb-2">{compareUs.title}</h3>
              <p className="text-gold font-extrabold text-sm mb-4">{compareUs.price}</p>
              <ul className="space-y-3">
                {cro.compareUsPoints.map((pt, i) => (
                  <li key={i} className="flex gap-2 text-xs md:text-sm text-ivory">
                    <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                    {pt[loc]}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </SectionShell>

      {/* Guarantee — Nama style */}
      <SectionShell background="white" className="py-14 md:py-20" lazy>
        <GuaranteeSection
          badge={guarT('badge')}
          headline={guarT('headline')}
          body={guarT('body')}
          steps={(guarT.raw('steps') as { title: string; desc: string; icon: 'phone' | 'package' | 'shield' }[])}
        />
      </SectionShell>

      {/* How to use — Nama style */}
      <SectionShell background="transparent" className="py-14 md:py-20 bg-[#F5F2E9]" lazy>
        <ProductHowToSection
          locale={loc}
          eyebrow={loc === 'ar' ? 'طريقة الاستخدام' : 'How to use'}
          howToUse={product.howToUse}
          headline={cro.howToHeadline[loc]}
          subheadline={cro.howToSub[loc]}
          videoSrc={
            isTxa
              ? null
              : '/products/howto-az.mp4?v=2'
          }
          steps={
            isTxa
              ? [
                  {
                    icon: 'droplets',
                    title: { ar: 'وجه نظيف', en: 'Clean face' },
                    desc: {
                      ar: 'اغسلي بشرتج بلطف قبل السيروم — بدون تقشير قاسٍ.',
                      en: 'Gently cleanse before serum — no harsh peels.',
                    },
                  },
                  {
                    icon: 'sun',
                    title: { ar: '٢–٣ قطرات', en: '2–3 drops' },
                    desc: {
                      ar: 'وزّعي على الوجه والرقبة. خفيف — ما يلزّق في حر الإمارات.',
                      en: 'Spread on face and neck. Light — won’t sticky in UAE heat.',
                    },
                  },
                  {
                    icon: 'moon',
                    title: { ar: 'ترطيب بعدها', en: 'Moisturise after' },
                    desc: {
                      ar: 'اقفلي الترطيب عشان السيروم يشتغل بهدوء.',
                      en: 'Seal with moisturiser so the serum works calmly.',
                    },
                  },
                  {
                    icon: 'clock',
                    title: { ar: 'SPF كل صبح', en: 'SPF every morning' },
                    desc: {
                      ar: 'الانتظام ٣٠ يوم + واقي شمس = الفرق الحقيقي.',
                      en: '30 days consistency + SPF = the real difference.',
                    },
                  },
                ]
              : [
                  {
                    icon: 'droplets',
                    title: { ar: 'وجه نظيف مساءً', en: 'Clean face PM' },
                    desc: {
                      ar: 'روتين المساء بعد الغسول — أبسط ما يكون.',
                      en: 'Evening routine after cleanser — as simple as it gets.',
                    },
                  },
                  {
                    icon: 'moon',
                    title: { ar: '٢–٣ قطرات', en: '2–3 drops' },
                    desc: {
                      ar: '١٦٪ Azelaic بهدوء على الآثار والمناطق الحساسة بحذر.',
                      en: '16% Azelaic gently on marks — careful on sensitive areas.',
                    },
                  },
                  {
                    icon: 'sun',
                    title: { ar: 'ترطيب + SPF صبح', en: 'Moisturise + SPF AM' },
                    desc: {
                      ar: 'صباحاً دائماً واقي شمس. بدون SPF النتيجة تنقص.',
                      en: 'Always SPF in the morning. Without it, results drop.',
                    },
                  },
                  {
                    icon: 'clock',
                    title: { ar: '٣٠ يوم انتظام', en: '30 days consistency' },
                    desc: {
                      ar: 'إذا بشرتج حساسة ابدئي يوم ويوم أول أسبوع.',
                      en: 'Sensitive skin: start every other night for week one.',
                    },
                  },
                ]
          }
          stats={
            loc === 'ar'
              ? [
                  { value: '30 مل', label: 'في كل زجاجة' },
                  { value: '2–3', label: 'قطرات يومياً' },
                  { value: '30', label: 'يوم لكل زجاجة' },
                  { value: '<60', label: 'ثانية باليوم' },
                ]
              : [
                  { value: '30 ml', label: 'per bottle' },
                  { value: '2–3', label: 'drops daily' },
                  { value: '30', label: 'days per bottle' },
                  { value: '<60', label: 'seconds a day' },
                ]
          }
        />
      </SectionShell>

      {/* COD delivery */}
      <SectionShell background="transparent" className="py-14 md:py-20 bg-[#F5F2E9]" lazy>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-4xl font-extrabold text-[#134E3A] mb-2">
              {croShared('deliveryHeadline')}
            </h2>
            <p className="text-[#5A6B5C]">{croShared('deliverySubheadline')}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {deliverySteps.map((step, idx) => (
              <div
                key={idx}
                className="text-center p-5 rounded-2xl bg-white border border-[#E8E3DC] shadow-soft"
              >
                <div className="w-12 h-12 bg-[#134E3A] border-[3px] border-gold text-gold font-black text-lg rounded-full flex items-center justify-center mx-auto mb-4 shadow-soft">
                  {idx + 1}
                </div>
                <h3 className="font-bold text-base text-[#134E3A] mb-2">{step.title}</h3>
                <p className="text-[#5A6B5C] text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="bg-white border border-[#E8E3DC] rounded-2xl p-5 md:p-7 text-center shadow-soft">
            <p className="text-sm font-bold text-[#134E3A] mb-3">
              {croShared('deliveryEmiratesLabel')}
            </p>
            <div className="flex flex-wrap justify-center gap-2 mb-3">
              {deliveryEmirates.map((emirate) => (
                <span
                  key={emirate}
                  className="text-xs font-bold text-[#134E3A] bg-[#F5F1E6] border border-[#E8E3DC] px-3 py-1 rounded-full"
                >
                  {emirate}
                </span>
              ))}
            </div>
            <p className="text-[11px] text-[#5A6B5C]">{croShared('deliveryPartners')}</p>
          </div>
        </div>
      </SectionShell>

      {/* FAQ split */}
      <SectionShell background="ivory" className="py-14 md:py-20" lazy>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-extrabold text-ink text-center mb-3">{t('faq')}</h2>
          <p className="text-center text-taupe mb-10">
            {loc === 'ar' ? 'قبل ما تطلبين — كل اللي تحتاجين تعرفينه' : 'Before you order — everything you need'}
          </p>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="bg-white p-5 md:p-7 rounded-2xl border border-sand">
              <h3 className="text-lg font-extrabold text-ink mb-4">{faqT('productTitle')}</h3>
              <FaqAccordion items={productFaq} />
            </div>
            <div className="bg-white p-5 md:p-7 rounded-2xl border border-sand">
              <h3 className="text-lg font-extrabold text-ink mb-4">{faqT('shippingTitle')}</h3>
              <FaqAccordion items={shippingFaq} />
            </div>
          </div>
        </div>
      </SectionShell>

      {/* Cross-sell — end of page, single complementary product */}
      {compProduct && (
        <SectionShell background="pearl" className="border-t border-sand py-14 md:py-20 pb-28 md:pb-20" lazy>
          <CrossSellSection complementaryProduct={compProduct} locale={loc} />
        </SectionShell>
      )}

      <ProductOfferSection product={product} locale={loc} stickyMobile />
    </div>
  );
}
