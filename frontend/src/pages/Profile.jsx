import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import AccessibleButton from '../components/common/AccessibleButton';
import { FaFire, FaUser, FaChevronRight } from 'react-icons/fa';

/**
 * Profile.jsx — Phase 4
 * User profile page with centered mobile-style layout
 * Shows user info, streak, and account settings
 */

const Profile = () => {
  const { user, logout } = useAuth();
  const [streak, setStreak] = useState(1); // Mock streak data

  // Mock week data (days of week with check if completed)
  const weekDays = [
    { day: 'Th', completed: true },
    { day: 'Fr', completed: false },
    { day: 'Sa', completed: false },
    { day: 'Su', completed: false },
    { day: 'Mo', completed: false },
    { day: 'Tu', completed: false },
    { day: 'We', completed: false },
  ];

  const handleStartTrial = () => {
    console.log('Start free trial clicked');
  };

  const handleEditProfile = () => {
    console.log('Edit profile clicked');
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Centered Mobile Container */}
      <div className="flex justify-center items-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Profile Header - Centered */}
          <div className="text-center mb-12 pt-8">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-3xl mx-auto mb-4">
              {(user?.first_name?.[0] || user?.email?.[0] || 'U').toUpperCase()}
            </div>

            {/* Name and Email */}
            <h1 className="text-3xl font-black text-gray-900 mb-1">
              {user?.first_name || user?.email?.split('@')[0] || 'Learner'}
            </h1>
            <p className="text-sm text-gray-600">{user?.email || 'user@example.com'}</p>
          </div>

          {/* Streak Card - Centered */}
          <div className="bg-gradient-to-b from-yellow-50 to-orange-50 rounded-2xl p-8 border-2 border-yellow-100 mb-8 text-center">
            {/* Flame Icon */}
            <div className="flex justify-center mb-4">
              <FaFire className="text-6xl text-orange-500" />
            </div>

            {/* Streak Text */}
            <h2 className="text-3xl font-black text-gray-900 mb-6">
              {streak} day streak
            </h2>

            {/* Week Progress */}
            <div className="flex justify-center gap-2">
              {weekDays.map((day, index) => (
                <div
                  key={index}
                  className={`flex flex-col items-center gap-1`}
                >
                  {/* Circle Indicator */}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      day.completed
                        ? 'bg-orange-500 text-white'
                        : 'bg-white border-2 border-gray-300'
                    }`}
                  >
                    <span className="text-xs font-bold text-gray-700">
                      {day.completed ? '✓' : ''}
                    </span>
                  </div>
                  {/* Day Label */}
                  <p
                    className={`text-xs font-semibold ${
                      day.completed ? 'text-orange-600' : 'text-gray-600'
                    }`}
                  >
                    {day.day}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button - Full Width in Container */}
          <AccessibleButton
            variant="primary"
            onClick={handleStartTrial}
            className="w-full mb-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg"
          >
            Start free trial
          </AccessibleButton>

          {/* Account Section */}
          <div className="space-y-3">
            <p className="text-sm font-bold text-gray-700 px-2">Account</p>

            {/* Edit Personal Data */}
            <button
              onClick={handleEditProfile}
              className="w-full bg-white border-2 border-gray-200 rounded-lg p-4 flex items-center justify-between hover:border-primary-300 hover:bg-primary-50 transition-all"
            >
              <div className="flex items-center gap-3">
                <FaUser className="text-lg text-gray-700" />
                <span className="text-base font-semibold text-gray-900">
                  Edit personal data
                </span>
              </div>
              <FaChevronRight className="text-gray-400" />
            </button>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 hover:bg-red-600 text-white rounded-lg p-4 font-bold transition-all"
            >
              Logout
            </button>
          </div>

          {/* Footer Spacing */}
          <div className="h-24"></div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
