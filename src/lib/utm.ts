'use client';

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid', 'ttclid', 'sc_click_id'] as const;
type UtmKey = (typeof UTM_KEYS)[number];

type UtmData = Partial<Record<UtmKey, string>>;

const STORAGE_KEY = 'skn_utm';

/** Snapchat ads append ?ScCid= to landing URLs — map it to sc_click_id for backend CAPI. */
function readSnapClickId(params: URLSearchParams): string | undefined {
  return params.get('ScCid') || params.get('sc_cid') || params.get('sc_click_id') || undefined;
}

export function captureUtmFromUrl(): void {
  if (typeof window === 'undefined') return;
  const params = new URLSearchParams(window.location.search);
  const data: UtmData = {};
  UTM_KEYS.forEach((key) => {
    const val = params.get(key);
    if (val) data[key] = val;
  });

  const snapClickId = readSnapClickId(params);
  if (snapClickId) data.sc_click_id = snapClickId;

  if (Object.keys(data).length > 0) {
    try {
      const existing = getStoredUtm();
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ ...existing, ...data }));
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
