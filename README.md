# K-Pop Time Telling Trainer

A vibrant, high-energy single-page React app for teaching time-telling to kids, themed around "K-Pop Demon Hunters."

## Features

- **Two Game Paths**: Analogue Academy and Digital Domain
- **4 Difficulty Levels**: Recruit, Spark, Guardian, and Elite Master
- **Battle-Style Feedback**: Animated responses for correct/wrong answers
- **Thematic Rewards**: K-Pop inspired rewards based on performance
- **Beautiful UI**: Dark backgrounds with neon accents and glowing effects

## Tech Stack

- React 18
- React Router DOM
- Tailwind CSS
- Lucide React (icons)
- Vite (build tool)

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

## Netlify Deployment

The app includes a `public/_redirects` file for Netlify SPA routing. This ensures that all routes redirect to `index.html` to prevent 404 errors on page refresh.

### Deployment Steps

1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. The `_redirects` file will be automatically included in the build

The `_redirects` file contains:
```
/* /index.html 200
```

This tells Netlify to serve `index.html` for all routes, allowing React Router to handle client-side routing.

## Project Structure

```
src/
  App.jsx              # Main app with React Router
  components/
    LandingPage.jsx    # Path selection screen
    GameScreen.jsx     # Main game component
    AnalogueClock.jsx  # SVG analogue clock
    DigitalClock.jsx   # Digital time display
    ResultsScreen.jsx  # Results and rewards
  utils/
    timeGenerator.js   # Question generation
    timeFormatter.js   # Time to spoken format
  index.css            # Tailwind styles
```

## Game Levels

1. **Recruit**: O'clock times only
2. **Spark**: Quarter past, half past, quarter to
3. **Guardian**: Multiples of 5 minutes
4. **Elite Master**: Specific minutes (any value)

## Rewards

- **100%**: Gold K-Pop Trophy + "LEGENDARY HUNTER STATUS!"
- **90-99%**: Golden Microphone + "ELITE IDOL STATUS!"
- **75-89%**: K-Pop Lightstick + "TRAINEE GRADUATE!"
- **<75%**: Encouragement message
