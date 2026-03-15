import { parseTime } from '../utils/timeGenerator.js';

/**
 * DigitalClock component - displays a neon-style digital time display
 * @param {string} time - Time in HH:MM format
 */
export default function DigitalClock({ time }) {
  const { hour, minute } = parseTime(time);
  
  // Format with leading zeros
  const hourStr = String(hour).padStart(2, '0');
  const minuteStr = String(minute).padStart(2, '0');
  
  return (
    <div className="flex justify-center items-center">
      <div className="relative">
        {/* Glowing background effect */}
        <div className="absolute inset-0 bg-neon-blue opacity-20 blur-2xl rounded-lg"></div>
        
        {/* Main display */}
        <div className="relative bg-dark-bg border-4 border-neon-blue rounded-2xl px-12 py-8 shadow-neon-blue">
          <div className="flex items-center justify-center gap-4">
            {/* Hour */}
            <div className="text-8xl font-bold text-neon-blue text-glow-blue font-mono">
              {hourStr}
            </div>
            
            {/* Colon separator with blinking animation */}
            <div className="text-8xl font-bold text-neon-pink text-glow-pink animate-pulse">
              :
            </div>
            
            {/* Minute */}
            <div className="text-8xl font-bold text-neon-green text-glow-green font-mono">
              {minuteStr}
            </div>
          </div>
        </div>
        
        {/* Additional glow effects */}
        <div className="absolute -inset-2 bg-neon-purple opacity-10 blur-xl rounded-lg -z-10"></div>
      </div>
    </div>
  );
}
