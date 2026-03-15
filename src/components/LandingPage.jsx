import { useNavigate } from 'react-router-dom';
import { Sparkles, Star } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  const handlePathSelect = (mode) => {
    navigate(`/game/${mode}`, { state: { mode, level: 1, questionIndex: 0, scores: [] } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-bg via-dark-purple to-dark-bg flex flex-col items-center justify-center relative overflow-hidden">
      {/* Decorative sparkles and stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute animate-sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          >
            <Sparkles
              size={20 + Math.random() * 15}
              className="text-neon-pink opacity-60"
            />
          </div>
        ))}
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          >
            <Star
              size={15 + Math.random() * 10}
              className="text-neon-blue opacity-40 fill-neon-blue"
            />
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-4">
        {/* Title */}
        <h1 className="text-6xl md:text-8xl font-bold mb-4 text-glow-pink animate-glow-pulse">
          K-POP DEMON HUNTERS
        </h1>
        <h2 className="text-3xl md:text-4xl font-semibold mb-12 text-glow-blue">
          Time Telling Trainer
        </h2>

        {/* Path selection buttons */}
        <div className="flex flex-col md:flex-row gap-8 items-center justify-center mt-16">
          {/* Analogue Academy */}
          <button
            onClick={() => handlePathSelect('analogue')}
            className="group relative w-80 h-80 md:w-96 md:h-96 bg-gradient-to-br from-dark-purple to-dark-bg border-4 border-neon-blue rounded-3xl shadow-neon-blue hover:shadow-[0_0_40px_rgba(0,240,255,0.8)] transition-all duration-300 hover:scale-105 flex flex-col items-center justify-center gap-6"
          >
            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-neon-blue opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-300"></div>
            
            {/* Clock icon */}
            <div className="relative z-10">
              <svg
                width="120"
                height="120"
                viewBox="0 0 120 120"
                className="text-neon-blue drop-shadow-[0_0_20px_rgba(0,240,255,0.8)]"
              >
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                {/* Hour markers */}
                {[12, 3, 6, 9].map((num, i) => {
                  const angle = (i * 90 - 90) * (Math.PI / 180);
                  const x1 = 60 + 40 * Math.cos(angle);
                  const y1 = 60 + 40 * Math.sin(angle);
                  const x2 = 60 + 50 * Math.cos(angle);
                  const y2 = 60 + 50 * Math.sin(angle);
                  return (
                    <line
                      key={num}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="currentColor"
                      strokeWidth="3"
                    />
                  );
                })}
                {/* Hands pointing to 3 o'clock */}
                <line
                  x1="60"
                  y1="60"
                  x2="85"
                  y2="60"
                  stroke="#ff00ff"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <line
                  x1="60"
                  y1="60"
                  x2="60"
                  y2="40"
                  stroke="#00ff88"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <circle cx="60" cy="60" r="6" fill="#b400ff" />
              </svg>
            </div>
            
            {/* Button text */}
            <div className="relative z-10">
              <h3 className="text-4xl font-bold text-glow-blue mb-2">Analogue Academy</h3>
              <p className="text-xl text-neon-blue opacity-80">Master the classic clock</p>
            </div>
          </button>

          {/* Digital Domain */}
          <button
            onClick={() => handlePathSelect('digital')}
            className="group relative w-80 h-80 md:w-96 md:h-96 bg-gradient-to-br from-dark-purple to-dark-bg border-4 border-neon-pink rounded-3xl shadow-neon-pink hover:shadow-[0_0_40px_rgba(255,0,255,0.8)] transition-all duration-300 hover:scale-105 flex flex-col items-center justify-center gap-6"
          >
            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-neon-pink opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-300"></div>
            
            {/* Digital display icon */}
            <div className="relative z-10">
              <div className="bg-dark-bg border-4 border-neon-pink rounded-xl px-8 py-6 shadow-neon-pink">
                <div className="flex items-center gap-2">
                  <span className="text-6xl font-bold text-neon-pink text-glow-pink font-mono">12</span>
                  <span className="text-6xl font-bold text-neon-green text-glow-green animate-pulse">:</span>
                  <span className="text-6xl font-bold text-neon-blue text-glow-blue font-mono">00</span>
                </div>
              </div>
            </div>
            
            {/* Button text */}
            <div className="relative z-10">
              <h3 className="text-4xl font-bold text-glow-pink mb-2">Digital Domain</h3>
              <p className="text-xl text-neon-pink opacity-80">Conquer the numbers</p>
            </div>
          </button>
        </div>

        {/* Subtitle */}
        <p className="mt-16 text-xl text-neon-purple opacity-70 text-glow-purple">
          Choose your path and banish the Time Imps! ✨
        </p>
      </div>
    </div>
  );
}
