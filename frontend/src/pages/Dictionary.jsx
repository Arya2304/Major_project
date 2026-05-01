import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AccessibleButton from '../components/common/AccessibleButton';
import { signsAPI } from '../api/signs';
import { useAuth } from '../context/AuthContext';
import { FaVideo, FaSearch, FaBook, FaCheck } from 'react-icons/fa';

/**
 * Dictionary.jsx — Phase 4
 * ISL Sign Dictionary page
 * Browse and search signs by category or keyword
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const toAbsoluteMediaUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `${API_BASE_URL}${url}`;
};

const Dictionary = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSignLanguage, setSelectedSignLanguage] = useState('ISL');
  const [signs, setSigns] = useState([]);
  const [categories, setCategories] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDictionaryData = async () => {
      setLoading(true);
      try {
        const [signsData, categoriesData, languagesData] = await Promise.all([
          signsAPI.getSigns({}),
          signsAPI.getCategories(),
          signsAPI.getLanguages(),
        ]);
        setSigns(signsData?.results || signsData || []);
        setCategories(categoriesData?.results || categoriesData || []);
        setLanguages(languagesData || []);
      } catch (error) {
        console.error('[Dictionary] Failed to load dictionary:', error);
        setSigns([]);
      } finally {
        setLoading(false);
      }
    };

    loadDictionaryData();
  }, []);

  // Filter and search signs across all 3 languages
  const filteredSigns = useMemo(() => {
    return signs.filter((sign) => {
      const categoryName = sign?.category?.name || '';
      const matchesCategory = selectedCategory === 'All' || categoryName === selectedCategory;
      const matchesLanguage = !selectedSignLanguage || sign.language === selectedSignLanguage;
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        (sign.word || '').toLowerCase().includes(searchLower) ||
        categoryName.toLowerCase().includes(searchLower) ||
        (sign.description || '').toLowerCase().includes(searchLower);

      return matchesCategory && matchesLanguage && matchesSearch;
    });
  }, [searchQuery, selectedCategory, selectedSignLanguage, signs]);

  const handleLearnSign = (sign) => {
    if (!isAuthenticated) {
      navigate(`/login?from=${encodeURIComponent(`/signs/${sign.id}`)}`);
      return;
    }
    navigate(`/signs/${sign.id}`);
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
            {(languages || []).map((language) => (
              <button
                key={language.code}
                onClick={() => setSelectedSignLanguage(language.code)}
                className={`px-4 py-2 rounded-full font-semibold transition-all ${
                  selectedSignLanguage === language.code
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                aria-pressed={selectedSignLanguage === language.code}
                aria-label={`View ${language.name} signs`}
              >
                {language.code}
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
            placeholder="Search by word, category, or description..."
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
            {['All', ...categories.map((c) => c.name)].map((category) => (
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
        {loading && (
          <div className="mb-8 text-gray-700 font-semibold">Loading signs...</div>
        )}

        {/* Sign Cards Grid */}
        {filteredSigns.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSigns.map((sign) => (
              <div
                key={sign.id}
                className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-primary-300 transition-all duration-300"
              >
                <div className="w-full aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative">
                  {/* Sign Language Badge */}
                  <div className="absolute top-2 right-2 bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                    {selectedSignLanguage}
                  </div>
                  {sign.image ? (
                    <img src={toAbsoluteMediaUrl(sign.image)} alt={sign.word} className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center">
                      <FaVideo className="text-5xl mb-2 mx-auto" />
                      <p className="text-sm text-gray-600">Sign Preview</p>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Title - Multilingual */}
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{sign.word}</h3>
                  
                  {/* Hindi and Marathi Translations */}
                  <div className="mb-3 space-y-1">
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Language:</span> {sign.language_display || sign.language}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Difficulty:</span> {sign.difficulty_display || sign.difficulty_level}
                    </p>
                  </div>

                  {/* Category Badge */}
                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-bold">
                      {sign?.category?.name || 'General'}
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

      {/* Info Section */}
      <div className="bg-gray-50 py-12">
        <div className="page-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Quick Access */}
            <div className="text-center">
              <FaBook className="text-4xl mb-3 mx-auto" />
              <h3 className="font-bold text-gray-900 mb-2">Comprehensive Dictionary</h3>
              <p className="text-gray-600 text-sm">
                Browse over 100+ Indian Sign Language signs organized by category
              </p>
            </div>

            {/* Video Demos */}
            <div className="text-center">
              <FaVideo className="text-4xl mb-3 mx-auto" />
              <h3 className="font-bold text-gray-900 mb-2">Video Demonstrations</h3>
              <p className="text-gray-600 text-sm">
                Learn from native ISL signers with clear hand positions and movements
              </p>
            </div>

            {/* Difficulty Progress */}
            <div className="text-center">
              <FaCheck className="text-4xl mb-3 mx-auto" />
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
