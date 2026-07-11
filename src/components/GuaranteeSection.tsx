import { Heart, Phone, Package, ShieldCheck } from 'lucide-react';

type Props = {
  badge: string;
  headline: string;
  body: string;
  steps: { title: string; desc: string; icon: 'phone' | 'package' | 'shield' }[];
};

const ICONS = {
  phone: Phone,
  package: Package,
  shield: ShieldCheck,
};

/** Nama-style 30-day guarantee — cream card + 3 action steps */
export function GuaranteeSection({ badge, headline, body, steps }: Props) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-pearl border border-sand rounded-[2rem] shadow-soft px-6 py-10 md:px-12 md:py-14 text-center">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-success bg-success/10 px-3.5 py-1.5 rounded-full mb-5">
          <Heart size={13} className="fill-success/30" />
          {badge}
        </span>

        <h2 className="text-2xl md:text-4xl font-extrabold text-ink mb-4 leading-tight max-w-2xl mx-auto">
          {headline}
        </h2>
        <p className="text-taupe text-sm md:text-base leading-relaxed max-w-2xl mx-auto mb-8 md:mb-10">
          {body}
        </p>

        <div className="grid sm:grid-cols-3 gap-3 md:gap-4 text-start">
          {steps.map(({ title, desc, icon }) => {
            const Icon = ICONS[icon];
            return (
              <div
                key={title}
                className="bg-white border border-sand rounded-2xl p-4 md:p-5 flex items-start gap-3 shadow-soft"
              >
                <div className="w-10 h-10 rounded-xl bg-ink text-ivory flex items-center justify-center shrink-0">
                  <Icon size={18} />
                </div>
                <div className="min-w-0">
                  <p className="font-extrabold text-ink text-sm mb-0.5">{title}</p>
                  <p className="text-[11px] md:text-xs text-taupe leading-snug">{desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
