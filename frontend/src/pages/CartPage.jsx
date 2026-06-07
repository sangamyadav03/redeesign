import React from 'react';
import { useNavigate } from 'react-router';
import { useCart } from '../hooks/useCart';
import { formatCurrency } from '../utils/formatCurrency';
import LoadingSpinner from '../components/LoadingSpinner';

const CartPage = () => {
  const navigate = useNavigate();
  const { cart, cartTotal, loading, updateQuantity, removeFromCart } = useCart();

  if (loading) return <LoadingSpinner label="Loading cart..." />;

  const items = cart.items || [];

  const handleCheckout = () => {
    if (!items.length) return;
    navigate('/home/buy', {
      state: {
        fromCart: true,
        items: items.map((item) => ({
          _id: item.product._id,
          title: item.product.title,
          price: item.price,
          image: item.product.image,
          quantity: item.quantity,
        })),
      },
    });
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8 md:px-8 lg:px-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-semibold mb-2">Your Cart</h1>
        <p className="text-white/50 mb-10">{items.length} item{items.length !== 1 ? 's' : ''}</p>

        {items.length === 0 ? (
          <div className="text-center py-20 border border-white/10 rounded-2xl">
            <p className="text-white/50 mb-6">Your cart is empty</p>
            <button type="button" onClick={() => navigate('/home')} className="btn-outline">
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={item._id}
                  className="flex gap-4 p-4 rounded-2xl border border-white/10 bg-white/5"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    className="w-24 h-28 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{item.product.title}</h3>
                    <p className="text-white/50 text-sm line-clamp-2">{item.product.description}</p>
                    <p className="mt-2 font-bold">{formatCurrency(item.price)}</p>
                    <div className="flex items-center gap-3 mt-3">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))}
                        className="w-8 h-8 rounded-lg border border-white/20 hover:bg-white/10"
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        className="w-8 h-8 rounded-lg border border-white/20 hover:bg-white/10"
                      >
                        +
                      </button>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item._id)}
                        className="ml-auto text-sm text-red-400 hover:text-red-300"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="glass-card rounded-2xl p-6 h-fit sticky top-24">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
              <div className="flex justify-between mb-2 text-white/60">
                <span>Subtotal</span>
                <span>{formatCurrency(cartTotal)}</span>
              </div>
              <div className="flex justify-between mb-6 text-white/60">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between text-xl font-bold border-t border-white/10 pt-4 mb-6">
                <span>Total</span>
                <span>{formatCurrency(cartTotal)}</span>
              </div>
              <button type="button" onClick={handleCheckout} className="btn-primary">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
