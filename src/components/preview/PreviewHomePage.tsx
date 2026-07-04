import Link from 'next/link';
import Image from 'next/image';
import { Star, ShieldCheck, Truck, RotateCcw, Sparkles, ChevronLeft } from 'lucide-react';
import {
  PREVIEW_BRAND,
  PREVIEW_FAQ,
  PREVIEW_HOME_REVIEWS,
  PREVIEW_PRODUCT_EXTRA,
  PREVIEW_PRODUCT_IMAGES,
} from '@/data/preview-content';
import { PRODUCTS } from '@/data/products';
import { formatAED } from '@/lib/utils';

export function PreviewHomePage() {
  const products = PRODUCTS;

  return (
    <>
      {/* Hero — namabeauty structure */}
      <section className="bg-gradient-to-b from-rose/5 via-pearl to-ivory pt-12 pb-16 md:pt-20 md:pb-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            {[
              { label: 'COD', sub: 'دفع عند الاستلام' },
              { label: '30 يوم', sub: 'ضمان استرجاع' },
              { label: '2–4 أيام', sub: 'توصيل الإمارات' },
              { label: '15% / 16%', sub: 'جرعات مركّزة' },
            ].map((b) => (
              <div key={b.label} className="bg-white border border-sand rounded-2xl px-4 py-3 text-center min-w-[100px] shadow-sm">
                <p className="font-black text-mocha">{b.label}</p>
                <p className="text-[11px] text-taupe font-semibold">{b.sub}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-sm font-bold text-rose mb-4">{PREVIEW_BRAND.tagline}</p>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-mocha text-center leading-tight max-w-4xl mx-auto mb-6">
            {PREVIEW_BRAND.heroHeadline}
          </h1>
          <p className="text-lg md:text-xl text-taupe text-center max-w-3xl mx-auto mb-10 leading-relaxed font-medium">
            {PREVIEW_BRAND.heroSub}
          </p>
          <div className="flex justify-center">
            <a
              href="#products"
              className="inline-flex items-center gap-2 bg-mocha text-ivory px-10 py-4 rounded-2xl font-black text-lg hover:bg-mocha/90 shadow-xl"
            >
              {PREVIEW_BRAND.heroCta}
              <ChevronLeft className="w-5 h-5 rotate-180" />
            </a>
          </div>
        </div>
      </section>

      {/* Products grid */}
      <section id="products" className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-mocha text-center mb-4">
            {PREVIEW_BRAND.collectionHeadline}
          </h2>
          <p className="text-taupe text-center max-w-2xl mx-auto mb-12 font-medium">
            {PREVIEW_BRAND.collectionSub}
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {products.map((p) => {
              const extra = PREVIEW_PRODUCT_EXTRA[p.id];
              const img = PREVIEW_PRODUCT_IMAGES[p.id];
              return (
                <Link
                  key={p.id}
                  href={`/preview/products/${p.slug.ar}`}
                  className="group bg-pearl border border-sand rounded-3xl overflow-hidden hover:shadow-xl hover:border-rose/30 transition-all"
                >
                  <div className="aspect-square relative bg-white p-8">
                    <Image src={img} alt={p.name.ar} fill className="object-contain p-4 group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="p-6 md:p-8">
                    <p className="text-xs font-bold text-rose mb-2">{extra?.routineLabel}</p>
                    <h3 className="text-xl font-black text-mocha mb-3 leading-snug">{p.name.ar}</h3>
                    <p className="text-sm text-taupe mb-4 line-clamp-2">{p.subheadline.ar}</p>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} size={14} className="text-gold fill-gold" />
                        ))}
                      </div>
                      <span className="text-xs text-taupe font-bold">
                        ({p.reviewCountPlaceholder} تقييم)
                      </span>
                    </div>
                    <p className="font-black text-mocha">
                      يبدأ من {formatAED(199)}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="py-16 bg-mocha text-ivory">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-4">ليش Skinouva؟</h2>
          <p className="text-center text-ivory/80 mb-12 max-w-2xl mx-auto">
            تركيبات مركّزة، شفافية في الجرعة، ودفع عند الاستلام في كل الإمارات.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Sparkles, title: 'جرعات واضحة', desc: '15% TXA + Niacinamide · 16% Azelaic على العبوة' },
              { icon: ShieldCheck, title: 'ضمان 30 يوم', desc: 'جرّبي براحتك — استرداد إذا ما لاحظتي فرقًا' },
              { icon: Truck, title: 'COD · الإمارات', desc: '2–4 أيام توصيل — تدفعين عند الباب' },
              { icon: RotateCcw, title: 'مناسب للخليج', desc: 'تركيبات خفيفة للحر والرطوبة' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Icon className="w-8 h-8 text-gold mb-4" />
                <h3 className="font-black text-lg mb-2">{title}</h3>
                <p className="text-sm text-ivory/75 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-16 md:py-24 bg-pearl">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-black text-mocha text-center mb-12">تجارب عميلات الإمارات</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {PREVIEW_HOME_REVIEWS.map((r) => (
              <div key={r.initials} className="bg-white border border-sand rounded-2xl p-6 shadow-soft">
                <p className="text-mocha leading-relaxed mb-6 text-sm">{r.text}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-mocha text-ivory flex items-center justify-center font-black text-sm">
                    {r.initials}
                  </div>
                  <div>
                    <p className="font-bold text-sm">{r.name}</p>
                    <p className="text-xs text-taupe">
                      {r.age} سنة · {r.city}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-black text-mocha text-center mb-12">من الطلب لباب بيتك — 3 خطوات</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '١', title: 'اختاري سيرومك', desc: 'TXA للبقع · Azelaic للحبوب — أو الاثنين للروتين الكامل.' },
              { step: '٢', title: 'أكّدي (بدون دفع)', desc: 'اسمك ورقم جوالك فقط. فريقنا يتواصل لتأكيد العنوان.' },
              { step: '٣', title: 'استلمي وادفعي', desc: 'توصيل 2–4 أيام داخل الإمارات — COD عند الباب.' },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-14 h-14 bg-mocha text-ivory rounded-full flex items-center justify-center font-black text-xl mx-auto mb-4">
                  {s.step}
                </div>
                <h3 className="font-black text-lg mb-2">{s.title}</h3>
                <p className="text-sm text-taupe">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-ivory border-t border-sand">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-black text-mocha text-center mb-10">أسئلة قبل الطلب</h2>
          <div className="space-y-4">
            {PREVIEW_FAQ.map((item) => (
              <details key={item.q} className="bg-white border border-sand rounded-2xl p-5 group">
                <summary className="font-bold text-mocha cursor-pointer list-none flex justify-between items-center">
                  {item.q}
                  <span className="text-rose group-open:rotate-45 transition-transform text-xl">+</span>
                </summary>
                <p className="text-taupe text-sm mt-4 leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
