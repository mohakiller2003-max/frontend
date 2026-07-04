'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { fetchOrders, getAdminToken, type AdminOrder } from '@/lib/admin-api';
import { formatAED } from '@/lib/utils';
import { Loader2, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

const STATUS_COLORS: Record<string, string> = {
  new: 'bg-blue-100 text-blue-800',
  sent_to_sheet: 'bg-emerald-100 text-emerald-800',
  confirmed: 'bg-green-100 text-green-800',
  upsell_added: 'bg-purple-100 text-purple-800',
  failed_sheet: 'bg-red-100 text-red-800',
  cancelled: 'bg-gray-100 text-gray-700',
};

export default function AdminOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!getAdminToken()) {
      router.replace('/admin/login');
      return;
    }
    setLoading(true);
    fetchOrders({
      page: String(page),
      page_size: '20',
      uae_only: 'true',
      ...(search ? { search } : {}),
    })
      .then((res) => {
        setOrders(res.items);
        setTotal(res.total);
      })
      .catch(() => router.replace('/admin/login'))
      .finally(() => setLoading(false));
  }, [page, search, router]);

  return (
    <div className="p-6 md:p-8 max-w-7xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-black">Orders</h1>
          <p className="text-sm text-taupe">{total} UAE orders</p>
        </div>
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-taupe" size={16} />
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search name, phone, order #"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-sand bg-white text-sm"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="animate-spin" size={32} /></div>
      ) : (
        <div className="bg-ivory border border-sand rounded-2xl overflow-hidden shadow-soft">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-pearl border-b border-sand">
                <tr>
                  <th className="text-left px-4 py-3 font-bold">Order</th>
                  <th className="text-left px-4 py-3 font-bold">Customer</th>
                  <th className="text-left px-4 py-3 font-bold">Phone</th>
                  <th className="text-left px-4 py-3 font-bold">Total</th>
                  <th className="text-left px-4 py-3 font-bold">Status</th>
                  <th className="text-left px-4 py-3 font-bold">Source</th>
                  <th className="text-left px-4 py-3 font-bold">Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id} className="border-b border-sand/60 hover:bg-pearl/50">
                    <td className="px-4 py-3">
                      <Link href={`/admin/orders/${o.id}`} className="font-bold text-mocha hover:underline">
                        {o.order_number}
                      </Link>
                    </td>
                    <td className="px-4 py-3">{o.customer_name}</td>
                    <td className="px-4 py-3 font-mono text-xs" dir="ltr">{o.phone_e164}</td>
                    <td className="px-4 py-3 font-bold">{formatAED(o.total_aed)}</td>
                    <td className="px-4 py-3">
                      <span className={cn('px-2 py-1 rounded-full text-xs font-bold capitalize', STATUS_COLORS[o.status] || 'bg-sand text-mocha')}>
                        {o.status.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-taupe">{o.utm_source || '—'}</td>
                    <td className="px-4 py-3 text-taupe whitespace-nowrap">
                      {new Date(o.created_at).toLocaleString('en-AE')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {orders.length === 0 && <p className="text-center py-12 text-taupe">No orders found</p>}
          <div className="flex justify-between items-center px-4 py-3 border-t border-sand bg-pearl/50">
            <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)} className="px-3 py-1 rounded-lg border border-sand disabled:opacity-40">Prev</button>
            <span className="text-xs text-taupe">Page {page}</span>
            <button disabled={orders.length < 20} onClick={() => setPage((p) => p + 1)} className="px-3 py-1 rounded-lg border border-sand disabled:opacity-40">Next</button>
          </div>
        </div>
      )}
    </div>
  );
}
