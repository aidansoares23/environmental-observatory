/*
1. Accepts only strings
2. Requires exact YYYY-MM-DD format
3. Reject impossible calendar dates, including invalid leap days
4. Return the original date string if valid
5. Returns null otherwise
*/
export function parseObservationDate(raw) {
  // Validate input type, eg is string?
  if (typeof raw !== "string") {
    return null;
  }
  // Validate the proper format
  const pattern = /^\d{4}-\d{2}-\d{2}$/;
  if (!pattern.test(raw)) {
    return null;
  }
  // Validate actual calendar date? How? Why?
  const date = new Date(raw);
  // .getTime() returns a numeric timestamp, or NaN if date is invalid
  // easy invalid date check validation
  if (Number.isNaN(date.getTime())) {
    return null;
  }
  // Extract formatted date: 'YYYY-MM-DD', first 10 chars
  const formattedDate = date.toISOString().slice(0, 10);
  if (formattedDate !== raw) {
    return null;
  }
  return raw;
}

parseObservationDate("2026-10-23");
