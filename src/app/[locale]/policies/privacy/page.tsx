import { getTranslations } from 'next-intl/server';
import { CONTACT_EMAIL } from '@/lib/site';

type Props = { params: { locale: string } };

export default async function PrivacyPage({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: 'policies' });
  const loc = locale as 'ar' | 'en';

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-mocha mb-8">{t('privacy')}</h1>
      <div className="prose prose-sm max-w-none text-mocha/80 space-y-4">
        {loc === 'ar' ? (
          <>
            <p>تلتزم سكينوفا بحماية خصوصيتك. نجمع فقط المعلومات الضرورية لمعالجة طلبك وتوصيله.</p>
            <h2 className="font-semibold text-mocha">المعلومات التي نجمعها</h2>
            <p>الاسم الكامل ورقم الهاتف لتأكيد الطلب والتواصل بشأن التوصيل. بيانات التصفح التحليلية لتحسين تجربتك.</p>
            <h2 className="font-semibold text-mocha">كيف نستخدم المعلومات</h2>
            <p>لمعالجة الطلب، التأكيد، والتوصيل داخل الإمارات. لا نبيع بياناتك لأطراف ثالثة.</p>
            <h2 className="font-semibold text-mocha">الاتصال بنا</h2>
            <p>
              لأي استفسار عن خصوصيتك، تواصلي معنا على{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-rose hover:underline" dir="ltr">
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </>
        ) : (
          <>
            <p>Skinouva is committed to protecting your privacy. We collect only the information necessary to process and deliver your order.</p>
            <h2 className="font-semibold text-mocha">Information We Collect</h2>
            <p>Full name and phone number for order confirmation and delivery contact. Analytical browsing data to improve your experience.</p>
            <h2 className="font-semibold text-mocha">How We Use Information</h2>
            <p>To process orders, confirm, and deliver within the UAE. We do not sell your data to third parties.</p>
            <h2 className="font-semibold text-mocha">Contact Us</h2>
            <p>
              For any privacy queries, email us at{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-rose hover:underline" dir="ltr">
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </>
        )}
      </div>
    </div>
  );
}
