import test from "node:test";
import assert from "node:assert/strict";
import { parseTemperature } from "../src/parseTemperature.js";

test("accepts a valid numeric string", () => {
  const result = parseTemperature("22");
  assert.equal(result, 22);
});

test("accepts a valid numeric string with whitespace", () => {
  const result = parseTemperature("     22      ");
  assert.equal(result, 22);
});

test("rejects whitespace string", () => {
  const result = parseTemperature("         ");
  assert.equal(result, null);
});

test("accepts a valid number", () => {
  const result = parseTemperature(22);
  assert.equal(result, 22);
});

test("rejects boolean", () => {
  const result = parseTemperature(false);
  assert.equal(result, null);
});

test("rejects string boolean", () => {
  const result = parseTemperature("false");
  assert.equal(result, null);
});

test("rejects NaN", () => {
  const result = parseTemperature(NaN);
  assert.equal(result, null);
});

test("accepts negative decimal represented as a string", () => {
  const result = parseTemperature("-0.2342");
  assert.equal(result, -0.2342);
});

test("accepts numeric 0", () => {
  const result = parseTemperature(0);
  assert.equal(result, 0);
});

test("accepts string 0", () => {
  const result = parseTemperature("0");
  assert.equal(result, 0);
});

test("rejects Infinity", () => {
  const result = parseTemperature(Infinity);
  assert.equal(result, null);
});
