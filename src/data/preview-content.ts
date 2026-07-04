import { PRODUCTS, type Product } from '@/data/products';

export const PREVIEW_PRODUCT_IMAGES: Record<string, string> = {
  'tranexamic-niacinamide-serum': '/products/medicube-txa-niacinamide.png',
  'azelaic-acne-marks-serum': '/products/bb-calming-azelaic.png',
};

export const PREVIEW_BRAND = {
  tagline: 'صيدلية الجمال الإماراتية · سيرومات سريرية مركّزة',
  heroBadge: 'سيرومات سريرية · مناسبة لمناخ الإمارات',
  heroHeadline: 'سيرومات سريرية لمظهر بشرة أصفى وأكثر توازنًا',
  heroSub:
    'تركيبتان مركّزتان مدعومة بجرعات فعّالة — تستهدفان البقع الداكنة وحب الشباب الهرموني. بدون وعود فارغة، مع ضمان 30 يوم ودفع عند الاستلام في كل الإمارات.',
  heroCta: 'استكشفي السيرومات',
  collectionHeadline: 'سيرومان. مشكلتان. حلّ سريري واحد.',
  collectionSub:
    'كل سيروم تركيبة مستقلة بجرعة مركّزة. اختاري المشكلة اللي تشغلك، أو ادمجي الاثنين للروتين الكامل.',
};

export type PreviewProductExtra = {
  routineLabel: string;
  heroHeadline: string;
  heroSub: string;
  urgency: string;
  stat: string;
  statSource: string;
  unitLabel: string;
  volumeLabel: string;
  offerSubtitles: Record<1 | 2 | 3, string>;
  savings: Partial<Record<2 | 3, string>>;
  painHeadline: string;
  painSub: string;
  painItems: { quote: string; solution: string }[];
  ingredientHeadline: string;
  ingredientSub: string;
  timeline: { period: string; title: string; desc: string }[];
  expertQuote: string;
  expertTitle: string;
  compareAlternatives: { title: string; price: string; points: string[] }[];
  compareUs: { title: string; price: string; points: string[] };
};

