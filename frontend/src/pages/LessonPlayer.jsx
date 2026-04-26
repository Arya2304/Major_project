import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import AccessibleVideo from '../components/common/AccessibleVideo';
import AccessibleButton from '../components/common/AccessibleButton';
import LessonComplete from '../components/LessonComplete';
import QuizCard from '../components/QuizCard';
import { mockCourses } from '../data/mockData';

/**
 * LessonPlayer.jsx — Phase 4, Phase 5 (updated)
 * Full lesson viewing page with video, description, lesson list
 * Shows course progress and allows marking lessons complete
 * Phase 5: Integrated LessonComplete modal for celebration
 */
const LessonPlayer = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(window.location.search);
  const courseId = searchParams.get('course');

  // Get course and lesson from mock data
  const course = mockCourses.find((c) => c.id === parseInt(courseId) || c.id === courseId);
  const lessons = course?.lessons || [];
  const currentLessonIndex = lessons.findIndex(
    (l) => l.id === parseInt(lessonId) || l.id === lessonId
  );
  const currentLesson = lessons[currentLessonIndex] || lessons[0];

  // Track completed lessons
  const [completedLessons, setCompletedLessons] = useState(new Set());
  const [isLessonCompleteOpen, setIsLessonCompleteOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Sample quiz questions for the lesson
  const quizQuestions = [
    {
      question: 'What is the correct hand shape for this sign?',
      options: [
        { id: 1, label: 'Open palm', emoji: '✋' },
        { id: 2, label: 'Closed fist', emoji: '✊' },
        { id: 3, label: 'Pointing finger', emoji: '☝️' },
        { id: 4, label: 'Two fingers', emoji: '✌️' },
      ],
      correctIndex: 0,
    },
    {
      question: 'Which direction should the movement go?',
      options: [
        { id: 1, label: 'Up and down', emoji: '⬆️⬇️' },
        { id: 2, label: 'Side to side', emoji: '⬅️➡️' },
        { id: 3, label: 'Circular motion', emoji: '🔄' },
        { id: 4, label: 'Forward and back', emoji: '⬀⬁' },
      ],
      correctIndex: 1,
    },
    {
      question: 'What facial expression is important for this sign?',
      options: [
        { id: 1, label: 'Happy smile', emoji: '😊' },
        { id: 2, label: 'Neutral expression', emoji: '😐' },
        { id: 3, label: 'Surprised expression', emoji: '😲' },
        { id: 4, label: 'Concentration', emoji: '🤔' },
      ],
      correctIndex: 2,
    },
  ];

  // Calculate progress
  const completedCount = completedLessons.size;
  const progressPercent = Math.round((completedCount / lessons.length) * 100);

  /**
   * Open lesson completion modal
   */
  const handleMarkComplete = () => {
    const newCompleted = new Set(completedLessons);
    newCompleted.add(currentLesson.id);
    setCompletedLessons(newCompleted);
    setIsLessonCompleteOpen(true);
  };

  /**
   * Handle next lesson after completion
   */
  const handleCompleteNext = () => {
    setIsLessonCompleteOpen(false);
    if (currentLessonIndex < lessons.length - 1) {
      goToLesson(lessons[currentLessonIndex + 1].id);
    }
  };

  /**
   * Handle back to course after completion
   */
  const handleCompleteBack = () => {
    setIsLessonCompleteOpen(false);
  };

  /**
   * Handle next quiz question
   */
  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Quiz completed
      setIsQuizOpen(false);
      setCurrentQuestionIndex(0);
    }
  };

  /**
   * Navigate to another lesson
   */
  const goToLesson = (lessonId) => {
    navigate(`/lesson/${lessonId}?course=${courseId}`);
  };

  if (!course || !currentLesson) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl text-gray-900 font-bold mb-4">📚 Lesson not found</p>
          <Link to="/learn">
            <AccessibleButton variant="primary">Back to Learning</AccessibleButton>
          </Link>
        </div>
      </div>
    );
  }

  const isCurrentLessonCompleted = completedLessons.has(currentLesson.id);

  return (
    <div className="min-h-screen bg-white">
      {/* Top Progress Bar */}
      <div className="bg-gray-50 border-b border-gray-200 sticky top-0 z-40">
        <div className="page-container py-4">
          {/* Breadcrumb */}
          <div className="text-sm text-gray-600 mb-3 flex items-center gap-2">
            <Link to="/learn" className="text-primary-600 hover:text-primary-700">
              My Learning
            </Link>
            <span>→</span>
            <Link to={`/courses/${courseId}`} className="text-primary-600 hover:text-primary-700">
              {course.title}
            </Link>
            <span>→</span>
            <span className="text-gray-900 font-medium">{currentLesson.title}</span>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-xl font-bold text-gray-900">{currentLesson.title}</h1>
                <span className="text-sm font-bold text-primary-600">{progressPercent}% Complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-primary-500 to-accent-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="page-container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main: Video + Description */}
          <div className="lg:col-span-2">
            {/* Video Player */}
            <div className="mb-8">
              <AccessibleVideo
                src={currentLesson.videoUrl}
                title={currentLesson.title}
                captions={currentLesson.captions || []}
              />
            </div>

            {/* Lesson Description */}
            <div className="bg-gray-50 rounded-xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">📝 Lesson Notes</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {currentLesson.description ||
                  `Master the sign for "${currentLesson.title}". This lesson covers the proper hand shape, position, movement, and facial expression needed to communicate this sign accurately. Watch carefully and practice along with the instructor.`}
              </p>

              {/* Learning Points (if available) */}
              {currentLesson.learningPoints && currentLesson.learningPoints.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-bold text-gray-900 mb-3">Key Points:</h3>
                  <ul className="space-y-2">
                    {currentLesson.learningPoints.map((point, idx) => (
                      <li key={idx} className="flex gap-2 text-gray-700">
                        <span className="text-accent-600 font-bold">✓</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Quiz Section */}
            {isQuizOpen && (
              <div className="bg-blue-50 rounded-xl p-8 mb-8 border-2 border-blue-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">📝 Lesson Quiz</h2>
                <p className="text-sm text-gray-600 mb-6">
                  Question {currentQuestionIndex + 1} of {quizQuestions.length}
                </p>
                <QuizCard
                  question={quizQuestions[currentQuestionIndex].question}
                  options={quizQuestions[currentQuestionIndex].options}
                  correctIndex={quizQuestions[currentQuestionIndex].correctIndex}
                  onNext={handleNextQuestion}
                  onSubmit={() => {}}
                />
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <AccessibleButton
                variant={isCurrentLessonCompleted ? 'primary' : 'outline'}
                onClick={isCurrentLessonCompleted ? undefined : handleMarkComplete}
                disabled={isCurrentLessonCompleted}
                className="flex-1"
              >
                {isCurrentLessonCompleted ? '✅ Completed' : '▶️ Mark as Complete'}
              </AccessibleButton>

              {/* Practice This Lesson Button */}
              <Link
                to={`/practice?lesson=${currentLesson.id}&course=${courseId}`}
                className="flex-1"
              >
                <AccessibleButton
                  variant="accent"
                  className="w-full"
                >
                  🎥 Practice This Lesson
                </AccessibleButton>
              </Link>

              {/* Take Quiz Button */}
              <AccessibleButton
                variant="outline"
                onClick={() => setIsQuizOpen(true)}
                className="flex-1"
              >
                📝 Take Quiz
              </AccessibleButton>

              {/* Next Lesson Button */}
              {currentLessonIndex < lessons.length - 1 && (
                <AccessibleButton
                  variant="primary"
                  onClick={() => goToLesson(lessons[currentLessonIndex + 1].id)}
                  className="flex-1"
                >
                  Next Lesson →
                </AccessibleButton>
              )}
            </div>
          </div>

          {/* Side: Lesson List */}
          <div>
            <div className="bg-gray-50 rounded-xl p-6 sticky top-32">
              <h3 className="text-lg font-bold text-gray-900 mb-4">📚 Course Lessons</h3>
              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                {lessons.map((lesson, idx) => {
                  const isCurrentLesson = lesson.id === currentLesson.id;
                  const isCompleted = completedLessons.has(lesson.id);
                  const isLocked = lesson.locked;

                  return (
                    <button
                      key={lesson.id}
                      onClick={() => !isLocked && goToLesson(lesson.id)}
                      disabled={isLocked}
                      className={`w-full text-left p-4 rounded-lg transition-all ${
                        isCurrentLesson
                          ? 'bg-primary-100 border-2 border-primary-500 font-bold text-primary-900'
                          : isLocked
                          ? 'bg-gray-200 text-gray-500 cursor-not-allowed opacity-60'
                          : 'bg-white border border-gray-200 hover:border-primary-300 hover:bg-primary-50 cursor-pointer'
                      }`}
                      aria-label={`${lesson.title}${isCompleted ? ', completed' : ''}${isLocked ? ', locked' : ''}`}
                    >
                      <div className="flex items-start gap-3">
                        {/* Icon */}
                        <div className="text-lg mt-1">
                          {isLocked ? '🔒' : isCompleted ? '✅' : `${idx + 1}`}
                        </div>

                        {/* Lesson Info */}
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold truncate">{lesson.title}</p>
                          <p className={`text-xs ${isCurrentLesson ? 'text-primary-700' : isLocked ? 'text-gray-500' : 'text-gray-500'}`}>
                            {lesson.duration || 10} min
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Course Stats */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="text-sm text-gray-600">
                  <p className="mb-2">
                    <strong>{completedCount}</strong> of <strong>{lessons.length}</strong> lessons completed
                  </p>
                  <p className="text-xs">
                    Estimated time remaining: <strong>{Math.max(0, lessons.length - completedCount) * 10}</strong> min
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lesson Complete Modal */}
      <LessonComplete
        isOpen={isLessonCompleteOpen}
        lessonTitle={currentLesson.title}
        xpEarned={50}
        streak={5}
        timeTaken="12 min"
        onNext={handleCompleteNext}
        onBack={handleCompleteBack}
      />
    </div>
  );
};

export default LessonPlayer;
