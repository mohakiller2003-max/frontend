import { normalizeUAEPhone } from '@/lib/utils';

/** Plain-text phone formats for browser pixels (SDKs hash on their side). */
export type PixelPhoneFormats = {
  /** Meta advanced matching: digits only with country code, e.g. 9715XXXXXXXX */
  meta: string;
  /** Snap pixel init: digits only with country code */
  snap: string;
  /** TikTok identify: E.164 with + */
  tiktok: string;
};

export function phoneFormatsForPixels(raw: string): PixelPhoneFormats | null {
  const e164 = normalizeUAEPhone(raw);
  if (!e164) return null;
  const digits = e164.replace(/\D/g, '');
  return {
    meta: digits,
    snap: digits,
    tiktok: e164,
  };
}

export function firstNameForPixels(fullName: string): string | undefined {
  const first = fullName.trim().split(/\s+/)[0]?.toLowerCase();
  return first || undefined;
}
