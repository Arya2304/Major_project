import React from 'react';
import './StreakCounter.css';

/**
 * StreakCounter.jsx — Phase 5
 * Displays user's daily learning streak
 * Two sizes: compact (for navbar) and full (for Learn page)
 */

const StreakCounter = ({
  streak = 5,
  activeDays = [true, true, true, false, true, true, true],
  size = 'compact', // 'compact' or 'full'
}) => {
  const isCompact = size === 'compact';

  if (isCompact) {
    return (
      <div className="streak-counter-compact" title={`${streak} day streak`} aria-label={`${streak} day streak`}>
        <span className="flame-emoji">🔥</span>
        <span className="streak-number">{streak}</span>
      </div>
    );
  }

  // Full size version
  return (
    <div className="streak-counter-full">
      <div className="streak-card">
        {/* Header */}
        <div className="streak-header">
          <div className="flame-large">🔥</div>
          <div className="streak-info">
            <h3 className="streak-title">{streak} Day Streak!</h3>
            <p className="streak-subtitle">Keep it up! Learn today to maintain your streak</p>
          </div>
        </div>

        {/* Calendar Strip */}
        <div className="calendar-strip">
          <div className="calendar-label">This week</div>
          <div className="calendar-days">
            {activeDays.map((isActive, index) => {
              const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
              return (
                <div
                  key={index}
                  className={`calendar-day ${isActive ? 'active' : 'missed'}`}
                  title={`${dayLabels[index]}: ${isActive ? 'Completed' : 'Not completed'}`}
                  aria-label={`${dayLabels[index]}: ${isActive ? 'Completed' : 'Not completed'}`}
                >
                  <span className="day-letter">{dayLabels[index][0]}</span>
                  <span className={`day-indicator ${isActive ? 'filled' : 'empty'}`}>
                    {isActive ? '●' : '○'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Motivation Text */}
        <div className="motivation-section">
          <p className="motivation-text">
            {streak >= 7
              ? '🏆 Amazing! You\'ve hit a full week of learning!'
              : streak >= 3
              ? '💪 Great momentum! Keep going!'
              : '🌱 Getting started! Complete a few more days for more rewards.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StreakCounter;
