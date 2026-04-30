import { BrowserRouter } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import KeyboardShortcuts from './components/common/KeyboardShortcuts';
import AppRoutes from './routes/AppRoutes';
import './styles/main.css';

// Keyboard navigation wrapper component
const KeyboardNavigation = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Only handle if not typing in an input
      if (
        e.target.tagName === 'INPUT' ||
        e.target.tagName === 'TEXTAREA' ||
        e.target.isContentEditable
      ) {
        return;
      }

      // Global keyboard shortcuts
      switch (e.key.toLowerCase()) {
        case 'h':
          if (!e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            navigate('/');
          }
          break;
        case 's':
          if (!e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            navigate('/signs');
          }
          break;
        case 'c':
          if (!e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            navigate('/courses');
          }
          break;
        case 'd':
          if (!e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            navigate('/learn');
          }
          break;
        case 'l':
          if (!e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            navigate('/learn');
          }
          break;
        case '?':
          if (!e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            // Open keyboard shortcuts help
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  return children;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <KeyboardNavigation>
          {/* Skip to main content link */}
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>

          <main id="main-content">
            <AppRoutes />
          </main>

          {/* Keyboard shortcuts help */}
          <KeyboardShortcuts />
        </KeyboardNavigation>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
