import test from "node:test";
import assert from "node:assert/strict";
import { normalizeObservation } from "../src/normalizeObservation.js";

test("normalizes a valid observation", () => {
  const raw = {
    date: "2026-1-3",
    temperature: "18.5",
  };

  const result = normalizeObservation(raw);

  assert.deepEqual(result, {
    date: "2026-01-03",
    temperatureC: 18.5,
  });
});

test("Accepts 0 degs C as valid", () => {
  const raw = {
    date: "2026-1-3",
    temperature: "0",
  };

  const result = normalizeObservation(raw);

  assert.deepEqual(result, {
    date: "2026-01-03",
    temperatureC: 0,
  });
});

test("rejects invalid date", () => {
  const raw = {
    date: "2026-14-3",
    temperature: "18.5",
  };

  const result = normalizeObservation(raw);
  assert.equal(result, null);
});

test("rejects invalid temp", () => {
  const raw = {
    date: "2026-1-3",
    temperature: "13abc",
  };

  const result = normalizeObservation(raw);
  assert.equal(result, null);
});

test("rejects null input", () => {
  const result = normalizeObservation(null);
  assert.equal(result, null);
});

test("rejects array as observation input", () => {
  const result = normalizeObservation(["2026-1-3", "18.5"]);
  assert.equal(result, null);
});

test("accepts an observation containing extra properties", () => {
  const raw = {
    date: "2026-1-3",
    temperature: "18.5",
    test: "Hello",
    world: 123,
  };

  const result = normalizeObservation(raw);

  assert.deepEqual(result, {
    date: "2026-01-03",
    temperatureC: 18.5,
  });
});

test("does not mutate original observation", () => {
  const raw = {
    date: "2026-1-3",
    temperature: "18.5",
  };

  const result = normalizeObservation(raw);

  // Assert result contains normalized values
  assert.deepEqual(result, {
    date: "2026-01-03",
    temperatureC: 18.5,
  });
  // Assert raw still contains original values
  assert.deepEqual(raw, {
    date: "2026-1-3",
    temperature: "18.5",
  });
});
