# SignLearn Frontend

A React-based frontend for the SignLearn sign language learning platform.

## Features

- 🎥 Video-first learning interface
- ♿ Accessible design for deaf and mute users
- 📱 Responsive design
- 🔐 Authentication with role-based access
- 📊 Progress tracking dashboard
- 🌍 Support for ASL, ISL, and BSL

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Backend API running on `http://localhost:8000`

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

The app will be available at `http://localhost:3000`

## Project Structure

```
frontend/
├── src/
│   ├── api/          # API service functions
│   ├── components/   # Reusable components
│   ├── context/      # React context providers
│   ├── pages/        # Page components
│   ├── routes/       # Routing configuration
│   └── styles/       # Global styles
├── public/           # Static assets
└── package.json
```

## Accessibility Features

- Large touch targets (minimum 44x44px)
- Keyboard navigation support
- ARIA labels and roles
- High contrast mode support
- Reduced motion support
- Focus indicators on all interactive elements

## API Integration

The frontend communicates with the Django REST API backend. Make sure the backend is running and configured correctly.

## Technologies

- React 18
- React Router 6
- Axios
- Vite

