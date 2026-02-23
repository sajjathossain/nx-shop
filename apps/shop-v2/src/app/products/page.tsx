'use client'

import { ProductList } from '@org/shop-feature-products';
import { useRouter } from 'next/navigation';

export default function ProductsPage() {
  const router = useRouter();
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.tailwind file.
   */
  return (
    <ProductList navigate={(id) => router.push(`/products/${id}`)} />
  );
}
