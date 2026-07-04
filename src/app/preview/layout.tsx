import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { CartDrawer } from '@/components/CartDrawer';
import { CheckoutModal } from '@/components/CheckoutModal';
import { UpsellModal } from '@/components/UpsellModal';
import { UpsellTrigger } from '@/components/UpsellTrigger';
import { OrderCompleteHandler } from '@/components/OrderCompleteHandler';
import { PreviewBanner, PreviewFooter, PreviewHeader } from '@/components/preview/PreviewShell';
import '../globals.css';

export const metadata: Metadata = {
  title: 'معاينة Skinouva — نسخة جديدة',
  robots: { index: false, follow: false },
};

export default async function PreviewLayout({ children }: { children: React.ReactNode }) {
  const messages = await getMessages({ locale: 'ar' });

  return (
    <html lang="ar" dir="rtl">
      <body className="bg-pearl text-mocha min-h-screen">
        <NextIntlClientProvider locale="ar" messages={messages}>
          <PreviewBanner />
          <PreviewHeader />
          <main>{children}</main>
          <PreviewFooter />
          <CartDrawer />
          <CheckoutModal />
          <UpsellModal />
          <UpsellTrigger />
          <OrderCompleteHandler />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
