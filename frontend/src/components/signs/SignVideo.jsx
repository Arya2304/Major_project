import { useState, useRef, useEffect } from 'react';
import './SignVideo.css';

const SignVideo = ({ video, onProgressUpdate }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener('loadedmetadata', () => {
        setDuration(video.duration);
      });
      video.addEventListener('timeupdate', () => {
        setCurrentTime(video.currentTime);
      });
      video.addEventListener('ended', () => {
        setIsPlaying(false);
        if (onProgressUpdate) {
          onProgressUpdate({
            watch_duration: Math.floor(video.duration),
            is_completed: true,
          });
        }
      });
    }
  }, [onProgressUpdate]);

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

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleProgress = () => {
    if (videoRef.current && onProgressUpdate) {
      const watchDuration = Math.floor(videoRef.current.currentTime);
      onProgressUpdate({
        watch_duration: watchDuration,
        is_completed: false,
      });
    }
  };

  return (
    <div className="sign-video-container">
      <div className="video-wrapper">
        <video
          ref={videoRef}
          src={video.video_file}
          poster={video.thumbnail}
          className="sign-video"
          onTimeUpdate={handleProgress}
          aria-label={`Video: ${video.title}`}
        />
        <div className="video-overlay">
          <button
            className="play-pause-btn"
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
          >
            {isPlaying ? '⏸️' : '▶️'}
          </button>
        </div>
      </div>
      <div className="video-info">
        <h3 className="video-title">{video.title}</h3>
        <div className="video-controls">
          <div className="time-display">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
          <button
            className="control-btn"
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? '⏸️ Pause' : '▶️ Play'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignVideo;

