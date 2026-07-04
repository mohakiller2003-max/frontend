import Link from 'next/link';
import Image from 'next/image';
import { Star, ShieldCheck, XCircle, CheckCircle2 } from 'lucide-react';
import type { Product } from '@/data/products';
import {
  PREVIEW_FAQ,
  PREVIEW_PRODUCT_EXTRA,
  PREVIEW_PRODUCT_IMAGES,
  getOtherProduct,
} from '@/data/preview-content';
import { PreviewOfferBlock } from './PreviewOfferBlock';
import { formatAED } from '@/lib/utils';

type Props = { product: Product };

export function PreviewProductPage({ product }: Props) {
  const extra = PREVIEW_PRODUCT_EXTRA[product.id];
  const img = PREVIEW_PRODUCT_IMAGES[product.id];
  const other = getOtherProduct(product.id);

  if (!extra) return null;

  return (
    <>
      {/* Hero + offers — namabeauty PDP structure */}
      <section className="bg-gradient-to-b from-pearl to-ivory pt-8 pb-12 md:pt-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap gap-2 mb-6">
            {[extra.unitLabel, extra.volumeLabel, 'COD', 'ضمان 30 يوم'].map((t) => (
              <span key={t} className="text-xs font-bold bg-white border border-sand px-3 py-1.5 rounded-full">
                {t}
              </span>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div className="relative aspect-square max-w-lg mx-auto w-full bg-white rounded-3xl border border-sand p-6 shadow-lg">
              <Image src={img} alt={product.name.ar} fill className="object-contain p-4" priority />
            </div>

            <div>
              <p className="text-sm font-bold text-rose mb-2">{extra.routineLabel}</p>
              <h1 className="text-2xl md:text-4xl font-black text-mocha leading-tight mb-4">
                {extra.heroHeadline}
              </h1>
              <p className="text-taupe text-lg mb-4 leading-relaxed">{extra.heroSub}</p>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} className="text-gold fill-gold" />
                  ))}
                </div>
                <span className="text-sm font-bold text-taupe">
                  5.0 ({product.reviewCountPlaceholder} تقييم) · من {formatAED(199)}
                </span>
              </div>

              <div className="bg-rose/10 border-r-4 border-rose p-4 rounded-l-xl mb-8">
                <p className="text-2xl font-black text-mocha">{extra.stat}</p>
                <p className="text-xs text-taupe mt-1">{extra.statSource}</p>
              </div>

              <PreviewOfferBlock product={product} extra={extra} />
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <div className="bg-white border-y border-sand py-4">
        <div className="max-w-6xl mx-auto px-4 flex flex-wrap justify-center gap-6 text-sm font-bold text-mocha">
          <span className="flex items-center gap-2"><ShieldCheck size={18} className="text-green-600" /> COD · الإمارات</span>
          <span>2–4 أيام توصيل</span>
          <span>ضمان 30 يوم</span>
        </div>
      </div>

      {/* Pain points */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-black text-mocha text-center mb-3">{extra.painHeadline}</h2>
          <p className="text-taupe text-center mb-12">{extra.painSub}</p>
          <div className="grid md:grid-cols-2 gap-6">
            {extra.painItems.map((item, i) => (
              <div key={i} className="bg-pearl border border-sand rounded-2xl p-6">
                <p className="font-bold text-mocha italic mb-4">{item.quote}</p>
                <div className="flex gap-2 items-start">
                  <CheckCircle2 className="text-green-600 shrink-0 mt-0.5" size={18} />
                  <p className="text-sm text-taupe leading-relaxed">{item.solution}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ingredients */}
      <section className="py-16 bg-mocha text-ivory">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-black text-center mb-3">{extra.ingredientHeadline}</h2>
          <p className="text-center text-ivory/80 mb-12">{extra.ingredientSub}</p>
          <div className="grid md:grid-cols-2 gap-6">
            {product.keyIngredients.map((ing) => (
              <div key={ing.name.ar} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="font-black text-xl text-gold mb-2">{ing.name.ar}</h3>
                <p className="text-ivory/85 text-sm leading-relaxed">{ing.benefit.ar}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {['بدون parabens', 'بدون عطور قوية', 'تركيبة يومية', 'مناسب للخليج'].map((t) => (
              <span key={t} className="text-xs font-bold bg-white/10 px-3 py-1.5 rounded-full">{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Expert */}
      <section className="py-12 bg-ivory">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-lg italic text-mocha leading-relaxed mb-4">&ldquo;{extra.expertQuote}&rdquo;</p>
          <p className="text-sm font-bold text-taupe">{extra.expertTitle}</p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-black text-mocha text-center mb-12">وش راح تشوفين خلال أول 30 يوم؟</h2>
          <div className="space-y-6">
            {extra.timeline.map((t, i) => (
              <div key={i} className="flex gap-4 md:gap-6">
                <div className="w-12 h-12 shrink-0 bg-mocha text-ivory rounded-full flex items-center justify-center font-black">
                  {i + 1}
                </div>
                <div>
                  <p className="text-xs font-bold text-rose mb-1">{t.period}</p>
                  <h3 className="font-black text-lg text-mocha mb-1">{t.title}</h3>
                  <p className="text-sm text-taupe">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-16 bg-pearl">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-black text-mocha text-center mb-12">قارني — وقرّري</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {extra.compareAlternatives.map((alt) => (
              <div key={alt.title} className="bg-white border border-sand rounded-2xl p-5">
                <h3 className="font-black text-mocha mb-1">{alt.title}</h3>
                <p className="text-xs text-taupe mb-4">{alt.price}</p>
                <ul className="space-y-2">
                  {alt.points.map((p) => (
                    <li key={p} className="flex gap-2 text-xs text-taupe">
                      <XCircle size={14} className="text-red-500 shrink-0 mt-0.5" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="bg-mocha text-ivory rounded-2xl p-5 border-2 border-gold lg:col-span-1 md:col-span-2 lg:col-span-1">
              <h3 className="font-black mb-1">{extra.compareUs.title}</h3>
              <p className="text-xs text-ivory/70 mb-4">{extra.compareUs.price}</p>
              <ul className="space-y-2">
                {extra.compareUs.points.map((p) => (
                  <li key={p} className="flex gap-2 text-xs">
                    <CheckCircle2 size={14} className="text-gold shrink-0 mt-0.5" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Guarantee */}
      <section className="py-16 bg-white border-t border-sand">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <ShieldCheck className="w-16 h-16 text-gold mx-auto mb-6" />
          <h2 className="text-3xl font-black text-mocha mb-4">30 يوم — أو فلوسك ترجع</h2>
          <p className="text-taupe leading-relaxed mb-8">
            جرّبي الزجاجة الأولى كاملة. إذا ما حسّيتي بفرق يستاهل، تواصلي معنا — استرداد بدون تعقيد.
          </p>
        </div>
      </section>

      {/* Cross-sell */}
      {other && (
        <section className="py-16 bg-ivory">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl font-black text-mocha text-center mb-8">منتج آخر من Skinouva</h2>
            <Link
              href={`/preview/products/${other.slug.ar}`}
              className="flex flex-col sm:flex-row gap-6 bg-white border border-sand rounded-3xl p-6 max-w-2xl mx-auto hover:shadow-lg transition-shadow"
            >
              <div className="relative w-full sm:w-40 aspect-square shrink-0">
                <Image
                  src={PREVIEW_PRODUCT_IMAGES[other.id]}
                  alt={other.name.ar}
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="font-black text-lg text-mocha mb-2">{other.name.ar}</h3>
                <p className="text-sm text-taupe mb-3">{other.subheadline.ar}</p>
                <span className="font-black text-rose">اكتشفي · من {formatAED(199)}</span>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-black text-mocha text-center mb-8">أسئلة شائعة</h2>
          <div className="space-y-3">
            {PREVIEW_FAQ.slice(0, 4).map((item) => (
              <details key={item.q} className="bg-pearl border border-sand rounded-xl p-4">
                <summary className="font-bold text-sm cursor-pointer">{item.q}</summary>
                <p className="text-sm text-taupe mt-3">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
