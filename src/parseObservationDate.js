/*
1. Accepts only strings
2. Requires exact YYYY-MM-DD format
3. Reject impossible calendar dates, including invalid leap days
4. Return the original date string if valid, normalized
5. Returns null otherwise
*/

const yearPattern = /^\d{4}$/;
const componenetPattern = /^\d{1,2}$/;

export function parseObservationDate(raw) {
  // Validate input type, eg is string?
  if (typeof raw !== "string") {
    return null;
  }

  const parts = raw.split("-");
  if (parts.length !== 3) {
    return null;
  }
  const [year, month, day] = parts;

  if (
    !yearPattern.test(year) ||
    !componenetPattern.test(month) ||
    !componenetPattern.test(day)
  ) {
    return null;
  }

  const normalizedMonth = month.padStart(2, "0");
  const normalizedDay = day.padStart(2, "0");

  const normalized = `${year}-${normalizedMonth}-${normalizedDay}`;

  // Validate actual calendar date? How? Why?
  const date = new Date(normalized);
  // .getTime() returns a numeric timestamp, or NaN if date is invalid
  // easy invalid date check validation
  if (Number.isNaN(date.getTime())) {
    return null;
  }
  // Extract formatted date: 'YYYY-MM-DD', first 10 chars
  const formattedDate = date.toISOString().slice(0, 10);
  if (formattedDate !== normalized) {
    return null;
  }
  return normalized;
}
