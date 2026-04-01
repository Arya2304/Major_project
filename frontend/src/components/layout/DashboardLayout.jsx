import { Link, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname.startsWith(path);

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/learn', label: 'Learn', icon: '📚' },
    { path: '/dictionary', label: 'Dictionary', icon: '📖' },
    { path: '/practice', label: 'Practice', icon: '✋' },
    { path: '/profile', label: 'Profile', icon: '👤' },
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 w-56 h-screen bg-white border-r border-gray-100 shadow-sm pt-0 z-40">
        {/* Sidebar Header */}
        <div className="p-5 border-b border-gray-100">
          <Link to="/dashboard" className="text-dark-500 text-2xl font-black hover:text-primary-600 transition-colors duration-200">
            SignLearn
          </Link>
        </div>

        {/* Navigation Menu */}
        <nav className="p-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg font-semibold transition-all duration-200 ${
                isActive(item.path)
                  ? 'bg-primary-100 text-primary-600 border-l-4 border-primary-600 shadow-sm'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-primary-600 border-l-4 border-transparent'
              }`}
              aria-current={isActive(item.path) ? 'page' : undefined}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-gray-100 bg-gray-50">
          <button
            onClick={handleLogout}
            className="w-full bg-error-500 text-white px-4 py-2.5 rounded-lg font-semibold hover:bg-error-600 hover:shadow-md active:scale-95 transition-all duration-200 min-h-[44px] text-sm"
            aria-label="Logout"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="ml-56 w-full flex flex-col">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-100 shadow-sm">
          <div className="px-8 py-4 flex justify-between items-center">
            {/* Left: Page Title (handled by children) */}
            <div className="flex-1"></div>

            {/* Right: User Info */}
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-semibold text-dark-500">{user?.first_name || user?.email?.split('@')[0]}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white font-bold text-sm">
                {(user?.first_name?.[0] || user?.email?.[0] || 'U').toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
