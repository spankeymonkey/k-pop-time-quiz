import { formatTimeToSpoken } from './timeFormatter.js';

/**
 * Generates a random time based on the level difficulty
 * @param {number} level - Level number (1-4)
 * @returns {string} - Time in HH:MM format
 */
function generateTimeForLevel(level) {
  const hour = Math.floor(Math.random() * 12); // 0-11 for 12-hour format
  let minutes = 0;
  
  switch (level) {
    case 1:
      // Level 1: O'clock only
      minutes = 0;
      break;
      
    case 2:
      // Level 2: Quarter past, half past, quarter to
      const quarterOptions = [15, 30, 45];
      minutes = quarterOptions[Math.floor(Math.random() * quarterOptions.length)];
      break;
      
    case 3:
      // Level 3: Multiples of 5 (excluding 0, 15, 30, 45 which are covered in level 2)
      const multiplesOf5 = [5, 10, 20, 25, 35, 40, 50, 55];
      minutes = multiplesOf5[Math.floor(Math.random() * multiplesOf5.length)];
      break;
      
    case 4:
      // Level 4: Any specific minutes
      minutes = Math.floor(Math.random() * 60);
      // Avoid exact quarters to keep it distinct from level 2
      if ([0, 15, 30, 45].includes(minutes)) {
        minutes = Math.floor(Math.random() * 60);
      }
      break;
      
    default:
      minutes = 0;
  }
  
  // Format as HH:MM with leading zeros
  const hours24 = hour === 0 ? 12 : hour; // For display, use 12-hour format but store as 24-hour
  // Actually, let's use 24-hour format internally but display in 12-hour
  return `${String(hour).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

/**
 * Generates a question with correct answer and 3 wrong answers
 * @param {number} level - Level number (1-4)
 * @returns {Object} - Question object with time, correct answer, and all options
 */
export function generateQuestion(level) {
  // Generate correct time
  const correctTime = generateTimeForLevel(level);
  const correctAnswer = formatTimeToSpoken(correctTime);
  
  // Generate 3 wrong answers using the same level rules
  const wrongAnswers = new Set();
  while (wrongAnswers.size < 3) {
    const wrongTime = generateTimeForLevel(level);
    const wrongAnswer = formatTimeToSpoken(wrongTime);
    // Make sure wrong answer is different from correct answer
    if (wrongAnswer !== correctAnswer) {
      wrongAnswers.add(wrongAnswer);
    }
  }
  
  // Combine and shuffle
  const allAnswers = [correctAnswer, ...Array.from(wrongAnswers)];
  shuffleArray(allAnswers);
  
  // Find the index of the correct answer after shuffling
  const correctIndex = allAnswers.indexOf(correctAnswer);
  
  return {
    time: correctTime,
    correctAnswer,
    options: allAnswers,
    correctIndex,
  };
}

/**
 * Shuffles an array in place using Fisher-Yates algorithm
 * @param {Array} array - Array to shuffle
 */
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

/**
 * Converts 12-hour format time to 24-hour format for display
 * @param {string} time - Time in HH:MM format (0-11 hours)
 * @returns {string} - Time in HH:MM format (00-23 hours)
 */
export function convertTo24Hour(time) {
  const [hours, minutes] = time.split(':').map(Number);
  // For display purposes, we'll use 12-hour format
  // But we need to handle the conversion properly
  // Actually, let's keep it simple - use the hour as-is for 12-hour display
  const displayHour = hours === 0 ? 12 : hours;
  return `${String(displayHour).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

/**
 * Gets the hour and minute values from a time string
 * @param {string} time - Time in HH:MM format
 * @returns {Object} - { hour, minute } in 12-hour format
 */
export function parseTime(time) {
  const [hours, minutes] = time.split(':').map(Number);
  const hour12 = hours === 0 ? 12 : hours;
  return { hour: hour12, minute: minutes };
}
