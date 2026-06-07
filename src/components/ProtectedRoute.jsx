import React, { useEffect, useState } from "react";
import { Navigate } from "react-router";
import api from "../api/client";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const { token, logout } = useAuth();

  useEffect(() => {
    if (!token) {
      setAuthorized(false);
      setLoading(false);
      return;
    }

    api
      .get("/auth/me")
      .then(() => setAuthorized(true))
      .catch(() => {
        logout();
        setAuthorized(false);
      })
      .finally(() => setLoading(false));
  }, [token, logout]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-black text-white">Verifying session...</div>;
  }

  if (!authorized) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
