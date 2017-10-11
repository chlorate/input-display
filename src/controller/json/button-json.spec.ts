import {Direction} from "../direction";
import {ButtonType, isButtonJSON} from "./button-json";

describe("isButtonJSON", () => {
	let json;

	describe("BaseButtonJSON", () => {
		beforeEach(() => {
			json = {
				type: ButtonType.Normal,
				index: 0,
			};
		});

		it("should return true when optional properties are set", () => {
			json.presses = 123;
			json.bestMashSpeed = 30;
			expect(isButtonJSON(json)).toBe(true);
		});

		it("should return false if presses is not numeric", () => {
			json.presses = "bad";
			expect(isButtonJSON(json)).toBe(false);
		});

		it("should return false if bestMashSpeed is not numeric", () => {
			json.bestMashSpeed = "bad";
			expect(isButtonJSON(json)).toBe(false);
		});
	});

	describe("NormalButtonJSON", () => {
		beforeEach(() => {
			json = {type: ButtonType.Normal};
		});

		it("should return true for required properties", () => {
			json.index = 0;
			expect(isButtonJSON(json)).toBe(true);
		});

		it("should return false if index is not numeric", () => {
			json.index = "bad";
			expect(isButtonJSON(json)).toBe(false);
		});
	});

	describe("DpadButtonJSON", () => {
		beforeEach(() => {
			json.type = ButtonType.Dpad;
		});

		it("should return true for required properties", () => {
			json.direction = Direction.Up;
			expect(isButtonJSON(json)).toBe(true);
		});

		it("should return false if direction is invalid", () => {
			json.direction = "bad";
			expect(isButtonJSON(json)).toBe(false);
		});
	});

	it("should return false if not an object", () => {
		expect(isButtonJSON("bad")).toBe(false);
	});
});
