import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/routing';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import {
  CartDrawer,
  CheckoutModal,
  UpsellModal,
  UpsellTrigger,
  OrderCompleteHandler,
} from '@/components/ClientOverlays';
import { AnalyticsTracker } from '@/components/AnalyticsTracker';
import { PixelDeferredLoader } from '@/components/PixelDeferredLoader';
import { DomSafetyPatch } from '@/components/DomSafetyPatch';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { HtmlLangDir } from '@/components/HtmlLangDir';
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
    icons: {
      icon: [{ url: '/icon-cropped.png', type: 'image/png' }],
      apple: [{ url: '/apple-icon-cropped.png', type: 'image/png' }],
      shortcut: [{ url: '/icon-cropped.png', type: 'image/png' }],
    },
  };
}

export default async function LocaleLayout({ children, params: { locale } }: Props) {
  if (!routing.locales.includes(locale as 'ar' | 'en')) notFound();

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <HtmlLangDir locale={locale} />
      <DomSafetyPatch />
      <PixelDeferredLoader />
      <AnalyticsTracker />
      <Header />
      <AnnouncementBar />
      <main>{children}</main>
      <Footer />
      <CartDrawer />
      <CheckoutModal />
      <UpsellModal />
      <UpsellTrigger />
      <OrderCompleteHandler />
    </NextIntlClientProvider>
  );
}
