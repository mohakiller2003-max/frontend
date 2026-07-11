'use client';

import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import {
  CheckCircle2,
  Phone,
  PhoneCall,
  Package,
  Truck,
  Sparkles,
  ShieldCheck,
  Star,
  AlertCircle,
  ChevronRight,
} from 'lucide-react';
import { useCheckoutStore } from '@/features/checkout/store';
import { useCartStore } from '@/features/cart/store';
import { PRODUCT_MAP, PRODUCTS } from '@/data/products';
import { formatAED } from '@/lib/utils';
import { getCallWindowVariant } from '@/lib/call-window';
import { ImagePlaceholder } from '@/components/ImagePlaceholder';
import { ReviewCard } from '@/components/ReviewCard';

const WHATSAPP_NUMBER = '971556710680';

export default function ThankYouPage() {
  const t = useTranslations('thankYou');
  const locale = useLocale() as 'ar' | 'en';
  const {
    orderNumber,
    totalAed,
    customerName,
    customerPhone,
    orderItems,
  } = useCheckoutStore();
  const { addItem, open: openCart } = useCartStore();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;
    if (searchParams.get('preview') !== '1') return;
    if (orderNumber) return;

    useCheckoutStore.setState({
      orderNumber: 'SKN-1042',
      totalAed: 279,
      customerName: 'Fatima Al Mansouri',
      customerPhone: '0556710680',
      orderItems: [
        { productId: 'tranexamic-niacinamide-serum', quantity: 2, priceAed: 279 },
      ],
    });
  }, [searchParams, orderNumber]);

  const callVariant = useMemo(() => getCallWindowVariant(), []);
  const bannerKey = `callBanner.${callVariant}` as const;

  const purchasedIds = new Set(orderItems.map((i) => i.productId));
  const suggestions = PRODUCTS.filter((p) => !purchasedIds.has(p.id));

  const resultsCopy = useMemo(() => {
    const hasTranexamic = purchasedIds.has('tranexamic-niacinamide-serum');
    const hasAzelaic = purchasedIds.has('azelaic-acne-marks-serum');
    if (hasTranexamic && hasAzelaic) return t('results.both');
    if (hasTranexamic) return t('results.tranexamic');
    if (hasAzelaic) return t('results.azelaic');
    return t('results.both');
  }, [purchasedIds, t]);

  const whatsappText =
    locale === 'ar'
      ? `مرحباً، أود تأكيد طلب سكينوفا.\nالاسم: ${customerName || '—'}\nالهاتف: ${customerPhone || '—'}\nرقم الطلب: ${orderNumber || '—'}`
      : `Hi, I'd like to confirm my Skinouva order.\nName: ${customerName || '—'}\nPhone: ${customerPhone || '—'}\nOrder: ${orderNumber || '—'}`;

  const headline = customerName
    ? t('headlineNamed', { name: customerName.split(' ')[0] })
    : t('headline');

  return (
    <div className="min-h-screen bg-gradient-to-br from-ivory via-pearl to-sand pb-16">
      {/* Sticky call banner */}
      <div className="sticky top-0 z-40 bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-start gap-3">
            <span className="relative flex h-3 w-3 mt-1.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-bold uppercase tracking-widest opacity-90 mb-1">
                {t(`${bannerKey}.badge`)}
              </p>
              <p className="font-black text-base md:text-lg leading-snug mb-1">
                {t(`${bannerKey}.headline`)}
              </p>
              <p className="text-sm text-white/90 leading-relaxed">
                {t(`${bannerKey}.body`)}
              </p>
              <p className="text-xs text-white/75 mt-2 font-medium">
                {t(`${bannerKey}.timer`)}
              </p>
            </div>
            <PhoneCall size={28} className="shrink-0 opacity-90 hidden sm:block" aria-hidden="true" />
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 md:px-6 pt-8 space-y-6">
        {/* Hero */}
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-success/10 border-2 border-success/30 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 size={32} className="text-success" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-mocha mb-2">{headline}</h1>
          <p className="text-taupe leading-relaxed max-w-md mx-auto">{t('body')}</p>
        </div>

        {/* Personal confirmation details */}
        {(customerName || customerPhone || orderNumber) && (
          <div className="bg-ivory border-2 border-rose/20 rounded-card-lg p-5 md:p-6 shadow-soft">
            <h2 className="font-bold text-mocha mb-4 flex items-center gap-2">
              <Phone size={18} className="text-rose" aria-hidden="true" />
              {t('yourDetails.title')}
            </h2>
            <div className="space-y-4">
              {customerName && (
                <div>
                  <p className="text-xs text-taupe mb-1">{t('yourDetails.nameLabel')}</p>
                  <p className="font-semibold text-mocha">{customerName}</p>
                </div>
              )}
              {customerPhone && (
                <div className="bg-rose/5 border border-rose/20 rounded-xl p-4">
                  <p className="text-xs font-bold text-rose uppercase tracking-wide mb-1">
                    {t('yourDetails.phoneLabel')}
                  </p>
                  <p className="text-2xl font-black text-mocha tracking-wide" dir="ltr">
                    {customerPhone}
                  </p>
                  <p className="text-xs text-taupe mt-2">{t('yourDetails.phoneHint')}</p>
                </div>
              )}
              {orderNumber && (
                <div className="flex items-center justify-between text-sm pt-2 border-t border-sand">
                  <span className="text-taupe">{t('yourDetails.orderLabel')}</span>
                  <span className="font-bold text-mocha">{orderNumber}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Call prep */}
        <div className="bg-pearl border border-sand rounded-card-lg p-5 md:p-6">
          <h2 className="font-bold text-mocha mb-4">{t('callPrep.title')}</h2>
          <ul className="space-y-3">
            {[t('callPrep.unknownNumber'), t('callPrep.whatWeAsk'), t('callPrep.whyAnswer')].map(
              (line, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-mocha/85 leading-relaxed">
                  <CheckCircle2 size={16} className="text-success shrink-0 mt-0.5" aria-hidden="true" />
                  {line}
                </li>
              )
            )}
            <li className="flex items-start gap-3 text-sm text-red-700/90 leading-relaxed bg-red-50 border border-red-100 rounded-lg p-3">
              <AlertCircle size={16} className="shrink-0 mt-0.5" aria-hidden="true" />
              {t('callPrep.ifMiss')}
            </li>
          </ul>
        </div>

        {/* Timeline */}
        <div className="bg-ivory border border-sand rounded-card-lg p-5 md:p-6">
          <h2 className="font-semibold text-mocha mb-4 flex items-center gap-2">
            <Package size={18} className="text-rose" aria-hidden="true" />
            {t('whatsNext')}
          </h2>
          <ol className="space-y-4">
            {([
              { step: 1, icon: PhoneCall, text: t('step1') },
              { step: 2, icon: Truck, text: t('step2') },
              { step: 3, icon: ShieldCheck, text: t('step3') },
            ] as const).map(({ step, icon: Icon, text }) => (
              <li key={step} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-rose/15 flex items-center justify-center shrink-0">
                  <Icon size={14} className="text-rose" aria-hidden="true" />
                </div>
                <div className="pt-1">
                  <span className="text-[10px] font-bold text-taupe uppercase tracking-wider">
                    {locale === 'ar' ? `الخطوة ${step}` : `Step ${step}`}
                  </span>
                  <p className="text-sm text-mocha/85 leading-snug font-medium">{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Order summary — clean layout */}
        {orderItems.length > 0 && (
          <div className="bg-ivory border border-sand rounded-card-lg p-5 md:p-6 shadow-soft">
            <h2 className="font-bold text-mocha mb-4">{t('orderSummary.title')}</h2>
            <ul className="space-y-3 mb-4">
              {orderItems.map((item) => {
                const product = PRODUCT_MAP[item.productId];
                if (!product) return null;
                return (
                  <li
                    key={`${item.productId}-${item.quantity}-${item.priceAed}`}
                    className="flex items-start justify-between gap-4 py-2 border-b border-sand/80 last:border-0"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-mocha leading-snug">
                        {product.shortHeadline[locale]}
                      </p>
                      <p className="text-xs text-taupe mt-0.5">
                        {t('orderSummary.qty', { qty: item.quantity })}
                      </p>
                    </div>
                    <p className="text-sm font-bold text-mocha shrink-0 tabular-nums">
                      {formatAED(item.priceAed, locale)}
                    </p>
                  </li>
                );
              })}
            </ul>
            <div className="flex items-center justify-between pt-3 border-t border-sand">
              <span className="font-semibold text-mocha">{t('orderSummary.subtotal')}</span>
              <span className="text-xl font-black text-mocha tabular-nums">
                {formatAED(totalAed ?? orderItems.reduce((s, i) => s + i.priceAed, 0), locale)}
              </span>
            </div>
            <p className="text-xs text-taupe mt-3 flex items-center gap-1.5">
              <ShieldCheck size={12} className="text-success shrink-0" aria-hidden="true" />
              {t('orderSummary.codNote')}
            </p>
          </div>
        )}

        {/* Results excitement */}
        <div className="bg-gradient-to-br from-rose/5 to-gold/5 border border-rose/15 rounded-card-lg p-5 md:p-6">
          <h2 className="font-bold text-mocha mb-3 flex items-center gap-2">
            <Sparkles size={18} className="text-gold" aria-hidden="true" />
            {t('results.title')}
          </h2>
          <p className="text-sm text-mocha/85 leading-relaxed">{resultsCopy}</p>
        </div>

        {/* Social proof stats */}
        <div className="bg-ivory border border-sand rounded-card-lg p-5 md:p-6">
          <h2 className="font-bold text-mocha mb-4 text-center">{t('socialProof.title')}</h2>
          <div className="grid grid-cols-3 gap-3 mb-5">
            {([
              { value: t('socialProof.stat1Value'), label: t('socialProof.stat1Label') },
              { value: t('socialProof.stat2Value'), label: t('socialProof.stat2Label') },
              { value: t('socialProof.stat3Value'), label: t('socialProof.stat3Label') },
            ] as const).map((stat) => (
              <div key={stat.label} className="text-center p-3 bg-pearl rounded-xl border border-sand/60">
                <p className="text-lg md:text-xl font-black text-rose leading-none mb-1">{stat.value}</p>
                <p className="text-[10px] md:text-xs text-taupe leading-snug">{stat.label}</p>
              </div>
            ))}
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <ReviewCard
              initials={locale === 'ar' ? 'م.ع' : 'M.A'}
              rating={5}
              text={t('reviews.r1.text')}
              city={t('reviews.r1.city')}
            />
            <ReviewCard
              initials={locale === 'ar' ? 'س.ر' : 'S.R'}
              rating={5}
              text={t('reviews.r2.text')}
              city={t('reviews.r2.city')}
            />
          </div>
        </div>

        {/* WhatsApp fast track */}
        <div className="bg-pearl border border-sand rounded-card-lg p-5 text-center">
          <p className="text-sm text-taupe mb-3">{t('whatsapp.hint')}</p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 bg-[#25D366] text-white px-6 py-3.5 rounded-xl font-bold hover:bg-[#20bd5a] transition-all shadow-md active:scale-[0.98]"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
            {t('whatsapp.cta')}
          </a>
        </div>

        {/* Product suggestions */}
        {suggestions.length > 0 && (
          <div>
            <h2 className="font-bold text-mocha text-lg mb-1">{t('suggestions.title')}</h2>
            <p className="text-sm text-taupe mb-4">{t('suggestions.subtitle')}</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {suggestions.map((product) => (
                <div
                  key={product.id}
                  className="bg-ivory border border-sand rounded-card-lg overflow-hidden shadow-soft flex flex-col"
                >
                  <ImagePlaceholder
                    className="rounded-none"
                    aspect="landscape"
                    label={product.name[locale]}
                    variant="serum"
                  />
                  <div className="p-4 flex flex-col flex-1">
                    <div className="flex items-center gap-1 mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={11}
                          className={
                            i < Math.floor(product.ratingPlaceholder)
                              ? 'text-gold fill-gold'
                              : 'text-sand fill-sand'
                          }
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <p className="font-semibold text-mocha text-sm leading-snug mb-2 flex-1">
                      {product.shortHeadline[locale]}
                    </p>
                    <p className="text-xs text-taupe mb-3">{product.concern[locale]}</p>
                    <div className="flex items-center justify-between gap-2 mt-auto">
                      <span className="font-bold text-mocha">{formatAED(199, locale)}</span>
                      <button
                        type="button"
                        onClick={() => {
                          addItem(product.id, 2);
                          openCart();
                        }}
                        className="inline-flex items-center gap-1 text-xs font-bold text-rose hover:text-rose/80 transition-colors"
                      >
                        {t('suggestions.cta')}
                        <ChevronRight size={14} aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Back to store */}
        <div className="text-center pt-2">
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
