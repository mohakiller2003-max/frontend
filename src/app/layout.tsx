import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'سكينوفا | Skinouva',
  description: 'سيرومات مختارة لمظهر بشرة أصفى وأكثر توازنًا | Selected serums for clearer-looking, more even skin',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
