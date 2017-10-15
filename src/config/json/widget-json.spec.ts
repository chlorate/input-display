import {ButtonType} from "../../controller/json/button-json";
import {isWidgetJSON, WidgetType} from "./widget-json";

describe("isWidgetJSON", () => {
	let json;

	describe("CircleButtonWidgetJSON", () => {
		beforeEach(() => {
			json = {
				type: WidgetType.CircleButton,
				x: 1,
				y: 2,
				width: 3,
				height: 4,
				borderWidth: 5,
				button: {
					type: ButtonType.Normal,
					index: 6,
				},
			};
		});

		it("should return true if valid", () => {
			expect(isWidgetJSON(json)).toBe(true);
		});

		it("should return false if x is not numeric", () => {
			json.x = "bad";
			expect(isWidgetJSON(json)).toBe(false);
		});

		it("should return false if y is not numeric", () => {
			json.y = "bad";
			expect(isWidgetJSON(json)).toBe(false);
		});

		it("should return false if width is not numeric", () => {
			json.width = "bad";
			expect(isWidgetJSON(json)).toBe(false);
		});

		it("should return false if height is not numeric", () => {
			json.height = "bad";
			expect(isWidgetJSON(json)).toBe(false);
		});

		it("should return false if border width is not numeric", () => {
			json.borderWidth = "bad";
			expect(isWidgetJSON(json)).toBe(false);
		});

		it("should return false if button is not a ButtonReference", () => {
			json.button = "bad";
			expect(isWidgetJSON(json)).toBe(false);
		});
	});

	it("should return false if not an object", () => {
		expect(isWidgetJSON("bad")).toBe(false);
	});
});
