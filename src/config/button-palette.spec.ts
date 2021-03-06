import {ButtonPalette} from "./button-palette";

describe("ButtonPalette", () => {
	let palette;

	beforeEach(() => {
		palette = new ButtonPalette("#111111", "#222222", "#333333");
	});

	it("should reset label color if not valid", () => {
		palette.label = "bad";
		expect(palette.label).toBe("#333333");
	});

	it("can return a JSON representation", () => {
		expect(palette.toJSON()).toEqual({
			border: "#111111",
			fill: "#222222",
			label: "#333333",
		});
	});

	it("can assign properties from a JSON representation", () => {
		palette.loadJSON({
			border: "#444444",
			fill: "#555555",
			label: "#666666",
		});
		expect(palette.border).toBe("#444444");
		expect(palette.fill).toBe("#555555");
		expect(palette.label).toBe("#666666");
	});
});
