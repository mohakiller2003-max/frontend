'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { ChevronDown } from 'lucide-react';
import { Logo } from './Logo';
import { LanguageSwitcher } from './LanguageSwitcher';
import { cn } from '@/lib/utils';
import { CONTACT_EMAIL } from '@/lib/site';

function FooterSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[#134E3A]/10 md:border-none">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between py-4 md:py-0 md:cursor-default focus:outline-none"
        aria-expanded={open}
      >
        <h3 className="text-sm font-bold text-[#134E3A]">{title}</h3>
        <ChevronDown
          size={16}
          className={cn(
            'text-[#134E3A]/50 transition-transform duration-300 md:hidden',
            open && 'rotate-180'
          )}
        />
      </button>
      <div
        className={cn(
          'overflow-hidden transition-all duration-300 md:block md:overflow-visible',
          open ? 'max-h-96 pb-4' : 'max-h-0 md:max-h-none'
        )}
      >
        {children}
      </div>
    </div>
  );
}

/** Nama-style footer: cream bg + forest green text */
export function Footer() {
  const t = useTranslations('footer');
  const nav = useTranslations('nav');
  const pol = useTranslations('policies');
  const locale = useLocale();
  const year = new Date().getFullYear();

  const productLinks = [
    { href: `/${locale}/products/tranexamic-niacinamide-serum`, label: locale === 'ar' ? 'سيروم الترانيكساميك والنياسيناميد' : 'Tranexamic Serum' },
    { href: `/${locale}/products/azelaic-acne-marks-serum`, label: locale === 'ar' ? 'سيروم الأزيليك' : 'Azelaic Serum' },
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

  const linkClass = 'text-[#5A6B5C] text-sm hover:text-[#134E3A] transition-colors';

  return (
    <footer className="bg-[#F4F0E5] text-[#134E3A] pt-12 pb-8 border-t border-[#E8E3DC]">
      <div className="max-w-content mx-auto px-4 md:px-6">

        {/* Brand — mobile */}
        <div className="mb-6 md:mb-0 md:hidden">
          <div className="mb-3">
            <Logo locale={locale} />
          </div>
          <p className="text-[#5A6B5C] text-sm leading-relaxed mb-3">{t('tagline')}</p>
          <div className="mb-3 text-start">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-[#134E3A] text-sm hover:underline transition-colors inline-block"
              dir="ltr"
            >
              {CONTACT_EMAIL}
            </a>
          </div>
          <LanguageSwitcher className="border-[#134E3A]/30 text-[#134E3A] hover:border-[#134E3A]/60 hover:bg-[#134E3A]/5" />
        </div>

        <div className="md:grid md:grid-cols-4 md:gap-8 md:mb-10">
          {/* Brand — desktop */}
          <div className="hidden md:block">
            <div className="mb-4">
              <Logo locale={locale} />
            </div>
            <p className="text-[#5A6B5C] text-sm leading-relaxed mb-3">{t('tagline')}</p>
            <div className="mb-4 text-start">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-[#134E3A] text-sm hover:underline transition-colors inline-block"
                dir="ltr"
              >
                {CONTACT_EMAIL}
              </a>
            </div>
            <LanguageSwitcher className="border-[#134E3A]/30 text-[#134E3A] hover:border-[#134E3A]/60 hover:bg-[#134E3A]/5" />
          </div>

          <FooterSection title={t('products')}>
            <ul className="space-y-2.5">
              {productLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkClass}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </FooterSection>

          <FooterSection title={t('legal')}>
            <ul className="space-y-2.5 mb-4">
              {policyLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkClass}>{l.label}</Link>
                </li>
              ))}
            </ul>
            <div className="flex gap-3 mt-3">
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="w-8 h-8 rounded-full border border-[#134E3A]/25 text-[#134E3A] flex items-center justify-center hover:bg-[#134E3A]/5 transition-colors text-xs font-bold">TK</a>
              <a href="https://snapchat.com" target="_blank" rel="noopener noreferrer" aria-label="Snapchat" className="w-8 h-8 rounded-full border border-[#134E3A]/25 text-[#134E3A] flex items-center justify-center hover:bg-[#134E3A]/5 transition-colors text-xs font-bold">SC</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-8 h-8 rounded-full border border-[#134E3A]/25 text-[#134E3A] flex items-center justify-center hover:bg-[#134E3A]/5 transition-colors text-xs font-bold">IG</a>
            </div>
          </FooterSection>

          <FooterSection title={t('quickLinks')}>
            <ul className="space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkClass}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </FooterSection>
        </div>

        <div className="border-t border-[#134E3A]/10 mt-4 md:mt-0 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-[#5A6B5C] text-xs">
          <p>© {year} Skinouva / سكينوفا. {t('rights')}.</p>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-pill border border-[#134E3A]/20 text-[#134E3A]">
              <span>🚚</span>
              <span>{locale === 'ar' ? 'الدفع عند الاستلام — الإمارات' : 'Cash on Delivery — UAE'}</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
