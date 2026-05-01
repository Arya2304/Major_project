import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { coursesAPI } from '../api/courses';
import { progressAPI } from '../api/progress';
import { getCourseById, getCourseLessons } from '../data/mockData';
import Loader from '../components/common/Loader';
import { FaStar } from 'react-icons/fa';
import './CourseDetail.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8001';
const toAbsoluteMediaUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `${API_BASE_URL}${url}`;
};

const CourseDetail = () => {
  const { id, courseId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [enrollment, setEnrollment] = useState(null);
  const [lessonProgress, setLessonProgress] = useState({});

  // "Instructor" UI: add new lesson to the course
  const [addLessonOpen, setAddLessonOpen] = useState(false);
  const [signsLoading, setSignsLoading] = useState(false);
  const [signs, setSigns] = useState([]);
  const [addLessonError, setAddLessonError] = useState('');
  const [addingLesson, setAddingLesson] = useState(false);
  const [lessonForm, setLessonForm] = useState({
    title: '',
    description: '',
    duration: '',
    order: '',
    is_free: false,
    video: null,
    thumbnail: null,
    signIds: [],
  });

  const [courseThumbnailFile, setCourseThumbnailFile] = useState(null);
  const [updatingCourse, setUpdatingCourse] = useState(false);
  const [courseUpdateError, setCourseUpdateError] = useState('');

  // Determine if we're in dashboard/private section (learn route)
  const isDashboard = location.pathname.includes('/learn/');
  const paramId = courseId || id;

  useEffect(() => {
    if (!addLessonOpen) return;
    // Default ordering to append at the end.
    setLessonForm((prev) => ({
      ...prev,
      order: prev.order !== '' ? prev.order : String(lessons.length),
    }));

    // Lazy-load signs only when modal opens.
    const loadSigns = async () => {
      setSignsLoading(true);
      try {
        const data = await signsAPI.getSigns({});
        setSigns(data?.results || data || []);
      } catch (error) {
        console.error('[CourseDetail] Failed to load signs:', error);
        setSigns([]);
      } finally {
        setSignsLoading(false);
      }
    };

    if (signs.length === 0) loadSigns();
  }, [addLessonOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const fetchCourseData = async () => {
      setLoading(true);
      try {
        // Ensure we have a valid course ID
        if (!paramId) {
          console.error('[CourseDetail] No course ID provided');
          setLoading(false);
          return;
        }

        // Always use mock data for both dashboard and public pages (Phase 1-5 development)
        console.log('[CourseDetail] Loading course from mock data:', paramId);
        const mockCourse = getCourseById(parseInt(paramId));
        if (mockCourse) {
          setCourse(mockCourse);
          setLessons(getCourseLessons(mockCourse.id) || []);
          console.log('[CourseDetail] Course loaded from mock data:', mockCourse.title);
        } else {
          console.error('[CourseDetail] Course not found in mock data:', paramId);
        }

        // Fetch enrollment and progress data for dashboard
        if (isDashboard) {
          try {
            const enrollmentData = await coursesAPI.getEnrollment(paramId);
            setEnrollment(enrollmentData);

            // Fetch lesson progress for all lessons
            const allProgressData = await progressAPI.getAllLessonProgress();
            const progressMap = {};
            (allProgressData.results || allProgressData).forEach((progress) => {
              const lessonId = progress?.lesson?.id ?? progress?.lesson;
              if (lessonId != null) progressMap[lessonId] = progress;
            });
            setLessonProgress(progressMap);
          } catch (error) {
            if (error.response?.status !== 401) {
              console.warn('[CourseDetail] Non-critical API error:', error.message);
            } else {
              console.error('[CourseDetail] Authentication error:', error);
            }
          }
        }
      } catch (error) {
        console.error('Failed to fetch course:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [paramId, isDashboard]);

  const handleCreateLesson = async (e) => {
    e.preventDefault();
    setAddLessonError('');

    const coursePk = paramId;
    if (!lessonForm.title.trim()) return setAddLessonError('Title is required');
    if (!lessonForm.order || Number.isNaN(Number(lessonForm.order))) return setAddLessonError('Order is required');
    if (!lessonForm.video) return setAddLessonError('Video file is required');

    setAddingLesson(true);
    try {
      const fd = new FormData();
      fd.append('course', String(coursePk));
      fd.append('title', lessonForm.title.trim());
      fd.append('description', lessonForm.description || '');
      if (lessonForm.duration !== '') fd.append('duration', String(lessonForm.duration));
      fd.append('order', String(parseInt(lessonForm.order, 10)));
      fd.append('is_free', lessonForm.is_free ? 'true' : 'false');
      if (lessonForm.video) fd.append('video', lessonForm.video);
      if (lessonForm.thumbnail) fd.append('thumbnail', lessonForm.thumbnail);
      lessonForm.signIds.forEach((sid) => fd.append('sign_ids', String(sid)));

      await coursesAPI.createLesson(fd);

      // Refresh course + lessons after creation
      const courseData = await coursesAPI.getCourse(coursePk);
      setCourse(courseData);
      setLessons(courseData.lessons || []);

      setAddLessonOpen(false);
      setLessonForm({
        title: '',
        description: '',
        duration: '',
        order: '',
        is_free: false,
        video: null,
        thumbnail: null,
        signIds: [],
      });
    } catch (error) {
      console.error('[CourseDetail] Add lesson failed:', error);
      const payload = error?.response?.data;
      setAddLessonError(
        typeof payload === 'string'
          ? payload
          : payload?.error || payload?.detail || 'Failed to add lesson. Please check your input.'
      );
    } finally {
      setAddingLesson(false);
    }
  };

  const handleUpdateCourseThumbnail = async () => {
    setCourseUpdateError('');
    if (!courseThumbnailFile) {
      setCourseUpdateError('Please select an image file');
      return;
    }

    setUpdatingCourse(true);
    try {
      await coursesAPI.updateCourseThumbnail(paramId, courseThumbnailFile);
      const courseData = await coursesAPI.getCourse(paramId);
      setCourse(courseData);
      setCourseThumbnailFile(null);
    } catch (error) {
      console.error('[CourseDetail] Update course thumbnail failed:', error);
      const payload = error?.response?.data;
      setCourseUpdateError(
        typeof payload === 'string'
          ? payload
          : payload?.error || payload?.detail || 'Failed to update thumbnail'
      );
    } finally {
      setUpdatingCourse(false);
    }
  };

  const handleEnroll = async () => {
    setEnrolling(true);
    try {
      if (!isDashboard) {
        await coursesAPI.enrollInCourse(id);
        navigate('/learn');
      } else {
        // Navigate to next lesson in dashboard
        const nextLesson = getNextLesson();
        if (nextLesson) {
          navigate(`/lesson/${nextLesson.id}`);
        }
      }
    } catch (error) {
      console.error('Failed to enroll:', error);
      alert('Failed to enroll. Please try again.');
    } finally {
      setEnrolling(false);
    }
  };

  // Determine if a lesson is unlocked
  // First lesson is always unlocked, others depend on previous lesson completion
  const isLessonUnlocked = (index) => {
    if (index === 0) return true; // First lesson always unlocked
    const prevLesson = lessons[index - 1];
    return lessonProgress[prevLesson.id]?.is_completed || false;
  };

  // Get lesson status
  const getLessonStatus = (lessonId, index) => {
    if (!isLessonUnlocked(index)) return 'locked';
    if (lessonProgress[lessonId]?.is_completed) return 'completed';
    return 'unlocked';
  };

  // Calculate overall course progress
  const calculateProgress = () => {
    if (lessons.length === 0) return 0;
    const completedCount = lessons.filter((lesson) => lessonProgress[lesson.id]?.is_completed).length;
    return Math.round((completedCount / lessons.length) * 100);
  };

  // Get next unlocked lesson
  const getNextLesson = () => {
    for (let i = 0; i < lessons.length; i++) {
      if (isLessonUnlocked(i) && !lessonProgress[lessons[i].id]?.is_completed) {
        return lessons[i];
      }
    }
    return null;
  };

  if (loading) {
    return <Loader />;
  }

  if (!course) {
    return (
      <div className="p-8">
        <p className="text-red-600 text-lg mb-4">Course not found.</p>
        <Link to={isDashboard ? '/learn' : '/courses'} className="text-primary-600 hover:text-primary-700 font-medium">
          ← Back to {isDashboard ? 'Courses' : 'All Courses'}
        </Link>
      </div>
    );
  }

  const progress = calculateProgress();
  const nextLesson = getNextLesson();

  return (
    <div className={isDashboard ? '' : 'min-h-screen'}>
      {/* Header */}
      <div className={isDashboard ? 'p-8' : 'bg-gradient-to-b from-primary-500 to-primary-600 text-white py-12'}>
        <Link
          to={isDashboard ? '/learn' : '/courses'}
          className={`font-medium mb-4 inline-block ${isDashboard ? 'text-primary-600 hover:text-primary-700' : 'text-white/80 hover:text-white'}`}
        >
          ← Back to Courses
        </Link>
        <h1 className={`text-4xl font-black mb-3 ${isDashboard ? 'text-dark-500' : ''}`}>{course.title}</h1>
        <p className={`text-lg ${isDashboard ? 'text-gray-600' : 'opacity-90'}`}>
          {course.description || ''}
        </p>
      </div>

      <div className={isDashboard ? '' : 'bg-gray-50'}>
        <div className={`grid grid-cols-1 lg:grid-cols-3 gap-8 ${isDashboard ? '' : 'max-w-6xl mx-auto py-12 px-8'}`}>
          {/* Main Content */}
          <div className={isDashboard ? 'p-8 lg:col-span-2' : 'lg:col-span-2'}>
            {/* Course Description */}
            <div className={`rounded-lg p-8 ${isDashboard ? 'bg-white shadow-sm border border-gray-200' : 'bg-white shadow-md'}`}>
              <h2 className="text-2xl font-bold text-dark-500 mb-4">About this Course</h2>
              <p className="text-gray-700 leading-relaxed mb-6">{course.description}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-gray-200">
                <div>
                  <p className="text-sm text-gray-600">Duration</p>
                  <p className="font-bold text-dark-500">{course.duration_hours} hrs</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Level</p>
                  <p className="font-bold text-dark-500">{course.difficulty_display || course.difficulty_level}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Students</p>
                  <p className="font-bold text-dark-500">{course.enrolled_count}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Rating</p>
                  <p className="font-bold text-dark-500"><FaStar className="inline-block mr-1" /> {course.rating}</p>
                </div>
              </div>
            </div>

            {/* Progress Bar - Only show on dashboard */}
            {isDashboard && (
              <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-8 mt-8">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-bold text-dark-500">Your Progress</h3>
                  <span className="text-2xl font-black text-primary-600">{progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-primary-500 to-primary-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {lessons.filter((l) => lessonProgress[l.id]?.is_completed).length} of {lessons.length} lessons completed
                </p>
              </div>
            )}

            {/* Lessons */}
            <div className={`rounded-lg p-8 mt-8 ${isDashboard ? 'bg-white shadow-sm border border-gray-200' : 'bg-white shadow-md'}`}>
              <div className="flex items-center justify-between gap-4 mb-6">
                <h2 className="text-2xl font-bold text-dark-500">Course Lessons</h2>
                {isDashboard && (
                  <button
                    type="button"
                    onClick={() => setAddLessonOpen(true)}
                    className="px-4 py-2 bg-primary-500 text-white rounded-lg font-bold hover:bg-primary-600 disabled:opacity-75"
                  >
                    + Add Lesson
                  </button>
                )}
              </div>
              <div className="space-y-4">
                {lessons.map((lesson, idx) => {
                  const status = getLessonStatus(lesson.id, idx);
                  const isUnlocked = isLessonUnlocked(idx);
                  const isCompleted = lessonProgress[lesson.id]?.is_completed;

                  return (
                    <div
                      key={lesson.id}
                      className={`flex items-center justify-between p-4 rounded-lg border transition-all ${
                        status === 'locked'
                          ? 'bg-gray-50 border-gray-200 opacity-60'
                          : status === 'completed'
                          ? 'bg-success-50 border-success-200 hover:border-success-300'
                          : 'border-gray-200 hover:border-primary-300 hover:bg-primary-50'
                      }`}
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div
                          className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${
                            status === 'completed'
                              ? 'bg-success-100 text-success-600'
                              : status === 'locked'
                              ? 'bg-gray-200 text-gray-500'
                              : 'bg-primary-100 text-primary-600'
                          }`}
                        >
                          {status === 'locked' ? '🔒' : status === 'completed' ? '✅' : idx + 1}
                        </div>
                        <div>
                          <p className={`font-bold ${status === 'locked' ? 'text-gray-500' : 'text-dark-500'}`}>
                            {lesson.title}
                          </p>
                          <p className={`text-sm ${status === 'locked' ? 'text-gray-400' : 'text-gray-600'}`}>
                            ⏱️ {lesson.duration}
                          </p>
                          {status === 'locked' && (
                            <p className="text-xs text-gray-500 mt-1">Complete previous lesson to unlock</p>
                          )}
                        </div>
                      </div>
                      {isDashboard ? (
                        <>
                          {isUnlocked ? (
                            <Link
                              to={`/lesson/${lesson.id}`}
                              className={`px-4 py-2 rounded-lg font-bold transition-all ${
                                isCompleted
                                  ? 'bg-success-100 text-success-600 hover:bg-success-200'
                                  : 'bg-primary-500 text-white hover:bg-primary-600'
                              }`}
                            >
                              {isCompleted ? 'Review' : 'Start'}
                            </Link>
                          ) : (
                            <span className="text-gray-500 text-sm font-medium">Locked</span>
                          )}
                        </>
                      ) : (
                        <span className="text-gray-600">Lesson {idx + 1}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className={isDashboard ? 'p-8' : 'lg:col-span-1'}>
            <div className={`rounded-lg p-8 sticky top-8 ${isDashboard ? 'bg-white shadow-sm border border-gray-200' : 'bg-white shadow-md'}`}>
              <div className="text-center mb-6">
                {course.thumbnail ? (
                  <img
                    src={toAbsoluteMediaUrl(course.thumbnail)}
                    alt={course.title}
                    className="w-24 h-24 rounded-lg object-cover mx-auto mb-4"
                  />
                ) : (
                  <div className="text-6xl mb-4">📚</div>
                )}
                <h3 className="text-lg font-bold text-dark-500 mb-2">{course.title}</h3>
                <p className="text-sm text-gray-600">Instructor: {course.instructor}</p>
              </div>

              {isDashboard && (
                <div className="mb-6">
                  <h4 className="text-sm font-bold text-dark-500 mb-2">Course Image</h4>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setCourseThumbnailFile(e.target.files?.[0] || null)}
                    className="w-full text-sm text-gray-700"
                    disabled={updatingCourse}
                  />
                  {courseUpdateError && (
                    <div className="mt-2 text-sm text-red-600 font-medium">{courseUpdateError}</div>
                  )}
                  <button
                    type="button"
                    onClick={handleUpdateCourseThumbnail}
                    disabled={updatingCourse || !courseThumbnailFile}
                    className="w-full mt-3 px-4 py-2 bg-gray-100 text-gray-800 rounded-lg font-bold hover:bg-gray-200 disabled:opacity-60"
                  >
                    {updatingCourse ? 'Updating...' : 'Update Image'}
                  </button>
                </div>
              )}

              {isDashboard && nextLesson && (
                <div className="mb-6 p-4 bg-primary-50 rounded-lg border border-primary-200">
                  <p className="text-xs text-primary-600 font-bold uppercase tracking-wider mb-2">Next Lesson</p>
                  <p className="text-sm font-bold text-dark-500">{nextLesson.title}</p>
                </div>
              )}

              <button
                onClick={handleEnroll}
                disabled={enrolling}
                className="w-full px-6 py-3 bg-primary-500 text-white rounded-lg font-bold hover:bg-primary-600 active:bg-primary-700 hover:scale-105 active:scale-100 transition-all duration-300 min-h-[56px] disabled:opacity-75"
              >
                {isDashboard ? (nextLesson ? 'Continue Lesson' : 'Course Complete! 🎉') : 'Enroll Now'}
              </button>

              {isDashboard && (
                <button
                  onClick={() => navigate('/learn')}
                  className="w-full mt-3 px-6 py-3 border-2 border-primary-500 text-primary-600 rounded-lg font-bold hover:bg-primary-50 transition-all"
                >
                  Back to Courses
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add lesson modal (dashboard only) */}
      {isDashboard && addLessonOpen && (
        <div className="fixed inset-0 z-[200] bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-3xl rounded-2xl shadow-xl overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl font-black text-dark-500">Add Lesson</h3>
                <p className="text-sm text-gray-600 mt-1">Upload lesson video and optional thumbnail/signs.</p>
              </div>
              <button
                type="button"
                onClick={() => setAddLessonOpen(false)}
                className="px-3 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 font-bold"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateLesson} className="p-6">
              {addLessonError && (
                <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 font-medium rounded-lg">
                  {addLessonError}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1">
                  <label className="text-sm font-bold text-dark-500 block mb-2">Title</label>
                  <input
                    value={lessonForm.title}
                    onChange={(e) => setLessonForm((p) => ({ ...p, title: e.target.value }))}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                    required
                  />
                </div>
                <div className="col-span-1">
                  <label className="text-sm font-bold text-dark-500 block mb-2">Order</label>
                  <input
                    type="number"
                    value={lessonForm.order}
                    onChange={(e) => setLessonForm((p) => ({ ...p, order: e.target.value }))}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                    required
                  />
                </div>

                <div className="col-span-1">
                  <label className="text-sm font-bold text-dark-500 block mb-2">Duration (seconds)</label>
                  <input
                    type="number"
                    value={lessonForm.duration}
                    onChange={(e) => setLessonForm((p) => ({ ...p, duration: e.target.value }))}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                  />
                </div>

                <div className="col-span-1 flex items-center gap-3">
                  <label className="text-sm font-bold text-dark-500">Free access</label>
                  <input
                    type="checkbox"
                    checked={lessonForm.is_free}
                    onChange={(e) => setLessonForm((p) => ({ ...p, is_free: e.target.checked }))}
                  />
                </div>

                <div className="col-span-2">
                  <label className="text-sm font-bold text-dark-500 block mb-2">Description</label>
                  <textarea
                    value={lessonForm.description}
                    onChange={(e) => setLessonForm((p) => ({ ...p, description: e.target.value }))}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                    rows={3}
                  />
                </div>

                <div className="col-span-1">
                  <label className="text-sm font-bold text-dark-500 block mb-2">Video file</label>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => setLessonForm((p) => ({ ...p, video: e.target.files?.[0] || null }))}
                    className="w-full"
                    required
                  />
                </div>

                <div className="col-span-1">
                  <label className="text-sm font-bold text-dark-500 block mb-2">Thumbnail (optional)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setLessonForm((p) => ({ ...p, thumbnail: e.target.files?.[0] || null }))}
                    className="w-full"
                  />
                </div>

                <div className="col-span-2">
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <label className="text-sm font-bold text-dark-500">Signs (optional)</label>
                    {signsLoading && <span className="text-sm text-gray-500">Loading...</span>}
                  </div>

                  <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-xl p-3 bg-gray-50">
                    {signs.length === 0 && !signsLoading ? (
                      <div className="text-sm text-gray-600">No signs loaded.</div>
                    ) : (
                      signs.map((s) => {
                        const checked = lessonForm.signIds.includes(s.id);
                        return (
                          <label key={s.id} className="flex items-center gap-3 py-2">
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={(e) => {
                                const isChecked = e.target.checked;
                                setLessonForm((p) => ({
                                  ...p,
                                  signIds: isChecked
                                    ? [...p.signIds, s.id]
                                    : p.signIds.filter((x) => x !== s.id),
                                }));
                              }}
                            />
                            <span className="font-bold text-gray-800">{s.word}</span>
                            <span className="text-xs text-gray-500 ml-auto">{s.difficulty_display || s.difficulty_level}</span>
                          </label>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setAddLessonOpen(false)}
                  className="px-5 py-3 border-2 border-gray-200 rounded-lg font-bold hover:bg-gray-50"
                  disabled={addingLesson}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={addingLesson || signsLoading}
                  className="px-5 py-3 bg-primary-500 text-white rounded-lg font-bold hover:bg-primary-600 disabled:opacity-75"
                >
                  {addingLesson ? 'Adding...' : 'Add Lesson'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetail;

