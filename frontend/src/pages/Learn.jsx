import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AccessibleButton from '../components/common/AccessibleButton';
import { mockCourses } from '../data/mockData';

/**
 * Learn.jsx — Phase 4
 * Post-login learning hub page ("My Learning")
 * Shows enrolled courses, progress, and next lessons
 */

const Learn = () => {
  const navigate = useNavigate();
  const [dictionarySearch, setDictionarySearch] = useState('');

  // Mock user data
  const userName = 'Arya'; // In real app, would come from AuthContext

  // Mock enrolled courses (first 3 from mockData)
  const enrolledCourses = mockCourses.slice(0, 3);
  
  // Get last course (for continue learning section)
  const lastCourse = enrolledCourses[0];
  const lastCourseProgress = 45; // Mock progress percentage

  // Get next suggested lesson (first lesson of second course)
  const nextSuggestedLesson = enrolledCourses[1]?.lessons[0];
  const nextLessonCourse = enrolledCourses[1];

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
            Welcome back, {userName}! 👋
          </h1>
          <p className="text-lg text-primary-100">
            Continue your journey learning Indian Sign Language
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="page-container py-12">
        {/* Continue Learning Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">📚 Continue Learning</h2>
          {lastCourse && (
            <div className="bg-gradient-to-br from-primary-50 to-accent-50 border-2 border-primary-200 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                {/* Course Emoji Thumbnail */}
                <div className="flex justify-center">
                  <div className="text-8xl">{lastCourse.emoji || '🎓'}</div>
                </div>

                {/* Course Info */}
                <div className="md:col-span-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{lastCourse.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{lastCourse.description}</p>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-700">Progress</span>
                      <span className="text-sm font-bold text-primary-600">{lastCourseProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-primary-500 to-accent-500 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${lastCourseProgress}%` }}
                      />
                    </div>
                  </div>

                  {/* Course Meta */}
                  <div className="flex flex-wrap gap-3 mb-4">
                    <span className="inline-block px-3 py-1 bg-primary-200 text-primary-800 rounded-full text-xs font-bold">
                      {lastCourse.lessons?.length || 0} lessons
                    </span>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                      lastCourse.difficulty === 'Beginner'
                        ? 'bg-green-100 text-green-800'
                        : lastCourse.difficulty === 'Intermediate'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {lastCourse.difficulty}
                    </span>
                  </div>
                </div>

                {/* Continue Button */}
                <div className="flex justify-center md:justify-end">
                  <AccessibleButton
                    variant="primary"
                    onClick={() => handleGoToLesson(lastCourse.lessons[0]?.id, lastCourse.id)}
                    className="text-lg px-8 py-4"
                  >
                    ▶️ Continue Course
                  </AccessibleButton>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* My Enrolled Courses Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🎯 My Enrolled Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map((course, index) => {
              const courseProgress = Math.max(20, 100 - index * 15); // Mock progression
              const isStarted = courseProgress > 0;

              return (
                <div
                  key={course.id}
                  className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-primary-300 transition-all"
                >
                  {/* Course Emoji Header */}
                  <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-8 text-center">
                    <div className="text-6xl">{course.emoji || '📚'}</div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-gray-700">Progress</span>
                        <span className="text-xs font-bold text-primary-600">{courseProgress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${courseProgress}%` }}
                        />
                      </div>
                    </div>

                    {/* Difficulty Badge */}
                    <div className="mb-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                        course.difficulty === 'Beginner'
                          ? 'bg-green-100 text-green-800'
                          : course.difficulty === 'Intermediate'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {course.difficulty}
                      </span>
                    </div>

                    {/* Button */}
                    <AccessibleButton
                      variant="primary"
                      onClick={() => handleGoToLesson(course.lessons[0]?.id, course.id)}
                      className="w-full text-sm"
                    >
                      {isStarted ? 'Continue →' : 'Start →'}
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
            <h2 className="text-2xl font-bold text-gray-900 mb-6">🌟 Suggested Next Lesson</h2>
            <div className="bg-gradient-to-r from-primary-100 to-accent-100 border-2 border-accent-300 rounded-xl p-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Icon */}
                <div className="text-7xl">✨</div>

                {/* Lesson Info */}
                <div className="flex-1">
                  <p className="text-sm font-semibold text-accent-700 mb-2 uppercase tracking-wide">Next Up</p>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{nextSuggestedLesson.title}</h3>
                  <p className="text-gray-700 mb-4">{nextLessonCourse.title}</p>

                  {/* Meta */}
                  <div className="flex flex-wrap gap-4 text-sm text-gray-700">
                    <span>⏱️ {nextSuggestedLesson.duration || 10} min</span>
                    <span>📊 {nextSuggestedLesson.difficulty || 'Beginner'}</span>
                    <span>⭐ {nextSuggestedLesson.learningPoints?.length || 3} key points</span>
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
          <h2 className="text-2xl font-bold text-gray-900 mb-6">📖 Quick Dictionary Access</h2>
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
                🔍 Search
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
                {Math.round(
                  (enrolledCourses.reduce((sum, course) => sum + (course.lessons?.length || 0), 0) / 50) * 100
                )}%
              </div>
              <p className="text-gray-700 font-semibold">Overall Progress</p>
            </div>

            <div className="text-center">
              <div className="text-4xl font-black text-green-600 mb-2">
                {enrolledCourses.reduce((sum, course) => sum + (course.lessons?.length || 0), 0)}
              </div>
              <p className="text-gray-700 font-semibold">Total Lessons</p>
            </div>

            <div className="text-center">
              <div className="text-4xl font-black text-blue-600 mb-2">
                {(enrolledCourses.length * 50)}
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
