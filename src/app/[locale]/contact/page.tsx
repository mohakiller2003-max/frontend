'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { CheckCircle2, Loader2, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CONTACT_EMAIL } from '@/lib/site';

export default function ContactPage() {
  const t = useTranslations('contact');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

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
      <div className="max-w-lg mx-auto px-4 md:px-6">
        <h1 className="text-3xl font-bold text-mocha mb-2 text-center">{t('headline')}</h1>
        <p className="text-taupe text-center mb-6">{t('intro')}</p>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="flex items-center justify-center gap-2 text-mocha font-medium mb-8 hover:text-rose transition-colors"
          dir="ltr"
        >
          <Mail size={18} className="shrink-0" />
          {CONTACT_EMAIL}
        </a>

        {submitted ? (
          <div className="bg-ivory border border-success/30 rounded-card-lg p-8 text-center">
            <CheckCircle2 size={48} className="text-success mx-auto mb-3" />
            <p className="font-semibold text-mocha">{t('success')}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-ivory border border-sand rounded-card-lg p-6 md:p-8 space-y-5 shadow-soft">
            <div>
              <label htmlFor="contact-name" className="block text-sm font-medium text-mocha mb-1.5">{t('nameLabel')}</label>
              <input
                id="contact-name"
                type="text"
                required
                className="w-full px-4 py-3 rounded-card border border-sand bg-white text-mocha placeholder:text-taupe/60 focus:outline-none focus:ring-2 focus:ring-rose"
                placeholder={t('nameLabel')}
              />
            </div>
            <div>
              <label htmlFor="contact-phone" className="block text-sm font-medium text-mocha mb-1.5">{t('phoneLabelContact')}</label>
              <input
                id="contact-phone"
                type="tel"
                dir="ltr"
                className="w-full px-4 py-3 rounded-card border border-sand bg-white text-mocha placeholder:text-taupe/60 focus:outline-none focus:ring-2 focus:ring-rose"
                placeholder="05XXXXXXXX"
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="block text-sm font-medium text-mocha mb-1.5">{t('emailLabel')}</label>
              <input
                id="contact-email"
                type="email"
                dir="ltr"
                className="w-full px-4 py-3 rounded-card border border-sand bg-white text-mocha placeholder:text-taupe/60 focus:outline-none focus:ring-2 focus:ring-rose"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="contact-message" className="block text-sm font-medium text-mocha mb-1.5">{t('messageLabel')}</label>
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
  );
}
