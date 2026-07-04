'use client';

import { useEffect, useState, useCallback } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { X, Loader2, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCheckoutStore } from '@/features/checkout/store';
import { acceptUpsell } from '@/lib/api';
import { generateEventId, formatAED } from '@/lib/utils';
import { PRODUCT_MAP, UPSELL_PRICE_AED } from '@/data/products';
import { firePixelEvent } from '@/features/tracking/pixels';
import { ImagePlaceholder } from './ImagePlaceholder';

const UPSELL_SECONDS = 15; // Decreased from 180s to 15s to increase urgency

export function UpsellModal() {
  const t = useTranslations('upsell');
  const locale = useLocale() as 'ar' | 'en';
  const router = useRouter();
  const {
    showUpsell, closeUpsell, orderId, orderNumber, upsellProductId,
    setUpsellAccepted,
  } = useCheckoutStore();

  const [secondsLeft, setSecondsLeft] = useState(UPSELL_SECONDS);
  const [accepting, setAccepting] = useState(false);

  const product = upsellProductId ? PRODUCT_MAP[upsellProductId] : null;

  const goToThankYou = useCallback(() => {
    closeUpsell();
    router.push(`/${locale}/thank-you`);
  }, [closeUpsell, router, locale]);

  useEffect(() => {
    if (showUpsell && upsellProductId && !PRODUCT_MAP[upsellProductId]) {
      goToThankYou();
    }
  }, [showUpsell, upsellProductId, goToThankYou]);

  useEffect(() => {
    if (!showUpsell) {
      setSecondsLeft(UPSELL_SECONDS);
      return;
    }
    firePixelEvent('UpsellViewed', { product_id: upsellProductId || '' }, generateEventId('UpsellViewed'));

    const interval = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(interval);
          firePixelEvent('UpsellSkipped', {}, generateEventId('UpsellSkipped'));
          goToThankYou();
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [showUpsell, goToThankYou, upsellProductId]);

  const handleAccept = async () => {
    if (!orderId || !upsellProductId || accepting) return;
    setAccepting(true);
    const eventId = generateEventId('UpsellAccepted');
    try {
      const result = await acceptUpsell(orderId, {
        product_id: upsellProductId,
        price_aed: UPSELL_PRICE_AED,
        event_id: eventId,
      });
      firePixelEvent('UpsellAccepted', { value: UPSELL_PRICE_AED, currency: 'AED' }, eventId);
      setUpsellAccepted({
        totalAed: result.total_aed,
        productId: upsellProductId,
        priceAed: UPSELL_PRICE_AED,
      });
    } catch {
      // If upsell fails, still go to thank-you
    } finally {
      setAccepting(false);
      goToThankYou();
    }
  };

  const handleSkip = () => {
    firePixelEvent('UpsellSkipped', {}, generateEventId('UpsellSkipped'));
    goToThankYou();
  };

  // Format minutes and seconds
  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const timeString = `${mins}:${secs < 10 ? '0' : ''}${secs}`;

  if (!product) return null;

  return (
    <AnimatePresence>
      {showUpsell && (
        <>
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-mocha/90 z-50 backdrop-blur-sm"
            aria-hidden="true"
          />
          <motion.div
            key="upsell"
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 md:inset-x-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-50 w-full h-[100dvh] md:h-auto md:max-w-md bg-ivory md:rounded-3xl shadow-2xl overflow-y-auto flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-labelledby="upsell-title"
          >
            {/* Header / Urgency Bar */}
            <div className="bg-red-600 text-white text-center py-2.5 px-4 sticky top-0 z-10 shrink-0">
               <p className="font-bold text-sm md:text-base tracking-wide flex items-center justify-center gap-2">
                 <span>⏳</span>
                 {locale === 'ar' ? 'انتظري! طلبك غير مكتمل بعد' : 'WAIT! YOUR ORDER IS NOT COMPLETE'}
               </p>
            </div>

            <div className="flex-1 p-5 md:p-8 flex flex-col">
              {/* Acceptance Graphic */}
              <div className="flex flex-col items-center text-center mb-6">
                 <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-3 border-4 border-white shadow-sm">
                   <CheckCircle2 className="w-8 h-8 text-green-500" />
                 </div>
                 <p className="text-sm font-bold text-green-600 mb-1">
                   {locale === 'ar' ? 'تم حفظ طلبك المبدئي بنجاح' : 'Initial Order Reserved'}
                 </p>
                 <h2 id="upsell-title" className="text-2xl md:text-3xl font-black text-mocha leading-tight">
                   {locale === 'ar' ? 'قبل أن نغلق الصندوق...' : 'Before we close your box...'}
                 </h2>
              </div>

              {/* The Offer */}
              <div className="bg-white rounded-2xl p-5 border-2 border-gold/40 shadow-lg relative mb-6">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-mocha text-[11px] font-black px-4 py-1 rounded-full uppercase tracking-widest whitespace-nowrap shadow-md">
                   {locale === 'ar' ? 'عرض لمرة واحدة فقط' : 'ONE-TIME ONLY OFFER'}
                </div>

                <p className="text-center text-taupe font-medium text-sm leading-relaxed mt-2 mb-5">
                   {locale === 'ar' 
                     ? `أضيفي السيروم المكمل لروتينك الآن بخصم هائل ولن تدفعي أي رسوم شحن إضافية.` 
                     : `Add the complementary serum to your routine now at a massive discount. No extra shipping fees.`}
                </p>

                <div className="flex gap-4 items-center">
                  <ImagePlaceholder className="w-24 h-24 flex-shrink-0 !rounded-xl border border-sand shadow-sm" aspect="square" variant="serum" />
                  <div>
                    <p className="font-black text-mocha text-base leading-snug mb-1">
                      {product.shortHeadline[locale]}
                    </p>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm text-taupe line-through font-medium">{formatAED(199)}</p>
                      <div className="bg-red-100 text-red-600 text-[10px] font-bold px-1.5 rounded">50% OFF</div>
                    </div>
                    <p className="text-2xl font-black text-rose">{formatAED(UPSELL_PRICE_AED)}</p>
                  </div>
                </div>
              </div>

              {/* Timer & Buttons */}
              <div className="mt-auto">
                <div className="bg-sand/30 rounded-full py-1.5 px-4 flex items-center justify-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                  <p className="text-sm font-bold text-mocha">
                    {locale === 'ar' ? 'ينتهي العرض خلال:' : 'Offer expires in:'} <span className="text-red-600 font-black">{timeString}</span>
                  </p>
                </div>

                <button
                  onClick={handleAccept}
                  disabled={accepting}
                  className="w-full bg-mocha text-ivory py-4 rounded-xl font-black text-lg hover:bg-mocha/90 disabled:opacity-60 transition-all focus:outline-none flex items-center justify-center gap-2 mb-3 shadow-xl active:scale-[0.98]"
                >
                  {accepting ? <Loader2 size={20} className="animate-spin" /> : <Sparkles size={20} />}
                  {locale === 'ar' ? 'أضيفيه إلى طلبي الآن' : 'Add to my order now'}
                </button>

                <button
                  onClick={handleSkip}
                  className="w-full text-taupe text-[13px] py-3 hover:text-mocha hover:underline transition-colors focus:outline-none font-medium"
                >
                  {locale === 'ar' ? 'لا شكراً، أريد شحن طلبي كما هو' : 'No thanks, ship my order as is'}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
