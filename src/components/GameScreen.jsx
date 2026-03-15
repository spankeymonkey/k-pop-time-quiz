import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { generateQuestion } from '../utils/timeGenerator.js';
import AnalogueClock from './AnalogueClock.jsx';
import DigitalClock from './DigitalClock.jsx';
import { Sparkles, Ghost } from 'lucide-react';

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
  const [answerResults, setAnswerResults] = useState(Array(10).fill(null)); // Track correct/incorrect for each question

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

  // Reset answer results when starting a new level
  useEffect(() => {
    if (questionIndex === 0) {
      setAnswerResults(Array(10).fill(null));
      setScore(0);
    }
  }, [level]);

  const handleAnswerSelect = (answerIndex) => {
    const isCorrect = answerIndex === currentQuestion.correctIndex;
    
    // If feedback is already 'wrong', only allow clicking the correct answer
    if (feedback === 'wrong') {
      if (!isCorrect) return; // Ignore clicks on wrong answers
      // User clicked the correct answer after a wrong selection
      setSelectedAnswer(answerIndex);
      setFeedback('correct');
      setScore(score); // Don't increment score, already marked as wrong
      setShowSparkles(true);
      setTimeout(() => setShowSparkles(false), 2000);
      
      // Advance after clicking correct answer
      setTimeout(() => {
        advanceToNext();
      }, 1500);
      return;
    }
    
    // First selection - prevent multiple selections if already correct
    if (feedback === 'correct') return;

    setSelectedAnswer(answerIndex);
    setFeedback(isCorrect ? 'correct' : 'wrong');

    const newScore = isCorrect ? score + 1 : score;

    // Update answer results for visual tracking
    const newAnswerResults = [...answerResults];
    newAnswerResults[questionIndex] = isCorrect ? 'correct' : 'wrong';
    setAnswerResults(newAnswerResults);

    if (isCorrect) {
      setScore(newScore);
      setShowSparkles(true);
      setTimeout(() => setShowSparkles(false), 2000);
      
      // Auto-advance only for correct answers
      setTimeout(() => {
        advanceToNext(newScore);
      }, 1500);
    } else {
      // Wrong answer - don't advance, wait for user to click correct answer
      setScore(newScore);
    }
  };

  const advanceToNext = (finalScore = null) => {
    const scoreToUse = finalScore !== null ? finalScore : score;
    
    if (questionIndex < 9) {
      // Move to next question
      setQuestionIndex(questionIndex + 1);
    } else {
      // Level complete
      const levelScore = scoreToUse;
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
  };

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="text-neon-blue text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-bg via-dark-purple to-dark-bg flex flex-col items-center justify-center p-6 relative overflow-hidden">
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

      {/* Header - all on one line */}
      <div className="absolute top-6 left-0 right-0 text-center z-10">
        <div className="text-2xl md:text-3xl font-bold text-glow-purple">
          {mode === 'analogue' ? 'Analogue Academy' : 'Digital Domain'} - Level {level} ({levelNames[level]})
        </div>
        
        {/* Demon icons progress tracker */}
        <div className="flex justify-center items-center gap-2 mt-4">
          {Array.from({ length: 10 }).map((_, i) => {
            const result = answerResults[i];
            let iconColor = 'text-gray-500'; // Grey for unanswered
            if (result === 'correct') {
              iconColor = 'text-neon-green drop-shadow-[0_0_8px_rgba(0,255,136,0.8)]';
            } else if (result === 'wrong') {
              iconColor = 'text-red-500 drop-shadow-[0_0_8px_rgba(255,0,0,0.8)]';
            }
            
            return (
              <Ghost
                key={i}
                size={28}
                className={iconColor}
                fill={result !== null ? 'currentColor' : 'none'}
              />
            );
          })}
        </div>
      </div>

      {/* Main game area */}
      <div className="flex flex-col items-center gap-8 md:gap-12 mt-32 mb-12">
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
            className={`text-3xl md:text-4xl font-bold text-center animate-${
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

        {/* Answer options - smaller buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 w-full max-w-3xl">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === currentQuestion.correctIndex;
            const showCorrect = feedback === 'wrong' && isCorrect;
            const isWrong = feedback === 'wrong' && isSelected && !isCorrect;
            
            // Determine if button should be disabled
            // If feedback is 'wrong', only the correct answer should be clickable
            // If feedback is 'correct', all buttons should be disabled
            const isDisabled = feedback === 'correct' || (feedback === 'wrong' && !isCorrect);

            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={isDisabled}
                className={`
                  relative px-6 py-4 md:px-8 md:py-5 rounded-xl text-lg md:text-xl font-semibold
                  transition-all duration-300
                  ${
                    showCorrect
                      ? 'bg-green-500/30 border-4 border-glow-green text-glow-green shadow-neon-green hover:shadow-[0_0_30px_rgba(0,255,136,0.8)] hover:scale-105'
                      : isWrong
                      ? 'bg-red-500/30 border-4 border-red-500 text-red-400'
                      : isSelected && feedback === 'correct'
                      ? 'bg-green-500/30 border-4 border-glow-green text-glow-green shadow-neon-green'
                      : 'bg-dark-purple/50 border-4 border-neon-blue text-neon-blue hover:border-glow-blue hover:shadow-neon-blue hover:scale-105'
                  }
                  ${isDisabled && !showCorrect ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}
                `}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>

      {/* Score display */}
      <div className="absolute bottom-6 left-0 right-0 text-center">
        <div className="text-lg md:text-xl text-neon-purple">
          Score: {score}/10
        </div>
      </div>
    </div>
  );
}
