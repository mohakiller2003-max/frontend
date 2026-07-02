const fs = require('fs');

const arPath = './src/messages/ar.json';
const enPath = './src/messages/en.json';

const ar = JSON.parse(fs.readFileSync(arPath, 'utf8'));
const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));

ar.productCro = {
  "stat": "٩٢٪ من نساء الإمارات يعانين من التصبغات العنيدة بسبب التعرض المستمر لأشعة الشمس وتكييف الهواء المستمر.",
  "statSource": "المصدر: أبحاث العناية بالبشرة في الخليج، ٢٠٢٤",
  "painHeadline": "تعرفين هذه المشاكل جيداً — ولماذا لم تنجح الكريمات العادية؟",
  "painSub": "المشكلة ليست فيكِ، بل في المنتجات التي تعالج القشور الخارجية فقط وتتجاهل جذر المشكلة المظلم تحت الجلد.",
  "painQuotes": [
    {
      "quote": "«صرفت آلاف الدراهم على جلسات الليزر، وبمجرد دخول الصيف رجعت التصبغات أسوأ من قبل.»",
      "fail": "الليزر والتقشير العنيف",
      "reason": "يدمر حاجز البشرة الواقي في مناخنا الحار، مما يسبب تصبغات عكسية (PIH)."
    },
    {
      "quote": "«بشرتي تفرز دهون كثيرة مع رطوبة دبي، والمكياج يذوب بعد ساعتين ويفضح آثار الحبوب.»",
      "fail": "إخفاء العيوب بالمكياج",
      "reason": "يسد المسام، يفاقم الحبوب، ويزيد من عمق الآثار الحمراء والداكنة."
    },
    {
      "quote": "«جربت سيرومات مشهورة وغالية، للأسف بس ترطيب مؤقت وتلصق بالوجه بدون أي تفتيح للآثار.»",
      "fail": "سيرومات فيتامين C التجارية",
      "reason": "تتأكسد بسرعة بالحرارة وتفقد فعاليتها قبل أن تصل إلى عمق التصبغ."
    }
  ],
  "mechanismHeadline": "السر في الوصول للجذر، وليس تقشير السطح",
  "mechanismBody": "تركيبتنا لا تعتمد على حرق طبقات جلدك. نحن نستخدم تركيزات سريرية تخترق بأمان لتعطيل إنتاج صبغة الميلانين الزائدة من المنبع. نتيجة الإبر، بدون إبر وبدون فترة نقاهة.",
  "timelineHeadline": "ماذا ستلاحظين خلال أول ٣٠ يوماً؟",
  "timelineSub": "بشرتك تتغير أسبوعاً بعد أسبوع — والمقربون منك سيلاحظون الفرق.",
  "timeline": [
    {
      "week": "أول ٧ أيام",
      "title": "ترطيب وتهدئة",
      "desc": "تخف الاحمرار والالتهابات. ملمس بشرتك يصبح أنعم، والمكياج يثبت بشكل أفضل بكثير. حاجز البشرة يبدأ بالتعافي."
    },
    {
      "week": "الأسبوع الثاني",
      "title": "تفكيك التصبغات",
      "desc": "تبدأ البقع الداكنة وآثار الحبوب العنيدة بالتفكك وتصبح أفتح لوناً. ستلاحظين أن وجهك أصبح يبدو «مرتاحاً» ومشرقاً في الصباح."
    },
    {
      "week": "نهاية العلبة الأولى",
      "title": "الفرق الواضح",
      "desc": "الآن يمكنك المقارنة بصور قبل وبعد. تفاوت اللون اختفى بنسبة كبيرة، وستبدأين بالخروج بثقة بدون فاونديشن. (العلبة الثانية تثبت النتيجة)."
    }
  ],
  "compareHeadline": "قارني بنفسك — لماذا سكينوفا؟",
  "compareSub": "كل بديل جربتيه من قبل، ولماذا لم يعطكِ النتيجة المطلوبة.",
  "compareClinics": {
    "title": "عيادات التجميل والليزر",
    "price": "٣,٠٠٠+ درهم / جلسات",
    "points": ["مؤلم ويحتاج فترة نقاهة", "قد يسبب تصبغات عكسية", "مكلف جداً ويحتاج استمرار", "غير مناسب لكل أنواع البشرة"]
  },
  "compareCheap": {
    "title": "سيرومات التجميل العادية",
    "price": "١٠٠ - ٢٠٠ درهم",
    "points": ["تأثير سطحي مؤقت", "تتأكسد بسرعة", "قوام دبق ومزعج", "تركيز المواد الفعالة ضعيف جداً"]
  },
  "compareUs": {
    "title": "سيرومات سكينوفا",
    "price": "١٩٩ درهم / شهر كامل",
    "points": ["يعالج جذر التصبغ من الداخل", "آمن تماماً وبدون أي ألم أو احمرار", "تركيزات سريرية دقيقة", "ضمان استرداد نقدي كامل"]
  },
  "noNastiesHeadline": "تركيبة نظيفة تحترم بشرتك",
  "noNasties": ["بدون عطور صناعية", "بدون كحول مجفف", "بدون بارابين", "بدون مواد مقشرة قاسية", "لا يسد المسام", "مناسب للبشرة الحساسة"],
  "expertQuote": "«علاج التصبغات في الخليج يتطلب توازناً دقيقاً. التقشير العنيف في مناخ عالي الأشعة فوق البنفسجية يدمر البشرة. تركيبات سكينوفا تستخدم مكونات مثل الترانيكساميك والأزيليك لتفكيك الصبغة بهدوء وأمان، مما يجعلها الخيار الأمثل للاستخدام اليومي المستمر.»",
  "expertTitle": "خبيرة عناية بالبشرة",
  "deliveryHeadline": "كيف يصلك طلبك؟ بكل بساطة",
  "deliverySteps": [
    { "title": "اطلبي الآن بدون دفع", "desc": "اختاري العرض المناسب، أدخلي اسمك ورقمك. بدون بطاقة بنكية." },
    { "title": "نتصل لتأكيد الطلب", "desc": "فريقنا في الإمارات سيتواصل معكِ هاتفياً لتأكيد العنوان بدقة." },
    { "title": "استلمي وادفعي عند الباب", "desc": "يصلك المندوب خلال ٢٤-٤٨ ساعة أينما كنتِ في الإمارات. الدفع عند الاستلام." }
  ]
};

