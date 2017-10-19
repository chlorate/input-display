import {ensureColor} from "./util";

describe("ensureColor", () => {
	it("should accept valid colors", () => {
		expect(ensureColor("#012345", "#000000")).toBe("#012345");
		expect(ensureColor("#abcdef", "#000000")).toBe("#abcdef");
	});

	it("should lower-case the color", () => {
		expect(ensureColor("#ABCDEF", "#000000")).toBe("#abcdef");
	});

	it("should return the default if not a color", () => {
		expect(ensureColor("bad", "#000000")).toBe("#000000");
	});
});
