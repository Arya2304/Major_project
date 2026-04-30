import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import AccessibleButton from '../components/common/AccessibleButton';
import { FaVideo, FaSearch, FaBook, FaCheck } from 'react-icons/fa';

/**
 * Dictionary.jsx — Phase 4
 * ISL Sign Dictionary page
 * Browse and search signs by category or keyword
 */

// Mock sign dictionary data with multilingual support and 3 sign languages (ISL, ASL, BSL)
const MOCK_SIGNS = [
  {
    id: 1,
    english: 'Hello',
    hindi: 'नमस्ते',
    marathi: 'नमस्कार',
    category: 'Greetings',
    description: 'A friendly greeting, palm outward wave',
    signs: {
      ISL: 'https://via.placeholder.com/400x300?text=Hello+ISL+Sign',
      ASL: 'https://via.placeholder.com/400x300?text=Hello+ASL+Sign',
      BSL: 'https://via.placeholder.com/400x300?text=Hello+BSL+Sign',
    },
  },
  {
    id: 2,
    english: 'Thank You',
    hindi: 'धन्यवाद',
    marathi: 'धन्यवाद',
    category: 'Common Words',
    description: 'Express gratitude with a bow and hand gesture',
    signs: {
      ISL: 'https://via.placeholder.com/400x300?text=Thank+You+ISL+Sign',
      ASL: 'https://via.placeholder.com/400x300?text=Thank+You+ASL+Sign',
      BSL: 'https://via.placeholder.com/400x300?text=Thank+You+BSL+Sign',
    },
  },
  {
    id: 3,
    english: 'Yes',
    hindi: 'हाँ',
    marathi: 'हो',
    category: 'Common Words',
    description: 'Nodding head motion with hand confirmation',
    signs: {
      ISL: 'https://via.placeholder.com/400x300?text=Yes+ISL+Sign',
      ASL: 'https://via.placeholder.com/400x300?text=Yes+ASL+Sign',
      BSL: 'https://via.placeholder.com/400x300?text=Yes+BSL+Sign',
    },
  },
  {
    id: 4,
    english: 'No',
    hindi: 'नहीं',
    marathi: 'नाही',
    category: 'Common Words',
    description: 'Shaking hand motion indicating negation',
    signs: {
      ISL: 'https://via.placeholder.com/400x300?text=No+ISL+Sign',
      ASL: 'https://via.placeholder.com/400x300?text=No+ASL+Sign',
      BSL: 'https://via.placeholder.com/400x300?text=No+BSL+Sign',
    },
  },
  {
    id: 5,
    english: 'A',
    hindi: 'ए',
    marathi: 'ए',
    category: 'Alphabets',
    description: 'Hand shape resembling the letter A',
    signs: {
      ISL: 'https://via.placeholder.com/400x300?text=A+ISL+Sign',
      ASL: 'https://via.placeholder.com/400x300?text=A+ASL+Sign',
      BSL: 'https://via.placeholder.com/400x300?text=A+BSL+Sign',
    },
  },
  {
    id: 6,
    english: 'B',
    hindi: 'बी',
    marathi: 'बी',
    category: 'Alphabets',
    description: 'Hand shape resembling the letter B',
    signs: {
      ISL: 'https://via.placeholder.com/400x300?text=B+ISL+Sign',
      ASL: 'https://via.placeholder.com/400x300?text=B+ASL+Sign',
      BSL: 'https://via.placeholder.com/400x300?text=B+BSL+Sign',
    },
  },
  {
    id: 7,
    english: 'One',
    hindi: 'एक',
    marathi: 'एक',
    category: 'Numbers',
    description: 'Single finger up representing the number 1',
    signs: {
      ISL: 'https://via.placeholder.com/400x300?text=One+ISL+Sign',
      ASL: 'https://via.placeholder.com/400x300?text=One+ASL+Sign',
      BSL: 'https://via.placeholder.com/400x300?text=One+BSL+Sign',
    },
  },
  {
    id: 8,
    english: 'Two',
    hindi: 'दो',
    marathi: 'दोन',
    category: 'Numbers',
    description: 'Two fingers up representing the number 2',
    signs: {
      ISL: 'https://via.placeholder.com/400x300?text=Two+ISL+Sign',
      ASL: 'https://via.placeholder.com/400x300?text=Two+ASL+Sign',
      BSL: 'https://via.placeholder.com/400x300?text=Two+BSL+Sign',
    },
  },
  {
    id: 9,
    english: 'Please',
    hindi: 'कृपया',
    marathi: 'कृपया',
    category: 'Phrases',
    description: 'Polite request with circular chest motion',
    signs: {
      ISL: 'https://via.placeholder.com/400x300?text=Please+ISL+Sign',
      ASL: 'https://via.placeholder.com/400x300?text=Please+ASL+Sign',
      BSL: 'https://via.placeholder.com/400x300?text=Please+BSL+Sign',
    },
  },
  {
    id: 10,
    english: 'Sorry',
    hindi: 'माफी',
    marathi: 'क्षमा करा',
    category: 'Phrases',
    description: 'Apology with hand over heart gesture',
    signs: {
      ISL: 'https://via.placeholder.com/400x300?text=Sorry+ISL+Sign',
      ASL: 'https://via.placeholder.com/400x300?text=Sorry+ASL+Sign',
      BSL: 'https://via.placeholder.com/400x300?text=Sorry+BSL+Sign',
    },
  },
  {
    id: 11,
    english: 'Good Morning',
    hindi: 'शुभ प्रभात',
    marathi: 'सकाळ मंगल',
    category: 'Greetings',
    description: 'Combine "good" and "morning" signs',
    signs: {
      ISL: 'https://via.placeholder.com/400x300?text=Good+Morning+ISL+Sign',
      ASL: 'https://via.placeholder.com/400x300?text=Good+Morning+ASL+Sign',
      BSL: 'https://via.placeholder.com/400x300?text=Good+Morning+BSL+Sign',
    },
  },
  {
    id: 12,
    english: 'Good Night',
    hindi: 'शुभ रात्रि',
    marathi: 'रात्री मंगल',
    category: 'Greetings',
    description: 'Combine "good" and "night" signs',
    signs: {
      ISL: 'https://via.placeholder.com/400x300?text=Good+Night+ISL+Sign',
      ASL: 'https://via.placeholder.com/400x300?text=Good+Night+ASL+Sign',
      BSL: 'https://via.placeholder.com/400x300?text=Good+Night+BSL+Sign',
    },
  },
];

