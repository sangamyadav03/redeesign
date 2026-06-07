import axios from 'axios';

const PUBLIC_AUTH_PATHS = ['/auth/login', '/auth/register'];

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const requestUrl = error.config?.url || '';
      const isPublicAuth = PUBLIC_AUTH_PATHS.some((path) => requestUrl.includes(path));

      if (!isPublicAuth) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.dispatchEvent(new Event('auth:session-expired'));
      }
    }
    return Promise.reject(error);
  }
);

export default api;
