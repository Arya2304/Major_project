import { Link } from 'react-router-dom';
import './SignCard.css';

const SignCard = ({ sign }) => {
  return (
    <Link
      to={`/signs/${sign.id}`}
      className="sign-card"
      aria-label={`Learn sign for ${sign.word}`}
    >
      <div className="sign-card-image">
        {sign.image ? (
          <img src={sign.image} alt={sign.word} />
        ) : (
          <div className="sign-placeholder">✋</div>
        )}
        <div className="sign-language-badge">{sign.language}</div>
      </div>
      <div className="sign-card-content">
        <h3 className="sign-word">{sign.word}</h3>
        <div className="sign-meta">
          <span className={`difficulty-badge difficulty-${sign.difficulty_level}`}>
            {sign.difficulty_display}
          </span>
          {sign.videos_count > 0 && (
            <span className="video-count">🎥 {sign.videos_count} videos</span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default SignCard;

