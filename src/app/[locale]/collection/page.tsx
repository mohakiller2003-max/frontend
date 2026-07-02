import { getTranslations } from 'next-intl/server';
import { PRODUCTS } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import { FaqAccordion } from '@/components/FaqAccordion';
import { SectionShell } from '@/components/SectionShell';
import { TrustBadges } from '@/components/TrustBadges';

type Props = { params: { locale: string } };

export default async function CollectionPage({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: 'collection' });
  const faqT = await getTranslations({ locale, namespace: 'faq' });
  const loc = locale as 'ar' | 'en';
  const faqItems = faqT.raw('items') as { q: string; a: string }[];

  const concerns = [
    {
      concern: { ar: 'البقع الداكنة', en: 'Dark Spots' },
      serum: { ar: 'سيروم الترانيكساميك والنياسيناميد', en: 'Tranexamic + Niacinamide Serum' },
      icon: '🔆',
    },
    {
      concern: { ar: 'آثار الحبوب', en: 'Blemish Marks' },
      serum: { ar: 'سيروم الأزيليك', en: 'Azelaic Serum' },
      icon: '✨',
    },
    {
      concern: { ar: 'تفاوت لون البشرة', en: 'Uneven Tone' },
      serum: { ar: 'سيروم الترانيكساميك والنياسيناميد', en: 'Tranexamic + Niacinamide Serum' },
      icon: '🌸',
    },
    {
      concern: { ar: 'الحبوب الهرمونية', en: 'Hormonal Breakouts' },
      serum: { ar: 'سيروم الأزيليك', en: 'Azelaic Serum' },
      icon: '🌿',
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-ivory via-pearl to-sand py-16 md:py-20">
        <div className="max-w-content mx-auto px-4 md:px-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-mocha mb-4">{t('headline')}</h1>
          <p className="text-taupe text-base md:text-lg max-w-xl mx-auto mb-8">{t('subheadline')}</p>
          <TrustBadges compact />
        </div>
      </section>

      {/* Products Grid */}
      <SectionShell>
        <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          {PRODUCTS.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </SectionShell>

      {/* Concern matching */}
      <SectionShell background="pearl">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-mocha text-center mb-8">{t('compare')}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {concerns.map((c) => (
              <div key={c.concern.ar} className="bg-ivory border border-sand rounded-card p-4 flex gap-3">
                <span className="text-2xl">{c.icon}</span>
                <div>
                  <p className="font-semibold text-mocha">{c.concern[loc]}</p>
                  <p className="text-sm text-taupe mt-0.5">{c.serum[loc]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionShell>

      {/* Bundle block */}
      <SectionShell background="ivory">
        <div className="max-w-2xl mx-auto bg-mocha rounded-card-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-ivory mb-3">{t('bundleTitle')}</h2>
          <p className="text-ivory/70 mb-6">{t('bundleDesc')}</p>
          <div className="flex flex-wrap justify-center gap-3">
            {PRODUCTS.map((p) => (
              <div key={p.id} className="bg-ivory/10 border border-ivory/20 rounded-pill px-4 py-2 text-sm text-ivory">
                {p.shortHeadline[loc]}
              </div>
            ))}
          </div>
        </div>
      </SectionShell>

      {/* FAQ */}
      <SectionShell background="pearl">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-mocha text-center mb-8">{faqT('title')}</h2>
          <FaqAccordion items={faqItems.slice(0, 5)} />
        </div>
      </SectionShell>
    </>
  );
}
