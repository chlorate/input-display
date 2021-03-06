import {isButtonPaletteJSON} from "./button-palette-json";

describe("isButtonPaletteJSON", () => {
	let json;

	beforeEach(() => {
		json = {
			border: "#111111",
			fill: "#222222",
			label: "#333333",
		};
	});

	it("should return true if valid", () => {
		expect(isButtonPaletteJSON(json)).toBe(true);
	});

	it("should return false if not an object", () => {
		expect(isButtonPaletteJSON("bad")).toBe(false);
	});

	it("should return false if border is not a string", () => {
		json.border = 123;
		expect(isButtonPaletteJSON(json)).toBe(false);
	});

	it("should return false if fill is not a string", () => {
		json.fill = 123;
		expect(isButtonPaletteJSON(json)).toBe(false);
	});

	it("should return false if label is not a string", () => {
		json.label = 123;
		expect(isButtonPaletteJSON(json)).toBe(false);
	});
});
