import {ButtonType} from "./button-json";
import {isControllerJSON} from "./controller-json";

describe("isControllerJSON", () => {
	it("should return true if valid", () => {
		const json = {
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
		expect(isControllerJSON(json)).toBe(true);
	});

	it("should return false if not an object", () => {
		expect(isControllerJSON("bad")).toBe(false);
	});

	it("should return false if axes is not an array", () => {
		expect(isControllerJSON({axes: "bad"})).toBe(false);
	});

	it("should return false if buttons is set and not an array", () => {
		expect(isControllerJSON({buttons: "bad"})).toBe(false);
	});
});
