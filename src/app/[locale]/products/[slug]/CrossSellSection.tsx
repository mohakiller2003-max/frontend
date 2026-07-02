'use client';

import { Product } from '@/data/products';
import { useCartStore } from '@/features/cart/store';
import { Plus, Sparkles, AlertCircle } from 'lucide-react';
import { ImagePlaceholder } from '@/components/ImagePlaceholder';
import { firePixelEvent } from '@/features/tracking/pixels';
import { generateEventId, formatAED } from '@/lib/utils';
import { useCheckoutStore } from '@/features/checkout/store';

type Props = {
  mainProduct: Product;
  complementaryProduct: Product;
  locale: 'ar' | 'en';
};

export function CrossSellSection({ mainProduct, complementaryProduct, locale }: Props) {
  const { addItem, open: openCart } = useCartStore();
  const { openCheckout } = useCheckoutStore();

  // Use the most popular (quantity=2) for main, and starter (quantity=1) for complementary
  const mainOffer = mainProduct.offers.find((o) => o.quantity === 2) || mainProduct.offers[1];
  const compOffer = complementaryProduct.offers.find((o) => o.quantity === 1) || complementaryProduct.offers[0];
  
  const totalAed = mainOffer.priceAed + compOffer.priceAed;

  const handleAddRoutine = () => {
    addItem(mainProduct.id, 2);
    addItem(complementaryProduct.id, 1);
    openCart();
    
    // Automatically trigger the checkout modal on top of the cart to speed up purchase
    setTimeout(() => {
       openCheckout();
    }, 300);

    firePixelEvent('AddToCart', {
      content_ids: [mainProduct.id, complementaryProduct.id],
      value: totalAed,
      currency: 'AED',
    }, generateEventId('AddToCart'));
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-[2rem] border-2 border-gold/40 shadow-xl overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full mix-blend-multiply filter blur-3xl"></div>
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-gold/20 via-gold/40 to-gold/20 text-mocha py-3 px-6 text-center border-b border-gold/30">
         <p className="font-black text-sm md:text-base flex items-center justify-center gap-2 tracking-wide">
           <Sparkles className="w-5 h-5 text-mocha" />
           {locale === 'ar' ? 'الروتين المتكامل: أقصى نتيجة في أسرع وقت' : 'The Complete Routine: Maximum Results, Faster'}
         </p>
      </div>

      <div className="p-8 md:p-12 relative z-10">
        <div className="text-center mb-10">
          <h3 className="text-2xl md:text-4xl font-black text-mocha mb-4 leading-tight">
            {locale === 'ar' ? 'عالجي أكثر من مشكلة في نفس الوقت' : 'Treat Multiple Concerns Simultaneously'}
          </h3>
          <p className="text-taupe text-lg max-w-2xl mx-auto font-medium">
            {locale === 'ar' 
              ? '٨٧٪ من عميلاتنا يستخدمن السيرومين معاً للحصول على تفتيح عميق ونقاء تام بدون انتظار. أضيفي السيروم المكمل لروتينك الآن.' 
              : '87% of our customers use both serums together for deep brightening and absolute clarity without the wait. Add the complementary serum to your routine now.'}
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-10">
          {/* Main Product Card */}
          <div className="bg-ivory p-4 rounded-2xl border border-sand w-full md:w-64 text-center">
            <div className="relative mb-3">
              <div className="absolute top-2 right-2 bg-mocha text-white text-[10px] font-bold px-2 py-1 rounded-full z-10">2x</div>
              <ImagePlaceholder aspect="square" variant="serum" className="w-full rounded-xl border-2 border-white shadow-sm" />
            </div>
            <p className="font-bold text-mocha text-sm mb-1">{mainProduct.shortHeadline[locale]}</p>
            <p className="text-taupe text-xs">{formatAED(mainOffer.priceAed)}</p>
          </div>

          <div className="w-12 h-12 bg-pearl rounded-full flex items-center justify-center shrink-0 border border-sand shadow-sm rotate-45 md:rotate-0">
             <Plus className="w-6 h-6 text-mocha" />
          </div>

          {/* Complementary Product Card */}
          <div className="bg-ivory p-4 rounded-2xl border border-gold/40 w-full md:w-64 text-center relative">
            <div className="absolute -top-3 -right-3 bg-gold text-mocha text-[10px] font-black px-3 py-1.5 rounded-full shadow-md z-20 animate-pulse">
              {locale === 'ar' ? 'المكمل السحري' : 'Perfect Match'}
            </div>
            <div className="relative mb-3">
              <div className="absolute top-2 right-2 bg-mocha text-white text-[10px] font-bold px-2 py-1 rounded-full z-10">1x</div>
              <ImagePlaceholder aspect="square" variant="serum" className="w-full rounded-xl border-2 border-white shadow-sm" />
            </div>
            <p className="font-bold text-mocha text-sm mb-1">{complementaryProduct.shortHeadline[locale]}</p>
            <p className="text-taupe text-xs">{formatAED(compOffer.priceAed)}</p>
          </div>
        </div>

        <div className="text-center">
          <div className="mb-6 flex flex-col items-center justify-center">
            <p className="text-sm text-taupe font-bold uppercase tracking-widest mb-1">{locale === 'ar' ? 'إجمالي الروتين المزدوج' : 'Total Dual Routine'}</p>
            <p className="text-4xl font-black text-mocha">{formatAED(totalAed)}</p>
          </div>
          
          <button
            onClick={handleAddRoutine}
            className="w-full max-w-md mx-auto bg-mocha text-ivory py-5 px-8 rounded-2xl font-black text-xl hover:bg-mocha/90 transition-all shadow-2xl active:scale-[0.98] flex items-center justify-center gap-3 group"
          >
            <span className="text-2xl group-hover:rotate-12 transition-transform">🛒</span>
            <span>{locale === 'ar' ? 'أضيفي الروتين المتكامل للسلة' : 'Add The Complete Routine to Cart'}</span>
          </button>
          
          <p className="mt-4 text-xs font-bold text-red-500 flex items-center justify-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {locale === 'ar' ? 'ينفد بسرعة: متبقي كمية محدودة لليوم' : 'Selling Fast: Limited stock remaining for today'}
          </p>
        </div>
      </div>
    </div>
  );
}