import React from "react";
import { useForm } from "react-hook-form";

const BuyForm = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log("Order Submitted:", data);
    alert("Thank you! Your purchase is confirmed.");
    reset();
  };

  return (
    <div className="min-h-screen text-black flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 p-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white text-black p-6 rounded-xl shadow-xl w-full max-w-lg space-y-3"
      >
        <h2 className="text-xl font-bold text-center text-gray-800 mb-2">
          Buy Product
        </h2>

        <input
          {...register("name", { required: true })}
          placeholder="Full Name"
          className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
            errors.name ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.name && <p className="text-red-500 text-sm">Name is required</p>}

        <input
          {...register("email", { required: true })}
          placeholder="Email Address"
          type="email"
          className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
            errors.email ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.email && <p className="text-red-500 text-sm">Email is required</p>}

        <input
          {...register("phone", { required: true, pattern: /^[0-9]{10}$/ })}
          placeholder="Phone Number"
          type="tel"
          className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
            errors.phone ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.phone && <p className="text-red-500 text-sm">Enter a valid 10-digit phone number</p>}

        <textarea
          {...register("address", { required: true })}
          placeholder="Address"
          rows={2}
          className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
            errors.address ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.address && <p className="text-red-500 text-sm">Address is required</p>}

        <select
          {...register("product", { required: true })}
          className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
            errors.product ? "border-red-500" : "border-gray-300"
          }`}
        >
          <option value="">Select Product</option>
          <option value="T-shirt">T-shirt</option>
          <option value="Jeans">Jeans</option>
          <option value="Shoes">Shoes</option>
        </select>
        {errors.product && <p className="text-red-500 text-sm">Product is required</p>}

        <input
          {...register("quantity", { required: true, min: 1 })}
          type="number"
          min="1"
          placeholder="Quantity"
          className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
            errors.quantity ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.quantity && <p className="text-red-500 text-sm">Quantity must be at least 1</p>}

        <input
          {...register("upi", { required: true })}
          placeholder="UPI ID (for payment)"
          className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
            errors.upi ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.upi && <p className="text-red-500 text-sm">UPI ID is required</p>}

        <select
          {...register("paymentMethod", { required: true })}
          className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
            errors.paymentMethod ? "border-red-500" : "border-gray-300"
          }`}
        >
          <option value="">Select Payment Method</option>
          <option value="UPI">UPI</option>
          <option value="Credit Card">Credit Card</option>
          <option value="Debit Card">Debit Card</option>
          <option value="Cash on Delivery">Cash on Delivery</option>
        </select>
        {errors.paymentMethod && <p className="text-red-500 text-sm">Payment Method is required</p>}

        <label className="flex items-center gap-2 mt-1">
          <input
            type="checkbox"
            {...register("confirm", { required: true })}
            className="w-4 h-4 accent-purple-600"
          />
          <span className="text-gray-700 text-sm">I confirm my order</span>
        </label>
        {errors.confirm && <p className="text-red-500 text-sm">You must confirm your order</p>}

        <button
          type="submit"
          className="w-full py-2 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-all duration-300 shadow-md hover:shadow-xl transform hover:scale-105"
        >
          Buy Now
        </button>
      </form>
    </div>
  );
};

export default BuyForm;
