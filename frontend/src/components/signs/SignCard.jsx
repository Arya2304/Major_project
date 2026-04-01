import { Link } from 'react-router-dom';

const SignCard = ({ sign }) => {
  const getDifficultyColor = (level) => {
    switch (level) {
      case 1:
        return 'bg-success-100 text-success-900 border-success-500';
      case 2:
        return 'bg-warning-100 text-warning-900 border-warning-500';
      case 3:
        return 'bg-error-100 text-error-900 border-error-500';
      default:
        return 'bg-primary-100 text-primary-900 border-primary-500';
    }
  };

  // Alternate gradient colors for visual differentiation
  const gradientOptions = [
    'from-purple-400 to-pink-600',
    'from-green-400 to-green-600',
    'from-orange-400 to-orange-600',
    'from-rose-400 to-rose-600',
  ];
  const gradientClass = gradientOptions[sign.id % gradientOptions.length];

  return (
    <Link
      to={`/signs/${sign.id}`}
      className="block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border border-gray-100 group"
      aria-label={`Learn sign for ${sign.word}`}
    >
      {/* Premium Header with Gradient */}
      <div className={`relative w-full h-32 bg-gradient-to-br ${gradientClass} flex items-center justify-center overflow-hidden`}>
        {sign.image ? (
          <img
            src={sign.image}
            alt={sign.word}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="text-6xl opacity-80 group-hover:scale-110 transition-transform duration-300">✋</div>
        )}
        {/* Overlay for better contrast */}
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-300"></div>
        {/* Language Badge */}
        <div className="absolute top-3 right-3">
          <span className="bg-white text-dark-500 px-2.5 py-1 rounded-full text-xs font-bold shadow-md">
            {sign.language}
          </span>
        </div>
      </div>
      {/* Content Section */}
      <div className="p-5 flex flex-col gap-3">
        <div>
          <h3 className="text-lg font-bold text-dark-500 group-hover:text-primary-600 transition-colors duration-200">
            {sign.word}
          </h3>
          <div className="h-0.5 w-10 bg-gradient-to-r from-purple-400 to-pink-600 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
        </div>
        {/* Metadata Section */}
        <div className="flex gap-2 items-center flex-wrap pt-2 border-t border-gray-100">
          <span className={`badge border-2 px-2.5 py-0.5 rounded-full text-xs font-bold ${getDifficultyColor(sign.difficulty_level)}`}>
            {sign.difficulty_display}
          </span>
          {sign.videos_count > 0 && (
            <span className="text-gray-600 text-xs font-medium flex items-center gap-1.5 ml-auto">
              🎥 {sign.videos_count}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default SignCard;

