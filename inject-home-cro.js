const fs = require('fs');

const arPath = './src/messages/ar.json';
const enPath = './src/messages/en.json';

const ar = JSON.parse(fs.readFileSync(arPath, 'utf8'));
const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));

ar.homeCro = {
  "hero": {
    "badge": "مصمم خصيصاً لمناخ الإمارات",
    "headline": "بشرة زجاجية تقاوم قسوة الصيف، بدون طبقات فاونديشن",
    "subheadline": "سيرومات علاجية بتركيزات دقيقة. صُممت لتفكيك التصبغات وآثار الحبوب من الجذور، مع الحفاظ على حاجز بشرتك في أقسى درجات الحرارة والرطوبة.",
    "ctaPrimary": "ابني روتينك الآن",
    "ctaSecondary": "اكتشفي العلم وراء سكينوفا",
    "trust": "شحن مجاني للإمارات | الدفع عند الاستلام | ضمان 30 يوماً"
  },
  "climate": {
    "headline": "لماذا تفشل منتجاتك العالمية المستوردة في دبي؟",
    "subheadline": "روتينك ليس خاطئاً، لكنه لم يُصمم لبيئتنا.",
    "points": [
      {
        "title": "شمس الخليج الحارقة",
        "desc": "تنشط خلايا الميلانين بشكل مفرط، مما يجعل التصبغات أعمق وأعصى على التفتيح العادي."
      },
      {
        "title": "صدمة التكييف والرطوبة",
        "desc": "التنقل بين التكييف البارد والرطوبة العالية يدمر حاجز البشرة، مما يسبب تحسساً مفاجئاً وظهوراً لآثار الحبوب."
      },
      {
        "title": "تأكسد المكونات السريع",
        "desc": "سيرومات فيتامين C العادية تتأكسد وتفقد فعاليتها بمجرد تعرضها للحرارة أثناء الشحن أو التخزين."
      }
    ],
    "solution": "سكينوفا ليست مجرد علامة تجارية أخرى. إنها أول خط ديرما-تجميلي يعتمد على الترانيكساميك والأزيليك — مكونات عالية الثبات الحراري ومثالية لبيئة الإمارات."
  },
  "collection": {
    "headline": "لا تشتري منتجاً، استثمري في نتيجة",
    "subheadline": "اخترنا لك أقوى المكونات السريرية لعلاج أعمق المشاكل، بدون تعقيد.",
    "bundleBadge": "الخيار الأذكى والأسرع نتيجة",
    "bundleTitle": "روتين سكينوفا المتكامل (النتيجة القصوى)",
    "bundleDesc": "ادمج قوة الترانيكساميك (للتصبغات) مع الأزيليك (لآثار الحبوب والملمس) في روتين صباحي ومسائي متكامل. لنتيجة أسرع بـ 3 أضعاف.",
    "bundleCta": "احصلي على الروتين المتكامل — وفري 20%"
  },
  "authority": {
    "headline": "شفافية سريرية كاملة. لا أسرار تجارية.",
    "subheadline": "نحن نضع نسب المواد الفعالة بوضوح، لأننا نثق بقوة تركيباتنا.",
    "stats": [
      { "value": "0%", "label": "عطور كيميائية أو كحول مجفف" },
      { "value": "100%", "label": "تركيبات مستقرة حرارياً (لا تتأكسد)" },
      { "value": "3X", "label": "امتصاص أعمق بفضل تقنية الكبسلة" }
    ]
  },
  "codExperience": {
    "badge": "خدمة كبار الشخصيات",
    "headline": "تجربة استلام تليق بكِ",
    "subheadline": "الدفع عند الاستلام لدينا ليس مجرد خيار دفع، بل خدمة «كونسيرج» تضمن راحتكِ التامة.",
    "steps": [
      {
        "step": "01",
        "title": "تأكيد فوري ومريح",
        "desc": "بمجرد طلبك (بدون دفع)، تتواصل معكِ خبيرة من فريقنا في الإمارات لتأكيد تفاصيل التوصيل وضمان اختيارك الصحيح."
      },
      {
        "step": "02",
        "title": "توصيل مكيّف ومضمون",
        "desc": "نشحن منتجاتنا في سيارات مبردة لضمان وصول السيرومات بفعاليتها القصوى، دون أن تتأثر بحرارة الجو."
      },
      {
        "step": "03",
        "title": "استلمي، افحصي، ثم ادفعي",
        "desc": "المندوب يصلك أينما كنتِ في الإمارات. استلمي طلبك الفاخر، وادفعي بالطريقة التي تريحك (كاش أو بطاقة)."
      }
    ]
  },
  "socialProof": {
    "headline": "نتائج حقيقية، بدون فلاتر",
    "subheadline": "آلاف النساء في الإمارات استعدن ثقتهن ببشرتهن مع سكينوفا."
  }
};

