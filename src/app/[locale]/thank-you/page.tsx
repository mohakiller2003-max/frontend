'use client';

import { useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { CheckCircle2, Package, Phone, CreditCard } from 'lucide-react';
import { useCheckoutStore } from '@/features/checkout/store';
import { formatAED } from '@/lib/utils';

export default function ThankYouPage() {
  const t = useTranslations('thankYou');
  const locale = useLocale() as 'ar' | 'en';
  const { orderNumber, totalAed, customerName, customerPhone, reset } = useCheckoutStore();

  useEffect(() => {
    return () => {
      // Reset on unmount so revisiting doesn't show stale data
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-ivory via-pearl to-sand py-16 md:py-24">
      <div className="max-w-lg mx-auto px-4 md:px-6">
        {/* Success check */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-full bg-success/10 border-2 border-success/30 flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 size={40} className="text-success" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-mocha mb-3">{t('headline')}</h1>
          <p className="text-taupe leading-relaxed">{t('body')}</p>
        </div>

        {/* Order summary card */}
        <div className="bg-ivory border border-sand rounded-card-lg p-6 shadow-soft mb-6 space-y-4">
          {orderNumber && (
            <div className="flex items-center justify-between text-sm border-b border-sand pb-3">
              <span className="text-taupe">{t('orderNumber')}</span>
              <span className="font-bold text-mocha">{orderNumber}</span>
            </div>
          )}
          {customerPhone && (
            <div className="flex items-center justify-between text-sm border-b border-sand pb-3">
              <div className="flex items-center gap-2 text-taupe">
                <Phone size={14} aria-hidden="true" />
                {t('phone')}
              </div>
              <span className="font-medium text-mocha" dir="ltr">{customerPhone}</span>
            </div>
          )}
          {totalAed && (
            <div className="flex items-center justify-between text-sm border-b border-sand pb-3">
              <span className="text-taupe">{t('orderTotal')}</span>
              <span className="font-bold text-mocha text-lg">{formatAED(totalAed)}</span>
            </div>
          )}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-taupe">
              <CreditCard size={14} aria-hidden="true" />
              {t('paymentMethod')}
            </div>
            <span className="font-medium text-mocha">{t('cod')}</span>
          </div>
        </div>

        {/* What happens next */}
        <div className="bg-pearl border border-sand rounded-card-lg p-6 mb-6">
          <h2 className="font-semibold text-mocha mb-4 flex items-center gap-2">
            <Package size={18} className="text-rose" aria-hidden="true" />
            {t('whatsNext')}
          </h2>
          <ol className="space-y-3">
            {([1, 2, 3] as const).map((step) => (
              <li key={step} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-rose/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-rose">{step}</span>
                </div>
                <p className="text-sm text-mocha/80 leading-snug">{t(`step${step}`)}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* Back to store */}
        <div className="text-center">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center justify-center bg-mocha text-ivory px-8 py-4 rounded-pill font-semibold hover:bg-mocha/90 transition-colors"
          >
            {t('continueShopping')}
          </Link>
        </div>
      </div>
    </div>
  );
}
