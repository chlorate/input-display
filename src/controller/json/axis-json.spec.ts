import {isAxisJSON} from "./axis-json";

describe("isAxisJSON", () => {
	it("should return true for an empty object", () => {
		expect(isAxisJSON({})).toBe(true);
	});

	it("should return true for all valid, optional properties", () => {
		const json = {
			neutralValue: 0.1,
			minValue: -0.2,
			maxValue: 0.2,
		};
		expect(isAxisJSON(json)).toBe(true);
	});

	it("should return false if not an object", () => {
		expect(isAxisJSON("bad")).toBe(false);
	});

	it("should return false if neutralValue is not numeric", () => {
		expect(isAxisJSON({neutralValue: "bad"})).toBe(false);
	});

	it("should return false if minValue is not numeric", () => {
		expect(isAxisJSON({minValue: "bad"})).toBe(false);
	});

	it("should return false if maxValue is not numeric", () => {
		expect(isAxisJSON({maxValue: "bad"})).toBe(false);
	});
});
