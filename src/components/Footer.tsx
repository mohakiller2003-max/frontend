import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { Logo } from './Logo';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Footer() {
  const t = useTranslations('footer');
  const nav = useTranslations('nav');
  const pol = useTranslations('policies');
  const locale = useLocale();
  const year = new Date().getFullYear();

  const productLinks = [
    { href: `/${locale}/products/${locale === 'ar' ? 'serum-tranexamic-niacinamide' : 'tranexamic-niacinamide-serum'}`, label: locale === 'ar' ? 'سيروم الترانيكساميك والنياسيناميد' : 'Tranexamic Serum' },
    { href: `/${locale}/products/${locale === 'ar' ? 'serum-azelaic-acne-marks' : 'azelaic-acne-marks-serum'}`, label: locale === 'ar' ? 'سيروم الأزيليك' : 'Azelaic Serum' },
  ];

  const policyLinks = [
    { href: `/${locale}/policies/privacy`, label: pol('privacy') },
    { href: `/${locale}/policies/terms`, label: pol('terms') },
    { href: `/${locale}/policies/shipping`, label: pol('shipping') },
    { href: `/${locale}/policies/returns`, label: pol('returns') },
  ];

  const quickLinks = [
    { href: `/${locale}`, label: nav('home') },
    { href: `/${locale}/collection`, label: nav('collection') },
    { href: `/${locale}/about`, label: nav('about') },
    { href: `/${locale}/contact`, label: nav('contact') },
  ];

  return (
    <footer className="bg-mocha text-ivory/90 pt-14 pb-8">
      <div className="max-w-content mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4">
              <Logo locale={locale} className="[&_div]:bg-ivory/20 [&_span]:text-ivory [&_.font-arabic]:text-ivory [&_.text-taupe]:text-ivory/60" />
            </div>
            <p className="text-ivory/60 text-sm leading-relaxed mb-4">{t('tagline')}</p>
            <LanguageSwitcher className="border-ivory/30 text-ivory hover:border-ivory/60 hover:bg-ivory/10" />
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-ivory mb-4 uppercase tracking-wider">{t('quickLinks')}</h3>
            <ul className="space-y-2">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-ivory/60 text-sm hover:text-ivory transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-sm font-semibold text-ivory mb-4 uppercase tracking-wider">{t('products')}</h3>
            <ul className="space-y-2">
              {productLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-ivory/60 text-sm hover:text-ivory transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies & Contact */}
          <div>
            <h3 className="text-sm font-semibold text-ivory mb-4 uppercase tracking-wider">{t('legal')}</h3>
            <ul className="space-y-2 mb-4">
              {policyLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-ivory/60 text-sm hover:text-ivory transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
            <div className="flex gap-3 mt-3">
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="w-8 h-8 rounded-full bg-ivory/10 flex items-center justify-center hover:bg-ivory/20 transition-colors text-xs font-bold">TK</a>
              <a href="https://snapchat.com" target="_blank" rel="noopener noreferrer" aria-label="Snapchat" className="w-8 h-8 rounded-full bg-ivory/10 flex items-center justify-center hover:bg-ivory/20 transition-colors text-xs font-bold">SC</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-8 h-8 rounded-full bg-ivory/10 flex items-center justify-center hover:bg-ivory/20 transition-colors text-xs font-bold">IG</a>
            </div>
          </div>
        </div>

        <div className="border-t border-ivory/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-ivory/40 text-xs">
          <p>© {year} Skinouva / سكينوفا. {t('rights')}.</p>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 bg-ivory/5 px-3 py-1 rounded-pill border border-ivory/10">
              <span>🚚</span>
              <span>{locale === 'ar' ? 'الدفع عند الاستلام — الإمارات' : 'Cash on Delivery — UAE'}</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
