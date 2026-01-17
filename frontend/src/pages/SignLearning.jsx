import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { signsAPI } from '../api/signs';
import SignCard from '../components/signs/SignCard';
import Loader from '../components/common/Loader';
import './SignLearning.css';

const SignLearning = () => {
  const [signs, setSigns] = useState([]);
  const [categories, setCategories] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    language: searchParams.get('language') || '',
    category: searchParams.get('category') || '',
    difficulty: searchParams.get('difficulty') || '',
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [signsData, categoriesData, languagesData] = await Promise.all([
          signsAPI.getSigns(filters),
          signsAPI.getCategories(),
          signsAPI.getLanguages(),
        ]);

        setSigns(signsData.results || signsData);
        setCategories(categoriesData.results || categoriesData);
        setLanguages(languagesData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters]);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    setSearchParams(newFilters);
  };

  return (
    <div className="sign-learning-page">
      <div className="container">
        <h1 className="page-title">✋ Learn Sign Language</h1>

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
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="category-filter">📁 Category</label>
            <select
              id="category-filter"
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              aria-label="Filter by category"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
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
        </div>

        {loading ? (
          <Loader />
        ) : signs.length > 0 ? (
          <div className="signs-grid">
            {signs.map((sign) => (
              <SignCard key={sign.id} sign={sign} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>🔍 No signs found. Try adjusting your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignLearning;

