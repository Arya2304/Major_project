/**
 * Mock Practice API Layer
 * 
 * This module simulates API responses for glove-based practice sessions.
 * It's designed to be easily replaceable with real backend API calls.
 * 
 * DO NOT use real backend - keep everything frontend-only.
 * All functions return simulated/mock data.
 */

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Simulate network delay
 * @param {number} ms - Milliseconds to delay
 * @returns {Promise} - Resolves after delay
 */
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Available signs for practice
 */
const SIGN_DATABASE = [
  'Hello',
  'Thank you',
  'Goodbye',
  'Yes',
  'No',
  'Please',
  'Sorry',
  'Love',
  'Help',
  'Friend',
  'Family',
  'Water',
  'Food',
  'Happy',
  'Sad',
];

// ============================================================================
// MOCK API FUNCTIONS
// ============================================================================

/**
 * Connect to glove device
 * Simulates device connection process
 * 
 * @returns {Promise<Object>} Connection response
 * @returns {boolean} connected - Connection status
 * @returns {string} deviceName - Name of connected device
 */
export const connectDevice = async () => {
  console.log('[Practice API] Connecting to device...');
  
  // Simulate connection delay (2-3 seconds)
  await delay(2000 + Math.random() * 1000);
  
  console.log('[Practice API] Device connected');
  
  return {
    connected: true,
    deviceName: 'HastVani Glove v1',
    timestamp: new Date().toISOString(),
  };
};

/**
 * Start a new practice session
 * Simulates session initialization
 * 
 * @returns {Promise<Object>} Session response
 * @returns {string} sessionId - Unique session identifier
 * @returns {string} currentSign - First sign to practice
 */
export const startSession = async () => {
  console.log('[Practice API] Starting session...');
  
  // Simulate session setup delay (1-2 seconds)
  await delay(1000 + Math.random() * 1000);
  
  const randomSign = SIGN_DATABASE[Math.floor(Math.random() * SIGN_DATABASE.length)];
  const sessionId = 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  
  console.log('[Practice API] Session started:', sessionId);
  
  return {
    sessionId: sessionId,
    currentSign: randomSign,
    timestamp: new Date().toISOString(),
  };
};

/**
 * Get live practice data from glove
 * Simulates real-time data streaming
 * 
 * @param {string} sessionId - Active session ID
 * @returns {Promise<Object>} Live data response
 * @returns {number} accuracy - Accuracy percentage (60-100)
 * @returns {string} status - "correct" or "retry"
 * @returns {string} currentSign - Current sign being practiced
 * @returns {number} attempts - Number of attempts for current sign
 * @returns {number} correct - Number of correct attempts
 */
export const getLiveData = async (sessionId) => {
  // Validate session
  if (!sessionId) {
    console.warn('[Practice API] ⚠️ No session ID provided');
    throw new Error('Invalid session ID');
  }
  
  // Simulate data collection delay (200-500ms)
  await delay(200 + Math.random() * 300);
  
  // Random accuracy (60-100%)
  const accuracy = Math.floor(60 + Math.random() * 40);
  
  // Determine status based on accuracy threshold
  const status = accuracy >= 75 ? 'correct' : 'retry';
  
  console.log(`[Practice API] Accuracy: ${accuracy}% - Status: ${status}`);
  
  return {
    accuracy: accuracy,
    status: status,
    currentSign: getCurrentSign(),
    attempts: Math.floor(Math.random() * 5) + 1,
    correct: Math.floor(Math.random() * 4) + 1,
    timestamp: new Date().toISOString(),
  };
};

/**
 * Move to next sign in practice session
 * Simulates sign transition
 * 
 * @returns {Promise<Object>} Next sign response
 * @returns {string} currentSign - Next sign to practice
 */
