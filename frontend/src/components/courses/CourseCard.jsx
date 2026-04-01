import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
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
    'from-primary-400 to-primary-600',
    'from-blue-400 to-blue-600',
    'from-indigo-400 to-indigo-600',
    'from-cyan-400 to-cyan-600',
  ];
  const gradientClass = gradientOptions[course.id % gradientOptions.length];

  return (
    <Link
      to={`/courses/${course.id}`}
      className="block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border border-gray-100 h-full flex flex-col group"
      aria-label={`View course: ${course.title}`}
    >
      {/* Premium Header with Gradient */}
      <div className={`relative w-full h-32 bg-gradient-to-br ${gradientClass} flex items-center justify-center overflow-hidden`}>
        {course.thumbnail ? (
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="text-6xl opacity-80 group-hover:scale-110 transition-transform duration-300">📚</div>
        )}
        {/* Overlay for better contrast */}
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-300"></div>
        {/* Badges Container */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <span className="bg-white text-dark-500 px-2.5 py-1 rounded-full text-xs font-bold shadow-md">
            {course.language_display}
          </span>
          {course.is_featured && (
            <span className="bg-yellow-400 text-yellow-900 px-2.5 py-1 rounded-full text-xs font-bold shadow-md animate-pulse">
              ⭐ Featured
            </span>
          )}
        </div>
      </div>
      {/* Content Section with Enhanced Hierarchy */}
      <div className="p-5 flex-1 flex flex-col gap-3">
        <div>
          <h3 className="text-lg font-bold text-dark-500 line-clamp-2 leading-tight group-hover:text-primary-600 transition-colors duration-200">
            {course.title}
          </h3>
          <div className="h-0.5 w-12 bg-gradient-to-r from-primary-400 to-primary-600 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
        </div>
        <p className="text-gray-500 text-sm line-clamp-2 flex-1 leading-relaxed">
          {course.description.substring(0, 100)}...
        </p>
        {/* Metadata Section */}
        <div className="flex gap-2 items-center flex-wrap mt-auto pt-2 border-t border-gray-100">
          <span className={`badge border-2 px-2.5 py-0.5 rounded-full text-xs font-bold ${getDifficultyColor(course.difficulty_level)}`}>
            {course.difficulty_display}
          </span>
          <span className="text-gray-600 text-xs font-medium flex items-center gap-1.5 ml-auto">
            📖 {course.lessons_count}
          </span>
          {course.enrolled_count > 0 && (
            <span className="text-gray-600 text-xs font-medium flex items-center gap-1">
              👥 {course.enrolled_count}
            </span>
          )}
        </div>
        {course.is_enrolled && (
          <div className="mt-2 text-primary-600 font-semibold text-sm flex items-center gap-1.5 bg-primary-50 px-3 py-1.5 rounded-lg">
            ✓ Enrolled
          </div>
        )}
      </div>
    </Link>
  );
};

export default CourseCard;

