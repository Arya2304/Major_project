import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../api/auth';

const AuthContext = createContext(null);

const serializeUserForStorage = (user) => {
  if (!user || typeof user !== 'object') return null;
  // Keep only small fields to avoid exceeding localStorage quota.
  return {
    id: user.id,
    email: user.email,
    username: user.username,
    first_name: user.first_name,
    last_name: user.last_name,
    role: user.role
      ? {
          id: user.role.id,
          name: user.role.name,
        }
      : null,
  };
};

const MINIMAL_USER_STORAGE = (user) => {
  if (!user || typeof user !== 'object') return null;
  return {
    id: user.id ?? null,
    email: user.email ?? null,
    username: user.username ?? null,
  };
};

const safeSetStorage = (storage, key, value) => {
  try {
    storage.setItem(key, value);
    return true;
  } catch (error) {
    console.warn(`[AuthContext] Failed to write ${key} to storage:`, error);
    return false;
  }
};

const persistUserSafely = (userObj) => {
  const serialized = JSON.stringify(userObj);
  const minimalSerialized = JSON.stringify(MINIMAL_USER_STORAGE(userObj));

  // Best effort cleanup of old user entry first.
  try {
    localStorage.removeItem('user');
  } catch {
    // ignore
  }

  // First try full payload in localStorage.
  if (!safeSetStorage(localStorage, 'user', serialized)) {
    // If quota is hit, try a much smaller user payload.
    if (!safeSetStorage(localStorage, 'user', minimalSerialized)) {
      // Keep session-only persistence if localStorage is full.
      try {
        localStorage.removeItem('user');
      } catch {
        // ignore
      }
    }
  }

  // sessionStorage is usually less constrained and tab-scoped fallback.
  if (!safeSetStorage(sessionStorage, 'user', serialized)) {
    safeSetStorage(sessionStorage, 'user', minimalSerialized);
  }
};

const extractAuthError = (error, mode = 'login') => {
  const status = error?.response?.status;
  const payload = error?.response?.data;

  // If backend crashes or returns unknown 5xx, provide actionable fallback text.
  if (status >= 500) {
    if (mode === 'login') {
      return 'User not registered. Please register first.';
    }
    return 'Server error during registration. Please try again.';
  }

  if (typeof payload === 'string' && payload.trim()) return payload;

  if (payload && typeof payload === 'object') {
    if (typeof payload.detail === 'string' && payload.detail.trim()) return payload.detail;
    if (typeof payload.message === 'string' && payload.message.trim()) return payload.message;

    const fieldMessages = Object.entries(payload)
      .filter(([, value]) => value != null)
      .map(([field, value]) => {
        const text = Array.isArray(value) ? value.join(', ') : String(value);
        if (field === 'non_field_errors') return text;
        return `${field}: ${text}`;
      })
      .filter(Boolean);

    if (fieldMessages.length) return fieldMessages.join(' | ');
  }

  if (status === 400 && mode === 'login') {
    return 'User not registered. Please register first.';
  }

  return error?.message || (mode === 'login' ? 'Login failed. Please check your credentials.' : 'Registration failed. Please try again.');
};

