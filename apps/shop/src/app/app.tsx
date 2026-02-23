import { createElement, lazy, Suspense } from 'react';
import { Route, Routes, Navigate, useNavigate, useParams } from 'react-router-dom';
import { LoadingSpinner } from '@org/shop-shared-ui';
import './app.css';

// Lazy load feature components
const ProductList = lazy(() => import('@org/shop-feature-products').then(m => ({ default: m.ProductList })));
const ProductDetail = lazy(() => import('@org/shop-feature-product-detail').then(m => ({ default: m.ProductDetail })));

export function App() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">Nx Shop Demo</h1>
        </div>
      </header>

      <main className="app-main">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Navigate to="/products" replace />} />
            <Route path="/products" element={<ProductList navigate={(id) => navigate(`/products/${id}`)} />} />
            <Route path="/products/:id" element={createElement(() => {
              if (!id) return <Navigate to="/products" replace />

              return <ProductDetail id={id} navigate={(route) => navigate(route)} />
            })} />
            <Route path="*" element={<Navigate to="/products" replace />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default App;
