import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Star, CheckCircle2, ShieldCheck, FlaskConical, Stethoscope, Leaf, Award, XCircle, ChevronRight, Check } from 'lucide-react';
import { getProductBySlug, PRODUCTS } from '@/data/products';
import { SectionShell } from '@/components/SectionShell';
import { IngredientCard } from '@/components/IngredientCard';
import { ReviewCard } from '@/components/ReviewCard';
import { FaqAccordion } from '@/components/FaqAccordion';
import { ImagePlaceholder } from '@/components/ImagePlaceholder';
import { TrustBadges } from '@/components/TrustBadges';
import { ProductOfferSection } from './ProductOfferSection';
import { CrossSellSection } from './CrossSellSection';
import { ProductRatingBar } from '@/components/ProductRatingBar';
import { ProductHeroTrustPills } from '@/components/ProductHeroTrustPills';

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
  const cro = await getTranslations({ locale, namespace: 'productCro' });
  const faqT = await getTranslations({ locale, namespace: 'faq' });
  const reviewT = await getTranslations({ locale, namespace: 'reviews' });
  const guarT = await getTranslations({ locale, namespace: 'guarantee' });

  const faqItems = faqT.raw('items') as { q: string; a: string }[];
  const timeline = cro.raw('timeline') as { week: string; title: string; desc: string }[];
  const painQuotes = cro.raw('painQuotes') as { quote: string; fail: string; reason: string }[];
  
  const compareClinics = cro.raw('compareClinics') as { title: string; price: string; points: string[] };
  const compareCheap = cro.raw('compareCheap') as { title: string; price: string; points: string[] };
  const compareUs = cro.raw('compareUs') as { title: string; price: string; points: string[] };
  
  const noNasties = cro.raw('noNasties') as string[];
  const deliverySteps = cro.raw('deliverySteps') as { title: string; desc: string }[];

  const reviews = [
    { initials: 'م.ع', rating: 5, text: loc === 'ar' ? 'النتيجة تدريجية وواضحة مع الاستخدام المنتظم. راضية جدًا.' : 'Gradual and visible results with consistent use. Very satisfied.', concern: product.concern[loc], city: loc === 'ar' ? 'دبي' : 'Dubai' },
    { initials: 'س.ف', rating: 5, text: loc === 'ar' ? 'السيروم خفيف ومريح. أحب أن التجربة كلها كانت سهلة.' : 'Light and comfortable serum. I love how easy the whole experience was.', concern: product.concern[loc], city: loc === 'ar' ? 'أبوظبي' : 'Abu Dhabi' },
    { initials: 'ل.م', rating: 5, text: loc === 'ar' ? 'الدفع عند الاستلام خلاني أجرب بدون تردد. نوصي به.' : 'Cash on delivery made it easy to try. Recommend it.', concern: product.concern[loc], city: loc === 'ar' ? 'الشارقة' : 'Sharjah' },
    { initials: 'ن.ش', rating: 5, text: loc === 'ar' ? 'أفضل قرار اتخذته لبشرتي. آثار الحبوب خفت بشكل ملحوظ بعد أول علبة.' : 'Best decision for my skin. Acne marks faded noticeably after the first box.', concern: product.concern[loc], city: loc === 'ar' ? 'العين' : 'Al Ain' },
  ];

  const compProduct = PRODUCTS.find(p => p.id === product.complementaryId);

  return (
    <>
      {/* 1. CRO Hero — copy left, photo right (desktop) */}
      <section className="bg-gradient-to-b from-pearl via-ivory to-sand py-8 md:py-14 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          {/* dir=ltr keeps copy LEFT + photo RIGHT on all locales (Arabic page is RTL globally) */}
          <div
            className="grid md:grid-cols-2 gap-8 lg:gap-12 items-stretch md:min-h-[520px]"
            dir="ltr"
          >
            {/* LEFT — copy + offers */}
            <div
              className="flex flex-col min-h-0 order-2 md:order-1"
              dir={loc === 'ar' ? 'rtl' : 'ltr'}
            >
              <h1 className="text-2xl md:text-[2rem] lg:text-[2.35rem] font-black text-mocha mb-3 md:mb-4 leading-[1.2] tracking-tight">
                {product.heroHeadline[loc]}
              </h1>
              <p className="text-taupe text-base md:text-[1.05rem] leading-relaxed mb-4 md:mb-5 font-medium">
                {product.subheadline[loc]}
              </p>

              <ProductRatingBar
                locale={loc}
                rating={product.ratingPlaceholder}
                reviewCount={product.reviewCountPlaceholder}
                confirmedLabel={offersT('confirmedReviews')}
                priceLabel={offersT('priceFromBottle', {
                  price: loc === 'ar' ? '199 درهم' : '199 AED',
                })}
              />

              <ProductOfferSection product={product} locale={loc} />
            </div>

            {/* RIGHT — product photo */}
            <div className="flex items-center justify-center order-1 md:order-2 md:min-h-[520px]">
              <div className="relative w-full max-w-[440px] aspect-square md:aspect-auto md:h-full md:max-h-[520px] md:min-h-[480px] bg-white rounded-[2rem] border border-sand shadow-2xl p-6 md:p-8">
                <Image
                  src={product.imageUrl}
                  alt={product.name[loc]}
                  fill
                  className="object-contain p-4"
                  priority
                  sizes="(max-width: 768px) 100vw, 440px"
                />
                <div className="absolute top-4 end-4 z-10 bg-white/95 backdrop-blur-md px-3 py-2 rounded-full border border-sand shadow-lg flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-gold" />
                  <span className="text-xs font-bold text-mocha">
                    {loc === 'ar' ? 'ضمان 30 يوم' : '30-day guarantee'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div dir={loc === 'ar' ? 'rtl' : 'ltr'}>
            <ProductHeroTrustPills locale={loc} />
          </div>
        </div>
      </section>

      {/* Stat — UAE social proof */}
      <div className="bg-rose/5 border-y border-rose/10 py-4">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-sm md:text-base font-bold text-mocha">{cro('stat')}</p>
          <p className="text-[11px] text-taupe mt-1">{cro('statSource')}</p>
        </div>
      </div>

      {/* 2. Trust Strip */}
      <div className="bg-white border-y border-sand py-6 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <TrustBadges className="gap-x-3 gap-y-3 md:gap-x-6 md:gap-y-4" />
        </div>
      </div>

      {/* 3. The Real Problem (Agitation) */}
      <SectionShell background="pearl">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-mocha mb-4">{cro('painHeadline')}</h2>
          <p className="text-lg text-taupe">{cro('painSub')}</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {painQuotes.map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl shadow-soft border border-sand flex flex-col h-full">
              <div className="mb-4">
                 <p className="text-mocha font-bold italic leading-relaxed text-lg">{item.quote}</p>
              </div>
              <div className="mt-auto pt-4 border-t border-sand/50">
                <div className="flex items-center gap-2 mb-2">
                  <XCircle className="w-5 h-5 text-red-500" />
                  <span className="font-bold text-red-600 text-sm">{item.fail}</span>
                </div>
                <p className="text-xs text-taupe leading-relaxed">{item.reason}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionShell>

      {/* 4. The Solution / Mechanism */}
      <SectionShell background="ivory" className="overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="w-16 h-16 bg-rose/10 rounded-full flex items-center justify-center mb-6">
                <FlaskConical className="w-8 h-8 text-rose" />
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-mocha mb-6">{cro('mechanismHeadline')}</h2>
              <p className="text-lg text-taupe leading-relaxed mb-8">{cro('mechanismBody')}</p>
              <ul className="space-y-4">
                {product.benefitBullets.map((b) => (
                  <li key={b.ar} className="flex items-center gap-3 text-base text-mocha font-bold bg-white p-3 rounded-lg border border-sand shadow-sm">
                    <CheckCircle2 size={20} className="text-green-500 flex-shrink-0" />
                    <span>{b[loc]}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="order-1 md:order-2">
               <ImagePlaceholder aspect="square" variant="lifestyle" className="rounded-2xl shadow-xl border-4 border-white" />
            </div>
          </div>
        </div>
      </SectionShell>

      {/* 5. Ingredients Deep Dive */}
      <SectionShell background="white">
        <h2 className="text-3xl md:text-4xl font-extrabold text-mocha text-center mb-12">{t('ingredientsTitle')}</h2>
        <div className={`grid gap-6 ${product.keyIngredients.length === 1 ? 'max-w-md mx-auto' : 'md:grid-cols-2 max-w-4xl mx-auto'}`}>
          {product.keyIngredients.map((ing) => (
            <IngredientCard key={ing.name.ar} ingredient={ing} locale={loc} />
          ))}
        </div>
      </SectionShell>

      {/* 6. Timeline (What to expect) */}
      <SectionShell background="pearl">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-mocha mb-4">{cro('timelineHeadline')}</h2>
          <p className="text-lg text-taupe">{cro('timelineSub')}</p>
        </div>
        
        <div className="max-w-4xl mx-auto relative">
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-sand/50 -translate-x-1/2 rounded-full hidden md:block"></div>
          <div className="space-y-8">
            {timeline.map((step, idx) => (
              <div key={idx} className={`relative flex flex-col md:flex-row items-center gap-6 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="w-16 h-16 bg-white border-4 border-rose text-rose font-black text-xl rounded-full flex items-center justify-center shrink-0 z-10 shadow-lg">
                   {idx + 1}
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-md border border-sand w-full md:w-[calc(50%-3rem)] relative">
                  <span className="text-rose text-sm font-bold block mb-1">{step.week}</span>
                  <h3 className="text-xl font-bold text-mocha mb-2">{step.title}</h3>
                  <p className="text-taupe leading-relaxed text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionShell>

      {/* 7. Comparison Matrix */}
      <SectionShell background="white">
         <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-mocha mb-4">{cro('compareHeadline')}</h2>
          <p className="text-lg text-taupe">{cro('compareSub')}</p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
           {/* Clinics */}
           <div className="bg-sand/10 border border-sand rounded-2xl p-6 opacity-70">
             <h3 className="font-bold text-lg text-mocha mb-2">{compareClinics.title}</h3>
             <p className="text-red-500 font-bold mb-6">{compareClinics.price}</p>
             <ul className="space-y-4">
               {compareClinics.points.map((pt, i) => (
                 <li key={i} className="flex gap-2 text-sm text-taupe">
                   <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                   {pt}
                 </li>
               ))}
             </ul>
           </div>
           
           {/* Cheap Serums */}
           <div className="bg-sand/10 border border-sand rounded-2xl p-6 opacity-70">
             <h3 className="font-bold text-lg text-mocha mb-2">{compareCheap.title}</h3>
             <p className="text-red-500 font-bold mb-6">{compareCheap.price}</p>
             <ul className="space-y-4">
               {compareCheap.points.map((pt, i) => (
                 <li key={i} className="flex gap-2 text-sm text-taupe">
                   <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                   {pt}
                 </li>
               ))}
             </ul>
           </div>

           {/* Skinouva */}
           <div className="bg-mocha border-2 border-gold rounded-2xl p-6 shadow-xl transform scale-105 relative z-10">
             <div className="absolute -top-3 right-4 bg-gold text-mocha text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-wider">
               {loc === 'ar' ? 'الخيار الأفضل' : 'BEST CHOICE'}
             </div>
             <h3 className="font-bold text-xl text-ivory mb-2">{compareUs.title}</h3>
             <p className="text-gold font-extrabold mb-6">{compareUs.price}</p>
             <ul className="space-y-4">
               {compareUs.points.map((pt, i) => (
                 <li key={i} className="flex gap-2 text-sm text-ivory">
                   <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                   {pt}
                 </li>
               ))}
             </ul>
           </div>
        </div>
      </SectionShell>

      {/* 8. No Nasties & Expert Authority */}
      <SectionShell background="ivory">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="bg-white p-8 rounded-3xl border border-sand shadow-sm">
             <div className="flex items-center gap-3 mb-6">
                <Leaf className="w-8 h-8 text-green-600" />
                <h3 className="text-2xl font-extrabold text-mocha">{cro('noNastiesHeadline')}</h3>
             </div>
             <div className="grid grid-cols-2 gap-4">
               {noNasties.map((n, i) => (
                 <div key={i} className="flex items-center gap-2 text-taupe font-medium text-sm">
                   <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                     <Check className="w-3 h-3 text-green-600" />
                   </div>
                   {n}
                 </div>
               ))}
             </div>
          </div>

          <div className="relative">
             <div className="absolute -top-6 -left-6 w-12 h-12 bg-rose text-white rounded-full flex items-center justify-center font-serif text-3xl">&quot;</div>
             <div className="bg-mocha text-ivory p-8 md:p-10 rounded-3xl shadow-xl">
                <p className="text-lg md:text-xl leading-relaxed italic mb-6">
                  {cro('expertQuote')}
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                     <Stethoscope className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <p className="font-bold text-lg">{cro('expertTitle')}</p>
                    <p className="text-sm text-ivory/60">{loc === 'ar' ? 'معتمد' : 'Certified'}</p>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </SectionShell>

      {/* 9. Reviews */}
      <SectionShell background="pearl">
        <h2 className="text-3xl md:text-4xl font-extrabold text-mocha text-center mb-12">{t('reviews')}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {reviews.map((r) => <ReviewCard key={r.initials} {...r} />)}
        </div>
      </SectionShell>

      {/* 10. Ultimate Guarantee Block */}
      <SectionShell background="mocha" className="bg-mocha overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold via-transparent to-transparent"></div>
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10">
           <div className="w-24 h-24 bg-gradient-to-br from-gold to-yellow-600 rounded-full flex items-center justify-center mb-6 border-4 border-mocha outline outline-2 outline-gold/50 shadow-2xl">
             <ShieldCheck className="w-12 h-12 text-mocha" />
           </div>
           <h2 className="text-3xl md:text-5xl font-black text-ivory mb-6 leading-tight">{guarT('headline')}</h2>
           <p className="text-ivory/90 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-8 font-medium">{guarT('body')}</p>
           
           <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-2xl w-full">
             <p className="text-white text-sm md:text-base leading-relaxed">
               {loc === 'ar' 
                 ? 'جربي العلبة الأولى كاملة. إذا لم تلاحظي فرقاً يستحق، تواصلي معنا وسنعيد لك أموالك بالكامل، بدون أسئلة معقدة. لأننا إذا لم نمنحك النتيجة، لا نستحق أموالك.'
                 : 'Try the first box completely. If you don\'t see a worthwhile difference, contact us and we\'ll refund you fully, no complicated questions. If we don\'t deliver results, we don\'t deserve your money.'}
             </p>
           </div>
        </div>
      </SectionShell>

      {/* 11. Delivery Process */}
      <SectionShell background="white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-mocha mb-4">{cro('deliveryHeadline')}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 relative">
             <div className="hidden md:block absolute top-8 left-[16%] right-[16%] h-0.5 bg-sand"></div>
             {deliverySteps.map((step, idx) => (
               <div key={idx} className="relative flex flex-col items-center text-center">
                 <div className="w-16 h-16 bg-white border-2 border-mocha text-mocha font-black text-2xl rounded-full flex items-center justify-center z-10 mb-6 shadow-sm">
                   {idx + 1}
                 </div>
                 <h3 className="font-bold text-xl text-mocha mb-3">{step.title}</h3>
                 <p className="text-taupe leading-relaxed text-sm">{step.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </SectionShell>

      {/* 12. AOV Booster - Cross Sell Section at the bottom */}
      {compProduct && (
        <SectionShell background="pearl" className="border-t border-sand">
           <CrossSellSection mainProduct={product} complementaryProduct={compProduct} locale={loc} />
        </SectionShell>
      )}

      {/* 13. FAQ */}
      <SectionShell background="ivory">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-mocha text-center mb-12">{t('faq')}</h2>
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-soft border border-sand">
             <FaqAccordion items={faqItems} />
          </div>
        </div>
      </SectionShell>

      {/* Bottom Sticky CTA Anchor Area - to make sure we don't hide footer content */}
      <div className="h-24 md:h-0"></div>
      
      {/* Sticky Mobile CTA */}
      <ProductOfferSection product={product} locale={loc} stickyMobile={true} />
    </>
  );
}