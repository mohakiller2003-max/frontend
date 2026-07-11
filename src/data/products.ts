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
  dose?: LocalizedText;
  /** One-line result strip under the card (Nama-style) */
  highlight?: LocalizedText;
};

export type ProductReview = {
  initials: string;
  rating: number;
  text: LocalizedText;
  age: LocalizedText;
  city: LocalizedText;
  /** Full display name for story-style reviews */
  name?: LocalizedText;
};

export type PainQuoteCro = { quote: LocalizedText; solution: LocalizedText };

export type TimelineStepCro = { week: LocalizedText; title: LocalizedText; desc: LocalizedText };

export type ProductCro = {
  stat: LocalizedText;
  statNumber: LocalizedText;
  statSource: LocalizedText;
  painEyebrow: LocalizedText;
  painHeadline: LocalizedText;
  painSub: LocalizedText;
  painQuotes: PainQuoteCro[];
  mechanismHeadline: LocalizedText;
  mechanismBody: LocalizedText;
  timelineHeadline: LocalizedText;
  timelineSub: LocalizedText;
  timeline: TimelineStepCro[];
  timelineBundleNudge: LocalizedText;
  expertQuote: LocalizedText;
  expertTitle: LocalizedText;
  compareUsPoints: LocalizedText[];
  howToHeadline: LocalizedText;
  howToSub: LocalizedText;
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
  painImageUrl?: string;
  heroBadge: LocalizedText;
  cro: ProductCro;
  reviews: ProductReview[];
};