en.productCro = {
  "stat": "92% of UAE women suffer from stubborn pigmentation due to intense UV exposure and constant AC.",
  "statSource": "Source: Gulf Skincare Research, 2024",
  "painHeadline": "You know these struggles well — and why normal creams fail",
  "painSub": "It's not your fault. Most products only treat the dead surface layer, completely ignoring the dark pigment root trapped beneath.",
  "painQuotes": [
    {
      "quote": "\"I spent thousands on laser sessions, and once summer hit, the dark spots came back even worse.\"",
      "fail": "Harsh Laser & Peeling",
      "reason": "Destroys the skin barrier in our hot climate, triggering Post-Inflammatory Hyperpigmentation (PIH)."
    },
    {
      "quote": "\"My skin gets so oily in Dubai humidity. My makeup melts in 2 hours, exposing all my red and dark marks.\"",
      "fail": "Hiding Behind Makeup",
      "reason": "Clogs pores, worsens breakouts, and deepens the appearance of existing dark marks."
    },
    {
      "quote": "\"I tried famous, expensive vitamin C serums. They were sticky and did absolutely nothing for my spots.\"",
      "fail": "Commercial Vitamin C",
      "reason": "Oxidizes rapidly in the heat, losing its potency before it can even reach the pigmentation."
    }
  ],
  "mechanismHeadline": "The secret is treating the root, not burning the surface",
  "mechanismBody": "Our formulation does not rely on burning off your skin layers. We use clinical concentrations that penetrate safely to disrupt excess melanin production at its source. Needle-like results, without the needles and zero downtime.",
  "timelineHeadline": "What will you see in the first 30 days?",
  "timelineSub": "Your skin transforms week by week — and your friends will notice before you even say anything.",
  "timeline": [
    {
      "week": "First 7 Days",
      "title": "Hydration & Calmness",
      "desc": "Redness and inflammation subside. Your skin texture feels softer, and makeup glides on perfectly. The skin barrier begins to heal."
    },
    {
      "week": "Second Week",
      "title": "Pigment Breakdown",
      "desc": "Dark spots and stubborn acne marks begin to break apart and lighten. You'll notice your face looks 'well-rested' and glowing in the morning."
    },
    {
      "week": "End of First Box",
      "title": "The Visible Difference",
      "desc": "Now you can compare before & after photos. Uneven tone is drastically reduced, and you'll confidently go out makeup-free. (The 2nd box locks in these results)."
    }
  ],
  "compareHeadline": "Compare & Decide — Why Skinouva?",
  "compareSub": "Everything you've tried before, and why it hasn't given you the clear skin you deserve.",
  "compareClinics": {
    "title": "Aesthetic & Laser Clinics",
    "price": "3,000+ AED / sessions",
    "points": ["Painful with required downtime", "High risk of rebound pigmentation", "Extremely expensive to maintain", "Not suitable for all skin types"]
  },
  "compareCheap": {
    "title": "Standard Beauty Serums",
    "price": "100 - 200 AED",
    "points": ["Temporary, surface-level effect", "Oxidizes and spoils quickly", "Sticky, uncomfortable texture", "Extremely low active concentrations"]
  },
  "compareUs": {
    "title": "Skinouva Serums",
    "price": "199 AED / full month",
    "points": ["Treats the pigment root from within", "100% safe, painless, no redness", "Precise clinical concentrations", "Full money-back guarantee"]
  },
  "noNastiesHeadline": "A clean formula that respects your skin",
  "noNasties": ["No Artificial Fragrance", "No Drying Alcohol", "No Parabens", "No Harsh Peeling Acids", "Non-Comedogenic", "Safe for Sensitive Skin"],
  "expertQuote": "\"Treating pigmentation in the Gulf requires a delicate balance. Aggressive peeling in a high-UV environment damages the skin. Skinouva's approach uses proven ingredients like Tranexamic and Azelaic acid to calmly and safely dismantle pigment, making it the perfect choice for consistent daily use.\"",
  "expertTitle": "Skincare Specialist",
  "deliveryHeadline": "How does your order arrive? It's simple.",
  "deliverySteps": [
    { "title": "Order without paying", "desc": "Select your offer, enter your name and number. No credit card required." },
    { "title": "We call to confirm", "desc": "Our UAE team will call you to accurately confirm your delivery address." },
    { "title": "Receive & pay at door", "desc": "The courier arrives within 24-48 hours anywhere in the UAE. Pay with cash or card on delivery." }
  ]
};

fs.writeFileSync(arPath, JSON.stringify(ar, null, 2));
fs.writeFileSync(enPath, JSON.stringify(en, null, 2));

console.log("CRO data injected successfully.");
