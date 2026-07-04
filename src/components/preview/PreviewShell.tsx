'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function PreviewBanner() {
  return (
    <div className="bg-amber-500 text-mocha text-center py-2 px-4 text-sm font-bold z-50 relative">
      نسخة معاينة — الموقع الحي لا يزال على{' '}
      <Link href="/ar" className="underline underline-offset-2">
        skinouva.shop/ar
      </Link>
      . راجعي هنا ثم قرّري: live أو لا.
    </div>
  );
}

export function PreviewHeader() {
  const pathname = usePathname();
  const isHome = pathname === '/preview';

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-sand">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/preview" className="font-black text-xl text-mocha tracking-tight">
          Skinouva
        </Link>
        <nav className="flex items-center gap-4 text-sm font-bold">
          <Link
            href="/preview"
            className={isHome ? 'text-rose' : 'text-taupe hover:text-mocha'}
          >
            الرئيسية
          </Link>
          <Link href="/preview/products/serum-tranexamic-niacinamide" className="text-taupe hover:text-mocha">
            TXA
          </Link>
          <Link href="/preview/products/serum-azelaic-acne-marks" className="text-taupe hover:text-mocha">
            Azelaic
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function PreviewFooter() {
  return (
    <footer className="bg-mocha text-ivory py-12 mt-16">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="font-black text-2xl mb-2">Skinouva</p>
        <p className="text-ivory/70 text-sm mb-6">دفع عند الاستلام · كل الإمارات · ضمان 30 يوم</p>
        <p className="text-xs text-ivory/50">نسخة معاينة — لم تُنشر بعد على الصفحة الرئيسية</p>
      </div>
    </footer>
  );
}
