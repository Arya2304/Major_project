import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { coursesAPI } from '../api/courses';
import { progressAPI } from '../api/progress';
import AccessibleButton from '../components/common/AccessibleButton';
import { FaVideo, FaBook, FaChevronRight, FaChevronLeft, FaCheck } from 'react-icons/fa';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const toAbsoluteMediaUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `${API_BASE_URL}${url}`;
};

const LessonPlayer = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  // State management
  const [lesson, setLesson] = useState(null);
  const [course, setCourse] = useState(null);
  const [nextLesson, setNextLesson] = useState(null);
  const [previousLesson, setPreviousLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const loadLesson = async () => {
      setLoading(true);
      setError(null);
      try {
        const parsedLessonId = parseInt(lessonId);
        const lessonData = await coursesAPI.getLesson(parsedLessonId);

        if (!lessonData) {
          setError(`Lesson #${parsedLessonId} not found. Please select a valid lesson.`);
          setLoading(false);
          return;
        }

        // Get course data
        const courseId = lessonData?.course?.id ?? lessonData?.course;
        const courseData = await coursesAPI.getCourse(courseId);
        if (!courseData) {
          setError('Course not found');
          setLoading(false);
          return;
        }

        // Get navigation data
        const courseLessonsData = await coursesAPI.getCourseLessons(courseId);
        const courseLessons = (courseLessonsData?.results || courseLessonsData || []).sort(
          (a, b) => (a.order || 0) - (b.order || 0)
        );
        const currentIndex = courseLessons.findIndex((item) => item.id === parsedLessonId);
        const previousLessonData = currentIndex > 0 ? courseLessons[currentIndex - 1] : null;
        const nextLessonData = currentIndex >= 0 && currentIndex < courseLessons.length - 1 ? courseLessons[currentIndex + 1] : null;

        setLesson(lessonData);
        setCourse(courseData);
        setNextLesson(nextLessonData);
        setPreviousLesson(previousLessonData);
        setLoading(false);
      } catch (err) {
        console.error('Error loading lesson:', err);
        setError('Failed to load lesson. Please try again.');
        setLoading(false);
      }
    };

    loadLesson();
  }, [lessonId]);

  const handleContinueLesson = () => {
    const completeAndNavigate = async () => {
      if (lesson) {
        try {
          await progressAPI.updateLessonProgress(lesson.id, { is_completed: true, completion_percentage: 100 });
        } catch (error) {
          try {
            await progressAPI.createLessonProgress(lesson.id, { is_completed: true, completion_percentage: 100 });
          } catch (innerError) {
            console.warn('[LessonPlayer] Could not persist completion:', innerError);
          }
        }
      }

      if (nextLesson) {
        setIsCompleted(true);
        navigate(`/lesson/${nextLesson.id}`);
      } else {
        setIsCompleted(true);
        navigate(`/learn`);
      }
    };

    completeAndNavigate();
  };

  const handlePreviousLesson = () => {
    if (previousLesson) {
      navigate(`/lesson/${previousLesson.id}`);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading lesson...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white p-6">
        <div className="page-container max-w-4xl">
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-red-700 mb-2">⚠️ Error</h2>
            <p className="text-red-600 mb-4">{error}</p>
            <AccessibleButton
              variant="primary"
              onClick={() => navigate('/learn')}
              className="bg-red-600 hover:bg-red-700"
            >
              Back to Learning
            </AccessibleButton>
          </div>
        </div>
      </div>
    );
  }

  if (!lesson || !course) {
    return (
      <div className="min-h-screen bg-white p-6">
        <div className="page-container max-w-4xl">
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6">
            <p className="text-yellow-700">Lesson not found. Please select a valid lesson.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Breadcrumb */}
      <div className="page-container max-w-5xl py-6 text-sm text-gray-600">
        <button onClick={() => navigate('/learn')} className="text-primary-600 hover:underline">
          My Learning
        </button>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-semibold">{lesson.title}</span>
      </div>

      {/* Main Content */}
      <div className="page-container max-w-5xl mb-12">
        {/* Video Section */}
        <div className="bg-gray-100 rounded-lg overflow-hidden mb-6 aspect-video flex items-center justify-center">
          {lesson.video ? (
            <video
              src={toAbsoluteMediaUrl(lesson.video)}
              controls
              className="w-full h-full object-contain bg-black"
              preload="metadata"
            />
          ) : (
            <div className="text-center">
              <FaVideo className="text-6xl text-gray-400 mb-3 mx-auto" />
              <p className="text-gray-600 font-semibold">{lesson.title}</p>
              <p className="text-gray-500 text-sm">{lesson.duration ? `${lesson.duration}s` : 'Video unavailable'}</p>
            </div>
          )}
        </div>

        {/* Lesson Info */}
        <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-lg p-6 border-2 border-primary-100 mb-8">
          <h1 className="text-3xl font-black text-gray-900 mb-2">{lesson.title}</h1>
          <p className="text-gray-700 mb-4">{lesson.description}</p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-600">Duration:</span>
              <span className="text-primary-600 font-bold">{lesson.duration ? `${lesson.duration}s` : 'N/A'}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-600">Level:</span>
              <span className="text-accent-600 font-bold">{course.difficulty_display || course.difficulty_level || 'N/A'}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-600">Course:</span>
              <span className="text-primary-600 font-bold">{course.title}</span>
            </div>
          </div>
        </div>

        {/* Vocabulary Section */}
        {lesson.vocabulary && lesson.vocabulary.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-black text-gray-900 mb-4 flex items-center gap-2">
              <FaBook className="text-primary-600" />
              Vocabulary
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {lesson.vocabulary.map((vocab, index) => (
                <div
                  key={index}
                  className="bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-primary-300 transition-all"
                >
                  <p className="font-bold text-gray-900 mb-2">{vocab.english}</p>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-semibold">Hindi:</span> {vocab.hindi}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Marathi:</span> {vocab.marathi}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Exercises Section */}
        {lesson.exercises && lesson.exercises.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-black text-gray-900 mb-4">Exercises</h2>
            <div className="space-y-3">
              {lesson.exercises.map((exercise) => (
                <div
                  key={exercise.id}
                  className="bg-white border-2 border-gray-200 rounded-lg p-4 flex items-start gap-3 hover:border-primary-300 transition-all"
                >
                  <FaCheck className="text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">{exercise.text}</p>
                    <p className="text-xs text-gray-500 mt-1">Type: {exercise.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-4 mt-12 pt-6 border-t-2 border-gray-200">
          {previousLesson ? (
            <AccessibleButton
              variant="secondary"
              onClick={handlePreviousLesson}
              className="flex items-center gap-2"
            >
              <FaChevronLeft /> Previous Lesson
            </AccessibleButton>
          ) : (
            <div></div>
          )}

          {nextLesson ? (
            <AccessibleButton
              variant="primary"
              onClick={handleContinueLesson}
              className="flex items-center gap-2 ml-auto"
            >
              Continue Course <FaChevronRight />
            </AccessibleButton>
          ) : (
            <AccessibleButton
              variant="primary"
              onClick={() => {
                setIsCompleted(true);
                navigate('/learn');
              }}
              className="flex items-center gap-2 ml-auto bg-green-600 hover:bg-green-700"
            >
              <FaCheck /> Complete Course
            </AccessibleButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default LessonPlayer;