const CATEGORIES = ['All', 'Alphabets', 'Numbers', 'Common Words', 'Phrases', 'Greetings'];
const SIGN_LANGUAGES = ['ISL', 'ASL', 'BSL'];

const Dictionary = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSignLanguage, setSelectedSignLanguage] = useState('ISL');

  // Filter and search signs across all 3 languages
  const filteredSigns = useMemo(() => {
    return MOCK_SIGNS.filter((sign) => {
      const matchesCategory = selectedCategory === 'All' || sign.category === selectedCategory;
      const searchLower = searchQuery.toLowerCase();
      
      // Search across English, Hindi, and Marathi
      const matchesSearch = 
        sign.english.toLowerCase().includes(searchLower) ||
        sign.hindi.toLowerCase().includes(searchLower) ||
        sign.marathi.toLowerCase().includes(searchLower) ||
        sign.description.toLowerCase().includes(searchLower);
      
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory, selectedSignLanguage]);

  const handleLearnSign = (sign) => {
    navigate(`/sign-learning/${sign.id}`, { state: { sign } });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-500 to-accent-500 py-12">
        <div className="page-container">
          <h1 className="text-4xl font-black text-white mb-2">{selectedSignLanguage} Sign Dictionary</h1>
          <p className="text-lg text-primary-100">
            Learn and explore {selectedSignLanguage} signs for everyday communication
          </p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="page-container py-8">
        {/* Sign Language Selector */}
        <div className="mb-8">
          <p className="text-sm font-bold text-gray-700 mb-3">Select Sign Language</p>
          <div className="flex flex-wrap gap-3">
            {SIGN_LANGUAGES.map((language) => (
              <button
                key={language}
                onClick={() => setSelectedSignLanguage(language)}
                className={`px-4 py-2 rounded-full font-semibold transition-all ${
                  selectedSignLanguage === language
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                aria-pressed={selectedSignLanguage === language}
                aria-label={`View ${language} signs`}
              >
                {language}
              </button>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <label htmlFor="search-signs" className="block text-sm font-bold text-gray-700 mb-2">
            Search Signs (English, Hindi, Marathi)
          </label>
          <input
            id="search-signs"
            type="text"
            placeholder="Search by English, Hindi, or Marathi... (e.g., 'hello', 'नमस्ते', 'नमस्कार')"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
            aria-label="Search signs dictionary in English, Hindi, or Marathi"
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
                {/* Video Placeholder with Sign Language Label */}
                <div className="w-full aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative">
                  {/* Sign Language Badge */}
                  <div className="absolute top-2 right-2 bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                    {selectedSignLanguage}
                  </div>
                  <div className="text-center">
                    <FaVideo className="text-5xl mb-2 mx-auto" />
                    <p className="text-sm text-gray-600">Video Demo ({selectedSignLanguage})</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Title - Multilingual */}
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{sign.english}</h3>
                  
                  {/* Hindi and Marathi Translations */}
                  <div className="mb-3 space-y-1">
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Hindi:</span> {sign.hindi}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Marathi:</span> {sign.marathi}
                    </p>
                  </div>

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
                    Learn This Sign ({selectedSignLanguage}) →
                  </AccessibleButton>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <FaSearch className="text-4xl mb-4 mx-auto" />
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
    </div>
  );
};

export default Dictionary;
