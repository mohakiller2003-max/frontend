'use client';

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid', 'ttclid', 'sc_click_id'] as const;
type UtmKey = (typeof UTM_KEYS)[number];

type UtmData = Partial<Record<UtmKey, string>>;

const STORAGE_KEY = 'skn_utm';

export function captureUtmFromUrl(): void {
  if (typeof window === 'undefined') return;
  const params = new URLSearchParams(window.location.search);
  const data: UtmData = {};
  UTM_KEYS.forEach((key) => {
    const val = params.get(key);
    if (val) data[key] = val;
  });
  if (Object.keys(data).length > 0) {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {}
  }
}

export function getStoredUtm(): UtmData {
  if (typeof window === 'undefined') return {};
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function getFbCookies(): { fbp?: string; fbc?: string } {
  if (typeof document === 'undefined') return {};
  const cookies: Record<string, string> = {};
  document.cookie.split(';').forEach((c) => {
    const [k, v] = c.trim().split('=');
    if (k) cookies[k] = v || '';
  });
  return {
    fbp: cookies['_fbp'] || undefined,
    fbc: cookies['_fbc'] || undefined,
  };
}
