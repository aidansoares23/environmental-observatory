import test from "node:test";
import assert from "node:assert/strict";
import { processBatch } from "../src/processBatch.js";

test("Valid results in accepted, invalid results in rejected", () => {
  const raw = [
    { date: "2026-1-3", temperature: "18.5" },
    { date: "2026-1-4", temperature: "N/A" },
    { date: "2026-1-5", temperature: "20.1" },
    { date: "2026-2-30", temperature: "15" },
  ];

  const processed = {
    accepted: [
      { date: "2026-01-03", temperatureC: 18.5 },
      { date: "2026-01-05", temperatureC: 20.1 },
    ],
    rejected: [
      {
        index: 1,
        raw: { date: "2026-1-4", temperature: "N/A" },
      },
      {
        index: 3,
        raw: { date: "2026-2-30", temperature: "15" },
      },
    ],
  };
  const result = processBatch(raw);
  assert.deepEqual(result, processed);
});

test("Empty batch results in empty batch", () => {
  const raw = [];

  const processed = {
    accepted: [],
    rejected: [],
  };
  const result = processBatch(raw);
  assert.deepEqual(result, processed);
});

test("A non-array returns null", () => {
  const raw = {};
  const result = processBatch(raw);
  assert.equal(result, null);
});

test("3 invalid results produce 3 rejected entries, with original indicies 0, 1, 2.", () => {
  const raw = [
    { date: "2026-1-4", temperature: "N/A" },
    { date: "2026-2-30", temperature: "N/A" },
    { date: "2026-2-30", temperature: "N/A" },
  ];

  const processed = {
    accepted: [],
    rejected: [
      {
        index: 0,
        raw: { date: "2026-1-4", temperature: "N/A" },
      },
      {
        index: 1,
        raw: { date: "2026-2-30", temperature: "N/A" },
      },
      {
        index: 2,
        raw: { date: "2026-2-30", temperature: "N/A" },
      },
    ],
  };
  const result = processBatch(raw);
  assert.deepEqual(result, processed);
});

test("Processing does not change the input array or its objects. ", () => {
  const raw = [
    { date: "2026-1-3", temperature: "18.5" },
    { date: "2026-1-4", temperature: "N/A" },
    { date: "2026-1-5", temperature: "20.1" },
    { date: "2026-2-30", temperature: "15" },
  ];

  const processed = {
    accepted: [
      { date: "2026-01-03", temperatureC: 18.5 },
      { date: "2026-01-05", temperatureC: 20.1 },
    ],
    rejected: [
      {
        index: 1,
        raw: { date: "2026-1-4", temperature: "N/A" },
      },
      {
        index: 3,
        raw: { date: "2026-2-30", temperature: "15" },
      },
    ],
  };
  const result = processBatch(raw);
  assert.deepEqual(result, processed);
  assert.deepEqual(raw, [
    { date: "2026-1-3", temperature: "18.5" },
    { date: "2026-1-4", temperature: "N/A" },
    { date: "2026-1-5", temperature: "20.1" },
    { date: "2026-2-30", temperature: "15" },
  ]);
});
