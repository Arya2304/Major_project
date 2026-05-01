import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import AccessibleButton from '../components/common/AccessibleButton';
import { mockCourses, getCourseLessons } from '../data/mockData';

/**
 * Courses.jsx — Phase 3
 * Browse and filter all available sign language courses
 * Features: Search, language filters (pills), difficulty, sorting
 * Uses mockData for demo/development
 * NOTE: Wrapped by PublicLayout in AppRoutes, so no layout wrapper needed
 */
const Courses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState(''); // '' = All
  const [selectedDifficulty, setSelectedDifficulty] = useState(''); // '' = All
  const [sortBy, setSortBy] = useState('popular'); // 'popular', 'newest', 'rating'

  // Language filter options
  const languages = [
    { code: '', label: 'All Languages', emoji: '🌍' },
    { code: 'ISL', label: 'Indian Sign Language', emoji: '🇮🇳' },
    { code: 'ASL', label: 'American Sign Language', emoji: '🇺🇸' },
    { code: 'BSL', label: 'British Sign Language', emoji: '🇬🇧' },
  ];

  // Difficulty options
  const difficulties = [
    { value: '', label: 'All Levels' },
    { value: 'Beginner', label: 'Beginner' },
    { value: 'Intermediate', label: 'Intermediate' },
    { value: 'Advanced', label: 'Advanced' },
  ];

  // Filter and sort courses
  const filteredCourses = useMemo(() => {
    let result = mockCourses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.subtitle.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLanguage = !selectedLanguage || course.language === selectedLanguage;
      const matchesDifficulty = !selectedDifficulty || course.difficulty === selectedDifficulty;
      return matchesSearch && matchesLanguage && matchesDifficulty;
    });

    // Sort
    if (sortBy === 'newest') {
      result.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    } else if (sortBy === 'rating') {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else {
      // popular (by students)
      result.sort((a, b) => (b.students || 0) - (a.students || 0));
    }

    return result;
  }, [searchTerm, selectedLanguage, selectedDifficulty, sortBy]);

  return (
    <>
      {/* ========== PAGE HEADER ========== */}
      <section className="bg-gradient-to-r from-primary-500 to-primary-600 text-white section-gap">
        <div className="page-container">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-4">📚 All Courses</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl">
            Choose from {mockCourses.length} comprehensive courses in ISL, ASL, and BSL. Learn at your own pace.
          </p>
        </div>
      </section>

      {/* ========== FILTERS & SEARCH ========== */}
      <section className="bg-white section-gap border-b border-gray-200">
        <div className="page-container">
          {/* Search Bar */}
          <div className="mb-8">
            <label htmlFor="course-search" className="block text-sm font-bold text-gray-700 mb-2">
              🔍 Search Courses
            </label>
            <input
              id="course-search"
              type="text"
              placeholder="Search by course name, instructor, topic..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all font-base"
              aria-label="Search courses"
            />
          </div>

          {/* Language Filter Pills */}
          <div className="mb-8">
            <label className="block text-sm font-bold text-gray-700 mb-3">🌍 Language</label>
            <div className="flex flex-wrap gap-3">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setSelectedLanguage(lang.code)}
                  aria-label={`Filter by ${lang.label}`}
                  className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 border-2 ${
                    selectedLanguage === lang.code
                      ? 'bg-primary-500 text-white border-primary-500'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-primary-500'
                  }`}
                >
                  {lang.emoji} {lang.label}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty & Sort Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Difficulty Filter */}
            <div>
              <label htmlFor="difficulty-select" className="block text-sm font-bold text-gray-700 mb-2">
                📊 Difficulty
              </label>
              <select
                id="difficulty-select"
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-xl text-gray-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
                aria-label="Filter by difficulty"
              >
                {difficulties.map((diff) => (
                  <option key={diff.value} value={diff.value}>
                    {diff.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <label htmlFor="sort-select" className="block text-sm font-bold text-gray-700 mb-2">
                📈 Sort By
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-xl text-gray-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
                aria-label="Sort courses"
              >
                <option value="popular">Most Popular</option>
                <option value="newest">Newest</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <p className="text-sm text-gray-600 mt-6 font-medium">
            {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''} found
          </p>
        </div>
      </section>

      {/* ========== COURSES GRID ========== */}
      <section className="bg-gray-50 section-gap">
        <div className="page-container">
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course) => (
                <Link
                  key={course.id}
                  to={`/courses/${course.id}`}
                  className="card-hover group overflow-hidden flex flex-col"
                >
                  {/* Course Thumbnail */}
                  <div className="aspect-video bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-6xl relative overflow-hidden">
                    {course.thumbnail || '📚'}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  </div>

                  {/* Course Content */}
                  <div className="p-6 flex flex-col flex-1">
                    {/* Language Badge */}
                    <div className="mb-3 flex items-center gap-2">
                      <span className={`lang-badge-${course.language.toLowerCase()}`}>
                        {course.language}
                      </span>
                      {course.difficulty && (
                        <span className="text-xs font-bold text-accent-600 bg-accent-100 px-2 py-1 rounded-full">
                          {course.difficulty}
                        </span>
                      )}
                    </div>

                    {/* Title & Subtitle */}
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 flex-1">{course.subtitle}</p>

                    {/* Course Meta */}
                    <div className="grid grid-cols-3 gap-4 text-center text-sm border-t border-gray-200 pt-4">
                      <div>
                        <p className="font-bold text-gray-900">{getCourseLessons(course.id).length || 0}</p>
                        <p className="text-xs text-gray-500">Lessons</p>
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{course.duration || '0'} hrs</p>
                        <p className="text-xs text-gray-500">Duration</p>
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">⭐ {course.rating || '4.8'}</p>
                        <p className="text-xs text-gray-500">Rating</p>
                      </div>
                    </div>

                    {/* Students Count */}
                    <p className="text-xs text-gray-500 mt-4 text-center">
                      👥 {course.students || 0} students
                    </p>
                  </div>

                  {/* CTA Button */}
                  <div className="px-6 pb-6 pt-0">
                    <AccessibleButton
                      variant="primary"
                      size="md"
                      className="w-full"
                      onClick={(e) => {
                        e.preventDefault();
                        // Navigate handled by Link href
                      }}
                    >
                      View Course →
                    </AccessibleButton>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center card">
              <p className="text-2xl mb-4">🔍</p>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Courses Found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search or filter criteria
              </p>
              <AccessibleButton
                variant="primary"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedLanguage('');
                  setSelectedDifficulty('');
                }}
              >
                Clear Filters
              </AccessibleButton>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Courses;

