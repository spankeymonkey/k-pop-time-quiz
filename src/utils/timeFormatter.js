/**
 * Converts a time (HH:MM format) to spoken English format
 * @param {string} time - Time in HH:MM format (e.g., "14:30")
 * @returns {string} - Spoken time format (e.g., "It's half past two")
 */
export function formatTimeToSpoken(time) {
  const [hours, minutes] = time.split(':').map(Number);
  const hour12 = hours % 12 || 12;
  const hourName = getHourName(hour12);
  
  if (minutes === 0) {
    return `It's ${hourName} o'clock`;
  }
  
  if (minutes === 15) {
    return `It's quarter past ${hourName}`;
  }
  
  if (minutes === 30) {
    return `It's half past ${hourName}`;
  }
  
  if (minutes === 45) {
    const nextHour = (hours + 1) % 24;
    const nextHour12 = nextHour % 12 || 12;
    const nextHourName = getHourName(nextHour12);
    return `It's quarter to ${nextHourName}`;
  }
  
  if (minutes < 30) {
    const minuteWord = minutes === 1 ? 'minute' : 'minutes';
    return `It's ${minutes} ${minuteWord} past ${hourName}`;
  }
  
  // minutes > 30
  const minutesTo = 60 - minutes;
  const nextHour = (hours + 1) % 24;
  const nextHour12 = nextHour % 12 || 12;
  const nextHourName = getHourName(nextHour12);
  const minuteWord = minutesTo === 1 ? 'minute' : 'minutes';
  return `It's ${minutesTo} ${minuteWord} to ${nextHourName}`;
}

/**
 * Gets the spoken name for an hour (1-12)
 * @param {number} hour - Hour in 12-hour format (1-12)
 * @returns {string} - Spoken hour name
 */
function getHourName(hour) {
  const hourNames = {
    1: 'one', 2: 'two', 3: 'three', 4: 'four',
    5: 'five', 6: 'six', 7: 'seven', 8: 'eight',
    9: 'nine', 10: 'ten', 11: 'eleven', 12: 'twelve'
  };
  return hourNames[hour];
}
