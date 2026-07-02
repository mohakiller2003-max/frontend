const fs = require('fs');

const arPath = './src/messages/ar.json';
const enPath = './src/messages/en.json';

const ar = JSON.parse(fs.readFileSync(arPath, 'utf8'));
const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));

// Hero Updates
ar.homeCro.hero.badge = "النتيجة مثبتة ومضمونة ١٠٠٪";
ar.homeCro.hero.headline = "بشرة زجاجية خالية من التصبغات في ١٤ يوماً";
ar.homeCro.hero.subheadline = "سيرومات صيدلانية صُممت لتفكيك أعمق التصبغات وآثار الحبوب. النتيجة واضحة ومضمونة، أو نعيد لك أموالك بالكامل بدون نقاش.";
ar.homeCro.hero.ctaPrimary = "اطلبي الآن بالدفع عند الاستلام";

en.homeCro.hero.badge = "100% Proven & Guaranteed Results";
en.homeCro.hero.headline = "Flawless Glass Skin in 14 Days";
en.homeCro.hero.subheadline = "Pharmaceutical-grade serums designed to dismantle the deepest pigmentation and acne marks. Visible results guaranteed, or your money back no questions asked.";
en.homeCro.hero.ctaPrimary = "Order Now - Pay on Delivery";

// COD Experience / VIP
ar.homeCro.codExperience.headline = "اطلبي اليوم، استلمي غداً. بدون بطاقة.";
ar.homeCro.codExperience.subheadline = "لا تدفعي درهماً واحداً حتى تستلمي منتجك بيدك وتتأكدي منه.";
ar.homeCro.codExperience.steps[0].title = "اطلبي بثوانٍ بدون بطاقة";
ar.homeCro.codExperience.steps[0].desc = "أدخلي رقمك فقط، ولا تدفعي شيئاً الآن. نحن نتحمل كامل المخاطرة.";
ar.homeCro.codExperience.steps[1].title = "تأكيد شخصي سريع";
ar.homeCro.codExperience.steps[1].desc = "خبيرة من فريقنا في الإمارات ستتصل بك فوراً لتأكيد العنوان للإسراع بالشحن.";
ar.homeCro.codExperience.steps[2].title = "توصيل VIP سريع وادفعي عند الباب";
ar.homeCro.codExperience.steps[2].desc = "سيصلك المندوب بسيارة مبردة خلال ٢٤ ساعة. افحصي طلبك، ثم ادفعي كاش أو شبكة براحة تامة.";

en.homeCro.codExperience.headline = "Order Today, Receive Tomorrow. No Card.";
en.homeCro.codExperience.subheadline = "Do not pay a single dirham until you hold the product in your hands.";
en.homeCro.codExperience.steps[0].title = "Order in seconds, zero payment";
en.homeCro.codExperience.steps[0].desc = "Just enter your number. No card needed. We take 100% of the risk.";
en.homeCro.codExperience.steps[1].title = "Fast Personal Confirmation";
en.homeCro.codExperience.steps[1].desc = "Our UAE concierge will call you immediately to confirm your address for priority dispatch.";
en.homeCro.codExperience.steps[2].title = "VIP Express Delivery & Pay at Door";
en.homeCro.codExperience.steps[2].desc = "Our courier arrives in a climate-controlled vehicle within 24H. Inspect your order, then pay cash or card comfortably.";

// Guarantee Updates - Make it extremely aggressive
ar.guarantee.headline = "وعد سكينوفا الصارم: النتيجة المضمونة أو استرداد كامل أموالك";
ar.guarantee.body = "نحن لا نلعب بالكلمات. استخدمي المنتج لمدة ٣٠ يوماً. إذا لم تلاحظي تفتيحاً واضحاً للتصبغات، وتوحيداً للون بشرتك، وتغييراً تلاحظه عائلتك وصديقاتك... أرسلي لنا رسالة، وسنعيد لك كل درهم دفعتيه. حتى لو كانت العلبة فارغة تماماً. لا توجد أي مخاطرة عليكِ إطلاقاً.";
ar.guarantee.cta = "اطلبي الآن براحة بال تامة";

en.guarantee.headline = "The Iron-Clad Skinouva Promise: Visible Results or 100% Refund";
en.guarantee.body = "We don't play with words. Use the serum for 30 days. If you don't see a visible reduction in pigmentation, an even skin tone, and a change that your friends and family compliment... message us. We will refund every single dirham. Even if the bottle is completely empty. You carry zero risk.";
en.guarantee.cta = "Order Now with Absolute Peace of Mind";

// Checkout Updates - Maximum conversion push
ar.checkout.title = "تأكيد الطلب الفوري";
ar.checkout.urgency = "⚠️ خصم مؤقت وشحن VIP مجاني - العرض ينتهي قريباً";
ar.checkout.submitCta = "أكدي طلبي الآن - الدفع عند الاستلام";
ar.checkout.benefit1 = "صفر مخاطرة الآن";
ar.checkout.benefit2 = "شحن سريع ٢٤س";
ar.checkout.benefit3 = "استرجاع مضمون";

en.checkout.title = "Instant Order Confirmation";
en.checkout.urgency = "⚠️ Temporary Discount & Free VIP Shipping - Ends Soon";
en.checkout.submitCta = "Confirm My Order Now - Pay on Delivery";
en.checkout.benefit1 = "Zero Risk Today";
en.checkout.benefit2 = "Fast 24H Shipping";
en.checkout.benefit3 = "Guaranteed Refund";

// Cart Updates
ar.cart.freeDelivery = "🔥 شحن VIP مجاني وسريع جداً داخل الإمارات";
ar.cart.checkout = "تأكيد الطلب (الدفع عند الباب)";
en.cart.freeDelivery = "🔥 Fast VIP Free Shipping across UAE";
en.cart.checkout = "Confirm Order (Pay at Door)";

// Trust updates
ar.trust.delivery = "شحن VIP مبرد خلال ٢٤-٤٨ ساعة";
ar.trust.secure = "نتيجة من أول علبة أو استرداد كامل";
en.trust.delivery = "VIP Climate-Controlled Shipping (24-48H)";
en.trust.secure = "Results from Box 1 or Full Refund";

fs.writeFileSync(arPath, JSON.stringify(ar, null, 2));
fs.writeFileSync(enPath, JSON.stringify(en, null, 2));

console.log("Aggressive CRO promises injected.");
