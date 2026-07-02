const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.skinouva.shop';

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

export async function createOrder(payload: CreateOrderPayload): Promise<CreateOrderResponse> {
  const res = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw Object.assign(new Error('ORDER_FAILED'), { detail: err });
  }
  return res.json();
}

export async function acceptUpsell(
  orderId: string,
  payload: AcceptUpsellPayload
): Promise<AcceptUpsellResponse> {
  const res = await fetch(`${API_URL}/orders/${orderId}/upsell`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw Object.assign(new Error('UPSELL_FAILED'), { detail: err });
  }
  return res.json();
}
