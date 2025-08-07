import { formatInTimeZone } from 'date-fns-tz/formatInTimeZone';

export const CENTRAL_TZ = 'America/Chicago';

// Returns the Sunday (start) and Saturday (end) for the week of the given date in Central Time
export function getCentralWeekDates(referenceDate?: Date) {
  const now = referenceDate ?? new Date();

  // Extract Central Time components safely
  const year = Number(formatInTimeZone(now, CENTRAL_TZ, 'yyyy'));
  const month = Number(formatInTimeZone(now, CENTRAL_TZ, 'MM')); // 1-12
  const day = Number(formatInTimeZone(now, CENTRAL_TZ, 'dd'));
  const weekdayName = formatInTimeZone(now, CENTRAL_TZ, 'eeee'); // Sunday..Saturday
  const weekdayIndex = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'].indexOf(weekdayName);

  // Build UTC dates for Sunday/Saturday based on Central calendar day math
  const sundayUTC = new Date(Date.UTC(year, month - 1, day - weekdayIndex));
  const saturdayUTC = new Date(Date.UTC(year, month - 1, day - weekdayIndex + 6));

  return {
    start: formatInTimeZone(sundayUTC, CENTRAL_TZ, 'yyyy-MM-dd'),
    end: formatInTimeZone(saturdayUTC, CENTRAL_TZ, 'yyyy-MM-dd'),
  };
}

// Returns today's date in Central Time as YYYY-MM-DD
export function centralDateString(date?: Date) {
  return formatInTimeZone(date ?? new Date(), CENTRAL_TZ, 'yyyy-MM-dd');
}

// Formats a date in Central Time using the provided pattern
export function formatCentralDate(input: Date | string, pattern = 'MMM d, yyyy') {
  const date = typeof input === 'string' ? new Date(input) : input;
  return formatInTimeZone(date, CENTRAL_TZ, pattern);
}
