'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations, useLocale } from 'next-intl';
import { X, ShieldCheck, Loader2, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/features/cart/store';
import { useCheckoutStore } from '@/features/checkout/store';
import { createOrder, getApiErrorCode } from '@/lib/api';
import { generateEventId, formatAED, isValidUAEPhone } from '@/lib/utils';
import { getStoredUtm, getFbCookies } from '@/lib/utm';
import { PRODUCT_MAP } from '@/data/products';
import { cn } from '@/lib/utils';
import { firePixelEvent } from '@/features/tracking/pixels';

function makeSchema(t: (k: string) => string) {
  return z.object({
    name: z.string().min(2, t('nameRequired')),
    phone: z.string().min(9, t('phoneRequired')).refine(isValidUAEPhone, t('phoneInvalid')),
  });
}

type FormData = { name: string; phone: string };

export function CheckoutModal() {
  const t = useTranslations('checkout');
  const vt = useTranslations('validation');
  const locale = useLocale() as 'ar' | 'en';
  const { isOpen, closeCheckout, isSubmitting, setSubmitting, setOrderConfirmed } = useCheckoutStore();
  const { items, total, clearCart } = useCartStore();

  const schema = makeSchema(vt);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<FormData>({ 
    resolver: zodResolver(schema),
    mode: 'onChange' // Triggers validation as user types, no blur required
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      firePixelEvent('InitiateCheckout', {}, generateEventId('InitiateCheckout'));
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    if (!errors.root) return;
    document.getElementById('checkout-root-error')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [errors.root]);

  const onSubmit = async (data: FormData) => {
    if (isSubmitting) return;
    if (items.length === 0) {
      setError('root', { message: vt('submitError') });
      return;
    }
    setSubmitting(true);

    const purchaseEventId = generateEventId('Purchase');
    const utm = getStoredUtm();
    const fb = getFbCookies();

    const orderItems = items.map((item) => ({
      product_id: item.productId,
      quantity: item.quantity,
      price_aed: item.priceAed,
    }));

    const subtotalVal = total();

    try {
      const result = await createOrder({
        locale,
        customer: { name: data.name.trim(), phone: data.phone.trim() },
        items: orderItems,
        totals: { subtotal_aed: subtotalVal, total_aed: subtotalVal },
        tracking: {
          purchase_event_id: purchaseEventId,
          utm_source: utm.utm_source,
          utm_medium: utm.utm_medium,
          utm_campaign: utm.utm_campaign,
          utm_content: utm.utm_content,
          utm_term: utm.utm_term,
          fbclid: utm.fbclid,
          ttclid: utm.ttclid,
          sc_click_id: utm.sc_click_id,
          landing_page: typeof window !== 'undefined' ? window.location.href : undefined,
          referrer: typeof document !== 'undefined' ? document.referrer : undefined,
          fbp: fb.fbp,
          fbc: fb.fbc,
        },
      });

      // Fire browser purchase pixel after backend confirms
      firePixelEvent('Purchase', {
        value: result.total_aed,
        currency: 'AED',
        content_ids: items.map((i) => i.productId),
        contents: items.map((i) => ({ id: i.productId, quantity: i.quantity })),
        order_id: result.order_number,
      }, purchaseEventId);

      clearCart(); // Explicitly clear the cart to ensure it's empty
      
      setOrderConfirmed({
        orderId: result.order_id,
        orderNumber: result.order_number,
        totalAed: result.total_aed,
        customerName: data.name.trim(),
        customerPhone: data.phone.trim(),
        orderItems: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          priceAed: item.priceAed,
        })),
        upsellProductId: result.upsell?.product_id || null,
        purchaseEventId,
      });

      reset();
    } catch (err: unknown) {
      const code = getApiErrorCode(err);
      if (code === 'INVALID_PHONE') {
        setError('phone', { message: vt('phoneInvalid') });
      } else if (code === 'GEO_BLOCKED') {
        setError('root', { message: vt('geoBlocked') });
      } else if (
        err instanceof TypeError ||
        (err instanceof DOMException && err.name === 'AbortError')
      ) {
        setError('root', { message: vt('networkError') });
      } else {
        setError('root', { message: vt('submitError') });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center pointer-events-none">
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-mocha/50 pointer-events-auto"
            onClick={closeCheckout}
            aria-hidden="true"
          />
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full h-[92dvh] md:h-auto md:max-h-[90vh] md:w-[450px] bg-ivory rounded-t-3xl md:rounded-3xl shadow-[0_-20px_40px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col pointer-events-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="checkout-title"
          >
            {/* Header — compact on mobile so form fields stay visible */}
            <div className="flex flex-col px-4 md:px-5 pt-10 pb-3 md:pt-12 md:pb-4 border-b border-sand shrink-0 bg-white relative">
              <button
                onClick={closeCheckout}
                className={cn(
                  "absolute top-3 md:top-4 p-2 text-taupe hover:text-mocha rounded-full hover:bg-pearl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-rose",
                  locale === 'ar' ? 'left-3 md:left-4' : 'right-3 md:right-4'
                )}
                aria-label="Close"
              >
                <X size={22} className="md:w-6 md:h-6" />
              </button>
              
              <div className="text-center mb-2 md:mb-3 mt-0 md:mt-0">
                <h2 id="checkout-title" className="font-extrabold text-mocha text-xl md:text-2xl mb-1">{t('title')}</h2>
              </div>
              
              <div className="bg-red-50 border border-red-100 rounded-lg px-2 py-1.5 md:p-2 text-center mb-2 md:mb-3 mx-0 md:mx-4">
                <p className="text-[11px] md:text-[13px] font-bold text-red-600 md:animate-pulse leading-snug">{t('urgency')}</p>
              </div>
              
              <div className="hidden md:flex justify-center items-center gap-1.5 text-xs font-medium text-mocha/80">
                <div className="flex text-gold">
                  <Star size={14} className="fill-gold" />
                  <Star size={14} className="fill-gold" />
                  <Star size={14} className="fill-gold" />
                  <Star size={14} className="fill-gold" />
                  <Star size={14} className="fill-gold" />
                </div>
                <span>{t('socialProof')}</span>
              </div>
            </div>

            {/* Order summary — desktop only (mobile total lives inside form) */}
            <div className="hidden md:block px-5 py-4 bg-pearl border-b border-sand shrink-0">
              <h3 className="font-bold text-mocha text-sm mb-3">{t('yourOrder')}</h3>
              <div className="space-y-3">
                {items.map((item) => {
                  const p = PRODUCT_MAP[item.productId];
                  if (!p) return null;
                  return (
                    <div key={item.productId} className="flex gap-3">
                      <div className="w-12 h-12 flex-shrink-0 bg-white rounded-md border border-sand p-1">
                        <img src="/placeholder.png" alt="" className="w-full h-full object-cover opacity-10" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-mocha text-[13px] leading-snug line-clamp-2">{p.name[locale]}</p>
                        <p className="text-[11px] text-taupe mt-1">
                          {item.quantity} {item.quantity === 1 ? t('month') : t('months')}
                        </p>
                      </div>
                      <div className="font-bold text-mocha text-sm flex-shrink-0 ms-2">{formatAED(item.priceAed)}</div>
                    </div>
                  );
                })}
                <div className="flex justify-between items-end pt-3 border-t border-sand/60">
                  <div className="flex flex-col">
                    <span className="font-bold text-mocha text-sm">{t('total')}</span>
                    <span className="text-[11px] font-bold text-success mt-0.5">{t('shipping')}</span>
                  </div>
                  <span className="text-xl font-black text-mocha">{formatAED(total())}</span>
                </div>
              </div>
            </div>

            {/* Form — name + phone stacked, visible together on mobile */}
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-1 min-h-0 overflow-hidden bg-white" noValidate>
              <div className="px-4 md:px-5 pt-3 pb-2 md:py-5 shrink-0 space-y-2.5 md:space-y-4 md:overflow-y-auto md:flex-1">
                {/* Mobile: compact total above fields */}
                <div className="flex items-center justify-between rounded-xl bg-pearl px-3 py-2 border border-sand/60 md:hidden">
                  <span className="font-bold text-mocha text-sm">{t('total')}</span>
                  <span className="text-lg font-black text-mocha">{formatAED(total())}</span>
                </div>
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-[13px] md:text-sm font-bold text-mocha mb-1">
                    {t('nameLabel')}
                  </label>
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    enterKeyHint="next"
                    className={cn(
                      'w-full px-3 py-2.5 md:px-4 md:py-3.5 rounded-xl border bg-pearl/30 text-mocha placeholder:text-taupe/40 text-base md:text-sm focus:outline-none focus:ring-2 focus:ring-mocha transition-all',
                      errors.name ? 'border-error focus:ring-error' : 'border-sand focus:border-mocha'
                    )}
                    placeholder={t('namePlaceholder')}
                    {...register('name')}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-1 text-[11px] md:text-xs text-error font-medium" role="alert">{errors.name.message}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-[13px] md:text-sm font-bold text-mocha mb-1">
                    {t('phoneLabel')}
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    enterKeyHint="done"
                    dir="ltr"
                    className={cn(
                      'w-full px-3 py-2.5 md:px-4 md:py-3.5 rounded-xl border bg-pearl/30 text-mocha placeholder:text-taupe/40 text-base md:text-sm focus:outline-none focus:ring-2 focus:ring-mocha transition-all',
                      locale === 'ar' ? 'text-right' : 'text-left',
                      errors.phone ? 'border-error focus:ring-error' : 'border-sand focus:border-mocha'
                    )}
                    placeholder={t('phonePlaceholder')}
                    {...register('phone')}
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                  />
                  {errors.phone ? (
                    <p id="phone-error" className="mt-1 text-[11px] md:text-xs text-error font-medium" role="alert">{errors.phone.message}</p>
                  ) : (
                    <p className="hidden md:block mt-1.5 text-[11px] text-taupe/80">{t('phoneSubNote')}</p>
                  )}
                </div>

                {/* Root error */}
                {errors.root && (
                  <p id="checkout-root-error" className="text-[11px] md:text-xs text-error bg-error/5 border border-error/20 rounded-lg px-3 py-2 font-medium" role="alert">
                    {errors.root.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <div className="px-4 md:px-5 py-3 md:py-4 bg-white border-t border-sand shrink-0 shadow-[0_-10px_20px_rgba(0,0,0,0.03)] pb-safe">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-success text-white py-3.5 md:py-4 rounded-xl font-black text-sm md:text-[15px] hover:bg-success/90 disabled:opacity-60 disabled:cursor-not-allowed transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-success flex flex-col items-center justify-center shadow-lg active:scale-[0.98] mb-2 md:mb-3"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <Loader2 size={18} className="animate-spin" aria-hidden="true" />
                      <span>{t('submitting')}</span>
                    </div>
                  ) : (
                    <span>{t('submitCta')}</span>
                  )}
                </button>

                <div className="hidden md:flex justify-between items-center px-1 md:px-2">
                  <div className="flex flex-col items-center gap-0.5 md:gap-1">
                    <ShieldCheck size={14} className="text-success md:w-4 md:h-4" />
                    <span className="text-[9px] md:text-[10px] font-bold text-mocha">{t('benefit1')}</span>
                  </div>
                  <div className="flex flex-col items-center gap-0.5 md:gap-1">
                    <ShieldCheck size={14} className="text-success md:w-4 md:h-4" />
                    <span className="text-[9px] md:text-[10px] font-bold text-mocha">{t('benefit2')}</span>
                  </div>
                  <div className="flex flex-col items-center gap-0.5 md:gap-1">
                    <ShieldCheck size={14} className="text-success md:w-4 md:h-4" />
                    <span className="text-[9px] md:text-[10px] font-bold text-mocha">{t('benefit3')}</span>
                  </div>
                </div>
                
                <p className="text-center text-[8px] md:text-[9px] text-taupe/60 mt-3 md:mt-4 max-w-[250px] md:max-w-xs mx-auto leading-relaxed">
                  {t('terms')}
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
