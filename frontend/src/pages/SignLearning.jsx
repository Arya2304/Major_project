import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AccessibleVideo from '../components/common/AccessibleVideo';
import AccessibleButton from '../components/common/AccessibleButton';
import './SignLearning.css';

/**
 * SignLearning.jsx — Phase 4
 * Step-by-step sign breakdown page
 * Shows how to sign a specific word with hand positions and movements
 */

// Mock sign learning data (would come from Dictionary or params)
const MOCK_SIGN_LESSONS = {
  1: {
    id: 1,
    word: 'Hello',
    videoUrl: 'https://via.placeholder.com/800x600?text=Hello+Sign+Demo',
    steps: [
      {
        id: 1,
        number: 1,
        title: 'Start Position',
        emoji: '✋',
        description: 'Raise your hand to shoulder height with all fingers extended and palm facing outward.',
        annotation: 'Palm facing forward, fingers relaxed',
      },
      {
        id: 2,
        number: 2,
        title: 'Make the Wave',
        emoji: '👋',
        description: 'Move your hand side to side in a gentle waving motion, keeping your elbow still.',
        annotation: 'Wrist movement only, smooth motion',
      },
      {
        id: 3,
        number: 3,
        title: 'Friendly Expression',
        emoji: '😊',
        description: 'Maintain a warm, friendly facial expression while making the greeting gesture.',
        annotation: 'Smile and make eye contact with the person',
      },
    ],
    handPositions: [
      { emoji: '✋', label: 'Open Hand', description: 'All fingers extended and spread' },
      { emoji: '🤚', label: 'Back of Hand', description: 'Palm facing backward' },
      { emoji: '👋', label: 'Wave Position', description: 'Hand waving side to side' },
      { emoji: '🤙', label: 'Casual', description: 'Thumb and pinky extended' },
    ],
    tips: [
      'Keep your movements smooth and natural, not jerky or stiff',
      'Make sure your palm is clearly visible to the person you\'re greeting',
      'Maintain a warm facial expression to match the friendly nature of the greeting',
    ],
  },
  2: {
    id: 2,
    word: 'Thank You',
    videoUrl: 'https://via.placeholder.com/800x600?text=Thank+You+Sign+Demo',
    steps: [
      {
        id: 1,
        number: 1,
        title: 'Hand Shape',
        emoji: '✋',
        description: 'Form an open hand with fingers extended and slightly curved.',
        annotation: 'Relaxed hand position',
      },
      {
        id: 2,
        number: 2,
        title: 'Starting Position',
        emoji: '👃',
        description: 'Hold your hand near your mouth or chin area.',
        annotation: 'Hand at face level',
      },
      {
        id: 3,
        number: 3,
        title: 'Forward Motion',
        emoji: '👋',
        description: 'Move your hand downward and outward in a graceful arc motion.',
        annotation: 'Smooth, respectful gesture',
      },
      {
        id: 4,
        number: 4,
        title: 'Finish',
        emoji: '✋',
        description: 'End with your hand extended, palm facing up, expressing gratitude.',
        annotation: 'Open, generous gesture',
      },
    ],
    handPositions: [
      { emoji: '✋', label: 'Open Hand', description: 'All fingers extended' },
      { emoji: '🤲', label: 'Offering', description: 'Both hands palms up' },
      { emoji: '👐', label: 'Appreciation', description: 'Both arms spread open' },
    ],
    tips: [
      'This sign conveys genuine appreciation and respect',
      'The downward motion is important - it shows humility',
      'Pair this sign with a sincere facial expression',
    ],
  },
};

const SignLearning = () => {
  const { signId } = useParams();
  const navigate = useNavigate();
  const sign = MOCK_SIGN_LESSONS[signId] || MOCK_SIGN_LESSONS[1];
  const [expandedTip, setExpandedTip] = useState(null);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-500 to-accent-500 py-8">
        <div className="page-container">
          <h1 className="text-4xl font-black text-white">
            How to sign: <span className="block text-accent-100 mt-2">{sign.word}</span>
          </h1>
          <p className="text-primary-100 mt-4 text-lg">Learn step-by-step from native ISL signers</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="page-container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main: Video + Steps */}
          <div className="lg:col-span-2">
            {/* Video Player */}
            <div className="mb-12 fade-in">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">📹 Full Demonstration</h2>
              <AccessibleVideo
                src={sign.videoUrl}
                title={`How to sign ${sign.word}`}
              />
            </div>

            {/* Step-by-Step Breakdown */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">📝 Step-by-Step Breakdown</h2>
              <div className="space-y-6">
                {sign.steps.map((step, index) => (
                  <div
                    key={step.id}
                    className="step-card bg-white border-2 border-gray-200 rounded-xl p-8 hover:shadow-lg transition-all"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Step Number Badge + Emoji */}
                    <div className="flex items-start gap-6 mb-4">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 text-white rounded-full flex items-center justify-center font-bold text-2xl shadow-lg">
                          {step.number}
                        </div>
                      </div>

                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{step.title}</h3>
                        
                        {/* Hand Position Emoji */}
                        <div className="text-5xl mb-4">{step.emoji}</div>

                        {/* Description */}
                        <p className="text-gray-700 text-lg leading-relaxed mb-4">
                          {step.description}
                        </p>

                        {/* Annotation */}
                        <div className="bg-primary-50 border-l-4 border-primary-500 rounded px-4 py-3">
                          <p className="text-sm font-semibold text-primary-900">💡 {step.annotation}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar: Hand Positions + Tips */}
          <div className="lg:col-span-1">
            <div className="space-y-6 sticky top-32">
              {/* Hand Position Guide */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">✋ Hand Positions</h3>
                <div className="space-y-4">
                  {sign.handPositions.map((pos, idx) => (
                    <div key={idx} className="text-center">
                      <div className="text-5xl mb-2">{pos.emoji}</div>
                      <p className="font-bold text-gray-900 text-sm">{pos.label}</p>
                      <p className="text-gray-600 text-xs mt-1">{pos.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tips for This Sign */}
              <div className="bg-accent-50 rounded-xl p-6 border border-accent-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">💡 Tips for This Sign</h3>
                <div className="space-y-3">
                  {sign.tips.map((tip, idx) => (
                    <div
                      key={idx}
                      className="cursor-pointer p-3 bg-white rounded-lg border border-accent-100 hover:border-accent-300 transition-all"
                      onClick={() => setExpandedTip(expandedTip === idx ? null : idx)}
                    >
                      <p className="text-sm font-semibold text-gray-900 flex items-start gap-2">
                        <span className="text-accent-600 text-lg">•</span>
                        <span>{tip}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Difficulty Level */}
              <div className="bg-primary-50 rounded-xl p-6 border border-primary-200">
                <h3 className="font-bold text-gray-900 mb-3">📊 Sign Level</h3>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {[1, 2, 3].map((star) => (
                      <span key={star} className="text-2xl">⭐</span>
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-primary-700">Beginner</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Practice Section */}
        <div className="mt-16 bg-gradient-to-r from-primary-100 to-accent-100 rounded-xl p-8 border-2 border-primary-200">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Ready to Practice?</h3>
            <p className="text-gray-700 mb-6">
              Practice this sign repeatedly to build muscle memory and fluency
            </p>
            <AccessibleButton
              variant="primary"
              onClick={() => navigate('/learn')}
              className="inline-block"
            >
              ▶️ Go to Practice Lessons
            </AccessibleButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignLearning;
