import React from "react";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children }) => {
  const userData = localStorage.getItem("userData");

  if (!userData) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
