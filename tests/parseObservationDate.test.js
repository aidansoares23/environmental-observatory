import test from "node:test";
import assert from "node:assert/strict";
import { parseObservationDate } from "../src/parseObservationDate.js";

test("accepts string date", () => {
  const result = parseObservationDate("2026-10-23");
  assert.equal(result, "2026-10-23");
});

test("accepts valid date on leap year", () => {
  const result = parseObservationDate("2024-02-29");
  assert.equal(result, "2024-02-29");
});

test("rejects invalid leap year", () => {
  const result = parseObservationDate("2025-02-29");
  assert.equal(result, null);
});

test("rejects impossible day", () => {
  const result = parseObservationDate("2024-02-30");
  assert.equal(result, null);
});

test("rejects impossible month", () => {
  const result = parseObservationDate("2024-13-29");
  assert.equal(result, null);
});

test("rejects wrong data type", () => {
  const result = parseObservationDate(null);
  assert.equal(result, null);
});
