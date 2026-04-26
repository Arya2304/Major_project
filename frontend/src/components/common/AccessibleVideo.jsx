import React, { useRef, useState, useEffect } from 'react';

/**
 * AccessibleVideo.jsx — Phase 4
 * Reusable HTML5 video player with custom accessible controls
 * Features: play/pause, seek, speed control, captions, fullscreen, keyboard shortcuts
 * Props: src, title, captions (optional array of {startTime, endTime, text})
 */
const AccessibleVideo = ({ src, title = 'Video Player', captions = [] }) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  // Video state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showCaptions, setShowCaptions] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Get current caption text
  const currentCaption = captions.find(
    (cap) => currentTime >= cap.startTime && currentTime < cap.endTime
  );

  /**
   * Format time as MM:SS
   */
  const formatTime = (seconds) => {
    if (!seconds || !Number.isFinite(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  /**
   * Play/Pause toggle
   */
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

  /**
   * Seek to time
   */
  const handleSeek = (newTime) => {
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  /**
   * Change playback speed
   */
  const handleSpeedChange = (newSpeed) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = newSpeed;
      setSpeed(newSpeed);
    }
  };

  /**
   * Toggle mute
   */
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  /**
   * Toggle fullscreen
   */
  const toggleFullscreen = async () => {
    try {
      if (!isFullscreen) {
        if (containerRef.current?.requestFullscreen) {
          await containerRef.current.requestFullscreen();
          setIsFullscreen(true);
        }
      } else {
        if (document.fullscreenElement) {
          await document.exitFullscreen();
          setIsFullscreen(false);
        }
      }
    } catch (err) {
      console.error('Fullscreen request failed:', err);
    }
  };

  /**
   * Update video time from input
   */
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  /**
   * Update duration when metadata loads
   */
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  /**
   * Keyboard shortcuts
   */
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Only if video player is focused or hovered
      if (!containerRef.current?.contains(document.activeElement) && e.target !== document.body) {
        return;
      }

      switch (e.key.toLowerCase()) {
        case ' ':
          e.preventDefault();
          togglePlay();
          break;
        case 'arrowright':
          e.preventDefault();
          handleSeek(Math.min(currentTime + 5, duration));
          break;
        case 'arrowleft':
          e.preventDefault();
          handleSeek(Math.max(currentTime - 5, 0));
          break;
        case 'm':
          e.preventDefault();
          toggleMute();
          break;
        case 'f':
          e.preventDefault();
          toggleFullscreen();
          break;
        case 'c':
          e.preventDefault();
          setShowCaptions(!showCaptions);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, currentTime, duration, isMuted, isFullscreen, showCaptions]);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-gray-900 rounded-xl overflow-hidden group"
      role="region"
      aria-label={`Video player: ${title}`}
    >
      {/* Video Element */}
      {src ? (
        <video
          ref={videoRef}
          src={src}
          className="w-full h-auto display-block"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          aria-label={title}
        />
      ) : (
        // Placeholder
        <div className="w-full aspect-video bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">🎥</div>
            <p className="text-white font-semibold">{title}</p>
            <p className="text-white/60 text-sm mt-2">Video placeholder</p>
          </div>
        </div>
      )}

      {/* Caption Display */}
      {showCaptions && currentCaption && (
        <div className="absolute bottom-24 left-0 right-0 text-center pointer-events-none">
          <div className="inline-block bg-black/80 text-white px-4 py-2 rounded-lg text-sm max-w-2xl">
            {currentCaption.text}
          </div>
        </div>
      )}

      {/* Custom Controls Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent pt-8 pb-4 px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {/* Progress Bar */}
        <div className="mb-4 flex items-center gap-2">
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={(e) => handleSeek(parseFloat(e.target.value))}
            className="flex-1 h-1 bg-gray-600 rounded-full cursor-pointer accent-accent-500"
            aria-label="Video progress"
          />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between gap-3">
          {/* Left: Play, Mute, Time */}
          <div className="flex items-center gap-3">
            {/* Play/Pause */}
            <button
              onClick={togglePlay}
              className="text-white hover:text-accent-400 transition-colors active:scale-95"
              aria-label={isPlaying ? 'Pause' : 'Play'}
              title={`${isPlaying ? 'Pause' : 'Play'} (Space)`}
            >
              <span className="text-xl">{isPlaying ? '⏸️' : '▶️'}</span>
            </button>

            {/* Mute */}
            <button
              onClick={toggleMute}
              className="text-white hover:text-accent-400 transition-colors active:scale-95"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
              title={`${isMuted ? 'Unmute' : 'Mute'} (M)`}
            >
              <span className="text-xl">{isMuted ? '🔇' : '🔊'}</span>
            </button>

            {/* Time Display */}
            <div className="text-white text-xs font-mono ml-2 whitespace-nowrap">
              <span>{formatTime(currentTime)}</span>
              <span className="opacity-60 mx-1">/</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Right: Speed, Captions, Fullscreen */}
          <div className="flex items-center gap-3">
            {/* Speed Control */}
            <select
              value={speed}
              onChange={(e) => handleSpeedChange(parseFloat(e.target.value))}
              className="text-white bg-gray-800/80 text-xs rounded px-2 py-1 hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-accent-400"
              aria-label="Playback speed"
              title="Playback speed"
            >
              <option value={0.5}>0.5x</option>
              <option value={0.75}>0.75x</option>
              <option value={1}>1x</option>
              <option value={1.25}>1.25x</option>
              <option value={1.5}>1.5x</option>
            </select>

            {/* Captions Toggle */}
            {captions.length > 0 && (
              <button
                onClick={() => setShowCaptions(!showCaptions)}
                className={`transition-colors active:scale-95 ${
                  showCaptions
                    ? 'text-accent-400'
                    : 'text-white hover:text-accent-400'
                }`}
                aria-label={showCaptions ? 'Hide captions' : 'Show captions'}
                title={`${showCaptions ? 'Hide' : 'Show'} Captions (C)`}
              >
                <span className="text-xl">💬</span>
              </button>
            )}

            {/* Fullscreen */}
            <button
              onClick={toggleFullscreen}
              className="text-white hover:text-accent-400 transition-colors active:scale-95"
              aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
              title={`${isFullscreen ? 'Exit' : 'Enter'} Fullscreen (F)`}
            >
              <span className="text-xl">⛶</span>
            </button>
          </div>
        </div>

        {/* Keyboard Shortcuts Hint (shown on first hover) */}
        <div className="text-white/50 text-xs mt-2 text-center">
          <span>Space: Play/Pause | ← →: Skip 5s | M: Mute | C: Captions | F: Fullscreen</span>
        </div>
      </div>

      {/* Focus Ring for Accessibility */}
      <style>{`
        div[role="region"]:focus-within {
          outline: 2px solid #4F46E5;
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
};

export default AccessibleVideo;

