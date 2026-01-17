import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">👋 Learn Sign Language</h1>
          <p className="hero-subtitle">
            Master ASL, ISL, and BSL through interactive video lessons
          </p>
          <div className="hero-buttons">
            {!isAuthenticated ? (
              <>
                <Link to="/register" className="btn btn-primary btn-large">
                  ✨ Get Started
                </Link>
                <Link to="/signs" className="btn btn-outline btn-large">
                  ✋ Explore Signs
                </Link>
              </>
            ) : (
              <>
                <Link to="/signs" className="btn btn-primary btn-large">
                  ✋ Start Learning
                </Link>
                <Link to="/dashboard" className="btn btn-outline btn-large">
                  📊 View Dashboard
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Why SignLearn?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎥</div>
              <h3>Video-First Learning</h3>
              <p>Learn through high-quality video demonstrations</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🌍</div>
              <h3>Multiple Languages</h3>
              <p>ASL, ISL, and BSL all in one platform</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Track Progress</h3>
              <p>Monitor your learning journey with detailed stats</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">♿</div>
              <h3>Accessible Design</h3>
              <p>Built for deaf and mute users with accessibility in mind</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Ready to Start Learning?</h2>
          <p>Join thousands of learners mastering sign language</p>
          {!isAuthenticated && (
            <Link to="/register" className="btn btn-primary btn-large">
              ✨ Sign Up Free
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;

