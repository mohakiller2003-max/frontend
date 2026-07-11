import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'سكينوفا | Skinouva',
  description:
    'سيرومات مختارة لمظهر بشرة أصفى وأكثر توازنًا | Selected serums for clearer-looking, more even skin',
  icons: {
    icon: [{ url: '/icon-cropped.png', type: 'image/png' }],
    apple: [{ url: '/apple-icon-cropped.png', type: 'image/png' }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&family=Inter:wght@400;500;600;700;800&display=swap"
        />
        <link rel="icon" href="/icon-cropped.png" type="image/png" sizes="512x512" />
        <link rel="shortcut icon" href="/icon-cropped.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-icon-cropped.png" />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
