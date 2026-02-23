'use client'
import { ProductDetail } from '@org/shop-feature-product-detail';
import { useParams, useRouter } from 'next/navigation';

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.tailwind file.
   */
  return (
    <ProductDetail id={params.id} navigate={(route) => router.push(route)} />
  );
}
