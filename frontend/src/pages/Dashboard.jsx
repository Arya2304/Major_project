import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { coursesAPI } from '../api/courses';
import { progressAPI } from '../api/progress';
import Loader from '../components/common/Loader';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [myCourses, setMyCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const [statsData, coursesData] = await Promise.all([
          progressAPI.getStats(),
          coursesAPI.getMyCourses(),
        ]);
        setStats(statsData);
        setMyCourses(coursesData);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="dashboard-page">
      <div className="container">
        <div className="dashboard-header">
          <h1>📊 Dashboard</h1>
          <p>Welcome back, {user?.first_name || user?.email}!</p>
        </div>

        {stats && (
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">✋</div>
              <div className="stat-content">
                <h3>{stats.total_signs_learned}</h3>
                <p>Signs Learned</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">🎥</div>
              <div className="stat-content">
                <h3>{stats.total_videos_watched}</h3>
                <p>Videos Watched</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">📚</div>
              <div className="stat-content">
                <h3>{stats.total_lessons_completed}</h3>
                <p>Lessons Completed</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">🔥</div>
              <div className="stat-content">
                <h3>{stats.current_streak}</h3>
                <p>Day Streak</p>
              </div>
            </div>
          </div>
        )}

        <div className="my-courses-section">
          <h2 className="section-title">📚 My Courses</h2>
          {myCourses.length > 0 ? (
            <div className="courses-list">
              {myCourses.map((enrollment) => (
                <Link
                  key={enrollment.id}
                  to={`/courses/${enrollment.course.id}`}
                  className="course-enrollment-card"
                >
                  <div className="enrollment-content">
                    {enrollment.course.thumbnail && (
                      <img
                        src={enrollment.course.thumbnail}
                        alt={enrollment.course.title}
                        className="enrollment-thumbnail"
                      />
                    )}
                    <div className="enrollment-info">
                      <h3>{enrollment.course.title}</h3>
                      <div className="progress-bar-container">
                        <div className="progress-bar">
                          <div
                            className="progress-fill"
                            style={{
                              width: `${enrollment.progress_percentage}%`,
                            }}
                          />
                        </div>
                        <span className="progress-text">
                          {Math.round(enrollment.progress_percentage)}% Complete
                        </span>
                      </div>
                      {enrollment.is_completed && (
                        <span className="completed-badge">✓ Completed</span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>📚 You haven't enrolled in any courses yet.</p>
              <Link to="/courses" className="btn btn-primary">
                Browse Courses
              </Link>
            </div>
          )}
        </div>

        <div className="quick-actions">
          <h2 className="section-title">⚡ Quick Actions</h2>
          <div className="actions-grid">
            <Link to="/signs" className="action-card">
              <div className="action-icon">✋</div>
              <h3>Learn Signs</h3>
              <p>Practice individual signs</p>
            </Link>
            <Link to="/courses" className="action-card">
              <div className="action-icon">📚</div>
              <h3>Browse Courses</h3>
              <p>Explore new courses</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

