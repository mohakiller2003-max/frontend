import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';
import { SectionShell } from '@/components/SectionShell';
import { TrustBadges } from '@/components/TrustBadges';

type Props = { params: { locale: string } };

export default async function AboutPage({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: 'about' });
  const whyT = await getTranslations({ locale, namespace: 'why' });
  const loc = locale as 'ar' | 'en';

  return (
    <>
      <section className="bg-gradient-to-br from-ivory via-pearl to-sand py-16 md:py-20">
        <div className="max-w-content mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-mocha mb-5">{t('headline')}</h1>
              <p className="text-taupe leading-relaxed text-base md:text-lg mb-6">{t('body')}</p>
              <TrustBadges compact className="justify-start" />
            </div>
            <div className="relative aspect-[3/4] max-w-sm mx-auto w-full overflow-hidden rounded-card shadow-soft">
              <Image
                src="/about-founder.png"
                alt={loc === 'ar' ? 'سكينوفا — من نحن' : 'Skinouva — About us'}
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 384px"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <SectionShell background="pearl">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-mocha mb-4">{t('mission')}</h2>
          <p className="text-taupe leading-relaxed">{t('missionBody')}</p>
        </div>
      </SectionShell>

      <SectionShell>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-mocha text-center mb-8">{whyT('title')}</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {(['point1', 'point2', 'point3', 'point4'] as const).map((key) => (
              <div key={key} className="flex items-start gap-3 bg-pearl border border-sand rounded-card p-4">
                <div className="w-8 h-8 rounded-full bg-rose/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-rose text-sm font-bold">✓</span>
                </div>
                <p className="text-mocha font-medium leading-snug">{whyT(key)}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionShell>

      <SectionShell background="mocha" className="bg-mocha">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-ivory mb-4">
            {loc === 'ar' ? 'اكتشفي سيروماتنا' : 'Discover our serums'}
          </h2>
          <Link
            href={`/${locale}/collection`}
            className="inline-flex items-center justify-center bg-ivory text-mocha px-10 py-4 rounded-pill font-semibold hover:bg-pearl transition-colors"
          >
            {loc === 'ar' ? 'تسوقي الآن' : 'Shop Now'}
          </Link>
        </div>
      </SectionShell>
    </>
  );
}
