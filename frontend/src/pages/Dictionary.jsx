import { useState, useMemo } from 'react';
import { mockDictionary, getDictionaryCategories } from '../data/mockData';

const Dictionary = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');

  const categories = ['All', ...getDictionaryCategories()];
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredDictionary = useMemo(() => {
    return mockDictionary.filter((item) => {
      const matchesSearch =
        item.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesLevel = selectedLevel === 'All' || item.difficulty === selectedLevel;

      return matchesSearch && matchesCategory && matchesLevel;
    });
  }, [searchQuery, selectedCategory, selectedLevel]);

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
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedCategory === cat
                      ? 'bg-primary-500 text-white shadow-md'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {cat}
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
                  key={level}
                  onClick={() => setSelectedLevel(level)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedLevel === level ? 'bg-primary-500 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-600 font-medium">
          Showing {filteredDictionary.length} of {mockDictionary.length} signs
        </p>
      </div>

      {/* Dictionary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDictionary.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 border border-gray-200 cursor-pointer group"
          >
            {/* Video Placeholder */}
            <div className="h-40 bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="text-5xl mb-2">🎥</div>
                <p className="text-xs text-white/80">Video: {item.videoUrl}</p>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-2xl font-black text-dark-500 group-hover:text-primary-600 transition-colors">{item.word}</h3>
                <span className="inline-block px-3 py-1 bg-primary-100 text-primary-600 text-xs font-bold rounded-full">
                  {item.difficulty}
                </span>
              </div>

              <div className="mb-3">
                <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded-full">
                  {item.category}
                </span>
              </div>

              <p className="text-sm text-gray-600 leading-relaxed mb-4 min-h-[60px]">{item.description}</p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <span className="text-xs text-gray-500">{item.signType}</span>
                <button className="px-3 py-2 bg-primary-500 text-white rounded-lg font-bold text-sm hover:bg-primary-600 transition-colors">
                  Watch Video
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredDictionary.length === 0 && (
        <div className="text-center py-16">
          <p className="text-xl text-gray-600 mb-4">No signs found matching your search.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
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
