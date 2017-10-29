import {isPaletteJSON} from "./palette-json";

describe("isPaletteJSON", () => {
	let json;

	beforeEach(() => {
		json = {
			border: "#111111",
			fill: "#222222",
		};
	});

	it("should return true if valid", () => {
		expect(isPaletteJSON(json)).toBe(true);
	});

	it("should return false if not an object", () => {
		expect(isPaletteJSON("bad")).toBe(false);
	});

	it("should return false if border is not a string", () => {
		json.border = 123;
		expect(isPaletteJSON(json)).toBe(false);
	});

	it("should return false if fill is not a string", () => {
		json.fill = 123;
		expect(isPaletteJSON(json)).toBe(false);
	});
});
