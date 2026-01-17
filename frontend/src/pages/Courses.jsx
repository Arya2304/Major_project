import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { coursesAPI } from '../api/courses';
import CourseCard from '../components/courses/CourseCard';
import Loader from '../components/common/Loader';
import './Courses.css';

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
    <div className="courses-page">
      <div className="container">
        <h1 className="page-title">📚 Courses</h1>

        <div className="filters-section">
          <div className="filter-group">
            <label htmlFor="language-filter">🌍 Language</label>
            <select
              id="language-filter"
              value={filters.language}
              onChange={(e) => handleFilterChange('language', e.target.value)}
              aria-label="Filter by language"
            >
              <option value="">All Languages</option>
              <option value="ASL">American Sign Language</option>
              <option value="ISL">Indian Sign Language</option>
              <option value="BSL">British Sign Language</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="difficulty-filter">📊 Difficulty</label>
            <select
              id="difficulty-filter"
              value={filters.difficulty}
              onChange={(e) => handleFilterChange('difficulty', e.target.value)}
              aria-label="Filter by difficulty"
            >
              <option value="">All Levels</option>
              <option value="1">Beginner</option>
              <option value="2">Intermediate</option>
              <option value="3">Advanced</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="featured-filter">⭐ Featured</label>
            <select
              id="featured-filter"
              value={filters.featured}
              onChange={(e) => handleFilterChange('featured', e.target.value)}
              aria-label="Filter featured courses"
            >
              <option value="">All Courses</option>
              <option value="true">Featured Only</option>
            </select>
          </div>
        </div>

        {loading ? (
          <Loader />
        ) : courses.length > 0 ? (
          <div className="courses-grid">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>🔍 No courses found. Try adjusting your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;

