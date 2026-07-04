'use client';

import { useState } from 'react';
import { Check, Truck, ShieldCheck, RotateCcw } from 'lucide-react';
import { cn, formatAED } from '@/lib/utils';
import { useCartStore } from '@/features/cart/store';
import { firePixelEvent } from '@/features/tracking/pixels';
import { generateEventId } from '@/lib/utils';
import type { Product } from '@/data/products';
import type { PreviewProductExtra } from '@/data/preview-content';

type Props = {
  product: Product;
  extra: PreviewProductExtra;
};

export function PreviewOfferBlock({ product, extra }: Props) {
  const [selected, setSelected] = useState<1 | 2 | 3>(2);
  const { addItem, open } = useCartStore();

  const handleOrder = () => {
    addItem(product.id, selected);
    open();
    const price = product.offers.find((o) => o.quantity === selected)?.priceAed;
    firePixelEvent(
      'AddToCart',
      { content_ids: [product.id], value: price, currency: 'AED' },
      generateEventId('AddToCart')
    );
  };

  const selectedOffer = product.offers.find((o) => o.quantity === selected)!;

  return (
    <div className="space-y-5">
      <p className="text-sm font-bold text-rose animate-pulse">{extra.urgency}</p>
      <p className="text-sm font-black text-mocha">اختاري العرض:</p>

      <div className="space-y-3">
        {product.offers.map((offer) => {
          const active = selected === offer.quantity;
          return (
            <button
              key={offer.quantity}
              type="button"
              onClick={() => setSelected(offer.quantity)}
              className={cn(
                'w-full text-start p-4 md:p-5 rounded-2xl border-2 transition-all',
                active ? 'border-rose bg-rose/5 shadow-md' : 'border-sand bg-white hover:border-taupe'
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex gap-3">
                  <div
                    className={cn(
                      'mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0',
                      active ? 'border-rose bg-rose text-white' : 'border-sand'
                    )}
                  >
                    {active && <Check size={12} strokeWidth={3} />}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="font-black text-mocha">{offer.badge.ar}</span>
                      {offer.quantity === 2 && (
                        <span className="text-xs bg-rose/15 text-rose px-2 py-0.5 rounded-full font-bold">
                          الأكثر اختياراً
                        </span>
                      )}
                      {offer.quantity === 3 && (
                        <span className="text-xs bg-gold/15 text-gold px-2 py-0.5 rounded-full font-bold">
                          الأكثر توفيراً
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-taupe">{extra.offerSubtitles[offer.quantity]}</p>
                    {extra.savings[offer.quantity as 2 | 3] && (
                      <p className="text-xs font-bold text-green-700 mt-1">
                        {extra.savings[offer.quantity as 2 | 3]}
                      </p>
                    )}
                  </div>
                </div>
                <span className="text-xl font-black text-mocha shrink-0">{formatAED(offer.priceAed)}</span>
              </div>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={handleOrder}
        className="w-full bg-mocha text-ivory py-4 md:py-5 rounded-2xl font-black text-lg hover:bg-mocha/90 transition-all shadow-xl active:scale-[0.99]"
      >
        ابدئي روتينك الآن · {formatAED(selectedOffer.priceAed)}
      </button>

      <p className="text-center text-sm font-bold text-taupe">الدفع عند الاستلام · بدون دفع أونلاين</p>

      <div className="grid grid-cols-3 gap-2 text-center text-xs font-semibold text-taupe">
        <div className="bg-pearl rounded-xl p-3 flex flex-col items-center gap-1">
          <Truck size={16} className="text-mocha" />
          <span>2–4 أيام · الإمارات</span>
        </div>
        <div className="bg-pearl rounded-xl p-3 flex flex-col items-center gap-1">
          <RotateCcw size={16} className="text-mocha" />
          <span>ضمان 30 يوم</span>
        </div>
        <div className="bg-pearl rounded-xl p-3 flex flex-col items-center gap-1">
          <ShieldCheck size={16} className="text-mocha" />
          <span>COD آمن</span>
        </div>
      </div>
    </div>
  );
}