export const PREVIEW_PRODUCT_EXTRA: Record<string, PreviewProductExtra> = {
  'tranexamic-niacinamide-serum': {
    routineLabel: 'روتين التفتيح · Skinouva Glow',
    heroHeadline: 'البقع الداكنة ما تختفي بالكريمات السطحية — السبب في عمق التصبّغ',
    heroSub:
      'شمس الخليج + الحرارة تسرّع ظهور البقع. سيروم 15% TXA + Niacinamide يستهدف التصبّغ من المصدر — تركيبة يومية خفيفة، بدون تكسير الحاجز الدهني.',
    urgency: 'آخر 48 ساعة على عرض الشحن المجاني هذا الأسبوع داخل الإمارات',
    stat: '68%',
    statSource: 'من عميلات الإمارات يذكرن تفاوت لون البشرة كأول مشكلة جمالية · استطلاع Skinouva 2025',
    unitLabel: '30 مل',
    volumeLabel: 'شهر استخدام يومي',
    offerSubtitles: {
      1: '30 مل · شهر كامل',
      2: '60 مل · شهر النتيجة + شهر التثبيت',
      3: '90 مل · نتيجة + تثبيت + أفضل قيمة',
    },
    savings: { 2: 'وفّري 119 درهم', 3: 'وفّري 248 درهم' },
    painHeadline: 'مشاكل تعرفينها — وحلّ يركّز على السبب',
    painSub: 'مو نخفّف الأعراض. نستهدف مظهر التصبّغ والبقع بتركيز سريري.',
    painItems: [
      {
        quote: '«البقع حول الخدود والأنف ما تختفي، وكل كريم جديد يخيّب ظني.»',
        solution: '15% TXA + Niacinamide يدعم مظهر بشرة أكثر تجانسًا مع الاستخدام المنتظم.',
      },
      {
        quote: '«بشرتي تبهت من الشمس رغم SPF، والمكياج يغطّي بس ما يحل.»',
        solution: 'الترانيكساميك يستهدف مظهر التصبّغ؛ النياسيناميد يدعم مظهرًا أنقى وأكثر إشراقًا.',
      },
      {
        quote: '«جربت فيتامين C وطلع يتأكسد بالحر.»',
        solution: 'تركيبة مستقرة وخفيفة مناسبة لمناخ الإمارات — امتصاص مريح صباحًا ومساءً.',
      },
      {
        quote: '«أبي شي يشتغل بجد بدون وعود مبالغ فيها.»',
        solution: 'نتائج تدريجية واقعية خلال أسابيع — مع ضمان 30 يوم إذا ما لاحظتي فرقًا.',
      },
    ],
    ingredientHeadline: 'السرّ في التركيز، مو في القائمة',
    ingredientSub: 'جرعات واضحة — 15% TXA + Niacinamide — تركيبة يومية مركّزة.',
    timeline: [
      {
        period: 'أول 7 أيام',
        title: 'بشرة أنعم وأصفى',
        desc: 'ملمس أكثر توازنًا، المكياج يثبت أحسن، بداية تحسّن مظهر التصبّغ.',
      },
      {
        period: 'الأسبوع الثاني',
        title: 'بقع أخف ظهورًا',
        desc: 'مظهر البقع الداكنة يبدأ يخف تدريجيًا مع الانتظام.',
      },
      {
        period: 'نهاية الشهر الأول',
        desc: 'فرق أوضح في التجانس — الزجاجة الثانية والثالثة تثبّت النتيجة.',
        title: 'تجانس أوضح',
      },
    ],
    expertQuote:
      'الترانيكساميك مع النياسيناميد من أكثر التركيبات المدعومة لمظهر التصبّغ. الجرعة 15% مناسبة للاستخدام المنزلي مع SPF صباحًا — خاصة في مناخ الخليج.',
    expertTitle: 'اختصاصية عناية بالبشرة · معتمدة',
    compareAlternatives: [
      {
        title: 'ليزر التصبّغ',
        price: '800 – 2,000 درهم / جلسة',
        points: ['جلسات متعددة', 'حساسية بعد الشمس', 'تكلفة مرتفعة', 'وقت تعافٍ'],
      },
      {
        title: 'كريمات تفتيح عامة',
        price: '150 – 400 درهم',
        points: ['تركيز ضعيف', 'نتيجة بطيئة', 'مكونات غير واضحة', 'تأثير سطحي'],
      },
      {
        title: 'فيتامين C غير مستقر',
        price: '200 – 500 درهم',
        points: ['يتأكسد بالحر', 'يلزق بالصيف', 'نتيجة محدودة', 'يحتاج تخزين خاص'],
      },
    ],
    compareUs: {
      title: 'سيروم TXA + Niacinamide 15%',
      price: '199 درهم / زجاجة (شهر)',
      points: [
        '15% تركيز واضح على العبوة',
        'مناسب لمناخ الإمارات',
        'استخدام يومي بسيط',
        'دفع عند الاستلام · ضمان 30 يوم',
      ],
    },
  },
  'azelaic-acne-marks-serum': {
    routineLabel: 'روتين الهدوء · Skinouva Calm',
    heroHeadline: 'حب الشباب الهرموني وآثاره — الكريمات الخفيفة ما توصل للعمق',
    heroSub:
      '16% Azelaic Acid سيروم يهدّئ مظهر البشرة ويدعم تقليل ظهور آثار الحبوب — تركيبة BB Calming للاستخدام المنتظم، بدون روتين معقّد.',
    urgency: 'عرض محدود هذا الأسبوع — شحن مجاني داخل الإمارات',
    stat: '54%',
    statSource: 'من عميلات الإمارات يذكرن آثار الحبوب بعد الهرمونات · استطلاع Skinouva 2025',
    unitLabel: '30 مل',
    volumeLabel: 'شهر استخدام يومي',
    offerSubtitles: {
      1: '30 مل · شهر كامل',
      2: '60 مل · شهر النتيجة + شهر التثبيت',
      3: '90 مل · نتيجة + تثبيت + أفضل قيمة',
    },
    savings: { 2: 'وفّري 119 درهم', 3: 'وفّري 248 درهم' },
    painHeadline: 'مشاكل تعرفينها — وحلّ يركّز على الهدوء والنقاء',
    painSub: 'من حب الشباب الهرموني لآثاره — تركيبة واحدة للروتين اليومي.',
    painItems: [
      {
        quote: '«كل شهر قبل الدورة تطلع حبوب وما تروح إلا بأثر.»',
        solution: '16% Azelaic يدعم مظهر بشرة أهدأ ويقلّل ظهور الآثار مع الانتظام.',
      },
      {
        quote: '«السيرومات اللي جربتها تحرق أو تجفّف.»',
        solution: 'BB Calming — تركيبة مهدّئة، مناسبة للاستخدام التدريجي.',
      },
      {
        quote: '«آثار الحبوب تاخذ شهور وتخرب المكياج.»',
        solution: 'الأزيليك acid معروف بدعم مظهر البشرة أنقى مع الاستمرار.',
      },
      {
        quote: '«أبي حل بدون أدوية قوية.»',
        solution: 'روتين منزلي بسيط — دفع عند الاستلام وضمان 30 يوم.',
      },
    ],
    ingredientHeadline: '16% Azelaic — التركيز اللي يفرق',
    ingredientSub: 'جرعة واضحة على العبوة — مو خلطة بدون تركيز.',
    timeline: [
      {
        period: 'أول 7 أيام',
        title: 'بشرة أهدأ',
        desc: 'احمرار أقل، ملمس أكثر راحة، بداية تحسّن مظهر المسام.',
      },
      {
        period: 'الأسبوع الثاني',
        title: 'آثار أخف',
        desc: 'مظهر آثار الحبوب يبدأ يخف — الالتزام هو المفتاح.',
      },
      {
        period: 'نهاية الشهر الأول',
        title: 'بشرة أنقى',
        desc: 'فرق أوضح — الزجاجتان والثلاث تثبّتان النتيجة.',
      },
    ],
    expertQuote:
      'حمض الأزيليك 16% خيار ممتاز لدعم مظهر البشرة المعرّضة للحبوب وآثاره. يُفضّل البدء تدريجيًا مع ترطيب وSPF.',
    expertTitle: 'اختصاصية عناية بالبشرة · معتمدة',
    compareAlternatives: [
      {
        title: 'علاجات عيادة',
        price: '500 – 1,500 درهم',
        points: ['مواعيد متكررة', 'تكلفة عالية', 'وقت وانتظار', 'ليس للجميع'],
      },
      {
        title: 'سيرومات رخيصة بدون تركيز',
        price: '80 – 150 درهم',
        points: ['تركيز غير واضح', 'نتيجة ضعيفة', 'مكونات عامة', 'إحباط متكرر'],
      },
      {
        title: 'أحماض قوية بدون إرشاد',
        price: '150 – 300 درهم',
        points: ['تحسس وجفاف', 'تكسير الحاجز', 'صعب الاستمرار', 'نتائج متذبذبة'],
      },
    ],
    compareUs: {
      title: 'BB Calming 16% Azelaic Serum',
      price: '199 درهم / زجاجة (شهر)',
      points: [
        '16% واضح على العبوة',
        'تركيبة مهدّئة',
        'مناسب للحبوب الهرمونية',
        'COD · ضمان 30 يوم',
      ],
    },
  },
};

