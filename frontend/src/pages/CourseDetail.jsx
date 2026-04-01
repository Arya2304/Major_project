import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { coursesAPI } from '../api/courses';
import { progressAPI } from '../api/progress';
import { getCourseById } from '../data/mockData';
import Loader from '../components/common/Loader';
import './CourseDetail.css';

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

  // Determine if we're in dashboard (using mock data) or on public page (using API)
  const isDashboard = location.pathname.includes('/learn/');
  const paramId = courseId || id;

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

        if (isDashboard) {
          // Use mock data for dashboard
          console.log('[CourseDetail] Loading dashboard course:', paramId);
          const mockCourse = getCourseById(parseInt(paramId));
          if (mockCourse) {
            setCourse(mockCourse);
            setLessons(mockCourse.lessons || []);
            console.log('[CourseDetail] Course loaded from mock data:', mockCourse.title);
          } else {
            console.error('[CourseDetail] Course not found in mock data:', paramId);
          }
        } else {
          // Use API for public course detail
          console.log('[CourseDetail] Loading public course via API:', id);
          const [courseData, lessonsData] = await Promise.all([
            coursesAPI.getCourse(id),
            coursesAPI.getLessons({ course: id }),
          ]);
          setCourse(courseData);
          setLessons(lessonsData.results || lessonsData);
        }

        // Fetch enrollment and progress data for dashboard
        if (isDashboard) {
          try {
            console.log('[CourseDetail] Fetching enrollment and progress for:', paramId);
            const enrollmentData = await coursesAPI.getEnrollment(parseInt(paramId));
            setEnrollment(enrollmentData);

            // Fetch lesson progress for all lessons
            const allProgressData = await progressAPI.getAllLessonProgress();
            const progressMap = {};
            (allProgressData.results || allProgressData).forEach((progress) => {
              progressMap[progress.lesson] = progress;
            });
            setLessonProgress(progressMap);
            console.log('[CourseDetail] Progress data loaded successfully');
          } catch (error) {
            // Gracefully handle API errors - don't redirect, just log
            // This allows the page to still render with mock data
            if (error.response?.status !== 401) {
              console.warn('[CourseDetail] Non-critical API error (using mock data fallback):', error.message);
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
  }, [paramId, isDashboard, id]);

  const handleEnroll = async () => {
    setEnrolling(true);
    try {
      if (!isDashboard) {
        await coursesAPI.enrollInCourse(id);
        navigate('/dashboard');
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
        <p className={`text-lg ${isDashboard ? 'text-gray-600' : 'opacity-90'}`}>{course.subtitle}</p>
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
                  <p className="font-bold text-dark-500">{course.duration}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Level</p>
                  <p className="font-bold text-dark-500">{course.difficulty}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Students</p>
                  <p className="font-bold text-dark-500">{course.students}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Rating</p>
                  <p className="font-bold text-dark-500">⭐ {course.rating}</p>
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
              <h2 className="text-2xl font-bold text-dark-500 mb-6">Course Lessons</h2>
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
                <div className="text-6xl mb-4">{course.thumbnail}</div>
                <h3 className="text-lg font-bold text-dark-500 mb-2">{course.title}</h3>
                <p className="text-sm text-gray-600">Instructor: {course.instructor}</p>
              </div>

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
    </div>
  );
};

export default CourseDetail;

