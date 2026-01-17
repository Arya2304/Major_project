import { useState, useRef, useEffect } from 'react';
import './LessonPlayer.css';

const LessonPlayer = ({ lesson, onProgressUpdate }) => {
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
    <div className="lesson-player-container">
      <div className="video-wrapper">
        <video
          ref={videoRef}
          src={lesson.video}
          poster={lesson.thumbnail}
          className="lesson-video"
          onTimeUpdate={handleProgress}
          aria-label={`Lesson video: ${lesson.title}`}
        />
        <div className="video-overlay">
          <button
            className="play-pause-btn"
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause lesson' : 'Play lesson'}
          >
            {isPlaying ? '⏸️' : '▶️'}
          </button>
        </div>
      </div>
      <div className="lesson-info">
        <h3 className="lesson-title">{lesson.title}</h3>
        {lesson.description && (
          <p className="lesson-description">{lesson.description}</p>
        )}
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
        {lesson.signs && lesson.signs.length > 0 && (
          <div className="lesson-signs">
            <h4>Signs in this lesson:</h4>
            <div className="signs-list">
              {lesson.signs.map((sign) => (
                <span key={sign.id} className="sign-tag">
                  {sign.word}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonPlayer;

