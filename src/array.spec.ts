import {arraysEqual} from "./array";

describe("array", () => {
	describe("arraysEqual", () => {
		it("returns true if arrays are identical", () => {
			expect(arraysEqual([1, 2, 3], [1, 2, 3])).toBe(true);
		});

		it("returns false if lengths differ", () => {
			expect(arraysEqual([1], [1, 2, 3])).toBe(false);
		});

		it("returns false if values differ", () => {
			expect(arraysEqual([1, 2], [1, 3])).toBe(false);
		});
	});
});
