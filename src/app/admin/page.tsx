'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchMetrics, getAdminToken, type AdminMetrics } from '@/lib/admin-api';
import { formatAED } from '@/lib/utils';
import { Loader2, ShoppingBag, MousePointerClick, TrendingUp, Users } from 'lucide-react';

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

function daysAgoIso(days: number) {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().slice(0, 10);
}

function MetricCard({ label, value, sub, icon: Icon }: { label: string; value: string; sub?: string; icon: React.ElementType }) {
  return (
    <div className="bg-ivory border border-sand rounded-2xl p-5 shadow-soft">
      <div className="flex items-start justify-between mb-3">
        <p className="text-sm font-semibold text-taupe">{label}</p>
        <div className="p-2 rounded-xl bg-pearl">
          <Icon size={18} className="text-mocha" />
        </div>
      </div>
      <p className="text-3xl font-black text-mocha">{value}</p>
      {sub && <p className="text-xs text-taupe mt-1">{sub}</p>}
    </div>
  );
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [dateFrom, setDateFrom] = useState(daysAgoIso(6));
  const [dateTo, setDateTo] = useState(todayIso());
  const [metrics, setMetrics] = useState<AdminMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!getAdminToken()) {
      router.replace('/admin/login');
      return;
    }
    setLoading(true);
    fetchMetrics(dateFrom, dateTo, true)
      .then(setMetrics)
      .catch(() => router.replace('/admin/login'))
      .finally(() => setLoading(false));
  }, [dateFrom, dateTo, router]);

  const statusRows = useMemo(() => {
    if (!metrics) return [];
    return Object.entries(metrics.orders_by_status).sort((a, b) => b[1] - a[1]);
  }, [metrics]);

  return (
    <div className="p-6 md:p-8 max-w-7xl">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-mocha">Dashboard</h1>
          <p className="text-sm text-taupe mt-1">UAE traffic only · MaxMind GeoIP</p>
        </div>
        <div className="flex flex-wrap gap-3 items-center">
          <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="px-3 py-2 rounded-xl border border-sand bg-white text-sm" />
          <span className="text-taupe">→</span>
          <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="px-3 py-2 rounded-xl border border-sand bg-white text-sm" />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="animate-spin text-mocha" size={32} /></div>
      ) : metrics ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
            <MetricCard label="Orders" value={String(metrics.orders)} sub={`Revenue ${formatAED(metrics.revenue_aed)}`} icon={ShoppingBag} />
            <MetricCard label="Conversion" value={`${metrics.conversion_rate}%`} sub={`${metrics.orders} orders / ${metrics.unique_sessions} sessions`} icon={TrendingUp} />
            <MetricCard label="Page views" value={String(metrics.page_views)} sub={`${metrics.product_views} product views`} icon={MousePointerClick} />
            <MetricCard label="Unique sessions" value={String(metrics.unique_sessions)} sub={`AOV ${formatAED(metrics.aov_aed)}`} icon={Users} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-ivory border border-sand rounded-2xl p-6 shadow-soft">
              <h2 className="font-bold text-lg mb-4">Funnel (UAE)</h2>
              <div className="space-y-3 text-sm">
                {[
                  ['Page views', metrics.page_views],
                  ['Product views', metrics.product_views],
                  ['Add to cart', metrics.add_to_cart],
                  ['Initiate checkout', metrics.initiate_checkout],
                  ['Orders', metrics.orders],
                ].map(([label, val]) => (
                  <div key={label as string} className="flex justify-between border-b border-sand/60 pb-2">
                    <span className="text-taupe">{label}</span>
                    <span className="font-bold">{val as number}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-ivory border border-sand rounded-2xl p-6 shadow-soft">
              <h2 className="font-bold text-lg mb-4">Orders by status</h2>
              <div className="space-y-2">
                {statusRows.length === 0 ? (
                  <p className="text-sm text-taupe">No orders in range</p>
                ) : statusRows.map(([status, count]) => (
                  <div key={status} className="flex justify-between text-sm">
                    <span className="capitalize">{status.replace(/_/g, ' ')}</span>
                    <span className="font-bold">{count}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-taupe mt-4">Upsell accepted: {metrics.upsell_orders}</p>
            </div>
          </div>

          <div className="bg-ivory border border-sand rounded-2xl p-6 shadow-soft">
            <h2 className="font-bold text-lg mb-4">Top UTM sources</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {metrics.top_utm_sources.length === 0 ? (
                <p className="text-sm text-taupe">No UTM data</p>
              ) : metrics.top_utm_sources.map((row) => (
                <div key={row.source} className="bg-pearl rounded-xl px-4 py-3 flex justify-between">
                  <span className="text-sm font-medium truncate">{row.source}</span>
                  <span className="font-black">{row.orders}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
