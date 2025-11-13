// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children }) => {
  const userData = localStorage.getItem("userData");

  // 🟡 If no user data found, redirect to Auth page (Register/Login)
  if (!userData) {
    return <Navigate to="/" replace />;
  }

  // ✅ User is logged in — show the requested page
  return children;
};

export default ProtectedRoute;
