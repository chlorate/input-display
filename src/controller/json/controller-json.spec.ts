import {ButtonType} from "./button-json";
import {isControllerJSON} from "./controller-json";

describe("isControllerJSON", () => {
	let json;

	beforeEach(() => {
		json = {
			axes: [
				{
					neutralValue: 0.1,
					minValue: -0.2,
					maxValue: 0.2,
				},
			],
			buttons: [
				{
					type: ButtonType.Normal,
					index: 0,
					presses: 123,
					bestMashSpeed: 30,
				},
			],
		};
	})

	it("should return true if valid", () => {
		expect(isControllerJSON(json)).toBe(true);
	});

	it("should return false if not an object", () => {
		expect(isControllerJSON("bad")).toBe(false);
	});

	it("should return false if axes is not an array", () => {
		json.axes = "bad";
		expect(isControllerJSON(json)).toBe(false);
	});

	it("should return false if buttons is set and not an array", () => {
		json.buttons = "bad";
		expect(isControllerJSON(json)).toBe(false);
	});
});
