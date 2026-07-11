import type { Product } from '@/data/products';

export type ProductTheme = {
  id: 'txa' | 'azelaic';
  accent: string;
  accentLight: string;
  accentMuted: string;
  heroGradient: string;
  pillBg: string;
  ring: string;
  badge: string;
};

const TXA: ProductTheme = {
  id: 'txa',
  accent: 'text-blush-accent',
  accentLight: 'bg-blush-light',
  accentMuted: 'bg-blush-muted',
  heroGradient: 'from-blush-light via-white to-pearl',
  pillBg: 'bg-blush-muted border-blush-accent/20 text-blush-accent',
  ring: 'ring-blush-accent/40',
  badge: 'bg-blush-accent',
};

const AZELAIC: ProductTheme = {
  id: 'azelaic',
  accent: 'text-mint-accent',
  accentLight: 'bg-mint-light',
  accentMuted: 'bg-mint-muted',
  heroGradient: 'from-mint-light via-white to-pearl',
  pillBg: 'bg-mint-muted border-mint-accent/20 text-mint-accent',
  ring: 'ring-mint-accent/40',
  badge: 'bg-mint-accent',
};

export function getProductTheme(product: Product): ProductTheme {
  return product.id === 'tranexamic-niacinamide-serum' ? TXA : AZELAIC;
}
