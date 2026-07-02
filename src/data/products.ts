export type LocalizedText = {
  ar: string;
  en: string;
};

export type Offer = {
  quantity: 1 | 2 | 3;
  priceAed: number;
  badge: LocalizedText;
  labelKey: string;
};

export type Ingredient = {
  name: LocalizedText;
  benefit: LocalizedText;
};

export type Product = {
  id: string;
  slug: LocalizedText;
  name: LocalizedText;
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
};

export const PRODUCTS: Product[] = [
  {
    id: 'tranexamic-niacinamide-serum',
    slug: {
      ar: 'serum-tranexamic-niacinamide',
      en: 'tranexamic-niacinamide-serum',
    },
    name: {
      ar: 'سيروم الترانيكساميك + النياسيناميد ضد البقع الداكنة وتفاوت لون البشرة',
      en: 'Tranexamic + Niacinamide Dark Spot Serum',
    },
    shortHeadline: {
      ar: 'للبقع الداكنة وتفاوت لون البشرة',
      en: 'For dark spots and uneven-looking tone',
    },
    subheadline: {
      ar: 'سيروم مركز بالترانيكساميك والنياسيناميد لمظهر بشرة أكثر إشراقًا وتجانسًا مع الاستخدام المنتظم.',
      en: 'A focused serum with tranexamic and niacinamide for a brighter-looking, more even-looking complexion over time.',
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
      { quantity: 1, priceAed: 199, badge: { ar: 'للتجربة', en: 'Starter' }, labelKey: 'one' },
      { quantity: 2, priceAed: 279, badge: { ar: 'الأكثر طلبًا', en: 'Most Popular' }, labelKey: 'two' },
      { quantity: 3, priceAed: 349, badge: { ar: 'أفضل قيمة', en: 'Best Value' }, labelKey: 'three' },
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
  },
  {
    id: 'azelaic-acne-marks-serum',
    slug: {
      ar: 'serum-azelaic-acne-marks',
      en: 'azelaic-acne-marks-serum',
    },
    name: {
      ar: 'سيروم الأزيليك لحب الشباب الهرموني وآثاره',
      en: 'Azelaic Serum for Hormonal Acne and Marks',
    },
    shortHeadline: {
      ar: 'لحب الشباب الهرموني وآثاره',
      en: 'For hormonal breakouts and blemish marks',
    },
    subheadline: {
      ar: 'سيروم أزيليك لمظهر بشرة أهدأ وأنقى، مع تركيز على آثار الحبوب والملمس غير المتوازن.',
      en: 'An azelaic-focused serum for calmer-looking skin and the appearance of post-blemish marks.',
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
      { quantity: 1, priceAed: 199, badge: { ar: 'للتجربة', en: 'Starter' }, labelKey: 'one' },
      { quantity: 2, priceAed: 279, badge: { ar: 'الأكثر طلبًا', en: 'Most Popular' }, labelKey: 'two' },
      { quantity: 3, priceAed: 349, badge: { ar: 'أفضل قيمة', en: 'Best Value' }, labelKey: 'three' },
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
  },
];

export const PRODUCT_MAP = Object.fromEntries(PRODUCTS.map((p) => [p.id, p]));

export function getProductBySlug(slug: string, locale: 'ar' | 'en'): Product | undefined {
  return PRODUCTS.find((p) => p.slug[locale] === slug);
}

export const UPSELL_PRICE_AED = 99;
export const OFFERS_BY_QUANTITY: Record<number, number> = { 1: 199, 2: 279, 3: 349 };