export const PREVIEW_HOME_REVIEWS = [
  {
    initials: 'م.ع',
    name: 'مريم العلي',
    age: '34',
    city: 'دبي',
    text: '«كنت أغطّي البقع بكونسيلر كل يوم. بعد شهر من سيروم TXA، المكياج صار أخف وثقتي أعلى. الدفع عند الاستلام خلاني أجرب بدون تردد.»',
  },
  {
    initials: 'س.ر',
    name: 'سارة الراشد',
    age: '29',
    city: 'أبوظبي',
    text: '«حب الشباب الهرموني كان يخرب كل مناسبة. سيروم الأزيليك هدّأ البشرة وآثار الحبوب خفت — روتين بسيط ونتيجة تدريجية.»',
  },
  {
    initials: 'ن.خ',
    name: 'نورة الخوري',
    age: '41',
    city: 'الشارقة',
    text: '«أهم شي عندي COD وضمان الاسترجاع. جربت الاثنين معًا — بقع أخف وبشرة أهدأ. توصيل سريع داخل الإمارات.»',
  },
];

export const PREVIEW_FAQ = [
  {
    q: 'هل الدفع عند الاستلام متاح في كل الإمارات؟',
    a: 'نعم. الدفع عند الاستلام متوفر في جميع إمارات الدولة. تدفعين عند استلام الطلب.',
  },
  {
    q: 'كم يستغرق التوصيل؟',
    a: '2–4 أيام عمل داخل الإمارات حسب المنطقة.',
  },
  {
    q: 'ما هو ضمان الاسترجاع؟',
    a: '30 يوم ضمان رضا. إذا ما لاحظتي فرقًا، تواصلي معنا لاسترداد قيمة الطلب.',
  },
  {
    q: 'هل أستخدم السيرومين معًا؟',
    a: 'يمكن استخدام TXA صباحًا مع SPF، والأزيليك مساءً — أو اختاري السيروم المناسب لمشكلتك.',
  },
  {
    q: 'هل المنتجات مناسبة لمناخ الإمارات؟',
    a: 'نعم. التركيبات خفيفة ومصممة للاستخدام اليومي في الحر والرطوبة.',
  },
];

export function getPreviewProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug.ar === slug || p.slug.en === slug);
}

export function getOtherProduct(productId: string): Product | undefined {
  const current = PRODUCTS.find((p) => p.id === productId);
  if (!current) return undefined;
  return PRODUCTS.find((p) => p.id === current.complementaryId);
}
