import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { coursesAPI } from '../api/courses';
import CourseCard from '../components/courses/CourseCard';
import Loader from '../components/common/Loader';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    language: searchParams.get('language') || '',
    difficulty: searchParams.get('difficulty') || '',
    featured: searchParams.get('featured') || '',
  });

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const data = await coursesAPI.getCourses(filters);
        setCourses(data.results || data);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [filters]);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    setSearchParams(newFilters);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-dark-500">📚 Courses</h1>

        {/* Filters Section */}
        <div className="bg-white rounded-xl p-6 shadow-md mb-8 flex gap-6 flex-wrap">
          <div className="flex flex-col gap-2 flex-1 min-w-[200px]">
            <label htmlFor="language-filter" className="font-semibold text-dark-500">🌍 Language</label>
            <select
              id="language-filter"
              value={filters.language}
              onChange={(e) => handleFilterChange('language', e.target.value)}
              aria-label="Filter by language"
              className="px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
            >
              <option value="">All Languages</option>
              <option value="ASL">American Sign Language</option>
              <option value="ISL">Indian Sign Language</option>
              <option value="BSL">British Sign Language</option>
            </select>
          </div>

          <div className="flex flex-col gap-2 flex-1 min-w-[200px]">
            <label htmlFor="difficulty-filter" className="font-semibold text-dark-500">📊 Difficulty</label>
            <select
              id="difficulty-filter"
              value={filters.difficulty}
              onChange={(e) => handleFilterChange('difficulty', e.target.value)}
              aria-label="Filter by difficulty"
              className="px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
            >
              <option value="">All Levels</option>
              <option value="1">Beginner</option>
              <option value="2">Intermediate</option>
              <option value="3">Advanced</option>
            </select>
          </div>

          <div className="flex flex-col gap-2 flex-1 min-w-[200px]">
            <label htmlFor="featured-filter" className="font-semibold text-dark-500">⭐ Featured</label>
            <select
              id="featured-filter"
              value={filters.featured}
              onChange={(e) => handleFilterChange('featured', e.target.value)}
              aria-label="Filter featured courses"
              className="px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
            >
              <option value="">All Courses</option>
              <option value="true">Featured Only</option>
            </select>
          </div>
        </div>

        {/* Courses Grid */}
        {loading ? (
          <Loader />
        ) : courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl p-16 shadow-md text-center">
            <p className="text-xl text-gray-600">🔍 No courses found. Try adjusting your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;

