# React-Specific Accessibility Recommendations

## Overview
This document provides React-specific patterns and recommendations for building accessible components in the SignLearn platform.

## Core Principles

### 1. Semantic HTML with React
```jsx
// ✅ Good - Semantic HTML
<nav role="navigation" aria-label="Main navigation">
  <ul>
    <li><a href="/">Home</a></li>
  </ul>
</nav>

// ❌ Bad - Div soup
<div onClick={handleClick}>
  <div>Home</div>
</div>
```

### 2. ARIA Attributes in JSX
```jsx
// ✅ Good - Comprehensive ARIA
<button
  onClick={handlePlay}
  aria-label="Play video"
  aria-pressed={isPlaying}
  aria-controls="video-player"
>
  {isPlaying ? 'Pause' : 'Play'}
</button>

// ❌ Bad - No ARIA
<button onClick={handlePlay}>
  {isPlaying ? 'Pause' : 'Play'}
</button>
```

### 3. Keyboard Event Handling
```jsx
// ✅ Good - Keyboard support
const handleKeyDown = (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    handleClick();
  }
};

<div
  onClick={handleClick}
  onKeyDown={handleKeyDown}
  role="button"
  tabIndex={0}
  aria-label="Clickable card"
>
  Content
</div>
```

### 4. Focus Management
```jsx
// ✅ Good - Focus management
const modalRef = useRef(null);

useEffect(() => {
  if (isOpen && modalRef.current) {
    modalRef.current.focus();
  }
}, [isOpen]);

<div ref={modalRef} tabIndex={-1} role="dialog">
  Modal content
</div>
```

## Component Patterns

### Accessible Form Components
```jsx
const AccessibleInput = ({ label, error, ...props }) => {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div>
      <label htmlFor={id} className="block text-lg font-bold mb-2">
        {label}
      </label>
      <input
        id={id}
        className={`input ${error ? 'input-error' : ''}`}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        {...props}
      />
      {error && (
        <div id={errorId} role="alert" className="text-red-600 mt-2">
          {error}
        </div>
      )}
    </div>
  );
};
```

### Accessible Modal Component
```jsx
const AccessibleModal = ({ isOpen, onClose, title, children }) => {
  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement;
      modalRef.current?.focus();
    } else {
      previousFocusRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        ref={modalRef}
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        <h2 id="modal-title">{title}</h2>
        {children}
        <button onClick={onClose} aria-label="Close modal">
          Close
        </button>
      </div>
    </div>
  );
};
```

### Accessible Video Player
```jsx
const AccessibleVideoPlayer = ({ src, title }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleKeyDown = (e) => {
    switch (e.key) {
      case ' ':
      case 'k':
        e.preventDefault();
        togglePlay();
        break;
      // ... other shortcuts
    }
  };

  return (
    <div
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="application"
      aria-label={`Video player: ${title}`}
    >
      <video ref={videoRef} src={src} aria-label={title} />
      <button
        onClick={togglePlay}
        aria-label={isPlaying ? 'Pause video' : 'Play video'}
        aria-pressed={isPlaying}
        className="btn-large"
      >
        {isPlaying ? '⏸️' : '▶️'}
      </button>
    </div>
  );
};
```

## React Hooks for Accessibility

### useKeyboardShortcut Hook
```jsx
const useKeyboardShortcut = (key, callback, deps = []) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        e.key === key &&
        !e.ctrlKey &&
        !e.metaKey &&
        e.target.tagName !== 'INPUT' &&
        e.target.tagName !== 'TEXTAREA'
      ) {
        e.preventDefault();
        callback();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [key, ...deps]);
};

// Usage
useKeyboardShortcut('h', () => navigate('/'));
```

### useFocusTrap Hook
```jsx
const useFocusTrap = (isActive) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!isActive) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTab = (e) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    container.addEventListener('keydown', handleTab);
    firstElement?.focus();

    return () => container.removeEventListener('keydown', handleTab);
  }, [isActive]);

  return containerRef;
};
```

### useAnnounce Hook (for screen readers)
```jsx
const useAnnounce = () => {
  const [announcement, setAnnouncement] = useState('');

  useEffect(() => {
    if (announcement) {
      const timer = setTimeout(() => setAnnouncement(''), 1000);
      return () => clearTimeout(timer);
    }
  }, [announcement]);

  const announce = (message) => setAnnouncement(message);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
    >
      {announcement}
    </div>
  );
};
```

## Tailwind CSS Accessibility Classes

### Custom Utility Classes
```jsx
// In tailwind.config.js
module.exports = {
  theme: {
    extend: {
      spacing: {
        'touch': '56px', // Minimum touch target
      },
    },
  },
};

// Usage
<button className="min-w-touch min-h-touch">Click</button>
```

### Focus Styles
```jsx
// High contrast focus ring
<button className="focus-visible:ring-4 focus-visible:ring-primary-500 focus-visible:ring-offset-2">
  Button
</button>
```

### Screen Reader Only
```jsx
<span className="sr-only">Screen reader only text</span>
```

## Testing Accessibility in React

### Using @testing-library/react
```jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('button is accessible', async () => {
  const user = userEvent.setup();
  render(<AccessibleButton>Click me</AccessibleButton>);
  
  const button = screen.getByRole('button', { name: /click me/i });
  expect(button).toBeInTheDocument();
  
  await user.keyboard('{Enter}');
  // Test keyboard interaction
});
```

### Using jest-axe
```jsx
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('component has no accessibility violations', async () => {
  const { container } = render(<MyComponent />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

## Common Pitfalls to Avoid

### 1. Missing Labels
```jsx
// ❌ Bad
<input type="text" />

// ✅ Good
<label htmlFor="email">Email</label>
<input id="email" type="email" />
```

### 2. Divs as Buttons
```jsx
// ❌ Bad
<div onClick={handleClick}>Click me</div>

// ✅ Good
<button onClick={handleClick}>Click me</button>
```

### 3. Missing ARIA Labels
```jsx
// ❌ Bad
<button><Icon /></button>

// ✅ Good
<button aria-label="Close dialog"><Icon /></button>
```

### 4. Keyboard Traps
```jsx
// ❌ Bad - No way to escape
<div onKeyDown={(e) => e.preventDefault()}>
  Content
</div>

// ✅ Good - Escape key support
<div onKeyDown={(e) => {
  if (e.key === 'Escape') handleClose();
}}>
  Content
</div>
```

## Resources

- [React Accessibility Docs](https://react.dev/learn/accessibility)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro/)
- [axe-core](https://github.com/dequelabs/axe-core)

