import { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaExpand } from 'react-icons/fa';

/**
 * Highly accessible video player component for deaf and mute users
 * Features:
 * - Large, high-contrast controls
 * - Keyboard navigation
 * - ARIA labels
 * - Fullscreen support
 * - Volume control
 */
const AccessibleVideo = ({
  src,
  poster,
  title,
  onProgressUpdate,
  className = '',
  autoPlay = false,
}) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      if (onProgressUpdate) {
        onProgressUpdate({
          watch_duration: Math.floor(video.duration),
          is_completed: true,
        });
      }
    };

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
      video.removeEventListener('ended', handleEnded);
    };
  }, [onProgressUpdate]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

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

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    if (videoRef.current) {
      videoRef.current.currentTime = pos * duration;
      setCurrentTime(pos * duration);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement && containerRef.current) {
      containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else if (document.fullscreenElement) {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleKeyDown = (e) => {
    if (!videoRef.current) return;

    switch (e.key) {
      case ' ':
      case 'k':
        e.preventDefault();
        togglePlay();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        videoRef.current.currentTime -= 10;
        break;
      case 'ArrowRight':
        e.preventDefault();
        videoRef.current.currentTime += 10;
        break;
      case 'ArrowUp':
        e.preventDefault();
        setVolume(Math.min(1, volume + 0.1));
        break;
      case 'ArrowDown':
        e.preventDefault();
        setVolume(Math.max(0, volume - 0.1));
        break;
      case 'f':
        e.preventDefault();
        toggleFullscreen();
        break;
      case 'm':
        e.preventDefault();
        toggleMute();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (onProgressUpdate && videoRef.current) {
      const interval = setInterval(() => {
        if (isPlaying && videoRef.current) {
          onProgressUpdate({
            watch_duration: Math.floor(videoRef.current.currentTime),
            is_completed: false,
          });
        }
      }, 5000); // Update every 5 seconds

      return () => clearInterval(interval);
    }
  }, [isPlaying, onProgressUpdate]);

  return (
    <div
      ref={containerRef}
      className={`video-container ${className}`}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="application"
      aria-label={`Video player: ${title}`}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-full object-contain"
        aria-label={title}
        playsInline
      />

      {/* Large overlay controls */}
      <div className="video-controls" role="toolbar" aria-label="Video controls">
        {/* Play/Pause Button - Large and prominent */}
        <button
          onClick={togglePlay}
          className="video-btn"
          aria-label={isPlaying ? 'Pause video' : 'Play video'}
          aria-pressed={isPlaying}
        >
          {isPlaying ? (
            <FaPause className="text-3xl" aria-hidden="true" />
          ) : (
            <FaPlay className="text-3xl" aria-hidden="true" />
          )}
        </button>

        {/* Progress Bar - Large and easy to click */}
        <div
          className="flex-1 mx-4 cursor-pointer"
          onClick={handleSeek}
          role="slider"
          aria-label="Video progress"
          aria-valuemin={0}
          aria-valuemax={duration}
          aria-valuenow={currentTime}
          tabIndex={0}
        >
          <div className="progress-bar bg-white/30 h-3 rounded-full">
            <div
              className="progress-fill bg-white h-full rounded-full"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>
        </div>

        {/* Time Display - Large text */}
        <div className="text-white text-xl font-bold min-w-[120px] text-center" aria-live="polite">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>

        {/* Volume Control */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleMute}
            className="video-btn"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
            aria-pressed={isMuted}
          >
            {isMuted ? (
              <FaVolumeMute className="text-2xl" aria-hidden="true" />
            ) : (
              <FaVolumeUp className="text-2xl" aria-hidden="true" />
            )}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-24 h-2 bg-white/30 rounded-lg appearance-none cursor-pointer"
            aria-label="Volume control"
            style={{
              background: `linear-gradient(to right, white 0%, white ${(isMuted ? 0 : volume) * 100}%, rgba(255,255,255,0.3) ${(isMuted ? 0 : volume) * 100}%, rgba(255,255,255,0.3) 100%)`,
            }}
          />
        </div>

        {/* Fullscreen Button */}
        <button
          onClick={toggleFullscreen}
          className="video-btn"
          aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
        >
          <FaExpand className="text-2xl" aria-hidden="true" />
        </button>
      </div>

      {/* Keyboard shortcuts help (visible on focus) */}
      <div className="sr-only" role="region" aria-label="Keyboard shortcuts">
        <p>Space or K: Play/Pause</p>
        <p>Left/Right Arrow: Seek 10 seconds</p>
        <p>Up/Down Arrow: Adjust volume</p>
        <p>F: Toggle fullscreen</p>
        <p>M: Toggle mute</p>
      </div>
    </div>
  );
};

export default AccessibleVideo;

