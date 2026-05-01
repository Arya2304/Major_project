import { useEffect, useMemo, useState } from 'react';
import { signsAPI } from '../api/signs';
import SignCard from '../components/signs/SignCard';
import Loader from '../components/common/Loader';

const Dictionary = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState(''); // empty => All
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [categories, setCategories] = useState([]);
  const [signs, setSigns] = useState([]);
  const [loading, setLoading] = useState(true);

  const levels = useMemo(
    () => [
      { label: 'All', value: 'All' },
      { label: 'Beginner', value: '1' },
      { label: 'Intermediate', value: '2' },
      { label: 'Advanced', value: '3' },
    ],
    []
  );

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await signsAPI.getCategories();
        setCategories(data?.results || data || []);
      } catch (error) {
        console.error('[Dictionary] Failed to load categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const params = {};
        if (selectedCategoryId) params.category = selectedCategoryId;
        if (selectedLevel !== 'All') params.difficulty = selectedLevel;
        if (searchQuery.trim()) params.search = searchQuery.trim();

        const data = await signsAPI.getSigns(params);
        setSigns(data?.results || data || []);
      } catch (error) {
        console.error('[Dictionary] Failed to fetch signs:', error);
        setSigns([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategoryId, selectedLevel]);

  return (
    <div className="p-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-black text-dark-500 mb-2">Sign Language Dictionary</h1>
        <p className="text-lg text-gray-600">Browse and search common sign language words and phrases.</p>
      </div>

      {/* Search Bar */}
      <div className="mb-8 bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <input
          type="text"
          placeholder="Search signs (e.g., hello, family, work)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-300 transition-all"
        />
      </div>

      {/* Filters */}
      <div className="mb-8 bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-bold text-dark-500 mb-3">Category</label>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setSelectedCategoryId('')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  !selectedCategoryId ? 'bg-primary-500 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategoryId(String(cat.id))}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    String(selectedCategoryId) === String(cat.id)
                      ? 'bg-primary-500 text-white shadow-md'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Level Filter */}
          <div>
            <label className="block text-sm font-bold text-dark-500 mb-3">Difficulty</label>
            <div className="flex flex-wrap gap-2">
              {levels.map((level) => (
                <button
                  key={level.value}
                  type="button"
                  onClick={() => setSelectedLevel(level.value)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedLevel === level.value
                      ? 'bg-primary-500 text-white shadow-md'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {level.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-600 font-medium">
          Showing {signs.length} signs
        </p>
      </div>

      {/* Dictionary Grid */}
      {loading ? (
        <Loader />
      ) : signs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {signs.map((sign) => (
            <SignCard key={sign.id} sign={sign} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-xl text-gray-600 mb-4">No signs found matching your search.</p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategoryId('');
              setSelectedLevel('All');
            }}
            className="px-6 py-2 bg-primary-500 text-white rounded-lg font-bold hover:bg-primary-600 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Tips Section */}
      <div className="mt-16 bg-gradient-to-r from-primary-50 to-primary-100/50 rounded-lg p-8 border border-primary-200">
        <h2 className="text-2xl font-bold text-dark-500 mb-4">💡 Tips for Learning Signs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="font-bold text-primary-600 mb-2">📺 Watch Multiple Times</p>
            <p className="text-gray-700 text-sm">Watch each sign video multiple times to understand the hand positions and movements.</p>
          </div>
          <div>
            <p className="font-bold text-primary-600 mb-2">✋ Practice Regularly</p>
            <p className="text-gray-700 text-sm">Practice the signs with your hands in front of a mirror to develop muscle memory.</p>
          </div>
          <div>
            <p className="font-bold text-primary-600 mb-2">👥 Learn in Context</p>
            <p className="text-gray-700 text-sm">Learn signs within sentences and phrases to understand how they're used in communication.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dictionary;
