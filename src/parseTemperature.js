/*
Accepts numbers & numeric strings
Returns a number for valid input
Return null for missing, empty, or invalid input
Does not modify input
Handles 0 as a valid temperature
Fahrenheit or Celsius? Probably doesn't matter
*/
export function parseTemperature(raw) {
  if (typeof raw !== "string" && typeof raw !== "number") {
    return null;
  }

  if (typeof raw === "string" && !raw.trim()) {
    return null;
  }

  const converted = Number(raw);

  if (!Number.isFinite(converted)) {
    return null;
  }
  return converted;
}
