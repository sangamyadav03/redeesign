import React from 'react';
import ProductCard from './ProductCard';
import LoadingSpinner from './LoadingSpinner';
import { useProducts } from '../hooks/useProducts';

const CategoryProducts = ({ category, title, subtitle }) => {
  const { products, loading, error } = useProducts(category);

  if (loading) return <LoadingSpinner label={`Loading ${category}...`} />;

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 border-b border-white/10 pb-8">
          <p className="text-xs uppercase tracking-[0.4em] text-white/50 mb-2">Collection</p>
          <h1 className="text-4xl md:text-6xl font-semibold">{title}</h1>
          {subtitle && <p className="mt-3 text-white/60 max-w-2xl">{subtitle}</p>}
        </header>

        {error && <p className="text-red-400 text-center py-12">{error}</p>}

        {!error && products.length === 0 && (
          <p className="text-white/50 text-center py-12">No products available in this category.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryProducts;
