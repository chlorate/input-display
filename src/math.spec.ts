import {clampInt} from "./math";

describe("math", () => {
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
});
