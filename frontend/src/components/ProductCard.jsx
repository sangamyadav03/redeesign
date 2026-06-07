import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { formatCurrency } from '../utils/formatCurrency';
import { useCart } from '../hooks/useCart';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [adding, setAdding] = useState(false);

  const handleAddToCart = async () => {
    setAdding(true);
    try {
      await addToCart(product._id, 1);
    } finally {
      setAdding(false);
    }
  };

  const handleBuyNow = () => {
    navigate('/home/buy', {
      state: {
        product: {
          _id: product._id,
          title: product.title,
          price: product.price,
          image: product.image,
          quantity: 1,
        },
      },
    });
  };

  return (
    <article className="group rounded-2xl border border-white/10 bg-white/5 overflow-hidden transition-all duration-300 hover:border-white/30 hover:-translate-y-1">
      <div className="relative overflow-hidden aspect-[4/5]">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <div className="p-5 space-y-3">
        <p className="text-xs uppercase tracking-[0.3em] text-white/50">{product.category}</p>
        <h3 className="text-xl font-semibold text-white">{product.title}</h3>
        <p className="text-sm text-white/60 line-clamp-2">{product.description}</p>
        <p className="text-2xl font-bold text-white">{formatCurrency(product.price)}</p>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={handleBuyNow}
            className="flex-1 py-2.5 rounded-lg bg-white text-black text-sm font-semibold hover:bg-gray-200 transition-colors"
          >
            Buy Now
          </button>
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={adding}
            className="flex-1 py-2.5 rounded-lg border border-white/30 text-white text-sm font-semibold hover:bg-white hover:text-black transition-colors disabled:opacity-50"
          >
            {adding ? 'Adding...' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
