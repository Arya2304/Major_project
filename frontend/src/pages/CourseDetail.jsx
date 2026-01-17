import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { coursesAPI } from '../api/courses';
import { progressAPI } from '../api/progress';
import LessonPlayer from '../components/courses/LessonPlayer';
import Loader from '../components/common/Loader';
import './CourseDetail.css';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true);
      try {
        const [courseData, lessonsData] = await Promise.all([
          coursesAPI.getCourse(id),
          coursesAPI.getLessons({ course: id }),
        ]);
        setCourse(courseData);
        setLessons(lessonsData.results || lessonsData);
      } catch (error) {
        console.error('Failed to fetch course:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const handleEnroll = async () => {
    setEnrolling(true);
    try {
      await coursesAPI.enrollInCourse(id);
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to enroll:', error);
      alert('Failed to enroll. Please try again.');
    } finally {
      setEnrolling(false);
    }
  };

  const handleLessonProgress = async (lessonId, progressData) => {
    try {
      await progressAPI.updateLessonProgress(lessonId, progressData);
    } catch (error) {
      console.error('Failed to update progress:', error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!course) {
    return (
      <div className="error-state">
        <p>❌ Course not found</p>
      </div>
    );
  }

  return (
    <div className="course-detail-page">
      <div className="container">
        <div className="course-header">
          <div className="course-header-content">
            {course.thumbnail && (
              <img
                src={course.thumbnail}
                alt={course.title}
                className="course-thumbnail-large"
              />
            )}
            <div>
              <h1 className="course-title">{course.title}</h1>
              <p className="course-description">{course.description}</p>
              <div className="course-meta-info">
                <span className="meta-badge">{course.language_display}</span>
                <span className="meta-badge">{course.difficulty_display}</span>
                <span className="meta-badge">📖 {course.lessons_count} lessons</span>
                {course.duration_hours > 0 && (
                  <span className="meta-badge">⏱️ {course.duration_hours} hours</span>
                )}
              </div>
              {!course.is_enrolled && (
                <button
                  onClick={handleEnroll}
                  className="btn btn-primary btn-large"
                  disabled={enrolling}
                  aria-label="Enroll in course"
                >
                  {enrolling ? 'Enrolling...' : '📚 Enroll Now'}
                </button>
              )}
            </div>
          </div>
        </div>

        {course.is_enrolled && lessons.length > 0 && (
          <div className="lessons-section">
            <h2 className="section-title">📖 Lessons</h2>
            <div className="lessons-list">
              {lessons.map((lesson, index) => (
                <div key={lesson.id} className="lesson-item">
                  <div className="lesson-header">
                    <h3>
                      Lesson {lesson.order}: {lesson.title}
                    </h3>
                    {lesson.is_free && (
                      <span className="free-badge">🆓 Free</span>
                    )}
                  </div>
                  <LessonPlayer
                    lesson={lesson}
                    onProgressUpdate={(data) =>
                      handleLessonProgress(lesson.id, data)
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDetail;

