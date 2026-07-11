'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { Logo } from './Logo';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useCartStore } from '@/features/cart/store';

export function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { itemCount, open: openCart } = useCartStore();
  const count = itemCount();

  const navLinks = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/collection`, label: t('collection') },
    { href: `/${locale}/about`, label: t('about') },
    { href: `/${locale}/contact`, label: t('contact') },
  ];

  return (
    <header className="sticky top-0 z-50 bg-ivory border-b border-sand/50 shadow-soft">
      <div className="max-w-content mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-18">
          <Logo locale={locale} />

          <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-mocha/80 hover:text-mocha text-sm font-medium transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose rounded"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher />
            <div
              role="button"
              tabIndex={0}
              onClick={openCart}
              onKeyDown={(e) => e.key === 'Enter' && openCart()}
              className="relative p-2 text-mocha hover:text-rose transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose rounded-full cursor-pointer"
              aria-label={t('cart')}
            >
              <ShoppingBag size={22} />
              {isMounted && count > 0 && (
                <div className="absolute -top-0.5 -end-0.5 w-5 h-5 bg-ink text-ivory text-[10px] font-bold rounded-full flex items-center justify-center">
                  {count}
                </div>
              )}
            </div>
          </div>

          <div className="flex md:hidden items-center gap-2">
            <LanguageSwitcher className="text-xs px-2 py-1" />
            <div
              role="button"
              tabIndex={0}
              onClick={openCart}
              onKeyDown={(e) => e.key === 'Enter' && openCart()}
              className="relative p-2 text-mocha focus:outline-none cursor-pointer"
              aria-label={t('cart')}
            >
              <ShoppingBag size={20} />
              {isMounted && count > 0 && (
                <div className="absolute -top-0.5 -end-0.5 w-4 h-4 bg-rose text-ivory text-[9px] font-bold rounded-full flex items-center justify-center">
                  {count}
                </div>
              )}
            </div>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-mocha focus:outline-none"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-ivory border-t border-sand/60">
          <nav className="max-w-content mx-auto px-4 py-4 flex flex-col gap-1" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-mocha py-3 px-2 text-base font-medium border-b border-sand/40 last:border-0 hover:text-rose transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="py-3 px-2 border-b border-sand/40">
              <span className="text-mocha text-sm font-semibold opacity-70 mb-2 block">{locale === 'ar' ? 'المنتجات' : 'Products'}</span>
              <Link href={`/${locale}/products/${locale === 'ar' ? 'serum-tranexamic-niacinamide' : 'tranexamic-niacinamide-serum'}`} onClick={() => setMobileOpen(false)} className="block text-mocha py-2 hover:text-rose transition-colors text-sm">
                {locale === 'ar' ? 'سيروم الترانيكساميك والنياسيناميد' : 'Tranexamic Serum'}
              </Link>
              <Link href={`/${locale}/products/${locale === 'ar' ? 'serum-azelaic-acne-marks' : 'azelaic-acne-marks-serum'}`} onClick={() => setMobileOpen(false)} className="block text-mocha py-2 hover:text-rose transition-colors text-sm">
                {locale === 'ar' ? 'سيروم الأزيليك' : 'Azelaic Serum'}
              </Link>
            </div>
            <div className="py-3 px-2">
              <span className="text-mocha text-sm font-semibold opacity-70 mb-2 block">{locale === 'ar' ? 'السياسات' : 'Policies'}</span>
              <Link href={`/${locale}/policies/privacy`} onClick={() => setMobileOpen(false)} className="block text-mocha py-2 hover:text-rose transition-colors text-sm">{locale === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}</Link>
              <Link href={`/${locale}/policies/terms`} onClick={() => setMobileOpen(false)} className="block text-mocha py-2 hover:text-rose transition-colors text-sm">{locale === 'ar' ? 'الشروط والأحكام' : 'Terms & Conditions'}</Link>
              <Link href={`/${locale}/policies/shipping`} onClick={() => setMobileOpen(false)} className="block text-mocha py-2 hover:text-rose transition-colors text-sm">{locale === 'ar' ? 'سياسة الشحن والدفع عند الاستلام' : 'Shipping & COD Policy'}</Link>
              <Link href={`/${locale}/policies/returns`} onClick={() => setMobileOpen(false)} className="block text-mocha py-2 hover:text-rose transition-colors text-sm">{locale === 'ar' ? 'سياسة الإرجاع' : 'Returns Policy'}</Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
