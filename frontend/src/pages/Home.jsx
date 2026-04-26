import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AccessibleButton from '../components/common/AccessibleButton';
import AccessibleCard from '../components/common/AccessibleCard';

/**
 * Home.jsx — Phase 3
 * Landing page for new visitors
 * Sections: Hero, Features, Testimonials, Final CTA
 * Uses Phase 2 components and Phase 1 design tokens
 * NOTE: Wrapped by PublicLayout in AppRoutes, so no layout wrapper needed
 */
const Home = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Feature cards data
  const features = [
    {
      icon: '🤟',
      title: 'Interactive Lessons',
      description: 'Learn through engaging video demonstrations with real-world sign language examples and clear explanations.',
    },
    {
      icon: '📊',
      title: 'Progress Tracking',
      description: 'Monitor your learning journey with detailed statistics, achievements, and milestone celebrations.',
    },
    {
      icon: '👥',
      title: 'Community Practice',
      description: 'Connect with fellow learners, practice together, and build confidence in a supportive environment.',
    },
    {
      icon: '🎓',
      title: 'Expert Instructors',
      description: 'Learn from certified deaf educators and native sign language speakers with years of experience.',
    },
  ];

  // Testimonial data
  const testimonials = [
    {
      quote: 'SignLearn completely changed how I communicate with my deaf friends. The video lessons are so clear and engaging!',
      author: 'Priya Sharma',
      role: 'Student, Delhi',
      avatar: '👩',
    },
    {
      quote: 'As a hearing parent, this platform helped me learn ISL at my own pace. Highly recommended for anyone serious about sign language.',
      author: 'Rajesh Kumar',
      role: 'Parent, Mumbai',
      avatar: '👨',
    },
    {
      quote: 'The interactive practice sessions are fantastic. I feel confident using ISL in real conversations now.',
      author: 'Aisha Patel',
      role: 'Professional, Bangalore',
      avatar: '👩‍💼',
    },
  ];

  return (
    <>
      {/* ========== HERO SECTION ========== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 text-white section-gap">
        {/* Decorative blobs */}
        <div className="absolute top-10 right-5 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
        <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

        {/* Hero Content */}
        <div className="page-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <div>
              <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 leading-tight">
                Learn Indian Sign Language
              </h1>
              <p className="text-lg md:text-xl mb-8 text-white/90 leading-relaxed max-w-xl">
                Connect, communicate, and build friendships through ISL. Learn at your own pace with interactive video lessons from expert instructors.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <AccessibleButton
                  variant="ghost"
                  size="lg"
                  onClick={() => navigate(isAuthenticated ? '/learn' : '/register')}
                  aria-label={isAuthenticated ? 'Start learning' : 'Register for free'}
                  className="text-white border-white hover:bg-white/20"
                >
                  {isAuthenticated ? '▶️ Start Learning' : '🎓 Get Started Free'}
                </AccessibleButton>
                <AccessibleButton
                  variant="outline"
                  size="lg"
                  onClick={() => navigate('/courses')}
                  aria-label="Browse all courses"
                  className="text-white border-white hover:bg-white/10"
                >
                  📚 Browse Courses
                </AccessibleButton>
              </div>
            </div>

            {/* Right: Video Placeholder */}
            <div className="hidden lg:block">
              <div className="aspect-video bg-black/30 rounded-2xl border-2 border-white/30 flex items-center justify-center backdrop-blur-sm">
                <div className="flex flex-col items-center gap-4">
                  <div className="text-7xl">🎥</div>
                  <p className="text-white/80 font-semibold">Video Placeholder</p>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Video Placeholder */}
          <div className="lg:hidden mt-12">
            <div className="aspect-video bg-black/30 rounded-2xl border-2 border-white/30 flex items-center justify-center backdrop-blur-sm">
              <div className="flex flex-col items-center gap-4">
                <div className="text-7xl">🎥</div>
                <p className="text-white/80 font-semibold">Interactive Video Demo</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FEATURES SECTION ========== */}
      <section className="bg-gray-50 section-gap">
        <div className="page-container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
              Why Choose SignLearn?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Designed by deaf educators and language experts for effective sign language learning.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <AccessibleCard
                key={idx}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                variant="light"
                className="text-center"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ========== TESTIMONIALS SECTION ========== */}
      <section className="bg-white section-gap">
        <div className="page-container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
              Loved by Learners
            </h2>
            <p className="text-lg text-gray-600">
              Join thousands who have transformed their sign language skills
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="card-hover p-8 flex flex-col"
              >
                {/* Quote Text */}
                <blockquote className="italic text-gray-700 mb-6 flex-1 text-lg leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                {/* Author Info */}
                <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-2xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FINAL CTA SECTION ========== */}
      <section className="bg-gradient-to-r from-primary-500 to-accent-500 text-white section-gap">
        <div className="page-container text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 max-w-2xl mx-auto">
            Ready to Start Learning?
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-xl mx-auto">
            Join our community of learners and begin your sign language journey today.
          </p>

          {!isAuthenticated && (
            <AccessibleButton
              variant="ghost"
              size="lg"
              onClick={() => navigate('/register')}
              aria-label="Register for free"
              className="text-white border-white hover:bg-white/20"
            >
              ✨ Create Free Account
            </AccessibleButton>
          )}
        </div>
      </section>
    </>
  );
};

export default Home;

