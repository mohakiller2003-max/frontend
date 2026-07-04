import { getApiBaseUrl } from '@/lib/api';

const TOKEN_KEY = 'skn_admin_token';

export function getAdminToken(): string | null {
  if (typeof window === 'undefined') return null;
  return sessionStorage.getItem(TOKEN_KEY);
}

export function setAdminToken(token: string) {
  sessionStorage.setItem(TOKEN_KEY, token);
}

export function clearAdminToken() {
  sessionStorage.removeItem(TOKEN_KEY);
}

async function adminFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = getAdminToken();
  const res = await fetch(`${getApiBaseUrl()}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init.headers || {}),
    },
  });
  if (res.status === 401) {
    clearAdminToken();
    if (typeof window !== 'undefined') window.location.href = '/admin/login';
    throw new Error('UNAUTHORIZED');
  }
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body?.detail?.message || body?.detail || 'Request failed');
  }
  return res.json();
}

export type AdminMetrics = {
  date_from: string;
  date_to: string;
  uae_only: boolean;
  page_views: number;
  product_views: number;
  add_to_cart: number;
  initiate_checkout: number;
  unique_sessions: number;
  orders: number;
  revenue_aed: number;
  upsell_orders: number;
  conversion_rate: number;
  aov_aed: number;
  orders_by_status: Record<string, number>;
  top_utm_sources: { source: string; orders: number }[];
};

export type AdminOrderItem = {
  product_id: string;
  product_name_ar: string;
  product_name_en: string;
  quantity: number;
  bundle_price_aed: number;
  unit_context: string;
};

export type AdminOrder = {
  id: string;
  order_number: string;
  customer_name: string;
  phone_e164: string;
  phone_raw?: string;
  status: string;
  total_aed: number;
  subtotal_aed?: number;
  upsell_total_aed?: number;
  payment_method?: string;
  locale: string;
  country_code?: string | null;
  is_uae_ip: boolean;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  utm_content?: string | null;
  utm_term?: string | null;
  fbclid?: string | null;
  client_ip?: string | null;
  landing_page?: string | null;
  referrer?: string | null;
  created_at: string;
  updated_at?: string;
  items?: AdminOrderItem[];
  tracking_events?: { event_name: string; platform: string; status: string; created_at: string }[];
};

export async function adminLogin(username: string, password: string) {
  const res = await fetch(`${getApiBaseUrl()}/admin/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) throw new Error('Invalid credentials');
  return res.json() as Promise<{ token: string; expires_in: number }>;
}

export async function fetchMetrics(dateFrom: string, dateTo: string, uaeOnly = true) {
  const q = new URLSearchParams({ date_from: dateFrom, date_to: dateTo, uae_only: String(uaeOnly) });
  return adminFetch<AdminMetrics>(`/admin/metrics?${q}`);
}

export async function fetchOrders(params: Record<string, string>) {
  const q = new URLSearchParams(params);
  return adminFetch<{ total: number; page: number; page_size: number; items: AdminOrder[] }>(`/admin/orders?${q}`);
}

export async function fetchOrder(id: string) {
  return adminFetch<AdminOrder>(`/admin/orders/${id}`);
}

export async function updateOrderStatus(id: string, status: string) {
  return adminFetch<AdminOrder>(`/admin/orders/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
}
