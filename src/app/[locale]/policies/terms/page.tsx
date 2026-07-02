import { getTranslations } from 'next-intl/server';

type Props = { params: { locale: string } };

export default async function TermsPage({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: 'policies' });
  const loc = locale as 'ar' | 'en';

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-mocha mb-8">{t('terms')}</h1>
      <div className="prose prose-sm max-w-none text-mocha/80 space-y-4">
        {loc === 'ar' ? (
          <>
            <p>باستخدامك لموقع سكينوفا، فإنك توافق على الشروط والأحكام التالية.</p>
            <h2 className="font-semibold text-mocha">المنتجات والطلبات</h2>
            <p>جميع المنتجات متاحة حسب التوافر. نحتفظ بالحق في رفض أو إلغاء الطلبات في حال وجود أخطاء أو عدم توافر.</p>
            <h2 className="font-semibold text-mocha">ادعاءات المنتج</h2>
            <p>لا تُقدّم سكينوفا أي ادعاءات طبية. وصف المنتجات للأغراض التجميلية فقط وتساعد على تحسين مظهر البشرة.</p>
            <h2 className="font-semibold text-mocha">المسؤولية</h2>
            <p>سكينوفا غير مسؤولة عن الاستخدام غير الصحيح للمنتجات. اقرئي التعليمات دائمًا.</p>
          </>
        ) : (
          <>
            <p>By using the Skinouva website, you agree to the following terms and conditions.</p>
            <h2 className="font-semibold text-mocha">Products and Orders</h2>
            <p>All products are available subject to stock. We reserve the right to refuse or cancel orders in case of errors or unavailability.</p>
            <h2 className="font-semibold text-mocha">Product Claims</h2>
            <p>Skinouva makes no medical claims. Product descriptions are for cosmetic purposes only and help improve the appearance of skin.</p>
            <h2 className="font-semibold text-mocha">Liability</h2>
            <p>Skinouva is not responsible for incorrect product use. Always read the instructions.</p>
          </>
        )}
      </div>
    </div>
  );
}
