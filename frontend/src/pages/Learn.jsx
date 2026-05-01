import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { coursesAPI } from '../api/courses';
import Loader from '../components/common/Loader';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8001';
const toAbsoluteMediaUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `${API_BASE_URL}${url}`;
};

const Learn = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');

  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const params = {};

        if (selectedLanguage !== 'All') params.language = selectedLanguage;

        const difficultyMap = {
          Beginner: '1',
          Intermediate: '2',
          Advanced: '3',
        };
        if (selectedLevel !== 'All') params.difficulty = difficultyMap[selectedLevel];

        // CourseListCreateView defaults to `published_only=true` so we only get published courses.
        const data = await coursesAPI.getCourses(params);
        setCourses(data?.results || data || []);
      } catch (error) {
        console.error('[Learn] Failed to fetch courses:', error);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [selectedLanguage, selectedLevel]);

  const languages = useMemo(() => {
    return ['All', ...new Set(courses.map((c) => c.language))];
  }, [courses]);

  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  if (loading) return <Loader />;

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
        {courses.map((course) => (
          <Link
            key={course.id}
            to={`/learn/${course.id}`}
            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 border border-gray-100 cursor-pointer group"
          >
            {/* Course Header */}
            <div className="h-28 bg-gradient-to-br from-primary-400 via-primary-500 to-primary-600 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-pattern"></div>
              {course.thumbnail ? (
                <img
                  src={toAbsoluteMediaUrl(course.thumbnail)}
                  alt={course.title}
                  className="w-full h-full object-cover opacity-95"
                />
              ) : (
                <span className="text-5xl drop-shadow-lg">📚</span>
              )}
            </div>

            {/* Course Content */}
            <div className="p-5">
              {/* Title and Badge */}
              <div className="flex items-start justify-between gap-3 mb-2">
                <h3 className="text-lg font-bold text-dark-500 group-hover:text-primary-600 transition-colors line-clamp-2">{course.title}</h3>
                <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-xs font-bold rounded-full whitespace-nowrap flex-shrink-0">
                  {course.difficulty_display || course.difficulty_level}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 mb-4 line-clamp-2 font-medium">
                {course.description?.slice(0, 90) || ''}
              </p>

              {/* Course Meta */}
              <div className="space-y-2 text-sm text-gray-500 mb-4 pb-4 border-b border-gray-100">
                <p className="flex items-center gap-2">
                  <span>🧑‍🏫</span>
                  <span className="font-medium">{course.instructor}</span>
                </p>
                <p className="flex items-center gap-2">
                  <span>⏱️</span>
                  <span className="font-medium">{course.duration_hours} hrs</span>
                </p>
                <p className="flex items-center gap-2">
                  <span>👥</span>
                  <span className="font-medium">{course.enrolled_count} learners</span>
                </p>
              </div>

              {/* Rating and Button */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-1">
                  <span className="text-yellow-400">⭐</span>
                  <span className="font-bold text-dark-500">{course.rating}</span>
                </div>
                  <span className="px-4 py-2 bg-primary-500 text-white rounded-lg font-bold hover:bg-primary-600 hover:shadow-md active:scale-95 transition-all duration-200 text-sm">
                    Start
                  </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {courses.length === 0 && (
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
