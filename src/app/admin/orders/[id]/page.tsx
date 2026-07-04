'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { fetchOrder, getAdminToken, updateOrderStatus, type AdminOrder } from '@/lib/admin-api';
import { formatAED, cn } from '@/lib/utils';
import { ArrowLeft, Loader2, MapPin, Phone, User, Package } from 'lucide-react';

const STATUSES = ['new', 'confirmed', 'sent_to_sheet', 'upsell_added', 'shipped', 'delivered', 'cancelled', 'returned'];

export default function AdminOrderDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [order, setOrder] = useState<AdminOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!getAdminToken()) {
      router.replace('/admin/login');
      return;
    }
    setLoading(true);
    fetchOrder(params.id)
      .then(setOrder)
      .catch(() => router.replace('/admin/login'))
      .finally(() => setLoading(false));
  }, [params.id, router]);

  const onStatusChange = async (status: string) => {
    setSaving(true);
    try {
      const updated = await updateOrderStatus(params.id, status);
      setOrder(updated);
    } finally {
      setSaving(false);
    }
  };

  if (loading || !order) {
    return <div className="flex justify-center py-20"><Loader2 className="animate-spin" size={32} /></div>;
  }

  return (
    <div className="p-6 md:p-8 max-w-4xl">
      <Link href="/admin/orders" className="inline-flex items-center gap-2 text-sm text-taupe hover:text-mocha mb-6">
        <ArrowLeft size={16} /> Back to orders
      </Link>

      <div className="bg-ivory border border-sand rounded-3xl shadow-card overflow-hidden">
        <div className="bg-mocha text-ivory px-6 py-8">
          <p className="text-xs uppercase tracking-widest text-ivory/60 mb-1">Order</p>
          <h1 className="text-3xl font-black">{order.order_number}</h1>
          <p className="text-ivory/80 mt-2">{new Date(order.created_at).toLocaleString('en-AE')}</p>
        </div>

        <div className="p-6 grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <User className="text-taupe mt-0.5" size={18} />
              <div>
                <p className="text-xs text-taupe uppercase">Customer</p>
                <p className="font-bold text-lg">{order.customer_name}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="text-taupe mt-0.5" size={18} />
              <div>
                <p className="text-xs text-taupe uppercase">Phone</p>
                <p className="font-mono font-bold" dir="ltr">{order.phone_e164}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="text-taupe mt-0.5" size={18} />
              <div>
                <p className="text-xs text-taupe uppercase">Geo</p>
                <p className="font-medium">{order.country_code || '—'} {order.is_uae_ip ? '· UAE ✓' : ''}</p>
              </div>
            </div>
          </div>

          <div className="bg-pearl rounded-2xl p-5 border border-sand/60">
            <p className="text-xs text-taupe uppercase mb-3">Status</p>
            <select
              value={order.status}
              disabled={saving}
              onChange={(e) => onStatusChange(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-sand bg-white font-bold capitalize mb-4"
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>
              ))}
            </select>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-taupe">Subtotal</span>
              <span>{formatAED(order.subtotal_aed || order.total_aed)}</span>
            </div>
            {(order.upsell_total_aed || 0) > 0 && (
              <div className="flex justify-between text-sm mb-1">
                <span className="text-taupe">Upsell</span>
                <span>{formatAED(order.upsell_total_aed!)}</span>
              </div>
            )}
            <div className="flex justify-between font-black text-lg pt-2 border-t border-sand mt-2">
              <span>Total COD</span>
              <span className="text-success">{formatAED(order.total_aed)}</span>
            </div>
          </div>
        </div>

        <div className="px-6 pb-6">
          <div className="flex items-center gap-2 mb-3">
            <Package size={18} />
            <h2 className="font-bold">Items</h2>
          </div>
          <div className="space-y-3">
            {(order.items || []).map((item, idx) => (
              <div key={idx} className="flex justify-between items-center bg-pearl rounded-xl px-4 py-3 border border-sand/60">
                <div>
                  <p className="font-bold text-sm">{item.product_name_en}</p>
                  <p className="text-xs text-taupe">{item.quantity}x · {item.unit_context}</p>
                </div>
                <p className="font-black">{formatAED(item.bundle_price_aed)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="px-6 pb-6 grid md:grid-cols-2 gap-4 text-xs">
          <div className="bg-pearl rounded-xl p-4 border border-sand/60 space-y-1">
            <p className="font-bold text-sm mb-2">Attribution</p>
            <p>Source: {order.utm_source || '—'}</p>
            <p>Campaign: {order.utm_campaign || '—'}</p>
            <p>Medium: {order.utm_medium || '—'}</p>
          </div>
          <div className="bg-pearl rounded-xl p-4 border border-sand/60 space-y-1">
            <p className="font-bold text-sm mb-2">Technical</p>
            <p>Locale: {order.locale}</p>
            <p>IP: {order.client_ip || '—'}</p>
            <p className="truncate">Landing: {order.landing_page || '—'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
