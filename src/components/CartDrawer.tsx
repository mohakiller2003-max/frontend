'use client';

import { useEffect, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { X, Trash2, ShoppingBag, Star, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/features/cart/store';
import { useCheckoutStore } from '@/features/checkout/store';
import { PRODUCT_MAP, PRODUCTS } from '@/data/products';
import { cn, formatAED, generateEventId } from '@/lib/utils';
import { firePixelEvent } from '@/features/tracking/pixels';
import { TrustBadges } from './TrustBadges';

export function CartDrawer() {
  const t = useTranslations('cart');
  const locale = useLocale() as 'ar' | 'en';
  const { isOpen, close, items, removeItem, subtotal, total, addItem } = useCartStore();
  const { openCheckout } = useCheckoutStore();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const isRTL = locale === 'ar';

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => closeButtonRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Cross-sell logic
  const cartProductIds = items.map((i) => i.productId);
  let crossSellProduct = null;
  if (cartProductIds.length === 1) {
    const main = PRODUCT_MAP[cartProductIds[0]];
    if (main) {
      crossSellProduct = PRODUCT_MAP[main.complementaryId];
    }
  } else if (cartProductIds.length >= 2) {
    crossSellProduct = null; // Both already in cart
  } else {
    crossSellProduct = PRODUCTS[0]; // fallback
  }
  const crossSellAlreadyInCart = crossSellProduct ? cartProductIds.includes(crossSellProduct.id) : true;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-mocha/40 z-40"
            onClick={close}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            key="drawer"
            initial={{ x: isRTL ? '-100%' : '100%' }}
            animate={{ x: 0 }}
            exit={{ x: isRTL ? '-100%' : '100%' }}
            transition={{ type: 'tween', duration: 0.22, ease: 'easeOut' }}
            className={cn(
              'fixed top-0 bottom-0 z-50 w-full max-w-sm bg-ivory shadow-2xl flex flex-col',
              isRTL ? 'left-0' : 'right-0'
            )}
            role="dialog"
            aria-modal="true"
            aria-label={t('title')}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-sand">
              <h2 className="font-semibold text-mocha text-lg flex items-center gap-2">
                <ShoppingBag size={20} aria-hidden="true" />
                {t('title')}
              </h2>
              <button
                ref={closeButtonRef}
                onClick={close}
                className="p-2 text-taupe hover:text-mocha rounded-full hover:bg-pearl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-rose"
                aria-label="Close cart"
              >
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag size={40} className="text-sand mx-auto mb-3" />
                  <p className="text-taupe">{t('empty')}</p>
                </div>
              ) : (
                <>
                  {/* Cart items */}
                  {items.map((item) => {
                    const product = PRODUCT_MAP[item.productId];
                    if (!product) return null;
                    return (
                      <div key={item.productId} className="flex gap-3 bg-white rounded-card p-3 border border-sand/60">
                      <div className="w-16 h-16 flex-shrink-0 relative rounded-lg overflow-hidden bg-pearl border border-sand/60">
                        <img src={product.imageUrl} alt="" className="w-full h-full object-contain p-1" />
                      </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-mocha text-sm leading-snug mb-1 line-clamp-2">
                            {product.shortHeadline[locale]}
                          </p>
                          <p className="text-xs text-taupe">
                            {item.quantity}× {locale === 'ar' ? t('bundle') : t('bundle')}
                          </p>
                          <p className="font-semibold text-mocha text-sm mt-1">{formatAED(item.priceAed, locale)}</p>
                        </div>
                        <button
                          onClick={() => removeItem(item.productId)}
                          className="p-1.5 text-taupe hover:text-error rounded transition-colors flex-shrink-0 self-start"
                          aria-label={t('remove')}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    );
                  })}

                  {/* Cross-sell */}
                  {crossSellProduct && !crossSellAlreadyInCart && (
                    <div className="bg-pearl border border-sand rounded-card p-4">
                      <p className="text-xs font-semibold text-taupe uppercase tracking-wider mb-3">
                        {t('crossSellTitle')}
                      </p>
                      <div className="flex gap-3 items-center">
                        <div className="w-14 h-14 flex-shrink-0 relative rounded-lg overflow-hidden bg-pearl border border-sand/60">
                          <img src={crossSellProduct!.imageUrl} alt="" className="w-full h-full object-contain p-1" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-mocha text-sm leading-snug line-clamp-2">
                            {crossSellProduct.shortHeadline[locale]}
                          </p>
                          <div className="flex items-center gap-1 mt-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} size={10} className={i < Math.floor(crossSellProduct!.ratingPlaceholder) ? 'text-gold fill-gold' : 'text-sand fill-sand'} />
                            ))}
                          </div>
                          <p className="text-xs text-taupe mt-0.5">{locale === 'ar' ? 'يبدأ من' : 'From'} {formatAED(199, locale)}</p>
                        </div>
                        <button
                          onClick={() => { addItem(crossSellProduct!.id, 1); }}
                          className="flex-shrink-0 bg-mocha text-ivory text-xs px-3 py-2 rounded-pill font-medium hover:bg-mocha/90 transition-colors"
                        >
                          {t('addToRoutine')}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Trust */}
                  <div className="bg-white border border-sand rounded-card p-3 space-y-2">
                    <p className="text-xs text-center text-taupe flex items-center justify-center gap-1.5 font-medium">
                      <span>🚚</span>
                      <span>{t('freeDelivery')}</span>
                    </p>
                    <div className="bg-gold/10 text-mocha px-2 py-1.5 rounded-md border border-gold/30 text-[11px] font-bold flex items-center justify-center gap-1">
                      <ShieldCheck size={12} className="text-gold" />
                      {locale === 'ar' ? 'ضمان استرداد الأموال لمدة 30 يوماً' : '30-Day Money-Back Guarantee'}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-5 py-4 border-t border-sand bg-ivory">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-mocha font-medium">{t('total')}</span>
                  <span className="text-xl font-bold text-mocha">{formatAED(total(), locale)}</span>
                </div>
                <button
                  onClick={() => {
                    firePixelEvent(
                      'InitiateCheckout',
                      {
                        content_ids: items.map((i) => i.productId),
                        value: total(),
                        currency: 'AED',
                        num_items: items.reduce((sum, i) => sum + i.quantity, 0),
                      },
                      generateEventId('InitiateCheckout'),
                    );
                    close();
                    setTimeout(() => openCheckout(), 250);
                  }}
                  className="w-full bg-mocha text-ivory py-4 rounded-pill font-semibold text-base hover:bg-mocha/90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-mocha shadow-soft animate-pulse"
                >
                  {t('checkout')}
                </button>
                <div className="mt-3 text-center">
                  <p className="text-[10px] text-red-500 font-bold mb-1">
                    {locale === 'ar' ? 'الكمية تنفد بسرعة - أكملي طلبك الآن' : 'Stock is selling fast - complete your order now'}
                  </p>
                  <TrustBadges compact className="justify-center opacity-80" />
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
