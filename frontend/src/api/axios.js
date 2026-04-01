import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized - only redirect if user is truly not authenticated
    if (error.response?.status === 401) {
      const token = localStorage.getItem('token');
      
      console.warn('[Axios] 401 Unauthorized', {
        url: error.config?.url,
        hasToken: !!token,
      });

      // Only redirect if user doesn't have a token (actually unauthenticated)
      // If they have a token, API is rejecting for other reasons - use fallback data
      if (!token) {
        console.log('[Axios] No token found, redirecting to login');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      } else {
        console.warn('[Axios] Token exists but API returned 401. Using mock data fallback.');
      }
    }
    return Promise.reject(error);
  }
);

export default api;

