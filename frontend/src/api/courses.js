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

  getCourseLessons: async (courseId) => {
    const response = await api.get('/courses/lessons/', { params: { course: courseId } });
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

  getEnrollments: async () => {
    const response = await api.get('/courses/enrollments/');
    return response.data;
  },

  getEnrollment: async (courseId) => {
    // Backend enrollment list is always for the current user; it doesn't filter by course id.
    // So we fetch all enrollments and select the one that matches the requested course.
    const response = await api.get('/courses/enrollments/');
    const enrollments = response.data?.results || response.data || [];
    const parsedCourseId = typeof courseId === 'string' ? parseInt(courseId, 10) : courseId;
    return (
      enrollments.find((e) => e?.course?.id === parsedCourseId) ||
      null
    );
  },

  updateProgress: async (enrollmentId, progress) => {
    const response = await api.post(`/courses/enrollments/${enrollmentId}/progress/`, {
      progress_percentage: progress,
    });
    return response.data;
  },

  createLesson: async (formData) => {
    const response = await api.post('/courses/lessons/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  updateCourseThumbnail: async (courseId, payload) => {
    const fd = payload instanceof FormData ? payload : new FormData();
    if (!(payload instanceof FormData) && payload) {
      fd.append('thumbnail', payload);
    }

    const response = await api.patch(`/courses/${courseId}/`, fd, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
};

