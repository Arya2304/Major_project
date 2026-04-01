import api from './axios';

export const progressAPI = {
  getStats: async () => {
    const response = await api.get('/progress/stats/');
    return response.data;
  },

  getLessonProgress: async (lessonId) => {
    const response = await api.get(`/progress/lessons/${lessonId}/`);
    return response.data;
  },

  updateSignProgress: async (signId, data) => {
    const response = await api.post(`/progress/signs/${signId}/update/`, data);
    return response.data;
  },

  updateVideoProgress: async (videoId, data) => {
    const response = await api.post(`/progress/videos/${videoId}/update/`, data);
    return response.data;
  },

  updateLessonProgress: async (lessonId, data) => {
    const response = await api.post(`/progress/lessons/${lessonId}/update/`, data);
    return response.data;
  },

  createLessonProgress: async (lessonId, data) => {
    const response = await api.post('/progress/lessons/', { lesson_id: lessonId, ...data });
    return response.data;
  },

  getSignProgress: async () => {
    const response = await api.get('/progress/signs/');
    return response.data;
  },

  getVideoProgress: async () => {
    const response = await api.get('/progress/videos/');
    return response.data;
  },

  getAllLessonProgress: async () => {
    const response = await api.get('/progress/lessons/');
    return response.data;
  },
};

