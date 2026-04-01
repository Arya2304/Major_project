import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { coursesAPI } from '../api/courses';
import { progressAPI } from '../api/progress';
import { getCourseById, getLesson } from '../data/mockData';
import Loader from '../components/common/Loader';

const LessonPlayer = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const playerRef = useRef(null);

  // State management
  const [course, setCourse] = useState(null);
  const [lesson, setLesson] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [lessonProgress, setLessonProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [marking, setMarking] = useState(false);
  const [showCompletionUI, setShowCompletionUI] = useState(false);
  const [watchTime, setWatchTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const fetchLessonData = async () => {
      setLoading(true);
      try {
        // Fetch from mock data (can switch to API later)
        const courseData = getCourseById(parseInt(courseId));
        const lessonData = getLesson(parseInt(lessonId));

        if (courseData && lessonData) {
          setCourse(courseData);
          setLesson(lessonData);
          setLessons(courseData.lessons || []);

          // Fetch lesson progress
          try {
            const progress = await progressAPI.getLessonProgress(parseInt(lessonId));
            setLessonProgress(progress);
            if (progress.is_completed) {
              setShowCompletionUI(true);
            }
          } catch (error) {
            console.log('Lesson progress not found, creating new tracking');
          }
        }
      } catch (error) {
        console.error('Failed to fetch lesson data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLessonData();
  }, [courseId, lessonId]);

  // Handle marking lesson as complete
  const handleMarkComplete = async () => {
    setMarking(true);
    try {
      await progressAPI.updateLessonProgress(parseInt(lessonId), {
        is_completed: true,
        watch_duration: Math.round(watchTime),
      });

      // Update enrollment progress
      try {
        const enrollment = await coursesAPI.getEnrollment(parseInt(courseId));
        if (enrollment) {
          const totalLessons = lessons.length;
          const completedLessons = lessons.filter((l) => {
            if (l.id === parseInt(lessonId)) return true;
            // This is simplified - in real app would need to check all progress
            return false;
          }).length;
          const progress = Math.round((completedLessons / totalLessons) * 100);
          await coursesAPI.updateProgress(enrollment.id, progress);
        }
      } catch (error) {
        console.error('Failed to update enrollment progress:', error);
      }

      setShowCompletionUI(true);
    } catch (error) {
      console.error('Failed to mark lesson complete:', error);
      alert('Failed to mark lesson complete. Please try again.');
    } finally {
      setMarking(false);
    }
  };

  // Navigate to next lesson
  const handleNextLesson = () => {
    const currentIndex = lessons.findIndex((l) => l.id === parseInt(lessonId));
    if (currentIndex < lessons.length - 1) {
      const nextLesson = lessons[currentIndex + 1];
      navigate(`/lesson/${nextLesson.id}`);
    }
  };

  // Navigate to previous lesson
  const handlePreviousLesson = () => {
    const currentIndex = lessons.findIndex((l) => l.id === parseInt(lessonId));
    if (currentIndex > 0) {
      const prevLesson = lessons[currentIndex - 1];
      navigate(`/lesson/${prevLesson.id}`);
    }
  };

  const currentIndex = lessons.findIndex((l) => l.id === parseInt(lessonId));
  const hasNextLesson = currentIndex < lessons.length - 1;
  const hasPrevLesson = currentIndex > 0;
  const isLastLesson = currentIndex === lessons.length - 1;

  if (loading) {
    return <Loader />;
  }

  if (!course || !lesson) {
    return (
      <div className="p-8">
        <p className="text-red-600 text-lg mb-4">Lesson not found.</p>
        <Link to={`/learn/${courseId}`} className="text-primary-600 hover:text-primary-700 font-medium">
          ← Back to Course
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-8 sticky top-0 z-40 shadow-sm">
        <Link to={`/learn/${courseId}`} className="text-primary-600 hover:text-primary-700 font-medium mb-4 inline-block">
          ← Back to Course
        </Link>
        <div className="mt-4">
          <p className="text-sm text-gray-600 font-medium">{course.title}</p>
          <h1 className="text-3xl font-black text-dark-500">Lesson {currentIndex + 1}: {lesson.title}</h1>
        </div>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Learning Area */}
          <div className="lg:col-span-2">
            {/* Video Player Container */}
            <div className="bg-black rounded-2xl overflow-hidden aspect-video flex items-center justify-center shadow-xl mb-8 relative group">
              {lesson.videoUrl ? (
                <ReactPlayer
                  ref={playerRef}
                  url={lesson.videoUrl}
                  playing={false}
                  controls={true}
                  width="100%"
                  height="100%"
                  onDuration={setDuration}
                  onProgress={(state) => setWatchTime(state.playedSeconds)}
                />
              ) : (
                <div className="text-center text-white">
                  <div className="text-6xl mb-4">🎥</div>
                  <p className="text-xl font-bold">Video Content</p>
                  <p className="text-sm text-gray-400 mt-2">Mock video placeholder</p>
                  <p className="text-xs text-gray-500 mt-1">In production, actual videos would stream here</p>
                </div>
              )}
            </div>

            {/* Lesson Content */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 mb-8">
              <h2 className="text-2xl font-bold text-dark-500 mb-4">📖 Lesson Details</h2>
              <p className="text-gray-700 leading-relaxed mb-6">{lesson.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">⏱️</span>
                  <div>
                    <p className="text-xs text-gray-600">Duration</p>
                    <p className="font-bold text-dark-500">{lesson.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">📊</span>
                  <div>
                    <p className="text-xs text-gray-600">Difficulty</p>
                    <p className="font-bold text-dark-500">{lesson.difficulty}</p>
                  </div>
                </div>
              </div>

              {/* Learning Objectives */}
              {lesson.objectives && (
                <div>
                  <h3 className="text-lg font-bold text-dark-500 mb-3">🎯 Learning Objectives</h3>
                  <ul className="space-y-2">
                    {lesson.objectives.map((obj, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-700">
                        <span className="text-primary-600 font-bold">✓</span>
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Practice Exercises */}
            {lesson.exercises && lesson.exercises.length > 0 && !showCompletionUI && (
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 mb-8">
                <h2 className="text-2xl font-bold text-dark-500 mb-4">✋ Practice Exercises</h2>
                <div className="space-y-4">
                  {lesson.exercises.map((exercise, idx) => (
                    <div key={exercise.id} className="p-4 rounded-lg border-2 border-gray-200 hover:border-primary-300 bg-gray-50">
                      <div className="flex items-start gap-3">
                        <div className="text-2xl">{exercise.type === 'practice' ? '✋' : '❓'}</div>
                        <div className="flex-1">
                          <p className="font-bold text-dark-500">{exercise.text}</p>
                          <p className="text-xs text-gray-600 uppercase tracking-wider mt-1 capitalize">{exercise.type}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            {!showCompletionUI && (
              <div className="flex gap-4 mb-8">
                {hasPrevLesson && (
                  <button
                    onClick={handlePreviousLesson}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-dark-500 rounded-xl font-bold hover:bg-gray-50 transition-all duration-300"
                  >
                    ← Previous Lesson
                  </button>
                )}
                <button
                  onClick={handleMarkComplete}
                  disabled={marking}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-success-500 to-success-600 text-white rounded-xl font-bold hover:shadow-lg active:scale-95 transition-all duration-300 disabled:opacity-75"
                >
                  {marking ? 'Marking...' : '✓ Mark as Complete'}
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Lesson Status Card */}
            {showCompletionUI ? (
              <div className="bg-gradient-to-br from-success-50 to-success-100 rounded-2xl p-8 border-2 border-success-200 sticky top-32 shadow-lg">
                <div className="text-center">
                  <div className="text-7xl mb-4 animate-bounce">🎉</div>
                  <h3 className="text-2xl font-black text-success-700 mb-2">Lesson Complete!</h3>
                  <p className="text-sm text-success-600 mb-6">Excellent work! You've mastered this lesson.</p>

                  <div className="space-y-2">
                    {hasNextLesson && (
                      <button
                        onClick={handleNextLesson}
                        className="w-full px-4 py-3 bg-success-500 text-white rounded-lg font-bold hover:bg-success-600 active:scale-95 transition-all"
                      >
                        Next Lesson →
                      </button>
                    )}
                    <button
                      onClick={() => navigate(`/learn/${courseId}`)}
                      className="w-full px-4 py-3 border-2 border-success-300 text-success-700 rounded-lg font-bold hover:bg-success-50 transition-all"
                    >
                      {isLastLesson ? '✓ Back to Course' : 'Back to Course'}
                    </button>
                  </div>

                  {isLastLesson && (
                    <div className="mt-6 text-center p-4 bg-white rounded-lg border-2 border-success-200">
                      <p className="text-3xl mb-2">🏆</p>
                      <p className="font-bold text-success-700">Course Completed!</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="sticky top-32 space-y-6">
                {/* Course Outline */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                  <h3 className="text-lg font-bold text-dark-500 mb-4">📚 Course Outline</h3>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {lessons.map((l, idx) => (
                      <Link
                        key={l.id}
                        to={`/lesson/${l.id}`}
                        className={`block p-3 rounded-lg transition-all ${
                          l.id === parseInt(lessonId)
                            ? 'bg-primary-100 border-l-4 border-primary-600 text-primary-600 font-bold'
                            : 'hover:bg-gray-100 text-gray-700 border-l-4 border-transparent'
                        }`}
                      >
                        <p className="font-medium text-sm">Lesson {idx + 1}</p>
                        <p className="text-xs text-gray-600 truncate">{l.title}</p>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Progress Stats */}
                <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-6 border border-primary-200">
                  <h3 className="text-lg font-bold text-primary-700 mb-4">📊 Progress</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-primary-600 font-bold uppercase tracking-wider mb-1">Lesson {currentIndex + 1} of {lessons.length}</p>
                      <div className="w-full bg-primary-200 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-primary-600 h-2 transition-all duration-300"
                          style={{ width: `${((currentIndex + 1) / lessons.length) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    {lesson.videoUrl && duration > 0 && (
                      <div>
                        <p className="text-xs text-primary-600 font-bold uppercase tracking-wider mb-1">Video Progress</p>
                        <p className="text-xs text-primary-600">
                          {Math.round(watchTime)}s / {Math.round(duration)}s
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonPlayer;
