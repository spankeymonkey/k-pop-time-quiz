import { parseTime } from '../utils/timeGenerator.js';

/**
 * AnalogueClock component - displays an SVG analogue clock with neon styling
 * @param {string} time - Time in HH:MM format
 */
export default function AnalogueClock({ time }) {
  const { hour, minute } = parseTime(time);
  
  // Calculate angles for clock hands
  // Hour hand: (hour % 12) * 30 + minute * 0.5 degrees
  // Minute hand: minute * 6 degrees
  const hourAngle = ((hour % 12) * 30 + minute * 0.5) - 90; // -90 to start at 12 o'clock
  const minuteAngle = (minute * 6) - 90;
  
  const clockSize = 300;
  const center = clockSize / 2;
  const radius = clockSize / 2 - 20;
  
  // Hour hand length and width
  const hourHandLength = radius * 0.5;
  const hourHandWidth = 6;
  
  // Minute hand length and width
  const minuteHandLength = radius * 0.75;
  const minuteHandWidth = 4;
  
  // Calculate hand endpoints
  const hourHandX = center + hourHandLength * Math.cos((hourAngle * Math.PI) / 180);
  const hourHandY = center + hourHandLength * Math.sin((hourAngle * Math.PI) / 180);
  
  const minuteHandX = center + minuteHandLength * Math.cos((minuteAngle * Math.PI) / 180);
  const minuteHandY = center + minuteHandLength * Math.sin((minuteAngle * Math.PI) / 180);
  
  return (
    <div className="flex justify-center items-center">
      <svg
        width={clockSize}
        height={clockSize}
        className="drop-shadow-[0_0_20px_rgba(0,240,255,0.6)]"
      >
        {/* Clock face background */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="#0a0a1a"
          stroke="#00f0ff"
          strokeWidth="3"
          className="drop-shadow-[0_0_15px_rgba(0,240,255,0.8)]"
        />
        
        {/* Hour markers */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30 - 90) * (Math.PI / 180);
          const markerLength = i % 3 === 0 ? 15 : 8; // Longer markers for 12, 3, 6, 9
          const markerStartX = center + (radius - markerLength) * Math.cos(angle);
          const markerStartY = center + (radius - markerLength) * Math.sin(angle);
          const markerEndX = center + radius * Math.cos(angle);
          const markerEndY = center + radius * Math.sin(angle);
          
          return (
            <line
              key={i}
              x1={markerStartX}
              y1={markerStartY}
              x2={markerEndX}
              y2={markerEndY}
              stroke="#00f0ff"
              strokeWidth={i % 3 === 0 ? 3 : 2}
              className="drop-shadow-[0_0_5px_rgba(0,240,255,0.6)]"
            />
          );
        })}
        
        {/* Hour numbers */}
        {[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num, i) => {
          const angle = (i * 30 - 90) * (Math.PI / 180);
          const numberRadius = radius - 35;
          const x = center + numberRadius * Math.cos(angle);
          const y = center + numberRadius * Math.sin(angle);
          
          return (
            <text
              key={num}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#00f0ff"
              fontSize="20"
              fontWeight="bold"
              className="drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]"
            >
              {num}
            </text>
          );
        })}
        
        {/* Hour hand */}
        <line
          x1={center}
          y1={center}
          x2={hourHandX}
          y2={hourHandY}
          stroke="#ff00ff"
          strokeWidth={hourHandWidth}
          strokeLinecap="round"
          className="drop-shadow-[0_0_10px_rgba(255,0,255,0.8)]"
        />
        
        {/* Minute hand */}
        <line
          x1={center}
          y1={center}
          x2={minuteHandX}
          y2={minuteHandY}
          stroke="#00ff88"
          strokeWidth={minuteHandWidth}
          strokeLinecap="round"
          className="drop-shadow-[0_0_10px_rgba(0,255,136,0.8)]"
        />
        
        {/* Center dot */}
        <circle
          cx={center}
          cy={center}
          r="8"
          fill="#b400ff"
          className="drop-shadow-[0_0_15px_rgba(180,0,255,0.9)]"
        />
      </svg>
    </div>
  );
}
