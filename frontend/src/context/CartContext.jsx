import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  addCartItem,
  clearCart as clearCartApi,
  fetchCart,
  removeCartItem,
  updateCartItem,
} from '../services/cartService';
import { useAuth } from '../hooks/useAuth';
import { CartContext } from './cart-context';

export const CartProvider = ({ children }) => {
  const { isAuthenticated, token } = useAuth();
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(false);

  const loadCart = useCallback(async () => {
    if (!isAuthenticated) {
      setCart({ items: [] });
      return;
    }
    setLoading(true);
    try {
      const data = await fetchCart();
      setCart(data);
    } catch {
      setCart({ items: [] });
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (token) loadCart();
    else setCart({ items: [] });
  }, [token, loadCart]);

  const addToCart = async (productId, quantity = 1) => {
    const data = await addCartItem(productId, quantity);
    setCart(data);
    return data;
  };

  const updateQuantity = async (itemId, quantity) => {
    const data = await updateCartItem(itemId, quantity);
    setCart(data);
    return data;
  };

  const removeFromCart = async (itemId) => {
    const data = await removeCartItem(itemId);
    setCart(data);
    return data;
  };

  const clearCart = async () => {
    const data = await clearCartApi();
    setCart(data);
    return data;
  };

  const cartCount = useMemo(
    () => cart.items?.reduce((sum, item) => sum + item.quantity, 0) || 0,
    [cart.items]
  );

  const cartTotal = useMemo(
    () => cart.items?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0,
    [cart.items]
  );

  const value = useMemo(
    () => ({
      cart,
      cartCount,
      cartTotal,
      loading,
      loadCart,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
    }),
    [cart, cartCount, cartTotal, loading, loadCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
