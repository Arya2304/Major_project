import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 text-white py-24 md:py-32 px-4 text-center">
        {/* Subtle gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none"></div>
        {/* Floating decoration elements */}
        <div className="absolute top-20 right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-black mb-8 tracking-tight leading-tight drop-shadow-lg">Learn Sign Language</h1>
          <p className="text-lg md:text-xl mb-12 opacity-90 font-light max-w-2xl mx-auto leading-relaxed drop-shadow">
            Master ASL, ISL, and BSL through immersive video lessons. Join thousands transforming their communication today.
          </p>
          <div className="flex gap-6 justify-center flex-wrap">
            {!isAuthenticated ? (
              <>
                <Link to="/register" className="bg-primary-500 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-primary-600 hover:scale-105 active:scale-100 transition-all duration-300 min-h-[56px] flex items-center shadow-xl hover:shadow-2xl focus-visible:ring-2 focus-visible:ring-white drop-shadow-lg">
                  Get Started Free
                </Link>
                <Link to="/signs" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-white/20 hover:scale-105 active:scale-100 transition-all duration-300 min-h-[56px] flex items-center backdrop-blur-sm focus-visible:ring-2 focus-visible:ring-white">
                  Explore Now
                </Link>
              </>
            ) : (
              <>
                <Link to="/signs" className="bg-primary-500 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-primary-600 hover:scale-105 active:scale-100 transition-all duration-300 min-h-[56px] flex items-center shadow-xl hover:shadow-2xl focus-visible:ring-2 focus-visible:ring-white drop-shadow-lg">
                  Start Learning
                </Link>
                <Link to="/dashboard" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-white/20 hover:scale-105 active:scale-100 transition-all duration-300 min-h-[56px] flex items-center backdrop-blur-sm focus-visible:ring-2 focus-visible:ring-white">
                  Dashboard
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 md:py-32 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-black text-center mb-16 text-dark-500 tracking-tight">Why SignLearn?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gradient-to-br from-primary-50 to-primary-100/50 p-8 md:p-10 rounded-2xl border border-primary-200 hover:border-primary-400 hover:shadow-xl hover:scale-105 hover:-translate-y-1 transition-all duration-300 text-center cursor-pointer group">
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">🎥</div>
              <h3 className="text-xl font-bold mb-3 text-dark-500">Video-First Learning</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Learn through high-quality video demonstrations with real-world examples</p>
            </div>
            <div className="bg-gradient-to-br from-success-50 to-success-100/50 p-8 md:p-10 rounded-2xl border border-success-200 hover:border-success-400 hover:shadow-xl hover:scale-105 hover:-translate-y-1 transition-all duration-300 text-center cursor-pointer group">
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">🌍</div>
              <h3 className="text-xl font-bold mb-3 text-dark-500">Multiple Languages</h3>
              <p className="text-gray-600 text-sm leading-relaxed">ASL, ISL, and BSL all in one comprehensive platform</p>
            </div>
            <div className="bg-gradient-to-br from-warning-50 to-warning-100/50 p-8 md:p-10 rounded-2xl border border-warning-200 hover:border-warning-400 hover:shadow-xl hover:scale-105 hover:-translate-y-1 transition-all duration-300 text-center cursor-pointer group">
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">📊</div>
              <h3 className="text-xl font-bold mb-3 text-dark-500">Track Progress</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Monitor your learning journey with detailed statistics and insights</p>
            </div>
            <div className="bg-gradient-to-br from-error-50 to-error-100/50 p-8 md:p-10 rounded-2xl border border-error-200 hover:border-error-400 hover:shadow-xl hover:scale-105 hover:-translate-y-1 transition-all duration-300 text-center cursor-pointer group">
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">♿</div>
              <h3 className="text-xl font-bold mb-3 text-dark-500">Accessible Design</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Built from the ground up for deaf and mute users</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-gradient-to-b from-primary-50 via-white to-gray-50 py-24 md:py-32 px-4 text-center border-t border-primary-200">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-black mb-6 text-dark-500 tracking-tight">Ready to Transform Your Skills?</h2>
          <p className="text-lg md:text-xl mb-12 text-gray-600 font-light leading-relaxed max-w-xl mx-auto">Begin your sign language journey with our comprehensive, beginner-friendly courses. No experience necessary.</p>
          {!isAuthenticated && (
            <Link to="/register" className="inline-block bg-primary-500 text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-primary-600 active:bg-primary-700 hover:scale-105 active:scale-100 transition-all duration-300 min-h-[56px] flex items-center justify-center shadow-xl hover:shadow-2xl focus-visible:ring-2 focus-visible:ring-primary-300">
              Start Learning Today
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;

