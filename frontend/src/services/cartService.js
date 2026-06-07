import api from './api';

export const fetchCart = async () => {
  const { data } = await api.get('/cart');
  return data.data;
};

export const addCartItem = async (productId, quantity = 1) => {
  const { data } = await api.post('/cart/items', { productId, quantity });
  return data.data;
};

export const updateCartItem = async (itemId, quantity) => {
  const { data } = await api.patch(`/cart/items/${itemId}`, { quantity });
  return data.data;
};

export const removeCartItem = async (itemId) => {
  const { data } = await api.delete(`/cart/items/${itemId}`);
  return data.data;
};

export const clearCart = async () => {
  const { data } = await api.delete('/cart');
  return data.data;
};
