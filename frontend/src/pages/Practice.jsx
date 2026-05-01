import React, { useState, useRef, useEffect } from 'react';
import AccessibleVideo from '../components/common/AccessibleVideo';
import AccessibleButton from '../components/common/AccessibleButton';
import { FaHandPeace, FaGraduationCap, FaRedo, FaUser, FaFrownOpen, FaCamera, FaHourglass, FaPlay, FaStop, FaChartBar, FaLightbulb, FaCircle, FaGlobe, FaBluetooth } from 'react-icons/fa';
import './Practice.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

/**
 * Practice.jsx — Phase 5
 * Main practice page with side-by-side instructor video and camera mirror
 * Users practice signing against the instructor and see themselves mirrored
 */

const Practice = () => {
  // Video refs and state
  const videoRef = useRef(null);
  const cameraRef = useRef(null);
  const captureCanvasRef = useRef(null);
  const streamRef = useRef(null);
  const lastDetectedRef = useRef(null);

  const [cameraActive, setCameraActive] = useState(false);
  const [cameraPermissionDenied, setCameraPermissionDenied] = useState(false);
  const [cameraLoading, setCameraLoading] = useState(false);

  // IoT Gesture state
  const [detectedSign, setDetectedSign] = useState(null);
  const [lastDetectedSign, setLastDetectedSign] = useState(null);
  const [lastGestureAt, setLastGestureAt] = useState(null);
  const [gestureConfidence, setGestureConfidence] = useState(null);
  const [gloveConnected, setGloveConnected] = useState(false);
  const [gloveLoading, setGloveLoading] = useState(true);

  // Bluetooth Glove Connection state
  const [leftGloveConnected, setLeftGloveConnected] = useState(false);
  const [rightGloveConnected, setRightGloveConnected] = useState(false);
  const [isConnectingLeft, setIsConnectingLeft] = useState(false);
  const [isConnectingRight, setIsConnectingRight] = useState(false);
  const [bluetoothError, setBluetoothError] = useState('');

  // Device Refs for disconnection
  const leftDeviceRef = useRef(null);
  const rightDeviceRef = useRef(null);

  const isBluetoothConnected = leftGloveConnected || rightGloveConnected;
  const bothGlovesConnected = leftGloveConnected && rightGloveConnected;

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

      streamRef.current = stream;
      setCameraActive(true);
      setCameraPermissionDenied(false);
    } catch (error) {
      console.error('Camera access denied:', error);
      setCameraPermissionDenied(true);
    } finally {
      setCameraLoading(false);
    }
  };

  useEffect(() => {
    if (cameraActive && cameraRef.current && streamRef.current) {
      cameraRef.current.srcObject = streamRef.current;
    }
  }, [cameraActive]);

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

  const SERVICE_UUID = "12345678-1234-1234-1234-1234567890ab";
  const CHAR_UUID = "abcd1234-5678-1234-5678-abcdef123456";

  /**
   * Connect to Bluetooth Glove Devices separately
   */
  const connectLeftGlove = async () => {
    setIsConnectingLeft(true);
    setBluetoothError('');
    try {
      if (!navigator.bluetooth) throw new Error('Use Chrome browser');
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: [SERVICE_UUID],
      });
      const server = await device.gatt.connect();
      const service = await server.getPrimaryService(SERVICE_UUID);
      const char = await service.getCharacteristic(CHAR_UUID);
      await char.startNotifications();
      // char.addEventListener('characteristicvaluechanged', handleLeft);

      leftDeviceRef.current = device;
      device.addEventListener('gattserverdisconnected', () => setLeftGloveConnected(false));

      console.log("LEFT connected");
      setLeftGloveConnected(true);
    } catch (error) {
      if (error.name !== 'NotFoundError' && !error.message.includes('cancelled')) {
        setBluetoothError(`Left Glove: ${error.message}`);
      }
    } finally {
      setIsConnectingLeft(false);
    }
  };

  const disconnectLeftGlove = () => {
    if (leftDeviceRef.current && leftDeviceRef.current.gatt.connected) {
      leftDeviceRef.current.gatt.disconnect();
    }
    setLeftGloveConnected(false);
  };

  const connectRightGlove = async () => {
    setIsConnectingRight(true);
    setBluetoothError('');
    try {
      if (!navigator.bluetooth) throw new Error('Use Chrome browser');
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: [SERVICE_UUID],
      });
      const server = await device.gatt.connect();
      const service = await server.getPrimaryService(SERVICE_UUID);
      const char = await service.getCharacteristic(CHAR_UUID);
      await char.startNotifications();
      // char.addEventListener('characteristicvaluechanged', handleRight);

      rightDeviceRef.current = device;
      device.addEventListener('gattserverdisconnected', () => setRightGloveConnected(false));

      console.log("RIGHT connected");
      setRightGloveConnected(true);
    } catch (error) {
      if (error.name !== 'NotFoundError' && !error.message.includes('cancelled')) {
        setBluetoothError(`Right Glove: ${error.message}`);
      }
    } finally {
      setIsConnectingRight(false);
    }
  };

  const disconnectRightGlove = () => {
    if (rightDeviceRef.current && rightDeviceRef.current.gatt.connected) {
      rightDeviceRef.current.gatt.disconnect();
    }
    setRightGloveConnected(false);
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
   * Send camera frames to backend gesture detector.
   */
  useEffect(() => {
    if (!cameraActive || !cameraRef.current) return undefined;

    let detectInterval;
    const detectFromFrame = async () => {
      try {
        const video = cameraRef.current;
        if (!video || video.readyState < 2) return;

        if (!captureCanvasRef.current) {
          captureCanvasRef.current = document.createElement('canvas');
        }
        const canvas = captureCanvasRef.current;
        const width = 320;
        const height = 240;
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.drawImage(video, 0, 0, width, height);

        const image = canvas.toDataURL('image/jpeg', 0.7);

        const response = await fetch(`${API_BASE_URL}/api/sign-language/gesture/detect/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ image }),
        });

        if (response.ok) {
          const data = await response.json();

          const detected = data?.gesture || data?.prediction || data?.label || null;
          const confidence =
            typeof data?.confidence === 'number'
              ? Math.round(data.confidence * 100)
              : typeof data?.score === 'number'
                ? Math.round(data.score * 100)
                : null;

          if (detected) {
            setDetectedSign(detected);
            setGestureConfidence(confidence);
            setGloveConnected(true);
            setLastGestureAt(new Date().toLocaleTimeString());

            if (detected !== lastDetectedRef.current) {
              lastDetectedRef.current = detected;
              setLastDetectedSign(detected);
              setSignsPracticed((prev) => prev + 1);
            }
            if (confidence != null) {
              setAccuracy(confidence);
            }
          } else {
            // No gesture detected yet
            setDetectedSign(null);
            setGestureConfidence(null);
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

    detectFromFrame();
    detectInterval = setInterval(detectFromFrame, 1200);

    return () => {
      if (detectInterval) clearInterval(detectInterval);
    };
  }, [cameraActive]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-500 to-accent-500 py-12">
        <div className="page-container">
          <h1 className="text-4xl font-black text-white mb-2">Practice Mode <FaHandPeace className="inline-block ml-2" style={{ fontSize: '1em' }} /></h1>
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
                      className={`text-lg ${bothGlovesConnected ? 'text-green-500' : isBluetoothConnected ? 'text-blue-500' : 'text-gray-400'}`}
                      style={{
                        animation: bothGlovesConnected ? 'pulse 2s infinite' : 'none'
                      }}
                    />
                    <span className={`font-semibold ${bothGlovesConnected ? 'text-green-600' : isBluetoothConnected ? 'text-blue-600' : 'text-gray-600'}`}>
                      {bothGlovesConnected ? 'Both Connected Successfully' : isBluetoothConnected ? 'One Connected...' : 'Waiting for device...'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">Bluetooth Gloves Status</p>
                </div>
                <div className="text-center">
                  <div className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-2">Detected Gesture</div>
                  <div className="text-3xl font-black text-primary-600">
                    {detectedSign || '--'}
                  </div>
                  <div className="text-xs text-gray-600 mt-2">
                    {gestureConfidence != null ? `Confidence: ${gestureConfidence}%` : 'Confidence: N/A'}
                  </div>
                </div>
              </div>
            </div>

            {/* Status Info */}
            <div className="mt-4">
              <div className={`p-4 rounded-lg text-sm ${bothGlovesConnected
                ? 'bg-green-50 border border-green-200 text-green-800'
                : isBluetoothConnected
                  ? 'bg-blue-50 border border-blue-200 text-blue-800'
                  : 'bg-yellow-50 border border-yellow-200 text-yellow-800'
                }`}>
                {bothGlovesConnected
                  ? 'Both Gloves Connected Successfully'
                  : isBluetoothConnected
                    ? 'One Glove Connected. Waiting for the other...'
                    : 'Waiting for glove connection'}
              </div>
              {gloveConnected && (
                <div className="mt-3 p-4 bg-primary-50 border border-primary-200 rounded-lg text-sm text-primary-800">
                  Latest gesture: <span className="font-bold">{detectedSign || 'No gesture yet'}</span>
                  {lastGestureAt ? ` at ${lastGestureAt}` : ''}
                </div>
              )}

              {/* Bluetooth Error Message */}
              {bluetoothError && (
                <div className="mt-3 p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-800">
                  ⚠️ {bluetoothError}
                </div>
              )}

              {/* Connect Gloves Buttons */}
              <div className="mt-4 flex flex-col gap-3">
                {!leftGloveConnected ? (
                  <AccessibleButton
                    variant="primary"
                    onClick={connectLeftGlove}
                    disabled={isConnectingLeft}
                    className="w-full"
                  >
                    {isConnectingLeft ? (
                      <><FaHourglass className="inline-block mr-2" /> Connecting Left...</>
                    ) : (
                      <><FaBluetooth className="inline-block mr-2" /> Connect Left Glove</>
                    )}
                  </AccessibleButton>
                ) : (
                  <AccessibleButton
                    variant="secondary"
                    onClick={disconnectLeftGlove}
                    className="w-full bg-green-50 border-2 border-green-400 text-green-800 hover:bg-red-50 hover:border-red-400 hover:text-red-800 transition-colors"
                  >
                    ✅ Left Connected (Disconnect)
                  </AccessibleButton>
                )}

                {!rightGloveConnected ? (
                  <AccessibleButton
                    variant="primary"
                    onClick={connectRightGlove}
                    disabled={isConnectingRight}
                    className="w-full"
                  >
                    {isConnectingRight ? (
                      <><FaHourglass className="inline-block mr-2" /> Connecting Right...</>
                    ) : (
                      <><FaBluetooth className="inline-block mr-2" /> Connect Right Glove</>
                    )}
                  </AccessibleButton>
                ) : (
                  <AccessibleButton
                    variant="secondary"
                    onClick={disconnectRightGlove}
                    className="w-full bg-green-50 border-2 border-green-400 text-green-800 hover:bg-red-50 hover:border-red-400 hover:text-red-800 transition-colors"
                  >
                    ✅ Right Connected (Disconnect)
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
                <div className="relative w-full h-full">
                  <video
                    ref={cameraRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                    aria-label="Your camera feed"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1.5 rounded-lg bg-black/70 text-white text-xs font-bold">
                    Gesture: {detectedSign || 'Detecting...'}
                  </div>
                </div>
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
