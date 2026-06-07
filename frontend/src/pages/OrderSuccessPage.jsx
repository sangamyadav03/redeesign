import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { formatCurrency } from '../utils/formatCurrency';

const OrderSuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderId, amount } = location.state || {};

  useEffect(() => {
    if (!orderId) {
      const timer = setTimeout(() => navigate('/home'), 3000);
      return () => clearTimeout(timer);
    }
  }, [orderId, navigate]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="glass-card rounded-2xl p-10 max-w-md w-full text-center">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-white flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-semibold mb-2">Order Successful!</h1>
        <p className="text-white/60 mb-4">Thank you for your purchase.</p>
        {amount && <p className="text-xl font-bold mb-2">{formatCurrency(amount)}</p>}
        {orderId && <p className="text-xs text-white/40 mb-8">Order ID: {orderId}</p>}
        <button type="button" onClick={() => navigate('/home')} className="btn-primary">
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
