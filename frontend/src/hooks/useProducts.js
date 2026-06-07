import { useEffect, useState } from 'react';
import { fetchProducts } from '../services/productService';

export const useProducts = (category) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    fetchProducts(category)
      .then(setProducts)
      .catch(() => setError('Failed to load products.'))
      .finally(() => setLoading(false));
  }, [category]);

  return { products, loading, error };
};
