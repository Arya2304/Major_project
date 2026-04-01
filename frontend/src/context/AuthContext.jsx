import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../api/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Initialize from localStorage
  const getInitialState = () => {
    try {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      return {
        token: token || null,
        user: user ? JSON.parse(user) : null,
      };
    } catch (error) {
      console.error('Failed to parse stored user:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
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
      console.log('[AuthContext] Login attempt:', { email });
      
      // Mock authentication: Accept any email/password combination
      // In production, this would call authAPI.login(email, password)
      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      // Create a mock user from email
      const mockUser = {
        id: Math.random().toString(36).substr(2, 9),
        email: email,
        first_name: email.split('@')[0] || 'User',
        last_name: 'Learner',
      };
      const mockToken = 'token_' + Date.now();

      // Store in localStorage
      localStorage.setItem('token', mockToken);
      localStorage.setItem('user', JSON.stringify(mockUser));

      // Update state
      setToken(mockToken);
      setUser(mockUser);
      setIsAuthenticated(true);

      console.log('[AuthContext] Login successful:', { email: mockUser.email, isAuthenticated: true });

      return { success: true, data: { token: mockToken, user: mockUser } };
    } catch (error) {
      console.error('[AuthContext] Login error:', error);
      return {
        success: false,
        error: error.message || 'Login failed. Please check your credentials.',
      };
    }
  };

  const register = async (userData) => {
    try {
      console.log('[AuthContext] Register attempt:', { email: userData.email });
      
      // Mock registration: Accept any user data
      // In production, this would call authAPI.register(userData)
      if (!userData.email || !userData.password) {
        throw new Error('Email and password are required');
      }

      // Create a mock user
      const mockUser = {
        id: Math.random().toString(36).substr(2, 9),
        email: userData.email,
        username: userData.username || userData.email.split('@')[0],
        first_name: userData.first_name || 'User',
        last_name: userData.last_name || 'Learner',
      };
      const mockToken = 'token_' + Date.now();

      // Store in localStorage
      localStorage.setItem('token', mockToken);
      localStorage.setItem('user', JSON.stringify(mockUser));

      // Update state
      setToken(mockToken);
      setUser(mockUser);
      setIsAuthenticated(true);

      console.log('[AuthContext] Register successful:', { email: mockUser.email, isAuthenticated: true });

      return { success: true, data: { token: mockToken, user: mockUser } };
    } catch (error) {
      console.error('[AuthContext] Registration error:', error);
      return {
        success: false,
        error: error.message || 'Registration failed. Please try again.',
      };
    }
  };

  const logout = () => {
    console.log('[AuthContext] Logout');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateUser = (userData) => {
    console.log('[AuthContext] Updating user:', { email: userData.email });
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
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

