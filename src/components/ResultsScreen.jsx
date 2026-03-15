import { useNavigate, useLocation } from 'react-router-dom';
import { Trophy, Mic, Sparkles } from 'lucide-react';

export default function ResultsScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    mode,
    level,
    levelScore,
    totalQuestions,
    scores,
    nextLevel,
    isFinal,
  } = location.state || {};

  if (!scores || scores.length === 0) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="text-neon-blue text-2xl">No results available</div>
      </div>
    );
  }

  const levelNames = {
    1: 'Recruit',
    2: 'Spark',
    3: 'Guardian',
    4: 'Elite Master',
  };

  // Calculate overall stats
  const totalScore = scores.reduce((sum, s) => sum + s.score, 0);
  const totalPossible = scores.reduce((sum, s) => sum + s.total, 0);
  const overallPercentage = Math.round((totalScore / totalPossible) * 100);

  // Determine reward
  const getReward = () => {
    if (overallPercentage === 100) {
      return {
        icon: Trophy,
        iconColor: 'text-yellow-400',
        glowColor: 'text-glow-blue',
        title: 'LEGENDARY HUNTER STATUS!',
        message: '🏆 GOLD K-POP TROPHY 🏆',
        bgGlow: 'bg-yellow-400/20',
      };
    } else if (overallPercentage >= 90) {
      return {
        icon: Mic,
        iconColor: 'text-yellow-400',
        glowColor: 'text-glow-pink',
        title: 'ELITE IDOL STATUS!',
        message: '🎤 GOLDEN MICROPHONE 🎤',
        bgGlow: 'bg-yellow-400/20',
      };
    } else if (overallPercentage >= 75) {
      return {
        icon: Sparkles,
        iconColor: 'text-neon-purple',
        glowColor: 'text-glow-purple',
        title: 'TRAINEE GRADUATE!',
        message: '🌟 K-POP LIGHTSTICK 🌟',
        bgGlow: 'bg-neon-purple/20',
      };
    } else {
      return {
        icon: null,
        iconColor: '',
        glowColor: 'text-glow-blue',
        title: 'Keep training, Trainee!',
        message: 'The Academy needs you! ✨',
        bgGlow: 'bg-neon-blue/10',
      };
    }
  };

  const reward = getReward();
  const RewardIcon = reward.icon;

  const handleNextLevel = () => {
    navigate(`/game/${mode}`, {
      state: {
        mode,
        level: nextLevel,
        questionIndex: 0,
        scores,
      },
    });
  };

  const handleRetry = () => {
    navigate(`/game/${mode}`, {
      state: {
        mode,
        level,
        questionIndex: 0,
        scores: scores.slice(0, -1), // Remove current level score
      },
    });
  };

  const handleReturnHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-bg via-dark-purple to-dark-bg flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative sparkles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <Sparkles
            key={i}
            size={20 + Math.random() * 15}
            className="text-neon-pink opacity-40 absolute animate-sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-4xl">
        {/* Level completion header */}
        {!isFinal && (
          <div className="text-center mb-8">
            <h2 className="text-5xl font-bold text-glow-green mb-4">
              Level {level} Complete!
            </h2>
            <div className="text-2xl text-neon-blue">
              {levelNames[level]} - Score: {levelScore}/{totalQuestions} ({Math.round((levelScore / totalQuestions) * 100)}%)
            </div>
          </div>
        )}

        {/* Final summary */}
        {isFinal && (
          <div className="text-center mb-12">
            <h2 className="text-6xl font-bold text-glow-pink mb-4 animate-glow-pulse">
              HUNTER SUMMARY
            </h2>
            
            {/* Score breakdown */}
            <div className="bg-dark-purple/50 border-4 border-neon-blue rounded-2xl p-8 mb-8 shadow-neon-blue">
              <h3 className="text-3xl font-bold text-glow-blue mb-6">Level Breakdown</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {scores.map((scoreData, index) => (
                  <div
                    key={index}
                    className="bg-dark-bg/50 border-2 border-neon-purple rounded-xl p-4"
                  >
                    <div className="text-xl font-semibold text-neon-purple mb-2">
                      Level {scoreData.level} - {levelNames[scoreData.level]}
                    </div>
                    <div className="text-2xl font-bold text-glow-green">
                      {scoreData.score}/{scoreData.total} ({Math.round((scoreData.score / scoreData.total) * 100)}%)
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-4xl font-bold text-glow-pink mt-6 pt-6 border-t-2 border-neon-blue">
                Overall: {totalScore}/{totalPossible} ({overallPercentage}%)
              </div>
            </div>

            {/* Reward display */}
            <div className={`${reward.bgGlow} border-4 border-neon-purple rounded-3xl p-12 mb-8 shadow-neon-purple`}>
              {RewardIcon && (
                <div className="flex justify-center mb-6">
                  <RewardIcon
                    size={120}
                    className={`${reward.iconColor} ${reward.glowColor} animate-glow-pulse`}
                  />
                </div>
              )}
              <div className={`text-5xl font-bold ${reward.glowColor} mb-4`}>
                {reward.message}
              </div>
              <div className={`text-4xl font-bold ${reward.glowColor}`}>
                {reward.title}
              </div>
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          {!isFinal && nextLevel && (
            <button
              onClick={handleNextLevel}
              className="px-8 py-4 bg-dark-purple border-4 border-neon-green rounded-xl text-2xl font-bold text-glow-green hover:shadow-neon-green hover:scale-105 transition-all duration-300"
            >
              Next Level →
            </button>
          )}
          
          {!isFinal && (
            <button
              onClick={handleRetry}
              className="px-8 py-4 bg-dark-purple border-4 border-neon-blue rounded-xl text-2xl font-bold text-glow-blue hover:shadow-neon-blue hover:scale-105 transition-all duration-300"
            >
              Retry Level
            </button>
          )}

          <button
            onClick={handleReturnHome}
            className="px-8 py-4 bg-dark-purple border-4 border-neon-pink rounded-xl text-2xl font-bold text-glow-pink hover:shadow-neon-pink hover:scale-105 transition-all duration-300"
          >
            Return to Academy
          </button>
        </div>
      </div>
    </div>
  );
}
