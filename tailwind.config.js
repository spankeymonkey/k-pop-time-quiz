/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-blue': '#00f0ff',
        'neon-pink': '#ff00ff',
        'neon-green': '#00ff88',
        'neon-purple': '#b400ff',
        'dark-bg': '#0a0a1a',
        'dark-purple': '#1a0a2e',
      },
      boxShadow: {
        'neon-blue': '0 0 10px #00f0ff, 0 0 20px #00f0ff, 0 0 30px #00f0ff',
        'neon-pink': '0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 30px #ff00ff',
        'neon-green': '0 0 10px #00ff88, 0 0 20px #00ff88, 0 0 30px #00ff88',
        'neon-purple': '0 0 10px #b400ff, 0 0 20px #b400ff, 0 0 30px #b400ff',
        'glow': '0 0 20px rgba(0, 240, 255, 0.5), 0 0 40px rgba(0, 240, 255, 0.3)',
      },
      animation: {
        'sparkle': 'sparkle 2s ease-in-out infinite',
        'flash-green': 'flashGreen 0.5s ease-in-out',
        'flash-red': 'flashRed 0.5s ease-in-out',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        sparkle: {
          '0%, 100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
          '50%': { transform: 'scale(1.2) rotate(180deg)', opacity: '0.8' },
        },
        flashGreen: {
          '0%, 100%': { backgroundColor: 'transparent', boxShadow: 'none' },
          '50%': { backgroundColor: 'rgba(0, 255, 136, 0.3)', boxShadow: '0 0 20px #00ff88' },
        },
        flashRed: {
          '0%, 100%': { backgroundColor: 'transparent', boxShadow: 'none' },
          '50%': { backgroundColor: 'rgba(255, 0, 0, 0.3)', boxShadow: '0 0 20px #ff0000' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(0, 240, 255, 0.5)' },
          '50%': { boxShadow: '0 0 30px rgba(0, 240, 255, 0.8)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
