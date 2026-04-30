import React, { useState, useRef, useEffect } from 'react';
import AccessibleVideo from '../components/common/AccessibleVideo';
import AccessibleButton from '../components/common/AccessibleButton';
import { FaHandPeace, FaGraduationCap, FaRedo, FaUser, FaFrownOpen, FaCamera, FaHourglass, FaPlay, FaStop, FaChartBar, FaLightbulb } from 'react-icons/fa';
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
   * Cleanup camera on unmount
   */
  useEffect(() => {
    return () => {
      stopCamera();
    };
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
          {/* LEFT: Instructor Video */}
          <div className="flex flex-col">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-gray-900"><FaGraduationCap className="inline-block mr-2" /> Instructor</h2>
              <p className="text-sm text-gray-600">Follow along with the sign demonstration</p>
            </div>

            <div className="flex-1 bg-black rounded-xl overflow-hidden shadow-lg">
              <AccessibleVideo
                src="https://via.placeholder.com/800x600?text=Instructor+Demo"
                title="Practice: Hello Sign"
              />
            </div>

            {/* Replay Button */}
            <div className="mt-4">
              <AccessibleButton variant="outline" className="w-full">
                <FaRedo className="inline-block mr-2" /> Replay Sign
              </AccessibleButton>
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
