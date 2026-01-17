import api from './axios';

export const coursesAPI = {
  getCourses: async (params = {}) => {
    const response = await api.get('/courses/', { params });
    return response.data;
  },

  getCourse: async (id) => {
    const response = await api.get(`/courses/${id}/`);
    return response.data;
  },

  getLessons: async (params = {}) => {
    const response = await api.get('/courses/lessons/', { params });
    return response.data;
  },

  getLesson: async (id) => {
    const response = await api.get(`/courses/lessons/${id}/`);
    return response.data;
  },

  enrollInCourse: async (courseId) => {
    const response = await api.post('/courses/enrollments/', { course_id: courseId });
    return response.data;
  },

  getMyCourses: async () => {
    const response = await api.get('/courses/my-courses/');
    return response.data;
  },

  updateProgress: async (enrollmentId, progress) => {
    const response = await api.post(`/courses/enrollments/${enrollmentId}/progress/`, {
      progress_percentage: progress,
    });
    return response.data;
  },
};

