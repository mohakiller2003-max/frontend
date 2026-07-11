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

/** Nama-style 30-day guarantee — cream card + forest green accents */
export function GuaranteeSection({ badge, headline, body, steps }: Props) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-[#F5F1E6] border border-[#E8E3DC] rounded-[2rem] md:rounded-[2.5rem] shadow-soft px-6 py-10 md:px-12 md:py-14 text-center">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#134E3A] bg-[#134E3A]/12 px-3.5 py-1.5 rounded-full mb-5">
          <Heart size={13} className="text-gold fill-gold/40" />
          {badge}
        </span>

        <h2 className="text-2xl md:text-4xl font-extrabold text-[#134E3A] mb-4 leading-tight max-w-2xl mx-auto">
          {headline}
        </h2>
        <p className="text-[#5A6B5C] text-sm md:text-base leading-relaxed max-w-2xl mx-auto mb-8 md:mb-10">
          {body}
        </p>

        <div className="grid sm:grid-cols-3 gap-3 md:gap-4 text-start">
          {steps.map(({ title, desc, icon }) => {
            const Icon = ICONS[icon];
            return (
              <div
                key={title}
                className="bg-white border border-[#E8E3DC]/80 rounded-2xl p-4 md:p-5 flex items-center gap-3 shadow-soft"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-extrabold text-[#134E3A] text-sm mb-0.5">{title}</p>
                  <p className="text-[11px] md:text-xs text-[#5A6B5C] leading-snug">{desc}</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#134E3A] text-gold flex items-center justify-center shrink-0">
                  <Icon size={18} strokeWidth={2} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
