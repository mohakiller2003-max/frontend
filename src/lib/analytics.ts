const SESSION_KEY = 'skn_session_id';

export function getSessionId(): string {
  if (typeof window === 'undefined') return 'server';
  let id = localStorage.getItem(SESSION_KEY);
  if (!id) {
    id = `sess_${Date.now()}_${crypto.randomUUID().slice(0, 8)}`;
    localStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

export type TrackPayload = {
  event_type: string;
  page_path?: string;
  product_id?: string;
  locale?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  referrer?: string;
};

export async function trackEvent(payload: TrackPayload): Promise<void> {
  if (typeof window === 'undefined') return;
  try {
    const utmRaw = sessionStorage.getItem('skn_utm');
    const utm = utmRaw ? JSON.parse(utmRaw) : {};
    await fetch('/api/backend/analytics/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        session_id: getSessionId(),
        locale: document.documentElement.lang || 'ar',
        utm_source: utm.utm_source,
        utm_medium: utm.utm_medium,
        utm_campaign: utm.utm_campaign,
        referrer: document.referrer || undefined,
        ...payload,
      }),
      keepalive: true,
    });
  } catch {
    // analytics must never break storefront
  }
}
