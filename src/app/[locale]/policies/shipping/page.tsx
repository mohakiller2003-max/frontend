import { getTranslations } from 'next-intl/server';

type Props = { params: { locale: string } };

export default async function ShippingPage({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: 'policies' });
  const loc = locale as 'ar' | 'en';

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-mocha mb-8">{t('shipping')}</h1>
      <div className="prose prose-sm max-w-none text-mocha/80 space-y-4">
        {loc === 'ar' ? (
          <>
            <h2 className="font-semibold text-mocha">التوصيل داخل الإمارات</h2>
            <p>نوصّل لجميع إمارات الدولة خلال 2-4 أيام عمل.</p>
            <h2 className="font-semibold text-mocha">الدفع عند الاستلام</h2>
            <p>الدفع عند الاستلام متاح لجميع الطلبات. ادفعي المبلغ كاملًا عند استلام الطلب من المندوب.</p>
            <h2 className="font-semibold text-mocha">تأكيد الطلب</h2>
            <p>قد يتواصل فريقنا معك على رقم الهاتف المسجل لتأكيد الطلب قبل الشحن. تأكدي من صحة رقمك.</p>
            <h2 className="font-semibold text-mocha">رسوم التوصيل</h2>
            <p>تُحدد رسوم التوصيل عند إتمام الطلب.</p>
          </>
        ) : (
          <>
            <h2 className="font-semibold text-mocha">UAE Delivery</h2>
            <p>We deliver to all UAE emirates within 2-4 business days.</p>
            <h2 className="font-semibold text-mocha">Cash on Delivery</h2>
            <p>Cash on delivery is available for all orders. Pay the full amount upon receiving your order from the courier.</p>
            <h2 className="font-semibold text-mocha">Order Confirmation</h2>
            <p>Our team may contact you on the registered phone number to confirm your order before shipping. Please ensure your number is correct.</p>
            <h2 className="font-semibold text-mocha">Delivery Fees</h2>
            <p>Delivery fees are determined at the time of order completion.</p>
          </>
        )}
      </div>
    </div>
  );
}
