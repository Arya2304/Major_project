import api from './axios';

export const authAPI = {
  register: async (userData) => {
    const response = await api.post('/auth/register/', userData);
    return response.data;
  },

  login: async (email, password) => {
    const response = await api.post('/auth/login/', { email, password });
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get('/auth/profile/');
    return response.data;
  },

  updateProfile: async (userData) => {
    const response = await api.put('/auth/profile/', userData);
    return response.data;
  },

  getRoles: async () => {
    const response = await api.get('/auth/roles/');
    return response.data;
  },
};

