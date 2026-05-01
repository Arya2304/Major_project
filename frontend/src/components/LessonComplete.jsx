import React, { useState, useEffect } from 'react';
import AccessibleButton from './common/AccessibleButton';
import './LessonComplete.css';

/**
 * LessonComplete.jsx — Phase 5
 * Celebration modal shown after user completes a lesson
 * Shows XP earned, streak, and celebration animations
 */

const LessonComplete = ({
  isOpen = false,
  lessonTitle = 'Hello Sign',
  xpEarned = 50,
  streak = 3,
  timeTaken = '12 min',
  onNext = () => {},
  onBack = () => {},
  autoDismissAfter = 8000, // milliseconds
}) => {
  const [countdown, setCountdown] = useState(autoDismissAfter / 1000);
  const [isDismissing, setIsDismissing] = useState(false);

  /**
   * Auto-dismiss modal after countdown
   */
  useEffect(() => {
    if (!isOpen) return;

    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setIsDismissing(true);
          onBack();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [isOpen, onBack]);

  if (!isOpen) return null;

  return (
    <div className="lesson-complete-overlay" role="dialog" aria-modal="true" aria-labelledby="completion-title">
      {/* Confetti Emojis Background */}
      <div className="confetti">
        {[...Array(12)].map((_, i) => (
          <span key={i} className={`confetti-item confetti-${i}`}>
            {['🎉', '✨', '🌟', '🎊'][i % 4]}
          </span>
        ))}
      </div>

      {/* Main Card */}
      <div className="lesson-complete-card">
        {/* Celebration Emoji */}
        <div className="celebration-emoji">🎓</div>

        {/* Title */}
        <h1 id="completion-title" className="completion-title">
          Lesson Complete!
        </h1>

        {/* Lesson Name */}
        <p className="lesson-name">
          You completed: <strong>{lessonTitle}</strong>
        </p>

        {/* XP Earned */}
        <div className="xp-earned">
          <div className="xp-amount">+{xpEarned}</div>
          <div className="xp-label">XP</div>
        </div>

        {/* Stats Grid */}
        <div className="completion-stats">
          <div className="stat">
            <div className="stat-value">{timeTaken}</div>
            <div className="stat-label">Time Taken</div>
          </div>
          <div className="stat">
            <div className="stat-value">🔥 {streak}</div>
            <div className="stat-label">Day Streak</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="completion-buttons">
          <AccessibleButton variant="primary" onClick={onNext} className="w-full">
            Next Lesson →
          </AccessibleButton>
          <AccessibleButton variant="outline" onClick={onBack} className="w-full">
            Back to Course
          </AccessibleButton>
        </div>

        {/* Auto-dismiss Countdown */}
        <p className="auto-dismiss-message">
          Returning in {countdown}s... <button onClick={onBack} className="cancel-countdown">cancel</button>
        </p>
      </div>
    </div>
  );
};

export default LessonComplete;
