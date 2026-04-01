import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  connectDevice,
  startSession,
  getLiveData,
  nextSign,
  endSession,
  disconnectDevice,
  getPracticeStats,
} from '../lib/api/practice';
import Loader from '../components/common/Loader';
import './Practice.css';

const Practice = () => {
  const navigate = useNavigate();
  const liveDataIntervalRef = useRef(null);

  // ============================================================================
  // STATE MANAGEMENT
  // ============================================================================

  // Device connection state
  const [isConnected, setIsConnected] = useState(false);
  const [deviceName, setDeviceName] = useState('');
  const [connectingLoader, setConnectingLoader] = useState(false);

  // Session state
  const [sessionId, setSessionId] = useState(null);
  const [currentSign, setCurrentSign] = useState('');
  const [sessionStarted, setSessionStarted] = useState(false);
  const [startingLoader, setStartingLoader] = useState(false);

  // Live data state
  const [accuracy, setAccuracy] = useState(0);
  const [status, setStatus] = useState(''); // 'correct' or 'retry'
  const [stats, setStats] = useState({
    attempts: 0,
    correct: 0,
  });

  // Practice statistics
  const [practiceStats, setPracticeStats] = useState({
    totalSessions: 0,
    totalPracticeTime: 0,
    signsLearned: 0,
    averageAccuracy: 0,
    currentStreak: 0,
  });
  const [loadingStats, setLoadingStats] = useState(true);

  // UI state
  const [error, setError] = useState(null);

  // ============================================================================
  // LIFECYCLE: Load practice statistics
  // ============================================================================

  useEffect(() => {
    const loadStats = async () => {
      try {
        console.log('[Practice] Loading practice statistics...');
        const data = await getPracticeStats();
        setPracticeStats(data);
      } catch (err) {
        console.error('[Practice] Error loading stats:', err);
        setError('Failed to load practice statistics');
      } finally {
        setLoadingStats(false);
      }
    };

    loadStats();
  }, []);

  // ============================================================================
  // LIFECYCLE: Live data simulation
  // ============================================================================

  useEffect(() => {
    if (!sessionId) return;

    console.log('[Practice] Starting live data stream...');

    // Start live data updates every 1 second
    liveDataIntervalRef.current = setInterval(async () => {
      try {
        const data = await getLiveData(sessionId);
        setAccuracy(data.accuracy);
        setStatus(data.status);
        setStats({
          attempts: data.attempts,
          correct: data.correct,
        });
      } catch (err) {
        console.error('[Practice] Error getting live data:', err);
      }
    }, 1000);

    return () => {
      if (liveDataIntervalRef.current) {
        clearInterval(liveDataIntervalRef.current);
        console.log('[Practice] Stopped live data stream');
      }
    };
  }, [sessionId]);

  // ============================================================================
  // HANDLER: Connect device
  // ============================================================================

  const handleConnect = async () => {
    try {
      setConnectingLoader(true);
      setError(null);
      console.log('[Practice] User initiated device connection');

      const response = await connectDevice();
      setIsConnected(response.connected);
      setDeviceName(response.deviceName);
      console.log('[Practice] ✅ Device connected successfully');
    } catch (err) {
      console.error('[Practice] Connection error:', err);
      setError('Failed to connect device. Please try again.');
      setIsConnected(false);
    } finally {
      setConnectingLoader(false);
    }
  };

  // ============================================================================
  // HANDLER: Start practice session
  // ============================================================================

  const handleStart = async () => {
    if (!isConnected) {
      setError('Please connect device first');
      return;
    }

    try {
      setStartingLoader(true);
      setError(null);
      console.log('[Practice] User initiated session start');

      const response = await startSession();
      setSessionId(response.sessionId);
      setCurrentSign(response.currentSign);
      setSessionStarted(true);
      setAccuracy(0);
      setStatus('');
      setStats({ attempts: 0, correct: 0 });
      console.log('[Practice] ✅ Session started');
    } catch (err) {
      console.error('[Practice] Start session error:', err);
      setError('Failed to start session. Please try again.');
    } finally {
      setStartingLoader(false);
    }
  };

  // ============================================================================
  // HANDLER: Next sign
  // ============================================================================

  const handleNext = async () => {
    try {
      setError(null);
      console.log('[Practice] User requested next sign');

      const response = await nextSign();
      setCurrentSign(response.currentSign);
      setStatus('');
      setStats({ attempts: 0, correct: 0 });
      console.log('[Practice] ✅ Sign changed to:', response.currentSign);
    } catch (err) {
      console.error('[Practice] Next sign error:', err);
      setError('Failed to load next sign. Please try again.');
    }
  };

  // ============================================================================
  // HANDLER: End session
  // ============================================================================

  const handleEnd = async () => {
    try {
      console.log('[Practice] User ended session');

      if (liveDataIntervalRef.current) {
        clearInterval(liveDataIntervalRef.current);
      }

      if (sessionId) {
        const summary = await endSession(sessionId);
        console.log('[Practice] Session summary:', summary);
      }

      setSessionStarted(false);
      setSessionId(null);
      setCurrentSign('');
      setAccuracy(0);
      setStatus('');
      setStats({ attempts: 0, correct: 0 });
    } catch (err) {
      console.error('[Practice] Error ending session:', err);
    }
  };

  // ============================================================================
  // HANDLER: Disconnect device
  // ============================================================================

  const handleDisconnect = async () => {
    try {
      if (sessionStarted) {
        await handleEnd();
      }

      const response = await disconnectDevice();
      setIsConnected(response.connected);
      setDeviceName('');
      console.log('[Practice] ✅ Device disconnected');
    } catch (err) {
      console.error('[Practice] Disconnect error:', err);
      setError('Failed to disconnect device.');
    }
  };

  // ============================================================================
  // HELPER: Get status color
  // ============================================================================

  const getStatusColor = () => {
    if (status === 'correct') return 'text-green-600';
    if (status === 'retry') return 'text-orange-600';
    return 'text-gray-600';
  };

  const getStatusBgColor = () => {
    if (status === 'correct') return 'bg-green-50';
    if (status === 'retry') return 'bg-orange-50';
    return 'bg-gray-50';
  };

  const getStatusMessage = () => {
    if (status === 'correct') return '✅ Correct!';
    if (status === 'retry') return '🔄 Try again';
    return 'Listening...';
  };

  // ============================================================================
  // RENDER
  // ============================================================================

  if (loadingStats) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-5xl font-black text-dark-500 mb-2">🧤 Glove Practice</h1>
          <p className="text-lg text-gray-600 font-medium">
            Connect your glove and practice real-time sign language recognition
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-8 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
            <p className="text-red-700 font-medium">{error}</p>
            <button
              onClick={() => setError(null)}
              className="mt-2 text-sm text-red-600 hover:text-red-800 font-bold"
            >
              Dismiss
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Device Connection Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-black text-dark-500 mb-1">📱 Device Connection</h2>
                  <p className="text-sm text-gray-600">Connect your HastVani glove to begin</p>
                </div>
                <div className={`w-4 h-4 rounded-full ${isConnected ? 'bg-green-500' : 'bg-gray-300'}`} />
              </div>

              {isConnected ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                    <span className="text-2xl">✅</span>
                    <div>
                      <p className="font-bold text-green-900">{deviceName}</p>
                      <p className="text-sm text-green-700">Connected and ready</p>
                    </div>
                  </div>

                  <button
                    onClick={handleDisconnect}
                    className="w-full px-6 py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 active:scale-95 transition-all duration-200"
                  >
                    Disconnect Device
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleConnect}
                  disabled={connectingLoader}
                  className="w-full px-6 py-4 bg-primary-500 text-white font-bold rounded-lg hover:bg-primary-600 active:scale-95 transition-all duration-200 disabled:opacity-75 text-lg"
                >
                  {connectingLoader ? 'Connecting...' : 'Connect Device'}
                </button>
              )}
            </div>

            {/* Practice Session Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-black text-dark-500 mb-6">🎯 Practice Session</h2>

              {sessionStarted ? (
                <div className="space-y-8">
                  {/* Current Sign */}
                  <div className="text-center">
                    <p className="text-sm font-bold text-gray-600 uppercase mb-2">Current Sign</p>
                    <p className="text-6xl font-black text-primary-600 mb-4">{currentSign}</p>
                  </div>

                  {/* Accuracy Display */}
                  <div className={`p-6 rounded-xl text-center ${getStatusBgColor()}`}>
                    <p className="text-sm font-bold text-gray-600 uppercase mb-2">Accuracy</p>
                    <p className={`text-5xl font-black mb-2 ${getStatusColor()}`}>{accuracy}%</p>
                    <p className={`text-lg font-bold ${getStatusColor()}`}>{getStatusMessage()}</p>
                  </div>

                  {/* Statistics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg text-center border border-gray-200">
                      <p className="text-sm font-bold text-gray-600 mb-2">Attempts</p>
                      <p className="text-3xl font-black text-dark-500">{stats.attempts}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg text-center border border-gray-200">
                      <p className="text-sm font-bold text-gray-600 mb-2">Correct</p>
                      <p className="text-3xl font-black text-green-600">{stats.correct}</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={handleNext}
                      className="px-6 py-3 bg-primary-500 text-white font-bold rounded-lg hover:bg-primary-600 active:scale-95 transition-all duration-200"
                    >
                      Next Sign →
                    </button>
                    <button
                      onClick={handleEnd}
                      className="px-6 py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 active:scale-95 transition-all duration-200"
                    >
                      End Session
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={handleStart}
                  disabled={!isConnected || startingLoader}
                  className="w-full px-6 py-4 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                >
                  {startingLoader ? 'Starting session...' : !isConnected ? 'Connect device first' : 'Start Practice Session'}
                </button>
              )}
            </div>
          </div>

          {/* Sidebar: Statistics */}
          <div className="space-y-6">
            {/* Performance Stats */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-black text-dark-500 mb-6">📊 Your Stats</h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <span className="font-bold text-gray-700">Total Sessions</span>
                  <span className="text-2xl font-black text-primary-600">{practiceStats.totalSessions}</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <span className="font-bold text-gray-700">Practice Time</span>
                  <span className="text-2xl font-black text-primary-600">{practiceStats.totalPracticeTime}m</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <span className="font-bold text-gray-700">Signs Learned</span>
                  <span className="text-2xl font-black text-primary-600">{practiceStats.signsLearned}</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <span className="font-bold text-gray-700">Avg. Accuracy</span>
                  <span className="text-2xl font-black text-success-600">{practiceStats.averageAccuracy}%</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg border border-orange-200">
                  <span className="font-bold text-gray-700">🔥 Streak</span>
                  <span className="text-2xl font-black text-orange-600">{practiceStats.currentStreak} days</span>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl shadow-sm border border-primary-200 p-6">
              <h3 className="text-lg font-black text-primary-900 mb-4">💡 Tips</h3>
              <ul className="space-y-3 text-sm text-primary-900">
                <li className="flex gap-2">
                  <span>•</span>
                  <span>Keep your glove steady during practice</span>
                </li>
                <li className="flex gap-2">
                  <span>•</span>
                  <span>Practice in good lighting conditions</span>
                </li>
                <li className="flex gap-2">
                  <span>•</span>
                  <span>Consistent practice improves accuracy</span>
                </li>
                <li className="flex gap-2">
                  <span>•</span>
                  <span>Aim for 80%+ accuracy per sign</span>
                </li>
              </ul>
            </div>

            {/* Debug Info */}
            <div className="bg-gray-900 rounded-2xl shadow-sm border border-gray-700 p-4 text-xs font-mono text-green-500">
              <p className="mb-2 font-bold text-green-400">📡 Debug Info</p>
              <p>Connected: {isConnected ? 'Yes ✅' : 'No ❌'}</p>
              <p>Device: {deviceName || 'None'}</p>
              <p>Session: {sessionId ? sessionId.substring(0, 15) + '...' : 'None'}</p>
              <p>Status: {status || 'Waiting'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Practice;
