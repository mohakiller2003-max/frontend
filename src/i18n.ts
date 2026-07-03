import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';
import arMessages from './messages/ar.json';
import enMessages from './messages/en.json';

const messagesByLocale = {
  ar: arMessages,
  en: enMessages,
} as const;

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = routing.locales.includes(requested as (typeof routing.locales)[number])
    ? requested!
    : routing.defaultLocale;

  return {
    locale,
    messages: messagesByLocale[locale as keyof typeof messagesByLocale],
  };
});