export const nextSign = async () => {
  console.log('[Practice API] Loading next sign...');
  
  // Simulate transition delay (800-1200ms)
  await delay(800 + Math.random() * 400);
  
  const randomSign = SIGN_DATABASE[Math.floor(Math.random() * SIGN_DATABASE.length)];
  
  console.log(`[Practice API] Next sign: ${randomSign}`);
  
  return {
    currentSign: randomSign,
    timestamp: new Date().toISOString(),
  };
};

/**
 * End practice session
 * Simulates session cleanup
 * 
 * @param {string} sessionId - Session to end
 * @returns {Promise<Object>} Session summary
 */
export const endSession = async (sessionId) => {
  console.log('[Practice API] Ending session:', sessionId);
  
  await delay(500);
  
  console.log('[Practice API] Session ended');
  
  return {
    sessionId: sessionId,
    status: 'completed',
    summary: {
      totalAttempts: Math.floor(Math.random() * 100) + 10,
      totalCorrect: Math.floor(Math.random() * 80) + 10,
      accuracy: Math.floor(Math.random() * 40) + 60,
      duration: Math.floor(Math.random() * 30) + 5, // minutes
    },
    timestamp: new Date().toISOString(),
  };
};

/**
 * Disconnect from device
 * Simulates device disconnection
 * 
 * @returns {Promise<Object>} Disconnection response
 */
export const disconnectDevice = async () => {
  console.log('[Practice API] Disconnecting device...');
  
  await delay(1000);
  
  console.log('[Practice API] Device disconnected');
  
  return {
    connected: false,
    timestamp: new Date().toISOString(),
  };
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get current sign (mock data)
 * In production, this would come from session state
 * 
 * @returns {string} Random sign from database
 */
const getCurrentSign = () => {
  return SIGN_DATABASE[Math.floor(Math.random() * SIGN_DATABASE.length)];
};

/**
 * Get all available signs for practice
 * 
 * @returns {Array<string>} List of signs
 */
export const getAvailableSigns = () => {
  return [...SIGN_DATABASE];
};

/**
 * Get practice statistics (mock data)
 * 
 * @returns {Promise<Object>} Statistics object
 */
export const getPracticeStats = async () => {
  await delay(300);
  
  return {
    totalSessions: Math.floor(Math.random() * 50) + 5,
    totalPracticeTime: Math.floor(Math.random() * 1000) + 100, // minutes
    signsLearned: Math.floor(Math.random() * 15) + 5,
    averageAccuracy: Math.floor(Math.random() * 40) + 60,
    currentStreak: Math.floor(Math.random() * 30) + 1,
  };
};

// ============================================================================
// API CONFIGURATION
// ============================================================================

/**
 * Future real API endpoint configuration
 * Replace these with actual backend URLs when ready
 */
export const API_CONFIG = {
  // Backend URL - will be used when replacing mock API (Vite uses import.meta.env instead of process.env)
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  
  // Endpoints - document future real API structure
  ENDPOINTS: {
    CONNECT_DEVICE: '/api/practice/connect',
    START_SESSION: '/api/practice/session/start',
    GET_DATA: '/api/practice/data',
    NEXT_SIGN: '/api/practice/next-sign',
    END_SESSION: '/api/practice/session/end',
    DISCONNECT: '/api/practice/disconnect',
  },
  
  // Timeout in milliseconds
  TIMEOUT: 10000,
};

// ============================================================================
// NOTES FOR FUTURE REAL API INTEGRATION
// ============================================================================

/**
 * TO REPLACE WITH REAL API:
 * 
 * 1. Import axios or fetch
 * 2. Replace each function's implementation:
 *    
 *    export const connectDevice = async () => {
 *      const response = await axios.post(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CONNECT_DEVICE}`);
 *      return response.data;
 *    };
 * 
 * 3. Remove delay() calls and mock data generation
 * 4. Add proper error handling for network failures
 * 5. Update API_CONFIG.BASE_URL with real backend address
 * 6. All other code in Practice.jsx remains unchanged!
 */
