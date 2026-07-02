import { getTranslations } from 'next-intl/server';

type Props = { params: { locale: string } };

export default async function ReturnsPage({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: 'policies' });
  const loc = locale as 'ar' | 'en';

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-mocha mb-8">{t('returns')}</h1>
      <div className="prose prose-sm max-w-none text-mocha/80 space-y-4">
        {loc === 'ar' ? (
          <>
            <h2 className="font-semibold text-mocha">سياسة الإرجاع</h2>
            <p>يمكنك طلب الإرجاع خلال 7 أيام من استلام الطلب إذا كان المنتج به عيب مصنعي أو تلف عند الاستلام.</p>
            <h2 className="font-semibold text-mocha">المنتجات المفتوحة</h2>
            <p>لأسباب صحية، لا يمكن إرجاع المنتجات التي تم فتحها أو استخدامها إلا في حالة وجود عيب.</p>
            <h2 className="font-semibold text-mocha">كيفية طلب الإرجاع</h2>
            <p>تواصلي معنا عبر صفحة التواصل مع ذكر رقم الطلب وسبب الإرجاع. سنرد خلال 24-48 ساعة.</p>
          </>
        ) : (
          <>
            <h2 className="font-semibold text-mocha">Returns Policy</h2>
            <p>You may request a return within 7 days of receiving your order if the product has a manufacturing defect or was damaged on arrival.</p>
            <h2 className="font-semibold text-mocha">Opened Products</h2>
            <p>For hygiene reasons, opened or used products cannot be returned unless there is a defect.</p>
            <h2 className="font-semibold text-mocha">How to Request a Return</h2>
            <p>Contact us via the contact page with your order number and reason for return. We will respond within 24-48 hours.</p>
          </>
        )}
      </div>
    </div>
  );
}
