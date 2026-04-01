import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { mockCourses } from '../data/mockData';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [userProgress, setUserProgress] = useState({
    lessonsCompleted: 12,
    signsLearned: 45,
    streak: 7,
    currentCourse: mockCourses[0],
    courseProgress: 65,
  });

  // Recent lessons from current course
  const recentLessons = userProgress.currentCourse?.lessons?.slice(0, 4) || [];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-5xl font-black text-dark-500 mb-2">
          👋 Welcome back, {user?.first_name || 'Learner'}!
        </h1>
        <p className="text-lg text-gray-600 font-medium">
          Keep up the momentum and continue your sign language journey
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-12">
        {/* Stat Cards */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-default group">
          <div className="flex items-center gap-4">
            <div className="text-4xl group-hover:scale-110 transition-transform duration-200">✋</div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Signs Learned</p>
              <p className="text-3xl font-black text-dark-500 mt-1">{userProgress.signsLearned}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-default group">
          <div className="flex items-center gap-4">
            <div className="text-4xl group-hover:scale-110 transition-transform duration-200">📚</div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Lessons Done</p>
              <p className="text-3xl font-black text-dark-500 mt-1">{userProgress.lessonsCompleted}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-default group">
          <div className="flex items-center gap-4">
            <div className="text-4xl group-hover:scale-110 transition-transform duration-200">🔥</div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Day Streak</p>
              <p className="text-3xl font-black text-dark-500 mt-1">{userProgress.streak}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-default group">
          <div className="flex items-center gap-4">
            <div className="text-4xl group-hover:scale-110 transition-transform duration-200">🎯</div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Progress</p>
              <p className="text-3xl font-black text-primary-600 mt-1">{userProgress.courseProgress}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Continue Learning */}
      <div className="mb-10">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200">
            {/* Card Header */}
            <div className="bg-gradient-to-br from-primary-500 via-primary-550 to-primary-600 px-8 py-5">
              <h2 className="text-xl font-black text-white flex items-center gap-2">📚 Continue Learning</h2>
            </div>

            {/* Card Content */}
            <div className="p-8">
              {userProgress.currentCourse && (
                <>
                  <div className="flex items-start gap-6 mb-8">
                    <div className="text-6xl drop-shadow-sm">{userProgress.currentCourse.thumbnail}</div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-black text-dark-500 mb-1">
                        {userProgress.currentCourse.title}
                      </h3>
                      <p className="text-gray-600 font-medium mb-4 leading-relaxed">
                        {userProgress.currentCourse.subtitle}
                      </p>
                      <div className="flex gap-3 mb-6">
                        <span className="px-3 py-1.5 bg-primary-100 text-primary-700 rounded-full text-xs font-bold uppercase tracking-wider">
                          {userProgress.currentCourse.difficulty}
                        </span>
                        <span className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-xs font-bold uppercase tracking-wider">
                          {userProgress.currentCourse.language}
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-8">
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-bold text-gray-700">Course Progress</span>
                          <span className="text-sm font-bold text-primary-600">
                            {userProgress.courseProgress}% Complete
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-primary-500 to-primary-600 h-full transition-all duration-500 rounded-full shadow-sm"
                            style={{ width: `${userProgress.courseProgress}%` }}
                          />
                        </div>
                      </div>

                      {/* Buttons */}
                      <div className="flex gap-3">
                        <button
                          onClick={() => navigate(`/learn/${userProgress.currentCourse.id}`)}
                          className="px-6 py-2.5 bg-primary-500 text-white font-bold rounded-lg hover:bg-primary-600 hover:shadow-md active:scale-95 transition-all duration-200 text-sm"
                        >
                          Continue Course →
                        </button>
                        <Link
                          to="/learn"
                          className="px-6 py-2.5 border-2 border-gray-200 text-dark-500 font-bold rounded-lg hover:border-primary-500 hover:text-primary-600 hover:bg-primary-50 active:scale-95 transition-all duration-200 text-sm"
                        >
                          View All
                        </Link>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
      </div>

      {/* Recent Lessons */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200">
        <div className="bg-gray-50 px-8 py-5 border-b border-gray-100">
          <h2 className="text-xl font-black text-dark-500">📖 Recent Lessons</h2>
        </div>

        <div className="p-8">
          {recentLessons.length > 0 ? (
            <div className="space-y-3">
              {recentLessons.map((lesson, idx) => (
                <Link
                  key={lesson.id}
                  to={`/lesson/${lesson.id}`}
                  className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:border-primary-300 hover:bg-primary-50 hover:shadow-sm active:scale-[0.98] transition-all duration-200 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary-100 text-primary-600 font-bold group-hover:bg-primary-200 transition-colors duration-200 text-sm">
                      {idx + 1}
                    </div>
                    <div>
                      <p className="font-bold text-dark-500">{lesson.title}</p>
                      <p className="text-sm text-gray-500 font-medium">⏱️ {lesson.duration}</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-primary-500 text-white font-bold rounded-lg hover:bg-primary-600 hover:shadow-md active:scale-95 transition-all duration-200 text-sm">
                    Start →
                  </button>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 font-medium">No lessons available yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

