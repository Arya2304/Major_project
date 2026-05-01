import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { signsAPI } from '../api/signs';
import Loader from '../components/common/Loader';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8001';

const toAbsoluteMediaUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  // Backend media URLs are typically like "/media/..." in development.
  return `${API_BASE_URL}${url}`;
};

const SignDetail = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [sign, setSign] = useState(null);
  const [videos, setVideos] = useState([]);
  const [selectedVideoId, setSelectedVideoId] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const [signData, videosData] = await Promise.all([
          signsAPI.getSign(id),
          signsAPI.getVideos({ sign: id }),
        ]);

        const videosList = videosData?.results || videosData || [];
        setSign(signData);
        setVideos(videosList);
        setSelectedVideoId(videosList[0]?.id ?? null);
      } catch (error) {
        console.error('[SignDetail] Failed to load sign detail:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  const selectedVideo = useMemo(() => {
    if (!videos.length) return null;
    return videos.find((v) => String(v.id) === String(selectedVideoId)) || videos[0] || null;
  }, [videos, selectedVideoId]);

  const videoUrl = useMemo(() => {
    if (!selectedVideo?.video_file) return '';
    return toAbsoluteMediaUrl(selectedVideo.video_file);
  }, [selectedVideo]);

  const shouldUseNativeVideo = useMemo(() => {
    if (!videoUrl) return false;
    // ReactPlayer can be finicky with some direct file URLs; native <video> is reliable for file types.
    return /\.(mp4|webm|ogg)(\?.*)?$/i.test(videoUrl.split('#')[0]);
  }, [videoUrl]);

  if (loading) return <Loader />;

  if (!sign) {
    return (
      <div className="p-8">
        <p className="text-red-600 text-lg mb-4">Sign not found.</p>
        <Link to="/signs" className="text-primary-600 hover:text-primary-700 font-medium">
          ← Back to Signs
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 p-8 sticky top-0 z-40 shadow-sm">
        <Link to="/signs" className="text-primary-600 hover:text-primary-700 font-medium mb-4 inline-block">
          ← Back to Signs
        </Link>
        <div className="flex flex-wrap items-center gap-4">
          <div className="w-20 h-20 rounded-lg overflow-hidden bg-primary-50 border border-primary-200 flex items-center justify-center">
            {sign.image ? (
              <img src={toAbsoluteMediaUrl(sign.image)} alt={sign.word} className="w-full h-full object-cover" />
            ) : (
              <span className="text-4xl">✋</span>
            )}
          </div>
          <div>
            <h1 className="text-3xl font-black text-dark-500">{sign.word}</h1>
            <p className="text-gray-600 mt-1">
              {sign.language_display || sign.language} • {sign.difficulty_display || sign.difficulty_level}
            </p>
          </div>
        </div>
      </div>

      <div className="p-8 max-w-6xl mx-auto">
        {sign.description && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h2 className="text-xl font-bold text-dark-500 mb-2">About</h2>
            <p className="text-gray-700 leading-relaxed">{sign.description}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-black rounded-2xl overflow-hidden shadow-xl aspect-video flex items-center justify-center">
              {selectedVideo?.video_file ? (
                shouldUseNativeVideo ? (
                  <video
                    src={videoUrl}
                    controls
                    preload="metadata"
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    playsInline
                  />
                ) : (
                  <ReactPlayer
                    url={videoUrl}
                    controls
                    width="100%"
                    height="100%"
                    playing={false}
                  />
                )
              ) : (
                <div className="text-center text-white p-8">
                  <div className="text-6xl mb-4">🎥</div>
                  <p className="text-xl font-bold">Video not available</p>
                </div>
              )}
            </div>

            {selectedVideo?.duration != null && (
              <div className="mt-4 text-sm text-gray-600 bg-white rounded-lg border border-gray-200 px-4 py-3">
                Duration: {selectedVideo.duration}s
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-28">
              <h3 className="text-lg font-bold text-dark-500 mb-4">
                Videos ({videos.length})
              </h3>
              {videos.length ? (
                <div className="space-y-3">
                  {videos.map((v) => {
                    const active = String(v.id) === String(selectedVideo?.id);
                    return (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => setSelectedVideoId(v.id)}
                        className={`w-full text-left p-3 rounded-lg border transition-all ${
                          active
                            ? 'bg-primary-50 border-primary-300'
                            : 'bg-white border-gray-100 hover:bg-gray-50 hover:border-primary-200'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 flex items-center justify-center">
                            {v.thumbnail ? (
                              <img
                                src={toAbsoluteMediaUrl(v.thumbnail)}
                                alt={sign.word}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="text-2xl">🎬</span>
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="font-bold text-dark-500 line-clamp-1">{v.title}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {v.duration != null ? `${v.duration}s` : '—'}
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-600">No videos found for this sign.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignDetail;