export const AuthProvider = ({ children }) => {
  // Initialize from localStorage
  const getInitialState = () => {
    try {
      const token = localStorage.getItem('token');
      const userFromSession = sessionStorage.getItem('user');
      const userFromLocal = localStorage.getItem('user');
      const userRaw = userFromSession || userFromLocal;
      return {
        token: token || null,
        user: userRaw ? JSON.parse(userRaw) : null,
      };
    } catch (error) {
      console.error('Failed to parse stored user:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      sessionStorage.removeItem('user');
      return { token: null, user: null };
    }
  };

  const initial = getInitialState();
  const [user, setUser] = useState(initial.user);
  const [token, setToken] = useState(initial.token);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(!!initial.token);

  // Initialize auth from localStorage on app load
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');

      console.log('[AuthContext] Initializing from localStorage:', { 
        hasToken: !!storedToken, 
        hasUser: !!storedUser 
      });

      if (storedToken && storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setToken(storedToken);
          setUser(parsedUser);
          setIsAuthenticated(true);
          // Keep both storages in sync so refresh/new tab restore works.
          persistUserSafely(parsedUser);
          console.log('[AuthContext] Auth restored:', { email: parsedUser.email });
        } catch (error) {
          // Data corrupted, clear storage
          console.error('[AuthContext] Failed to parse stored data:', error);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          sessionStorage.removeItem('user');
          setToken(null);
          setUser(null);
          setIsAuthenticated(false);
        }
      } else if (storedToken) {
        try {
          // Token exists but user payload is missing; recover user from API.
          const profile = await authAPI.getProfile();
          const safeUser = serializeUserForStorage(profile);
          setToken(storedToken);
          setUser(safeUser);
          setIsAuthenticated(true);
          persistUserSafely(safeUser);
          console.log('[AuthContext] Auth restored from token/profile');
        } catch (error) {
          console.error('[AuthContext] Failed to restore profile from token:', error);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          sessionStorage.removeItem('user');
          setToken(null);
          setUser(null);
          setIsAuthenticated(false);
        }
      } else {
        console.log('[AuthContext] No auth data in localStorage');
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
      }
      
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    try {
      if (!email || !password) throw new Error('Email and password are required');

      setLoading(true);
      const res = await authAPI.login(email, password);

      const tokenFromApi = res?.token;
      const userFromApi = res?.user;
      if (!tokenFromApi || !userFromApi) {
        throw new Error('Invalid login response from server');
      }

      // Avoid localStorage quota errors by storing only a small user summary.
      // Also clear any previously stored oversized `user` value.
      try {
        localStorage.removeItem('user');
      } catch {
        // ignore
      }
      localStorage.setItem('token', tokenFromApi);
      const safeUser = serializeUserForStorage(userFromApi);
      persistUserSafely(safeUser);

      setToken(tokenFromApi);
      setUser(safeUser);
      setIsAuthenticated(true);

      return { success: true, data: res };
    } catch (error) {
      console.error('[AuthContext] Login error:', error);
      const errorData = error?.response?.data;
      if (errorData) {
        console.error('[AuthContext] Login error payload:', errorData);
      }
      return { success: false, error: extractAuthError(error, 'login') };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      if (!userData?.email || !userData?.password) throw new Error('Email and password are required');

      setLoading(true);
      const res = await authAPI.register(userData);

      const tokenFromApi = res?.token;
      const userFromApi = res?.user;
      if (!tokenFromApi || !userFromApi) {
        throw new Error('Invalid registration response from server');
      }

      // Avoid localStorage quota errors by storing only a small user summary.
      try {
        localStorage.removeItem('user');
      } catch {
        // ignore
      }
      localStorage.setItem('token', tokenFromApi);
      const safeUser = serializeUserForStorage(userFromApi);
      persistUserSafely(safeUser);

      setToken(tokenFromApi);
      setUser(safeUser);
      setIsAuthenticated(true);

      return { success: true, data: res };
    } catch (error) {
      console.error('[AuthContext] Registration error:', error);
      const errorData = error?.response?.data;
      if (errorData) {
        console.error('[AuthContext] Registration error payload:', errorData);
      }
      return { success: false, error: extractAuthError(error, 'register') };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    console.log('[AuthContext] Logout');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateUser = (userData) => {
    console.log('[AuthContext] Updating user:', { email: userData.email });
    const next = serializeUserForStorage(userData);
    setUser(next);
    persistUserSafely(next);
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    updateUser,
    isAuthenticated,
  };

  console.log('[AuthContext] Current state:', { 
    isAuthenticated, 
    loading, 
    hasUser: !!user, 
    hasToken: !!token 
  });

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

