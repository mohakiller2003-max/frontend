export type CallWindowVariant = 'withinHours' | 'beforeHours' | 'afterHours';

const OPEN_HOUR = 9;
const CLOSE_HOUR = 21;

function getUAEHour(date: Date): number {
  const hour = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Dubai',
    hour: 'numeric',
    hour12: false,
  }).format(date);
  return parseInt(hour, 10);
}

export function getCallWindowVariant(now = new Date()): CallWindowVariant {
  const hour = getUAEHour(now);
  if (hour >= OPEN_HOUR && hour < CLOSE_HOUR) return 'withinHours';
  if (hour < OPEN_HOUR) return 'beforeHours';
  return 'afterHours';
}
