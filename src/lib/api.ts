const SERVER_API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.skinouva.shop';

/** Browser uses same-origin proxy (/api/backend) to avoid CORS and DNS issues. */
export function getApiBaseUrl(): string {
  if (typeof window !== 'undefined') {
    return '/api/backend';
  }
  return SERVER_API_URL;
}

type ApiErrorPayload = {
  detail?: { code?: string; message?: string } | unknown[];
  code?: string;
  message?: string;
};

export function getApiErrorCode(err: unknown): string | undefined {
  const payload = (err as { detail?: ApiErrorPayload })?.detail;
  if (!payload || typeof payload !== 'object') return undefined;

  const nested = payload.detail;
  if (nested && typeof nested === 'object' && !Array.isArray(nested)) {
    return (nested as { code?: string }).code;
  }

  return payload.code;
}

export type OrderItemPayload = {
  product_id: string;
  quantity: number;
  price_aed: number;
};

export type CreateOrderPayload = {
  locale: string;
  customer: { name: string; phone: string };
  items: OrderItemPayload[];
  totals: { subtotal_aed: number; total_aed: number };
  tracking?: {
    purchase_event_id?: string;
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_content?: string;
    utm_term?: string;
    fbclid?: string;
    ttclid?: string;
    sc_click_id?: string;
    landing_page?: string;
    referrer?: string;
    fbp?: string;
    fbc?: string;
  };
};

export type CreateOrderResponse = {
  order_id: string;
  order_number: string;
  total_aed: number;
  upsell?: { product_id: string; price_aed: number };
};

export type AcceptUpsellPayload = {
  product_id: string;
  price_aed: number;
  event_id?: string;
};

export type AcceptUpsellResponse = {
  order_id: string;
  order_number: string;
  total_aed: number;
  upsell_accepted: boolean;
};

const REQUEST_TIMEOUT_MS = 30_000;

async function fetchWithTimeout(url: string, init: RequestInit): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

export async function createOrder(payload: CreateOrderPayload): Promise<CreateOrderResponse> {
  const res = await fetchWithTimeout(`${getApiBaseUrl()}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}));
    throw Object.assign(new Error('ORDER_FAILED'), { detail: errBody });
  }
  return res.json();
}

export async function acceptUpsell(
  orderId: string,
  payload: AcceptUpsellPayload
): Promise<AcceptUpsellResponse> {
  const res = await fetchWithTimeout(`${getApiBaseUrl()}/orders/${orderId}/upsell`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}));
    throw Object.assign(new Error('UPSELL_FAILED'), { detail: errBody });
  }
  return res.json();
}
