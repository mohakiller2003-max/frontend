export type LocalizedText = {
  ar: string;
  en: string;
};

export type Offer = {
  quantity: 1 | 2 | 3;
  priceAed: number;
  badge: LocalizedText;
  labelKey: string;
  title: LocalizedText;
  subtitle: LocalizedText;
  savings?: LocalizedText;
  topRibbon?: LocalizedText;
};

export type Ingredient = {
  name: LocalizedText;
  benefit: LocalizedText;
};

export type Product = {
  id: string;
  slug: LocalizedText;
  name: LocalizedText;
  heroHeadline: LocalizedText;
  shortHeadline: LocalizedText;
  subheadline: LocalizedText;
  description: LocalizedText;
  concern: LocalizedText;
  keyIngredients: Ingredient[];
  offers: Offer[];
  benefitBullets: LocalizedText[];
  howToUse: LocalizedText;
  whoIsItFor: LocalizedText;
  whatToExpect: LocalizedText;
  complementaryId: string;
  ratingPlaceholder: number;
  reviewCountPlaceholder: number;
  imageUrl: string;
  urgencyLine: LocalizedText;
  ctaRoutine: LocalizedText;
};

export const PRODUCTS: Product[] = [
  {
    id: 'tranexamic-niacinamide-serum',
    slug: {
      ar: 'serum-tranexamic-niacinamide',
      en: 'tranexamic-niacinamide-serum',
    },
    name: {
      ar: 'سيروم الترانيكساميك + النياسيناميد 15% ضد البقع الداكنة',
      en: '15% TXA + Niacinamide Dark Spot Serum',
    },
    heroHeadline: {
      ar: 'بقعك الداكنة ولا تروح — السبب مو الكريمات',
      en: "Your dark spots won't fade — the problem isn't your creams",
    },
    shortHeadline: {
      ar: 'البقع الداكنة وتفاوت لون البشرة',
      en: 'Dark spots and uneven-looking tone',
    },
    subheadline: {
      ar: 'شمس الإمارات والتكييف يخزّنون التصبّغ تحت الجلد. سيروم 15% TXA + Niacinamide يستهدف المصدر — بدون إبر، بدون تقشير.',
      en: 'UAE sun and AC store pigment beneath your skin. 15% TXA + Niacinamide targets the source — no needles, no harsh peeling.',
    },
    description: {
      ar: 'صُمِّم هذا السيروم للمساعدة في تقليل مظهر البقع الداكنة وتفاوت لون البشرة. يجمع حمض الترانيكساميك والنياسيناميد في تركيبة يومية للحصول على مظهر أكثر إشراقًا وتوازنًا مع الاستخدام المنتظم.',
      en: 'This serum is designed to help with the appearance of dark spots and uneven-looking tone. It combines tranexamic acid and niacinamide in a daily formula for a brighter-looking, more balanced complexion with consistent use.',
    },
    concern: {
      ar: 'البقع الداكنة وتفاوت لون البشرة',
      en: 'Dark spots and uneven-looking tone',
    },
    keyIngredients: [
      {
        name: { ar: 'حمض الترانيكساميك', en: 'Tranexamic Acid' },
        benefit: {
          ar: 'يساعد على دعم مظهر بشرة أكثر توازنًا وتجانسًا في اللون.',
          en: 'Helps support a more even, balanced-looking complexion.',
        },
      },
      {
        name: { ar: 'النياسيناميد (فيتامين ب3)', en: 'Niacinamide (Vitamin B3)' },
        benefit: {
          ar: 'يدعم مظهر بشرة أنقى وأكثر نعومة مع الاستخدام المنتظم.',
          en: 'Supports a clearer, smoother-looking skin appearance with regular use.',
        },
      },
    ],
    offers: [
      {
        quantity: 1,
        priceAed: 199,
        badge: { ar: 'للتجربة', en: 'Try first' },
        labelKey: 'one',
        topRibbon: { ar: 'نتيجة من الزجاجة الأولى', en: 'Results from bottle one' },
        title: { ar: 'زجاجة واحدة', en: 'One bottle' },
        subtitle: { ar: '30 مل · شهر كامل', en: '30 ml · full month' },
      },
      {
        quantity: 2,
        priceAed: 279,
        badge: { ar: 'الأكثر اختياراً', en: 'Most chosen' },
        labelKey: 'two',
        title: { ar: 'زجاجتان · ثبّتي النتيجة', en: 'Two bottles · lock results' },
        subtitle: { ar: '60 مل · شهر النتيجة + شهر التثبيت', en: '60 ml · results + lock-in month' },
        savings: { ar: 'وفّري 119 درهم', en: 'Save 119 AED' },
      },
      {
        quantity: 3,
        priceAed: 349,
        badge: { ar: 'الأكثر توفيراً', en: 'Best savings' },
        labelKey: 'three',
        title: { ar: 'ثلاث زجاجات · النتيجة الكاملة', en: 'Three bottles · full routine' },
        subtitle: { ar: '90 مل · نتيجة + تثبيت + أفضل قيمة', en: '90 ml · results + lock-in + best value' },
        savings: { ar: 'وفّري 248 درهم', en: 'Save 248 AED' },
      },
    ],
    benefitBullets: [
      {
        ar: 'يساعد على تقليل مظهر البقع الداكنة مع الاستخدام المنتظم',
        en: 'Helps reduce the appearance of dark spots with consistent use',
      },
      {
        ar: 'يدعم مظهر بشرة أكثر توازنًا وتجانسًا',
        en: 'Supports a more even, balanced-looking complexion',
      },
      {
        ar: 'تركيبة يومية سهلة الاستخدام',
        en: 'Easy-to-use daily formula',
      },
      {
        ar: 'مناسب لبشرة الإمارات وأجواءها',
        en: 'Suited for UAE skin and climate',
      },
    ],
    howToUse: {
      ar: 'ضعي كمية صغيرة من السيروم على الوجه النظيف صباحًا أو مساءً. وزعيه برفق واتركيه يُمتص قبل وضع الترطيب. تجنبي منطقة العيون. استخدمي كريم حماية من الشمس في الصباح.',
      en: 'Apply a small amount of serum to clean skin, morning or evening. Gently distribute and allow to absorb before moisturiser. Avoid the eye area. Use SPF in the morning.',
    },
    whoIsItFor: {
      ar: 'مناسب لمن تعاني من البقع الداكنة، التصبغات، أو تفاوت لون البشرة. يناسب معظم أنواع البشرة مع الاستخدام التدريجي.',
      en: 'Suitable for those concerned with dark spots, pigmentation, or uneven-looking tone. Compatible with most skin types when introduced gradually.',
    },
    whatToExpect: {
      ar: 'النتائج الواقعية تحتاج انتظام. راقبي تحسن مظهر البشرة تدريجيًا خلال أسابيع من الاستخدام المنتظم. لا وعود مبالغ فيها.',
      en: 'Realistic results require consistency. Look for gradual visible improvement over weeks of regular use. No exaggerated promises.',
    },
    complementaryId: 'azelaic-acne-marks-serum',
    ratingPlaceholder: 5.0,
    reviewCountPlaceholder: 428,
    imageUrl: '/products/medicube-txa-niacinamide.png',
    urgencyLine: {
      ar: 'آخر ٤٨ ساعة على عرض الشحن المجاني هذا الأسبوع داخل الإمارات',
      en: 'Last 48 hours for free shipping this week across the UAE',
    },
    ctaRoutine: {
      ar: 'ابدئي روتين التفتيح الآن',
      en: 'Start your brightening routine now',
    },
  },
  {
    id: 'azelaic-acne-marks-serum',
    slug: {
      ar: 'serum-azelaic-acne-marks',
      en: 'azelaic-acne-marks-serum',
    },
    name: {
      ar: 'سيروم BB Calming 16% Azelaic ضد حب الشباب وآثاره',
      en: 'BB Calming 16% Azelaic Acne Serum',
    },
    heroHeadline: {
      ar: 'حب الشباب رجع كل شهر — السبب مو غسول وجهك',
      en: "Your breakouts keep coming back — it's not your face wash",
    },
    shortHeadline: {
      ar: 'حب الشباب الهرموني وآثاره',
      en: 'Hormonal breakouts and blemish marks',
    },
    subheadline: {
      ar: '16% Azelaic Acid يهدّئ مظهر البشرة ويدعم تقليل ظهور آثار الحبوب — روتين يومي بسيط بدون أدوية قوية.',
      en: '16% Azelaic Acid calms the look of skin and helps reduce blemish marks — a simple daily routine without harsh meds.',
    },
    description: {
      ar: 'صُمِّم هذا السيروم للمساعدة في تقليل مظهر آثار الحبوب والبشرة غير المتوازنة. يحتوي على حمض الأزيليك في تركيبة يومية لمظهر بشرة أهدأ وأكثر نقاءً مع الاستخدام المنتظم.',
      en: 'This serum is designed to help with the appearance of blemish marks and uneven-looking skin. It contains azelaic acid in a daily formula for a calmer-looking, clearer complexion with consistent use.',
    },
    concern: {
      ar: 'حب الشباب الهرموني وآثاره',
      en: 'Hormonal breakouts and blemish marks',
    },
    keyIngredients: [
      {
        name: { ar: 'حمض الأزيليك', en: 'Azelaic Acid' },
        benefit: {
          ar: 'يساعد على دعم مظهر بشرة أهدأ وتقليل ظهور آثار الحبوب.',
          en: 'Helps support a calmer-looking skin and reduce the appearance of blemish marks.',
        },
      },
    ],
    offers: [
      {
        quantity: 1,
        priceAed: 199,
        badge: { ar: 'للتجربة', en: 'Try first' },
        labelKey: 'one',
        topRibbon: { ar: 'نتيجة من الزجاجة الأولى', en: 'Results from bottle one' },
        title: { ar: 'زجاجة واحدة', en: 'One bottle' },
        subtitle: { ar: '30 مل · شهر كامل', en: '30 ml · full month' },
      },
      {
        quantity: 2,
        priceAed: 279,
        badge: { ar: 'الأكثر اختياراً', en: 'Most chosen' },
        labelKey: 'two',
        title: { ar: 'زجاجتان · ثبّتي النتيجة', en: 'Two bottles · lock results' },
        subtitle: { ar: '60 مل · شهر النتيجة + شهر التثبيت', en: '60 ml · results + lock-in month' },
        savings: { ar: 'وفّري 119 درهم', en: 'Save 119 AED' },
      },
      {
        quantity: 3,
        priceAed: 349,
        badge: { ar: 'الأكثر توفيراً', en: 'Best savings' },
        labelKey: 'three',
        title: { ar: 'ثلاث زجاجات · النتيجة الكاملة', en: 'Three bottles · full routine' },
        subtitle: { ar: '90 مل · نتيجة + تثبيت + أفضل قيمة', en: '90 ml · results + lock-in + best value' },
        savings: { ar: 'وفّري 248 درهم', en: 'Save 248 AED' },
      },
    ],
    benefitBullets: [
      {
        ar: 'يساعد على تقليل مظهر آثار الحبوب مع الاستخدام المنتظم',
        en: 'Helps reduce the appearance of blemish marks with consistent use',
      },
      {
        ar: 'يدعم مظهر بشرة أهدأ وأنقى',
        en: 'Supports a calmer, clearer-looking skin appearance',
      },
      {
        ar: 'مناسب للبشرة التي تعاني من الحبوب الهرمونية',
        en: 'Suitable for skin prone to hormonal breakouts',
      },
      {
        ar: 'تركيبة يومية سهلة الاستخدام',
        en: 'Easy-to-use daily formula',
      },
    ],
    howToUse: {
      ar: 'ضعي كمية صغيرة من السيروم على الوجه النظيف مساءً. وزعيه برفق واتركيه يُمتص قبل وضع الترطيب. يمكن استخدامه صباحًا أيضًا مع كريم حماية من الشمس.',
      en: 'Apply a small amount of serum to clean skin in the evening. Gently distribute and allow to absorb before moisturiser. Can also be used in the morning with SPF.',
    },
    whoIsItFor: {
      ar: 'مناسب لمن تعاني من حب الشباب الهرموني، آثار الحبوب، أو البشرة غير المتوازنة. يناسب معظم أنواع البشرة.',
      en: 'Suitable for those dealing with hormonal breakouts, blemish marks, or uneven-looking skin. Compatible with most skin types.',
    },
    whatToExpect: {
      ar: 'النتائج الواقعية تحتاج انتظام. راقبي تحسن مظهر البشرة تدريجيًا خلال أسابيع من الاستخدام المنتظم. لا وعود مبالغ فيها.',
      en: 'Realistic results require consistency. Look for gradual visible improvement over weeks of regular use. No exaggerated promises.',
    },
    complementaryId: 'tranexamic-niacinamide-serum',
    ratingPlaceholder: 5.0,
    reviewCountPlaceholder: 386,
    imageUrl: '/products/bb-calming-azelaic.png',
    urgencyLine: {
      ar: 'آخر ٤٨ ساعة على عرض الشحن المجاني هذا الأسبوع داخل الإمارات',
      en: 'Last 48 hours for free shipping this week across the UAE',
    },
    ctaRoutine: {
      ar: 'ابدئي روتين الهدوء الآن',
      en: 'Start your calming routine now',
    },
  },
];

export const PRODUCT_MAP = Object.fromEntries(PRODUCTS.map((p) => [p.id, p]));

export function getProductBySlug(slug: string, locale: 'ar' | 'en'): Product | undefined {
  return PRODUCTS.find((p) => p.slug[locale] === slug);
}

export const UPSELL_PRICE_AED = 99;
export const OFFERS_BY_QUANTITY: Record<number, number> = { 1: 199, 2: 279, 3: 349 };
