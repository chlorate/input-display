import {Direction} from "../direction";
import {ButtonType, isButtonJSON} from "./button-json";

describe("isButtonJSON", () => {
	let json;

	describe("NormalButtonJSON", () => {
		beforeEach(() => {
			json = {
				type: ButtonType.Normal,
				index: 0,
				presses: 123,
				bestMashSpeed: 30,
			};
		});

		it("should return true if valid", () => {
			json.index = 0;
			expect(isButtonJSON(json)).toBe(true);
		});

		it("should return false if index is not numeric", () => {
			json.index = "bad";
			expect(isButtonJSON(json)).toBe(false);
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

	describe("DpadButtonJSON", () => {
		beforeEach(() => {
			json = {
				type: ButtonType.Dpad,
				direction: Direction.Up,
				presses: 123,
				bestMashSpeed: 30,
			};
		});

		it("should return true if valid", () => {
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
