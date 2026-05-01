import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AccessibleVideo from '../components/common/AccessibleVideo';
import AccessibleButton from '../components/common/AccessibleButton';
import { signsAPI } from '../api/signs';
import { FaPlayCircle } from 'react-icons/fa';
import './SignLearning.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const toAbsoluteMediaUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `${API_BASE_URL}${url}`;
};

const SignLearning = () => {
  const { signId, id } = useParams();
  const navigate = useNavigate();
  const activeSignId = signId || id;

  const [loading, setLoading] = useState(true);
  const [sign, setSign] = useState(null);
  const [videos, setVideos] = useState([]);
  const [selectedVideoId, setSelectedVideoId] = useState(null);

  useEffect(() => {
    const loadSignData = async () => {
      if (!activeSignId) return;
      setLoading(true);
      try {
        const [signData, videosData] = await Promise.all([
          signsAPI.getSign(activeSignId),
          signsAPI.getVideos({ sign: activeSignId }),
        ]);
        const videosList = videosData?.results || videosData || [];
        setSign(signData || null);
        setVideos(videosList);
        setSelectedVideoId(videosList[0]?.id ?? null);
      } catch (error) {
        console.error('[SignLearning] Failed to load sign data:', error);
        setSign(null);
        setVideos([]);
      } finally {
        setLoading(false);
      }
    };

    loadSignData();
  }, [activeSignId]);

  const selectedVideo = useMemo(() => {
    return videos.find((v) => String(v.id) === String(selectedVideoId)) || videos[0] || null;
  }, [videos, selectedVideoId]);

  const selectedVideoUrl = useMemo(() => {
    return selectedVideo?.video_file ? toAbsoluteMediaUrl(selectedVideo.video_file) : '';
  }, [selectedVideo]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-600 font-semibold">Loading sign lesson...</p>
      </div>
    );
  }

  if (!sign) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 font-semibold mb-4">Sign not found.</p>
          <AccessibleButton variant="primary" onClick={() => navigate('/dictionary')}>
            Back to Dictionary
          </AccessibleButton>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-primary-500 to-accent-500 py-8">
        <div className="page-container">
          <button
            type="button"
            onClick={() => navigate('/dictionary')}
            className="text-primary-100 hover:text-white text-sm font-medium mb-4"
          >
            ← Back to Dictionary
          </button>
          <div>
            <h1 className="text-4xl font-black text-white">
              How to sign: <span className="block text-accent-100 mt-1">{sign.word}</span>
            </h1>
            <p className="text-primary-100 mt-2">
              {sign.language_display || sign.language} • {sign.difficulty_display || sign.difficulty_level} • {sign.category?.name || 'General'}
            </p>
          </div>
        </div>
      </div>

      <div className="page-container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-12 fade-in">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">🖼️ Sign Image</h2>
              <div className="w-full aspect-video rounded-2xl border border-gray-200 bg-gray-50 shadow-sm overflow-hidden flex items-center justify-center">
                {sign.image ? (
                  <img
                    src={toAbsoluteMediaUrl(sign.image)}
                    alt={sign.word}
                    className="w-full h-full object-contain bg-black/5"
                  />
                ) : (
                  <div className="text-center text-gray-500">
                    <div className="text-6xl mb-3">🖼️</div>
                    <p className="font-semibold">Image not available</p>
                  </div>
                )}
              </div>
            </div>

            <div className="mb-12 fade-in">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">📹 Full Demonstration</h2>
              <AccessibleVideo src={selectedVideoUrl} title={`How to sign ${sign.word}`} />
              {selectedVideo?.description && (
                <p className="mt-4 text-gray-700 leading-relaxed">{selectedVideo.description}</p>
              )}
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">📝 Sign Details</h2>
              <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                <p className="text-gray-700 leading-relaxed">
                  {sign.description || 'No additional description available for this sign.'}
                </p>
                <div className="mt-4 flex flex-wrap gap-3 text-sm">
                  <span className="px-3 py-1 rounded-full bg-primary-100 text-primary-700 font-semibold">
                    Language: {sign.language_display || sign.language}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-accent-100 text-accent-700 font-semibold">
                    Difficulty: {sign.difficulty_display || sign.difficulty_level}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 font-semibold">
                    Category: {sign.category?.name || 'General'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="space-y-6 sticky top-32">
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">🎬 Videos ({videos.length})</h3>
                <div className="space-y-3">
                  {videos.length === 0 ? (
                    <div className="text-sm text-gray-600">No videos available for this sign yet.</div>
                  ) : (
                    videos.map((video) => {
                      const active = String(video.id) === String(selectedVideo?.id);
                      return (
                        <button
                          key={video.id}
                          type="button"
                          onClick={() => setSelectedVideoId(video.id)}
                          className={`w-full text-left p-3 rounded-lg border transition ${
                            active ? 'border-primary-300 bg-primary-50' : 'border-gray-200 bg-white hover:border-primary-200'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            {video.thumbnail ? (
                              <img
                                src={toAbsoluteMediaUrl(video.thumbnail)}
                                alt={video.title}
                                className="w-14 h-10 rounded object-cover border border-gray-200"
                              />
                            ) : (
                              <div className="w-14 h-10 rounded bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-500">
                                <FaPlayCircle />
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-sm text-gray-900 line-clamp-1">{video.title || sign.word}</p>
                              <p className="text-xs text-gray-500">{video.duration != null ? `${video.duration}s` : 'Duration N/A'}</p>
                            </div>
                          </div>
                        </button>
                      );
                    })
                  )}
                </div>
              </div>

              <AccessibleButton
                variant="primary"
                onClick={() => navigate('/practice')}
                className="w-full"
              >
                ▶️ Practice This Sign
              </AccessibleButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignLearning;
