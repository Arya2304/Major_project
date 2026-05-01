import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import instructorImg1 from '../../assets/img1.png';
import instructorImg2 from '../../assets/img 2.png';
import { FaComments, FaBrain, FaHeadset, FaStar, FaUsers } from 'react-icons/fa';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 text-white py-20 md:py-32 px-4">
        {/* Subtle gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none"></div>
        {/* Floating decoration elements */}
        <div className="absolute top-20 right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Main content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Left side - Text content */}
            <div className="text-center lg:text-left">
              <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight leading-tight drop-shadow-lg">
                Your Sign Language Journey Starts Here
              </h1>
              <p className="text-lg md:text-xl mb-8 opacity-90 font-light leading-relaxed drop-shadow">
                Get Hands on practice for ISL, ASL, and BSL with our comprehensive video courses designed for all skill levels.
              </p>
              <div className="flex gap-4 justify-center lg:justify-start flex-wrap">
                {!isAuthenticated ? (
                  <>
                    <Link to="/register" className="bg-yellow-400 text-dark-500 px-8 py-3 rounded-full font-bold text-lg hover:bg-yellow-300 hover:scale-105 active:scale-100 transition-all duration-300 min-h-[56px] flex items-center shadow-xl hover:shadow-2xl focus-visible:ring-2 focus-visible:ring-white drop-shadow-lg">
                      Get Started
                    </Link>
                    <Link to="/signs" className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-white/20 hover:scale-105 active:scale-100 transition-all duration-300 min-h-[56px] flex items-center backdrop-blur-sm focus-visible:ring-2 focus-visible:ring-white">
                      Explore Now
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/signs" className="bg-yellow-400 text-dark-500 px-8 py-3 rounded-full font-bold text-lg hover:bg-yellow-300 hover:scale-105 active:scale-100 transition-all duration-300 min-h-[56px] flex items-center shadow-xl hover:shadow-2xl focus-visible:ring-2 focus-visible:ring-white drop-shadow-lg">
                      Start Learning
                    </Link>
                    <Link to="/learn" className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-white/20 hover:scale-105 active:scale-100 transition-all duration-300 min-h-[56px] flex items-center backdrop-blur-sm focus-visible:ring-2 focus-visible:ring-white">
                      Learn
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Right side - Instructor profiles */}
            <div className="flex justify-center lg:justify-end items-center gap-8">
              {/* Instructor 1 */}
              <div className="flex flex-col items-center">
                <div className="w-56 h-56 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-200 p-1 shadow-lg overflow-hidden">
                  <img 
                    src={instructorImg1} 
                    alt="Expert Instructor" 
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <p className="mt-4 text-sm font-semibold text-center drop-shadow">Video Learning</p>
              </div>

              {/* Instructor 2 */}
              <div className="flex flex-col items-center">
                <div className="w-56 h-56 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-200 p-1 shadow-lg overflow-hidden">
                  <img 
                    src={instructorImg2} 
                    alt="Expert Instructor" 
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <p className="mt-4 text-sm font-semibold text-center drop-shadow">Expert Instructor</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fun Learning Section */}
      <section className="py-20 md:py-32 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            {/* Left illustration */}
            <div className="flex justify-center lg:justify-start">
              <div className="text-6xl text-yellow-500">
                <FaUsers />
              </div>
            </div>

            {/* Center content */}
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight leading-tight">
                The fun, fast and easy way to learn <span className="text-yellow-500">Sign Language</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Our bite-sized, interactive lessons will help you develop the skills you need for real-life communication. And because we know you are busy, we made sure that with just 10 minutes a day, you will be able to engage in your first conversations in no time.
              </p>
            </div>

            {/* Right illustration */}
            <div className="flex justify-center lg:justify-end">
              <div className="text-6xl text-yellow-500">
                <FaUsers />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Here is how it works Section */}
      <section className="py-24 md:py-32 px-4 bg-gradient-to-b from-blue-50 to-blue-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-black text-center mb-16 text-blue-600 tracking-tight">Here is how it works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Card 1 - Practical conversation skills */}
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center text-4xl shadow-lg text-yellow-600">
                <FaComments />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3 text-blue-600">Practical conversation skills</h3>
                <p className="text-gray-700 text-base leading-relaxed">
                  Immerse yourself in Sign Language through interactive and useful dialogs that get you conversational fast.
                </p>
              </div>
            </div>

            {/* Card 2 - Remember what you've learnt */}
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center text-4xl shadow-lg text-white">
                <FaBrain />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3 text-blue-600">Remember what you've learnt</h3>
                <p className="text-gray-700 text-base leading-relaxed">
                  Use our vocabulary trainer to reinforce your memory and retain your learnings for the long term.
                </p>
              </div>
            </div>

            {/* Card 3 - Live practice with IoT devices */}
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center text-4xl shadow-lg text-white">
                <FaHeadset />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3 text-blue-600">Live practice with IoT devices</h3>
                <p className="text-gray-700 text-base leading-relaxed">
                  Connect wearable IoT devices for real-time hand gesture recognition and get instant feedback while practicing sign language.
                </p>
              </div>
            </div>

            {/* Card 4 - Sign with confidence */}
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-24 h-24 bg-yellow-500 rounded-full flex items-center justify-center text-4xl shadow-lg text-white">
                <FaStar />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3 text-blue-600">Sign with confidence</h3>
                <p className="text-gray-700 text-base leading-relaxed">
                  Unsure whether you are signing the right way? Refine your execution with the Lingvano Sign mirror and gain the confidence to sign!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Building Bridges Section */}
      <section className="py-24 md:py-32 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex flex-col items-center">
            {/* Illustration Box */}
            <div className="w-full max-w-2xl mb-12">
              <div className="bg-white border-2 border-yellow-400 rounded-3xl p-12 shadow-lg">
                <div className="text-9xl">🤝</div>
              </div>
            </div>

            {/* Content */}
            <div>
              <h2 className="text-5xl md:text-6xl font-black mb-8 text-yellow-500 tracking-tight leading-tight">
                Building bridges
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
                Our mission is to help you connect with Deaf family members, friends, colleagues and neighbors. Start learning American Sign Language now and help to build bridges.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-gradient-to-b from-primary-50 via-white to-gray-50 py-12 md:py-16 px-4 text-center border-t border-primary-200">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-dark-500 tracking-tight">Ready to Transform Your Skills?</h2>
          <p className="text-lg md:text-lg mb-8 text-gray-600 font-light leading-relaxed max-w-xl mx-auto">Begin your sign language journey with our comprehensive, beginner-friendly courses. No experience necessary.</p>
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

