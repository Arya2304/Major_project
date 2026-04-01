import { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockCourses } from '../data/mockData';

const Learn = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');

  const languages = ['All', ...new Set(mockCourses.map((c) => c.language))];
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredCourses = mockCourses.filter((course) => {
    const matchLanguage = selectedLanguage === 'All' || course.language === selectedLanguage;
    const matchLevel = selectedLevel === 'All' || course.difficulty === selectedLevel;
    return matchLanguage && matchLevel;
  });

  return (
    <div className="p-8">
      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-5xl font-black text-dark-500 mb-2">📚 Learn Sign Language</h1>
        <p className="text-lg text-gray-600 font-medium">Choose from our comprehensive courses and start your journey today.</p>
      </div>

      {/* Filter Section */}
      <div className="mb-10 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Language Filter */}
          <div>
            <label className="block text-sm font-bold text-dark-500 mb-4">Language</label>
            <div className="flex flex-wrap gap-2">
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setSelectedLanguage(lang)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                    selectedLanguage === lang
                      ? 'bg-primary-500 text-white shadow-md scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-[1.02]'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          {/* Level Filter */}
          <div>
            <label className="block text-sm font-bold text-dark-500 mb-4">Difficulty Level</label>
            <div className="flex flex-wrap gap-2">
              {levels.map((level) => (
                <button
                  key={level}
                  onClick={() => setSelectedLevel(level)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                    selectedLevel === level ? 'bg-primary-500 text-white shadow-md scale-105' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-[1.02]'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <Link
            key={course.id}
            to={`/learn/${course.id}`}
            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 border border-gray-100 cursor-pointer group"
          >
            {/* Course Header */}
            <div className="h-28 bg-gradient-to-br from-primary-400 via-primary-500 to-primary-600 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-pattern"></div>
              <span className="text-5xl drop-shadow-lg">{course.thumbnail}</span>
            </div>

            {/* Course Content */}
            <div className="p-5">
              {/* Title and Badge */}
              <div className="flex items-start justify-between gap-3 mb-2">
                <h3 className="text-lg font-bold text-dark-500 group-hover:text-primary-600 transition-colors line-clamp-2">{course.title}</h3>
                <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-xs font-bold rounded-full whitespace-nowrap flex-shrink-0">
                  {course.difficulty}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 mb-4 line-clamp-2 font-medium">{course.subtitle}</p>

              {/* Course Meta */}
              <div className="space-y-2 text-sm text-gray-500 mb-4 pb-4 border-b border-gray-100">
                <p className="flex items-center gap-2">
                  <span>🧑‍🏫</span>
                  <span className="font-medium">{course.instructor}</span>
                </p>
                <p className="flex items-center gap-2">
                  <span>⏱️</span>
                  <span className="font-medium">{course.duration}</span>
                </p>
                <p className="flex items-center gap-2">
                  <span>👥</span>
                  <span className="font-medium">{course.students.toLocaleString()} students</span>
                </p>
              </div>

              {/* Rating and Button */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-1">
                  <span className="text-yellow-400">⭐</span>
                  <span className="font-bold text-dark-500">{course.rating}</span>
                </div>
                <button className="px-4 py-2 bg-primary-500 text-white rounded-lg font-bold hover:bg-primary-600 hover:shadow-md active:scale-95 transition-all duration-200 text-sm">
                  Start
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {filteredCourses.length === 0 && (
        <div className="text-center py-16">
          <p className="text-xl text-gray-600 font-medium mb-4">No courses found matching your filters.</p>
          <button
            onClick={() => {
              setSelectedLanguage('All');
              setSelectedLevel('All');
            }}
            className="px-6 py-3 bg-primary-500 text-white rounded-lg font-bold hover:bg-primary-600 hover:shadow-md active:scale-95 transition-all duration-200"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Learn;
