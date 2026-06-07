import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { fetchCurrentUser } from '../services/authService';
import { AuthContext } from './auth-context';

const persistSession = (nextToken, nextUser) => {
  if (nextToken) localStorage.setItem('token', nextToken);
  else localStorage.removeItem('token');

  if (nextUser) localStorage.setItem('user', JSON.stringify(nextUser));
  else localStorage.removeItem('user');
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user')) || null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');
  const [initializing, setInitializing] = useState(Boolean(localStorage.getItem('token')));

  const logout = useCallback(() => {
    setToken('');
    setUser(null);
    persistSession('', null);
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      setInitializing(false);
      return;
    }

    fetchCurrentUser()
      .then((profile) => setUser(profile))
      .catch(() => logout())
      .finally(() => setInitializing(false));
  }, [logout]);

  useEffect(() => {
    const handleSessionExpired = () => logout();
    window.addEventListener('auth:session-expired', handleSessionExpired);
    return () => window.removeEventListener('auth:session-expired', handleSessionExpired);
  }, [logout]);

  const login = useCallback((authData) => {
    const nextToken = authData.token || '';
    const nextUser = authData.user || null;
    setToken(nextToken);
    setUser(nextUser);
    persistSession(nextToken, nextUser);
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token),
      initializing,
      login,
      logout,
    }),
    [user, token, initializing, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
