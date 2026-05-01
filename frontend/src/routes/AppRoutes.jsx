import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PublicLayout from '../components/layout/PublicLayout';
import DashboardLayout from '../components/layout/DashboardLayout';

// Public Pages
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import SignLearning from '../pages/SignLearning';
import SignDetail from '../pages/SignDetail';
import Courses from '../pages/Courses';
import CourseDetail from '../pages/CourseDetail';

// Private Pages
import Learn from '../pages/Learn';
import Dictionary from '../pages/Dictionary';
import LessonPlayer from '../pages/LessonPlayer';
import Practice from '../pages/Practice';
import Profile from '../pages/Profile';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  console.log('[PrivateRoute] Current state:', { 
    isAuthenticated, 
    loading, 
    pathname: location.pathname 
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log('[PrivateRoute] Not authenticated, redirecting to login from:', location.pathname);
    return <Navigate to={`/login?from=${encodeURIComponent(location.pathname)}`} replace />;
  }

  console.log('[PrivateRoute] Authenticated, rendering children');
  return children;
};

const AppRoutes = () => {
  const { isAuthenticated, loading, token } = useAuth();

  console.log('[AppRoutes] Rendering with auth state:', { 
    isAuthenticated, 
    loading, 
    hasToken: !!token 
  });

  return (
    <Routes>
      {/* Public Layout Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={isAuthenticated ? <Navigate to="/learn" /> : <Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/signs" element={<SignLearning />} />
        <Route path="/signs/:id" element={<SignDetail />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
      </Route>

      {/* Private Layout Routes */}
      <Route
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        <Route path="/learn" element={<Learn />} />
        <Route path="/learn/:courseId" element={<CourseDetail />} />
        <Route path="/lesson/:lessonId" element={<LessonPlayer />} />
        <Route path="/dictionary" element={<Dictionary />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;

