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
  const [loading, setLoading] = useState(false); // Start as false since we initialize from localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(!!initial.token);

  // Initialize auth from localStorage on app load
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');

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
      } else {
        console.log('[AuthContext] No auth data in localStorage');
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
      sessionStorage.setItem('user', JSON.stringify(serializeUserForStorage(userFromApi)));

      setToken(tokenFromApi);
      setUser(serializeUserForStorage(userFromApi));
      setIsAuthenticated(true);

      return { success: true, data: res };
    } catch (error) {
      console.error('[AuthContext] Login error:', error);
      const errorData = error?.response?.data;
      if (errorData) {
        console.error('[AuthContext] Login error payload:', errorData);
      }
      if (errorData) return { success: false, error: errorData };
      return { success: false, error: error?.message || 'Login failed. Please check your credentials.' };
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
      sessionStorage.setItem('user', JSON.stringify(serializeUserForStorage(userFromApi)));

      setToken(tokenFromApi);
      setUser(serializeUserForStorage(userFromApi));
      setIsAuthenticated(true);

      return { success: true, data: res };
    } catch (error) {
      console.error('[AuthContext] Registration error:', error);
      const errorData = error?.response?.data;
      if (errorData) {
        console.error('[AuthContext] Registration error payload:', errorData);
      }
      if (errorData) return { success: false, error: errorData };
      return { success: false, error: error?.message || 'Registration failed. Please try again.' };
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
    sessionStorage.setItem('user', JSON.stringify(next));
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

