import React from 'react';
import { Route, Routes } from 'react-router';
import AuthLayout from '../layouts/AuthLayout';
import HomeLayout from '../layouts/HomeLayout';
import ProtectedRoute from '../components/ProtectedRoute';
import HomePage from '../pages/HomePage';
import BeautyPage from '../pages/BeautyPage';
import MenPage from '../pages/MenPage';
import WomenPage from '../pages/WomenPage';
import KidsPage from '../pages/KidsPage';
import CartPage from '../pages/CartPage';
import BuyFormPage from '../pages/BuyFormPage';
import OrderSuccessPage from '../pages/OrderSuccessPage';

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<AuthLayout />} />
    <Route
      path="/home"
      element={
        <ProtectedRoute>
          <HomeLayout />
        </ProtectedRoute>
      }
    >
      <Route index element={<HomePage />} />
      <Route path="beauty" element={<BeautyPage />} />
      <Route path="mens" element={<MenPage />} />
      <Route path="women" element={<WomenPage />} />
      <Route path="kids" element={<KidsPage />} />
      <Route path="cart" element={<CartPage />} />
      <Route path="buy" element={<BuyFormPage />} />
      <Route path="order-success" element={<OrderSuccessPage />} />
    </Route>
  </Routes>
);

export default AppRouter;
