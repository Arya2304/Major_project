import React, { useState, useRef, useEffect } from 'react';
import AccessibleVideo from '../components/common/AccessibleVideo';
import AccessibleButton from '../components/common/AccessibleButton';
import { FaHandPeace, FaGraduationCap, FaRedo, FaUser, FaFrownOpen, FaCamera, FaHourglass, FaPlay, FaStop, FaChartBar, FaLightbulb, FaCircle, FaGlobe, FaBluetooth } from 'react-icons/fa';
import './Practice.css';

/**
 * Practice.jsx — Phase 5
 * Main practice page with side-by-side instructor video and camera mirror
 * Users practice signing against the instructor and see themselves mirrored
 */

const Practice = () => {
  // Video refs and state
  const videoRef = useRef(null);
  const cameraRef = useRef(null);
  const streamRef = useRef(null);

  const [cameraActive, setCameraActive] = useState(false);
  const [cameraPermissionDenied, setCameraPermissionDenied] = useState(false);
  const [cameraLoading, setCameraLoading] = useState(false);

  // IoT Gesture state
  const [detectedSign, setDetectedSign] = useState(null);
  const [gloveConnected, setGloveConnected] = useState(false);
  const [gloveLoading, setGloveLoading] = useState(true);

  // Bluetooth Glove Connection state
  const [isBluetoothConnecting, setIsBluetoothConnecting] = useState(false);
  const [isBluetoothConnected, setIsBluetoothConnected] = useState(false);
  const [bluetoothDeviceName, setBluetoothDeviceName] = useState('');
  const [bluetoothError, setBluetoothError] = useState('');

  // Stats state
  const [signsPracticed, setSignsPracticed] = useState(12);
  const [accuracy, setAccuracy] = useState(87);
  const [timeSpent, setTimeSpent] = useState('18 min');

  /**
   * Start camera feed
   */
  const startCamera = async () => {
    setCameraLoading(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: 'user' },
        audio: false,
      });

      if (cameraRef.current) {
        cameraRef.current.srcObject = stream;
        streamRef.current = stream;
        setCameraActive(true);
        setCameraPermissionDenied(false);
      }
    } catch (error) {
      console.error('Camera access denied:', error);
      setCameraPermissionDenied(true);
    } finally {
      setCameraLoading(false);
    }
  };

  /**
   * Stop camera feed
   */
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (cameraRef.current) {
      cameraRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  /**
   * Connect to Bluetooth Glove Device
   * Opens device picker and establishes Bluetooth connection
   */
  const connectToGlove = async () => {
    setIsBluetoothConnecting(true);
    setBluetoothError('');

    try {
      // Check if Bluetooth is supported
      if (!navigator.bluetooth) {
        throw new Error('Bluetooth not supported in this browser. Please use Chrome or Edge.');
      }

      // Request device selection
      const device = await navigator.bluetooth.requestDevice({
        filters: [{ name: 'SignGlove' }],
        optionalServices: [], // Add service UUIDs if needed
      }).catch(() => {
        // If filtering by name fails, ask user to select any device
        return navigator.bluetooth.requestDevice({
          acceptAllDevices: true,
          optionalServices: [],
        });
      });

      // Connect to device GATT
      const gattServer = await device.gatt.connect();
      
      // Update states on successful connection
      setBluetoothDeviceName(device.name || 'Glove Device');
      setIsBluetoothConnected(true);
      setIsBluetoothConnecting(false);
      
      console.log(`✅ Connected to: ${device.name}`);

      // Handle device disconnection
      device.addEventListener('gattserverdisconnected', () => {
        setIsBluetoothConnected(false);
        setBluetoothDeviceName('');
        console.log('❌ Glove disconnected');
      });

    } catch (error) {
      setIsBluetoothConnecting(false);
      setIsBluetoothConnected(false);
      setBluetoothDeviceName('');

      // Handle different error types
      if (error.name === 'NotFoundError') {
        setBluetoothError('No Bluetooth device found. Ensure gloves are powered on and in range.');
      } else if (error.name === 'NotAllowedError') {
        setBluetoothError('Bluetooth connection was cancelled.');
      } else if (error.message.includes('Bluetooth not supported')) {
        setBluetoothError('Bluetooth not supported in this browser. Please use Chrome or Edge.');
      } else {
        setBluetoothError(error.message || 'Failed to connect to glove. Please try again.');
      }
      
      console.error('❌ Bluetooth connection error:', error);
    }
  };

  /**
   * Cleanup camera on unmount
   */
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  /**
   * Poll gesture data from Django backend every 1 second
   * POST to /api/sign-language/gesture/latest/
   */
  useEffect(() => {
    let pollInterval;

    const fetchLatestGesture = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/sign-language/gesture/latest/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          
          if (data.gesture) {
            setDetectedSign(data.gesture);
            setGloveConnected(true);
          } else {
            // No gesture detected yet
            setDetectedSign(null);
            setGloveConnected(true);
          }
          
          setGloveLoading(false);
        } else {
          setGloveConnected(false);
          setGloveLoading(false);
        }
      } catch (error) {
        console.warn('Gesture API unavailable:', error);
        setGloveConnected(false);
        setGloveLoading(false);
      }
    };

    // Initial fetch
    fetchLatestGesture();

    // Poll every 1 second
    pollInterval = setInterval(fetchLatestGesture, 1000);

    return () => clearInterval(pollInterval);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-500 to-accent-500 py-12">
        <div className="page-container">
          <h1 className="text-4xl font-black text-white mb-2">Practice Mode <FaHandPeace className="inline-block ml-2" style={{fontSize: '1em'}} /></h1>
          <p className="text-lg text-primary-100">
            Mirror the instructor and perfect your signing
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="page-container py-12">
        {/* Video Panels Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* LEFT: Smart Glove Input */}
          <div className="flex flex-col">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                <FaGlobe className="inline-block mr-2" /> Smart Glove Input
              </h2>
              <p className="text-sm text-gray-600">Real-time gesture detection from Bluetooth gloves</p>
            </div>

            <div className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden shadow-lg border-2 border-gray-200">
              <div className="w-full h-full flex flex-col items-center justify-center p-8">
                {/* Connection Status */}
                <div className="mb-8 text-center">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <FaCircle 
                      className={`text-lg ${gloveConnected ? 'text-green-500' : 'text-gray-400'}`}
                      style={{
                        animation: gloveConnected ? 'pulse 2s infinite' : 'none'
                      }}
                    />
                    <span className={`font-semibold ${gloveConnected ? 'text-green-600' : 'text-gray-600'}`}>
                      {gloveLoading ? 'Connecting...' : gloveConnected ? 'Connected' : 'Waiting for device...'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">Bluetooth Gloves Status</p>
                </div>

                {/* Detected Gesture Display */}
                <div className="w-full max-w-xs">
                  <div className="bg-white rounded-lg p-8 border-2 border-primary-200 shadow-md text-center mb-6">
                    <p className="text-xs text-gray-600 mb-2 font-semibold">DETECTED SIGN</p>
                    <div className="text-4xl font-black text-primary-600 min-h-16 flex items-center justify-center">
                      {detectedSign ? detectedSign : '...'}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="text-center text-xs text-gray-600 space-y-2">
                    <p>Position your hand in front of the glove sensors</p>
                    <p>Keep steady for 1-2 seconds for detection</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Status Info */}
            <div className="mt-4">
              <div className={`p-4 rounded-lg text-sm ${
                gloveConnected 
                  ? 'bg-green-50 border border-green-200 text-green-800' 
                  : 'bg-yellow-50 border border-yellow-200 text-yellow-800'
              }`}>
                {gloveConnected 
                  ? 'Gloves connected and ready. Your gestures will appear above.' 
                  : 'Waiting for glove connection. Ensure Bluetooth gloves are powered and in range.'}
              </div>

              {/* Bluetooth Error Message */}
              {bluetoothError && (
                <div className="mt-3 p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-800">
                  ⚠️ {bluetoothError}
                </div>
              )}

              {/* Connect Gloves Button */}
              <div className="mt-4">
                {isBluetoothConnected ? (
                  <div className="bg-green-100 border-2 border-green-400 rounded-lg p-4 text-center">
                    <p className="text-sm font-semibold text-green-800">
                      ✅ Connected to {bluetoothDeviceName}
                    </p>
                  </div>
                ) : (
                  <AccessibleButton
                    variant="primary"
                    onClick={connectToGlove}
                    disabled={isBluetoothConnecting}
                    className="w-full"
                  >
                    {isBluetoothConnecting ? (
                      <>
                        <FaHourglass className="inline-block mr-2" /> Connecting...
                      </>
                    ) : (
                      <>
                        <FaBluetooth className="inline-block mr-2" /> Connect Gloves
                      </>
                    )}
                  </AccessibleButton>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT: Camera Mirror */}
          <div className="flex flex-col">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-gray-900">You <FaUser className="inline-block ml-2" /></h2>
              <p className="text-sm text-gray-600">See yourself mirrored and compare with instructor</p>
            </div>

            {/* Camera Feed Container */}
            <div className="flex-1 rounded-xl overflow-hidden shadow-lg camera-frame">
              {cameraPermissionDenied ? (
                /* Camera Permission Denied */
                <div className="w-full h-full bg-gray-100 flex flex-col items-center justify-center p-8">
                  <FaFrownOpen className="text-7xl mb-4 text-gray-400" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Camera Access Denied</h3>
                  <p className="text-gray-600 text-center mb-6">
                    Please allow camera access in your browser settings to use practice mode.
                  </p>
                  <p className="text-sm text-gray-500 text-center">
                    Most browsers show a permission prompt at the top of the page. Click "Allow" to continue.
                  </p>
                </div>
              ) : cameraActive ? (
                /* Camera Stream */
                <video
                  ref={cameraRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                  aria-label="Your camera feed"
                />
              ) : (
                /* Camera Placeholder */
                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center justify-center">
                  <FaCamera className="text-7xl mb-4 text-gray-400" />
                  <p className="text-gray-600 font-semibold">Ready to practice?</p>
                  <p className="text-sm text-gray-500 mt-2">Start your camera to begin</p>
                </div>
              )}
            </div>

            {/* Camera Controls */}
            <div className="mt-4 space-y-3">
              {!cameraActive ? (
                <AccessibleButton
                  variant="primary"
                  onClick={startCamera}
                  disabled={cameraLoading}
                  className="w-full"
                >
                  {cameraLoading ? (
                    <>
                      <FaHourglass className="inline-block mr-2" /> Requesting camera...
                    </>
                  ) : (
                    <>
                      <FaPlay className="inline-block mr-2" /> Start Camera
                    </>
                  )}
                </AccessibleButton>
              ) : (
                <AccessibleButton
                  variant="danger"
                  onClick={stopCamera}
                  className="w-full"
                >
                  <><FaStop className="inline-block mr-2" /> Stop Camera</>
                </AccessibleButton>
              )}
            </div>
          </div>
        </div>

        {/* Session Stats */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6"><FaChartBar className="inline-block mr-2" /> Session Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Signs Practiced Card */}
            <div className="stat-card bg-white border-2 border-gray-200 rounded-xl p-8 hover:shadow-lg transition-all">
              <div className="text-4xl font-black text-primary-600 mb-2">{signsPracticed}</div>
              <p className="text-gray-700 font-semibold">Signs Practiced</p>
              <p className="text-sm text-gray-600 mt-2">In this session</p>
            </div>

            {/* Accuracy Card */}
            <div className="stat-card bg-white border-2 border-gray-200 rounded-xl p-8 hover:shadow-lg transition-all">
              <div className="text-4xl font-black text-accent-600 mb-2">{accuracy}%</div>
              <p className="text-gray-700 font-semibold">Accuracy</p>
              <p className="text-sm text-gray-600 mt-2">Detected match with instructor</p>
            </div>

            {/* Time Spent Card */}
            <div className="stat-card bg-white border-2 border-gray-200 rounded-xl p-8 hover:shadow-lg transition-all">
              <div className="text-2xl font-black text-green-600 mb-2">{timeSpent}</div>
              <p className="text-gray-700 font-semibold">Time Spent</p>
              <p className="text-sm text-gray-600 mt-2">Keep practicing to improve</p>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-8">
          <h3 className="text-lg font-bold text-blue-900 mb-4"><FaLightbulb className="inline-block mr-2" /> Practice Tips</h3>
          <ul className="space-y-3">
            <li className="flex gap-3 text-blue-900">
              <span className="text-xl">✓</span>
              <span>Find good lighting so the camera can clearly see your hand movements</span>
            </li>
            <li className="flex gap-3 text-blue-900">
              <span className="text-xl">✓</span>
              <span>Keep your camera at eye level for the best view of your signing</span>
            </li>
            <li className="flex gap-3 text-blue-900">
              <span className="text-xl">✓</span>
              <span>Practice slowly at first, then gradually speed up to match the instructor</span>
            </li>
            <li className="flex gap-3 text-blue-900">
              <span className="text-xl">✓</span>
              <span>Pay attention to hand shape, position, movement, and facial expression</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Practice;
