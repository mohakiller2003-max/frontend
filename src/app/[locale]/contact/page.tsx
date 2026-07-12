'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { CheckCircle2, Clock, Loader2, Mail } from 'lucide-react';
import { CONTACT_EMAIL, WHATSAPP_NUMBER } from '@/lib/site';

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function ContactPage() {
  const t = useTranslations('contact');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const waHref = `https://wa.me/${WHATSAPP_NUMBER}`;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    // Placeholder: In production, send to a backend contact endpoint.
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <div className="bg-gradient-to-br from-ivory via-pearl to-sand min-h-screen py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <h1 className="text-3xl font-bold text-mocha mb-2 text-center">{t('headline')}</h1>
        <p className="text-taupe text-center mb-8 max-w-lg mx-auto">{t('intro')}</p>

        {/* Contact channels — Nama-style cards */}
        <div className="grid sm:grid-cols-3 gap-3 md:gap-4 mb-10">
          <div className="bg-[#FAF8F4] border border-sand rounded-2xl px-4 py-5 text-center flex flex-col items-center">
            <span className="w-10 h-10 rounded-full bg-[#1F4D45]/10 flex items-center justify-center mb-3">
              <Clock size={18} className="text-mocha" />
            </span>
            <p className="font-bold text-mocha text-sm mb-1.5">{t('hoursTitle')}</p>
            <p className="text-xs text-taupe leading-relaxed">
              {t('hoursDays')}
              <br />
              {t('hoursTime')}
            </p>
          </div>

          <div className="bg-[#FAF8F4] border border-sand rounded-2xl px-4 py-5 text-center flex flex-col items-center">
            <span className="w-10 h-10 rounded-full bg-[#1F4D45]/10 flex items-center justify-center mb-3">
              <Mail size={18} className="text-mocha" />
            </span>
            <p className="font-bold text-mocha text-sm mb-1.5">{t('emailTitle')}</p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-xs text-mocha font-medium hover:text-rose transition-colors break-all"
              dir="ltr"
            >
              {CONTACT_EMAIL}
            </a>
          </div>

          <div className="bg-[#FAF8F4] border border-sand rounded-2xl px-4 py-5 text-center flex flex-col items-center">
            <span className="w-10 h-10 rounded-full bg-[#1F4D45]/10 flex items-center justify-center mb-3">
              <WhatsAppIcon className="w-[18px] h-[18px] text-mocha" />
            </span>
            <p className="font-bold text-mocha text-sm mb-3">{t('whatsappTitle')}</p>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white text-xs font-bold px-4 py-2.5 rounded-full hover:bg-[#1ebe57] transition-colors"
            >
              <WhatsAppIcon className="w-3.5 h-3.5" />
              {t('whatsappCta')}
            </a>
          </div>
        </div>

        <div className="max-w-lg mx-auto">
          {submitted ? (
            <div className="bg-ivory border border-success/30 rounded-card-lg p-8 text-center">
              <CheckCircle2 size={48} className="text-success mx-auto mb-3" />
              <p className="font-semibold text-mocha">{t('success')}</p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-ivory border border-sand rounded-card-lg p-6 md:p-8 space-y-5 shadow-soft"
            >
              <div>
                <label htmlFor="contact-name" className="block text-sm font-medium text-mocha mb-1.5">
                  {t('nameLabel')}
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-card border border-sand bg-white text-mocha placeholder:text-taupe/60 focus:outline-none focus:ring-2 focus:ring-rose"
                  placeholder={t('nameLabel')}
                />
              </div>
              <div>
                <label
                  htmlFor="contact-phone"
                  className="block text-sm font-medium text-mocha mb-1.5"
                >
                  {t('phoneLabelContact')}
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  dir="ltr"
                  className="w-full px-4 py-3 rounded-card border border-sand bg-white text-mocha text-right placeholder:text-taupe/60 focus:outline-none focus:ring-2 focus:ring-rose"
                  placeholder="05XXXXXXXX"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-sm font-medium text-mocha mb-1.5"
                >
                  {t('emailLabel')}
                </label>
                <input
                  id="contact-email"
                  type="email"
                  dir="ltr"
                  className="w-full px-4 py-3 rounded-card border border-sand bg-white text-mocha text-right placeholder:text-taupe/60 focus:outline-none focus:ring-2 focus:ring-rose"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-sm font-medium text-mocha mb-1.5"
                >
                  {t('messageLabel')}
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-card border border-sand bg-white text-mocha placeholder:text-taupe/60 focus:outline-none focus:ring-2 focus:ring-rose resize-none"
                  placeholder={t('messageLabel')}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-mocha text-ivory py-4 rounded-pill font-semibold hover:bg-mocha/90 disabled:opacity-60 transition-colors flex items-center justify-center gap-2"
              >
                {loading && <Loader2 size={16} className="animate-spin" />}
                {t('submit')}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
