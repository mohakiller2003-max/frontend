import { notFound } from 'next/navigation';
import { PRODUCTS } from '@/data/products';
import { getPreviewProduct } from '@/data/preview-content';
import { PreviewProductPage } from '@/components/preview/PreviewProductPage';

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug.ar }));
}

export default function PreviewProductRoute({ params: { slug } }: Props) {
  const product = getPreviewProduct(slug);
  if (!product) notFound();
  return <PreviewProductPage product={product} />;
}
