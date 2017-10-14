import {isAxisReferenceJSON} from "./axis-reference-json";

describe("isAxisReferenceJSON", () => {
	let json;

	beforeEach(() => {
		json = {
			index: 1,
			inverted: true,
		};
	});

	it("should return true if valid", () => {
		expect(isAxisReferenceJSON(json)).toBe(true);
	});

	it("should return false if not an object", () => {
		expect(isAxisReferenceJSON("bad")).toBe(false);
	});

	it("should return false if index is not numeric", () => {
		json.index = "bad";
		expect(isAxisReferenceJSON(json)).toBe(false);
	});

	it("should return false if inverted is not boolean", () => {
		json.inverted = "bad";
		expect(isAxisReferenceJSON(json)).toBe(false);
	});
});
