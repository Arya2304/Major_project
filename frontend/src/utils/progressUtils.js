/**
 * Progress Tracking Utilities
 * Manages course and lesson completion progress
 */

// localStorage key for progress data
const PROGRESS_STORAGE_KEY = 'signlearn_course_progress';

/**
 * Get all progress data from localStorage
 * Returns: { courseId: [completedLessonIds] }
 */
export const getProgressData = () => {
  try {
    const data = localStorage.getItem(PROGRESS_STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error('Error reading progress data:', error);
    return {};
  }
};

/**
 * Save progress data to localStorage
 */
export const saveProgressData = (progressData) => {
  try {
    localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progressData));
  } catch (error) {
    console.error('Error saving progress data:', error);
  }
};

/**
 * Get completed lessons for a specific course
 * Returns: [lessonId1, lessonId2, ...]
 */
export const getCompletedLessons = (courseId) => {
  const progressData = getProgressData();
  return progressData[courseId] || [];
};

/**
 * Mark a lesson as completed
 */
export const markLessonComplete = (courseId, lessonId) => {
  const progressData = getProgressData();
  
  if (!progressData[courseId]) {
    progressData[courseId] = [];
  }
  
  // Add lessonId if not already completed
  if (!progressData[courseId].includes(lessonId)) {
    progressData[courseId].push(lessonId);
  }
  
  saveProgressData(progressData);
  return progressData;
};

/**
 * Calculate progress for a course
 * Returns: { completedCount, totalCount, percentage }
 */
export const calculateCourseProgress = (courseId, allLessons) => {
  const completedLessons = getCompletedLessons(courseId);
  const courseLessons = allLessons.filter(lesson => lesson.courseId === courseId);
  
  const completedCount = completedLessons.length;
  const totalCount = courseLessons.length;
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  
  return {
    completedCount,
    totalCount,
    percentage,
  };
};

/**
 * Get the next incomplete lesson for a course
 * Returns: lesson object or null if all completed
 */
export const getNextIncompleteLesson = (courseId, allLessons) => {
  const completedLessons = getCompletedLessons(courseId);
  const courseLessons = allLessons.filter(lesson => lesson.courseId === courseId);
  
  // Sort by ID to ensure consistent ordering
  const sortedLessons = courseLessons.sort((a, b) => a.id - b.id);
  
  // Find first lesson not in completed list
  const nextLesson = sortedLessons.find(lesson => !completedLessons.includes(lesson.id));
  
  return nextLesson || null;
};

/**
 * Get all lessons for a course, organized with completion status
 */
export const getLessonsWithStatus = (courseId, allLessons) => {
  const completedLessons = getCompletedLessons(courseId);
  const courseLessons = allLessons.filter(lesson => lesson.courseId === courseId);
  
  return courseLessons.map(lesson => ({
    ...lesson,
    isCompleted: completedLessons.includes(lesson.id),
  }));
};

/**
 * Reset progress for a specific course (for testing/reset functionality)
 */
export const resetCourseProgress = (courseId) => {
  const progressData = getProgressData();
  delete progressData[courseId];
  saveProgressData(progressData);
  return progressData;
};

/**
 * Reset all progress (for testing/reset functionality)
 */
export const resetAllProgress = () => {
  localStorage.removeItem(PROGRESS_STORAGE_KEY);
  return {};
};

/**
 * Check if a lesson is completed
 */
export const isLessonCompleted = (courseId, lessonId) => {
  const completedLessons = getCompletedLessons(courseId);
  return completedLessons.includes(lessonId);
};

/**
 * Check if all lessons in a course are completed
 */
export const isCourseCompleted = (courseId, allLessons) => {
  const courseLessons = allLessons.filter(lesson => lesson.courseId === courseId);
  const completedLessons = getCompletedLessons(courseId);
  return courseLessons.length > 0 && completedLessons.length === courseLessons.length;
};
