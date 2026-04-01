import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-300 shadow-md" role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-dark-500 text-xl font-black hover:text-primary-600 transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-primary-300 rounded px-2" aria-label="SignLearn Home">
            <span>SignLearn</span>
          </Link>

          {/* Navigation Menu */}
          <div className="flex items-center gap-6">
            {/* Links */}
            <Link 
              to="/" 
              className={`font-medium px-3 py-2 rounded-md transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary-300 ${ isActive('/') ? 'text-primary-600 bg-primary-50 font-bold border-b-2 border-primary-600' : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50/50'}`}
              aria-label="Home"
              aria-current={isActive('/') ? 'page' : undefined}
            >
              Home
            </Link>
            <Link 
              to="/signs" 
              className={`font-medium px-3 py-2 rounded-md transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary-300 ${isActive('/signs') ? 'text-primary-600 bg-primary-50 font-bold border-b-2 border-primary-600' : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50/50'}`}
              aria-label="Learn Signs"
              aria-current={isActive('/signs') ? 'page' : undefined}
            >
              Signs
            </Link>
            <Link 
              to="/courses" 
              className={`font-medium px-3 py-2 rounded-md transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary-300 ${isActive('/courses') ? 'text-primary-600 bg-primary-50 font-bold border-b-2 border-primary-600' : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50/50'}`}
              aria-label="Courses"
              aria-current={isActive('/courses') ? 'page' : undefined}
            >
              Courses
            </Link>

            {/* Auth Section */}
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Link 
                  to="/dashboard" 
                  className={`font-medium px-3 py-2 rounded-md transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary-300 ${isActive('/dashboard') ? 'text-primary-600 bg-primary-50 font-bold border-b-2 border-primary-600' : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50/50'}`}
                  aria-label="Dashboard"
                  aria-current={isActive('/dashboard') ? 'page' : undefined}
                >
                  Dashboard
                </Link>
                <div className="flex items-center gap-3 pl-3 border-l border-gray-300">
                  <span className="text-gray-600 text-sm font-medium" aria-label={`Logged in as ${user?.email}`}>
                    {user?.email?.split('@')[0] || 'User'}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="bg-error-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-error-600 hover:scale-105 active:scale-100 active:bg-error-700 transition-all duration-300 min-h-[44px] shadow-md hover:shadow-lg focus-visible:ring-2 focus-visible:ring-error-300"
                    aria-label="Logout"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex gap-3">
                <Link 
                  to="/login" 
                  className="text-primary-600 border-2 border-primary-600 px-4 py-2 rounded-lg font-semibold hover:bg-primary-50 hover:scale-105 active:scale-100 focus-visible:ring-2 focus-visible:ring-primary-300 transition-all duration-300 min-h-[44px] flex items-center shadow-sm hover:shadow-md"
                  aria-label="Login"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-primary-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-600 hover:scale-105 active:scale-100 active:bg-primary-700 focus-visible:ring-2 focus-visible:ring-primary-300 transition-all duration-300 min-h-[44px] flex items-center shadow-md hover:shadow-lg"
                  aria-label="Register"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

