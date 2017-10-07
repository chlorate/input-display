import {almostEqual, clampInt, formatNumber} from "./math";

describe("almostEqual", () => {
	it("should compare numbers correctly", () => {
		const tests = [
			{x: 0.001, y: 0.0004, out: false},
			{x: 0.001, y: 0.0005, out: true},
			{x: 0.001, y: 0.001, out: true},
			{x: 0.001, y: 0.0015, out: true},
			{x: 0.001, y: 0.0016, out: false},
		];
		for (const test of tests) {
			expect(almostEqual(test.x, test.y)).toBe(test.out);
		}
	});
});

describe("clampInt", () => {
	it("should return number as-is if no bounds set", () => {
		expect(clampInt(123)).toBe(123);
	});

	it("should accept strings", () => {
		expect(clampInt("123")).toBe(123);
	});

	it("should return 0 for non-numbers", () => {
		expect(clampInt("bad")).toBe(0);
	});

	it("should truncate floats", () => {
		expect(clampInt(123.6)).toBe(123);
		expect(clampInt(-123.6)).toBe(-123);
	});

	it("should respect minimum bound", () => {
		expect(clampInt(0, 5)).toBe(5);
		expect(clampInt("bad", 5)).toBe(5);
	});

	it("should respect maximum bound", () => {
		expect(clampInt(0, undefined, -5)).toBe(-5);
		expect(clampInt("bad", undefined, -5)).toBe(-5);
	});

	it("should error if min > max", () => {
		expect(() => clampInt(0, 2, 1)).toThrowError();
	});
});

describe("formatNumber", () => {
	it("should format numbers correctly", () => {
		const tests = [
			{in: 1, out: "1"},
			{in: 12, out: "12"},
			{in: 123, out: "123"},
			{in: 1234, out: "1,234"},
			{in: 12345, out: "12,345"},
			{in: 123456, out: "123,456"},
			{in: 1234567, out: "1,234,567"},
			{in: 1234567.8, out: "1,234,567.8"},
			{in: 1234567.89, out: "1,234,567.89"},
			{in: 1234567.891, out: "1,234,567.891"},
			{in: 1234567.8912, out: "1,234,567.8912"},
		];
		for (const test of tests) {
			expect(formatNumber(test.in)).toBe(test.out);
		}
	});
});
