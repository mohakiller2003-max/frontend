import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/routing';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { CheckoutModal } from '@/components/CheckoutModal';
import { UpsellModal } from '@/components/UpsellModal';
import { UpsellTrigger } from '@/components/UpsellTrigger';
import { PixelDeferredLoader } from '@/components/PixelDeferredLoader';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import type { Metadata } from 'next';

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'brand' });
  return {
    title: `${t('name')} | ${t('nameEn')}`,
    description: t('tagline'),
  };
}

export default async function LocaleLayout({ children, params: { locale } }: Props) {
  if (!routing.locales.includes(locale as 'ar' | 'en')) notFound();

  const messages = await getMessages();
  const isRTL = locale === 'ar';

  return (
    <html lang={locale} dir={isRTL ? 'rtl' : 'ltr'}>
      <head />
      <body>
        <NextIntlClientProvider messages={messages}>
          <PixelDeferredLoader />
          <AnnouncementBar />
          <Header />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
          <CheckoutModal />
          <UpsellModal />
          <UpsellTrigger />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
