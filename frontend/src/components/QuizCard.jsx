import React, { useState } from 'react';
import AccessibleButton from './common/AccessibleButton';
import './QuizCard.css';

/**
 * QuizCard.jsx — Phase 5
 * Multiple choice quiz component with feedback animations
 * Shows correct/incorrect answers with visual feedback and sounds
 */

const QuizCard = ({
  question = "Which sign means 'Hello'?",
  options = [
    { id: 1, label: 'Hello', emoji: '👋' },
    { id: 2, label: 'Goodbye', emoji: '👋' },
    { id: 3, label: 'Thank You', emoji: '🙏' },
    { id: 4, label: 'Yes', emoji: '👍' },
  ],
  correctIndex = 0,
  onNext = () => {},
  isSubmitted = false,
  onSubmit = () => {},
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleAnswerClick = (index) => {
    if (answered) return; // Prevent changing answer after submission

    setSelectedAnswer(index);
    const correct = index === correctIndex;
    setIsCorrect(correct);
    setAnswered(true);

    // Call onSubmit callback if provided
    if (onSubmit) {
      onSubmit({ selectedIndex: index, isCorrect: correct });
    }
  };

  const handleNextQuestion = () => {
    // Reset for next question
    setSelectedAnswer(null);
    setAnswered(false);
    setIsCorrect(false);
    onNext();
  };

  return (
    <div className="quiz-card bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-500 to-accent-500 px-8 py-6">
        <h2 className="text-2xl font-bold text-white">{question}</h2>
      </div>

      {/* Quiz Content */}
      <div className="p-8">
        {/* Answer Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrectAnswer = index === correctIndex;
            const showCorrect = answered && isCorrectAnswer;
            const showIncorrect = answered && isSelected && !isCorrect;

            let optionClasses =
              'quiz-option p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 text-center';

            if (answered) {
              if (showCorrect) {
                optionClasses += ' quiz-correct border-green-500 bg-green-50 animate-correct';
              } else if (showIncorrect) {
                optionClasses += ' quiz-incorrect border-red-500 bg-red-50 animate-shake';
              } else if (!isSelected) {
                optionClasses += ' border-gray-200 opacity-50 cursor-default';
              }
            } else {
              optionClasses += ` border-gray-200 hover:border-primary-400 hover:bg-primary-50 ${
                isSelected ? 'border-primary-500 bg-primary-50' : ''
              }`;
            }

            return (
              <button
                key={option.id}
                onClick={() => handleAnswerClick(index)}
                disabled={answered}
                className={optionClasses}
                aria-pressed={isSelected}
                aria-label={`Answer option: ${option.label}`}
              >
                {/* Emoji Thumbnail */}
                <div className="text-6xl mb-3">{option.emoji}</div>

                {/* Option Label */}
                <p className="font-semibold text-gray-900 text-lg mb-2">{option.label}</p>

                {/* Feedback Icon */}
                {answered && (
                  <div className="text-2xl">
                    {showCorrect && '✅'}
                    {showIncorrect && '❌'}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback Message */}
        {answered && (
          <div
            className={`feedback-message p-6 rounded-xl mb-8 ${
              isCorrect
                ? 'bg-green-50 border-2 border-green-300 text-green-900'
                : 'bg-red-50 border-2 border-red-300 text-red-900'
            }`}
          >
            <p className="text-lg font-bold">
              {isCorrect ? '✅ Correct! Great job 🎉' : '❌ Try again!'}
            </p>
            {!isCorrect && (
              <p className="text-sm mt-2">
                The correct answer is: <strong>{options[correctIndex].label}</strong>
              </p>
            )}
          </div>
        )}

        {/* Next Question Button */}
        {answered && (
          <AccessibleButton
            variant="primary"
            onClick={handleNextQuestion}
            className="w-full"
          >
            Next Question →
          </AccessibleButton>
        )}

        {/* Call to Action before answering */}
        {!answered && (
          <div className="text-center text-gray-600">
            <p className="text-sm">Click an option to answer the question</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizCard;
