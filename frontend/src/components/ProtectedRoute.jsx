import React from 'react';
import { Navigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, initializing } = useAuth();

  if (initializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Verifying session...
      </div>
    );
  }

  if (!isAuthenticated) return <Navigate to="/" replace />;

  return children;
};

export default ProtectedRoute;
