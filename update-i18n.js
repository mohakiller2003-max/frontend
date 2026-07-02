const fs = require('fs');

const arPath = './src/messages/ar.json';
const enPath = './src/messages/en.json';

const ar = JSON.parse(fs.readFileSync(arPath, 'utf8'));
const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));

// Hero Updates for Higher Conversion
ar.hero.headline = "تستحقين بشرة صافية ومشرقة بدون طبقات المكياج المزعجة";
ar.hero.subheadline = "سيرومات علمية مصممة خصيصاً لتحمل أجواء الإمارات. تخلصي من آثار الحبوب، التصبغات وتفاوت اللون، واستعيدي ثقتك بمظهرك الطبيعي.";
ar.hero.cta = "اكتشفي الحل لبشرتك";
ar.hero.ctaSecondary = "شاهدي النتائج والمنتجات";

en.hero.headline = "You deserve clear, glowing skin without layers of heavy makeup";
en.hero.subheadline = "Science-backed serums formulated for the UAE climate. Fade blemish marks, dark spots, and uneven tone, and regain confidence in your natural look.";
en.hero.cta = "Discover Your Solution";
en.hero.ctaSecondary = "See Results & Products";

// Pain & Emotions Section (NEW)
ar.pain = {
  "headline": "نعرف تماماً ما تعانين منه كل يوم...",
  "points": [
    "الاضطرار لوضع طبقات من الفاونديشن والكونسيلر فقط لإخفاء التصبغات.",
    "الخجل من الظهور بدون مكياج أمام العائلة والأصدقاء.",
    "آثار الحبوب العنيدة التي ترفض الزوال مهما جربتي من كريمات.",
    "تأثير حرارة ورطوبة الإمارات التي تزيد من إفرازات البشرة ومشاكلها."
  ],
  "solution": "لقد صممنا سكينوفا لتنهي هذه المعاناة، لتعودي لطبيعتك، مشرقة وواثقة."
};

en.pain = {
  "headline": "We know exactly what you struggle with every day...",
  "points": [
    "Having to wear layers of foundation and concealer just to hide dark spots.",
    "Feeling insecure about appearing makeup-free in front of family and friends.",
    "Stubborn blemish marks that refuse to fade no matter what creams you try.",
    "The harsh UAE heat and humidity that trigger breakouts and uneven texture."
  ],
  "solution": "Skinouva was created to end this struggle, helping you return to your natural, confident self."
};

// Authority, Science & SFDA Section (NEW)
ar.authority = {
  "headline": "موثوقية علمية ونتائج مدعومة بالاختبارات",
  "subtitle": "نحن لا نبيع وعوداً وهمية، بل تركيبات أثبت العلم فعاليتها.",
  "badges": [
    { "title": "مكونات معتمدة", "desc": "تركيبات خاضعة لأعلى المعايير (موافقات SFDA)" },
    { "title": "اختبارات أطباء الجلدية", "desc": "آمن وفعال ومناسب للبشرة الحساسة" },
    { "title": "خالٍ من العطور الضارة", "desc": "لا يسبب التهيج أو انسداد المسام" },
    { "title": "مصنع بمعايير GMP", "desc": "جودة صيدلانية في كل عبوة" }
  ]
};

en.authority = {
  "headline": "Scientific Authority & Tested Results",
  "subtitle": "We don't sell empty promises, but formulations proven by science.",
  "badges": [
    { "title": "Approved Ingredients", "desc": "Formulas meeting strict standards (SFDA compliant)" },
    { "title": "Dermatologist Tested", "desc": "Safe, effective, and suitable for sensitive skin" },
    { "title": "Harmful-Fragrance Free", "desc": "Won't cause irritation or clog pores" },
    { "title": "GMP Certified", "desc": "Pharmaceutical-grade quality in every bottle" }
  ]
};

// 30-Day Guarantee Section (NEW)
ar.guarantee = {
  "headline": "ضمان سكينوفا الذهبي: النتيجة أو استرداد أموالك 100%",
  "body": "نحن واثقون جداً من فعالية منتجاتنا. استخدمي السيروم لمدة 30 يوماً متواصلة حسب الإرشادات. إذا لم تلاحظي تحسناً واضحاً في مظهر بشرتك، سنقوم بإرجاع مبلغك بالكامل. بدون أسئلة معقدة. رضاك هو أولويتنا.",
  "cta": "اطلبي الآن بأمان تام"
};

en.guarantee = {
  "headline": "The Skinouva Golden Guarantee: Results or 100% Refund",
  "body": "We are highly confident in our products. Use the serum consistently for 30 days as directed. If you don't see a visible improvement in your skin's appearance, we will refund your money entirely. No complicated questions. Your satisfaction is our priority.",
  "cta": "Order Now Completely Risk-Free"
};

// Enhance existing translations for CRO
ar.trust.delivery = "توصيل سريع مجاني للإمارات";
ar.trust.secure = "ضمان ذهبي 30 يوماً";
en.trust.delivery = "Fast Free UAE Delivery";
en.trust.secure = "30-Day Golden Guarantee";

fs.writeFileSync(arPath, JSON.stringify(ar, null, 2));
fs.writeFileSync(enPath, JSON.stringify(en, null, 2));

console.log("Translations updated successfully!");
