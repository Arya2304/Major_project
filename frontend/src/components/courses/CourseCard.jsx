import { Link } from 'react-router-dom';
import './CourseCard.css';

const CourseCard = ({ course }) => {
  return (
    <Link
      to={`/courses/${course.id}`}
      className="course-card"
      aria-label={`View course: ${course.title}`}
    >
      <div className="course-card-image">
        {course.thumbnail ? (
          <img src={course.thumbnail} alt={course.title} />
        ) : (
          <div className="course-placeholder">📚</div>
        )}
        <div className="course-badges">
          <span className="language-badge">{course.language_display}</span>
          {course.is_featured && (
            <span className="featured-badge">⭐ Featured</span>
          )}
        </div>
      </div>
      <div className="course-card-content">
        <h3 className="course-title">{course.title}</h3>
        <p className="course-description">{course.description.substring(0, 100)}...</p>
        <div className="course-meta">
          <span className={`difficulty-badge difficulty-${course.difficulty_level}`}>
            {course.difficulty_display}
          </span>
          <span className="lessons-count">📖 {course.lessons_count} lessons</span>
          {course.enrolled_count > 0 && (
            <span className="enrolled-count">👥 {course.enrolled_count} enrolled</span>
          )}
        </div>
        {course.is_enrolled && (
          <div className="enrolled-indicator">✓ Enrolled</div>
        )}
      </div>
    </Link>
  );
};

export default CourseCard;

