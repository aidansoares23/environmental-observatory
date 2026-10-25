import { normalizeObservation } from "./normalizeObservation.js";

export function processBatch(rawObservations) {
  // 1. Reject non-array input
  if (!Array.isArray(rawObservations)) {
    return null;
  }

  const accepted = [];
  const rejected = [];

  // 2. Iterate over rawObservations
  //    with access to index and observation
  for (const [index, raw] of rawObservations.entries()) {
    // 3. Call normalizeObservation()
    const currentObservation = normalizeObservation(raw);
    // 4. Push into the appropriate array
    if (currentObservation === null) {
      rejected.push({ index, raw });
    } else {
      accepted.push(currentObservation);
    }
  }
  // 5. Return both arrays
  return { accepted, rejected };
}
