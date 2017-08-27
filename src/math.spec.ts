import {clampIntOrNull} from "./math";

describe("math", () => {
	describe("test", () => {
		it("should return true", () => {
			expect(clampIntOrNull(-1, 1, 5)).toBe(1);
		});
	});
});
