'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { BarChart3, Package, LogOut } from 'lucide-react';
import { clearAdminToken } from '@/lib/admin-api';
import { cn } from '@/lib/utils';
import '../globals.css';

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: BarChart3 },
  { href: '/admin/orders', label: 'Orders', icon: Package },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLogin = pathname === '/admin/login';

  if (isLogin) {
    return (
      <html lang="en" dir="ltr">
        <head>
          <link rel="icon" href="/icon.png" type="image/png" />
        </head>
        <body className="bg-pearl text-mocha min-h-screen">{children}</body>
      </html>
    );
  }

  const logout = () => {
    clearAdminToken();
    router.push('/admin/login');
  };

  return (
    <html lang="en" dir="ltr">
      <head>
        <link rel="icon" href="/icon.png" type="image/png" />
      </head>
      <body className="bg-pearl text-mocha min-h-screen">
        <div className="flex min-h-screen">
          <aside className="w-64 bg-mocha text-ivory flex flex-col shrink-0">
            <div className="p-6 border-b border-white/10">
              <p className="text-xs uppercase tracking-widest text-ivory/60">Skinouva</p>
              <h1 className="text-xl font-black">Admin</h1>
            </div>
            <nav className="flex-1 p-4 space-y-1">
              {NAV.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors',
                    pathname === href ? 'bg-ivory text-mocha' : 'text-ivory/80 hover:bg-white/10'
                  )}
                >
                  <Icon size={18} />
                  {label}
                </Link>
              ))}
            </nav>
            <button
              onClick={logout}
              className="m-4 flex items-center gap-2 px-4 py-3 rounded-xl text-sm text-ivory/70 hover:bg-white/10"
            >
              <LogOut size={16} />
              Log out
            </button>
          </aside>
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
