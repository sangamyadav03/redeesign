import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router';
import { createPaymentOrder, loadRazorpayScript, verifyPayment } from '../services/paymentService';
import { formatCurrency } from '../utils/formatCurrency';
import { useAuth } from '../hooks/useAuth';

const BuyFormPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const productState = location.state?.product;
  const cartItems = location.state?.items;
  const items = cartItems || (productState ? [productState] : []);

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      fullName: user?.name || '',
      email: user?.email || '',
      quantity: productState?.quantity || 1,
    },
  });

  const watchedQuantity = Number(watch('quantity')) || 1;
  const cartTotal = items.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  const displayTotal = cartItems
    ? cartTotal
    : items.reduce((sum, item) => sum + item.price * watchedQuantity, 0);

  if (!items.length) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-4">
        <p className="text-white/50">No product selected for purchase.</p>
        <button type="button" onClick={() => navigate('/home')} className="btn-outline">
          Back to Home
        </button>
      </div>
    );
  }

  const onSubmit = async (formData) => {
    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    const quantity = Number(formData.quantity) || 1;
    const orderItems = items.map((item) => ({
      product: item._id,
      title: item.title,
      price: item.price,
      image: item.image,
      quantity: cartItems ? item.quantity : quantity,
    }));

    const computedTotal = cartItems
      ? cartTotal
      : orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const payload = {
      items: orderItems,
      totalAmount: computedTotal,
      shipping: {
        fullName: formData.fullName,
        mobile: formData.mobile,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
      },
    };

    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) throw new Error('Failed to load payment gateway.');

      const paymentData = await createPaymentOrder(payload);
      const { razorpayOrder, keyId, order } = paymentData;

      const options = {
        key: keyId,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: 'Zudio',
        description: 'Fashion Purchase',
        order_id: razorpayOrder.id,
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.mobile,
        },
        theme: { color: '#000000' },
        handler: async (response) => {
          try {
            await verifyPayment({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            });
            navigate('/home/order-success', { state: { orderId: order._id, amount: computedTotal } });
          } catch {
            setErrorMessage('Payment verification failed. Please contact support.');
          }
        },
        modal: {
          ondismiss: () => {
            setIsSubmitting(false);
            setErrorMessage('Payment was cancelled.');
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.on('payment.failed', () => {
        setErrorMessage('Payment failed. Please try again.');
        setIsSubmitting(false);
      });
      razorpay.open();
      setSuccessMessage('Payment gateway opened. Complete payment to confirm your order.');
    } catch (error) {
      setErrorMessage(error.response?.data?.message || error.message || 'Checkout failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8 md:px-8">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 glass-card rounded-2xl p-6 md:p-8">
          <h1 className="text-3xl font-semibold mb-2">Checkout</h1>
          <p className="text-white/50 mb-8">Complete your purchase details</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm text-white/70 mb-1.5">Full Name</label>
                <input {...register('fullName', { required: 'Full name is required' })} className="input-field" />
                {errors.fullName && <p className="text-red-400 text-sm mt-1">{errors.fullName.message}</p>}
              </div>
              <div>
                <label className="block text-sm text-white/70 mb-1.5">Mobile Number</label>
                <input
                  {...register('mobile', {
                    required: 'Mobile number is required',
                    pattern: { value: /^[6-9]\d{9}$/, message: 'Enter a valid 10-digit mobile number' },
                  })}
                  className="input-field"
                  placeholder="9876543210"
                />
                {errors.mobile && <p className="text-red-400 text-sm mt-1">{errors.mobile.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm text-white/70 mb-1.5">Email</label>
              <input
                type="email"
                {...register('email', { required: 'Email is required' })}
                className="input-field"
              />
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm text-white/70 mb-1.5">Address</label>
              <textarea
                rows={2}
                {...register('address', { required: 'Address is required' })}
                className="input-field resize-none"
              />
              {errors.address && <p className="text-red-400 text-sm mt-1">{errors.address.message}</p>}
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              <div>
                <label className="block text-sm text-white/70 mb-1.5">City</label>
                <input {...register('city', { required: 'City is required' })} className="input-field" />
                {errors.city && <p className="text-red-400 text-sm mt-1">{errors.city.message}</p>}
              </div>
              <div>
                <label className="block text-sm text-white/70 mb-1.5">State</label>
                <input {...register('state', { required: 'State is required' })} className="input-field" />
                {errors.state && <p className="text-red-400 text-sm mt-1">{errors.state.message}</p>}
              </div>
              <div>
                <label className="block text-sm text-white/70 mb-1.5">Pincode</label>
                <input
                  {...register('pincode', {
                    required: 'Pincode is required',
                    pattern: { value: /^\d{6}$/, message: 'Enter a valid 6-digit pincode' },
                  })}
                  className="input-field"
                />
                {errors.pincode && <p className="text-red-400 text-sm mt-1">{errors.pincode.message}</p>}
              </div>
            </div>

            {!cartItems && (
              <div>
                <label className="block text-sm text-white/70 mb-1.5">Quantity</label>
                <input
                  type="number"
                  min="1"
                  {...register('quantity', { required: true, min: { value: 1, message: 'Minimum quantity is 1' } })}
                  className="input-field"
                />
                {errors.quantity && <p className="text-red-400 text-sm mt-1">{errors.quantity.message}</p>}
              </div>
            )}

            {errorMessage && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                {errorMessage}
              </div>
            )}
            {successMessage && (
              <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 text-sm">
                {successMessage}
              </div>
            )}

            <button type="submit" disabled={isSubmitting} className="btn-primary">
              {isSubmitting ? 'Processing...' : `Pay ${formatCurrency(displayTotal)}`}
            </button>
          </form>
        </div>

        <div className="lg:col-span-2 glass-card rounded-2xl p-6 h-fit">
          <h2 className="text-xl font-semibold mb-6">Product Details</h2>
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item._id} className="flex gap-4 pb-4 border-b border-white/10">
                <img src={item.image} alt={item.title} className="w-20 h-24 object-cover rounded-lg" />
                <div>
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-white/50 text-sm">
                    Qty: {cartItems ? item.quantity : watchedQuantity}
                  </p>
                  <p className="font-bold mt-1">
                    {formatCurrency(item.price * (cartItems ? item.quantity : watchedQuantity))}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xl font-bold mt-6 pt-4 border-t border-white/10">
            <span>Total</span>
            <span>{formatCurrency(displayTotal)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyFormPage;
