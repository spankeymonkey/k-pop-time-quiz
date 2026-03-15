import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { generateQuestion } from '../utils/timeGenerator.js';
import AnalogueClock from './AnalogueClock.jsx';
import DigitalClock from './DigitalClock.jsx';
import { Sparkles } from 'lucide-react';

export default function GameScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const { mode, level: initialLevel, questionIndex: initialQuestionIndex, scores: initialScores } = location.state || {
    mode: 'analogue',
    level: 1,
    questionIndex: 0,
    scores: [],
  };

  const [level, setLevel] = useState(initialLevel);
  const [questionIndex, setQuestionIndex] = useState(initialQuestionIndex);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [scores, setScores] = useState(initialScores);
  const [showSparkles, setShowSparkles] = useState(false);

  const levelNames = {
    1: 'Recruit',
    2: 'Spark',
    3: 'Guardian',
    4: 'Elite Master',
  };

  useEffect(() => {
    // Generate new question when level or question index changes
    const question = generateQuestion(level);
    setCurrentQuestion(question);
    setSelectedAnswer(null);
    setFeedback(null);
    setShowSparkles(false);
  }, [level, questionIndex]);

  const handleAnswerSelect = (answerIndex) => {
    if (feedback !== null) return; // Prevent multiple selections

    const isCorrect = answerIndex === currentQuestion.correctIndex;
    setSelectedAnswer(answerIndex);
    setFeedback(isCorrect ? 'correct' : 'wrong');

    const newScore = isCorrect ? score + 1 : score;

    if (isCorrect) {
      setScore(newScore);
      setShowSparkles(true);
      setTimeout(() => setShowSparkles(false), 2000);
    } else {
      // Update score even if wrong (to keep it consistent)
      setScore(newScore);
    }

    // Auto-advance after feedback (for both correct and wrong answers)
    setTimeout(() => {
      if (questionIndex < 9) {
        // Move to next question
        setQuestionIndex(questionIndex + 1);
      } else {
        // Level complete - use the calculated newScore
        const levelScore = newScore;
        const newScores = [...scores, { level, score: levelScore, total: 10 }];
        setScores(newScores);
        
        if (level < 4) {
          // Move to next level
          navigate('/results', {
            state: {
              mode,
              level,
              levelScore,
              totalQuestions: 10,
              scores: newScores,
              nextLevel: level + 1,
            },
          });
        } else {
          // All levels complete
          navigate('/results', {
            state: {
              mode,
              level: 4,
              levelScore: levelScore,
              totalQuestions: 10,
              scores: newScores,
              isFinal: true,
            },
          });
        }
      }
    }, isCorrect ? 1500 : 2000);
  };

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="text-neon-blue text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-bg via-dark-purple to-dark-bg flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Sparkle animation overlay */}
      {showSparkles && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          {Array.from({ length: 20 }).map((_, i) => (
            <Sparkles
              key={i}
              size={30 + Math.random() * 20}
              className="text-neon-green animate-sparkle absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 0.5}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Header */}
      <div className="absolute top-8 left-0 right-0 text-center z-10">
        <h2 className="text-3xl font-bold text-glow-purple mb-2">
          {mode === 'analogue' ? 'Analogue Academy' : 'Digital Domain'}
        </h2>
        <div className="text-xl text-neon-blue">
          Level {level} - {levelNames[level]}
        </div>
        <div className="text-lg text-neon-pink mt-2">
          Imp {questionIndex + 1}/10
        </div>
      </div>

      {/* Main game area */}
      <div className="flex flex-col items-center gap-12 mt-24 mb-8">
        {/* Clock display */}
        <div className="relative">
          {mode === 'analogue' ? (
            <AnalogueClock time={currentQuestion.time} />
          ) : (
            <DigitalClock time={currentQuestion.time} />
          )}
        </div>

        {/* Feedback message */}
        {feedback && (
          <div
            className={`text-4xl font-bold text-center animate-${
              feedback === 'correct' ? 'flash-green' : 'flash-red'
            }`}
          >
            {feedback === 'correct' ? (
              <span className="text-glow-green">DEMON BANISHED! ✨</span>
            ) : (
              <span className="text-red-500">TRY AGAIN, HUNTER!</span>
            )}
          </div>
        )}

        {/* Answer options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === currentQuestion.correctIndex;
            const showCorrect = feedback === 'wrong' && isCorrect;
            const isWrong = feedback === 'wrong' && isSelected && !isCorrect;

            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={feedback !== null}
                className={`
                  relative px-8 py-6 rounded-2xl text-xl font-semibold
                  transition-all duration-300
                  ${
                    showCorrect
                      ? 'bg-green-500/30 border-4 border-glow-green text-glow-green shadow-neon-green animate-flash-green'
                      : isWrong
                      ? 'bg-red-500/30 border-4 border-red-500 text-red-400 animate-flash-red'
                      : isSelected && feedback === 'correct'
                      ? 'bg-green-500/30 border-4 border-glow-green text-glow-green shadow-neon-green animate-flash-green'
                      : 'bg-dark-purple/50 border-4 border-neon-blue text-neon-blue hover:border-glow-blue hover:shadow-neon-blue hover:scale-105'
                  }
                  ${feedback !== null ? 'cursor-not-allowed' : 'cursor-pointer'}
                `}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>

      {/* Score display */}
      <div className="absolute bottom-8 left-0 right-0 text-center">
        <div className="text-lg text-neon-purple">
          Score: {score}/10
        </div>
      </div>
    </div>
  );
}
