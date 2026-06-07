import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import api from '../api/client';
import Toast from '../components/Toast';

const CATEGORIES = ['Beauty', 'Men', 'Women', 'Kids'];

const inputClass = (hasError) =>
  `w-full rounded-lg border bg-white px-4 py-3 text-sm text-black placeholder:text-neutral-400 outline-none transition-all duration-200 focus:ring-2 focus:ring-black/10 ${
    hasError ? 'border-red-500 focus:border-red-500' : 'border-neutral-200 focus:border-black'
  }`;

const labelClass = 'block text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500 mb-2';

const FieldError = ({ message }) =>
  message ? <p className="mt-1.5 text-xs text-red-500">{message}</p> : null;

const BuyForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      quantity: 1,
    },
  });

  const watchedImage = watch('image');

  React.useEffect(() => {
    if (watchedImage && /^https?:\/\/.+\..+/.test(watchedImage)) {
      setImagePreview(watchedImage);
    } else {
      setImagePreview('');
    }
  }, [watchedImage]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const productPayload = {
        title: data.productName,
        category: data.category,
        price: Number(data.price),
        description: data.description,
        image: data.image,
        quantity: Number(data.quantity),
      };

      await api.post('/products', productPayload);

      window.dispatchEvent(new Event('products:updated'));

      setToast({
        type: 'success',
        message: 'Product added successfully! Redirecting to home…',
      });

      reset();
      setImagePreview('');

      sessionStorage.setItem('scrollToProducts', 'true');

      setTimeout(() => {
        navigate('/home');
      }, 2000);
    } catch (error) {
      const message =
        error.response?.data?.message || 'Something went wrong. Please try again.';
      setToast({ type: 'error', message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
          duration={toast.type === 'success' ? 2500 : 4000}
        />
      )}

      <div className="buy-form-grid pointer-events-none fixed inset-0 opacity-40" />

      <div className="relative mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
        <header className="mb-10 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.4em] text-neutral-500">
            Zudio Store
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Add a Product
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-neutral-400">
            Fill in the product and buyer details below. Your listing will appear instantly on the
            landing page after submission.
          </p>
        </header>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="overflow-hidden rounded-2xl border border-neutral-800 bg-white shadow-2xl shadow-black/50"
        >
          <div className="grid lg:grid-cols-2">
            {/* Product Details */}
            <div className="space-y-5 border-b border-neutral-100 p-6 sm:p-8 lg:border-b-0 lg:border-r">
              <div>
                <h2 className="text-lg font-bold text-black">Product Details</h2>
                <p className="mt-1 text-sm text-neutral-500">Information shown on the product card</p>
              </div>

              <div>
                <label htmlFor="productName" className={labelClass}>
                  Product Name
                </label>
                <input
                  id="productName"
                  {...register('productName', {
                    required: 'Product name is required',
                    minLength: { value: 2, message: 'Name must be at least 2 characters' },
                  })}
                  placeholder="e.g. Classic Oxford Shirt"
                  className={inputClass(errors.productName)}
                />
                <FieldError message={errors.productName?.message} />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="category" className={labelClass}>
                    Category
                  </label>
                  <select
                    id="category"
                    {...register('category', { required: 'Category is required' })}
                    className={inputClass(errors.category)}
                  >
                    <option value="">Select category</option>
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  <FieldError message={errors.category?.message} />
                </div>

                <div>
                  <label htmlFor="price" className={labelClass}>
                    Price (₹)
                  </label>
                  <input
                    id="price"
                    type="number"
                    min="0"
                    step="1"
                    {...register('price', {
                      required: 'Price is required',
                      min: { value: 1, message: 'Price must be at least ₹1' },
                    })}
                    placeholder="999"
                    className={inputClass(errors.price)}
                  />
                  <FieldError message={errors.price?.message} />
                </div>
              </div>

              <div>
                <label htmlFor="description" className={labelClass}>
                  Description
                </label>
                <textarea
                  id="description"
                  rows={3}
                  {...register('description', {
                    required: 'Description is required',
                    minLength: { value: 10, message: 'Description must be at least 10 characters' },
                    maxLength: { value: 500, message: 'Description must be under 500 characters' },
                  })}
                  placeholder="Describe the product features, material, and fit…"
                  className={`${inputClass(errors.description)} resize-none`}
                />
                <FieldError message={errors.description?.message} />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="image" className={labelClass}>
                    Image URL
                  </label>
                  <input
                    id="image"
                    {...register('image', {
                      required: 'Image URL is required',
                      pattern: {
                        value: /^https?:\/\/.+\..+/,
                        message: 'Enter a valid image URL (https://…)',
                      },
                    })}
                    placeholder="https://images.unsplash.com/…"
                    className={inputClass(errors.image)}
                  />
                  <FieldError message={errors.image?.message} />
                </div>

                <div>
                  <label htmlFor="quantity" className={labelClass}>
                    Quantity
                  </label>
                  <input
                    id="quantity"
                    type="number"
                    min="1"
                    {...register('quantity', {
                      required: 'Quantity is required',
                      min: { value: 1, message: 'Quantity must be at least 1' },
                    })}
                    placeholder="1"
                    className={inputClass(errors.quantity)}
                  />
                  <FieldError message={errors.quantity?.message} />
                </div>
              </div>

              {imagePreview && (
                <div className="overflow-hidden rounded-xl border border-neutral-200">
                  <img
                    src={imagePreview}
                    alt="Product preview"
                    className="h-40 w-full object-cover"
                    onError={() => setImagePreview('')}
                  />
                </div>
              )}
            </div>

            {/* Buyer Details */}
            <div className="space-y-5 bg-neutral-50 p-6 sm:p-8">
              <div>
                <h2 className="text-lg font-bold text-black">Buyer Details</h2>
                <p className="mt-1 text-sm text-neutral-500">Your contact and payment information</p>
              </div>

              <div>
                <label htmlFor="name" className={labelClass}>
                  Full Name
                </label>
                <input
                  id="name"
                  {...register('name', {
                    required: 'Full name is required',
                    minLength: { value: 2, message: 'Name must be at least 2 characters' },
                  })}
                  placeholder="John Doe"
                  className={inputClass(errors.name)}
                />
                <FieldError message={errors.name?.message} />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="email" className={labelClass}>
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Enter a valid email address',
                      },
                    })}
                    placeholder="you@example.com"
                    className={inputClass(errors.email)}
                  />
                  <FieldError message={errors.email?.message} />
                </div>

                <div>
                  <label htmlFor="phone" className={labelClass}>
                    Phone
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    {...register('phone', {
                      required: 'Phone number is required',
                      pattern: {
                        value: /^[6-9]\d{9}$/,
                        message: 'Enter a valid 10-digit Indian mobile number',
                      },
                    })}
                    placeholder="9876543210"
                    className={inputClass(errors.phone)}
                  />
                  <FieldError message={errors.phone?.message} />
                </div>
              </div>

              <div>
                <label htmlFor="address" className={labelClass}>
                  Delivery Address
                </label>
                <textarea
                  id="address"
                  rows={2}
                  {...register('address', {
                    required: 'Address is required',
                    minLength: { value: 10, message: 'Please enter a complete address' },
                  })}
                  placeholder="Street, city, state, pincode"
                  className={`${inputClass(errors.address)} resize-none`}
                />
                <FieldError message={errors.address?.message} />
              </div>

              <div>
                <label htmlFor="paymentMethod" className={labelClass}>
                  Payment Method
                </label>
                <select
                  id="paymentMethod"
                  {...register('paymentMethod', { required: 'Payment method is required' })}
                  className={inputClass(errors.paymentMethod)}
                >
                  <option value="">Select payment method</option>
                  <option value="UPI">UPI</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Debit Card">Debit Card</option>
                  <option value="Cash on Delivery">Cash on Delivery</option>
                </select>
                <FieldError message={errors.paymentMethod?.message} />
              </div>

              <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-neutral-200 bg-white p-4 transition-colors hover:border-black">
                <input
                  type="checkbox"
                  {...register('confirm', { required: 'You must confirm your order' })}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-black"
                />
                <span className="text-sm leading-relaxed text-neutral-700">
                  I confirm that all details are correct and I agree to proceed with this purchase.
                </span>
              </label>
              <FieldError message={errors.confirm?.message} />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl bg-black py-4 text-sm font-bold uppercase tracking-[0.2em] text-white shadow-lg transition-all duration-300 hover:bg-neutral-800 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting…' : 'Submit & Add Product'}
              </button>
            </div>
          </div>
        </form>

        <p className="mt-6 text-center text-xs text-neutral-600">
          <button
            type="button"
            onClick={() => navigate('/home')}
            className="underline underline-offset-4 transition-colors hover:text-white"
          >
            ← Back to landing page
          </button>
        </p>
      </div>
    </div>
  );
};

export default BuyForm;
