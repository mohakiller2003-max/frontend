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
          
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-5 shadow-sm">
            <p className="text-red-700 font-bold text-sm md:text-base leading-snug mb-2 flex items-center gap-2">
              <span className="animate-pulse">🚨</span>
              {locale === 'ar' ? 'هام جداً: خطوة أخيرة لتأكيد طلبك' : 'VERY IMPORTANT: Final step to confirm your order'}
            </p>
            <p className="text-red-600/90 text-xs md:text-sm font-medium leading-relaxed">
              {locale === 'ar' 
                ? 'سيتصل بك فريق التأكيد من الإمارات خلال الـ 24 ساعة القادمة. يرجى الرد على المكالمة لتأكيد العنوان وشحن الطلب فوراً. (إذا لم يتم الرد، سيتم إلغاء الطلب تلقائياً)'
                : 'Our confirmation team will call you within the next 24 hours. Please answer the call to confirm your address and ship the order immediately. (If unanswered, the order will be automatically cancelled)'}
            </p>
          </div>

          <ol className="space-y-3 mb-6">
            {([1, 2, 3] as const).map((step) => (
              <li key={step} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-rose/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-rose">{step}</span>
                </div>
                <p className="text-sm text-mocha/80 leading-snug">{t(`step${step}`)}</p>
              </li>
            ))}
          </ol>
          
          {/* WhatsApp Fast Track */}
          <div className="pt-5 border-t border-sand/60 text-center">
            <p className="text-xs md:text-sm text-taupe font-medium mb-3">
              {locale === 'ar' ? 'مستعجلة؟ أكدي طلبك الآن عبر الواتساب لتسريع الشحن' : 'In a hurry? Confirm your order now via WhatsApp for faster shipping'}
            </p>
            <a 
              href={`https://wa.me/971556710680?text=${encodeURIComponent(locale === 'ar' ? `مرحباً، أود تأكيد طلبي السريع. رقم الطلب: ${orderNumber || 'جديد'}` : `Hello, I want to confirm my fast-track order. Order ID: ${orderNumber || 'New'}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 bg-[#25D366] text-white px-6 py-3.5 rounded-xl font-bold hover:bg-[#20bd5a] transition-all shadow-md active:scale-95"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
              {locale === 'ar' ? 'تأكيد الطلب فوراً عبر واتساب' : 'Confirm Order Now via WhatsApp'}
            </a>
          </div>
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
