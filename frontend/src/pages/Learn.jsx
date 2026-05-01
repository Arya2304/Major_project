import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AccessibleButton from '../components/common/AccessibleButton';
import { coursesAPI } from '../api/courses';
import { progressAPI } from '../api/progress';
import { FaBook, FaGraduationCap, FaBullseye, FaStar, FaSearch, FaClock, FaChartBar } from 'react-icons/fa';

/**
 * Learn.jsx — Phase 4
 * Post-login learning hub page ("My Learning")
 * Shows enrolled courses, progress, and next lessons
 */

const Learn = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // Get actual user from auth context
  const [dictionarySearch, setDictionarySearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [lessonProgressMap, setLessonProgressMap] = useState({});

  // Get actual user name from authenticated user
  const userName = user?.first_name || user?.email?.split('@')[0] || 'Learner';

  useEffect(() => {
    const loadLearningData = async () => {
      setLoading(true);
      try {
        const [myCoursesData, allProgressData] = await Promise.all([
          coursesAPI.getMyCourses(),
          progressAPI.getAllLessonProgress(),
        ]);

        const myCourses = (myCoursesData || []).map((enrollment) => ({
          ...enrollment.course,
          enrollment,
          lessons: enrollment.course?.lessons || [],
        }));
        setEnrolledCourses(myCourses);

        const progressItems = allProgressData?.results || allProgressData || [];
        const nextProgressMap = {};
        progressItems.forEach((item) => {
          const lessonId = item?.lesson?.id ?? item?.lesson;
          if (lessonId != null) nextProgressMap[lessonId] = item;
        });
        setLessonProgressMap(nextProgressMap);
      } catch (error) {
        console.error('[Learn] Failed to load data:', error);
        setEnrolledCourses([]);
        setLessonProgressMap({});
      } finally {
        setLoading(false);
      }
    };

    loadLearningData();
  }, []);

  const getCourseProgress = (course) => {
    const lessons = course?.lessons || [];
    const completedCount = lessons.filter((lesson) => lessonProgressMap[lesson.id]?.is_completed).length;
    const totalCount = lessons.length;
    const percentage = totalCount ? Math.round((completedCount / totalCount) * 100) : 0;
    return { completedCount, totalCount, percentage };
  };

  const getNextIncompleteLesson = (course) => {
    const lessons = [...(course?.lessons || [])].sort((a, b) => (a.order || 0) - (b.order || 0));
    return lessons.find((lesson) => !lessonProgressMap[lesson.id]?.is_completed) || lessons[0] || null;
  };

  const lastCourse = enrolledCourses[0] || null;
  const lastCourseProgress = lastCourse ? getCourseProgress(lastCourse) : { completedCount: 0, totalCount: 0, percentage: 0 };
  const lastCourseNextLesson = lastCourse ? getNextIncompleteLesson(lastCourse) : null;

  const nextLessonCourse = enrolledCourses[1] || null;
  const nextSuggestedLesson = nextLessonCourse ? getNextIncompleteLesson(nextLessonCourse) : null;

  const overallStats = useMemo(() => {
    const progressList = enrolledCourses.map((course) => getCourseProgress(course));
    const completedLessons = progressList.reduce((sum, p) => sum + p.completedCount, 0);
    const totalLessons = progressList.reduce((sum, p) => sum + p.totalCount, 0);
    const overallProgress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
    return { completedLessons, totalLessons, overallProgress };
  }, [enrolledCourses, lessonProgressMap]);

  const handleGoToLesson = (lessonId, courseId) => {
    navigate(`/lesson/${lessonId}?course=${courseId}`);
  };

  const handleDictionarySearch = () => {
    if (dictionarySearch.trim()) {
      navigate(`/dictionary?search=${encodeURIComponent(dictionarySearch)}`);
    } else {
      navigate('/dictionary');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-primary-500 to-accent-500 py-12">
        <div className="page-container">
          <h1 className="text-4xl font-black text-white mb-2">
            Welcome back, {userName}! 
            <span className="inline-block ml-2" aria-label="waving hand">👋</span>
          </h1>
          <p className="text-lg text-primary-100">
            Continue your journey learning Indian Sign Language
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="page-container py-12">
        {loading && (
          <div className="mb-8 bg-white border border-gray-200 rounded-xl p-6 text-gray-700 font-semibold">
            Loading your learning dashboard...
          </div>
        )}
        {/* Continue Learning Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            <FaBook className="inline-block mr-2" /> Continue Learning
          </h2>
          {lastCourse && (
            <div className="bg-gradient-to-br from-primary-50 to-accent-50 border-2 border-primary-200 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                {/* Course Emoji Thumbnail */}
                <div className="flex justify-center">
                  <div className="text-8xl"><FaGraduationCap className="text-center mx-auto" style={{fontSize: '5rem'}} /></div>
                </div>

                {/* Course Info */}
                <div className="md:col-span-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{lastCourse.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{lastCourse.description}</p>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-700">Progress</span>
                      <span className="text-sm font-bold text-primary-600">{lastCourseProgress.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-primary-500 to-accent-500 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${lastCourseProgress.percentage}%` }}
                      />
                    </div>
                  </div>

                  {/* Course Meta */}
                  <div className="flex flex-wrap gap-3 mb-4">
                    <span className="inline-block px-3 py-1 bg-primary-200 text-primary-800 rounded-full text-xs font-bold">
                      {lastCourseProgress.completedCount} of {lastCourseProgress.totalCount} lessons
                    </span>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                      (lastCourse.difficulty_display || '').toLowerCase() === 'beginner'
                        ? 'bg-green-100 text-green-800'
                        : (lastCourse.difficulty_display || '').toLowerCase() === 'intermediate'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {lastCourse.difficulty_display || lastCourse.difficulty_level}
                    </span>
                  </div>
                </div>

                {/* Continue Button */}
                <div className="flex justify-center md:justify-end">
                  <AccessibleButton
                    variant="primary"
                    onClick={() => handleGoToLesson(lastCourseNextLesson?.id, lastCourse.id)}
                    className="text-lg px-8 py-4"
                  >
                    <span>▶️</span> Continue Course
                  </AccessibleButton>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* My Enrolled Courses Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            <FaBullseye className="inline-block mr-2" /> My Enrolled Courses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map((course) => {
              const courseProgress = getCourseProgress(course);
              const courseNextLesson = getNextIncompleteLesson(course);
              const isStarted = courseProgress.completedCount > 0;
              const isCompleted = courseProgress.completedCount === courseProgress.totalCount && courseProgress.totalCount > 0;

              return (
                <div
                  key={course.id}
                  className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-primary-300 transition-all"
                >
                  {/* Course Emoji Header */}
                  <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-8 text-center">
                    <div style={{fontSize: '3rem'}}><FaBook className="text-center mx-auto" style={{fontSize: '3rem'}} /></div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-gray-700">Progress</span>
                        <span className="text-xs font-bold text-primary-600">{courseProgress.completedCount} of {courseProgress.totalCount}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${courseProgress.percentage}%` }}
                        />
                      </div>
                    </div>

                    {/* Difficulty Badge */}
                    <div className="mb-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                        (course.difficulty_display || '').toLowerCase() === 'beginner'
                          ? 'bg-green-100 text-green-800'
                          : (course.difficulty_display || '').toLowerCase() === 'intermediate'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {course.difficulty_display || course.difficulty_level}
                      </span>
                    </div>

                    {/* Button */}
                    <AccessibleButton
                      variant="primary"
                      onClick={() => courseNextLesson && handleGoToLesson(courseNextLesson.id, course.id)}
                      disabled={!courseNextLesson}
                      className={`w-full text-sm ${!courseNextLesson ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {isCompleted ? '✓ Completed' : isStarted ? 'Continue →' : 'Start →'}
                    </AccessibleButton>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Suggested Next Lesson Section */}
        {nextSuggestedLesson && nextLessonCourse && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              <FaStar className="inline-block mr-2" /> Suggested Next Lesson
            </h2>
            <div className="bg-gradient-to-r from-primary-100 to-accent-100 border-2 border-accent-300 rounded-xl p-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Icon */}
                <div className="text-7xl"><FaStar className="inline-block" style={{fontSize: '4rem'}} /></div>

                {/* Lesson Info */}
                <div className="flex-1">
                  <p className="text-sm font-semibold text-accent-700 mb-2 uppercase tracking-wide">Next Up</p>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{nextSuggestedLesson.title}</h3>
                  <p className="text-gray-700 mb-4">{nextLessonCourse.title}</p>

                  {/* Meta */}
                  <div className="flex flex-wrap gap-4 text-sm text-gray-700">
                    <span><FaClock className="inline-block mr-1" /> {nextSuggestedLesson.duration || 10} min</span>
                    <span><FaChartBar className="inline-block mr-1" /> {nextLessonCourse.difficulty_display || nextLessonCourse.difficulty_level || 'Beginner'}</span>
                    <span><FaStar className="inline-block mr-1" /> {(nextSuggestedLesson.signs || []).length || 3} key points</span>
                  </div>
                </div>

                {/* Button */}
                <AccessibleButton
                  variant="primary"
                  onClick={() => handleGoToLesson(nextSuggestedLesson.id, nextLessonCourse.id)}
                  className="px-8 py-3"
                >
                  Go to Lesson →
                </AccessibleButton>
              </div>
            </div>
          </section>
        )}

        {/* Quick Dictionary Access Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            <FaBook className="inline-block mr-2" /> Quick Dictionary Access
          </h2>
          <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-8">
            <p className="text-gray-700 mb-6">
              Need to look up a sign? Search our comprehensive ISL Sign Dictionary.
            </p>

            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Search for a sign (e.g., 'hello', 'thank you')..."
                value={dictionarySearch}
                onChange={(e) => setDictionarySearch(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleDictionarySearch()}
                className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                aria-label="Search dictionary"
              />
              <AccessibleButton
                variant="primary"
                onClick={handleDictionarySearch}
              >
                <FaSearch className="inline-block mr-1" /> Search
              </AccessibleButton>
            </div>

            {/* Info */}
            <p className="text-sm text-gray-600 mt-4">
              Or <AccessibleButton 
                variant="ghost" 
                onClick={() => navigate('/dictionary')}
                className="inline px-2 py-0 underline"
              >
                browse the full dictionary
              </AccessibleButton>
            </p>
          </div>
        </section>
      </div>

      {/* Stats Footer */}
      <div className="bg-gray-50 py-12 mt-16">
        <div className="page-container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Stat Cards */}
            <div className="text-center">
              <div className="text-4xl font-black text-primary-600 mb-2">
                {enrolledCourses.length}
              </div>
              <p className="text-gray-700 font-semibold">Courses Enrolled</p>
            </div>

            <div className="text-center">
              <div className="text-4xl font-black text-accent-600 mb-2">
                {overallStats.overallProgress}%
              </div>
              <p className="text-gray-700 font-semibold">Overall Progress</p>
            </div>

            <div className="text-center">
              <div className="text-4xl font-black text-green-600 mb-2">
                {overallStats.completedLessons}/{overallStats.totalLessons}
              </div>
              <p className="text-gray-700 font-semibold">Lessons Completed</p>
            </div>

            <div className="text-center">
              <div className="text-4xl font-black text-blue-600 mb-2">
                {overallStats.completedLessons * 10}
              </div>
              <p className="text-gray-700 font-semibold">Learning Points</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learn;
