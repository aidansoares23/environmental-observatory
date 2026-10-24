/*
- Accept a plain object containing date and temperature.
- Reuse your two existing parser functions through imports.
- Return a new object containing the normalized date and numeric temperatureC.
- Return null if the input or either field is invalid.
- Do not mutate the input object.
- Intentionally tolerates extra input properties, but only returns date and temperatureC.
*/

import { parseTemperature } from "./parseTemperature.js";
import { parseObservationDate } from "./parseObservationDate.js";

export function normalizeObservation(raw) {
  // reject input that is null, doesn't have 'object' type, or is an array
  if (raw === null || typeof raw !== "object" || Array.isArray(raw)) {
    return null;
  }

  // validate date and temperature with helper functions
  // any failure returns null
  const validObservationDate = parseObservationDate(raw.date);
  const validTemperature = parseTemperature(raw.temperature);

  if (validObservationDate === null || validTemperature === null) {
    return null;
  }

  const observation = {
    date: validObservationDate,
    temperatureC: validTemperature,
  };

  return observation;
}