en.homeCro = {
  "hero": {
    "badge": "Formulated for the UAE Climate",
    "headline": "Glass Skin that Defies the Summer, Zero Foundation Required",
    "subheadline": "Clinical-grade serums precisely formulated to break down deep pigmentation and acne marks, while protecting your skin barrier in the harshest heat and humidity.",
    "ctaPrimary": "Build Your Routine",
    "ctaSecondary": "Discover the Science",
    "trust": "Free UAE Delivery | Cash on Delivery | 30-Day Guarantee"
  },
  "climate": {
    "headline": "Why do your expensive imported brands fail in Dubai?",
    "subheadline": "Your routine isn't wrong; it just wasn't built for our environment.",
    "points": [
      {
        "title": "Intense Gulf UV Rays",
        "desc": "Hyper-activates melanin production, making dark spots deeper and much harder to fade with standard products."
      },
      {
        "title": "A/C & Humidity Shock",
        "desc": "Moving between freezing A/C and extreme outdoor humidity shatters your skin barrier, causing sudden breakouts and sensitivity."
      },
      {
        "title": "Rapid Ingredient Oxidation",
        "desc": "Standard Vitamin C serums oxidize and lose their potency almost immediately when exposed to transit heat or local humidity."
      }
    ],
    "solution": "Skinouva isn't just another skincare brand. We are a derma-cosmetic line utilizing Tranexamic and Azelaic acids—highly heat-stable ingredients perfect for the UAE environment."
  },
  "collection": {
    "headline": "Don't buy a product, invest in a result",
    "subheadline": "We've selected the most potent clinical ingredients for the deepest skin concerns. No complicated 10-step routines.",
    "bundleBadge": "The Smartest Choice for Maximum Results",
    "bundleTitle": "The Complete Skinouva Routine",
    "bundleDesc": "Combine the pigment-breaking power of Tranexamic with the texture-smoothing power of Azelaic for a complete AM/PM protocol. Achieve results 3x faster.",
    "bundleCta": "Get the Complete Routine — Save 20%"
  },
  "authority": {
    "headline": "Radical Clinical Transparency. No Trade Secrets.",
    "subheadline": "We proudly state our active ingredient percentages because we believe in the absolute potency of our formulas.",
    "stats": [
      { "value": "0%", "label": "Artificial Fragrance or Drying Alcohol" },
      { "value": "100%", "label": "Heat-Stable Formulations (No Oxidation)" },
      { "value": "3X", "label": "Deeper Absorption via Encapsulation" }
    ]
  },
  "codExperience": {
    "badge": "VIP Delivery Service",
    "headline": "A Delivery Experience that Respects You",
    "subheadline": "For us, Cash on Delivery isn't just a payment method; it's a premium 'concierge' service ensuring your absolute comfort.",
    "steps": [
      {
        "step": "01",
        "title": "Comfortable Confirmation",
        "desc": "Upon placing your order (zero payment upfront), our UAE-based skincare concierge will call to confirm delivery details and ensure you've selected the right routine."
      },
      {
        "step": "02",
        "title": "Climate-Controlled Transit",
        "desc": "We dispatch your order in temperature-controlled vehicles to ensure your clinical serums arrive at peak potency, unaffected by the Gulf heat."
      },
      {
        "step": "03",
        "title": "Receive, Inspect, Then Pay",
        "desc": "Our courier hands you your premium package anywhere in the UAE. Pay only when you have it in your hands (Cash or Card)."
      }
    ]
  },
  "socialProof": {
    "headline": "Real Results, Zero Filters",
    "subheadline": "Thousands of women across the UAE have reclaimed their confidence with Skinouva."
  }
};

fs.writeFileSync(arPath, JSON.stringify(ar, null, 2));
fs.writeFileSync(enPath, JSON.stringify(en, null, 2));

console.log("Home CRO data injected successfully.");
