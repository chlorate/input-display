import {isAxisReferenceJSON} from "./axis-reference-json";

describe("isAxisReferenceJSON", () => {
	it("should return true if valid", () => {
		const json = {
			index: 1,
			inverted: true,
		};
		expect(isAxisReferenceJSON(json)).toBe(true);
	});

	it("should return false if not an object", () => {
		expect(isAxisReferenceJSON("bad")).toBe(false);
	});

	it("should return false if index is not numeric", () => {
		const json = {
			index: "bad",
			inverted: true,
		};
		expect(isAxisReferenceJSON(json)).toBe(false);
	});

	it("should return false if inverted is not boolean", () => {
		const json = {
			index: 1,
			inverted: "bad",
		};
		expect(isAxisReferenceJSON(json)).toBe(false);
	});
});
