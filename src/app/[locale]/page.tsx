import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { PRODUCTS } from '@/data/products';
import { SectionShell } from '@/components/SectionShell';
import { ProductCard } from '@/components/ProductCard';
import { ReviewCard } from '@/components/ReviewCard';
import { FaqAccordion } from '@/components/FaqAccordion';
import { ImagePlaceholder } from '@/components/ImagePlaceholder';
import { ShieldCheck, CheckCircle2, ChevronRight, PhoneCall, Truck, Sparkles, Plus, AlertCircle, Shield } from 'lucide-react';
import { Reveal, RevealItem } from '@/components/Reveal';

type Props = { params: { locale: string } };

export default async function HomePage({ params: { locale } }: Props) {
  const loc = locale as 'ar' | 'en';
  
  const faqT = await getTranslations({ locale, namespace: 'faq' });
  const reviewT = await getTranslations({ locale, namespace: 'reviews' });
  const guarT = await getTranslations({ locale, namespace: 'guarantee' });
  const cro = await getTranslations({ locale, namespace: 'homeCro' });

  const faqItems = faqT.raw('items') as { q: string; a: string }[];
  const climatePoints = cro.raw('climate.points') as { title: string; desc: string }[];
  const authorityStats = cro.raw('authority.stats') as { value: string; label: string }[];
  const deliverySteps = cro.raw('codExperience.steps') as { step: string; title: string; desc: string }[];

  const reviews = [
    { initials: 'م.ع', rating: 5, text: loc === 'ar' ? 'المكياج كان يذوب ويفضح كل الآثار، بعد هالسيرومين صرت أطلع بدون فاونديشن وبثقة تامة.' : 'Makeup used to melt and expose all my marks. After these serums, I go out foundation-free with complete confidence.', concern: loc === 'ar' ? 'بقع داكنة' : 'Dark spots', city: loc === 'ar' ? 'دبي' : 'Dubai' },
    { initials: 'س.ر', rating: 5, text: loc === 'ar' ? 'تجربة التوصيل والدفع عند الباب جداً مريحة، والسيروم فعلاً ما يتأكسد ولا يدبق بالحر.' : 'The COD delivery experience is very comfortable, and the serum truly doesn\'t oxidize or get sticky in the heat.', concern: loc === 'ar' ? 'آثار الحبوب' : 'Blemish marks', city: loc === 'ar' ? 'أبوظبي' : 'Abu Dhabi' },
    { initials: 'ن.خ', rating: 5, text: loc === 'ar' ? 'الدفع عند الاستلام وضمان استرداد الفلوس خلاني أجرب وأنا مرتاحة. النتيجة مبهرة.' : 'COD and the refund guarantee let me try it with peace of mind. The result is stunning.', concern: loc === 'ar' ? 'تفاوت اللون' : 'Uneven tone', city: loc === 'ar' ? 'الشارقة' : 'Sharjah' },
    { initials: 'ل.م', rating: 5, text: loc === 'ar' ? 'أفضل استثمار لبشرتي في الصيف. الملمس صار زجاجي وناعم جداً.' : 'Best investment for my skin this summer. The texture became like glass and so smooth.', concern: loc === 'ar' ? 'ملمس غير متوازن' : 'Uneven texture', city: loc === 'ar' ? 'العين' : 'Al Ain' },
  ];

  return (
    <>
      {/* 1. The High-Intent Hero Section (Ultra Premium) */}
      <section className="relative overflow-hidden bg-gradient-to-br from-ivory via-pearl to-sand min-h-[90vh] flex items-center pt-24 pb-16 md:pt-32 md:pb-24">
        {/* Luxury Lighting Effects */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose/10 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold/10 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob [animation-delay:2000ms]"></div>
        
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Copy */}
            <div className="order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-start">
              <Reveal delay={0.1}>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-rose/20 text-rose text-sm font-bold mb-8 shadow-sm">
                  <Sparkles className="w-4 h-4" />
                  <span>{cro('hero.badge')}</span>
                </div>
              </Reveal>
              
              <Reveal delay={0.2}>
                <h1 className="text-4xl md:text-5xl lg:text-[4rem] font-black text-mocha leading-[1.1] mb-6 tracking-tight drop-shadow-sm">
                  {cro('hero.headline')}
                </h1>
              </Reveal>
              
              <Reveal delay={0.3}>
                <p className="text-taupe text-lg md:text-xl leading-relaxed mb-10 max-w-xl font-medium">
                  {cro('hero.subheadline')}
                </p>
              </Reveal>
              
              <Reveal delay={0.4} className="w-full sm:w-auto">
                <div className="flex flex-col sm:flex-row w-full gap-4 mb-8">
                  <Link
                    href={`/${locale}/collection`}
                    className="inline-flex items-center justify-center bg-mocha text-ivory px-10 py-5 rounded-2xl font-black text-lg md:text-xl hover:bg-mocha/90 transition-all shadow-xl hover:shadow-2xl active:scale-[0.98] group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
                    {cro('hero.ctaPrimary')}
                    <ChevronRight className={`w-5 h-5 ml-2 transition-transform group-hover:translate-x-1 ${loc === 'ar' ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                  </Link>
                </div>

                <div className="flex items-center justify-center lg:justify-start gap-2 text-xs md:text-sm font-bold text-mocha/80 bg-white/50 backdrop-blur-sm px-5 py-3 rounded-xl border border-sand/50 shadow-sm w-fit mx-auto lg:mx-0">
                  <ShieldCheck className="w-5 h-5 text-green-600" />
                  <span>{cro('hero.trust')}</span>
                </div>
              </Reveal>
            </div>

            {/* Right: Visual */}
            <div className="order-1 lg:order-2 relative perspective-1000">
              <Reveal delay={0.5} direction="left">
                <div className="relative transform-gpu preserve-3d group">
                  <div className="absolute inset-0 bg-gradient-to-tr from-gold/20 to-transparent rounded-[3rem] transform rotate-3 scale-105 transition-transform group-hover:rotate-6 duration-700"></div>
                  <ImagePlaceholder aspect="portrait" variant="hero" className="max-w-[400px] w-full mx-auto relative z-10 shadow-2xl rounded-[2.5rem] border-[6px] border-white/90 backdrop-blur-sm transition-transform duration-700 group-hover:-translate-y-2" />
                  
                  {/* Floating Guarantee Badge */}
                  <div className="absolute -bottom-8 -left-4 md:-left-12 z-20 bg-white p-5 rounded-3xl shadow-2xl border border-sand flex items-center gap-4 animate-bounce-slow">
                     <div className="w-14 h-14 bg-gradient-to-br from-gold/20 to-gold/5 rounded-full flex items-center justify-center border border-gold/20">
                        <CheckCircle2 className="w-7 h-7 text-gold" />
                     </div>
                     <div>
                       <p className="font-black text-mocha text-sm md:text-base">{loc === 'ar' ? 'النتيجة مضمونة' : 'Guaranteed Results'}</p>
                       <p className="text-xs md:text-sm font-medium text-taupe">{loc === 'ar' ? 'أو استرداد أموالك' : 'Or your money back'}</p>
                     </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Trust Strip (Seamless credibility) */}
      <div className="border-y border-sand bg-white py-6 shadow-sm relative z-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <Reveal delay={0.2}>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 md:gap-x-16">
              {[
                { icon: Truck, text: cro('codExperience.steps.2.title') },
                { icon: Shield, text: cro('authority.headline').split('.')[0] },
                { icon: ShieldCheck, text: loc === 'ar' ? 'مرخص وآمن' : 'Safe & Licensed' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 opacity-80 hover:opacity-100 transition-opacity">
                  <item.icon className="w-6 h-6 text-mocha" />
                  <span className="font-bold text-mocha text-sm md:text-base tracking-wide">{item.text}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      {/* 3. The Gulf Climate Agitator (In-Group Bias & Empathy) */}
      <SectionShell background="ivory" className="overflow-hidden relative py-24 md:py-32 border-b border-sand/40">
        <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <Reveal className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-mocha mb-6 leading-tight max-w-4xl mx-auto">{cro('climate.headline')}</h2>
            <p className="text-xl md:text-2xl text-rose font-bold">{cro('climate.subheadline')}</p>
          </Reveal>
          
          <Reveal cascade className="grid md:grid-cols-3 gap-8 md:gap-10 mb-16">
            {climatePoints.map((point, i) => (
              <RevealItem key={i} className="bg-white p-10 rounded-[2rem] shadow-xl border border-sand/50 relative overflow-hidden group hover:border-rose/30 transition-all hover:-translate-y-2 duration-300">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-rose to-mocha transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-8 border border-red-100">
                  <AlertCircle className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-2xl font-black text-mocha mb-4 leading-snug">{point.title}</h3>
                <p className="text-taupe leading-relaxed font-medium">{point.desc}</p>
              </RevealItem>
            ))}
          </Reveal>

          <Reveal delay={0.4}>
            <div className="bg-gradient-to-br from-mocha to-[#3A2D28] text-ivory p-10 md:p-12 rounded-[2.5rem] shadow-2xl text-center max-w-4xl mx-auto border border-mocha/50 relative overflow-hidden">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold via-transparent to-transparent"></div>
              <p className="text-lg md:text-2xl font-semibold leading-relaxed relative z-10">
                {cro('climate.solution')}
              </p>
            </div>
          </Reveal>
        </div>
      </SectionShell>

      {/* 4. The Complete Routine (AOV Maximizer) */}
      <SectionShell background="pearl" id="products" className="py-24 md:py-32">
        <Reveal className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-mocha mb-6">{cro('collection.headline')}</h2>
          <p className="text-xl md:text-2xl text-taupe max-w-3xl mx-auto font-medium">
            {cro('collection.subheadline')}
          </p>
        </Reveal>
        
        {/* The Bundle Card - Primary Focus */}
        <Reveal delay={0.2}>
          <div className="max-w-6xl mx-auto bg-white rounded-[3rem] p-8 md:p-16 shadow-2xl border-[3px] border-gold/60 relative mb-24 overflow-hidden group">
             <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full mix-blend-multiply filter blur-[80px] transition-all duration-700 group-hover:scale-110"></div>
             
             <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-gradient-to-r from-gold to-yellow-500 text-mocha font-black text-xs md:text-sm px-8 py-2.5 rounded-b-2xl uppercase tracking-widest shadow-lg">
               {cro('collection.bundleBadge')}
             </div>

             <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10 mt-8">
               <div className="flex items-center justify-center gap-2 md:gap-6 relative">
                  <ImagePlaceholder aspect="square" variant="serum" className="w-40 md:w-64 shadow-2xl rounded-3xl border-8 border-white transform -rotate-12 transition-transform duration-500 group-hover:-rotate-6" />
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-full flex items-center justify-center shadow-xl z-10 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-sand">
                    <Plus className="w-6 h-6 md:w-8 md:h-8 text-mocha" />
                  </div>
                  <ImagePlaceholder aspect="square" variant="serum" className="w-40 md:w-64 shadow-2xl rounded-3xl border-8 border-white transform rotate-12 transition-transform duration-500 group-hover:rotate-6" />
               </div>
               
               <div className="text-center md:text-start">
                 <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-mocha mb-6 leading-tight">{cro('collection.bundleTitle')}</h3>
                 <p className="text-taupe text-lg md:text-xl leading-relaxed mb-10 font-medium">{cro('collection.bundleDesc')}</p>
                 
                 <Link
                    href={`/${locale}/collection`}
                    className="inline-flex justify-center items-center w-full md:w-auto bg-mocha text-ivory px-10 py-5 rounded-2xl font-black text-xl hover:bg-mocha/90 transition-all shadow-xl hover:shadow-2xl active:scale-[0.98]"
                  >
                    {cro('collection.bundleCta')}
                 </Link>
               </div>
             </div>
          </div>
        </Reveal>

        {/* Individual Products - Secondary Focus */}
        <Reveal cascade className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {PRODUCTS.map((p) => (
            <RevealItem key={p.id}>
              <ProductCard product={p} />
            </RevealItem>
          ))}
        </Reveal>
      </SectionShell>

      {/* 5. Clinical Transparency Matrix (Authority Bias) */}
      <SectionShell background="mocha" className="text-ivory relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 opacity-[0.15] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <Reveal className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-6">{cro('authority.headline')}</h2>
            <p className="text-xl md:text-2xl text-ivory/80 max-w-3xl mx-auto font-medium">{cro('authority.subheadline')}</p>
          </Reveal>

          <Reveal cascade className="grid md:grid-cols-3 gap-8 md:gap-12">
             {authorityStats.map((stat, i) => (
               <RevealItem key={i} className="bg-white/5 backdrop-blur-xl border border-white/10 p-12 rounded-[2.5rem] text-center transform transition-all duration-500 hover:scale-105 hover:bg-white/10">
                 <div className="text-6xl md:text-7xl font-black text-gold mb-6 drop-shadow-lg">{stat.value}</div>
                 <p className="text-lg md:text-xl font-bold text-ivory/90 leading-snug">{stat.label}</p>
               </RevealItem>
             ))}
          </Reveal>
        </div>
      </SectionShell>

      {/* 6. The VIP COD Experience (Confirmation Rate Optimizer) */}
      <SectionShell background="white" className="py-24 md:py-32 border-b border-sand/30">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-24">
            <span className="inline-block px-4 py-1.5 rounded-full bg-rose/10 text-rose font-black tracking-widest uppercase text-sm mb-6 border border-rose/20">
              {cro('codExperience.badge')}
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-mocha mb-8 leading-tight">{cro('codExperience.headline')}</h2>
            <p className="text-xl md:text-2xl text-taupe max-w-3xl mx-auto font-medium">
              {cro('codExperience.subheadline')}
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-12 relative">
             {/* Connecting Line */}
             <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-1 bg-gradient-to-r from-sand via-rose/30 to-sand"></div>
             
             <Reveal cascade>
               {deliverySteps.map((step, idx) => {
                 const Icons = [PhoneCall, Truck, CheckCircle2];
                 const Icon = Icons[idx];
                 
                 return (
                   <RevealItem key={idx} className="relative flex flex-col items-center text-center group">
                     <div className="w-24 h-24 bg-white border-[6px] border-ivory shadow-xl rounded-full flex items-center justify-center z-10 mb-8 relative group-hover:border-rose/20 transition-colors duration-500">
                       <Icon className="w-10 h-10 text-mocha group-hover:text-rose transition-colors duration-500" />
                       <div className="absolute -top-3 -right-3 w-10 h-10 bg-mocha text-white text-base font-black rounded-full flex items-center justify-center border-4 border-white shadow-md">
                         {step.step}
                       </div>
                     </div>
                     <h3 className="font-black text-2xl md:text-3xl text-mocha mb-4">{step.title}</h3>
                     <p className="text-taupe text-lg md:text-xl leading-relaxed font-medium">{step.desc}</p>
                   </RevealItem>
                 );
               })}
             </Reveal>
          </div>
        </div>
      </SectionShell>

      {/* 7. Social Proof (Bandwagon Effect) */}
      <SectionShell background="pearl" className="py-24 md:py-32">
        <Reveal className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-black text-mocha mb-6">{cro('socialProof.headline')}</h2>
          <p className="text-xl md:text-2xl text-taupe font-medium max-w-3xl mx-auto">
             {cro('socialProof.subheadline')}
          </p>
        </Reveal>
        <Reveal cascade className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
          {reviews.map((r) => (
            <RevealItem key={r.initials}>
              <ReviewCard {...r} />
            </RevealItem>
          ))}
        </Reveal>
      </SectionShell>

      {/* 8. The Ultimate Risk Reversal Guarantee */}
      <SectionShell background="ivory" className="border-t border-sand py-24 md:py-32">
        <Reveal>
          <div className="max-w-5xl mx-auto bg-white rounded-[3rem] p-12 md:p-20 shadow-2xl border-2 border-sand text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02] pointer-events-none"></div>
            
            <div className="w-28 h-28 bg-gradient-to-br from-gold to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-10 shadow-2xl border-[6px] border-ivory relative z-10">
              <ShieldCheck className="w-14 h-14 text-mocha" />
            </div>
            
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-mocha mb-8 leading-tight relative z-10">
              {guarT('headline')}
            </h2>
            
            <p className="text-taupe text-lg md:text-2xl leading-relaxed max-w-4xl mx-auto mb-12 font-medium relative z-10">
              {guarT('body')}
            </p>
            
            <Link
              href={`/${locale}/collection`}
              className="inline-flex justify-center bg-mocha text-ivory px-12 py-6 rounded-2xl font-black text-xl md:text-2xl hover:bg-mocha/90 transition-all shadow-2xl hover:shadow-3xl active:scale-[0.98] relative z-10"
            >
              {guarT('cta')}
            </Link>
          </div>
        </Reveal>
      </SectionShell>

      {/* 9. FAQ Section */}
      <SectionShell background="white" className="py-24 md:py-32">
        <Reveal>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black text-mocha text-center mb-16">{faqT('title')}</h2>
            <div className="bg-ivory p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-sand">
               <FaqAccordion items={faqItems} />
            </div>
          </div>
        </Reveal>
      </SectionShell>
    </>
  );
}