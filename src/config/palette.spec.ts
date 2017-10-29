import {Palette} from "./palette";

describe("Palette", () => {
	let palette;

	beforeEach(() => {
		palette = new Palette("#111111", "#222222");
	});

	it("should reset border color if not valid", () => {
		palette.border = "bad";
		expect(palette.border).toBe("#111111");
	});

	it("should reset fill color if not valid", () => {
		palette.fill = "bad";
		expect(palette.fill).toBe("#222222");
	});

	it("can return a JSON representation", () => {
		expect(palette.toJSON()).toEqual({
			border: "#111111",
			fill: "#222222",
		});
	});

	it("can assign properties from a JSON representation", () => {
		palette.loadJSON({
			border: "#444444",
			fill: "#555555",
		});
		expect(palette.border).toBe("#444444");
		expect(palette.fill).toBe("#555555");
	});
});
