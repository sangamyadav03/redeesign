import api from './api';

export const createPaymentOrder = async (payload) => {
  const { data } = await api.post('/payments/create-order', payload);
  return data.data;
};

export const verifyPayment = async (payload) => {
  const { data } = await api.post('/payments/verify', payload);
  return data.data;
};

export const loadRazorpayScript = () =>
  new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
