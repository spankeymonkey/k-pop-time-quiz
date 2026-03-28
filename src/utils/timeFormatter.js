/**
 * Converts a time (HH:MM format) to spoken English format
 * @param {string} time - Time in HH:MM format (e.g., "14:30")
 * @returns {string} - Spoken time phrase (e.g., "Half past two")
 */
export function formatTimeToSpoken(time) {
  const [hours, minutes] = time.split(':').map(Number);
  const hour12 = hours % 12 || 12;
  const hourName = getHourName(hour12);

  let phrase;
  if (minutes === 0) {
    phrase = `${hourName} o'clock`;
  } else if (minutes === 15) {
    phrase = `quarter past ${hourName}`;
  } else if (minutes === 30) {
    phrase = `half past ${hourName}`;
  } else if (minutes === 45) {
    const nextHour = (hours + 1) % 24;
    const nextHour12 = nextHour % 12 || 12;
    const nextHourName = getHourName(nextHour12);
    phrase = `quarter to ${nextHourName}`;
  } else if (minutes < 30) {
    const minuteWord = minutes === 1 ? 'minute' : 'minutes';
    phrase = `${minutes} ${minuteWord} past ${hourName}`;
  } else {
    const minutesTo = 60 - minutes;
    const nextHour = (hours + 1) % 24;
    const nextHour12 = nextHour % 12 || 12;
    const nextHourName = getHourName(nextHour12);
    const minuteWord = minutesTo === 1 ? 'minute' : 'minutes';
    phrase = `${minutesTo} ${minuteWord} to ${nextHourName}`;
  }

  return phrase.charAt(0).toUpperCase() + phrase.slice(1);
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
