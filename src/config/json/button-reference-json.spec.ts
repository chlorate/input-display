import {ButtonType} from "../../controller/json/button-json";
import {Direction4} from "../../direction/direction4";
import {isButtonReferenceJSON} from "./button-reference-json";

describe("isButtonReferenceJSON", () => {
	let json;

	describe("NormalButtonReferenceJSON", () => {
		beforeEach(() => {
			json = {
				type: ButtonType.Normal,
				index: 0,
			};
		});

		it("should return true if valid", () => {
			expect(isButtonReferenceJSON(json)).toBe(true);
		});

		it("should return false if index is not numeric", () => {
			json.index = "bad";
			expect(isButtonReferenceJSON(json)).toBe(false);
		});
	});

	describe("DpadButtonReferenceJSON", () => {
		beforeEach(() => {
			json = {
				type: ButtonType.Dpad,
				direction: Direction4.Up,
			};
		});

		it("should return true if valid", () => {
			expect(isButtonReferenceJSON(json)).toBe(true);
		});

		it("should return false if direction is invalid", () => {
			json.direction = "bad";
			expect(isButtonReferenceJSON(json)).toBe(false);
		});
	});

	it("should return false if not an object", () => {
		expect(isButtonReferenceJSON("bad")).toBe(false);
	});
});
