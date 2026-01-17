import { Link } from 'react-router-dom';
import { FaHandPaper, FaVideo, FaChartBar } from 'react-icons/fa';
import AccessibleCard from '../common/AccessibleCard';

/**
 * Enhanced sign card with:
 * - Large, clear icons
 * - High contrast design
 * - Video-first presentation
 * - ARIA labels
 */
const AccessibleSignCard = ({ sign }) => {
  return (
    <Link
      to={`/signs/${sign.id}`}
      className="block"
      aria-label={`Learn sign for ${sign.word} in ${sign.language_display}`}
    >
      <AccessibleCard
        className="h-full hover:scale-105 transition-transform duration-200"
        role="article"
        aria-label={`Sign: ${sign.word}`}
      >
        {/* Large video/image preview */}
        <div className="relative w-full h-64 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
          {sign.image ? (
            <img
              src={sign.image}
              alt={`Visual representation of ${sign.word} sign`}
              className="w-full h-full object-cover"
            />
          ) : (
            <FaHandPaper className="text-8xl text-primary-600" aria-hidden="true" />
          )}
          
          {/* Language badge - high contrast */}
          <div className="absolute top-4 right-4 bg-primary-700 text-white px-4 py-2 rounded-full font-bold text-base border-2 border-white">
            {sign.language}
          </div>
        </div>

        {/* Content */}
        <div className="space-y-3">
          <h3 className="text-2xl font-bold text-text-primary">{sign.word}</h3>
          
          {sign.description && (
            <p className="text-lg text-text-secondary line-clamp-2">
              {sign.description}
            </p>
          )}

          {/* Metadata with large icons */}
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <FaChartBar className="text-xl text-primary-600" aria-hidden="true" />
              <span className="text-base font-semibold">{sign.difficulty_display}</span>
            </div>
            
            {sign.videos_count > 0 && (
              <div className="flex items-center gap-2">
                <FaVideo className="text-xl text-primary-600" aria-hidden="true" />
                <span className="text-base font-semibold">
                  {sign.videos_count} {sign.videos_count === 1 ? 'video' : 'videos'}
                </span>
              </div>
            )}
          </div>

          {/* Difficulty indicator - high contrast */}
          <div className="mt-4">
            <div
              className={`h-3 rounded-full ${
                sign.difficulty_level === 1
                  ? 'bg-green-500'
                  : sign.difficulty_level === 2
                  ? 'bg-yellow-500'
                  : 'bg-red-500'
              }`}
              role="progressbar"
              aria-valuenow={sign.difficulty_level}
              aria-valuemin={1}
              aria-valuemax={3}
              aria-label={`Difficulty level: ${sign.difficulty_display}`}
            />
          </div>
        </div>
      </AccessibleCard>
    </Link>
  );
};

export default AccessibleSignCard;