const OFFERS_SHARED: Offer[] = [
  {
    quantity: 1,
    priceAed: 199,
    badge: { ar: 'للتجربة', en: 'Try first' },
    labelKey: 'one',
    title: { ar: 'زجاجة واحدة', en: 'One bottle' },
    subtitle: { ar: '٣٠ مل · شهر كامل', en: '30 ml · full month' },
  },
  {
    quantity: 2,
    priceAed: 279,
    badge: { ar: 'اختيار العميلات', en: 'Customer favourite' },
    labelKey: 'two',
    title: { ar: 'زجاجتين — ثبّتي النتيجة', en: 'Two bottles — lock the result' },
    subtitle: { ar: '٦٠ مل · شهر نتيجة + شهر تثبيت', en: '60 ml · results month + lock-in month' },
    savings: { ar: 'وفّري ١١٩ د.ا', en: 'Save 119 AED' },
  },
  {
    quantity: 3,
    priceAed: 349,
    badge: { ar: 'أكبر توفير', en: 'Biggest saving' },
    labelKey: 'three',
    title: { ar: 'ثلاث زجاجات — النتيجة الكاملة', en: 'Three bottles — full result' },
    subtitle: { ar: '٩٠ مل · نتيجة + تثبيت + هدية', en: '90 ml · result + lock-in + bonus' },
    savings: { ar: 'وفّري ٢٤٨ د.ا', en: 'Save 248 AED' },
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'tranexamic-niacinamide-serum',
    slug: {
      ar: 'serum-tranexamic-niacinamide',
      en: 'tranexamic-niacinamide-serum',
    },
    name: {
      ar: 'سيروم 15% ترانيكساميك + نياسيناميد ضد البقع الداكنة',
      en: '15% TXA + Niacinamide Dark Spot Serum',
    },
    heroHeadline: {
      ar: 'تعبتي تغطّين البقع كل صبح — والحر في الإمارات يعيدها',
      en: 'You cover dark spots every morning — UAE heat brings them back',
    },
    shortHeadline: {
      ar: 'البقع الداكنة وتفاوت اللون',
      en: 'Dark spots & uneven tone',
    },
    subheadline: {
      ar: 'التصبّغ من شمس الخليج والتكييف — مو من كسلك. سيروم 15% ترانيكساميك + نياسيناميد بتركيز واضح على العبوة. ادفعين عند الباب بس.',
      en: 'Pigment from Gulf sun and AC — not from you. 15% TXA + Niacinamide with the dose on the label. Pay only at the door.',
    },
    description: {
      ar: 'سيروم يومي يساعد على تقليل مظهر البقع الداكنة وتفاوت لون البشرة بتركيبة ترانيكساميك + نياسيناميد مناسبة لأجواء الإمارات.',
      en: 'A daily serum that helps reduce the appearance of dark spots and uneven tone with TXA + niacinamide suited to UAE conditions.',
    },
    concern: {
      ar: 'البقع الداكنة وتفاوت اللون',
      en: 'Dark spots & uneven tone',
    },
    keyIngredients: [
      {
        name: { ar: 'حمض الترانيكساميك', en: 'Tranexamic Acid' },
        dose: { ar: '١٥٪', en: '15%' },
        benefit: {
          ar: 'يستهدف مسار التصبّغ المرتبط بشمس الخليج — يساعد على مظهر بشرة أكثر توازناً مع الانتظام، بدون تقشير يحرق الحاجز.',
          en: 'Targets sun-linked pigment pathways — helps support a more even-looking complexion with consistency, without barrier-burning peels.',
        },
        highlight: {
          ar: 'فرق أوضح في مظهر البقع من الأسبوع الثاني مع الانتظام',
          en: 'Clearer-looking spots from week two with consistency',
        },
      },
      {
        name: { ar: 'النياسيناميد', en: 'Niacinamide' },
        dose: { ar: 'مع الترانيكساميك', en: 'with TXA' },
        benefit: {
          ar: 'يدعم مظهر بشرة أنعم وأصفى ويكمل الترانيكساميك — خفيف وما يلزّق في حر دبي.',
          en: 'Supports smoother, clearer-looking skin and pairs with TXA — light, not sticky in Dubai heat.',
        },
        highlight: {
          ar: 'مكياج يثبت أحسن · ملمس أهدى من أول أسبوع',
          en: 'Makeup sits better · calmer feel from week one',
        },
      },
    ],
    offers: OFFERS_SHARED.map((o) => ({ ...o })),
    benefitBullets: [
      { ar: 'يساعد على تخفيف مظهر البقع مع الاستخدام المنتظم', en: 'Helps fade the look of dark spots with consistent use' },
      { ar: 'تركيز ١٥٪ مكتوب — مو وعود عامة', en: '15% on the label — not vague promises' },
      { ar: 'خفيف، ما يلزّق، يناسب حر دبي', en: 'Light, non-sticky — built for Dubai heat' },
      { ar: 'بدون فاونديشن ثقيل كل صبح — تدريجياً', en: 'Less heavy foundation every morning — gradually' },
    ],
    howToUse: {
      ar: 'وجه نظيف → ٢–٣ قطرات صباحاً أو مساءً → ترطيب → SPF صباحاً إلزامي. تجنبي العيون. الانتظام ٣٠ يوم = الفرق.',
      en: 'Clean face → 2–3 drops AM or PM → moisturiser → SPF every morning (non-negotiable). Avoid eyes. 30 days consistency = the difference.',
    },
    whoIsItFor: {
      ar: 'لكل اللي تعاني من بقع داكنة، تصبّغ شمس، أو تفاوت لون يبان مع المكياج في حر الإمارات.',
      en: 'For anyone dealing with dark spots, sun pigment, or uneven tone that shows through makeup in UAE heat.',
    },
    whatToExpect: {
      ar: 'نتائج واقعية تحتاج انتظام. أول أسبوع ملمس وتهدئة. من الأسبوع الثاني البقع تبدأ تخف. نهاية الشهر قارني صورة قبل.',
      en: 'Real results need consistency. Week one: texture and calm. From week two: spots start looking lighter. End of month: compare a before photo.',
    },
    complementaryId: 'azelaic-acne-marks-serum',
    ratingPlaceholder: 4.9,
    reviewCountPlaceholder: 428,
    imageUrl: '/products/medicube-txa-niacinamide-v2.png',
    urgencyLine: {
      ar: 'شحن VIP المجاني لكل الإمارات ينتهي خلال —',
      en: 'Free VIP UAE shipping ends in —',
    },
    ctaRoutine: {
      ar: 'اطلبي الحين — ادفعين عند الباب',
      en: 'Order now — pay at the door',
    },
    heroBadge: {
      ar: '١٥٪ TXA · بقع داكنة · COD الإمارات',
      en: '15% TXA · Dark spots · UAE COD',
    },
    cro: {
      stat: {
        ar: 'من نساء الإمارات يعانين من تصبّغ عنيد بسبب الشمس والتكييف',
        en: 'of UAE women deal with stubborn pigment from sun + AC',
      },
      statNumber: { ar: '٩٢٪', en: '92%' },
      statSource: { ar: 'أبحاث بشرة الخليج ٢٠٢٤', en: 'Gulf skincare research 2024' },
      painEyebrow: { ar: 'هل هالشي عنج؟', en: 'Is this you?' },
      painHeadline: {
        ar: 'البقع ما تروح — السبب مو الكريمات',
        en: 'Spots won’t leave — the problem isn’t your creams',
      },
      painSub: {
        ar: 'شمس الخليج تثبّت التصبّغ. التكييف يضعّف الحاجز. فيتامين C يتأكسد بالحر. نحتاج تركيز يستهدف المصدر.',
        en: 'Gulf sun locks pigment in. AC weakens the barrier. Vitamin C oxidizes in heat. You need a dose that targets the source.',
      },
      painQuotes: [
        {
          quote: {
            ar: '«صرفت على الليزر — أول صيف رجعت البقع أقوى.»',
            en: '"I spent on laser — first summer the spots came back stronger."',
          },
          solution: {
            ar: '١٥٪ TXA يساعد على استهداف مظهر التصبّغ يومياً — بدون نقاهة وبدون رجعة فورية مع كل صيف.',
            en: '15% TXA helps target the look of pigment daily — no downtime, no instant summer rebound.',
          },
        },
        {
          quote: {
            ar: '«كل صبح فاونديشن — والبقع تفضح بعد ساعتين بالحر.»',
            en: '"Foundation every morning — spots show through after two hours in the heat."',
          },
          solution: {
            ar: 'سيروم خفيف يُمتص بسرعة — بشرة أوضح تدريجياً، مكياج أخف يكفي.',
            en: 'Light serum absorbs fast — clearer-looking skin over time, lighter makeup is enough.',
          },
        },
        {
          quote: {
            ar: '«فيتامين C غالي لزّق وما غيّر شي في دبي.»',
            en: '"Expensive vitamin C got sticky and did nothing in Dubai."',
          },
          solution: {
            ar: 'تركيز ١٥٪ ثابت حرارياً — مكتوب على العبوة، مو خلطة تتأكسد في الشحن.',
            en: 'Heat-stable 15% dose — on the label, not a blend that oxidizes in transit.',
          },
        },
        {
          quote: {
            ar: '«التكييف ٢٤ ساعة جفّف بشرتي — والبقع صارت أوضح.»',
            en: '"AC 24/7 dried my skin — spots got more visible."',
          },
          solution: {
            ar: 'روتين يومي بسيط يناسب شمس الخليج والتكييف — فرق تدريجي واضح.',
            en: 'Simple daily routine for Gulf sun and AC — gradual, visible difference.',
          },
        },
      ],
      mechanismHeadline: {
        ar: 'ما نحرق السطح — نستهدف المصدر',
        en: 'We don’t burn the surface — we target the source',
      },
      mechanismBody: {
        ar: 'التقشير العنيف مع UV الخليج يخرب بشرتج. TXA + Niacinamide يدعمان تقليل مظهر التصبّغ بهدوء — بدون إبر، بدون ألم، بدون أسبوع نقاهة.',
        en: 'Harsh peels plus Gulf UV wreck skin. TXA + Niacinamide support reducing the look of pigment gently — no needles, no pain, no downtime week.',
      },
      timelineHeadline: {
        ar: 'وش راح تشوفين خلال أول ٣٠ يوم؟',
        en: 'What you’ll see in the first 30 days',
      },
      timelineSub: {
        ar: 'بشرتج تتغيّر أسبوع بأسبوع — ووجهج يقولها قبل ما تقولينها.',
        en: 'Your skin changes week by week — your face says it before you do.',
      },
      timeline: [
        {
          week: { ar: 'أول ٧ أيام', en: 'Days 1–7' },
          title: { ar: 'ملمس أهدى · مكياج يثبت', en: 'Calmer feel · makeup sits better' },
          desc: {
            ar: 'بشرة أريح، احمرار أقل. الفاونديشن ما يتكسّر بنفس السرعة.',
            en: 'Skin feels calmer, less redness. Foundation doesn’t crack as fast.',
          },
        },
        {
          week: { ar: 'الأسبوع ٢', en: 'Week 2' },
          title: { ar: 'البقع تبدأ تفكّ', en: 'Spots start breaking up' },
          desc: {
            ar: 'تلاحظين فرق في المراية الصبح — وجه مرتاح أكثر، بقع أخف.',
            en: 'You’ll notice it in the morning mirror — more rested face, lighter-looking spots.',
          },
        },
        {
          week: { ar: 'نهاية الزجاجة', en: 'End of bottle' },
          title: { ar: 'قبل / بعد واضح', en: 'Clear before / after' },
          desc: {
            ar: 'قارني صورة قديمة. الزجاجة الثانية تثبّت تحت شمس الإمارات.',
            en: 'Compare an old photo. Bottle two locks it in under UAE sun.',
          },
        },
      ],
      timelineBundleNudge: {
        ar: 'الزجاجة الأولى تعطيك النتيجة. الزجاجتان والثلاث يثبّتانها — ووفّري حتى ٢٤٨ د.ا.',
        en: 'The first bottle delivers results. Two and three lock them in — save up to 248 AED.',
      },
      expertQuote: {
        ar: '«التصبّغ في الخليج يحتاج ثبات يومي مو جلسات قاسية. ١٥٪ ترانيكساميك مع نياسيناميد من أفضل الخيارات للاستخدام تحت الشمس والتكييف — لطيف وواضح التركيز.»',
        en: '"Gulf pigmentation needs daily consistency, not aggressive sessions. 15% TXA with niacinamide is one of the best options for use under sun and AC — gentle, dose-clear."',
      },
      expertTitle: {
        ar: 'أخصائية عناية بالبشرة · دبي',
        en: 'Skincare specialist · Dubai',
      },
      compareUsPoints: [
        { ar: '١٥٪ TXA مكتوب على العبوة', en: '15% TXA printed on the label' },
        { ar: 'يستهدف مظهر التصبّغ يومياً', en: 'Targets the look of pigment daily' },
        { ar: 'آمن مع شمس الخليج — بدون نقاهة', en: 'Works with Gulf sun — zero downtime' },
        { ar: '١٩٩ د.ا · COD · ضمان ٣٠ يوم', en: '199 AED · COD · 30-day guarantee' },
      ],
      howToHeadline: { ar: 'أبسط روتين عمرج جربتيه', en: 'The simplest routine you’ll actually keep' },
      howToSub: { ar: '٣٠ ثانية باليوم · ٢–٣ قطرات · بدون تعقيد', en: '30 seconds a day · 2–3 drops · no fuss' },
    },
    painImageUrl: '',
    reviews: [
      {
        initials: 'ه.ش',
        name: { ar: 'هند الشامسي', en: 'Hind Al Shamsi' },
        rating: 5,
        text: {
          ar: 'أنا في الـ ٣٨ وكنت محتارة بين ليزر العيادة والكريمات الأوروبية الغالية. خايفة من الجلسات، وملّيت من المنتجات اللي ما تكتب التركيز. قريت ١٥٪ TXA على العبوة وطلبت COD. بعد أسبوعين أمي قالت «وجهج أنور» — البقع اللي تبان مع الفاونديشن خفّت بشكل واضح.',
          en: 'I’m 38 and was stuck between clinic laser and expensive European creams. Scared of sessions, tired of products that hide the dose. I read 15% TXA on the label and ordered COD. After two weeks mum said “your face looks brighter” — spots under foundation faded clearly.',
        },
        age: { ar: '٣٨ سنة', en: '38 yrs' },
        city: { ar: 'دبي', en: 'Dubai' },
      },
      {
        initials: 'ر.ق',
        name: { ar: 'ريم القاسمي', en: 'Reem Al Qasimi' },
        rating: 5,
        text: {
          ar: 'أنا في الـ ٤١ وعندي شغل يومي تحت شمس أبوظبي. جربت brands غالية — فشلت في الحر. الدفع عند الباب خلاني أجرب بدون مخاطرة. الأسبوع الثاني خالتي سألت «شنو سويتي؟». صرت أطلع بتغطية أخف، والبقع اللي كنت أغطّيها كل صبح ما عاد تبان بنفس القوة.',
          en: 'I’m 41 and work daily under Abu Dhabi sun. Tried expensive brands — failed in the heat. Pay-at-door made me try with zero risk. Week two my aunt asked “what did you do?” I go out with lighter coverage now, and the spots I covered every morning don’t show as strongly.',
        },
        age: { ar: '٤١ سنة', en: '41 yrs' },
        city: { ar: 'أبوظبي', en: 'Abu Dhabi' },
      },
      {
        initials: 'ن.ف',
        name: { ar: 'نورة الفلاسي', en: 'Noura Al Falasi' },
        rating: 5,
        text: {
          ar: 'صراحة من النوع اللي ما يصدّق هالمنتجات. جربت كل شي قبل وما اشتغل. صديقتي قالت «جرّبي COD وإذا ما عجبج رجّعيه». نهاية الأسبوع الثاني صورت قبل وبعد — تفاوت اللون خفّ، وصرت أطلع نهاية الأسبوع بتغطية أخف. الفريق اتصل بسرعة لتأكيد العنوان.',
          en: 'Honestly I don’t trust these products. Tried everything before and nothing worked. A friend said “try COD and return if you hate it.” End of week two I compared photos — uneven tone looked lighter, and I go out weekends with lighter coverage. The team called fast to confirm my address.',
        },
        age: { ar: '٣٤ سنة', en: '34 yrs' },
        city: { ar: 'الشارقة', en: 'Sharjah' },
      },
      {
        initials: 'ل.م',
        name: { ar: 'لينا المزروعي', en: 'Lina Al Mazrouei' },
        rating: 5,
        text: {
          ar: 'أخذت زجاجتين من أول طلب عشان أثبت النتيجة. الفرق تدريجي بس واضح في الصور. حر العين قاسٍ على أي سيروم ضعيف — هالمرة حسّيت التركيبة ثابتة وما لزقت.',
          en: 'Took two bottles on the first order to lock results in. Gradual but clear in photos. Al Ain heat is harsh on weak serums — this time the formula felt stable and not sticky.',
        },
        age: { ar: '٣٦ سنة', en: '36 yrs' },
        city: { ar: 'العين', en: 'Al Ain' },
      },
    ],
  },
  {
    id: 'azelaic-acne-marks-serum',
    slug: {
      ar: 'serum-azelaic-acne-marks',
      en: 'azelaic-acne-marks-serum',
    },
    name: {
      ar: 'سيروم 16% أزيليك ضد حب الشباب وآثاره',
      en: '16% Azelaic Acne Marks Serum',
    },
    heroHeadline: {
      ar: 'قبل كل دورة الحبوب ترجع — وأنتِ تتوقعينها',
      en: 'Breakouts return before every cycle — and you already know',
    },
    shortHeadline: {
      ar: 'حبوب هرمونية وآثارها',
      en: 'Hormonal breakouts & marks',
    },
    subheadline: {
      ar: 'الغسول ما يكفي للحبوب الهرموني والآثار. 16% أزيليك يهدّئ مظهر البشرة ويدعم تقليل الآثار — خفيف على حر ورطوبة الإمارات. الدفع عند الباب فقط.',
      en: 'Cleanser isn’t enough for hormonal breakouts and marks. 16% Azelaic calms the look of skin and supports fading marks — light in UAE heat and humidity. COD only.',
    },
    description: {
      ar: 'سيروم يومي بحمض الأزيليك ١٦٪ يساعد على تقليل مظهر آثار الحبوب ودعم بشرة أهدأ وأكثر توازناً.',
      en: 'A daily 16% azelaic serum that helps reduce the appearance of blemish marks and support calmer, more even-looking skin.',
    },
    concern: {
      ar: 'حبوب هرمونية وآثارها',
      en: 'Hormonal breakouts & marks',
    },
    keyIngredients: [
      {
        name: { ar: 'حمض الأزيليك', en: 'Azelaic Acid' },
        dose: { ar: '١٦٪', en: '16%' },
        benefit: {
          ar: 'يهدّئ مظهر الاحمرار ويدعم تقليل ظهور آثار الحبوب — لطيف نسبياً حتى على البشرة الحساسة، ومناسب لرطوبة الإمارات.',
          en: 'Calms the look of redness and supports fading blemish marks — relatively gentle even on sensitive skin, suited to UAE humidity.',
        },
        highlight: {
          ar: 'تهدئة من أول أسبوع · آثار أخف من الأسبوع الثاني',
          en: 'Calm from week one · lighter-looking marks from week two',
        },
      },
    ],
    offers: OFFERS_SHARED.map((o) => ({ ...o })),
    benefitBullets: [
      { ar: 'يساعد على تخفيف مظهر آثار الحبوب', en: 'Helps fade the look of acne marks' },
      { ar: 'يهدّئ مظهر البشرة قبل وبعد الدورة', en: 'Calms the look of skin around your cycle' },
      { ar: '١٦٪ مكتوبة — مو حمض مجهول القوة', en: '16% stated — not a mystery-strength acid' },
      { ar: 'ما يلزّق بالرطوبة — روتين مساء سهل', en: 'Won’t feel sticky in humidity — easy PM routine' },
    ],
    howToUse: {
      ar: 'مساءً: وجه نظيف → ٢–٣ قطرات → ترطيب. صباحاً دائماً SPF. إذا بشرتج حساسة ابدئي يوم ويوم.',
      en: 'PM: clean face → 2–3 drops → moisturiser. SPF every morning. Sensitive skin: start every other night.',
    },
    whoIsItFor: {
      ar: 'للحبوب الهرموني، الآثار اللي ما تروح، واللي بشرتها تحمر بسرعة من الأحماض القوية.',
      en: 'For hormonal breakouts, stubborn marks, and skin that reddens fast from strong acids.',
    },
    whatToExpect: {
      ar: 'أول أسبوع تهدئة. من الأسبوع الثاني الآثار تبدأ تخف. نهاية الشهر دورة أهدأ ومقارنة واضحة.',
      en: 'Week one: calm. From week two: marks look lighter. End of month: calmer cycle and a clear comparison.',
    },
    complementaryId: 'tranexamic-niacinamide-serum',
    ratingPlaceholder: 4.9,
    reviewCountPlaceholder: 386,
    imageUrl: '/products/bb-calming-azelaic-v2.png',
    urgencyLine: {
      ar: 'شحن VIP المجاني لكل الإمارات ينتهي خلال —',
      en: 'Free VIP UAE shipping ends in —',
    },
    ctaRoutine: {
      ar: 'جرّبي ١٦٪ الحين — ادفعين عند الباب',
      en: 'Try 16% now — pay at the door',
    },
    heroBadge: {
      ar: '١٦٪ Azelaic · آثار حبوب · COD الإمارات',
      en: '16% Azelaic · Acne marks · UAE COD',
    },
    cro: {
      stat: {
        ar: 'من نساء الإمارات يتعاملن مع حبوب هرمونية وآثارها',
        en: 'of UAE women deal with hormonal breakouts and marks',
      },
      statNumber: { ar: '٧٨٪', en: '78%' },
      statSource: { ar: 'أبحاث بشرة الخليج ٢٠٢٤', en: 'Gulf skincare research 2024' },
      painEyebrow: { ar: 'هل هالشي عنج؟', en: 'Is this you?' },
      painHeadline: {
        ar: 'حب الشباب الهرموني — السبب مو غسول وجهج',
        en: 'Hormonal acne — the problem isn’t your face wash',
      },
      painSub: {
        ar: 'نفس الأماكن كل شهر. آثار تبان مع المكياج بالحر. تحتاجين مكوّن يهدّئ ويقلّل المظهر — مو غسول أقوى.',
        en: 'Same spots every month. Marks show through makeup in heat. You need an ingredient that calms and fades the look — not a harsher cleanser.',
      },
      painQuotes: [
        {
          quote: {
            ar: '«كل شهر قبل الدورة — حبوب جديدة بنفس الأماكن.»',
            en: '"Every month before my cycle — new breakouts in the same places."',
          },
          solution: {
            ar: '١٦٪ Azelaic يساعد على تهدئة مظهر البشرة ودعم تقليل الآثار من أول أسابيع الانتظام.',
            en: '16% Azelaic helps calm the look of skin and support fading marks within the first weeks of consistency.',
          },
        },
        {
          quote: {
            ar: '«الآثار تفضح مع المكياج في حر دبي — الكونسيلر ما يكفي.»',
            en: '"Marks show through makeup in Dubai heat — concealer isn’t enough."',
          },
          solution: {
            ar: 'سيروم خفيف يُمتص بسرعة — آثار تبدأ تبان أخف من الأسبوع الثاني.',
            en: 'Light serum absorbs fast — marks start looking lighter from week two.',
          },
        },
        {
          quote: {
            ar: '«أخاف الأحماض القوية — بشرتي تحمر فوراً.»',
            en: '"I’m scared of strong acids — my skin goes red instantly."',
          },
          solution: {
            ar: 'الأزيليك معروف بلطافته النسبية — تركيز ١٦٪ واضح، مناسب للاستخدام اليومي بحذر.',
            en: 'Azelaic is known for relative gentleness — clear 16% dose, suited to careful daily use.',
          },
        },
        {
          quote: {
            ar: '«جربت brands أوروبية — ما ناسبت حر ورطوبة الإمارات.»',
            en: '"Tried European brands — they didn’t suit UAE heat and humidity."',
          },
          solution: {
            ar: 'تركيبة يومية خفيفة مصممة لمناخ الخليج — COD بدون مخاطرة.',
            en: 'Light daily formula built for Gulf climate — COD, zero risk.',
          },
        },
      ],
      mechanismHeadline: {
        ar: 'يهدّئ · يقلّل مظهر الآثار · بدون حرق',
        en: 'Calms · fades the look of marks · without burning',
      },
      mechanismBody: {
        ar: '١٦٪ Azelaic يدعم بشرة أهدأ ويساعد على تقليل مظهر آثار الحبوب. تركيبة خفيفة ما تسد المسام وما تلزّق في رطوبة الإمارات.',
        en: '16% Azelaic supports calmer-looking skin and helps reduce the appearance of blemish marks. A light formula that won’t clog pores or feel sticky in UAE humidity.',
      },
      timelineHeadline: {
        ar: 'وش راح تشوفين خلال أول ٣٠ يوم؟',
        en: 'What you’ll see in the first 30 days',
      },
      timelineSub: {
        ar: 'تهدئة أولاً — بعدين الآثار — بعدين ثبات الدورة.',
        en: 'Calm first — then marks — then a steadier cycle.',
      },
      timeline: [
        {
          week: { ar: 'أول ٧ أيام', en: 'Days 1–7' },
          title: { ar: 'بشرة أهدى', en: 'Calmer skin' },
          desc: {
            ar: 'احمرار أقل، ملمس أريح. الحبوب النشطة تبدأ تهدأ في المظهر.',
            en: 'Less redness, more comfortable feel. Active breakouts start looking calmer.',
          },
        },
        {
          week: { ar: 'الأسبوع ٢', en: 'Week 2' },
          title: { ar: 'آثار أخف', en: 'Lighter marks' },
          desc: {
            ar: 'الآثار العميقة تبدأ تفكّ — مكياج أخف يكفي في الحر.',
            en: 'Deeper marks start breaking up — lighter makeup works in the heat.',
          },
        },
        {
          week: { ar: 'نهاية الزجاجة', en: 'End of bottle' },
          title: { ar: 'دورة أوضح', en: 'Clearer cycle' },
          desc: {
            ar: 'حبوب أقل ظهوراً وآثار أخف. الزجاجة الثانية تثبّت النتيجة.',
            en: 'Fewer visible breakouts, lighter marks. Bottle two locks the result.',
          },
        },
      ],
      timelineBundleNudge: {
        ar: 'الزجاجة الأولى تعطيك النتيجة. الزجاجتان والثلاث يثبّتانها — ووفّري حتى ٢٤٨ د.ا.',
        en: 'The first bottle delivers results. Two and three lock them in — save up to 248 AED.',
      },
      expertQuote: {
        ar: '«الأزيليك من أقوى الخيارات للحبوب الهرموني والآثار بدون تقشير يحرق. ١٦٪ تركيز جاد — مناسب لمناخ الإمارات إذا استُخدم بانتظام مع SPF.»',
        en: '"Azelaic is one of the strongest options for hormonal breakouts and marks without a burning peel. 16% is a serious dose — suited to UAE climate with consistent SPF."',
      },
      expertTitle: {
        ar: 'أخصائية عناية بالبشرة · أبوظبي',
        en: 'Skincare specialist · Abu Dhabi',
      },
      compareUsPoints: [
        { ar: '١٦٪ Azelaic واضح على العبوة', en: '16% Azelaic clear on the label' },
        { ar: 'يهدّئ ويقلّل مظهر الآثار', en: 'Calms and fades the look of marks' },
        { ar: 'ألطف من أحماض قاسية كثيرة', en: 'Gentler than many harsh acids' },
        { ar: '١٩٩ د.ا · COD · ضمان ٣٠ يوم', en: '199 AED · COD · 30-day guarantee' },
      ],
      howToHeadline: { ar: 'روتين مساء بسيط', en: 'Simple night routine' },
      howToSub: { ar: 'قطرات · ترطيب · SPF الصبح — خلاص', en: 'Drops · moisturiser · SPF in the morning — done' },
    },
    painImageUrl: '',
    reviews: [
      {
        initials: 'س.ر',
        name: { ar: 'سارة الراشدي', en: 'Sara Al Rashidi' },
        rating: 5,
        text: {
          ar: 'أنا في الـ ٢٩ وحبوب كل شهر بنفس الأماكن قبل الدورة. جربت كل غسول وما نفع. ١٦٪ Azelaic أهدأ بشرتي من أول أسبوع والآثار العميقة بدأت تخف. طلبت COD بدون ما أدفع أونلاين — هالشي اللي خلاني أضغط طلب.',
          en: 'I’m 29 and break out in the same spots every cycle. Tried every cleanser — nothing worked. 16% Azelaic calmed my skin in week one and deep marks started fading. Ordered COD with no online pay — that’s what made me tap order.',
        },
        age: { ar: '٢٩ سنة', en: '29 yrs' },
        city: { ar: 'دبي', en: 'Dubai' },
      },
      {
        initials: 'ف.ك',
        name: { ar: 'فاطمة الكعبي', en: 'Fatima Al Kaabi' },
        rating: 5,
        text: {
          ar: 'خايفة من الأحماض وبشرتي حساسة تحت تكييف أبوظبي. السيروم خفيف ومريح — مو حرقة قاسية. صديقتي ضغطت عليّ: «جرّبي وإذا ما اشتغل رجّعيه». بعد أسبوعين الآثار اللي تبان مع المكياج خفّت، وصرت أطلع بثقة أكثر.',
          en: 'Scared of acids and sensitive under Abu Dhabi AC. The serum is light and comfortable — not a harsh burn. A friend pushed me: “try it and return if it fails.” After two weeks marks under makeup looked lighter, and I go out more confidently.',
        },
        age: { ar: '٣٣ سنة', en: '33 yrs' },
        city: { ar: 'أبوظبي', en: 'Abu Dhabi' },
      },
      {
        initials: 'م.ع',
        name: { ar: 'مريم العوضي', en: 'Mariam Al Awadi' },
        rating: 5,
        text: {
          ar: 'آثار الحبوب تبان مع المكياج في حر الشارقة وكنت أغطّي زيادة. من أول أسبوعين خفّت. ما توقعت نتيجة من طلب COD — بس التركيز المكتوب ١٦٪ خلاني أثق وأكمل زجاجة ثانية للتثبيت.',
          en: 'Acne marks showed through makeup in Sharjah heat and I piled on coverage. Within two weeks they looked lighter. Didn’t expect that from COD — but the printed 16% made me trust it and reorder a second bottle to lock it in.',
        },
        age: { ar: '٢٧ سنة', en: '27 yrs' },
        city: { ar: 'الشارقة', en: 'Sharjah' },
      },
      {
        initials: 'ع.ح',
        name: { ar: 'عائشة الحوسني', en: 'Aisha Al Hosani' },
        rating: 5,
        text: {
          ar: 'براندات أوروبا ما ناسبت حر رأس الخيمة. أول مرة أحس فرق حقيقي على الآثار مع تركيز مكتوب على العبوة — مو وعود عامة.',
          en: 'European brands didn’t suit RAK heat. First time I felt a real difference on marks with a dose printed on the label — not vague promises.',
        },
        age: { ar: '٣٥ سنة', en: '35 yrs' },
        city: { ar: 'رأس الخيمة', en: 'Ras Al Khaimah' },
      },
    ],
  },
];

export const PRODUCT_MAP = Object.fromEntries(PRODUCTS.map((p) => [p.id, p]));

export function getProductBySlug(slug: string, locale: 'ar' | 'en'): Product | undefined {
  return PRODUCTS.find((p) => p.slug[locale] === slug);
}

export const UPSELL_PRICE_AED = 99;
export const OFFERS_BY_QUANTITY: Record<number, number> = { 1: 199, 2: 279, 3: 349 };
