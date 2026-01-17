import api from './axios';

export const signsAPI = {
  getLanguages: async () => {
    const response = await api.get('/sign-language/languages/');
    return response.data;
  },

  getCategories: async () => {
    const response = await api.get('/sign-language/categories/');
    return response.data;
  },

  getSigns: async (params = {}) => {
    const response = await api.get('/sign-language/signs/', { params });
    return response.data;
  },

  getSign: async (id) => {
    const response = await api.get(`/sign-language/signs/${id}/`);
    return response.data;
  },

  getVideos: async (params = {}) => {
    const response = await api.get('/sign-language/videos/', { params });
    return response.data;
  },

  getVideo: async (id) => {
    const response = await api.get(`/sign-language/videos/${id}/`);
    return response.data;
  },
};

