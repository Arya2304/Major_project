import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import AccessibleButton from '../components/common/AccessibleButton';

/**
 * Dictionary.jsx — Phase 4
 * ISL Sign Dictionary page
 * Browse and search signs by category or keyword
 */

// Mock sign dictionary data
const MOCK_SIGNS = [
  {
    id: 1,
    word: 'Hello',
    category: 'Greetings',
    description: 'A friendly greeting, palm outward wave',
    videoUrl: 'https://via.placeholder.com/400x300?text=Hello+Sign',
  },
  {
    id: 2,
    word: 'Thank You',
    category: 'Common Words',
    description: 'Express gratitude with a bow and hand gesture',
    videoUrl: 'https://via.placeholder.com/400x300?text=Thank+You+Sign',
  },
  {
    id: 3,
    word: 'Yes',
    category: 'Common Words',
    description: 'Nodding head motion with hand confirmation',
    videoUrl: 'https://via.placeholder.com/400x300?text=Yes+Sign',
  },
  {
    id: 4,
    word: 'No',
    category: 'Common Words',
    description: 'Shaking hand motion indicating negation',
    videoUrl: 'https://via.placeholder.com/400x300?text=No+Sign',
  },
  {
    id: 5,
    word: 'A',
    category: 'Alphabets',
    description: 'Hand shape resembling the letter A',
    videoUrl: 'https://via.placeholder.com/400x300?text=A+Sign',
  },
  {
    id: 6,
    word: 'B',
    category: 'Alphabets',
    description: 'Hand shape resembling the letter B',
    videoUrl: 'https://via.placeholder.com/400x300?text=B+Sign',
  },
  {
    id: 7,
    word: 'One',
    category: 'Numbers',
    description: 'Single finger up representing the number 1',
    videoUrl: 'https://via.placeholder.com/400x300?text=One+Sign',
  },
  {
    id: 8,
    word: 'Two',
    category: 'Numbers',
    description: 'Two fingers up representing the number 2',
    videoUrl: 'https://via.placeholder.com/400x300?text=Two+Sign',
  },
  {
    id: 9,
    word: 'Please',
    category: 'Phrases',
    description: 'Polite request with circular chest motion',
    videoUrl: 'https://via.placeholder.com/400x300?text=Please+Sign',
  },
  {
    id: 10,
    word: 'Sorry',
    category: 'Phrases',
    description: 'Apology with hand over heart gesture',
    videoUrl: 'https://via.placeholder.com/400x300?text=Sorry+Sign',
  },
  {
    id: 11,
    word: 'Good Morning',
    category: 'Greetings',
    description: 'Combine "good" and "morning" signs',
    videoUrl: 'https://via.placeholder.com/400x300?text=Good+Morning+Sign',
  },
  {
    id: 12,
    word: 'Good Night',
    category: 'Greetings',
    description: 'Combine "good" and "night" signs',
    videoUrl: 'https://via.placeholder.com/400x300?text=Good+Night+Sign',
  },
];

const CATEGORIES = ['All', 'Alphabets', 'Numbers', 'Common Words', 'Phrases', 'Greetings'];

const Dictionary = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter and search signs
  const filteredSigns = useMemo(() => {
    return MOCK_SIGNS.filter((sign) => {
      const matchesCategory = selectedCategory === 'All' || sign.category === selectedCategory;
      const matchesSearch = sign.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sign.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const handleLearnSign = (sign) => {
    navigate(`/sign-learning/${sign.id}`, { state: { sign } });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-500 to-accent-500 py-12">
        <div className="page-container">
          <h1 className="text-4xl font-black text-white mb-2">ISL Sign Dictionary</h1>
          <p className="text-lg text-primary-100">
            Learn and explore Indian Sign Language signs for everyday communication
          </p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="page-container py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <label htmlFor="search-signs" className="block text-sm font-bold text-gray-700 mb-2">
            Search Signs
          </label>
          <input
            id="search-signs"
            type="text"
            placeholder="Search by word or description... (e.g., 'hello', 'greeting')"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
            aria-label="Search signs dictionary"
          />
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <p className="text-sm font-bold text-gray-700 mb-3">Filter by Category</p>
          <div className="flex flex-wrap gap-3">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-semibold transition-all ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                aria-pressed={selectedCategory === category}
                aria-label={`Filter by ${category}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-8 flex items-center gap-2">
          <p className="text-gray-600">
            Showing <span className="font-bold text-primary-600">{filteredSigns.length}</span> signs
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
            {searchQuery && ` matching "${searchQuery}"`}
          </p>
        </div>

        {/* Sign Cards Grid */}
        {filteredSigns.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSigns.map((sign) => (
              <div
                key={sign.id}
                className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-primary-300 transition-all duration-300"
              >
                {/* Video Placeholder */}
                <div className="w-full aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-5xl mb-2">🎥</div>
                    <p className="text-sm text-gray-600">Video Demo</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{sign.word}</h3>

                  {/* Category Badge */}
                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-bold">
                      {sign.category}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {sign.description}
                  </p>

                  {/* Learn Button */}
                  <AccessibleButton
                    variant="primary"
                    onClick={() => handleLearnSign(sign)}
                    className="w-full"
                  >
                    Learn This Sign →
                  </AccessibleButton>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-4xl mb-4">🔍</p>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No signs found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or filter criteria to find the sign you're looking for.
            </p>
            <AccessibleButton
              variant="outline"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
            >
              Clear Filters
            </AccessibleButton>
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="bg-gray-50 py-12">
        <div className="page-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Quick Access */}
            <div className="text-center">
              <div className="text-4xl mb-3">📚</div>
              <h3 className="font-bold text-gray-900 mb-2">Comprehensive Dictionary</h3>
              <p className="text-gray-600 text-sm">
                Browse over 100+ Indian Sign Language signs organized by category
              </p>
            </div>

            {/* Video Demos */}
            <div className="text-center">
              <div className="text-4xl mb-3">🎥</div>
              <h3 className="font-bold text-gray-900 mb-2">Video Demonstrations</h3>
              <p className="text-gray-600 text-sm">
                Learn from native ISL signers with clear hand positions and movements
              </p>
            </div>

            {/* Difficulty Progress */}
            <div className="text-center">
              <div className="text-4xl mb-3">✅</div>
              <h3 className="font-bold text-gray-900 mb-2">Track Your Progress</h3>
              <p className="text-gray-600 text-sm">
                Mark signs as learned and track your vocabulary growth over time
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dictionary;
